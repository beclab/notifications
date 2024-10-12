import {
  SenderType,
  RecipientType,
  ActiveStatus,
} from '@notifications/database';
import { MessageTopic } from '@bytetrade/core';

export const SenderList = [
  {
    sender: {
      name: 'TermiPass',
      type: SenderType.Application,
      app: 'vault',
      recipientType: RecipientType.Firebase,
      isEditable: false,
      user: '',
      status: ActiveStatus.Active,
    },
    credential: {
      appId: 'vault',
      appName: 'TermiPass',
      group: 'service.vault',
      dataType: 'notification',
      op: 'Create',
      url: '/system-server/v1alpha1/notification/service.vault/v1',
    },
  },
  {
    sender: {
      name: 'Desktop',
      type: SenderType.Application,
      app: 'desktop',
      recipientType: RecipientType.Firebase,
      isEditable: false,
      user: '',
      status: ActiveStatus.Active,
    },
    credential: {
      appId: 'desktop',
      appName: 'Desktop',
      group: 'service.desktop',
      dataType: 'notification',
      op: 'Create',
      url: '/system-server/v1alpha1/notification/service.desktop/v1',
    },
  },
];

export const RecipientsList = [
  {
    name: 'TermiPass',
    type: RecipientType.Firebase,
    isEditable: false,
    user: '',
    status: ActiveStatus.Active,
  },
  {
    name: 'Desktop',
    type: RecipientType.NoNeed,
    isEditable: false,
    user: '',
    status: ActiveStatus.Active,
  },
];

export const NotifyPolicyList = [
  {
    name: 'TermiPassAndDesktop',
    isDefault: true,
    user: '',
    status: ActiveStatus.Active,
  },
  {
    name: 'TermiPass',
    isDefault: false,
    user: '',
    status: ActiveStatus.Active,
  },
  {
    name: 'Desktop',
    isDefault: false,
    user: '',
    status: ActiveStatus.Active,
  },
];

