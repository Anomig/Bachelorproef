<template>
  <div class="card" @click="openScenario">

    <h3>{{ scenario.title }}</h3>

    <p>{{ scenario.description }}</p>

  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'

const props = defineProps({
  scenario:Object
})

const router = useRouter()

function openScenario(){
  router.push(`/scenario/${props.scenario.id}`)
}
</script>

<style scoped>

.card{
  padding:20px;
  border-radius:12px;
  background:white;
  cursor:pointer;
}

</style>