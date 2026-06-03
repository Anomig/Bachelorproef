// Hoofdstore van de app: sessie + scenario flow + reflectie
import { defineStore } from 'pinia'
import {useStorage} from '@vueuse/core'
import { createScenarioEngine } from '../engine/scenarioEngine'
import { mockScenarios } from '../data/mockScenarios'
import { fetchScenarios } from '../services/strapi'
import { createSession, updateSession } from '../services/sessionService'
import { saveReflection } from '../services/supabaseService'

// 🔥 NIEUW: event tracking service (Supabase)
import { createEvent } from '../services/sessionService'

const REFLECTION_DEFAULTS = {
  impact: '',
  lesson: '',
  nextTime: ''
}

const PARTICIPANT_INFO_DEFAULTS = {
  age: '',
  gender: ''
}

/* ================= VALIDATION ================= */
function isValidScenarioDefinition(value) {
  if (!value || typeof value !== 'object') return false
  if (typeof value.start !== 'string' || !value.start) return false
  if (!value.steps || typeof value.steps !== 'object') return false
  return Boolean(value.steps[value.start])
}

/* ================= SESSION ID ================= */
function createSessionId() {
  return (
    globalThis.crypto?.randomUUID?.() ||
    `${Date.now()}-${Math.random().toString(36).slice(2)}`
  )
}

