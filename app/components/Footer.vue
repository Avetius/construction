<template>
  <footer class="footer">
    <div class="container">
      <div class="footer-content">
        <!-- Company Info -->
        <div class="footer-section">
          <div class="footer-logo">
            <h3>{{ $t('footer.company') }}</h3>
            <p>{{ $t('footer.tagline') }}</p>
          </div>
          <div class="social-links">
            <a href="#" class="social-link" aria-label="Facebook">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
            </a>
            <a href="#" class="social-link" aria-label="Twitter">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
              </svg>
            </a>
            <a href="#" class="social-link" aria-label="LinkedIn">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
            </a>
            <a href="#" class="social-link" aria-label="Instagram">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 6.62 5.367 11.987 11.988 11.987s11.987-5.367 11.987-11.987C24.014 5.367 18.647.001 12.017.001zM8.449 16.988c-1.297 0-2.448-.49-3.323-1.297C4.198 14.553 3.5 13.108 3.5 11.5s.698-3.053 1.626-4.191C5.901 6.511 7.052 6.021 8.449 6.021c1.397 0 2.548.49 3.424 1.288.928 1.138 1.626 2.583 1.626 4.191s-.698 3.053-1.626 4.191c-.876.807-2.027 1.297-3.424 1.297zm7.535 0c-1.297 0-2.448-.49-3.323-1.297-.928-1.138-1.626-2.583-1.626-4.191s.698-3.053 1.626-4.191c.875-.797 2.026-1.288 3.323-1.288 1.397 0 2.548.49 3.424 1.288.928 1.138 1.626 2.583 1.626 4.191s-.698 3.053-1.626 4.191c-.876.807-2.027 1.297-3.424 1.297z"/>
              </svg>
            </a>
          </div>
        </div>
        
        <!-- Quick Links -->
        <div class="footer-section">
          <h4>{{ $t('footer.quickLinks') }}</h4>
          <ul class="footer-links">
            <li><NuxtLink to="#hero">{{ $t('nav.home') }}</NuxtLink></li>
            <li><NuxtLink to="#about">{{ $t('nav.about') }}</NuxtLink></li>
            <li><NuxtLink to="#services">{{ $t('nav.services') }}</NuxtLink></li>
            <li><NuxtLink to="#contacts">{{ $t('nav.contact') }}</NuxtLink></li>
          </ul>
        </div>
        
        <!-- Services -->
        <div class="footer-section">
          <h4>{{ $t('footer.services') }}</h4>
          <ul class="footer-links">
            <li><a href="#services">{{ $t('services.residential.title') }}</a></li>
            <li><a href="#services">{{ $t('services.commercial.title') }}</a></li>
            <li><a href="#services">{{ $t('services.renovation.title') }}</a></li>
            <li><a href="#services">{{ $t('services.projectManagement.title') }}</a></li>
            <li><a href="#services">{{ $t('footer.consulting') }}</a></li>
            <li><a href="#services">{{ $t('footer.design') }}</a></li>
          </ul>
        </div>
        
        <!-- Contact Info -->
        <div class="footer-section">
          <h4>{{ $t('footer.contactInfo') }}</h4>
          <div class="contact-info">
            <div class="contact-item">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                <circle cx="12" cy="10" r="3"/>
              </svg>
              <span>{{ $t('contact.info.address.street') }}<br>{{ $t('contact.info.address.city') }}</span>
            </div>
            <div class="contact-item">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
              </svg>
              <span>{{ $t('contact.info.phone.number') }}</span>
            </div>
            <div class="contact-item">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                <polyline points="22,6 12,13 2,6"/>
              </svg>
              <span>{{ $t('contact.info.email.address') }}</span>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Newsletter Signup -->
      <div class="newsletter-section">
        <div class="newsletter-content">
          <h4>{{ $t('footer.newsletter.title') }}</h4>
          <p>{{ $t('footer.newsletter.description') }}</p>
        </div>
        <form @submit.prevent="handleNewsletterSubmit" class="newsletter-form">
          <input
            v-model="newsletterEmail"
            type="email"
            :placeholder="$t('footer.newsletter.placeholder')"
            class="newsletter-input"
            required
          >
          <button type="submit" class="newsletter-btn" :disabled="isNewsletterSubmitting">
            <span v-if="isNewsletterSubmitting">{{ $t('footer.newsletter.subscribing') }}</span>
            <span v-else>{{ $t('footer.newsletter.subscribe') }}</span>
          </button>
        </form>
      </div>
      
      <!-- Footer Bottom -->
      <div class="footer-bottom">
        <div class="footer-bottom-content">
          <p>{{ $t('footer.copyright') }}</p>
          <div class="footer-legal">
            <a href="/privacy">{{ $t('footer.privacy') }}</a>
            <a href="/terms">{{ $t('footer.terms') }}</a>
            <a href="/cookies">{{ $t('footer.cookies') }}</a>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
const newsletterEmail = ref('')
const isNewsletterSubmitting = ref(false)
// const { t } = useI18n();

