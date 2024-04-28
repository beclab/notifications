import axios from 'axios';
import { TerminusNotificationSender } from './base';
import { SenderType, PhoneRecipient } from '@notifications/database';

import { NotificationResultCode, NotificationResult } from '@bytetrade/core';

export class SMSNotificationSender extends TerminusNotificationSender {
  public type = SenderType.Webhook;
  timeout = 1000;

  // use seedchamp to send sms
  async execute(
    id: number,
    recipient: PhoneRecipient,
    messageData: any,
  ): Promise<NotificationResult> {
    await this.validate();
    const instance = axios.create({
      baseURL: 'https://api.sendchamp.com/v1',
      timeout: this.timeout,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.credential.apiKey}`,
      },
    });

    const data = JSON.parse(messageData);
    const payload = {
      sender_name: this.credential.from,
      to: recipient.phoneNumber,
      message: data.body,
      route: 'international',
    };

    const response = await instance.post(`/sms/send`, payload);

    if (response.status === 200) {
      return {
        code: NotificationResultCode.Success,
        message: response.data,
      };
    } else {
      return {
        code: NotificationResultCode.NetworkError,
        message: 'Return Http Code: ' + response.status,
      };
    }
  }
}
