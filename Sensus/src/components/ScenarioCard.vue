<script setup>
// Presentatiekaart voor 1 scenario in de overview-grid.
import AppButton from './AppButton.vue'

defineProps({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  theme: {
    type: String,
    required: true
  },
  loading: Boolean
})

defineEmits(['start'])
</script>

<template>
  <article class="scenario-card">
    <div class="scenario-card__content">
      <h2>{{ title }}</h2>
      <p class="scenario-card__description">{{ description }}</p>
      <p class="scenario-card__meta">{{ theme }}</p>
    </div>

    <AppButton :disabled="loading" @click="$emit('start')">
      {{ loading ? 'Bezig...' : 'Start scenario' }}
    </AppButton>
  </article>
</template>

<style scoped>
.scenario-card {
  background: var(--color-surface);
  border: 1px solid rgba(2, 40, 55, 0.08);
  border-radius: var(--radius-xl);
  padding: var(--space-24);
  box-shadow: 0 8px 18px rgba(43, 31, 73, 0.08);
  display: grid;
  gap: var(--space-20);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.scenario-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 24px rgba(43, 31, 73, 0.12);
}

.scenario-card__content {
  display: grid;
  gap: var(--space-8);
}

.scenario-card__description {
  color: var(--color-text);
}

.scenario-card__meta {
  font-size: var(--fs-sm);
  color: var(--blue-500);
}
</style>