import {
	Injectable,
	OnModuleDestroy,
	OnModuleInit,
	Logger
} from '@nestjs/common';
//import { SocketService } from './pgsocket.service';
import axios from 'axios';
import { NatsConnection, StringCodec, connect } from 'nats';
import { TemplateService } from './template.service';

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
	username: string;
	email: string;
	groups: string[];
}

function normalizeBoolean(value: string | boolean): boolean {
	if (typeof value === 'string') {
		return value.toLowerCase() === 'true';
	}
	return Boolean(value); // 如果是布尔值，直接返回
}

@Injectable()
export class UsersService implements OnModuleDestroy, OnModuleInit {
	private readonly logger = new Logger(UsersService.name);
	private natsClient: NatsConnection;

	private sc;

	public users: User[] = [];

	constructor(private readonly templateService: TemplateService) {}

	private async natsClientPublish(
		user: string,
		appId: string,
		appTemplateId: string,
		payload: any
	) {
		const subject = 'os.notification.' + user;
		const template =
			await this.templateService.findTemplateByApplicationIDandApplicationTemplateId(
				appId,
				appTemplateId
			);
		if (!template) {
			this.logger.warn(
				`Fetching template by app name: ${appId} and template name: ${appTemplateId}`
			);
			return;
		}

		if (!this.natsClient) {
			this.logger.error('NATS client not initialized');
			return;
		}
		const data = {
			appId: template.appId,
			appTemplateId: template.appTemplateId,
			payload: payload
		};
		this.logger.log(`Publishing to NATS subject: ${subject}`, data);
		this.natsClient.publish(subject, this.sc.encode(JSON.stringify(data)));
	}

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
						let data = this.sc.decode(m.data);
						console.log('subject payload', app.subject, data);
						try {
							data = JSON.parse(data);
						} catch (error) {
							this.logger.log(
								'payload not json, use string ===>',
								data
							);
						}
						if (
							app.subject == process.env.NATS_SUBJECT_SYSTEM_USERS
						) {
							//
							if (data.topic == 'Login') {
								this.logger.log('Login event received', data);

								data.payload.vars = {
									user: data.payload.user
								};

								await this.natsClientPublish(
									data.payload.user,
									'system',
									'login_v2',
									data.payload
								);
							} else if (data.topic == 'OnFirstFactor') {
								this.logger.log(
									'OnFirstFactor event received',
									data
								);

								const payload = {
									...data.payload,
									id: data.payload.id || data.id,
									sign: data.payload.sign || data.sign,
									vars: data.payload.vars || data.vars
								};

								await this.natsClientPublish(
									data.payload.user,
									'system',
									'system.second.verification',
									payload
								);
							} else if (data.topic == 'Logout') {
								this.logger.log('Logout event received', data);
							} else if (data.topic == 'SignCancel') {
								this.logger.log(
									'SignCancel event received',
									data
								);

								const payload = {
									...data.payload,
									id: data.payload.id || data.id,
									sign: data.payload.sign || data.sign,
									vars: data.payload.vars || data.vars
								};

								await this.natsClientPublish(
									data.payload.user,
									'system',
									'system.cancel.sign',
									payload
								);
							} else if (data.topic == 'Create') {
								this.logger.log('Create event received', data);
								await this.getUsers();
								data.payload.vars = {
									user: data.payload.user
								};

								const admin_users = this.users.filter((u) =>
									u.groups.includes('lldap_admin')
								);
								admin_users.forEach(async (user) => {
									await this.natsClientPublish(
										user.username,
										'system',
										'create_v2',
										data.payload
									);
								});
							} else if (data.topic == 'Delete') {
								this.logger.log('Delete event received', data);
								await this.getUsers();

								data.payload.vars = {
									user: data.payload.user
								};

								const admin_users = this.users.filter((u) =>
									u.groups.includes('lldap_admin')
								);
								admin_users.forEach(async (user) => {
									await this.natsClientPublish(
										user.username,
										'system',
										'delete_v2',
										data.payload
									);
								});
							} else {
								await this.getUsers();
							}
						} else if (
							app.subject ==
							process.env.NATS_SUBJECT_SYSTEM_GROUPS
						) {
						} else if (
							app.subject ==
							process.env.NATS_SUBJECT_SYSTEM_APPLICATION
						) {
							const user = data.user || '';
							const opType = data.opType || '';
							const state = data.state;
							const appName = data.name || '';
							if (opType == 'install' && state == 'running') {
								await this.natsClientPublish(
									user,
									'market',
									'installed',
									{
										appName: appName,
										vars: {
											appName
										}
									}
								);
							} else if (opType == 'stop' && state == 'stopped') {
								await this.natsClientPublish(
									user,
									'market',
									'stopped',
									{
										appName: appName,
										vars: {
											appName
										}
									}
								);
							} else if (
								opType == 'resume' &&
								state == 'running'
							) {
								await this.natsClientPublish(
									user,
									'market',
									'resumed',
									{
										appName: appName,
										vars: {
											appName
										}
									}
								);
							} else if (
								opType == 'uninstall' &&
								state == 'uninstalled'
							) {
								await this.natsClientPublish(
									user,
									'market',
									'uninstalled',
									{
										appName: appName,
										vars: {
											appName
										}
									}
								);
							}
						} else if (
							app.subject == process.env.NATS_SUBJECT_SYSTEM_VAULT
						) {
							//
						} else if (app.subject == process.env.NATS_SUBJECT) {
							const topic = data.topic;
							const nodeName = data.payload.nodeName;
							const status = normalizeBoolean(
								data.payload.status
							);
							console.log(
								'topic, nodeName, status',
								topic,
								nodeName,
								status
							);

							const admin_users = this.users.filter((u) =>
								u.groups.includes('lldap_admin')
							);
							console.log(admin_users);
							for (const user of admin_users) {
								let realTopic = '';
								if (topic == 'MemoryPressure') {
									if (status) {
										realTopic = 'memory_pressure';
									} else {
										realTopic = 'memory_no_pressure';
									}
								} else if (topic == 'DiskPressure') {
									if (status) {
										realTopic = 'disk_pressure';
									} else {
										realTopic = 'disk_no_pressure';
									}
								} else if (topic == 'PIDPressure') {
									if (status) {
										realTopic = 'pid_pressure';
									} else {
										realTopic = 'pid_no_pressure';
									}
								}

								console.log('realTopic', realTopic);

								if (realTopic) {
									await this.natsClientPublish(
										user.username,
										'system',
										realTopic,
										{
											nodeName,
											vars: {
												nodeName
											}
										}
									);
								}
							}
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
				pass: NATS_PASSWORD,
				maxReconnectAttempts: -1
			});
		} catch (error) {
			this.logger.error('error connecting to NATS:', error);
			return;
		}
		this.sc = StringCodec();

		const subjects = [
			// {
			// 	subject: process.env.NATS_SUBJECT || ''
			// },
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
			},
			{
				subject: process.env.NATS_SUBJECT || ''
			}
		];
		await this.handlesMessage(subjects);

		const templates = await this.templateService.findAll();
		this.logger.log(`Found ${templates.length} templates in the system`);

		for (const template of templates) {
			// Do something with each template
			console.log(template);
		}
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
			for (const user of response.data.items) {
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
