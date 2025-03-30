import { Injectable, OnModuleDestroy, Logger } from '@nestjs/common';
//import { SocketService } from './pgsocket.service';

import { NatsConnection, StringCodec, connect } from 'nats';
//import { get } from 'http';

const NATS_HOST = process.env.NATS_HOST || '';
const NATS_PORT = process.env.NATS_PORT || 4222;
const NATS_USERNAME = process.env.NATS_USERNAME || '';
const NATS_PASSWORD = process.env.NATS_PASSWORD || '';
const NATS_SUBJECT = process.env.NATS_SUBJECT || '';
const nats_url = NATS_HOST + ':' + NATS_PORT;

export function getNATS(): boolean {
  const value = process.env.NATS;
  return value?.toLowerCase() !== 'false';
}

@Injectable()
export class NatsService implements OnModuleDestroy {
  private readonly logger = new Logger(NatsService.name);
  private natsClient: NatsConnection;

  async onModuleInit() {
    if (!getNATS()) {
      return;
    }
    console.log('nats username:', NATS_USERNAME);
    console.log('nats password:', NATS_PASSWORD);
    this.natsClient = await connect({
      servers: nats_url,
      user: NATS_USERNAME,
      pass: NATS_PASSWORD,
    });
    const sub = this.natsClient.subscribe(NATS_SUBJECT);

    const sc = StringCodec();

    (async () => {
      for await (const m of sub) {
        console.log(`[${sub.getProcessed()}]: ${sc.decode(m.data)}`);
        // await this.socketService.sendMsg(sc.decode(m.data));
      }
    })();
  }

  onModuleDestroy(): void {
    this.natsClient.drain();
  }

  async pushTemplate(
    userid: string,
    templateid: string,
    data: any,
  ): Promise<void> {
    console.log('pushTemplate', userid, templateid, data);
    return;
  }
}
