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


interface User {
	username:string;
	email:string;
	groups:string[];
}

@Injectable()
export class UsersService implements OnModuleDestroy {
	private readonly logger = new Logger(UsersService.name);
	private natsClient: NatsConnection;

	private sc;


	public users:User[] = [];

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
						console.log('payload', payload);
						try {
							payload = JSON.parse(payload);
						} catch (error) {
							this.logger.log(
								'payload not json, use string ===>',
								payload
							);
						}
						if (
							app.subject == process.env.NATS_SUBJECT
						) {
							//
							
						} else if (
							app.subject ==
							process.env.NATS_SUBJECT_SYSTEM_USERS
						) {
							await this.getUsers();
						} else if (
							app.subject ==
							process.env.NATS_SUBJECT_SYSTEM_GROUPS
						) {
						}else if (
							app.subject ==
							process.env.NATS_SUBJECT_SYSTEM_APPLICATION
						) {

						}
						else if (
							app.subject ==
							process.env.NATS_SUBJECT_SYSTEM_VAULT
						) {

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
				subject: process.env.NATS_SUBJECT || ''
			},
			{
				subject: process.env.NATS_SUBJECT_SYSTEM_USERS || ''
			},
			{
				subject: process.env.NATS_SUBJECT_SYSTEM_GROUPS || ''
			},
			{
				subject: process.env.NATS_SUBJECT_SYSTEM_APPLICATION || ''
			},
			{
				subject: process.env.NATS_SUBJECT_SYSTEM_VAULT || ''
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

			const us: User[] = [];
			for( const user of response.data.items){
					us.push(user);
					console.log('user', user);
			}

			this.users = us;
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
