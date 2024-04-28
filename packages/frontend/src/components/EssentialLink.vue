<template>
  <q-item
    clickable
    class="item"
    active-class="itemActiveStyle"
    :active="menuStore.currentItem === title"
    :key="title"
    @click="changeItemMenu(title, path)"
  >
    <q-item-section class="row justify-start items-center" v-if="icons" avatar>
      <img :src="`/icons/${icons}.svg`" alt="" />
    </q-item-section>

    <q-item-section>
      <q-item-label>{{ title }}</q-item-label>
    </q-item-section>
  </q-item>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useRouter } from 'vue-router';
import { useMenuStore } from './../stores/menu';

export default defineComponent({
  name: 'EssentialLink',
  props: {
    title: {
      type: String,
      required: true
    },
    path: {
      type: String,
      required: true
    },
    icons: {
      type: String,
      default: ''
    }
  },
  setup() {
    const router = useRouter();
    const menuStore = useMenuStore();

    const changeItemMenu = (title: string, path: string) => {
      menuStore.changeItemMenu(title);
      router.push({ path: path });
    };

    return {
      menuStore,
      changeItemMenu
    };
  }
});
</script>

<style>
.item {
  color: #666666;
  margin: 10px 0;
}

.item:hover {
  background: #f6f7f5;
  backdrop-filter: blur(12.5px);
  border-radius: 4px;
}

.itemActiveStyle {
  background: #f6f7f5;
  backdrop-filter: blur(12.5px);
  border-radius: 4px;
  color: #232323;
}
</style>
