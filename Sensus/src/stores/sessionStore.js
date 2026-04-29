import { defineStore } from 'pinia'
import { createScenarioEngine } from '../engine/scenarioEngine'
import { mockScenarios } from '../data/mockScenarios'
import { fetchScenarios } from '../services/strapi'

const REFLECTION_DEFAULTS = {
  impact: '',
  lesson: '',
  nextTime: ''
}

export const useSessionStore = defineStore('session', {
  state: () => ({
    sessionId: null,
    enteredCode: '',
    joined: false,
    joinError: '',
    availableScenarios: [],
    selectedScenarioId: null,
    engine: null,
    currentStep: null,
    lastEndStep: null,
    reflection: { ...REFLECTION_DEFAULTS }
  }),

  getters: {
    selectedScenario(state) {
      return (
        state.availableScenarios.find(scenario => scenario.id === state.selectedScenarioId) || null
      )
    }
  },

  actions: {
    joinWithCode(code) {
      const normalized = String(code || '').trim()

      if (!normalized) {
        this.joinError = 'Vul een code in.'
        this.joined = false
        return false
      }

      if (!/^\d{4}$/.test(normalized)) {
        this.joinError = 'Voer een 4-cijferige code in. Bijv. 1234'
        this.joined = false
        return false
      }

      if (normalized !== '1234') {
        this.joinError = 'Ongeldige code. Probeer 1234 voor de demo.'
        this.joined = false
        return false
      }

      this.sessionId = `session-${Date.now()}`
      this.enteredCode = normalized
      this.joined = true
      this.joinError = ''
      // fire-and-forget: load scenarios from Strapi if configured
      this.loadAvailableScenarios()
      return true
    },

    async loadAvailableScenarios() {
      try {
        const items = await fetchScenarios()
        if (items && items.length) {
          // ensure each scenario has the expected `scenario` object
          this.availableScenarios = items.map(it => ({
            id: it.id,
            title: it.title,
            shortDescription: it.shortDescription,
            theme: it.theme,
            scenario: it.scenario || {}
          }))
          return
        }
      } catch (e) {
        // fallthrough to mocks on error
        console.error('loadAvailableScenarios error', e)
      }

      this.availableScenarios = mockScenarios
    },

    selectScenario(scenarioId) {
      const exists = this.availableScenarios.some(scenario => scenario.id === scenarioId)
      if (!exists) return false

      this.selectedScenarioId = scenarioId
      return true
    },

    startSelectedScenario() {
      const selected = this.selectedScenario
      if (!selected) return false

      this.engine = createScenarioEngine(selected.scenario)
      this.currentStep = this.engine.getStep()
      this.lastEndStep = null
      this.reflection = { ...REFLECTION_DEFAULTS }
      return true
    },

    next(choiceKey) {
      if (!this.engine) return null

      const nextStep = this.engine.next(choiceKey) || null
      this.currentStep = nextStep

      if (nextStep?.type === 'end') {
        this.lastEndStep = nextStep
      }

      return nextStep
    },

    goNext() {
      if (!this.engine) return null

      const nextStep = this.engine.goNext() || null
      this.currentStep = nextStep

      if (nextStep?.type === 'end') {
        this.lastEndStep = nextStep
      }

      return nextStep
    },

    async saveReflection(payload) {
      this.reflection = {
        impact: payload?.impact || '',
        lesson: payload?.lesson || '',
        nextTime: payload?.nextTime || ''
      }

      const sessionId = this.sessionId
      const scenarioId = this.selectedScenarioId

      if (!sessionId || !scenarioId) {
        console.error('persist reflection skipped: missing sessionId or scenarioId')
        return false
      }

      try {
        const { saveReflection } = await import('../services/supabaseService')
        await saveReflection({ sessionId, scenarioId, reflection: this.reflection })
        return true
      } catch (e) {
        console.error('persist reflection failed or could not import supabaseService', e)
        return false
      }
    },

    backToOverview() {
      this.engine = null
      this.currentStep = null
      this.lastEndStep = null
      this.selectedScenarioId = null
    },

    leaveSession() {
      this.sessionId = null
      this.enteredCode = ''
      this.joined = false
      this.joinError = ''
      this.availableScenarios = []
      this.selectedScenarioId = null
      this.engine = null
      this.currentStep = null
      this.lastEndStep = null
      this.reflection = { ...REFLECTION_DEFAULTS }
    }
  }
})