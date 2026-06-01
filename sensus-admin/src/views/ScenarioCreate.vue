<template>
  <div class="scenario-create-page">
    <div class="page-header scenario-create-header">
      <div class="page-header__copy">
        <h1>Nieuw scenario</h1>

        <div class="scenario-create-templates">
          <button
            v-for="template in templates"
            :key="template.id"
            :class="['template-pill', selectedTemplateId === template.id && 'template-pill--active']"
            type="button"
            @click="selectTemplate(template.id)"
          >
            {{ template.title }}
          </button>
        </div>

        <div class="page-subnav tabs scenario-create-tabs">
          <button v-for="tab in stepTabs" :key="tab.key" :class="['tab', activeTab === tab.key && 'active']" type="button" @click="activeTab = tab.key">
            {{ tab.label }}
          </button>
        </div>
      </div>

      <div class="scenario-create-actions">
        <button class="scenario-create-button scenario-create-button--save" type="button" @click="saveDraft">+ Opslaan</button>
        <button class="scenario-create-button scenario-create-button--publish" type="button" @click="publishScenario">Publiceren</button>
        <button class="scenario-create-button scenario-create-button--cancel" type="button" @click="cancel">Annuleer</button>
      </div>
    </div>

    <div class="scenario-create-subactions">
      <button class="scenario-create-question-button" type="button" @click="addQuestion">+ Vraag toevoegen</button>
    </div>

    <div class="scenario-create-grid">
      <section class="card scenario-form-card">
        <h3 class="panel-title">Basisinfo</h3>

        <div class="scenario-form-grid">
          <FormField v-model="title" label="Scenario naam" placeholder="Naam" />
          <FormField v-model="theme" label="Thema" placeholder="Thema's" />

          <FormField v-model="description" label="Korte beschrijving" placeholder="Beschrijving" type="textarea" class="scenario-field-span" />

          <FormField v-model="introTitle" label="Intro titel" placeholder="Titel" />
          <FormField v-model="duration" label="Duur" placeholder="5 minuten" />

          <FormField v-model="introBody" label="Intro body" placeholder="Intro tekst" type="textarea" class="scenario-field-span" />

          <FormField v-model="buttonText" label="Knoptekst" placeholder="Start scenario" />
          <FormField v-model="note" label="Notitie" placeholder="Dit scenario duurt ongeveer 5 minuten." />
        </div>
      </section>

      <aside class="card scenario-preview-card">
        <h3 class="panel-title">Live preview</h3>
        <div class="scenario-preview">
          <div class="scenario-preview__step">{{ activeStepLabel }}</div>
          <div class="scenario-preview__title">{{ activeStep.title }}</div>
          <div v-if="activeStep.subtitle" class="scenario-preview__label">{{ activeStep.subtitle }}</div>

          <div v-if="activeStep.messages?.length" class="scenario-preview__messages">
            <div
              v-for="message in activeStep.messages"
              :key="`${message.side}-${message.text}`"
              :class="['scenario-preview__message', `scenario-preview__message--${message.side}`]"
            >
              {{ message.text }}
            </div>
          </div>

          <div v-if="activeStep.prompt" class="scenario-preview__prompt">{{ activeStep.prompt }}</div>

          <div v-if="activeStep.options?.length" class="scenario-preview__options">
            <span v-for="option in activeStep.options" :key="option.key" class="scenario-preview__option">{{ option.label }}</span>
          </div>

          <p v-if="activeStep.body" class="scenario-preview__body">{{ activeStep.body }}</p>
          <div v-if="activeStep.fields?.length" class="scenario-preview__fields">{{ activeStep.fields.length }} reflectievelden</div>
          <button class="btn-primary scenario-preview__button" type="button">{{ activeStep.buttonLabel || buttonText || 'Volgende' }}</button>
          <div class="scenario-preview__note">{{ activeStep.text || note || 'Dit scenario duurt ongeveer 5 minuten.' }}</div>
          <div class="scenario-preview__note scenario-preview__note--soft">Extra vragen in concept: {{ questionCount }}</div>
        </div>
      </aside>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'
import FormField from '../components/FormField.vue'
import scenariosService from '../services/scenariosService'

type StepPreview = {
  type: string
  title: string
  subtitle?: string
  buttonLabel?: string
  prompt?: string
  body?: string
  text?: string
  messages?: Array<{ side: 'left' | 'right'; text: string }>
  options?: Array<{ key: string; label: string }>
  fields?: Array<{ key: string }>
}

type ScenarioTemplate = {
  id: string
  title: string
  theme: string
  shortDescription: string
  tabSteps: Record<'intro' | 'step1' | 'reflection' | 'end', string>
  flow: Record<string, StepPreview>
}

