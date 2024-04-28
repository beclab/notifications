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
    defaultLanguage: 'en',
    content: {
      create: [
        {
          language: 'en',
          title: 'New User Login',
          body: 'At {{time}}, user {{username}} logged in to Terminus on {{device}} located in {{location}}.',
        },
        {
          language: 'cn',
          title: '新的用户登录',
          body: '在 {{time}}，用户 {{username}} 在位于 {{location}} 的 {{device}} 上登录了 Terminus',
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
    defaultLanguage: 'en',
    content: {
      create: [
        {
          language: 'en',
          title: 'Vault Updated',
          body: 'Vault Updated.',
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
    defaultLanguage: 'en',
    content: {
      create: [
        {
          language: 'en',
          title: 'Vault Updated',
          body: 'Vault Updated.',
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
    defaultLanguage: 'en',
    content: {
      create: [
        {
          language: 'en',
          title: 'Login Terminus Web',
          body: 'Your Terminus Name {{terminusName}} is being used to log in to Terminus web. Please confirm whether it is done by you. Click Confirm to authorize the action, or Cancel to deny the action.',
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
    defaultLanguage: 'en',
    content: {
      create: [
        {
          language: 'en',
          title: 'Bind Terminus Space',
          body: 'Your Terminus Name {{terminusName}} is applying to bind a Terminus Space account. Please confirm whether it is done by you. Click Confirm to authorize the action, or Cancel to deny the action.',
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
    defaultLanguage: 'en',
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
    defaultLanguage: 'en',
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
    defaultLanguage: 'en',
    content: {
      create: [
        {
          language: 'en',
          title: 'Bind New Ethereum Address',
          body: 'Your Terminus Name {{terminusName}} is applying for authorization to complete the {{address}} private key signature. Please confirm whether it is done by you. Click Confirm to authorize the action, or Cancel to deny the action.',
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
    defaultLanguage: 'en',
    content: {
      create: [
        {
          language: 'en',
          title: 'Remove Bind Ethereum Address',
          body: 'Your Terminus Name {{terminusName}} is applying for authorization to complete the {{address}} private key signature. Please confirm whether it is done by you. Click Confirm to authorize the action, or Cancel to deny the action.',
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
    defaultLanguage: 'en',
    content: {
      create: [
        {
          language: 'en',
          title: 'Bind NFT Avatar',
          body: 'Your Terminus Name {{terminusName}} is applying to bind an NFT avatar, please confirm whether it is done by you. Click Confirm to authorize the action, or Cancel to deny the action.',
        },
      ],
    },
    variables: ['terminusName'],
    notifyGroup: 'TermiPass',
    user: '',
    status: ActiveStatus.Active,
  },
];
