<script setup>
import { supabase } from '../lib/supabase'

async function startSession() {
  console.log('test werkt')
  const { data, error } = await supabase
    .from('sessions')
    .insert([
      {
        scenario_id: 'test_scenario',
        age: 17,
        gender: 'F'
      }
    ])
    .select()

  if (error) {
    console.error(error)
  } else {
    console.log('Session gestart:', data)
  }
}
</script>

<template>
  <button @click="startSession">
    Start sessie
  </button>
</template>