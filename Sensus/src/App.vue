<script setup>
import { onBeforeUnmount, ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import { useUiStore } from './stores/uiStore'
import LoadingOverlay from './components/LoadingOverlay.vue'

const router = useRouter()
const uiStore = useUiStore()
const delayedLoading = ref(false)
let loadingTimer = null

watch(
  () => uiStore.isLoading,
  (isLoading) => {
    if (loadingTimer !== null) {
      clearTimeout(loadingTimer)
      loadingTimer = null
    }

    if (isLoading) {
      loadingTimer = window.setTimeout(() => {
        delayedLoading.value = uiStore.isLoading
        loadingTimer = null
      }, 1000)
      return
    }

    delayedLoading.value = false
  },
  { immediate: true }
)

const removeBeforeEach = router.beforeEach((_to, _from, next) => {
  uiStore.beginLoading()
  next()
})

const removeAfterEach = router.afterEach(() => {
  uiStore.endLoading()
})

const removeOnError = router.onError(() => {
  uiStore.endLoading()
})

onBeforeUnmount(() => {
  if (loadingTimer !== null) {
    clearTimeout(loadingTimer)
  }

  removeBeforeEach()
  removeAfterEach()
  removeOnError()
})
</script>

<template>
  <!-- Root shell van de app: toont de actieve route-component via vue-router. -->
  <router-view />
  <LoadingOverlay v-if="delayedLoading" />
</template>