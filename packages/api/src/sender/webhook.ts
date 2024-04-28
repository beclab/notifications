import axios from 'axios';
import { TerminusNotificationSender } from './base';
import { NotificationResultCode, NotificationResult } from '@bytetrade/core';
import { WebhookRecipient, SenderType } from '@notifications/database';

export class WebhookNotificationSender extends TerminusNotificationSender {
  public type = SenderType.Webhook;
  timeout = 1000;

  async execute(
    id: number,
    recipient: WebhookRecipient,
    messageData: any,
  ): Promise<NotificationResult> {
    await this.validate();

    const instance = axios.create({
      timeout: this.timeout,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const webhookURL = this.credential.url || recipient.url;
    const data = JSON.parse(messageData);
    // TODO: data support more format
    const response = await instance.post(webhookURL, data.body);

    if (response.status != 200) {
      return {
        code: NotificationResultCode.NetworkError,
        message: 'Return Http Code: ' + response.status,
      };
    }

    if (!response.data) {
      return {
        code: NotificationResultCode.NetworkError,
        message: 'No data return',
      };
    }

    if (response.data.code == 0) {
      return { code: NotificationResultCode.Success };
    } else {
      return {
        code: NotificationResultCode.Error,
        message: response.data.code + ' ' + response.data.msg,
      };
    }
  }
}
