export const mockScenario = {
  start: "intro",
  steps: {
    intro: {
      type: "text",
      text: "Je bent op een feestje...",
      next: "choice_1"
    },

    choice_1: {
      type: "choice",
      text: "Wat doe je?",
      options: [
        {
          key: "a",
          label: "Je gaat dichterbij",
          next: "end_bad"
        },
        {
          key: "b",
          label: "Je houdt afstand",
          next: "end_good"
        }
      ]
    },

    end_bad: {
      type: "end",
      text: "Dit kan grensoverschrijdend zijn."
    },

    end_good: {
      type: "end",
      text: "Je respecteert grenzen."
    }
  }
}