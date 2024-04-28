export type FireBaseToken = string;

export enum ProviderType {
  TermiPass = 'TermiPass',
  Desktop = 'Desktop'
}

export enum SubscriberType {
  Firebase = 'Firebase',
  User = 'User',
  Application = 'APP'
}

export enum NotificationStatus {
  Pending = 0,
  Succeed = 1,
  Failed = 2
}

export enum IntegrationStatus {
  Active = 1,
  Suspend = 2
}

export interface Integration {
  id: string;
  name: string;
  integrationsType: ProviderType;
  subscriberType: SubscriberType;
  credentials: any;
  rules: any;
  isEditable: boolean;
  status: IntegrationStatus;
  user: string;
  createdAt: number;
  updatedAt: number;
}
