import { ActiveStatus, Level } from '@prisma/client';
import { MessageTopic } from '@bytetrade/core';

export const TemplateList = [
	{
		topic: MessageTopic.Notification,
		name: 'Login',
		appId: 'system',
		appName: 'System',
		appTemplateId: 'login_v2',
		defaultLanguage: 'en-US',
		content: {
			create: [
				{
					language: 'en-US',
					title: 'User logged in',
					body: 'User {{user}} logged in to Olares'
				},
				{
					language: 'zh-CN',
					title: '用户已登录',
					body: '用户 {{user}} 已登录 Olares'
				}
			]
		},
		variables: ['user'],
		level: Level.Info,
		user: '',
		status: ActiveStatus.Active
	},
	{
		topic: MessageTopic.Data,
		name: 'Vault Updated',
		appId: 'vault',
		appName: 'Vault',
		appTemplateId: 'vault.account.update',
		defaultLanguage: 'en-US',
		content: {
			create: [
				{
					language: 'en-US',
					title: 'Vault updated',
					body: 'Your Vault data is up to date'
				},
				{
					language: 'zh-CN',
					title: 'Vault 已更新',
					body: 'Vault 数据已是最新'
				}
			]
		},
		variables: [''],
		user: '',
		level: Level.Info,
		status: ActiveStatus.Active
	},
	{
		topic: MessageTopic.Data,
		name: 'Vault Updated',
		appId: 'vault',
		appName: 'Vault',
		appTemplateId: 'vault.org.update',
		defaultLanguage: 'en-US',
		content: {
			create: [
				{
					language: 'en-US',
					title: 'Vault updated',
					body: 'Your Vault data is up to date'
				},
				{
					language: 'zh-CN',
					title: 'Vault 已更新',
					body: 'Vault 数据已是最新'
				}
			]
		},
		variables: ['org_id'],
		user: '',
		level: Level.Info,
		status: ActiveStatus.Active
	},
	{
		topic: MessageTopic.SIGN,
		name: 'Login Olares Web',
		appId: 'system',
		appName: 'System',
		appTemplateId: 'system.second.verification',
		defaultLanguage: 'en-US',
		content: {
			create: [
				{
					language: 'en-US',
					title: 'Log in to Olares?',
					body: 'Your Olares ID {{user}} is being used to log in to Olares. Select Confirm to continue, or Cancel if this wasn’t you.'
				},
				{
					language: 'zh-CN',
					title: '登录 Olares？',
					body: 'Olares ID {{user}} 正在用于登录 Olares。如是本人操作，请选择确认。否则请选择取消。'
				}
			]
		},
		variables: ['user'],
		user: '',
		level: Level.Sign,
		status: ActiveStatus.Active
	},
	{
		topic: MessageTopic.SIGN,
		name: 'Bind Olares Space',
		appId: 'settings',
		appName: 'Settings',
		appTemplateId: 'settings.bind.space',
		defaultLanguage: 'en-US',
		content: {
			create: [
				{
					language: 'en-US',
					title: 'Log in to Olares Space?',
					body: 'Your Olares ID {{terminusName}} is being used to log in to Olares Space. Select Confirm to continue, or Cancel if this wasn’t you.'
				},
				{
					language: 'zh-CN',
					title: '登录 Olares Space？',
					body: 'Olares ID {{terminusName}} 正在用于登录 Olares Space。如是本人操作，请选择确认。否则请选择取消。'
				}
			]
		},
		variables: ['terminusName'],
		user: '',
		level: Level.Sign,
		status: ActiveStatus.Active
	},
	{
		topic: MessageTopic.CANCEL_SIGN,
		name: 'Cancel Sign',
		appId: 'settings',
		appName: 'Settings',
		appTemplateId: 'settings.cancel.sign',
		defaultLanguage: 'en-US',
		content: {},
		variables: [],
		user: '',
		level: Level.Sign,
		status: ActiveStatus.Active
	},
	{
		topic: MessageTopic.CANCEL_SIGN,
		name: 'Cancel Sign',
		appId: 'system',
		appName: 'System',
		appTemplateId: 'system.cancel.sign',
		defaultLanguage: 'en-US',
		content: {},
		variables: [],
		user: '',
		level: Level.Sign,
		status: ActiveStatus.Active
	},
	{
		topic: MessageTopic.SIGN,
		name: 'Bind New Ethereum Address',
		appId: 'settings',
		appName: 'Settings',
		appTemplateId: 'settings.bind.ethereum',
		defaultLanguage: 'en-US',
		content: {
			create: [
				{
					language: 'en-US',
					title: 'Bind new Ethereum address?',
					body: 'Your Olares ID {{terminusName}} is requesting to bind Ethereum address {{address}}. Select Confirm to continue, or Cancel if this wasn’t you.'
				},
				{
					language: 'zh-CN',
					title: '绑定新的以太坊地址？',
					body: 'Olares ID {{terminusName}} 正在请求绑定以太坊地址 {{address}}。如是本人操作，请选择确认。否则请选择取消。'
				}
			]
		},
		variables: ['terminusName', 'address'],
		user: '',
		level: Level.Sign,
		status: ActiveStatus.Active
	},
	{
		topic: MessageTopic.SIGN,
		name: 'Remove Bind Ethereum Address',
		appId: 'settings',
		appName: 'Settings',
		appTemplateId: 'settings.unbind.ethereum',
		defaultLanguage: 'en-US',
		content: {
			create: [
				{
					language: 'en-US',
					title: 'Unbind Ethereum address?',
					body: 'Your Olares ID {{terminusName}} is requesting to unbind Ethereum address {{address}}. Select Confirm to continue, or Cancel if this wasn’t you.'
				},
				{
					language: 'zh-CN',
					title: '解绑以太坊地址？',
					body: 'Olares ID {{terminusName}} 正在请求解绑以太坊地址 {{address}}。如是本人操作，请选择确认。否则请选择取消。'
				}
			]
		},
		variables: ['terminusName', 'address'],
		user: '',
		level: Level.Sign,
		status: ActiveStatus.Active
	},
	{
		topic: MessageTopic.SIGN,
		name: 'Bind NFT Avatar',
		appId: 'profile',
		appName: 'Profile',
		appTemplateId: 'profile.bind.nft',
		defaultLanguage: 'en-US',
		content: {
			create: [
				{
					language: 'en-US',
					title: 'Set NFT avatar?',
					body: 'Your Olares ID {{terminusName}} is setting an NFT avatar. Select Confirm to continue, or Cancel if this wasn’t you.'
				},
				{
					language: 'zh-CN',
					title: '设置 NFT 头像？',
					body: 'Olares ID {{terminusName}} 正在请求设置 NFT 头像。如是本人操作，请选择确认。否则请选择取消。'
				}
			]
		},
		variables: ['terminusName'],
		user: '',
		level: Level.Sign,
		status: ActiveStatus.Active
	},
	{
		topic: MessageTopic.Notification,
		name: 'Application Installed',
		appId: 'market',
		appName: 'Market',
		appTemplateId: 'installed',
		defaultLanguage: 'en-US',
		content: {
			create: [
				{
					language: 'en-US',
					title: 'App installed',
					body: '{{appName}} is ready to use'
				},
				{
					language: 'zh-CN',
					title: '应用已安装',
					body: '{{appName}} 可以使用了'
				}
			]
		},
		variables: ['appName'],
		level: Level.Info,
		user: '',
		status: ActiveStatus.Active
	},
	{
		topic: MessageTopic.Notification,
		name: 'Application Stopped',
		appId: 'market',
		appName: 'Market',
		appTemplateId: 'stopped',
		defaultLanguage: 'en-US',
		content: {
			create: [
				{
					language: 'en-US',
					title: 'App stopped',
					body: '{{appName}} stopped running. You can restart it anytime.'
				},
				{
					language: 'zh-CN',
					title: '应用已停止',
					body: '{{appName}} 已停止运行。可随时重启。'
				}
			]
		},
		variables: ['appName'],
		level: Level.Info,
		user: '',
		status: ActiveStatus.Active
	},
	{
		topic: MessageTopic.Notification,
		name: 'Application Stopped',
		appId: 'market',
		appName: 'Market',
		appTemplateId: 'stopped_by_user_v1',
		defaultLanguage: 'en-US',
		content: {
			create: [
				{
					language: 'en-US',
					title: 'App stopped',
					body: '{{title}} stopped running. Reason: stopped manually. You can restart it anytime.'
				},
				{
					language: 'zh-CN',
					title: '应用已停止',
					body: '{{title}} 已停止运行。原因：手动停止。可随时重启。'
				}
			]
		},
		variables: ['title'],
		level: Level.Info,
		user: '',
		status: ActiveStatus.Active
	},
	{
		topic: MessageTopic.Notification,
		name: 'Application Stopped',
		appId: 'market',
		appName: 'Market',
		appTemplateId: 'stopped_evicted',
		defaultLanguage: 'en-US',
		content: {
			create: [
				{
					language: 'en-US',
					title: 'App stopped',
					body: '{{title}} stopped running. Reason: high system load. You can restart it anytime.'
				},
				{
					language: 'zh-CN',
					title: '应用已停止',
					body: '{{title}} 已停止运行。原因：系统负载过高。可随时重启。'
				}
			]
		},
		variables: ['title'],
		level: Level.Info,
		user: '',
		status: ActiveStatus.Active
	},
	{
		topic: MessageTopic.Notification,
		name: 'Application Stopped',
		appId: 'market',
		appName: 'Market',
		appTemplateId: 'stopped_init_failed',
		defaultLanguage: 'en-US',
		content: {
			create: [
				{
					language: 'en-US',
					title: 'App stopped',
					body: '{{title}} stopped running. Reason: initialization issue. You can restart it anytime.'
				},
				{
					language: 'zh-CN',
					title: '应用已停止',
					body: '{{title}} 已停止运行。原因：初始化异常。可随时重启。'
				}
			]
		},
		variables: ['title'],
		level: Level.Info,
		user: '',
		status: ActiveStatus.Active
	},
	{
		topic: MessageTopic.Notification,
		name: 'Application Stopped',
		appId: 'market',
		appName: 'Market',
		appTemplateId: 'stopped_unknown',
		defaultLanguage: 'en-US',
		content: {
			create: [
				{
					language: 'en-US',
					title: 'App stopped',
					body: '{{title}} stopped running. Reason: unknown. You can restart it anytime.'
				},
				{
					language: 'zh-CN',
					title: '应用已停止',
					body: '{{title}} 已停止运行。原因：未知。可随时重启。'
				}
			]
		},
		variables: ['title'],
		level: Level.Info,
		user: '',
		status: ActiveStatus.Active
	},
	{
		topic: MessageTopic.Notification,
		name: 'Application Stopped',
		appId: 'market',
		appName: 'Market',
		appTemplateId: 'stopped_hami_unschedulable',
		defaultLanguage: 'en-US',
		content: {
			create: [
				{
					language: 'en-US',
					title: 'App stopped',
					body: '{{title}} stopped running. Reason: insufficient VRAM.'
				},
				{
					language: 'zh-CN',
					title: '应用已停止',
					body: '{{title}} 已停止运行。原因：显存不足。'
				}
			]
		},
		variables: ['title'],
		level: Level.Info,
		user: '',
		status: ActiveStatus.Active
	},
	{
		topic: MessageTopic.Notification,
		name: 'Application Resumed',
		appId: 'market',
		appName: 'Market',
		appTemplateId: 'resumed',
		defaultLanguage: 'en-US',
		content: {
			create: [
				{
					language: 'en-US',
					title: 'App resumed',
					body: '{{appName}} is ready to use'
				},
				{
					language: 'zh-CN',
					title: '应用已恢复',
					body: '{{appName}} 已恢复，可以使用了'
				}
			]
		},
		variables: ['appName'],
		level: Level.Info,
		user: '',
		status: ActiveStatus.Active
	},
	{
		topic: MessageTopic.Notification,
		name: 'Application Uninstalled',
		appId: 'market',
		appName: 'Market',
		appTemplateId: 'uninstalled',
		defaultLanguage: 'en-US',
		content: {
			create: [
				{
					language: 'en-US',
					title: 'App uninstalled',
					body: 'Associated data for {{appName}} has been removed'
				},
				{
					language: 'zh-CN',
					title: '应用已卸载',
					body: '{{appName}} 的相关数据已移除'
				}
			]
		},
		variables: ['appName'],
		level: Level.Info,
		user: '',
		status: ActiveStatus.Active
	},
	{
		topic: MessageTopic.Notification,
		name: 'Disk has pressure',
		appId: 'system',
		appName: 'System',
		appTemplateId: 'disk_pressure',
		defaultLanguage: 'en-US',
		content: {
			create: [
				{
					language: 'en-US',
					title: 'Low disk space',
					body: 'Disk space on node {{nodeName}} is almost full. Free up space to keep the system stable.'
				},
				{
					language: 'zh-CN',
					title: '磁盘空间不足',
					body: '节点 {{nodeName}} 的磁盘空间即将用尽。请清理空间，避免影响系统稳定性。'
				}
			]
		},
		variables: ['nodeName'],
		level: Level.Warning,
		user: '',
		status: ActiveStatus.Active
	},
	{
		topic: MessageTopic.Notification,
		name: 'Disk pressure released',
		appId: 'system',
		appName: 'System',
		appTemplateId: 'disk_no_pressure',
		defaultLanguage: 'en-US',
		content: {
			create: [
				{
					language: 'en-US',
					title: 'Disk space restored',
					body: 'Disk space on node {{nodeName}} is back to a safe level'
				},
				{
					language: 'zh-CN',
					title: '磁盘空间已恢复',
					body: '节点 {{nodeName}} 的磁盘空间已恢复到安全水平'
				}
			]
		},
		variables: ['nodeName'],
		level: Level.Warning,
		user: '',
		status: ActiveStatus.Active
	},
	{
		topic: MessageTopic.Notification,
		name: 'Memory has pressure',
		appId: 'system',
		appName: 'System',
		appTemplateId: 'memory_pressure',
		defaultLanguage: 'en-US',
		content: {
			create: [
				{
					language: 'en-US',
					title: 'Low memory',
					body: 'Available memory on node {{nodeName}} is critically low. Free up memory to keep the system stable.'
				},
				{
					language: 'zh-CN',
					title: '内存不足',
					body: '节点 {{nodeName}} 的可用内存严重不足。请释放内存，避免影响系统稳定性。'
				}
			]
		},
		variables: ['nodeName'],
		level: Level.Warning,
		user: '',
		status: ActiveStatus.Active
	},
	{
		topic: MessageTopic.Notification,
		name: 'Memory pressure released',
		appId: 'system',
		appName: 'System',
		appTemplateId: 'memory_no_pressure',
		defaultLanguage: 'en-US',
		content: {
			create: [
				{
					language: 'en-US',
					title: 'Memory usage restored',
					body: 'Available memory on node {{nodeName}} is back to a safe level'
				},
				{
					language: 'zh-CN',
					title: '内存已恢复',
					body: '节点 {{nodeName}} 的可用内存已恢复到安全水平'
				}
			]
		},
		variables: ['nodeName'],
		level: Level.Warning,
		user: '',
		status: ActiveStatus.Active
	},
	{
		topic: MessageTopic.Notification,
		name: 'Pid has pressure',
		appId: 'system',
		appName: 'System',
		appTemplateId: 'pid_pressure',
		defaultLanguage: 'en-US',
		content: {
			create: [
				{
					language: 'en-US',
					title: 'Low process ID availability',
					body: 'Available process IDs (PIDs) on node {{nodeName}} are critically low. Stop unnecessary processes to keep the system stable.'
				},
				{
					language: 'zh-CN',
					title: 'PID 数量不足',
					body: '节点 {{nodeName}} 的可用进程 ID (PID) 严重不足。请停止非必要进程，避免影响系统稳定性。'
				}
			]
		},
		variables: ['nodeName'],
		level: Level.Warning,
		user: '',
		status: ActiveStatus.Active
	},
	{
		topic: MessageTopic.Notification,
		name: 'Pid pressure released',
		appId: 'system',
		appName: 'System',
		appTemplateId: 'pid_no_pressure',
		defaultLanguage: 'en-US',
		content: {
			create: [
				{
					language: 'en-US',
					title: 'PID usage restored',
					body: 'Process ID (PID) usage on node {{nodeName}} is back to a safe level'
				},
				{
					language: 'zh-CN',
					title: 'PID 数量已恢复',
					body: '节点 {{nodeName}} 的进程 ID (PID) 数量已恢复到安全水平'
				}
			]
		},
		variables: ['nodeName'],
		level: Level.Warning,
		user: '',
		status: ActiveStatus.Active
	},
	{
		topic: MessageTopic.Notification,
		name: 'Create',
		appId: 'system',
		appName: 'System',
		appTemplateId: 'create_v2',
		defaultLanguage: 'en-US',
		content: {
			create: [
				{
					language: 'en-US',
					title: 'User added',
					body: 'User {{user}} was added'
				},
				{
					language: 'zh-CN',
					title: '用户已添加',
					body: '用户 {{user}} 已添加'
				}
			]
		},
		variables: ['user'],
		level: Level.Info,
		user: '',
		status: ActiveStatus.Active
	},
	{
		topic: MessageTopic.Notification,
		name: 'Delete',
		appId: 'system',
		appName: 'System',
		appTemplateId: 'delete_v2',
		defaultLanguage: 'en-US',
		content: {
			create: [
				{
					language: 'en-US',
					title: 'User deleted',
					body: 'User {{user}} was deleted'
				},
				{
					language: 'zh-CN',
					title: '用户已删除',
					body: '用户 {{user}} 已删除'
				}
			]
		},
		variables: ['user'],
		level: Level.Info,
		user: '',
		status: ActiveStatus.Active
	},
	{
		topic: MessageTopic.SIGN,
		name: 'Application Payment',
		appId: 'market',
		appName: 'Market',
		appTemplateId: 'market.fetch.payment.v1',
		defaultLanguage: 'en-US',
		content: {
			create: [
				{
					language: 'en-US',
					title: 'Authorize payment access?',
					body: 'Olares Market wants to access your payment profile. Continue only if you started this request.'
				},
				{
					language: 'zh-CN',
					title: '授权访问支付信息？',
					body: 'Olares Market 正在请求访问支付信息。仅在本人发起请求时继续。'
				}
			]
		},
		variables: [],
		user: '',
		level: Level.Sign,
		status: ActiveStatus.Active
	},
	{
		topic: MessageTopic.SIGN,
		name: 'Application Payment',
		appId: 'market',
		appName: 'Market',
		appTemplateId: 'market.payment.v1',
		defaultLanguage: 'en-US',
		content: {
			create: [
				{
					language: 'en-US',
					title: 'Authorize purchase?',
					body: 'You’re authorizing a payment for this app. Continue only if you started this purchase.'
				},
				{
					language: 'zh-CN',
					title: '授权购买？',
					body: '此应用正在请求付款授权。仅在本人发起购买时继续。'
				}
			]
		},
		variables: [],
		user: '',
		level: Level.Sign,
		status: ActiveStatus.Active
	},
	{
		topic: MessageTopic.Data,
		name: 'Save Application Payment',
		appId: 'market',
		appName: 'Market',
		appTemplateId: 'market.save.vc',
		defaultLanguage: 'en-US',
		content: {},
		variables: [],
		user: '',
		level: Level.Sign,
		status: ActiveStatus.Active
	}
];
