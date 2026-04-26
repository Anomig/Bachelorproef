<script setup>
import { ref, onMounted } from 'vue'
import { supabase } from '../lib/supabase'

const sessionId = ref(null)

const scenario = ref({
  title: 'Test scenario',
  text: 'Je bent op een feestje...'
})

const choices = ref([
  { id: 'a', text: 'Je gaat mee in het gesprek' },
  { id: 'b', text: 'Je zegt dat je je ongemakkelijk voelt' }
])

onMounted(() => {
  const urlParams = new URLSearchParams(window.location.search)
  sessionId.value = urlParams.get('session')
})

async function selectChoice(choice) {
  const { error } = await supabase.from('events').insert([
    {
      session_id: sessionId.value,
      step_id: 'scenario_1',
      type: 'choice',
      value: choice.id
    }
  ])

  if (error) {
    console.error(error)
  } else {
    console.log('Choice opgeslagen ✔')
  }
}
</script>