const handleNewsletterSubmit = async () => {
  isNewsletterSubmitting.value = true
  
  try {
    // TODO: Implement actual newsletter subscription logic
    console.log('Newsletter subscription:', newsletterEmail.value)
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    // Reset form
    newsletterEmail.value = ''
    
    // TODO: Show success message
    alert('Thank you for subscribing to our newsletter!')
  } catch (error) {
    console.error('Newsletter subscription error:', error)
    // TODO: Show error message
    alert('Sorry, there was an error subscribing to our newsletter. Please try again.')
  } finally {
    isNewsletterSubmitting.value = false
  }
}
</script>

<style scoped>
.footer {
  background-color: #1a1a1a;
  color: white;
  padding: 3rem 0 0 0;
}

.footer-content {
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1.5fr;
  gap: 3rem;
  margin-bottom: 3rem;
}

.footer-section h3,
.footer-section h4 {
  font-size: 1.125rem;
  font-weight: 600;
  margin-bottom: 1.5rem;
  color: white;
}

.footer-logo h3 {
  font-size: 1.5rem;
  font-weight: 700;
  color: #fbbf24;
  margin-bottom: 1rem;
}

.footer-logo p {
  color: #d1d5db;
  line-height: 1.6;
  margin-bottom: 2rem;
}

.social-links {
  display: flex;
  gap: 1rem;
}

.social-link {
  width: 2.5rem;
  height: 2.5rem;
  background-color: transparent;
  border: 2px solid #374151;
  border-radius: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #d1d5db;
  transition: all 0.3s ease;
}

.social-link:hover {
  background-color: transparent;
  border-color: #fbbf24;
  color: #fbbf24;
  transform: translateY(-2px);
}

.social-link svg {
  width: 1.25rem;
  height: 1.25rem;
}

.footer-links {
  list-style: none;
  padding: 0;
  margin: 0;
}

.footer-links li {
  margin-bottom: 0.75rem;
}

.footer-links a {
  color: #d1d5db;
  text-decoration: none;
  transition: color 0.3s ease;
  line-height: 1.5;
}

.footer-links a:hover {
  color: #fbbf24;
}

.contact-info {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.contact-item {
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
}

.contact-item svg {
  width: 1.25rem;
  height: 1.25rem;
  color: #fbbf24;
  margin-top: 0.125rem;
  flex-shrink: 0;
}

.contact-item span {
  color: #d1d5db;
  line-height: 1.5;
}

.newsletter-section {
  background-color: #374151;
  border-radius: 1rem;
  padding: 2rem;
  margin-bottom: 3rem;
  display: flex;
  align-items: center;
  gap: 3rem;
}

.newsletter-content {
  flex: 1;
}

.newsletter-content h4 {
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
}

.newsletter-content p {
  color: #d1d5db;
  margin: 0;
}

.newsletter-form {
  display: flex;
  gap: 1rem;
  flex: 1;
  max-width: 400px;
}

.newsletter-input {
  flex: 1;
  padding: 0.75rem;
  border: 1px solid #4b5563;
  border-radius: 0.5rem;
  background-color: #1f2937;
  color: white;
  font-size: 1rem;
}

.newsletter-input:focus {
  outline: none;
  border-color: #fbbf24;
  box-shadow: 0 0 0 3px rgba(251, 191, 36, 0.1);
}

.newsletter-input::placeholder {
  color: #9ca3af;
}

.newsletter-btn {
  background-color: #fbbf24;
  color: #1a1a1a;
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 0.5rem;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.3s ease;
  white-space: nowrap;
}

.newsletter-btn:hover:not(:disabled) {
  background-color: #f59e0b;
}

.newsletter-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.footer-bottom {
  border-top: 1px solid #374151;
  padding: 2rem 0;
}

.footer-bottom-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.footer-bottom p {
  color: #9ca3af;
  margin: 0;
}

.footer-legal {
  display: flex;
  gap: 2rem;
}

.footer-legal a {
  color: #9ca3af;
  text-decoration: none;
  font-size: 0.875rem;
  transition: color 0.3s ease;
}

.footer-legal a:hover {
  color: #d1d5db;
}

/* Responsive Design */
@media (max-width: 1024px) {
  .footer-content {
    grid-template-columns: 1fr 1fr;
    gap: 2rem;
  }
  
  .newsletter-section {
    flex-direction: column;
    gap: 1.5rem;
    text-align: center;
  }
  
  .newsletter-form {
    max-width: 100%;
  }
}

@media (max-width: 768px) {
  .footer {
    padding: 2rem 0 0 0;
  }
  
  .footer-content {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
  
  .newsletter-section {
    padding: 1.5rem;
  }
  
  .newsletter-form {
    flex-direction: column;
  }
  
  .footer-bottom-content {
    flex-direction: column;
    gap: 1rem;
    text-align: center;
  }
  
  .footer-legal {
    gap: 1rem;
  }
}

@media (max-width: 480px) {
  .social-links {
    justify-content: center;
  }
  
  .newsletter-section {
    padding: 1rem;
  }
  
  .footer-legal {
    flex-direction: column;
    gap: 0.5rem;
  }
}
</style>