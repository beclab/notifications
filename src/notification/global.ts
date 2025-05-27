export const LOCAL_CREDENTIAL = Boolean(process.env.LOCAL_CREDENTIAL) || true;

export interface MessageData {
  language: string;
  title: string;
  body: string;
}

export interface KubeSphereNotification {
  alerts: [
    {
      status: string;
      labels: {
        payload: string;
        type: string;
        version: string;
        namespace: string;
      };
      annotations: {
        message: string;
      };
      startsAt: string;
      endsAt: string;
    },
  ];
  groupLabels: {
    alertname: string;
    namespace: string;
  };
  commonLabels: {
    payload: string;
    type: string;
    version: string;
    namespace: string;
  };
  commonAnnotations: {
    message: string;
  };
}

export interface Payload {
  eventType: string;
  eventData: any;
}
