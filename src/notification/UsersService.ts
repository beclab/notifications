import { Injectable, OnModuleDestroy, Logger } from '@nestjs/common';
//import { SocketService } from './pgsocket.service';
import axios from 'axios';
import { NatsConnection, StringCodec, connect } from 'nats';
//import { get } from 'http';

const NATS_HOST = process.env.NATS_HOST || '';
const NATS_PORT = process.env.NATS_PORT || 4222;
const NATS_USERNAME = process.env.NATS_USERNAME || '';
const NATS_PASSWORD = process.env.NATS_PASSWORD || '';
const NATS_SUBJECT_SYSTEM_USERS = process.env.NATS_SUBJECT_SYSTEM_USERS || '';
const nats_url = NATS_HOST + ':' + NATS_PORT;

export function getNATS(): boolean {
	const value = process.env.NATS;
	return value?.toLowerCase() !== 'false';
}

@Injectable()
export class UsersService implements OnModuleDestroy {
	private readonly logger = new Logger(UsersService.name);
	private natsClient: NatsConnection;

	async onModuleInit() {
		if (!getNATS()) {
			return;
		}

		await this.getUsers();

		(async () => {
			console.log('nats username:', NATS_USERNAME);
			console.log('nats password:', NATS_PASSWORD);
			this.natsClient = await connect({
				servers: nats_url,
				user: NATS_USERNAME,
				pass: NATS_PASSWORD
			});
			const sub = this.natsClient.subscribe(NATS_SUBJECT_SYSTEM_USERS);

			const sc = StringCodec();

			for await (const m of sub) {
				console.log(`[${sub.getProcessed()}]: ${sc.decode(m.data)}`);

				// await this.socketService.sendMsg(sc.decode(m.data));
			}
		})();
	}

	onModuleDestroy(): void {
		this.natsClient.drain();
	}

	async getUsers() {
		try {
			const response: any = await axios.get(
				'http://ks-apiserver.kubesphere-system/kapis/iam.kubesphere.io/v1alpha2/lldap/users'
			);
			if (response.status !== 200) {
				throw new Error(response.statusText);
			}

			console.log('getUsers', response.data);
		} catch (e) {
			this.logger.error(e);
		}
	}

	async pushTemplate(
		userid: string,
		templateid: string,
		data: any
	): Promise<void> {
		console.log('pushTemplate', userid, templateid, data);
		return;
	}
}
