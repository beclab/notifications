import { Injectable, OnModuleDestroy, Logger } from '@nestjs/common';
//import { SocketService } from './pgsocket.service';
import axios from 'axios';
import { NatsConnection, StringCodec, connect } from 'nats';
//import { get } from 'http';

const NATS_HOST = process.env.NATS_HOST || '';
const NATS_PORT = process.env.NATS_PORT || 4222;
const NATS_USERNAME = process.env.NATS_USERNAME || '';
const NATS_PASSWORD = process.env.NATS_PASSWORD || '';
const nats_url = NATS_HOST + ':' + NATS_PORT;

export function getNATS(): boolean {
	const value = process.env.NATS;
	return value?.toLowerCase() !== 'false';
}

@Injectable()
export class UsersService implements OnModuleDestroy {
	private readonly logger = new Logger(UsersService.name);
	private natsClient: NatsConnection;

	private sc;

	async handlesMessage(
		apps: {
			subject: string;
		}[]
	) {
		apps.forEach((app) => {
			if (app.subject.length == 0) {
				return;
			}
			const sub = this.natsClient.subscribe(app.subject);

			(async () => {
				try {
					for await (const m of sub) {
						let payload = this.sc.decode(m.data);
						try {
							payload = JSON.parse(payload);
						} catch (error) {
							this.logger.log(
								'payload not json, use string ===>',
								payload
							);
						}
						if (
							app.subject == process.env.NATS_SUBJECT_SYSTEM_USERS
						) {
							//console.log
							await this.getUsers();
						} else if (
							app.subject ==
							process.env.NATS_SUBJECT_USER_NOTIFICATION
						) {
						} else if (
							app.subject ==
							process.env.NATS_SUBJECT_SYSTEM_APPLICATION
						) {
							//console.log
						} else {
							//console.log
						}
					}
				} catch (error) {
					this.logger.error('error ===>', error);
				}
			})();
		});
	}
	async onModuleInit() {
		if (!getNATS()) {
			return;
		}

		await this.getUsers();

		try {
			this.natsClient = await connect({
				servers: nats_url,
				user: NATS_USERNAME,
				pass: NATS_PASSWORD
			});
		} catch (error) {
			this.logger.error('error connecting to NATS:', error);
			return;
		}
		this.sc = StringCodec();

		const subjects = [
			{
				subject: process.env.NATS_SUBJECT_USER_NOTIFICATION || ''
			},
			{
				subject: process.env.NATS_SUBJECT_SYSTEM_USERS || ''
			},
			{
				subject: process.env.NATS_SUBJECT_SYSTEM_APPLICATION || ''
			}
		];
		this.handlesMessage(subjects);
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
