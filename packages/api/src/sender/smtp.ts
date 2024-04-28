import { TerminusNotificationSender } from './base';
import nodemailer, { SendMailOptions, Transporter } from 'nodemailer';
import SMTPTransport from 'nodemailer/lib/smtp-transport';
import { NotificationResultCode, NotificationResult } from '@bytetrade/core';
import {
  EmailRecipient,
  NotificationCredential,
  SenderType,
} from '@notifications/database';

export class SmtpNotificationSender extends TerminusNotificationSender {
  type = SenderType.SMTP;
  private transporter: Transporter;
  private from: string;

  constructor(public credential: NotificationCredential) {
    super(credential);

    const { host, port, user, password, from } = this.credential;

    const transportOptions: SMTPTransport.Options = {
      host: host,
      port: port as unknown as number,
      auth: {
        user: user,
        pass: password,
      },
    };
    this.transporter = nodemailer.createTransport(transportOptions);
    this.from = from;
  }

  async execute(
    id: number,
    recipient: EmailRecipient,
    messageData: any,
  ): Promise<NotificationResult> {
    await this.validate();

    try {
      const mailData = this.createMailData(recipient, JSON.parse(messageData));
      const info = await this.transporter.sendMail(mailData);
      return {
        message: JSON.stringify(info),
        code: NotificationResultCode.Success,
      };
    } catch (error) {
      return {
        message: JSON.stringify(error),
        code: NotificationResultCode.Error,
      };
    }
  }

  private createMailData(
    recipient: EmailRecipient,
    messageData: any,
  ): SendMailOptions {
    const sendMailOptions: SendMailOptions = {
      from: this.from,
      to: recipient.email,
      subject: messageData.title,
      // html: options.html,
      text: messageData.body,
    };
    return sendMailOptions;
  }
}
