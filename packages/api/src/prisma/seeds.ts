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
          body: 'At {{time}}, {{username}} logged in to Olares.',
        },
        {
          language: 'zh-CN',
          title: '新的用户登录',
          body: '在 {{time}}，{{username}} 登录了 Olares',
        },
        {
        	language: 'de-DE',
        	title: 'Neue Benutzeranmeldung',
        	body: 'Am {{time}} hat sich {{username}} bei Olares angemeldet.'
        },
        {
        	language: 'es-ES',
        	title: 'Nuevo inicio de sesión de usuario',
        	body: 'El {{time}}, {{username}} inició sesión en Olares.'
        },
        {
        	language: 'fr-FR',
        	title: 'Nouvelle connexion utilisateur',
        	body: 'Le {{time}}, {{username}} s\'est connecté à Olares.'
        },
        {
        	language: 'it-IT',
        	title: 'Nuovo accesso utente',
        	body: 'Il {{time}}, {{username}} ha effettuato l\'accesso a Olares.'
        },
        {
        	language: 'ja-JP',
        	title: '新しいユーザーログイン',
        	body: '{{time}} に {{username}} が Olares にログインしました。'
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
        {
        	language: 'de-DE',
        	title: 'Vault aktualisiert',
        	body: 'Vault wurde aktualisiert.'
        },
        {
        	language: 'es-ES',
        	title: 'Vault actualizado',
        	body: 'Vault se ha actualizado.'
        },
        {
        	language: 'fr-FR',
        	title: 'Vault mis à jour',
        	body: 'Vault a été mis à jour.'
        },
        {
        	language: 'it-IT',
        	title: 'Vault aggiornato',
        	body: 'Vault è stato aggiornato.'
        },
        {
        	language: 'ja-JP',
        	title: 'Vault が更新されました',
        	body: 'Vault が更新されました。'
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
        {
        	language: 'de-DE',
        	title: 'Vault aktualisiert',
        	body: 'Vault wurde aktualisiert.'
        },
        {
        	language: 'es-ES',
        	title: 'Vault actualizado',
        	body: 'Vault se ha actualizado.'
        },
        {
        	language: 'fr-FR',
        	title: 'Vault mis à jour',
        	body: 'Vault a été mis à jour.'
        },
        {
        	language: 'it-IT',
        	title: 'Vault aggiornato',
        	body: 'Vault è stato aggiornato.'
        },
        {
        	language: 'ja-JP',
        	title: 'Vault が更新されました',
        	body: 'Vault が更新されました。'
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
    name: 'Login Olares Web',
    appId: 'system',
    appName: 'System',
    appTemplateName: 'system.second.verification',
    defaultLanguage: 'en-US',
    content: {
      create: [
        {
          language: 'en-US',
          title: 'Log in to Olares',
          body: 'Your Olares ID {{terminusName}} is being used to log in to Olares. Please confirm whether it is done by you. Click Confirm to authorize the action, or Cancel to deny the action.',
        },
        {
          language: 'zh-CN',
          title: 'Olares 登录提醒',
          body: '您的 Olares ID {{terminusName}} 正在被用于登录 Olares。请确认是否是您本人操作。点击确认以授权登录，点击取消拒绝登录。',
        },
        {
        	language: 'de-DE',
        	title: 'Bei Olares anmelden',
        	body: 'Ihre Olares ID {{terminusName}} wird verwendet, um sich bei Olares anzumelden. Bitte bestätigen Sie, ob dies von Ihnen veranlasst wurde. Tippen Sie auf Bestätigen, um die Aktion zu autorisieren, oder auf Abbrechen, um sie abzulehnen.'
        },
        {
        	language: 'es-ES',
        	title: 'Iniciar sesión en Olares',
        	body: 'Tu Olares ID {{terminusName}} se está utilizando para iniciar sesión en Olares. Confirma si has sido tú. Toca Confirmar para autorizar la acción o Cancelar para rechazarla.'
        },
        {
        	language: 'fr-FR',
        	title: 'Connexion à Olares',
        	body: 'Votre Olares ID {{terminusName}} est utilisé pour se connecter à Olares. Merci de confirmer si c\'est bien vous. Appuyez sur Confirmer pour autoriser l\'action, ou sur Annuler pour la refuser.'
        },
        {
        	language: 'it-IT',
        	title: 'Accesso a Olares',
        	body: 'Il tuo Olares ID {{terminusName}} viene utilizzato per accedere a Olares. Conferma se sei stato tu. Tocca Conferma per autorizzare l\'azione oppure Annulla per rifiutarla.'
        },
        {
        	language: 'ja-JP',
        	title: 'Olares へのログイン',
        	body: 'お使いの Olares ID {{terminusName}} が Olares へのログインに使用されています。本人による操作かご確認ください。操作を許可する場合は「確認」を、拒否する場合は「キャンセル」をタップしてください。'
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
    name: 'Bind Olares Space',
    appId: 'settings',
    appName: 'Settings',
    appTemplateName: 'settings.bind.space',
    defaultLanguage: 'en-US',
    content: {
      create: [
        {
          language: 'en-US',
          title: 'Bind Olares Space',
          body: 'Your Olares ID {{terminusName}} is being used to bind a Olares Space account. Please confirm whether it is done by you. Click Confirm to authorize the action, or Cancel to deny the action.',
        },
        {
          language: 'zh-CN',
          title: '绑定 Olares Space',
          body: '您的 Olares ID {{terminusName}} 正在被用于创建 Olares Space 账户。请确认是否是您本人操作。点击确认以同意，点击取消拒绝操作。',
        },
        {
        	language: 'de-DE',
        	title: 'Olares Space verbinden',
        	body: 'Ihre Olares ID {{terminusName}} wird verwendet, um ein Olares Space-Konto zu verbinden. Bitte bestätigen Sie, ob dies von Ihnen veranlasst wurde. Tippen Sie auf Bestätigen, um die Aktion zu autorisieren, oder auf Abbrechen, um sie abzulehnen.'
        },
        {
        	language: 'es-ES',
        	title: 'Vincular Olares Space',
        	body: 'Tu Olares ID {{terminusName}} se está utilizando para vincular una cuenta de Olares Space. Confirma si has sido tú. Toca Confirmar para autorizar la acción o Cancelar para rechazarla.'
        },
        {
        	language: 'fr-FR',
        	title: 'Associer Olares Space',
        	body: 'Votre Olares ID {{terminusName}} est utilisé pour associer un compte Olares Space. Merci de confirmer si c\'est bien vous. Appuyez sur Confirmer pour autoriser l\'action, ou sur Annuler pour la refuser.'
        },
        {
        	language: 'it-IT',
        	title: 'Collega Olares Space',
        	body: 'Il tuo Olares ID {{terminusName}} viene utilizzato per collegare un account Olares Space. Conferma se sei stato tu. Tocca Conferma per autorizzare l\'azione oppure Annulla per rifiutarla.'
        },
        {
        	language: 'ja-JP',
        	title: 'Olares Space を連携',
        	body: 'お使いの Olares ID {{terminusName}} が Olares Space アカウントの連携に使用されています。本人による操作かご確認ください。操作を許可する場合は「確認」を、拒否する場合は「キャンセル」をタップしてください。'
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
          body: 'Your Olares ID {{terminusName}} is applying for authorization to complete the {{address}} private key signature. Please confirm whether it is done by you. Click Confirm to authorize the action, or Cancel to deny the action.',
        },
        {
          language: 'zh-CN',
          title: '绑定新的以太坊地址',
          body: '您的 Olares ID {{terminusName}} 正被用于授权完成  {{address}} 的私钥签名。请确认是否是您本人操作。点击确认以同意，点击取消拒绝操作。',
        },
        {
        	language: 'de-DE',
        	title: 'Neue Ethereum-Adresse verbinden',
        	body: 'Ihre Olares ID {{terminusName}} beantragt die Autorisierung, um die private Schlüsselsignatur für {{address}} abzuschließen. Bitte bestätigen Sie, ob dies von Ihnen veranlasst wurde. Tippen Sie auf Bestätigen, um die Aktion zu autorisieren, oder auf Abbrechen, um sie abzulehnen.'
        },
        {
        	language: 'es-ES',
        	title: 'Vincular nueva dirección de Ethereum',
        	body: 'Tu Olares ID {{terminusName}} está solicitando autorización para completar la firma con clave privada de {{address}}. Confirma si has sido tú. Toca Confirmar para autorizar la acción o Cancelar para rechazarla.'
        },
        {
        	language: 'fr-FR',
        	title: 'Associer une nouvelle adresse Ethereum',
        	body: 'Votre Olares ID {{terminusName}} demande l\'autorisation de finaliser la signature par clé privée de {{address}}. Merci de confirmer si c\'est bien vous. Appuyez sur Confirmer pour autoriser l\'action, ou sur Annuler pour la refuser.'
        },
        {
        	language: 'it-IT',
        	title: 'Collega un nuovo indirizzo Ethereum',
        	body: 'Il tuo Olares ID {{terminusName}} sta richiedendo l\'autorizzazione per completare la firma con chiave privata di {{address}}. Conferma se sei stato tu. Tocca Conferma per autorizzare l\'azione oppure Annulla per rifiutarla.'
        },
        {
        	language: 'ja-JP',
        	title: '新しい Ethereum アドレスを連携',
        	body: 'お使いの Olares ID {{terminusName}} が {{address}} の秘密鍵署名を完了するための認可を申請しています。本人による操作かご確認ください。操作を許可する場合は「確認」を、拒否する場合は「キャンセル」をタップしてください。'
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
          body: 'Your Olares ID {{terminusName}} is applying for authorization to complete the {{address}} private key signature. Please confirm whether it is done by you. Click Confirm to authorize the action, or Cancel to deny the action.',
        },
        {
          language: 'zh-CN',
          title: '取消绑定以太坊地址',
          body: '您的 Olares ID {{terminusName}} 正被用于授权完成 {{address}} 的私钥签名。请确认是否是您本人操作。点击确认以同意，点击取消拒绝操作。.',
        },
        {
        	language: 'de-DE',
        	title: 'Ethereum-Adresse trennen',
        	body: 'Ihre Olares ID {{terminusName}} beantragt die Autorisierung, um die private Schlüsselsignatur für {{address}} abzuschließen. Bitte bestätigen Sie, ob dies von Ihnen veranlasst wurde. Tippen Sie auf Bestätigen, um die Aktion zu autorisieren, oder auf Abbrechen, um sie abzulehnen.'
        },
        {
        	language: 'es-ES',
        	title: 'Desvincular dirección de Ethereum',
        	body: 'Tu Olares ID {{terminusName}} está solicitando autorización para completar la firma con clave privada de {{address}}. Confirma si has sido tú. Toca Confirmar para autorizar la acción o Cancelar para rechazarla.'
        },
        {
        	language: 'fr-FR',
        	title: 'Dissocier l\'adresse Ethereum',
        	body: 'Votre Olares ID {{terminusName}} demande l\'autorisation de finaliser la signature par clé privée de {{address}}. Merci de confirmer si c\'est bien vous. Appuyez sur Confirmer pour autoriser l\'action, ou sur Annuler pour la refuser.'
        },
        {
        	language: 'it-IT',
        	title: 'Scollega indirizzo Ethereum',
        	body: 'Il tuo Olares ID {{terminusName}} sta richiedendo l\'autorizzazione per completare la firma con chiave privata di {{address}}. Conferma se sei stato tu. Tocca Conferma per autorizzare l\'azione oppure Annulla per rifiutarla.'
        },
        {
        	language: 'ja-JP',
        	title: 'Ethereum アドレスの連携を解除',
        	body: 'お使いの Olares ID {{terminusName}} が {{address}} の秘密鍵署名を完了するための認可を申請しています。本人による操作かご確認ください。操作を許可する場合は「確認」を、拒否する場合は「キャンセル」をタップしてください。'
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
          body: 'Your Olares ID {{terminusName}} is applying to bind an NFT avatar, please confirm whether it is done by you. Click Confirm to authorize the action, or Cancel to deny the action.',
        },
        {
          language: 'zh-CN',
          title: '绑定 NFT 头像',
          body: '您的 Olares ID {{terminusName}} 正在被用于绑定 NFT 头像。请确认是否是您本人操作。点击确认以同意，点击取消拒绝操作。',
        },
        {
        	language: 'de-DE',
        	title: 'NFT-Avatar verbinden',
        	body: 'Ihre Olares ID {{terminusName}} beantragt die Verbindung eines NFT-Avatars. Bitte bestätigen Sie, ob dies von Ihnen veranlasst wurde. Tippen Sie auf Bestätigen, um die Aktion zu autorisieren, oder auf Abbrechen, um sie abzulehnen.'
        },
        {
        	language: 'es-ES',
        	title: 'Vincular avatar NFT',
        	body: 'Tu Olares ID {{terminusName}} está solicitando vincular un avatar NFT. Confirma si has sido tú. Toca Confirmar para autorizar la acción o Cancelar para rechazarla.'
        },
        {
        	language: 'fr-FR',
        	title: 'Associer un avatar NFT',
        	body: 'Votre Olares ID {{terminusName}} demande à associer un avatar NFT. Merci de confirmer si c\'est bien vous. Appuyez sur Confirmer pour autoriser l\'action, ou sur Annuler pour la refuser.'
        },
        {
        	language: 'it-IT',
        	title: 'Collega avatar NFT',
        	body: 'Il tuo Olares ID {{terminusName}} sta richiedendo di collegare un avatar NFT. Conferma se sei stato tu. Tocca Conferma per autorizzare l\'azione oppure Annulla per rifiutarla.'
        },
        {
        	language: 'ja-JP',
        	title: 'NFT アバターを連携',
        	body: 'お使いの Olares ID {{terminusName}} が NFT アバターの連携を申請しています。本人による操作かご確認ください。操作を許可する場合は「確認」を、拒否する場合は「キャンセル」をタップしてください。'
        },
      ],
    },
    variables: ['terminusName'],
    notifyGroup: 'TermiPass',
    user: '',
    status: ActiveStatus.Active,
  },
];
