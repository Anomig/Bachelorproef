// Bundelt demo-scenario's in de lijststructuur die de overview verwacht.
import { mockScenario } from './mockScenario'

const mockScenarioTwo = {
  start: 'intro',
  steps: {
    intro: {
      type: 'text',
      text: 'Je zit in een groepschat en iemand wordt uitgelachen.',
      next: 'choice_1'
    },
    choice_1: {
      type: 'choice',
      text: 'Wat doe je?',
      options: [
        {
          key: 'a',
          label: 'Je lacht mee om erbij te horen',
          next: 'end_bad'
        },
        {
          key: 'b',
          label: 'Je reageert respectvol en stopt het gesprek',
          next: 'end_good'
        }
      ]
    },
    end_bad: {
      type: 'end',
      text: 'Meelachen kan kwetsend zijn en de situatie erger maken.'
    },
    end_good: {
      type: 'end',
      text: 'Je kiest voor respect en helpt de groepssfeer.'
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