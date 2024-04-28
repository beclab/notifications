<template>
  <router-view />
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useApplicationStore } from './stores/application';

export default defineComponent({
  name: 'App',
  setup() {
    const applicationStore = useApplicationStore();
    const base_url = window.location.origin;
    console.log('base_url ' + base_url);
    applicationStore.setUrl(base_url + '/notification');

    return {};
  }
});
</script>
