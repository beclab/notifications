import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    beforeEnter: (to, from, next) => {
      if (to.fullPath == '/') {
        return next({ path: '/job' });
      }
      next();
    },
    children: [
      {
        path: 'job',
        component: () => import('pages/Job/JobIndex.vue'),
        meta: {}
      },
      {
        path: 'job/:id',
        component: () => import('pages/Job/JobDetail.vue'),
        meta: {}
      },
      {
        path: 'sender',
        component: () => import('pages/Sender/SenderIndex.vue'),
        meta: {}
      },
      {
        path: 'sender/create',
        component: () => import('pages/Sender/SenderTemplate.vue'),
        meta: {}
      },
      {
        path: 'recipients',
        component: () => import('pages/Recipients/RecipientsIndex.vue'),
        meta: {}
      },
      {
        path: 'recipients/:id',
        component: () => import('pages/Recipients/RecipientsDetail.vue'),
        meta: {}
      },
      {
        path: 'notify',
        component: () => import('pages/Notify/NotifyIndex.vue'),
        meta: {}
      },
      {
        path: 'notify/:id',
        component: () => import('pages/Notify/NotifyRule.vue'),
        meta: {}
      },
      {
        path: 'template',
        component: () => import('pages/Template/TemplateIndex.vue'),
        meta: {}
      },
      {
        path: 'template/:id',
        component: () => import('pages/Template/TemplateContent.vue'),
        meta: {}
      }
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
];

export default routes;
