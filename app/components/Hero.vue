<template>
  <section id="hero" class="hero-section">
    <div class="hero-background" aria-hidden="true">
      <div
        v-for="(image, index) in wallpapers"
        :key="image"
        class="hero-slide"
        :class="{ 'is-active': index === currentSlide }"
        :style="{ backgroundImage: `url('${image}')` }"
      />
      <div class="hero-overlay" />
    </div>

    <div class="container">
      <div class="hero-content">
        <div class="hero-text">
          <h1 class="hero-title">{{ $t('hero.title') }}</h1>
          <h2 class="hero-subtitle">{{ $t('hero.subtitle') }}</h2>
          <p class="hero-description">
            {{ $t('hero.description') }}
          </p>
          <div class="hero-actions">
            <NuxtLink to="/register" class="btn btn-primary btn-large">
              {{ $t('hero.cta') }}
            </NuxtLink>
            <NuxtLink to="#about" class="btn btn-secondary btn-large">
              {{ $t('hero.learnMore') }}
            </NuxtLink>
          </div>
          <div class="hero-stats">
            <div class="stat">
              <span class="stat-number">{{ $t('hero.stats.projects.number') }}</span>
              <span class="stat-label">{{ $t('hero.stats.projects.label') }}</span>
            </div>
            <div class="stat">
              <span class="stat-number">{{ $t('hero.stats.clients.number') }}</span>
              <span class="stat-label">{{ $t('hero.stats.clients.label') }}</span>
            </div>
            <div class="stat">
              <span class="stat-number">{{ $t('hero.stats.experience.number') }}</span>
              <span class="stat-label">{{ $t('hero.stats.experience.label') }}</span>
            </div>
          </div>
        </div>
        <div class="hero-image">
          <div class="image-placeholder">
            <NuxtImg
              src="/Crest.png"
              alt="Construction brand crest logo"
              class="construction-logo"
              width="245"
              height="245"
            />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const wallpapers = [
  'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1920&q=80',
  'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&w=1920&q=80',
  'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1920&q=80',
  'https://images.unsplash.com/photo-1489515217757-5fd1be406fef?auto=format&fit=crop&w=1920&q=80'
]

const currentSlide = ref(0)
let slideTimer: ReturnType<typeof setInterval> | null = null

onMounted(() => {
  slideTimer = setInterval(() => {
    currentSlide.value = (currentSlide.value + 1) % wallpapers.length
  }, 5000)
})

onBeforeUnmount(() => {
  if (slideTimer) {
    clearInterval(slideTimer)
  }
})
</script>

<style scoped>
.hero-section {
  position: relative;
  min-height: 100vh;
  display: flex;
  align-items: center;
  color: white;
  padding-top: 5rem; /* Account for fixed header */
  overflow: hidden;
}

.hero-background {
  position: absolute;
  inset: 0;
  z-index: 0;
}

.hero-slide {
  position: absolute;
  inset: 0;
  background-size: cover;
  background-position: center;
  opacity: 0;
  transform: scale(1.05);
  transition: opacity 1s ease, transform 6s ease;
}

.hero-slide.is-active {
  opacity: 1;
  transform: scale(1);
}

.hero-overlay {
  position: absolute;
  inset: 0;
  background:
    linear-gradient(120deg, rgba(8, 12, 22, 0.78) 0%, rgba(13, 20, 35, 0.65) 45%, rgba(15, 23, 42, 0.75) 100%);
}

.container {
  position: relative;
  z-index: 1;
}

.hero-content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  align-items: center;
}

.hero-text {
  max-width: 600px;
}

.hero-title {
  font-size: 3.5rem;
  font-weight: 800;
  line-height: 1.1;
  margin-bottom: 1rem;
  background: linear-gradient(45deg, #1a1a1a, #000000);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.hero-subtitle {
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 1.5rem;
  color: #fbbf24;
}

.hero-description {
  font-size: 1.125rem;
  line-height: 1.7;
  margin-bottom: 2.5rem;
  color: #1a1a1a;
}

.hero-actions {
  display: flex;
  gap: 1rem;
  margin-bottom: 3rem;
  flex-wrap: wrap;
}

.btn {
  padding: 0.75rem 2rem;
  border-radius: 0.5rem;
  font-weight: 600;
  text-decoration: none;
  transition: all 0.3s ease;
  border: 2px solid transparent;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

.btn-large {
  padding: 1rem 2.5rem;
  font-size: 1.125rem;
}

.btn-primary {
  background-color: #1a1a1a;
  color: #fbbf24;
  border-color: #1a1a1a;
}

.btn-primary:hover {
  background-color: #000000;
  border-color: #000000;
  transform: translateY(-2px);
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.3);
}

.btn-secondary {
  background-color: transparent;
  color: #1a1a1a;
  border-color: #1a1a1a;
}

.btn-secondary:hover {
  background-color: #1a1a1a;
  color: #fbbf24;
  transform: translateY(-2px);
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
}

.hero-stats {
  display: flex;
  gap: 2rem;
  flex-wrap: wrap;
}

.stat {
  text-align: center;
}

.stat-number {
  display: block;
  font-size: 2rem;
  font-weight: 700;
  color: #fbbf24;
}

.stat-label {
  display: block;
  font-size: 0.875rem;
  color: #1a1a1a;
  margin-top: 0.25rem;
}

.hero-image {
  display: flex;
  justify-content: center;
  align-items: center;
}

.image-placeholder {
  width: 400px;
  height: 400px;
  background: rgba(0, 0, 0, 0.1);
  border-radius: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(0, 0, 0, 0.2);
}

.construction-icon {
  width: 200px;
  height: 200px;
  color: rgba(0, 0, 0, 0.3);
}

/* Responsive Design */
@media (max-width: 1024px) {
  .hero-content {
    grid-template-columns: 1fr;
    gap: 3rem;
    text-align: center;
  }
  
  .hero-title {
    font-size: 3rem;
  }
  
  .image-placeholder {
    width: 300px;
    height: 300px;
  }
  
  .construction-logo {
    width: 200px;
    height: 200px;
  }
}

@media (max-width: 768px) {
  .hero-section {
    padding-top: 4rem;
    min-height: 90vh;
  }
  
  .hero-title {
    font-size: 2.5rem;
  }
  
  .hero-subtitle {
    font-size: 1.25rem;
  }
  
  .hero-description {
    font-size: 1rem;
  }
  
  .hero-actions {
    flex-direction: column;
    align-items: center;
  }
  
  .btn {
    width: 100%;
    max-width: 300px;
  }
  
  .hero-stats {
    justify-content: center;
    gap: 1.5rem;
  }
  
  .image-placeholder {
    width: 250px;
    height: 250px;
  }
  
  .construction-logo {
    width: 170px;
    height: 170px;
  }
}

@media (max-width: 480px) {
  .hero-title {
    font-size: 2rem;
  }
  
  .hero-subtitle {
    font-size: 1.125rem;
  }
  
  .stat-number {
    font-size: 1.5rem;
  }
  
  .hero-stats {
    gap: 1rem;
  }
}

@media (prefers-reduced-motion: reduce) {
  .hero-slide {
    transition: none;
  }
}
</style>