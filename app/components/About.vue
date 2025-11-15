<template>
  <section id="about" class="about-section">
    <div class="container">
      <div class="section-header">
        <h2 class="section-title">{{ $t('about.title') }}</h2>
        <p class="section-subtitle">
          {{ $t('about.subtitle') }}
        </p>
      </div>
      
      <div class="about-content">
        <div class="about-text">
          <div class="about-intro">
            <h3>{{ $t('about.whoWeAre.title') }}</h3>
            <p>
              {{ $t('about.whoWeAre.description') }}
            </p>
          </div>
          
          <div class="about-mission">
            <h3>{{ $t('about.mission.title') }}</h3>
            <p>
              {{ $t('about.mission.description') }}
            </p>
          </div>
          
          <div class="about-values">
            <h3>{{ $t('about.values.title') }}</h3>
            <ul class="values-list">
              <li>
                <strong>{{ $t('about.values.quality.title') }}:</strong> {{ $t('about.values.quality.description') }}
              </li>
              <li>
                <strong>{{ $t('about.values.innovation.title') }}:</strong> {{ $t('about.values.innovation.description') }}
              </li>
              <li>
                <strong>{{ $t('about.values.reliability.title') }}:</strong> {{ $t('about.values.reliability.description') }}
              </li>
              <li>
                <strong>{{ $t('about.values.safety.title') }}:</strong> {{ $t('about.values.safety.description') }}
              </li>
            </ul>
          </div>
        </div>
        
        <div class="about-features">
          <div class="feature-grid">
            <div class="feature-card">
              <div class="feature-icon">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M12 2L2 7l10 5 10-5-10-5z"/>
                  <path d="M2 17l10 5 10-5"/>
                  <path d="M2 12l10 5 10-5"/>
                </svg>
              </div>
              <h4>Project Management</h4>
              <p>Comprehensive project oversight from conception to completion with advanced tracking tools.</p>
            </div>
            
            <div class="feature-card">
              <div class="feature-icon">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                  <circle cx="9" cy="7" r="4"/>
                  <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
                  <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
                </svg>
              </div>
              <h4>Expert Team</h4>
              <p>Skilled professionals with decades of combined experience in construction management.</p>
            </div>
            
            <div class="feature-card">
              <div class="feature-icon">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M9 12l2 2 4-4"/>
                  <path d="M21 12c-1 0-3-1-3-3s2-3 3-3 3 1 3 3-2 3-3 3"/>
                  <path d="M3 12c1 0 3-1 3-3s-2-3-3-3-3 1-3 3 2 3 3 3"/>
                  <path d="M13 12h3"/>
                  <path d="M8 12H5"/>
                </svg>
              </div>
              <h4>Quality Assurance</h4>
              <p>Rigorous quality control processes ensuring every project meets the highest standards.</p>
            </div>
            
            <div class="feature-card">
              <div class="feature-icon">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/>
                </svg>
              </div>
              <h4>Fast Delivery</h4>
              <p>Efficient processes and resource management to complete projects on time, every time.</p>
            </div>
          </div>
        </div>
      </div>
      
      <div class="about-cta">
        <div class="cta-content">
          <h3>{{ $t('about.cta.title') }}</h3>
          <p>{{ $t('about.cta.description') }}</p>
          <div class="cta-actions">
            <NuxtLink to="#contacts" class="btn btn-primary">{{ $t('about.cta.contact') }}</NuxtLink>
            <NuxtLink to="#services" class="btn btn-outline">{{ $t('about.cta.services') }}</NuxtLink>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
// About section specific logic can go here
</script>

<style scoped>
.about-section {
  padding: 6rem 0;
  background-color: #f9fafb;
}

.section-header {
  text-align: center;
  margin-bottom: 4rem;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
}

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

.about-content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  margin-bottom: 4rem;
}

.about-text {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.about-text h3 {
  font-size: 1.5rem;
  font-weight: 600;
  color: #1f2937;
  margin-bottom: 1rem;
}

.about-text p {
  color: #374151;
  line-height: 1.7;
  margin-bottom: 0;
}

.values-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.values-list li {
  padding: 0.75rem 0;
  border-bottom: 1px solid #e5e7eb;
  color: #374151;
  line-height: 1.6;
}

.values-list li:last-child {
  border-bottom: none;
}

.values-list strong {
  color: #fbbf24;
  font-weight: 600;
}

.feature-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 2rem;
}

.feature-card {
  background: white;
  padding: 2rem;
  border-radius: 1rem;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.feature-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.15);
}

.feature-icon {
  width: 3rem;
  height: 3rem;
  background: transparent;
  border: 2px solid #fbbf24;
  border-radius: 0.75rem;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1.5rem;
}

.feature-icon svg {
  width: 1.5rem;
  height: 1.5rem;
  color: #fbbf24;
}

.feature-card h4 {
  font-size: 1.125rem;
  font-weight: 600;
  color: #1f2937;
  margin-bottom: 0.75rem;
}

.feature-card p {
  color: #6b7280;
  line-height: 1.6;
  margin: 0;
}

.about-cta {
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
  margin-bottom: 2rem;
}

.cta-actions {
  display: flex;
  gap: 1rem;
  justify-content: center;
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

.btn-primary {
  background-color: #fbbf24;
  color: #1a1a1a;
  border-color: #fbbf24;
}

.btn-primary:hover {
  background-color: #f59e0b;
  border-color: #f59e0b;
  transform: translateY(-2px);
}

.btn-outline {
  background-color: transparent;
  color: #fbbf24;
  border-color: #fbbf24;
}

.btn-outline:hover {
  background-color: #fbbf24;
  color: #1a1a1a;
  transform: translateY(-2px);
}

/* Responsive Design */
@media (max-width: 1024px) {
  .about-content {
    grid-template-columns: 1fr;
    gap: 3rem;
  }
  
  .feature-grid {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
}

@media (max-width: 768px) {
  .about-section {
    padding: 4rem 0;
  }
  
  .section-title {
    font-size: 2rem;
  }
  
  .section-subtitle {
    font-size: 1rem;
  }
  
  .about-cta {
    padding: 2rem;
  }
  
  .cta-content h3 {
    font-size: 1.5rem;
  }
  
  .cta-content p {
    font-size: 1rem;
  }
  
  .cta-actions {
    flex-direction: column;
    align-items: center;
  }
  
  .btn {
    width: 100%;
    max-width: 300px;
  }
}

@media (max-width: 480px) {
  .about-text {
    gap: 1.5rem;
  }
  
  .feature-card {
    padding: 1.5rem;
  }
  
  .about-cta {
    padding: 1.5rem;
  }
}
</style>