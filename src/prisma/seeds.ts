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
					body: 'At {{time}}, {{username}} logged in to Olares.'
				},
				{
					language: 'zh-CN',
					title: '新的用户登录',
					body: '在 {{time}}，{{username}} 登录了 Olares'
				}
			]
		},
		variables: ['username', 'device', 'time', 'location'],
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
					body: 'Your Olares ID {{terminusName}} is being used to log in to Olares. Please confirm whether it is done by you. Click Confirm to authorize the action, or Cancel to deny the action.'
				},
				{
					language: 'zh-CN',
					title: 'Olares 登录提醒',
					body: '您的 Olares ID {{terminusName}} 正在被用于登录 Olares。请确认是否是您本人操作。点击确认以授权登录，点击取消拒绝登录。'
				}
			]
		},
		variables: ['terminusName'],
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
	}
];
