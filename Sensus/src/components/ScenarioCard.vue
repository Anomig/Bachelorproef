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
      {{ loading ? 'Bezig...' : 'Start' }}
    </AppButton>
  </article>
</template>

<style scoped>
.scenario-card {
  background: var(--color-surface);
  border: 1px solid rgba(2, 40, 55, 0.16);
  border-radius: 12px;
  padding: var(--space-16);
  box-shadow: 0 1px 0 rgba(2, 40, 55, 0.04), 0 2px 5px rgba(2, 40, 55, 0.08);
  display: grid;
  gap: var(--space-16);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.scenario-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 10px rgba(2, 40, 55, 0.1);
}

.scenario-card__content {
  display: grid;
  gap: var(--space-12);
}

.scenario-card h2 {
  font-size: var(--fs-xl);
  line-height: var(--lh-tighter);
}

.scenario-card__description {
  color: var(--color-text);
}

.scenario-card__meta {
  font-size: var(--fs-sm);
  color: var(--color-text);
}
</style>