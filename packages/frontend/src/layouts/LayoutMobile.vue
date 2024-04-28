<template>
  <q-header bordered class="header">
    <q-toolbar>
      <div class="menu_wrap row justify-between items-center">
        <q-img src="./../assets/logo.png" class="logo" width="120px" no-default-spinner></q-img>
        <q-img
          src="./../assets/menu.png"
          class="menu"
          width="30px"
          no-default-spinner
          @click="toggleLeftDrawer"
        ></q-img>
      </div>
    </q-toolbar>
  </q-header>

  <q-drawer
    class="row justify-center items-start q-mt-md"
    :width="300"
    v-model="leftDrawerOpen"
    show-if-above
    bordered
    side="right"
  >
    <q-list class="list">
      <q-item class="row justify-start items-center userInfo">
        <q-avatar>
          <img class="cursor-pointer" src="./../assets/avator.png" />
        </q-avatar>
        <div class="userName q-ml-md">
          <span>{{ resourceStore.userInfo?.username || '-' }}</span>
          <span>{{ resourceStore.userInfo?.email || '-' }}</span>
        </div>
      </q-item>
      <EssentialLink v-for="link in essentialLinks" :key="link.title" v-bind="link" />

      <div class="logout" @click="logout">Logout</div>
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
  height: 56px;
  background-color: #ffffff;

  .menu_wrap {
    width: 100%;

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
  height: calc(100vh - 20px);
  position: relative;
  .userInfo {
    border-bottom: 1px solid #e8e2e2;
    padding-bottom: 20px;
    margin-bottom: 10px;
  }
  .userName {
    width: 180px;
    font-weight: 600;
    font-size: 14px;
    line-height: 24px;
    color: #232323;
    display: flex;
    align-items: flex-start;
    justify-content: flex-start;
    flex-direction: column;
    span {
      width: 180px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }
  .logout {
    width: 80%;
    height: 48px;
    line-height: 48px;
    text-align: center;
    position: absolute;
    bottom: 20px;
    left: 0;
    right: 0;
    margin: auto;
    border: 1px solid #e8e2e2;
    border-radius: 24px;
    font-size: 16px;
    background-color: #f6f7f5;
  }
}
</style>
