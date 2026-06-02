<template>
  <Teleport to="body">
    <div class="loading-overlay" aria-live="polite" aria-busy="true" role="status">
      <div class="loading-overlay__panel">
        <dotlottie-wc
          src="https://lottie.host/abf576fe-a3d9-4c51-90d6-2f5d7e42a4e6/gdpVuucASQ.lottie"
          style="width: 300px; height: 300px"
          autoplay
          loop
        ></dotlottie-wc>
        <p class="loading-overlay__text">Even laden...</p>
      </div>
    </div>
  </Teleport>
</template>

<style scoped>
.loading-overlay {
  position: fixed;
  inset: 0;
  z-index: 2000;
  display: grid;
  place-items: center;
  padding: var(--space-24);
  background: rgba(247, 244, 242, 0.84);
  backdrop-filter: blur(10px);
}

.loading-overlay__panel {
  display: grid;
  justify-items: center;
  gap: var(--space-12);
  padding: var(--space-24);
  border-radius: var(--radius-xl);
  background: rgba(255, 255, 255, 0.86);
  box-shadow: 0 20px 40px rgba(2, 40, 55, 0.14);
}

.loading-overlay__text {
  color: var(--color-text-strong);
  font-size: var(--fs-lg);
  font-weight: var(--fw-semibold);
}
</style>