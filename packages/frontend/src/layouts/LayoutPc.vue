<template>
  <q-header bordered class="header">
    <q-toolbar>
      <div class="menu_wrap row justify-start items-center">
        <q-img
          src="./../assets/menu.png"
          class="menu"
          width="30px"
          no-default-spinner
          @click="toggleLeftDrawer"
        ></q-img>
        <q-img src="./../assets/logo.png" class="logo" width="120px" no-default-spinner></q-img>
      </div>
      <q-toolbar-title> </q-toolbar-title>
      <div class="row justify-start items-center q-mr-md">
        <div class="userName">
          <span>{{ resourceStore.userInfo?.username || '-' }}</span>
          <span>{{ resourceStore.userInfo?.email || '-' }}</span>
        </div>
        <q-avatar>
          <img class="cursor-pointer" src="./../assets/avator.png" @click="logout" />
        </q-avatar>
      </div>
    </q-toolbar>
  </q-header>

  <q-drawer
    class="row justify-center items-start q-mt-md"
    :width="300"
    v-model="leftDrawerOpen"
    show-if-above
    bordered
  >
    <q-list class="list">
      <EssentialLink
        v-for="link in essentialLinks"
        :key="link.title"
        :icons="link.icon"
        v-bind="link"
      />
    </q-list>
  </q-drawer>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue';
import EssentialLink from 'components/EssentialLink.vue';
import { useApplicationStore } from '../stores/application';
import { menuList } from './../utils/constants';

export default defineComponent({
  name: 'LayoutPc',

  components: {
    EssentialLink
  },

  setup(props: any, ctx: any) {
    const leftDrawerOpen = ref(false);
    const resourceStore = useApplicationStore();

    async function logout() {
      ctx.emit('logout');
    }

    onMounted(() => {
      // const resourceStore = useResourceStore();
      // return resourceStore.init();
    });

    return {
      resourceStore,
      essentialLinks: menuList,
      leftDrawerOpen,
      logout,
      toggleLeftDrawer() {
        leftDrawerOpen.value = !leftDrawerOpen.value;
      }
    };
  }
});
</script>

<style lang="scss" scoped>
.header {
  max-width: 1980px;
  margin: 0 auto;
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
.userName {
  color: #000000;
  font-weight: 600;
  font-size: 14px;
  color: #232323;
  margin-right: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}

.list {
  width: 90%;
}

:global(.q-drawer) {
  left: auto;
}
</style>
