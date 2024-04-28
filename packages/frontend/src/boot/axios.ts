import { boot } from 'quasar/wrappers';
import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import { Notify } from 'quasar';
//import globalConfig from '../config/global_config';

const api = axios.create({});
//import { useAccountStore } from 'stores/account';

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $axios: AxiosInstance;
  }
}

// Be careful when using SSR for cross-request state pollution
// due to creating a Singleton instance here;
// If any client changes this (global) instance, it might be a
// good idea to move this instance creation inside of the
// "export default () => {}" function below (which runs individually
// for each client)
//const api = axios.create({ baseURL: 'https://api.example.com' });

export default boot(({ app, router }) => {
  app.config.globalProperties.$axios = axios;

  app.config.globalProperties.$api = api;

  app.config.globalProperties.$axios.interceptors.request.use((config: AxiosRequestConfig) => {
    if (config.headers) {
      return config;
    } else {
      return config;
    }
  });

  app.config.globalProperties.$axios.interceptors.response.use((response) => {
    if (!response || (response.status !== 200 && response.status != 201) || !response.data) {
      Notify.create({
        type: 'negative',
        position: 'top',
        message: 'Network error, please try again later'
      });
      return response;
    }

    const data = response.data;

    if (data.code !== 0) {
      Notify.create({
        type: 'negative',
        position: 'top',
        message: '' + data.code + ' ' + data.message
      });

      throw new Error(data.message);
    }

    return data.data;
  });
});

export { api };
