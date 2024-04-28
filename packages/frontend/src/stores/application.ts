import { defineStore } from 'pinia';
import axios from 'axios';
import { Notify } from 'quasar';
import {
  NotifyPolicy,
  Sender,
  Template,
  TemplateContent,
  NotifyRule,
  Recipients,
  RecipientAddress,
  Job,
  Message
  // SenderType,
  // senderTemplates
} from '@notifications/database';

export type ApplicationState = {
  url: string;
  get_resourced: boolean;
  senders: Sender[];
  recipients: Recipients[];
  recipientAddress: RecipientAddress[];
  notifyPolicy: NotifyPolicy[];
  //notifyRule: NotifyRule[];
  templates: Template[];
  templateContent: TemplateContent[];
  jobs: Job[];
};

export const useApplicationStore = defineStore('application', {
  state: () => {
    return {
      url: '',
      get_resourced: false,
      senders: [],
      recipients: [],
      recipientAddress: [],
      templates: [],
      templateContent: [],
      notifyPolicy: [],
      jobs: []
    } as ApplicationState;
  },
  getters: {},
  actions: {
    async init() {
      await this.refreshSenders();

      await this.refreshRecipients();

      await this.refreshRecipientAddress();

      await this.refreshNotifyPolicy();

      //await this.refreshNotifyRule();

      await this.refreshTemplate();

      await this.refreshTemplateContent();

      await this.refreshJobs();

      //await this.refreshMessage();
    },

    setUrl(new_url: string) {
      this.url = new_url;
    },

    async refreshSenders() {
      // const admins: any = await axios.post(globalConfig.url + '/admin', {
      //   page: 1,
      //   pageSize: 200
      // });

      // console.log(admins);
      // this.admins = [...admins.items];
      this.senders = await axios.get(this.url + '/sender', {});
      for (const t of this.senders) {
        // if (t.type == SenderType.Application) {
        //   console.log(t);
        // }
      }
      console.log(this.senders);
    },
    async createSender(sender: Sender, credential: Record<string, string>) {
      await axios.post(this.url + '/sender', {
        sender,
        credential
      });
    },

    async refreshRecipients() {
      this.recipients = await axios.get(this.url + '/recipients', {});
    },
    async createRecipients(recipients: Recipients) {
      await axios.post(this.url + '/recipients', { recipients });
    },

    async refreshRecipientAddress() {
      this.recipientAddress = await axios.get(this.url + '/recipientAddress', {});
    },
    async createRecipientsAddress(id: number, name: string, data: Record<string, string>) {
      await axios.post(this.url + '/recipientAddress', {
        id,
        name,
        data
      });
    },
    async refreshTemplate() {
      this.templates = await axios.get(this.url + '/template', {});
    },
    async refreshTemplateContent() {
      this.templateContent = await axios.get(this.url + '/templateContent', {});
    },
    async refreshNotifyPolicy() {
      this.notifyPolicy = await axios.get(this.url + '/notifyPolicy', {});
    },
    async createNotifyPolicy(policy: NotifyPolicy) {
      await axios.post(this.url + '/notifyPolicy', { policy });
    },
    async getNotifyRuleByPolicyId(id: number): Promise<NotifyRule[]> {
      return await axios.get(this.url + '/notifyRule/' + id);
    },
    async createNotifyRule(rule: NotifyRule) {
      await axios.post(this.url + '/notifyRule', { rule });
    },
    async deleteNotifyRule(id: number) {
      await axios.delete(this.url + '/notifyRule/' + id);
    },
    async refreshJobs() {
      this.jobs = await axios.get(this.url + '/job', {});
    },
    async createJob(job: Job) {
      await axios.post(this.url + '/job', {
        job
      });
    },
    async getMessageByJob(jobId: number): Promise<Message[]> {
      return await axios.get(this.url + '/job/message/' + jobId, {});
    }
  }
});
