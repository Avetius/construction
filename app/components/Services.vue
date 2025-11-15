<template>
  <section id="services" class="services-section">
    <div class="container">
      <div class="section-header">
        <h2 class="section-title">{{ $t('services.title') }}</h2>
        <p class="section-subtitle">
          {{ $t('services.subtitle') }}
        </p>
      </div>
      
      <div class="services-grid">
        <div class="service-card">
          <div class="service-icon">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M3 21h18"/>
              <path d="M5 21V7l8-4v18"/>
              <path d="M19 21V11l-6-4"/>
            </svg>
          </div>
          <h3>{{ $t('services.residential.title') }}</h3>
          <p>{{ $t('services.residential.description') }}</p>
          <ul class="service-features">
            <li>{{ $t('services.residential.features.0') }}</li>
            <li>{{ $t('services.residential.features.1') }}</li>
            <li>{{ $t('services.residential.features.2') }}</li>
            <li>{{ $t('services.residential.features.3') }}</li>
          </ul>
          <div class="service-cta">
            <NuxtLink to="#contacts" class="btn btn-outline">{{ $t('common.learnMore') }}</NuxtLink>
          </div>
        </div>
        
        <div class="service-card featured">
          <div class="featured-badge">{{ $t('services.commercial.badge') }}</div>
          <div class="service-icon">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M3 21h18"/>
              <path d="M9 8h10V6a2 2 0 0 0-2-2H11a2 2 0 0 0-2 2v2Z"/>
              <path d="M3 21v-4a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v4"/>
              <path d="M5 21V10a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v11"/>
            </svg>
          </div>
          <h3>{{ $t('services.commercial.title') }}</h3>
          <p>{{ $t('services.commercial.description') }}</p>
          <ul class="service-features">
            <li>{{ $t('services.commercial.features.0') }}</li>
            <li>{{ $t('services.commercial.features.1') }}</li>
            <li>{{ $t('services.commercial.features.2') }}</li>
            <li>{{ $t('services.commercial.features.3') }}</li>
          </ul>
          <div class="service-cta">
            <NuxtLink to="#contacts" class="btn btn-primary">{{ $t('common.getStarted') }}</NuxtLink>
          </div>
        </div>
        
        <div class="service-card">
          <div class="service-icon">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/>
            </svg>
          </div>
          <h3>{{ $t('services.renovation.title') }}</h3>
          <p>{{ $t('services.renovation.description') }}</p>
          <ul class="service-features">
            <li>{{ $t('services.renovation.features.0') }}</li>
            <li>{{ $t('services.renovation.features.1') }}</li>
            <li>{{ $t('services.renovation.features.2') }}</li>
            <li>{{ $t('services.renovation.features.3') }}</li>
          </ul>
          <div class="service-cta">
            <NuxtLink to="#contacts" class="btn btn-outline">{{ $t('common.learnMore') }}</NuxtLink>
          </div>
        </div>
        
        <div class="service-card">
          <div class="service-icon">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M9 11H5a2 2 0 0 0-2 2v7a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7a2 2 0 0 0-2-2h-4"/>
              <polyline points="9,11 12,14 15,11"/>
              <path d="M12 3v11"/>
            </svg>
          </div>
          <h3>{{ $t('services.projectManagement.title') }}</h3>
          <p>{{ $t('services.projectManagement.description') }}</p>
          <ul class="service-features">
            <li>{{ $t('services.projectManagement.features.0') }}</li>
            <li>{{ $t('services.projectManagement.features.1') }}</li>
            <li>{{ $t('services.projectManagement.features.2') }}</li>
            <li>{{ $t('services.projectManagement.features.3') }}</li>
          </ul>
          <div class="service-cta">
            <NuxtLink to="#contacts" class="btn btn-outline">{{ $t('common.learnMore') }}</NuxtLink>
          </div>
        </div>
        
        <div class="service-card">
          <div class="service-icon">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="12" cy="12" r="10"/>
              <path d="M12 6v6l4 2"/>
            </svg>
          </div>
          <h3>Consulting Services</h3>
          <p>Expert consulting for construction planning, feasibility studies, and regulatory compliance.</p>
          <ul class="service-features">
            <li>Feasibility Studies</li>
            <li>Permit Assistance</li>
            <li>Cost Estimation</li>
            <li>Regulatory Compliance</li>
          </ul>
          <div class="service-cta">
            <NuxtLink to="#contacts" class="btn btn-outline">Learn More</NuxtLink>
          </div>
        </div>
        
        <div class="service-card">
          <div class="service-icon">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M12 2L2 7l10 5 10-5-10-5z"/>
              <path d="M2 17l10 5 10-5"/>
              <path d="M2 12l10 5 10-5"/>
            </svg>
          </div>
          <h3>Design & Engineering</h3>
          <p>Architectural design and engineering services from concept to construction documentation.</p>
          <ul class="service-features">
            <li>Architectural Design</li>
            <li>Structural Engineering</li>
            <li>3D Modeling & Visualization</li>
            <li>Construction Documentation</li>
          </ul>
          <div class="service-cta">
            <NuxtLink to="#contacts" class="btn btn-outline">Learn More</NuxtLink>
          </div>
        </div>
      </div>
      
      <div class="services-cta">
        <div class="cta-content">
          <h3>Need a Custom Solution?</h3>
          <p>We offer tailored construction management solutions to meet your unique project requirements.</p>
          <NuxtLink to="#contacts" class="btn btn-primary btn-large">
            Discuss Your Project
          </NuxtLink>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