export const TemplateList = [
  {
    topic: MessageTopic.Notification,
    name: 'Login',
    appId: 'system',
    appName: 'System',
    appTemplateName: 'login',
    defaultLanguage: 'en-US',
    content: {
      create: [
        {
          language: 'en-US',
          title: 'New user login',
          body: 'At {{time}}, {{username}} logged in to Terminus.',
        },
        {
          language: 'zh-CN',
          title: '新的用户登录',
          body: '在 {{time}}，{{username}} 登录了 Terminus',
        },
      ],
    },
    variables: ['username', 'device', 'time', 'location'],
    notifyGroup: 'TermiPassAndDesktop',
    user: '',
    status: ActiveStatus.Active,
  },
  {
    topic: MessageTopic.Data,
    name: 'Vault Updated',
    appId: 'vault',
    appName: 'Vault',
    appTemplateName: 'vault.account.update',
    defaultLanguage: 'en-US',
    content: {
      create: [
        {
          language: 'en-US',
          title: 'Vault updated',
          body: 'Vault updated.',
        },
        {
          language: 'zh-CN',
          title: 'Vault 更新',
          body: 'Vault 已更新',
        },
      ],
    },
    variables: [''],
    notifyGroup: 'TermiPass',
    user: '',
    status: ActiveStatus.Active,
  },
  {
    topic: MessageTopic.Data,
    name: 'Vault Updated',
    appId: 'vault',
    appName: 'Vault',
    appTemplateName: 'vault.org.update',
    defaultLanguage: 'en-US',
    content: {
      create: [
        {
          language: 'en-US',
          title: 'Vault Updated',
          body: 'Vault Updated.',
        },
        {
          language: 'zh-CN',
          title: 'Vault 更新',
          body: 'Vault 已更新',
        },
      ],
    },
    variables: ['org_id'],
    notifyGroup: 'TermiPass',
    user: '',
    status: ActiveStatus.Active,
  },
  {
    topic: MessageTopic.SIGN,
    name: 'Login Terminus Web',
    appId: 'system',
    appName: 'System',
    appTemplateName: 'system.second.verification',
    defaultLanguage: 'en-US',
    content: {
      create: [
        {
          language: 'en-US',
          title: 'Log in to Terminus',
          body: 'Your Terminus Name {{terminusName}} is being used to log in to Terminus. Please confirm whether it is done by you. Click Confirm to authorize the action, or Cancel to deny the action.',
        },
        {
          language: 'zh-CN',
          title: 'Terminus 登录提醒',
          body: '您的 Terminus Name {{terminusName}} 正在被用于登录 Terminus。请确认是否是您本人操作。点击确认以授权登录，点击取消拒绝登录。',
        },
      ],
    },
    variables: ['terminusName'],
    notifyGroup: 'TermiPass',
    user: '',
    status: ActiveStatus.Active,
  },
  {
    topic: MessageTopic.SIGN,
    name: 'Bind Terminus Space',
    appId: 'settings',
    appName: 'Settings',
    appTemplateName: 'settings.bind.space',
    defaultLanguage: 'en-US',
    content: {
      create: [
        {
          language: 'en-US',
          title: 'Bind Terminus Space',
          body: 'Your Terminus Name {{terminusName}} is being used to bind a Terminus Space account. Please confirm whether it is done by you. Click Confirm to authorize the action, or Cancel to deny the action.',
        },
        {
          language: 'zh-CN',
          title: '绑定 Terminus Space',
          body: '您的 Terminus Name {{terminusName}} 正在被用于创建 Terminus Space 账户。请确认是否是您本人操作。点击确认以同意，点击取消拒绝操作。',
        },
      ],
    },
    variables: ['terminusName'],
    notifyGroup: 'TermiPass',
    user: '',
    status: ActiveStatus.Active,
  },
  {
    topic: MessageTopic.CANCEL_SIGN,
    name: 'Cancel Sign',
    appId: 'settings',
    appName: 'Settings',
    appTemplateName: 'settings.cancel.sign',
    defaultLanguage: 'en-US',
    content: {},
    variables: [],
    notifyGroup: 'TermiPass',
    user: '',
    status: ActiveStatus.Active,
  },
  {
    topic: MessageTopic.CANCEL_SIGN,
    name: 'Cancel Sign',
    appId: 'system',
    appName: 'System',
    appTemplateName: 'system.cancel.sign',
    defaultLanguage: 'en-US',
    content: {},
    variables: [],
    notifyGroup: 'TermiPass',
    user: '',
    status: ActiveStatus.Active,
  },
  {
    topic: MessageTopic.SIGN,
    name: 'Bind New Ethereum Address',
    appId: 'settings',
    appName: 'Settings',
    appTemplateName: 'settings.bind.ethereum',
    defaultLanguage: 'en-US',
    content: {
      create: [
        {
          language: 'en-US',
          title: 'Bind New Ethereum Address',
          body: 'Your Terminus Name {{terminusName}} is applying for authorization to complete the {{address}} private key signature. Please confirm whether it is done by you. Click Confirm to authorize the action, or Cancel to deny the action.',
        },
        {
          language: 'zh-CN',
          title: '绑定新的以太坊地址',
          body: '您的 Terminus Name {{terminusName}} 正被用于授权完成  {{address}} 的私钥签名。请确认是否是您本人操作。点击确认以同意，点击取消拒绝操作。',
        },
      ],
    },
    variables: ['terminusName', 'address'],
    notifyGroup: 'TermiPass',
    user: '',
    status: ActiveStatus.Active,
  },
  {
    topic: MessageTopic.SIGN,
    name: 'Remove Bind Ethereum Address',
    appId: 'settings',
    appName: 'Settings',
    appTemplateName: 'settings.unbind.ethereum',
    defaultLanguage: 'en-US',
    content: {
      create: [
        {
          language: 'en-US',
          title: 'Unbind Ethereum Address',
          body: 'Your Terminus Name {{terminusName}} is applying for authorization to complete the {{address}} private key signature. Please confirm whether it is done by you. Click Confirm to authorize the action, or Cancel to deny the action.',
        },
        {
          language: 'zh-CN',
          title: '取消绑定以太坊地址',
          body: '您的 Terminus Name {{terminusName}} 正被用于授权完成 {{address}} 的私钥签名。请确认是否是您本人操作。点击确认以同意，点击取消拒绝操作。.',
        },
      ],
    },
    variables: ['terminusName', 'address'],
    notifyGroup: 'TermiPass',
    user: '',
    status: ActiveStatus.Active,
  },
  {
    topic: MessageTopic.SIGN,
    name: 'Bind NFT Avatar',
    appId: 'profile',
    appName: 'Profile',
    appTemplateName: 'profile.bind.nft',
    defaultLanguage: 'en-US',
    content: {
      create: [
        {
          language: 'en-US',
          title: 'Bind NFT Avatar',
          body: 'Your Terminus Name {{terminusName}} is applying to bind an NFT avatar, please confirm whether it is done by you. Click Confirm to authorize the action, or Cancel to deny the action.',
        },
        {
          language: 'zh-CN',
          title: '绑定 NFT 头像',
          body: '您的 Terminus Name {{terminusName}} 正在被用于绑定 NFT 头像。请确认是否是您本人操作。点击确认以同意，点击取消拒绝操作。',
        },
      ],
    },
    variables: ['terminusName'],
    notifyGroup: 'TermiPass',
    user: '',
    status: ActiveStatus.Active,
  },
];
