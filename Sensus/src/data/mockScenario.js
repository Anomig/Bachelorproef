// Voorbeeldscenario: gebruikt de nieuwe Figma-flow voor online chat en consent.
export const mockScenario = {
  start: 'intro',
  steps: {
    intro: {
      type: 'intro',
      title: 'Online gesprek loopt vast',
      subtitle: 'Kort gesprek. Haar antwoorden blijven afstandelijk en kort.',
      buttonLabel: 'Start scenario',
      next: 'first_contact'
    },
    first_contact: {
      type: 'choice',
      title: 'Eerste contact',
      subtitle:
        'Je hebt iemand toegevoegd op Instagram. Ze accepteren je verzoek. Je stuurt een bericht. Het antwoord is kort.',
      messages: [
        { time: 'Vandaag 13:14', side: 'right', text: 'Hey, alles goed?' },
        { side: 'left', text: 'jaa, met jou' }
      ],
      prompt: 'Hoe voelt dit voor jou?',
      options: [
        { key: 'chill', label: 'Chill', next: 'first_signal' },
        { key: 'neutraal', label: 'Neutraal', next: 'first_signal' },
        { key: 'onzeker', label: 'Onzeker', next: 'first_signal' },
        { key: 'input', label: 'Eigen input', next: 'first_signal', inputMode: 'freeText', placeholder: 'Typ je eigen gevoel...', submitLabel: 'Verstuur' }
      ]
    },
    first_signal: {
      type: 'choice',
      title: 'Eerste signaal',
      subtitle: 'Je stuurt een nieuw bericht. Maar het gesprek loopt wat stroever.',
      messages: [
        { time: 'Vandaag 13:30', side: 'right', text: 'Wat ben je aan het doen?' },
        { time: 'Vandaag 15:20', side: 'left', text: 'gwn, niks...' }
      ],
      prompt: 'Hoe lees jij dit?',
      options: [
        { key: 'bezig', label: 'Die is gewoon bezig', next: 'reaction' },
        { key: 'geen_zin', label: 'Die heeft geen zin om te praten', next: 'reaction' },
        { key: 'geen_idee', label: 'Geen idee', next: 'reaction' }
      ]
    },
    reaction: {
      type: 'choice',
      title: 'Jouw reactie',
      subtitle: 'Je zit even naar het gesprek te kijken...',
      prompt: 'Kies wat jij zou doen.',
      options: [
        { key: 'probeer_verder', label: 'Ik stuur nog iets, anders stopt het', next: 'je_probeert_verder' },
        { key: 'ruimte', label: 'ik laat het gewoon even zo', next: 'je_geeft_ruimte' }
      ],
      note: 'Beide keuzes leiden naar een andere situatie.'
    },
    je_probeert_verder: {
      type: 'continue',
      title: 'Je probeert verder',
      subtitle: 'Je houdt het gesprek gaande.',
      messages: [
        { time: 'Vandaag 15:38', side: 'right', text: 'haha same hier' },
        { side: 'right', text: 'anders samen chillen?' },
        { time: 'Vandaag 15:50', side: 'left', text: 'haha misschien later' }
      ],
      buttonLabel: 'Volgende',
      next: 'feelings'
    },
    je_geeft_ruimte: {
      type: 'continue',
      title: 'Je geeft ruimte',
      subtitle: 'Je stuurt even niets',
      buttonLabel: 'Volgende',
      next: 'feelings'
    },
    feelings: {
      type: 'choice',
      title: 'Je gevoel',
      subtitle: 'Het gesprek loopt niet zoals je had gehoopt.',
      prompt: 'Hoe voelt dit voor jou?',
      options: [
        { key: 'teleurstellend', label: 'Teleurstellend', next: 'reflection' },
        { key: 'chill', label: 'Chill', next: 'reflection' },
        { key: 'verwarrend', label: 'Verwarrend', next: 'reflection' },
        { key: 'input', label: 'Eigen input', next: 'reflection', inputMode: 'freeText', placeholder: 'Typ je eigen gevoel...', submitLabel: 'Verstuur' }
      ]
    },
    reflection: {
      type: 'reflection',
      title: 'Reflectie',
      subtitle: 'Online is het niet altijd duidelijk wat iemand bedoelt.',
      body:
        'Soms zijn korte antwoorden gewoon... korte antwoorden. Maar soms zijn het ook signalen.',
      prompt: 'Welke signalen ga je volgende keer sneller oppikken?',
      placeholder: 'Vul hier je antwoord in.',
      buttonLabel: 'Volgende',
      next: 'end'
    },
    end: {
      type: 'end',
      text: 'Bedankt voor het invullen.'
    }
  }
}