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
				},
				{
					language: 'de-DE',
					title: 'Benutzer angemeldet',
					body: 'Benutzer {{user}} hat sich bei Olares angemeldet'
				},
				{
					language: 'es-ES',
					title: 'El usuario ha iniciado sesión',
					body: 'El usuario {{user}} ha iniciado sesión en Olares'
				},
				{
					language: 'fr-FR',
					title: 'Utilisateur connecté',
					body: 'Utilisateur {{user}} connecté à Olares'
				},
				{
					language: 'it-IT',
					title: 'Accesso effettuato',
					body: 'L’utente {{user}} ha effettuato l’accesso a Olares'
				},
				{
					language: 'ja-JP',
					title: 'ユーザーがログインしました',
					body: 'ユーザー{{user}}がOlaresにログインしました'
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
				},
				{
					language: 'de-DE',
					title: 'Vault aktualisiert',
					body: 'Ihre Vault-Daten sind auf dem neuesten Stand'
				},
				{
					language: 'es-ES',
					title: 'Vault actualizado',
					body: 'Tus datos de Vault están actualizados'
				},
				{
					language: 'fr-FR',
					title: 'Vault mis à jour',
					body: 'Vos données Vault sont à jour'
				},
				{
					language: 'it-IT',
					title: 'Vault aggiornato',
					body: 'I dati di Vault sono aggiornati'
				},
				{
					language: 'ja-JP',
					title: 'Vaultが更新されました',
					body: 'Vaultのデータは最新です'
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
				},
				{
					language: 'de-DE',
					title: 'Vault aktualisiert',
					body: 'Ihre Vault-Daten sind auf dem neuesten Stand'
				},
				{
					language: 'es-ES',
					title: 'Vault actualizado',
					body: 'Tus datos de Vault están actualizados'
				},
				{
					language: 'fr-FR',
					title: 'Vault mis à jour',
					body: 'Vos données Vault sont à jour'
				},
				{
					language: 'it-IT',
					title: 'Vault aggiornato',
					body: 'I dati di Vault sono aggiornati'
				},
				{
					language: 'ja-JP',
					title: 'Vaultが更新されました',
					body: 'Vaultのデータは最新です'
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
		name: 'Log in to Olares',
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
				},
				{
					language: 'de-DE',
					title: 'Bei Olares anmelden?',
					body: 'Ihre Olares ID {{user}} wird verwendet, um sich bei Olares anzumelden. Tippen Sie auf Bestätigen, um fortzufahren, oder auf Abbrechen, wenn dies nicht von Ihnen war'
				},
				{
					language: 'es-ES',
					title: '¿Iniciar sesión en Olares?',
					body: 'Tu Olares ID {{user}} se está utilizando para iniciar sesión en Olares. Selecciona Confirmar para continuar o Cancelar si no has sido tú.'
				},
				{
					language: 'fr-FR',
					title: 'Connexion à Olares ?',
					body: 'Votre Olares ID {{user}} est utilisé pour se connecter à Olares. Sélectionnez Confirmer pour continuer, ou Annuler si ce n’était pas vous.'
				},
				{
					language: 'it-IT',
					title: 'Accedere a Olares?',
					body: 'Il tuo Olares ID {{user}} è in uso per accedere a Olares. Seleziona Conferma per continuare o Annulla se non sei stato tu.'
				},
				{
					language: 'ja-JP',
					title: 'Olaresにログインしますか？',
					body: 'お使いのOlares ID {{user}}がOlaresへのログインに使用されています。本人の操作の場合は「確認」を、そうでない場合は「キャンセル」を選択してください。'
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
		name: 'Log in to Olares Space',
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
				},
				{
					language: 'de-DE',
					title: 'Bei Olares Space anmelden?',
					body: 'Ihre Olares ID {{terminusName}} wird verwendet, um sich bei Olares Space anzumelden. Tippen Sie auf Bestätigen, um fortzufahren, oder auf Abbrechen, wenn dies nicht von Ihnen war'
				},
				{
					language: 'es-ES',
					title: '¿Iniciar sesión en Olares Space?',
					body: 'Tu Olares ID {{terminusName}} se está utilizando para iniciar sesión en Olares Space. Selecciona Confirmar para continuar o Cancelar si no has sido tú.'
				},
				{
					language: 'fr-FR',
					title: 'Connexion à Olares Space ?',
					body: 'Votre Olares ID {{terminusName}} est utilisé pour se connecter à Olares Space. Sélectionnez Confirmer pour continuer, ou Annuler si ce n’était pas vous.'
				},
				{
					language: 'it-IT',
					title: 'Accedere a Olares Space?',
					body: 'Il tuo Olares ID {{terminusName}} è in uso per accedere a Olares Space. Seleziona Conferma per continuare o Annulla se non sei stato tu.'
				},
				{
					language: 'ja-JP',
					title: 'Olares Spaceにログインしますか？',
					body: 'お使いのOlares ID {{terminusName}}がOlares Spaceへのログインに使用されています。本人の操作の場合は「確認」を、そうでない場合は「キャンセル」を選択してください。'
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
		name: 'Connect Ethereum address',
		appId: 'settings',
		appName: 'Settings',
		appTemplateId: 'settings.bind.ethereum',
		defaultLanguage: 'en-US',
		content: {
			create: [
				{
					language: 'en-US',
					title: 'Connect new Ethereum address?',
					body: 'Your Olares ID {{terminusName}} is requesting to connect Ethereum address {{address}}. Select Confirm to continue, or Cancel if this wasn’t you.'
				},
				{
					language: 'zh-CN',
					title: '连接新的以太坊地址？',
					body: 'Olares ID {{terminusName}} 正在请求连接以太坊地址 {{address}}。如是本人操作，请选择确认。否则请选择取消。'
				},
				{
					language: 'de-DE',
					title: 'Neue Ethereum-Adresse verbinden?',
					body: 'Ihre Olares ID {{terminusName}} möchte die Ethereum-Adresse {{address}} verbinden. Tippen Sie auf Bestätigen, um fortzufahren, oder auf Abbrechen, wenn dies nicht von Ihnen war'
				},
				{
					language: 'es-ES',
					title: '¿Conectar nueva dirección de Ethereum?',
					body: 'Tu Olares ID {{terminusName}} solicita conectar la dirección de Ethereum {{address}}. Selecciona Confirmar para continuar o Cancelar si no has sido tú.'
				},
				{
					language: 'fr-FR',
					title: 'Connecter une nouvelle adresse Ethereum ?',
					body: 'Votre Olares ID {{terminusName}} demande la connexion de l’adresse Ethereum {{address}}. Sélectionnez Confirmer pour continuer, ou Annuler si ce n’était pas vous.'
				},
				{
					language: 'it-IT',
					title: 'Collegare un nuovo indirizzo Ethereum?',
					body: 'Il tuo Olares ID {{terminusName}} richiede di collegare l’indirizzo Ethereum {{address}}. Seleziona Conferma per continuare o Annulla se non sei stato tu.'
				},
				{
					language: 'ja-JP',
					title: '新しいEthereumアドレスを接続しますか？',
					body: 'お使いのOlares ID {{terminusName}}がEthereumアドレス{{address}}の接続を求めています。本人の操作の場合は「確認」を、そうでない場合は「キャンセル」を選択してください。'
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
		name: 'Disconnect Ethereum address',
		appId: 'settings',
		appName: 'Settings',
		appTemplateId: 'settings.unbind.ethereum',
		defaultLanguage: 'en-US',
		content: {
			create: [
				{
					language: 'en-US',
					title: 'Disconnect Ethereum address?',
					body: 'Your Olares ID {{terminusName}} is requesting to disconnect Ethereum address {{address}}. Select Confirm to continue, or Cancel if this wasn’t you.'
				},
				{
					language: 'zh-CN',
					title: '断开以太坊地址连接？',
					body: 'Olares ID {{terminusName}} 正在请求断开与以太坊地址 {{address}} 的连接。如是本人操作，请选择确认。否则请选择取消。'
				},
				{
					language: 'de-DE',
					title: 'Ethereum-Adresse trennen?',
					body: 'Ihre Olares ID {{terminusName}} möchte die Ethereum-Adresse {{address}} trennen. Tippen Sie auf Bestätigen, um fortzufahren, oder auf Abbrechen, wenn dies nicht von Ihnen war'
				},
				{
					language: 'es-ES',
					title: '¿Desconectar la dirección de Ethereum?',
					body: 'Tu Olares ID {{terminusName}} solicita desconectar la dirección de Ethereum {{address}}. Selecciona Confirmar para continuar o Cancelar si no has sido tú.'
				},
				{
					language: 'fr-FR',
					title: 'Déconnecter l’adresse Ethereum ?',
					body: 'Votre Olares ID {{terminusName}} demande la déconnexion de l’adresse Ethereum {{address}}. Sélectionnez Confirmer pour continuer, ou Annuler si ce n’était pas vous.'
				},
				{
					language: 'it-IT',
					title: 'Scollegare l’indirizzo Ethereum?',
					body: 'Il tuo Olares ID {{terminusName}} richiede di scollegare l’indirizzo Ethereum {{address}}. Seleziona Conferma per continuare o Annulla se non sei stato tu.'
				},
				{
					language: 'ja-JP',
					title: 'Ethereumアドレスの接続を解除しますか？',
					body: 'お使いのOlares ID {{terminusName}}がEthereumアドレス{{address}}の接続解除を求めています。本人の操作の場合は「確認」を、そうでない場合は「キャンセル」を選択してください。'
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
				},
				{
					language: 'de-DE',
					title: 'NFT-Avatar festlegen?',
					body: 'Ihre Olares ID {{terminusName}} möchte einen NFT-Avatar festlegen. Tippen Sie auf Bestätigen, um fortzufahren, oder auf Abbrechen, wenn dies nicht von Ihnen war'
				},
				{
					language: 'es-ES',
					title: '¿Establecer avatar NFT?',
					body: 'Tu Olares ID {{terminusName}} está estableciendo un avatar NFT. Selecciona Confirmar para continuar o Cancelar si no has sido tú.'
				},
				{
					language: 'fr-FR',
					title: 'Définir un avatar NFT ?',
					body: 'Votre Olares ID {{terminusName}} souhaite définir un avatar NFT. Sélectionnez Confirmer pour continuer, ou Annuler si ce n’était pas vous.'
				},
				{
					language: 'it-IT',
					title: 'Impostare un avatar NFT?',
					body: 'Il tuo Olares ID {{terminusName}} sta impostando un avatar NFT. Seleziona Conferma per continuare o Annulla se non sei stato tu.'
				},
				{
					language: 'ja-JP',
					title: 'NFTアバターを設定しますか？',
					body: 'お使いのOlares ID {{terminusName}}がNFTアバターの設定を求めています。本人の操作の場合は「確認」を、そうでない場合は「キャンセル」を選択してください。'
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
				},
				{
					language: 'de-DE',
					title: 'App installiert',
					body: '{{appName}} ist einsatzbereit'
				},
				{
					language: 'es-ES',
					title: 'Aplicación instalada',
					body: '{{appName}} está lista para usarse'
				},
				{
					language: 'fr-FR',
					title: 'Application installée',
					body: '{{appName}} est prêt à l’emploi'
				},
				{
					language: 'it-IT',
					title: 'App installata',
					body: '{{appName}} è pronta per l’uso'
				},
				{
					language: 'ja-JP',
					title: 'アプリがインストールされました',
					body: '{{appName}}をご利用いただけます'
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
				},
				{
					language: 'de-DE',
					title: 'App angehalten',
					body: '{{appName}} wurde angehalten. Sie können die App jederzeit neu starten.'
				},
				{
					language: 'es-ES',
					title: 'Aplicación detenida',
					body: '{{appName}} dejó de ejecutarse. Puedes reiniciarla cuando quieras.'
				},
				{
					language: 'fr-FR',
					title: 'Application arrêtée',
					body: '{{appName}} a cessé de fonctionner. Le redémarrage est possible à tout moment.'
				},
				{
					language: 'it-IT',
					title: 'App arrestata',
					body: '{{appName}} si è arrestata. Puoi riavviarla in qualsiasi momento.'
				},
				{
					language: 'ja-JP',
					title: 'アプリが停止しました',
					body: '{{appName}}の実行が停止しました。いつでも再起動できます。'
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
				},
				{
					language: 'de-DE',
					title: 'App angehalten',
					body: '{{title}} wurde angehalten. Grund: Manuell angehalten. Sie können sie jederzeit neu starten'
				},
				{
					language: 'es-ES',
					title: 'Aplicación detenida',
					body: '{{title}} dejó de ejecutarse. Motivo: detenida manualmente. Puedes reiniciarla cuando quieras.'
				},
				{
					language: 'fr-FR',
					title: 'Application arrêtée',
					body: '{{title}} a cessé de fonctionner. Raison : arrêt manuel. Le redémarrage est possible à tout moment.'
				},
				{
					language: 'it-IT',
					title: 'App arrestata',
					body: '{{title}} si è arrestata. Motivo: arresto manuale. Puoi riavviarla in qualsiasi momento.'
				},
				{
					language: 'ja-JP',
					title: 'アプリを停止しました',
					body: '{{title}}の実行が停止しました。原因：手動停止。いつでも再起動できます。'
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
				},
				{
					language: 'de-DE',
					title: 'App angehalten',
					body: '{{title}} wurde angehalten. Grund: Hohe Systemauslastung. Sie können sie jederzeit neu starten'
				},
				{
					language: 'es-ES',
					title: 'Aplicación detenida',
					body: '{{title}} dejó de ejecutarse. Motivo: carga del sistema elevada. Puedes reiniciarla cuando quieras.'
				},
				{
					language: 'fr-FR',
					title: 'Application arrêtée',
					body: '{{title}} a cessé de fonctionner. Raison : charge système élevée. Le redémarrage est possible à tout moment.'
				},
				{
					language: 'it-IT',
					title: 'App arrestata',
					body: '{{title}} si è arrestata. Motivo: carico del sistema elevato. Puoi riavviarla in qualsiasi momento.'
				},
				{
					language: 'ja-JP',
					title: 'アプリを停止しました',
					body: '{{title}}の実行が停止しました。原因：システム負荷が高すぎます。いつでも再起動できます。'
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
				},
				{
					language: 'de-DE',
					title: 'App angehalten',
					body: '{{title}} wurde angehalten. Grund: Initialisierungsproblem. Sie können sie jederzeit neu starten'
				},
				{
					language: 'es-ES',
					title: 'Aplicación detenida',
					body: '{{title}} dejó de ejecutarse. Motivo: problema de inicialización. Puedes reiniciarla cuando quieras.'
				},
				{
					language: 'fr-FR',
					title: 'Application arrêtée',
					body: '{{title}} a cessé de fonctionner. Raison : problème d’initialisation. Le redémarrage est possible à tout moment.'
				},
				{
					language: 'it-IT',
					title: 'App arrestata',
					body: '{{title}} si è arrestata. Motivo: problema di inizializzazione. Puoi riavviarla in qualsiasi momento.'
				},
				{
					language: 'ja-JP',
					title: 'アプリを停止しました',
					body: '{{title}}の実行が停止しました。原因：初期化エラー。いつでも再起動できます。'
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
				},
				{
					language: 'de-DE',
					title: 'App angehalten',
					body: '{{title}} wurde angehalten. Grund: Unbekannt. Sie können sie jederzeit neu starten'
				},
				{
					language: 'es-ES',
					title: 'Aplicación detenida',
					body: '{{title}} dejó de ejecutarse. Motivo: desconocido. Puedes reiniciarla cuando quieras.'
				},
				{
					language: 'fr-FR',
					title: 'Application arrêtée',
					body: '{{title}} a cessé de fonctionner. Raison : inconnue. Le redémarrage est possible à tout moment.'
				},
				{
					language: 'it-IT',
					title: 'App arrestata',
					body: '{{title}} si è arrestata. Motivo: sconosciuto. Puoi riavviarla in qualsiasi momento.'
				},
				{
					language: 'ja-JP',
					title: 'アプリを停止しました',
					body: '{{title}}の実行が停止しました。原因：不明。いつでも再起動できます。'
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
					body: '{{title}} stopped running. Reason: insufficient VRAM. You can restart it anytime.'
				},
				{
					language: 'zh-CN',
					title: '应用已停止',
					body: '{{title}} 已停止运行。原因：显存不足。可随时重启。'
				},
				{
					language: 'de-DE',
					title: 'App angehalten',
					body: '{{title}} wurde angehalten. Grund: Nicht genügend VRAM verfügbar. Sie können sie jederzeit neu starten'
				},
				{
					language: 'es-ES',
					title: 'Aplicación detenida',
					body: '{{title}} dejó de ejecutarse. Motivo: VRAM insuficiente. Puedes reiniciarla cuando quieras.'
				},
				{
					language: 'fr-FR',
					title: 'Application arrêtée',
					body: '{{title}} a cessé de fonctionner. Raison : VRAM insuffisante. Le redémarrage est possible à tout moment.'
				},
				{
					language: 'it-IT',
					title: 'App arrestata',
					body: '{{title}} si è arrestata. Motivo: VRAM insufficiente. Puoi riavviarla in qualsiasi momento.'
				},
				{
					language: 'ja-JP',
					title: 'アプリを停止しました',
					body: '{{title}}の実行が停止しました。原因：VRAMが不足しています。いつでも再起動できます。'
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
				},
				{
					language: 'de-DE',
					title: 'App fortgesetzt',
					body: '{{appName}} ist einsatzbereit'
				},
				{
					language: 'es-ES',
					title: 'Aplicación reanudada',
					body: '{{appName}} está lista para usarse'
				},
				{
					language: 'fr-FR',
					title: 'Application relancée',
					body: '{{appName}} est prêt à l’emploi'
				},
				{
					language: 'it-IT',
					title: 'App riattivata',
					body: '{{appName}} è pronta per l’uso'
				},
				{
					language: 'ja-JP',
					title: 'アプリが再開されました',
					body: '{{appName}}が再開され、利用可能になりました'
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
				},
				{
					language: 'de-DE',
					title: 'App deinstalliert',
					body: 'Zugehörige Daten für {{appName}} wurden entfernt'
				},
				{
					language: 'es-ES',
					title: 'Aplicación desinstalada',
					body: 'Se han eliminado los datos asociados de {{appName}}'
				},
				{
					language: 'fr-FR',
					title: 'Application désinstallée',
					body: 'Les données associées à {{appName}} ont été supprimées'
				},
				{
					language: 'it-IT',
					title: 'App disinstallata',
					body: 'I dati associati a {{appName}} sono stati rimossi'
				},
				{
					language: 'ja-JP',
					title: 'アプリがアンインストールされました',
					body: '{{appName}}の関連データを削除しました'
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
				},
				{
					language: 'de-DE',
					title: 'Wenig freier Speicherplatz',
					body: 'Der Speicherplatz auf Knoten {{nodeName}} ist fast aufgebraucht. Geben Sie Speicherplatz frei, um das System stabil zu halten'
				},
				{
					language: 'es-ES',
					title: 'Poco espacio en disco',
					body: 'El espacio en disco del nodo {{nodeName}} está casi lleno. Libera espacio para mantener estable el sistema.'
				},
				{
					language: 'fr-FR',
					title: 'Espace disque faible',
					body: 'L’espace disque sur le nœud {{nodeName}} est presque plein. Libérez de l’espace pour maintenir le système stable.'
				},
				{
					language: 'it-IT',
					title: 'Spazio su disco insufficiente',
					body: 'Lo spazio su disco del nodo {{nodeName}} è quasi esaurito. Libera spazio per mantenere stabile il sistema.'
				},
				{
					language: 'ja-JP',
					title: 'ディスク容量が不足しています',
					body: 'ノード{{nodeName}}のディスク容量が残りわずかです。システムを安定して稼働させるため、空き容量を確保してください。'
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
				},
				{
					language: 'de-DE',
					title: 'Speicherplatz wieder verfügbar',
					body: 'Der Speicherplatz auf Knoten {{nodeName}} liegt wieder in einem sicheren Bereich'
				},
				{
					language: 'es-ES',
					title: 'Espacio en disco restaurado',
					body: 'El espacio en disco del nodo {{nodeName}} volvió a un nivel seguro'
				},
				{
					language: 'fr-FR',
					title: 'Espace disque restauré',
					body: 'L’espace disque sur le nœud {{nodeName}} est revenu à un niveau sûr'
				},
				{
					language: 'it-IT',
					title: 'Spazio su disco ripristinato',
					body: 'Lo spazio su disco del nodo {{nodeName}} è tornato a un livello sicuro'
				},
				{
					language: 'ja-JP',
					title: 'ディスク容量が回復しました',
					body: 'ノード{{nodeName}}のディスク容量が安全な水準に戻りました'
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
				},
				{
					language: 'de-DE',
					title: 'Wenig Arbeitsspeicher',
					body: 'Der verfügbare Arbeitsspeicher auf Knoten {{nodeName}} ist kritisch niedrig. Geben Sie Arbeitsspeicher frei, um das System stabil zu halten'
				},
				{
					language: 'es-ES',
					title: 'Memoria baja',
					body: 'La memoria disponible del nodo {{nodeName}} es críticamente baja. Libera memoria para mantener estable el sistema.'
				},
				{
					language: 'fr-FR',
					title: 'Mémoire faible',
					body: 'La mémoire disponible sur le nœud {{nodeName}} est à un niveau critique. Libérez de la mémoire pour maintenir le système stable.'
				},
				{
					language: 'it-IT',
					title: 'Memoria insufficiente',
					body: 'La memoria disponibile sul nodo {{nodeName}} è gravemente insufficiente. Libera memoria per mantenere stabile il sistema.'
				},
				{
					language: 'ja-JP',
					title: 'メモリが不足しています',
					body: 'ノード{{nodeName}}の空きメモリが極めて少なくなっています。メモリを解放し、システムの安定稼働を維持してください。'
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
				},
				{
					language: 'de-DE',
					title: 'Arbeitsspeicher wieder im Normalbereich',
					body: 'Der verfügbare Arbeitsspeicher auf Knoten {{nodeName}} liegt wieder in einem sicheren Bereich'
				},
				{
					language: 'es-ES',
					title: 'Uso de memoria restaurado',
					body: 'La memoria disponible del nodo {{nodeName}} volvió a un nivel seguro'
				},
				{
					language: 'fr-FR',
					title: 'Utilisation de la mémoire restaurée',
					body: 'La mémoire disponible sur le nœud {{nodeName}} est revenue à un niveau sûr'
				},
				{
					language: 'it-IT',
					title: 'Uso della memoria ripristinato',
					body: 'La memoria disponibile sul nodo {{nodeName}} è tornata a un livello sicuro'
				},
				{
					language: 'ja-JP',
					title: 'メモリ使用状況が回復しました',
					body: 'ノード{{nodeName}}の空きメモリが安全な水準に戻りました'
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
				},
				{
					language: 'de-DE',
					title: 'Wenige verfügbare Prozess-IDs',
					body: 'Die verfügbaren Prozess-IDs (PIDs) auf Knoten {{nodeName}} sind kritisch niedrig. Beenden Sie unnötige Prozesse, um das System stabil zu halten'
				},
				{
					language: 'es-ES',
					title: 'Poca disponibilidad de PID',
					body: 'Los identificadores de proceso (PID) disponibles en el nodo {{nodeName}} son críticamente bajos. Detén los procesos innecesarios para mantener estable el sistema.'
				},
				{
					language: 'fr-FR',
					title: 'Identifiants de processus (PID) disponibles insuffisants',
					body: 'Les identifiants de processus (PID) disponibles sur le nœud {{nodeName}} sont presque épuisés. Arrêtez les processus inutiles pour maintenir le système stable.'
				},
				{
					language: 'it-IT',
					title: 'PID disponibili insufficienti',
					body: 'I PID disponibili sul nodo {{nodeName}} sono gravemente insufficienti. Arresta i processi non necessari per mantenere stabile il sistema.'
				},
				{
					language: 'ja-JP',
					title: '利用可能なPIDが不足しています',
					body: 'ノード{{nodeName}}の利用可能なプロセスID（PID）が極めて少なくなっています。システムを安定して稼働させるため、不要なプロセスを停止してください。'
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
				},
				{
					language: 'de-DE',
					title: 'PID-Nutzung wieder im Normalbereich',
					body: 'Die Nutzung der Prozess-IDs (PIDs) auf Knoten {{nodeName}} liegt wieder in einem sicheren Bereich'
				},
				{
					language: 'es-ES',
					title: 'Uso de PID restaurado',
					body: 'El uso de identificadores de proceso (PID) en el nodo {{nodeName}} volvió a un nivel seguro'
				},
				{
					language: 'fr-FR',
					title: 'Niveau des PID rétabli',
					body: 'L’utilisation des identifiants de processus (PID) sur le nœud {{nodeName}} est revenue à un niveau sûr'
				},
				{
					language: 'it-IT',
					title: 'Uso dei PID ripristinato',
					body: 'L’uso dei PID sul nodo {{nodeName}} è tornato a un livello sicuro'
				},
				{
					language: 'ja-JP',
					title: 'PID使用状況が回復しました',
					body: 'ノード{{nodeName}}のプロセスID（PID）数が安全な水準に戻りました'
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
				},
				{
					language: 'de-DE',
					title: 'Benutzer hinzugefügt',
					body: 'Benutzer {{user}} wurde hinzugefügt'
				},
				{
					language: 'es-ES',
					title: 'Usuario añadido',
					body: 'Usuario {{user}} añadido'
				},
				{
					language: 'fr-FR',
					title: 'Utilisateur ajouté',
					body: 'L’utilisateur {{user}} a été ajouté'
				},
				{
					language: 'it-IT',
					title: 'Utente aggiunto',
					body: 'L’utente {{user}} è stato aggiunto'
				},
				{
					language: 'ja-JP',
					title: 'ユーザーを追加しました',
					body: 'ユーザー{{user}}を追加しました'
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
				},
				{
					language: 'de-DE',
					title: 'Benutzer gelöscht',
					body: 'Benutzer {{user}} wurde gelöscht'
				},
				{
					language: 'es-ES',
					title: 'Usuario eliminado',
					body: 'Usuario {{user}} eliminado'
				},
				{
					language: 'fr-FR',
					title: 'Utilisateur supprimé',
					body: 'L’utilisateur {{user}} a été supprimé'
				},
				{
					language: 'it-IT',
					title: 'Utente eliminato',
					body: 'L’utente {{user}} è stato eliminato'
				},
				{
					language: 'ja-JP',
					title: 'ユーザーを削除しました',
					body: 'ユーザー{{user}}を削除しました'
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
				},
				{
					language: 'de-DE',
					title: 'Zahlungszugriff autorisieren?',
					body: 'Olares Market möchte auf Ihr Zahlungsprofil zugreifen. Fahren Sie nur fort, wenn Sie diese Anfrage gestartet haben'
				},
				{
					language: 'es-ES',
					title: '¿Autorizar acceso a pagos?',
					body: 'Olares Market quiere acceder a tu perfil de pago. Continúa solo si tú iniciaste esta solicitud.'
				},
				{
					language: 'fr-FR',
					title: 'Autoriser l’accès aux informations de paiement ?',
					body: 'Olares Market souhaite accéder à votre profil de paiement. Continuez uniquement si vous avez initié cette demande.'
				},
				{
					language: 'it-IT',
					title: 'Autorizzare l’accesso al profilo di pagamento?',
					body: 'Olares Market richiede di accedere al tuo profilo di pagamento. Continua solo se hai avviato tu questa richiesta.'
				},
				{
					language: 'ja-JP',
					title: '支払い情報へのアクセスを許可しますか？',
					body: 'Olares Marketが支払い情報へのアクセスを求めています。ご自身でこのリクエストを開始した場合のみ続行してください。'
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
				},
				{
					language: 'de-DE',
					title: 'Kauf autorisieren?',
					body: 'Sie autorisieren eine Zahlung für diese App. Fahren Sie nur fort, wenn Sie diesen Kauf gestartet haben'
				},
				{
					language: 'es-ES',
					title: '¿Autorizar la compra?',
					body: 'Estás autorizando un pago por esta aplicación. Continúa solo si tú iniciaste esta compra.'
				},
				{
					language: 'fr-FR',
					title: 'Autoriser l’achat ?',
					body: 'Vous autorisez un paiement pour cette application. Continuez uniquement si vous avez initié cet achat.'
				},
				{
					language: 'it-IT',
					title: 'Autorizzare l’acquisto?',
					body: 'Stai autorizzando un pagamento per questa app. Continua solo se hai avviato tu questo acquisto.'
				},
				{
					language: 'ja-JP',
					title: '購入を許可しますか？',
					body: 'このアプリが支払いの承認を求めています。ご自身でこの購入を開始した場合のみ続行してください。'
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
