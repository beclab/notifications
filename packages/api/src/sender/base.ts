import {
  SenderType,
  NotificationCredentialValidator,
  NotificationCredential,
  NotificationApplicationCredentialValidator,
  NotificationSmtpCredentialValidator,
  NotificationWebhookCredentialValidator,
  senderTemplates,
  NotificationRecipient,
  NotificationSMSCredentialValidator,
} from '@notifications/database';

import { NotificationResultCode, NotificationResult } from '@bytetrade/core';

export function getSenderCredentialValidator(
  type: SenderType,
): NotificationCredentialValidator {
  if (type == SenderType.Application) {
    return new NotificationApplicationCredentialValidator();
  } else if (type == SenderType.SMTP) {
    return new NotificationSmtpCredentialValidator();
  } else if (type == SenderType.SMS) {
    return new NotificationSMSCredentialValidator();
  } else if (type == SenderType.Webhook) {
    return new NotificationWebhookCredentialValidator();
  } else if (type == SenderType.Lark) {
    return new NotificationWebhookCredentialValidator();
  } else if (type == SenderType.Slack) {
    return new NotificationWebhookCredentialValidator();
  }

  throw Error('No support sender type');
}

// function stringToEnum(value: string): SenderType {
//   return SenderType[value as keyof typeof SenderType];
// }

export class TerminusNotificationSender {
  public type: SenderType;

  constructor(public credential: NotificationCredential) {}

  async validate(): Promise<boolean> {
    const st = senderTemplates.find((st) => st.type === this.type);
    if (!st) {
      return false;
    }
    return getSenderCredentialValidator(this.type).validate(this.credential);
  }
  async execute(
    id: number,
    _recipient: NotificationRecipient,
    _data: any,
  ): Promise<NotificationResult> {
    console.log(id);
    console.log(_recipient);
    console.log(_data);
    return { code: NotificationResultCode.Success };
  }
}
