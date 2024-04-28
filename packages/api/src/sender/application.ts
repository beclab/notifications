// @ts-ignore
import { TerminusNotificationSender } from './base';
import {
  SenderType,
  FirebaseRecipient,
  sleep,
  NotificationCredential,
} from '@notifications/database';
import { NotificationResultCode, NotificationResult } from '@bytetrade/core';
import { ProviderClient } from './provider.client';

const providerUrl = 'http://' + process.env.OS_SYSTEM_SERVER;
const OS_APP_KEY = process.env.OS_APP_KEY;
const OS_APP_SECRET = process.env.OS_APP_SECRET;
//const IS_DEBUG = process.env.IS_DEBUG || false;

console.log('providerUrl ' + providerUrl);
console.log('OS_APP_KEY' + OS_APP_KEY);
console.log('OS_APP_SECRET' + OS_APP_SECRET);

export class ApplicationNotificationSender extends TerminusNotificationSender {
  type = SenderType.Application;
  //accessToken?: string;
  timeout = 1000;
  client: ProviderClient;

  constructor(public credential: NotificationCredential) {
    super(credential);
    this.credential = credential;
    this.client = new ProviderClient(
      this.credential.name,
      this.credential.group,
      this.credential.dataType,
      ['Create', 'Query'],
    );
  }

  private async sendMessage(
    id: number,
    recipient: FirebaseRecipient,
    message: { title: string; body: string; language: string; action?: string },
  ): Promise<NotificationResult> {
    const data = await this.client.execute('/Create', {
      id,
      recipient,
      message,
    });

    console.log('sendMessage');
    console.log(data);

    if (data.code == 0) {
      return data.data;
    } else {
      return {
        code: NotificationResultCode.NetworkError,
        message: data.message,
      };
    }
  }

  private async queryMessage(id: number): Promise<NotificationResult> {
    const data = await this.client.execute('/Query', {
      id,
    });

    console.log('queryMessage');
    console.log(data);

    if (data.code == 0) {
      return data.data;
    } else {
      return {
        code: NotificationResultCode.NetworkError,
        message: data.message,
      };
    }
  }

  async execute(
    id: number,
    recipient: FirebaseRecipient,
    messageData: any,
  ): Promise<NotificationResult> {
    await this.validate();

    console.log('Applciation Sender');
    console.log(recipient);
    console.log(messageData);
    // this.accessToken = await this.getAccessToken();
    // console.log(this.accessToken);
    let result = await this.sendMessage(id, recipient, messageData);
    try {
      while (result.code == NotificationResultCode.Waiting) {
        await sleep(300);
        result = await this.queryMessage(id);
      }
    } catch (e) {
      console.log(e);
      return {
        code: NotificationResultCode.NetworkError,
        message: 'Network error',
      };
    }
    return result;
  }
}