// Services section specific logic can go here
</script>

<style scoped>
/* === LAYOUT & SECTIONS === */
.services-section {
  padding: 6rem 0;
  background-color: white;
}

.section-header {
  text-align: center;
  margin: 0 auto 4rem auto;
  max-width: 600px;
}

.services-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 2rem;
  margin-bottom: 4rem;
}

/* === TYPOGRAPHY === */
.section-title {
  font-size: 2.5rem;
  font-weight: 700;
  color: #1f2937;
  margin-bottom: 1rem;
}

.section-subtitle {
  font-size: 1.125rem;
  color: #6b7280;
  line-height: 1.6;
}

.service-card h3 {
  font-size: 1.25rem;
  font-weight: 600;
  color: #1f2937;
  margin-bottom: 1rem;
}

.service-card > p {
  color: #6b7280;
  line-height: 1.6;
  margin-bottom: 1.5rem;
}

/* === SERVICE CARDS === */
.service-card {
  background: #f9fafb;
  border: 1px solid #e5e7eb;
  border-radius: 1rem;
  padding: 2rem;
  transition: all 0.3s ease;
  position: relative;
  display: flex;
  flex-direction: column;
}

.service-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.15);
  border-color: #fbbf24;
}

.service-card.featured {
  border-color: #fbbf24;
  background: linear-gradient(135deg, #f3f4f6 0%, #e5e7eb 100%);
}

/* === SERVICE ELEMENTS === */
.featured-badge {
  position: absolute;
  top: -0.5rem;
  right: 1rem;
  background: #fbbf24;
  color: #1a1a1a;
  padding: 0.25rem 0.75rem;
  border-radius: 1rem;
  font-size: 0.75rem;
  font-weight: 600;
}

.service-icon {
  width: 4rem;
  height: 4rem;
  background: transparent;
  border: 2px solid #fbbf24;
  border-radius: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1.5rem;
}

.service-icon svg {
  width: 2rem;
  height: 2rem;
  color: #fbbf24;
}

.service-features {
  list-style: none;
  padding: 0;
  margin: 0 0 2rem 0;
  flex-grow: 1;
}

.service-features li {
  padding: 0.5rem 0 0.5rem 1.5rem;
  color: #374151;
  position: relative;
}

.service-features li::before {
  content: '✓';
  position: absolute;
  left: 0;
  color: #10b981;
  font-weight: 600;
}

.service-cta {
  margin-top: auto;
}

/* === BUTTONS === */
.btn {
  padding: 0.75rem 0.75rem;
  border-radius: 0.5rem;
  font-weight: 600;
  text-decoration: none;
  transition: all 0.3s ease;
  border: 2px solid transparent;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  width: calc(100% - 1.5rem);
}

.btn-primary {
  background-color: transparent;
  color: #fbbf24;
  border: 2px solid #fbbf24;
  border-color: #fbbf24;
}

.btn-outline {
  background-color: transparent;
  color: #fbbf24;
  border-color: #fbbf24;
}

.btn-large {
  padding: 1rem 2rem;
  font-size: 1.125rem;
}

/* === BUTTON HOVER STATES === */
.btn-primary:hover,
.btn-outline:hover {
  transform: translateY(-2px);
}

.btn-primary:hover {
  background-color: #fbbf24;
  color: #1a1a1a;
}

.btn-outline:hover {
  background-color: #fbbf24;
  color: #1a1a1a;
}

/* === CTA SECTION === */
.services-cta {
  background: linear-gradient(135deg, #1a1a1a 0%, #000000 100%);
  border-radius: 1rem;
  padding: 3rem;
  text-align: center;
  color: white;
}

.cta-content h3 {
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 1rem;
}

.cta-content p {
  font-size: 1.125rem;
  opacity: 0.9;
  margin: 0 auto 2rem auto;
  max-width: 500px;
}

.services-cta .btn-primary {
  background-color: white;
  color: #667eea;
  border-color: white;
  width: auto;
}

.services-cta .btn-primary:hover {
  background-color: #f3f4f6;
  transform: translateY(-2px);
}

/* === RESPONSIVE DESIGN === */
@media (max-width: 768px) {
  .services-section {
    padding: 4rem 0;
  }
  
  .section-title {
    font-size: 2rem;
  }
  
  .services-grid {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
  
  .service-card {
    padding: 1.5rem;
  }
  
  .services-cta {
    padding: 2rem;
  }
  
  .cta-content h3 {
    font-size: 1.5rem;
  }
  
  .cta-content p {
    font-size: 1rem;
  }
}

@media (max-width: 480px) {
  .service-card {
    padding: 1.25rem;
  }
  
  .service-icon {
    width: 3rem;
    height: 3rem;
  }
  
  .service-icon svg {
    width: 1.5rem;
    height: 1.5rem;
  }
  
  .services-cta {
    padding: 1.5rem;
  }
}
</style>