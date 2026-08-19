import { Controller, Post, Body, Logger, HttpCode } from '@nestjs/common';

import { Result, returnSucceed } from '../core';
import { TemplateService } from './template.service';
import { KubeSphereNotification, Payload } from './global';

@Controller('/notification/system')
export class SystemController {
	private readonly logger = new Logger(SystemController.name);

	constructor(private readonly templateService: TemplateService) {}

	async handleNoTemplate(payload: Payload): Promise<Result<null>> {
		if (payload.eventType == 'user.login') {
		} else if (payload.eventType == 'app.install') {
		} else {
		}
		return returnSucceed(null);
	}

	@Post('/push')
	@HttpCode(200)
	async push(@Body() body: KubeSphereNotification): Promise<Result<null>> {
		this.logger.log('push');

		try {
			if (body.commonLabels.type == 'notification') {
				const payload: Payload = JSON.parse(body.commonLabels.payload);
				this.logger.log(payload.eventType);
			} else {
				this.logger.warn('error type' + body.commonLabels.type);
			}
		} catch (e) {
			this.logger.error(e);
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
