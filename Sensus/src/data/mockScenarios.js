import { mockScenario } from './mockScenario'

const mockScenarioTwo = {
  start: 'intro',
  steps: {
    intro: {
      type: 'intro',
      title: 'Groepschat en respect',
      subtitle: 'Je ziet hoe een gesprek uit de hand dreigt te lopen.',
      buttonLabel: 'Start scenario',
      next: 'group_chat'
    },
    group_chat: {
      type: 'choice',
      title: 'De groepschat',
      subtitle: 'Iemand maakt een flauwe opmerking over een klasgenoot.',
      messages: [
        { time: 'Vandaag 18:10', side: 'right', text: 'haha serieus?' },
        { side: 'left', text: 'laat die gast gewoon' }
      ],
      prompt: 'Wat doe jij?',
      options: [
        { key: 'meedoen', label: 'Ik lach mee', next: 'reaction' },
        { key: 'ingrijpen', label: 'Ik zeg dat het niet oké is', next: 'reaction' },
        { key: 'neutraal', label: 'Ik zeg niets', next: 'reaction' }
      ]
    },
    reaction: {
      type: 'continue',
      title: 'Reactie in de chat',
      subtitle: 'De sfeer verandert meteen.',
      buttonLabel: 'Volgende',
      next: 'reflection'
    },
    reflection: {
      type: 'reflection',
      title: 'Reflectie',
      subtitle: 'Groepsdruk kan snel groter worden dan je denkt.',
      body: 'Je reactie heeft invloed op de sfeer in de chat.',
      buttonLabel: 'Volgende',
      next: 'end',
      fields: [
        {
          key: 'impact',
          label: 'Wat was de impact van deze situatie?',
          placeholder: 'Hoe beïnvloedde dit de ander of de groep?',
          required: true
        },
        {
          key: 'lesson',
          label: 'Wat heb je hieruit geleerd?',
          placeholder: 'Welke les neem je mee?',
          required: true
        },
        {
          key: 'nextTime',
          label: 'Wat ga je volgende keer anders doen?',
          placeholder: 'Wat zou je anders zeggen of doen?',
          required: true
        }
      ]
    },
    end: {
      type: 'end',
      text: 'Bedankt voor het invullen.'
    }
  }
}

export const mockScenarios = [
  {
    id: 'online-gesprek-loopt-vast',
    title: 'Online gesprek loopt vast',
    shortDescription: 'Je verkent een gesprek dat stilvalt en hoe je daarop reageert.',
    theme: 'Online chat',
    scenario: mockScenario
  },
  {
    id: 'groepschat',
    title: 'Groepschat en respect',
    shortDescription: 'Je beslist hoe je omgaat met groepsdruk online.',
    theme: 'Groepschat',
    scenario: mockScenarioTwo
  }
]