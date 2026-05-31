export default [
  {
    id: 1,
    title: 'Online gesprek loopt vast',
    status: 'published',
    theme: 'Online chat',
    date: '31/05/2026, 16:56',
    sessions: 13,
    description: 'Je verkent een gesprek dat stilvalt en hoe je daarop reageert.',
    flow: {
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
          subtitle: 'Je hebt iemand toegevoegd op Instagram. Ze accepteren je verzoek. Je stuurt een bericht. Het antwoord is kort.',
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
          prompt: 'Hoe lees jij dit?',
          options: [
            { key: 'bezig', label: 'Die is gewoon bezig', next: 'reaction' },
            { key: 'geen_zin', label: 'Die heeft geen zin om te praten', next: 'reaction' },
            { key: 'geen_idee', label: 'Geen idee', next: 'reaction' }
          ]
        },
        reaction: {
          type: 'continue',
          title: 'Jouw reactie',
          subtitle: 'Je zit even naar het gesprek te kijken...',
          buttonLabel: 'Volgende',
          next: 'reflection'
        },
        reflection: {
          type: 'reflection',
          title: 'Reflectie',
          subtitle: 'Online is het niet altijd duidelijk wat iemand bedoelt.',
          body: 'Soms zijn korte antwoorden gewoon korte antwoorden. Maar soms zijn het ook signalen.',
          buttonLabel: 'Volgende',
          next: 'end',
          fields: [
            { key: 'impact', label: 'Wat was de impact van deze situatie?', placeholder: 'Beschrijf wat dit met jou of de ander deed.', required: true },
            { key: 'lesson', label: 'Wat heb je hieruit geleerd?', placeholder: 'Wat neem je mee uit dit scenario?', required: true },
            { key: 'nextTime', label: 'Wat ga je volgende keer anders doen?', placeholder: 'Beschrijf je volgende stap of reactie.', required: true }
          ]
        },
        end: { type: 'end', text: 'Bedankt voor het invullen.' }
      }
    }
  },
  {
    id: 2,
    title: 'Groepschat en respect',
    status: 'draft',
    theme: 'Groepschat',
    date: '31/05/2026, 16:22',
    sessions: 0,
    description: 'Je beslist hoe je omgaat met groepsdruk online.',
    flow: {
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
            { key: 'impact', label: 'Wat was de impact van deze situatie?', placeholder: 'Hoe beïnvloedde dit de ander of de groep?', required: true },
            { key: 'lesson', label: 'Wat heb je hieruit geleerd?', placeholder: 'Welke les neem je mee?', required: true },
            { key: 'nextTime', label: 'Wat ga je volgende keer anders doen?', placeholder: 'Wat zou je anders zeggen of doen?', required: true }
          ]
        },
        end: { type: 'end', text: 'Bedankt voor het invullen.' }
      }
    }
  }
]
