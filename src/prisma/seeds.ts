import { ActiveStatus, Level } from '@prisma/client';
import { MessageTopic } from '@bytetrade/core';

export const TemplateList = [
	{
		topic: MessageTopic.Notification,
		name: 'Login',
		appId: 'system',
		appName: 'System',
		appTemplateId: 'login',
		defaultLanguage: 'en-US',
		content: {
			create: [
				{
					language: 'en-US',
					title: 'New user login',
					body: 'At {{time}}, {{user}} logged in to Olares.'
				},
				{
					language: 'zh-CN',
					title: '新的用户登录',
					body: '在 {{time}}，{{user}} 登录了 Olares'
				}
			]
		},
		variables: ['user', 'time'],
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
					body: 'Vault updated.'
				},
				{
					language: 'zh-CN',
					title: 'Vault 更新',
					body: 'Vault 已更新'
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
					title: 'Vault Updated',
					body: 'Vault Updated.'
				},
				{
					language: 'zh-CN',
					title: 'Vault 更新',
					body: 'Vault 已更新'
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
					title: 'Log in to Olares',
					body: 'Your Olares ID {{user}} is being used to log in to Olares. Please confirm whether it is done by you. Click Confirm to authorize the action, or Cancel to deny the action.'
				},
				{
					language: 'zh-CN',
					title: 'Olares 登录提醒',
					body: '您的 Olares ID {{user}} 正在被用于登录 Olares。请确认是否是您本人操作。点击确认以授权登录，点击取消拒绝登录。'
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
					title: 'Bind Olares Space',
					body: 'Your Olares ID {{terminusName}} is being used to bind a Olares Space account. Please confirm whether it is done by you. Click Confirm to authorize the action, or Cancel to deny the action.'
				},
				{
					language: 'zh-CN',
					title: '绑定 Olares Space',
					body: '您的 Olares ID {{terminusName}} 正在被用于创建 Olares Space 账户。请确认是否是您本人操作。点击确认以同意，点击取消拒绝操作。'
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
					title: 'Bind New Ethereum Address',
					body: 'Your Olares ID {{terminusName}} is applying for authorization to complete the {{address}} private key signature. Please confirm whether it is done by you. Click Confirm to authorize the action, or Cancel to deny the action.'
				},
				{
					language: 'zh-CN',
					title: '绑定新的以太坊地址',
					body: '您的 Olares ID {{terminusName}} 正被用于授权完成  {{address}} 的私钥签名。请确认是否是您本人操作。点击确认以同意，点击取消拒绝操作。'
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
					title: 'Unbind Ethereum Address',
					body: 'Your Olares ID {{terminusName}} is applying for authorization to complete the {{address}} private key signature. Please confirm whether it is done by you. Click Confirm to authorize the action, or Cancel to deny the action.'
				},
				{
					language: 'zh-CN',
					title: '取消绑定以太坊地址',
					body: '您的 Olares ID {{terminusName}} 正被用于授权完成 {{address}} 的私钥签名。请确认是否是您本人操作。点击确认以同意，点击取消拒绝操作。.'
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
					title: 'Bind NFT Avatar',
					body: 'Your Olares ID {{terminusName}} is applying to bind an NFT avatar, please confirm whether it is done by you. Click Confirm to authorize the action, or Cancel to deny the action.'
				},
				{
					language: 'zh-CN',
					title: '绑定 NFT 头像',
					body: '您的 Olares ID {{terminusName}} 正在被用于绑定 NFT 头像。请确认是否是您本人操作。点击确认以同意，点击取消拒绝操作。'
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
					title: 'New app installed',
					body: '{{appName}} is successfully installed and ready for use.'
				},
				{
					language: 'zh-CN',
					title: '新应用完成安装',
					body: '{{appName}} 已成功安装并可供使用。'
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
					title: 'App closed',
					body: '{{appName}} has stopped. You can restart it at any time.'
				},
				{
					language: 'zh-CN',
					title: '应用已关闭',
					body: '{{appName}} 已停止运行。您可以随时重启它。'
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
					body: '{{appName}} has resumed and is ready for use.'
				},
				{
					language: 'zh-CN',
					title: '应用恢复',
					body: '{{appName}} 现已恢复，可供您使用。'
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
					body: '{{appName}} and its associated data have been removed.'
				},
				{
					language: 'zh-CN',
					title: '应用已卸载',
					body: '{{appName}} 及其相关数据已被移除。'
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
					body: 'The disk space on node {{nodeName}} is almost full. Please free up space to ensure stable operation.'
				},
				{
					language: 'zh-CN',
					title: '磁盘空间不足',
					body: '节点 {{nodeName}} 的磁盘空间即将用尽。请及时清理空间以确保系统稳定运行。'
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
					body: 'The disk space on node {{nodeName}} is now at a safe level.'
				},
				{
					language: 'zh-CN',
					title: '磁盘空间已恢复',
					body: '节点 {{nodeName}} 的磁盘空间已恢复至安全水平。'
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
					body: 'Available memory on node {{nodeName}} is critically low. Please free up memory to ensure stable operation.'
				},
				{
					language: 'zh-CN',
					title: '内存不足',
					body: '节点 {{nodeName}} 的可用内存严重不足。请及时释放内存以确保稳定运行。'
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
					body: 'Available memory on node {{nodeName}} has returned to a safe level.'
				},
				{
					language: 'zh-CN',
					title: '内存已恢复',
					body: '节点 {{nodeName}} 的可用内存已恢复至安全水平。'
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
					title: 'Low PID',
					body: 'Available process IDs (PIDs) on node {{nodeName}} are critically low. Consider stopping unnecessary processes to ensure system stability.'
				},
				{
					language: 'zh-CN',
					title: 'PID 数量不足',
					body: '节点 {{nodeName}} 的可用进程 ID (PID) 严重不足。请考虑停止非必要进程以确保系统稳定。'
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
					body: 'Process ID (PID) usage on node {{nodeName}} has returned to a safe level.'
				},
				{
					language: 'zh-CN',
					title: 'PID 数量已恢复',
					body: '节点 {{nodeName}} 的进程 ID (PID) 数量已恢复至安全水平。'
				}
			]
		},
		variables: ['nodeName'],
		level: Level.Warning,
		user: '',
		status: ActiveStatus.Active
	}
];
