import { defineStore } from 'pinia'

export const useSessionStore = defineStore('session', {

  state: () => ({
    age: null,
    gender: null,
    campaign: null,
    startedAt: null
  }),

  actions: {

    startSession(age, gender) {

      this.age = age
      this.gender = gender
      this.startedAt = Date.now()

    },

    resetSession() {

      this.age = null
      this.gender = null
      this.startedAt = null

    }

  }

})