/* ================= STORE ================= */
export const useSessionStore = defineStore('session', {
  state: () => ({
    sessionId: null,
    enteredCode: '',
    joined: useStorage('joined', false),
    joinError: '',

    participantInfo: { ...PARTICIPANT_INFO_DEFAULTS },
    participantInfoCompleted: false,

    availableScenarios: [],
    selectedScenarioId: useStorage('selectedScenarioId', null),
    sessionId: useStorage('sessionId', null),

    engine: null,
    currentStep: null,
    lastEndStep: null,

    reflection: { ...REFLECTION_DEFAULTS },
    freeChoiceInputs: []
  }),

/* ================= GETTERS ================= */
  getters: {
    selectedScenario(state) {
      return state.availableScenarios.find(
        s => s.id === state.selectedScenarioId
      ) || null
    }
  },

/* ================= ACTIONS ================= */
  actions: {

    /* ================= JOIN ================= */
    async joinWithCode(code) {
      const normalized = String(code || '').trim()

      if (!normalized) {
        this.joinError = 'Vul een code in.'
        return false
      }

      if (!/^\d{4}$/.test(normalized)) {
        this.joinError = 'Voer een 4-cijferige code in.'
        return false
      }

      if (normalized !== '1234') {
        this.joinError = 'Ongeldige code.'
        return false
      }

      this.sessionId = createSessionId()
      this.enteredCode = normalized
      this.joined = true
      this.joinError = ''

      // 🔥 SESSION START
      try {
        await createSession({
          sessionId: this.sessionId,
          start: new Date().toISOString(),
          status: 'active'
        })

        await createEvent({
          sessionId: this.sessionId,
          eventType: 'session_started'
        })
      } catch (e) {
        console.error('session start failed', e)
      }

      this.loadAvailableScenarios()
      return true
    },

    /* ================= PARTICIPANT INFO ================= */
    saveParticipantInfo(payload) {
      const age = String(payload?.age || '').trim()
      const gender = String(payload?.gender || '').trim()

      if (!age || !gender) return false

      this.participantInfo = { age, gender }
      this.participantInfoCompleted = true

      return true
    },

    /* ================= SCENARIOS ================= */
    async loadAvailableScenarios() {
      try {
        const items = await fetchScenarios()
        console.log('RAW STRAPI ITEMS:', items)

        if (items?.length) {
          const valid = items.filter(i =>
  isValidScenarioDefinition(i?.scenario)
)

console.log('VALID AFTER FILTER:', valid)

this.availableScenarios = valid.length
  ? valid.map(i => ({
      id: i.id,
      title: i.title,
      shortDescription: i.shortDescription,
      theme: i.theme,
      scenario:
        i.engine_json?.data?.attributes?.engine_json ||
        i.engine_json ||
        i.scenario
    }))
  : mockScenarios

          return
        }
      } catch (e) {
        console.error(e)
      }

      this.availableScenarios = mockScenarios
    },

    selectScenario(id) {
  console.log('SELECTING:', id)

  this.selectedScenarioId = id

  console.log('STATE AFTER SELECT:', {
    selectedScenarioId: this.selectedScenarioId,
    available: this.availableScenarios
  })

  return true
},

    /* ================= START SCENARIO ================= */
async startSelectedScenario() {
  const selected = this.selectedScenario

  console.log('SELECTED OBJECT:', selected)
  console.log('SCENARIO INSIDE:', selected?.scenario)

  if (!selected?.scenario) {
    console.error('NO SCENARIO FOUND')
    return false
  }

  const engine = createScenarioEngine(selected.scenario)

  if (!engine) {
    console.error('ENGINE FAILED TO INITIALIZE')
    return false
  }

  this.engine = engine
  this.currentStep = engine.getStep()

  console.log('ENGINE OK:', this.engine)
  console.log('FIRST STEP:', this.currentStep)

  return true
},

    /* ================= FLOW ================= */
    next(choiceKey) {
      if (!this.engine) return null

      const nextStep = this.engine.next(choiceKey)
      this.currentStep = nextStep

      this.logEvent('choice_made', { choiceKey, step: nextStep })

      if (nextStep?.type === 'end') {
        this.lastEndStep = nextStep
        this.logEvent('scenario_completed')
      }

      return nextStep
    },

    goNext() {
      if (!this.engine) return null

      const nextStep = this.engine.goNext()
      this.currentStep = nextStep

      this.logEvent('step_continue', { step: nextStep })

      return nextStep
    },

    /* ================= EVENTS (CENTRAL) ================= */
    async logEvent(eventType, payload = {}) {
      try {
        if (!this.sessionId) return

        await createEvent({
          sessionId: this.sessionId,
          scenarioId: this.selectedScenarioId,
          eventType,
          payload,
          createdAt: new Date().toISOString()
        })
      } catch (e) {
        console.error('event log failed', e)
      }
    },

    /* ================= REFLECTION ================= */
    async saveReflection(payload) {
      this.reflection = {
        impact: payload?.impact || '',
        lesson: payload?.lesson || '',
        nextTime: payload?.nextTime || ''
      }

      if (!this.sessionId || !this.selectedScenarioId) return false

      try {
        await saveReflection({
          sessionId: this.sessionId,
          scenarioId: this.selectedScenarioId,
          reflection: this.reflection
        })

        await this.logEvent('reflection_saved')

        return true
      } catch (e) {
        console.error(e)
        return false
      }
    },

        backToOverview() {
      this.engine = null
      this.currentStep = null
      this.lastEndStep = null
      this.selectedScenarioId = null
      this.freeChoiceInputs = []
    },

    /* ================= END SESSION ================= */
    async leaveSession() {
      try {
        if (this.sessionId) {
          await updateSession({
            sessionId: this.sessionId,
            end: new Date().toISOString(),
            status: 'completed'
          })

          await this.logEvent('session_ended')
        }
      } catch (e) {
        console.error(e)
      }

      this.sessionId = null
      this.enteredCode = ''
      this.joined = false
      this.availableScenarios = []
      this.selectedScenarioId = null
      this.engine = null
      this.currentStep = null
      this.lastEndStep = null
      this.freeChoiceInputs = []
    },

    /* ================= FREE INPUT ================= */
    recordFreeChoiceInput(payload) {
      this.freeChoiceInputs.push({
        optionKey: payload?.optionKey || '',
        value: payload?.value || '',
        prompt: payload?.prompt || '',
        title: payload?.title || '',
        createdAt: new Date().toISOString()
      })

      this.logEvent('free_input', payload)
    }
  }
})