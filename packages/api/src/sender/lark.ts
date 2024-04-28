import axios from 'axios';
import { TerminusNotificationSender } from './base';

import { NoNeedRecipient, SenderType } from '@notifications/database';
import { NotificationResultCode, NotificationResult } from '@bytetrade/core';

export class LarkNotificationSender extends TerminusNotificationSender {
  type = SenderType.Lark;
  timeout = 2000;

  async execute(
    id: number,
    recipient: NoNeedRecipient,
    messageData: any,
  ): Promise<NotificationResult> {
    await this.validate();

    const instance = axios.create({
      baseURL: this.credential.url,
      timeout: this.timeout,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const response = await instance.post('/', {
      msg_type: 'text',
      content: { text: messageData.body },
    });

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
