import { Controller, Post, Body, Logger, HttpCode } from '@nestjs/common';

import { Result, returnSucceed } from '@bytetrade/core';
import { JobService } from './job.service';
import { TemplateService } from './template.service';
import { KubeSphereNotification, Payload } from './global';
import { NotifyPolicyService } from './notify.policy.service';
import { NotifyPolicy } from '@notifications/database';

@Controller('/notification/system')
export class SystemController {
  private readonly logger = new Logger(SystemController.name);

  constructor(
    private readonly jobService: JobService,
    private readonly templateService: TemplateService,
    private readonly notifyPolicyService: NotifyPolicyService,
  ) {}

  async handleNoTemplate(payload: Payload): Promise<Result<null>> {
    if (payload.eventType == 'user.login') {
      const template = await this.templateService.findSystemTemplate('login');
      if (!template) {
        this.logger.warn('login template not found');
        return returnSucceed(null);
      }
      this.logger.debug(template);

      const notifyPolicy: NotifyPolicy =
        await this.notifyPolicyService.findDefault();
      if (!notifyPolicy) {
        this.logger.warn('default policy template not found');
        return returnSucceed(null);
      }
      this.logger.debug(notifyPolicy);

      this.jobService.processOneJob({
        templateId: template.id,
        notifyPolicyId: notifyPolicy.id,
        language: 'en',
        rawMessage: {
          vars: {
            time: new Date().toLocaleString(),
            username: '',
            device: '',
            location: '',
          },
        },
      });
    } else if (payload.eventType == 'app.install') {
      //
    } else {
    }
    return returnSucceed(null);
  }

  @Post('/push')
  @HttpCode(200)
  async push(@Body() body: KubeSphereNotification): Promise<Result<null>> {
    this.logger.log(body);

    try {
      if (body.commonLabels.type == 'notification') {
        const payload: Payload = JSON.parse(body.commonLabels.payload);
        this.logger.log(payload.eventType);

        const template = await this.templateService.findTemplate(
          payload.eventType,
        );
        if (!template) {
          this.logger.warn('template not found ' + payload.eventType);
          return await this.handleNoTemplate(payload);
        }
        this.logger.debug(template);

        let notifyPolicy: NotifyPolicy = null;
        if (template.notifyGroup == '') {
          notifyPolicy = await this.notifyPolicyService.findDefault();
        } else {
          notifyPolicy = await this.notifyPolicyService.findByName(
            template.notifyGroup,
          );
        }
        if (!notifyPolicy) {
          this.logger.warn('default policy template not found');
          return returnSucceed(null);
        }

        this.jobService.processOneJob({
          templateId: template.id,
          notifyPolicyId: notifyPolicy.id,
          language: 'en',
          rawMessage: JSON.parse(body.commonAnnotations.message),
        });
      } else {
        this.logger.warn('error type' + body.commonLabels.type);
      }
    } catch (e) {
      console.log(e);
    }

    return returnSucceed(null);
  }
}

/*
 {
   "alerts": [
     {
       "status": "",
       "labels": {
         "payload": "{\"eventData\":{\"name\":\"astral3\"},\"eventType\":\"app.install\"}",
         "type": "notification",
         "version": "v1",
         "namespace": "user-system-billpengpeng"
       },
       "annotations": {
         "message": "app astral3-billpengpeng/astral3 is installed"
       },
       "startsAt": "0001-01-01T00:00:00Z",
       "endsAt": "0001-01-01T00:00:00Z"
     }
   ],
   "groupLabels": {
     "alertname": "",
     "namespace": "user-system-billpengpeng"
   },
   "commonLabels": {
     "payload": "{\"eventData\":{\"name\":\"astral3\"},\"eventType\":\"app.install\"}",
     "type": "notification",
     "version": "v1",
     "namespace": "user-system-billpengpeng"
   },
   "commonAnnotations": {
     "message": "app astral3-billpengpeng/astral3 is installed"
   }
 }*/

/*
 {
   "alerts": [
     {
       "status": "",
       "labels": {
         "type": "notification",
         "version": "v1",
         "namespace": "user-system-billpengpeng",
         "payload": "{\"eventData\":{\"user\":\"billpengpeng\"},\"eventType\":\"user.login\"}"
       },
       "annotations": {
         "message": "billpengpeng login from 10.233.75.36"
       },
       "startsAt": "0001-01-01T00:00:00Z",
       "endsAt": "0001-01-01T00:00:00Z"
     }
   ],
   "groupLabels": {
     "alertname": "",
     "namespace": "user-system-billpengpeng"
   },
   "commonLabels": {
     "payload": "{\"eventData\":{\"user\":\"billpengpeng\"},\"eventType\":\"user.login\"}",
     "type": "notification",
     "version": "v1",
     "namespace": "user-system-billpengpeng"
   },
   "commonAnnotations": {
     "message": "billpengpeng login from 10.233.75.36"
   }
 }*/