const templates: ScenarioTemplate[] = [
  {
    id: 'online-gesprek-loopt-vast',
    title: 'Online gesprek loopt vast',
    theme: 'Online chat',
    shortDescription: 'Je verkent een gesprek dat stilvalt en hoe je daarop reageert.',
    tabSteps: { intro: 'intro', step1: 'first_contact', reflection: 'reflection', end: 'end' },
    flow: {
      intro: { type: 'intro', title: 'Online gesprek loopt vast', subtitle: 'Kort gesprek. Haar antwoorden blijven afstandelijk en kort.', buttonLabel: 'Start scenario' },
      first_contact: { type: 'choice', title: 'Eerste contact', subtitle: 'Je hebt iemand toegevoegd op Instagram. Ze accepteren je verzoek. Je stuurt een bericht. Het antwoord is kort.', prompt: 'Hoe voelt dit voor jou?', options: [{ key: 'chill', label: 'Chill' }, { key: 'neutraal', label: 'Neutraal' }, { key: 'onzeker', label: 'Onzeker' }] },
      reflection: { type: 'reflection', title: 'Reflectie', subtitle: 'Online is het niet altijd duidelijk wat iemand bedoelt.', body: 'Soms zijn korte antwoorden gewoon korte antwoorden. Maar soms zijn het ook signalen.', fields: [{ key: 'impact' }, { key: 'lesson' }, { key: 'nextTime' }], buttonLabel: 'Volgende' },
      end: { type: 'end', title: 'Einde', text: 'Bedankt voor het invullen.' }
    }
  },
  {
    id: 'groepschat-en-respect',
    title: 'Groepschat en respect',
    theme: 'Groepschat',
    shortDescription: 'Je beslist hoe je omgaat met groepsdruk online.',
    tabSteps: { intro: 'intro', step1: 'group_chat', reflection: 'reflection', end: 'end' },
    flow: {
      intro: { type: 'intro', title: 'Groepschat en respect', subtitle: 'Je ziet hoe een gesprek uit de hand dreigt te lopen.', buttonLabel: 'Start scenario' },
      group_chat: { type: 'choice', title: 'De groepschat', subtitle: 'Iemand maakt een flauwe opmerking over een klasgenoot.', prompt: 'Wat doe jij?', options: [{ key: 'meedoen', label: 'Ik lach mee' }, { key: 'ingrijpen', label: 'Ik zeg dat het niet oké is' }, { key: 'neutraal', label: 'Ik zeg niets' }] },
      reflection: { type: 'reflection', title: 'Reflectie', subtitle: 'Groepsdruk kan snel groter worden dan je denkt.', body: 'Je reactie heeft invloed op de sfeer in de chat.', fields: [{ key: 'impact' }, { key: 'lesson' }, { key: 'nextTime' }], buttonLabel: 'Volgende' },
      end: { type: 'end', title: 'Einde', text: 'Bedankt voor het invullen.' }
    }
  }
]

const title = ref('')
const description = ref('')
const theme = ref('')
const introTitle = ref('')
const duration = ref('5 minuten')
const introBody = ref('Introductie van het scenario.')
const buttonText = ref('Start scenario')
const note = ref('Dit scenario duurt ongeveer 5 minuten.')
const questionCount = ref(0)
const selectedTemplateId = ref(templates[0].id)
const activeTab = ref<'intro' | 'step1' | 'reflection' | 'end'>('intro')
const router = useRouter()

const currentTemplate = computed(() => templates.find((template) => template.id === selectedTemplateId.value) ?? templates[0])
const activeStepKey = computed(() => currentTemplate.value.tabSteps[activeTab.value])
const activeStep = computed(() => currentTemplate.value.flow[activeStepKey.value] ?? currentTemplate.value.flow.intro)
const activeStepLabel = computed(() => {
  if (activeTab.value === 'intro') return 'Intro'
  if (activeTab.value === 'step1') return 'Stap 1'
  if (activeTab.value === 'reflection') return 'Reflectie A'
  return 'Einde A'
})
const stepTabs = computed(() => [
  { key: 'intro' as const, label: 'Intro' },
  { key: 'step1' as const, label: 'Stap 1' },
  { key: 'reflection' as const, label: 'Reflectie A' },
  { key: 'end' as const, label: 'Einde A' }
])

function selectTemplate(templateId: string) {
  selectedTemplateId.value = templateId
  activeTab.value = 'intro'
}

function addQuestion() {
  questionCount.value += 1
}

async function create(publish = false) {
  const payload = {
    title: title.value || currentTemplate.value.title,
    description: description.value || currentTemplate.value.shortDescription,
    theme: theme.value || currentTemplate.value.theme,
    introTitle: introTitle.value || currentTemplate.value.title,
    duration: duration.value,
    introBody: introBody.value,
    buttonText: buttonText.value,
    note: note.value,
    questionCount: questionCount.value,
    status: publish ? 'published' : 'draft',
    flow: currentTemplate.value.flow,
    templateId: currentTemplate.value.id
  }

  const scenario = await scenariosService.createScenario(payload)
  if (scenario && scenario.id) {
    router.push(`/scenarios/${scenario.id}`)
  }
}

