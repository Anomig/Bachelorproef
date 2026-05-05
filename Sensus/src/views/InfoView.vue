<script setup>
// Informatie-scherm: verzamelt leeftijd en gender voordat de gebruiker scenarios bekijkt.
import { computed, reactive, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useSessionStore } from '../stores/sessionStore'
import AppButton from '../components/AppButton.vue'

const router = useRouter()
const store = useSessionStore()

const form = reactive({
  age: store.participantInfo.age,
  gender: store.participantInfo.gender
})

const canContinue = computed(() => Boolean(form.age && form.gender))

const ageOptions = [
  { value: '12-13', label: '12-13 jaar' },
  { value: '14-15', label: '14-15 jaar' },
  { value: '16-17', label: '16-17 jaar' },
  { value: '18+', label: '18 jaar of ouder' },
  { value: 'liever-niet', label: 'Zeg ik liever niet' }
]

const genderOptions = [
  { value: 'vrouw', label: 'Vrouw' },
  { value: 'man', label: 'Man' },
  { value: 'non-binair', label: 'Non-binair' },
  { value: 'anders', label: 'Anders' },
  { value: 'liever-niet', label: 'Zeg ik liever niet' }
]

onMounted(() => {
  if (!store.joined) {
    router.replace('/join')
    return
  }

  if (store.participantInfoCompleted) {
    router.replace('/overview')
  }
})

function goBack() {
  router.push('/join')
}

function continueToOverview() {
  const ok = store.saveParticipantInfo(form)
  if (!ok) return

  router.push('/before-start')
}
</script>

<template>
  <main class="page-shell page-shell--profile">
    <div class="profile-screen">
      <button class="profile-back" type="button" @click="goBack">
        <span class="profile-back__icon" aria-hidden="true">‹</span>
        <span>Terug</span>
      </button>

      <section class="profile-content">
        <header class="profile-header">
          <h1 class="profile-title">Informatie over jou</h1>
          <p class="profile-description">
            We gebruiken deze gegevens alleen voor het analyseren van data. Zo krijgen wij een beter beeld over gedrag van jongeren op vlak van toestemming.
          </p>
        </header>

        <div class="profile-field">
          <label class="profile-label" for="age">Hoe oud ben je? *</label>
          <div class="profile-select-wrap">
            <select id="age" v-model="form.age" class="profile-select">
              <option disabled value="">Select</option>
              <option v-for="option in ageOptions" :key="option.value" :value="option.value">
                {{ option.label }}
              </option>
            </select>
            <span class="profile-select-icon" aria-hidden="true"></span>
          </div>
        </div>

        <div class="profile-field">
          <label class="profile-label" for="gender">Wat is je gender? *</label>
          <div class="profile-select-wrap">
            <select id="gender" v-model="form.gender" class="profile-select">
              <option disabled value="">Select</option>
              <option v-for="option in genderOptions" :key="option.value" :value="option.value">
                {{ option.label }}
              </option>
            </select>
            <span class="profile-select-icon" aria-hidden="true"></span>
          </div>
        </div>

        <p class="profile-note">*Deze vragen zijn verplicht</p>

        <p class="profile-consent">
          Door verder te gaan ga je akkoord dat deze gegevens worden gebruikt voor het analyseren van data. Je deelname blijft volledig anoniem.
        </p>

        <AppButton class="profile-cta" :disabled="!canContinue" @click="continueToOverview">
          Ga verder
        </AppButton>
      </section>
    </div>
  </main>
</template>