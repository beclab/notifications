import axios from 'axios';
import { TerminusNotificationSender } from './base';
import { WebhookRecipient, SenderType } from '@notifications/database';
import { NotificationResultCode, NotificationResult } from '@bytetrade/core';

export class SlackNotificationSender extends TerminusNotificationSender {
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

    const response = await instance.post(webhookURL, {
      text: data.body,
    });

    if (response.status === 200) {
      return {
        code: NotificationResultCode.Success,
      };
    } else {
      return {
        code: NotificationResultCode.NetworkError,
        message: 'Return Http Code: ' + response.status,
      };
    }
  }
}
