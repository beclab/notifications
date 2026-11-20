import { ActiveStatus, Level } from '@prisma/client';
import { MessageTopic } from '../core';
import {
	DEVICE_INVENTORY_APP_ID,
	DEVICE_OFFLINE_TEMPLATE,
	DEVICE_ONLINE_TEMPLATE
} from '../notification/device-inventory';

const copy = {
	'en-US': {
		online: {
			title: 'Device back online',
			body: 'On {{node}}, {{device}} is bound to {{apps}}'
		},
		offline: {
			title: 'Device offline',
			body: '{{apps}} may lose access to {{device}} on {{node}}'
		}
	},
	'zh-CN': {
		online: {
			title: '设备已恢复在线',
			body: '{{node}} 上的 {{device}} 已绑定到 {{apps}}'
		},
		offline: {
			title: '设备已离线',
			body: '{{apps}} 可能暂时无法使用 {{node}} 上的 {{device}}'
		}
	},
	'de-DE': {
		online: {
			title: 'Gerät wieder online',
			body: 'Am Knoten {{node}} ist {{device}} {{apps}} zugewiesen'
		},
		offline: {
			title: 'Gerät offline',
			body: '{{apps}} können vorübergehend den Zugriff auf {{device}} am Knoten {{node}} verlieren'
		}
	},
	'es-ES': {
		online: {
			title: 'Dispositivo de nuevo en línea',
			body: 'En {{node}}, {{device}} está vinculado a {{apps}}'
		},
		offline: {
			title: 'Dispositivo sin conexión',
			body: 'Es posible que se interrumpa el acceso de {{apps}} a {{device}} en {{node}}'
		}
	},
	'it-IT': {
		online: {
			title: 'Dispositivo di nuovo online',
			body: 'Su {{node}}, {{device}} è associato a {{apps}}'
		},
		offline: {
			title: 'Dispositivo offline',
			body: 'L’accesso di {{apps}} a {{device}} su {{node}} potrebbe interrompersi'
		}
	},
	'fr-FR': {
		online: {
			title: 'Appareil de nouveau en ligne',
			body: 'Sur {{node}}, {{device}} est associé à {{apps}}'
		},
		offline: {
			title: 'Appareil hors ligne',
			body: 'L’accès de {{apps}} à {{device}} sur {{node}} peut être interrompu'
		}
	},
	'ja-JP': {
		online: {
			title: 'デバイスがオンラインに復帰',
			body: '{{node}} の {{device}} は {{apps}} に割り当てられています'
		},
		offline: {
			title: 'デバイスがオフライン',
			body: '{{apps}} は {{node}} の {{device}} に一時的にアクセスできない場合があります'
		}
	}
};

const definitions = [
	{
		state: 'offline',
		id: DEVICE_OFFLINE_TEMPLATE,
		name: 'Device offline',
		level: Level.Warning
	},
	{
		state: 'online',
		id: DEVICE_ONLINE_TEMPLATE,
		name: 'Device back online',
		level: Level.Info
	}
] as const;

export const DeviceInventoryTemplates = definitions.map(
	({ state, id, name, level }) => ({
		topic: MessageTopic.Notification,
		name,
		appId: DEVICE_INVENTORY_APP_ID,
		appName: 'System',
		appTemplateId: id,
		defaultLanguage: 'en-US',
		content: {
			create: Object.entries(copy).map(([language, messages]) => ({
				language,
				...messages[state]
			}))
		},
		variables: ['node', 'device', 'apps'],
		level,
		user: '',
		status: ActiveStatus.Active
	})
);
