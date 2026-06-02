import { defineStore } from 'pinia'

export const useUiStore = defineStore('ui', {
  state: () => ({
    loadingDepth: 0
  }),

  getters: {
    isLoading(state) {
      return state.loadingDepth > 0
    }
  },

  actions: {
    beginLoading() {
      this.loadingDepth += 1
    },

    endLoading() {
      this.loadingDepth = Math.max(0, this.loadingDepth - 1)
    }
  }
})