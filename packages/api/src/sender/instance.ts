import {
  SenderType,
  RecipientType,
  NotificationCredential,
  NotificationRecipientData,
  NotificationRecipient,
  FirebaseRecipient,
  NoNeedRecipient,
  EmailRecipient,
  PhoneRecipient,
  WebhookRecipient,
} from '@notifications/database';
import {
  TerminusNotificationRecipientTemplate,
  recipientTemplates,
} from '@notifications/database';
import { TerminusNotificationSender } from './base';
import { ApplicationNotificationSender } from './application';
import { SmtpNotificationSender } from './smtp';
import { WebhookNotificationSender } from './webhook';
import { LarkNotificationSender } from './lark';
import { SlackNotificationSender } from './slack';
import { SMSNotificationSender } from './sms';

export function getSenderInstance(
  type: SenderType,

  credential: NotificationCredential,
): TerminusNotificationSender {
  if (type == SenderType.Application) {
    return new ApplicationNotificationSender(credential);
  } else if (type == SenderType.SMTP) {
    return new SmtpNotificationSender(credential);
  } else if (type == SenderType.SMS) {
    return new SMSNotificationSender(credential);
  } else if (type == SenderType.Webhook) {
    return new WebhookNotificationSender(credential);
  } else if (type == SenderType.Lark) {
    return new LarkNotificationSender(credential);
  } else if (type == SenderType.Slack) {
    return new SlackNotificationSender(credential);
  }

  throw Error('No support sender type');
}

export function getNotificationRecipient(
  type: RecipientType,
  data: NotificationRecipientData,
): NotificationRecipient {
  if (type == RecipientType.NoNeed) {
    return new NoNeedRecipient(data);
  } else if (type == RecipientType.Firebase) {
    return new FirebaseRecipient(data);
  } else if (type == RecipientType.Email) {
    return new EmailRecipient(data);
  } else if (type == RecipientType.Phone) {
    return new PhoneRecipient(data);
  } else if (type == RecipientType.Webhook) {
    return new WebhookRecipient(data);
  }
  throw Error('No support recipient type');
}

export function getRecipientTemplate(
  type: RecipientType,
): TerminusNotificationRecipientTemplate {
  const rav = recipientTemplates.find((rav) => rav.type === type);
  if (!rav) {
    throw Error('Not found validator for recipient address type');
  }
  return rav;
}

export function validateRecipient(type: RecipientType, data: any) {
  return getRecipientTemplate(type).validator.validate(data);
}
