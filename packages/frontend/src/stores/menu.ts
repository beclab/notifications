import { defineStore } from 'pinia';

export type DataState = {
  currentItem: string;
};

export const useMenuStore = defineStore('menu', {
  state: () => {
    return {
      currentItem: 'Dashboard'
    } as DataState;
  },

  getters: {},

  actions: {
    changeItemMenu(item: string) {
      this.currentItem = item;
    }
  }
});
