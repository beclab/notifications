<template>
  <q-layout view="hHh Lpr lFf" class="web-container">
    <LayoutPc v-if="isPC" @logout="logout" />
    <LayoutMobile v-else @logout="logout" />

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script lang="ts">
import { defineComponent, ref, computed, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { useQuasar } from 'quasar';
//import { useAccountStore } from '../stores/account';
import { useApplicationStore } from '../stores/application';
import { menuList } from './../utils/constants';
import { useMenuStore } from './../stores/menu';

import LayoutPc from './LayoutPc.vue';
import LayoutMobile from './LayoutMobile.vue';

const linksList = [
  {
    title: 'Dashboard',
    icon: 'school'
  }
];

export default defineComponent({
  name: 'MainLayout',

  components: {
    LayoutPc,
    LayoutMobile
  },
  async preFetch({ currentRoute, redirect }) {
    const resourceStore = useApplicationStore();
    return resourceStore.init();
  },

  setup() {
    const leftDrawerOpen = ref(false);
    const $q = useQuasar();
    const router = useRouter();
    const route = useRoute();
    //const accountStore = useAccountStore();
    const resourceStore = useApplicationStore();
    const menuStore = useMenuStore();

    async function logout() {
      // $q.dialog({
      //   title: 'Confirm',
      //   message: 'Would you like to logout the application?',
      //   cancel: true,
      //   persistent: false
      // }).onOk(async () => {
      //   resourceStore.get_resourced = false;
      //   accountStore.remove();
      //   router.push('/login');
      // });
    }

    onMounted(() => {
      console.log('route.path', route.path);
      const hasCurrent = menuList.find((item) => `/${item.path}` === route.path);
      console.log('hasCurrent', hasCurrent);
      if (hasCurrent) {
        menuStore.changeItemMenu(hasCurrent.title);
      }
    });

    return {
      logout,
      essentialLinks: linksList,
      leftDrawerOpen,
      isPC: computed(() => {
        return !$q.platform.is.mobile;
      }),
      toggleLeftDrawer() {
        leftDrawerOpen.value = !leftDrawerOpen.value;
      }
    };
  }
});
</script>

<style lang="scss" scoped>
.header {
  height: 56px;
  background-color: #ffffff;

  .menu_wrap {
    width: 240px;

    .menu {
      margin-right: 2px;
      margin-left: 12px;
    }

    .logo {
      margin-left: 10px;
    }
  }
}

.list {
  width: 90%;
}

.web-container {
  max-width: 1980px;
  margin: 0 auto;
}
</style>