function saveDraft() {
  void create(false)
}

function publishScenario() {
  void create(true)
}

function cancel() {
  router.push('/scenarios')
}
</script>

<style scoped>
.scenario-create-page {
  display: grid;
  gap: 14px;
}

.scenario-create-header {
  align-items: flex-start;
  gap: 20px;
}

.scenario-create-templates {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 10px;
}

.template-pill {
  min-height: 36px;
  padding: 0 14px;
  border-radius: 999px;
  border: 1px solid rgba(2, 40, 55, 0.12);
  background: white;
  color: var(--color-text-strong);
  font-weight: 600;
}

.template-pill--active {
  background: rgba(165, 10, 126, 0.08);
  border-color: rgba(165, 10, 126, 0.28);
  color: var(--purple-700);
}

.scenario-create-tabs {
  margin-top: 10px;
}

.scenario-create-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  justify-content: flex-end;
}

.scenario-create-button,
.scenario-create-question-button {
  min-height: 46px;
  border: none;
  border-radius: 14px;
  font-weight: 700;
  padding: 0 18px;
}

.scenario-create-button--save,
.scenario-create-question-button {
  background: var(--blue-600);
  color: white;
}

.scenario-create-button--publish {
  background: var(--neutral-100);
  color: var(--blue-700);
}

.scenario-create-button--cancel {
  background: linear-gradient(90deg, var(--purple-600), var(--purple-500));
  color: white;
}

.scenario-create-subactions {
  display: flex;
  justify-content: flex-end;
}

.scenario-create-question-button {
  min-width: 176px;
}

.scenario-create-grid {
  display: grid;
  grid-template-columns: minmax(0, 1fr) 214px;
  gap: 16px;
  align-items: start;
}

.scenario-form-card {
  padding: 16px 16px 14px;
}

.scenario-form-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 12px 12px;
}

.scenario-field-span {
  grid-column: 1 / -1;
}

.scenario-preview-card {
  padding: 16px;
  min-height: 454px;
}

.scenario-preview {
  display: grid;
  gap: 10px;
}

.scenario-preview__step {
  display: inline-flex;
  width: fit-content;
  padding: 5px 10px;
  border-radius: 999px;
  background: rgba(165, 10, 126, 0.1);
  color: var(--purple-700);
  font-weight: 700;
  font-size: 0.82rem;
}

.scenario-preview__title {
  font-size: 1.2rem;
  font-weight: 700;
  color: var(--color-text-strong);
}

.scenario-preview__label {
  color: var(--color-text);
  line-height: 1.45;
}

.scenario-preview__messages {
  display: grid;
  gap: 8px;
}

.scenario-preview__message {
  width: fit-content;
  max-width: 100%;
  padding: 10px 12px;
  border-radius: 14px;
  background: rgba(2, 40, 55, 0.06);
  color: var(--color-text-strong);
}

.scenario-preview__message--right {
  margin-left: auto;
  background: rgba(165, 10, 126, 0.08);
}

.scenario-preview__prompt,
.scenario-preview__fields,
.scenario-preview__options {
  color: var(--color-text-strong);
  font-weight: 600;
}

.scenario-preview__options {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.scenario-preview__option {
  min-height: 32px;
  padding: 0 10px;
  border-radius: 999px;
  background: rgba(6, 70, 96, 0.08);
  display: inline-flex;
  align-items: center;
}

.scenario-preview__body,
.scenario-preview__note {
  color: var(--color-text);
  line-height: 1.45;
}

.scenario-preview__note--soft {
  opacity: 0.8;
  font-size: 0.9rem;
}

.scenario-preview__button {
  width: 100%;
  min-height: 44px;
  border: none;
  border-radius: 12px;
  margin-top: 4px;
}

@media (max-width: 980px) {
  .scenario-create-grid {
    grid-template-columns: 1fr;
  }

  .scenario-preview-card {
    min-height: auto;
  }

  .scenario-create-actions {
    width: 100%;
    justify-content: flex-start;
  }
}

@media (max-width: 720px) {
  .scenario-create-header {
    flex-direction: column;
  }

  .scenario-create-actions,
  .scenario-create-subactions {
    justify-content: stretch;
  }

  .scenario-create-actions > *,
  .scenario-create-subactions > * {
    width: 100%;
  }

  .scenario-create-templates,
  .scenario-create-tabs {
    width: 100%;
  }

  .template-pill,
  .scenario-create-button,
  .scenario-create-question-button {
    width: 100%;
  }

  .scenario-form-grid {
    grid-template-columns: 1fr;
  }

  .scenario-preview-card {
    padding: 14px;
  }
}

@media (max-width: 480px) {
  .scenario-create-page {
    gap: 12px;
  }

  .scenario-create-grid {
    gap: 12px;
  }

  .scenario-preview__options {
    gap: 6px;
  }

  .scenario-preview__option {
    width: 100%;
    justify-content: center;
  }
}
</style>
