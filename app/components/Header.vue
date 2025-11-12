<template>
  <header class="header">
    <nav class="navbar">
      <div class="container">
        <div class="nav-content">
          <!-- Logo -->
          <div class="logo">
            <NuxtLink to="/" class="logo-link">
              <h1>Construction</h1>
            </NuxtLink>
          </div>
          
          <!-- Desktop Navigation -->
          <ul class="nav-menu" :class="{ 'nav-menu-open': isMenuOpen }">
            <li><NuxtLink to="#hero" @click="closeMenu">{{ $t('nav.home') }}</NuxtLink></li>
            <li><NuxtLink to="#about" @click="closeMenu">{{ $t('nav.about') }}</NuxtLink></li>
            <li><NuxtLink to="#services" @click="closeMenu">{{ $t('nav.services') }}</NuxtLink></li>
            <li><NuxtLink to="#contacts" @click="closeMenu">{{ $t('nav.contact') }}</NuxtLink></li>
          </ul>
          <!-- Language Switcher & Auth Buttons -->
          <div class="nav-actions">
            <LanguageSwitcher />
            <div class="auth-buttons" :class="{ 'auth-buttons-open': isMenuOpen }">
              <NuxtLink to="/login" class="btn btn-outline" @click="closeMenu">{{ $t('nav.login') }}</NuxtLink>
              <NuxtLink to="/register" class="btn btn-primary" @click="closeMenu">{{ $t('nav.getStarted') }}</NuxtLink>
            </div>
          </div>

          <!-- Mobile Menu Toggle -->
          <button 
            class="mobile-menu-toggle"
            @click="toggleMenu"
            :aria-expanded="isMenuOpen"
            aria-label="Toggle navigation menu"
          >
            <span class="hamburger-line" :class="{ 'hamburger-line-active': isMenuOpen }"></span>
            <span class="hamburger-line" :class="{ 'hamburger-line-active': isMenuOpen }"></span>
            <span class="hamburger-line" :class="{ 'hamburger-line-active': isMenuOpen }"></span>
          </button>
        </div>
      </div>
    </nav>
  </header>
</template>

<script setup lang="ts">
const isMenuOpen = ref(false)

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value
}

const closeMenu = () => {
  isMenuOpen.value = false
}

// Close menu when clicking outside
onMounted(() => {
  document.addEventListener('click', (e) => {
    const target = e.target as HTMLElement
    if (!target.closest('.navbar')) {
      closeMenu()
    }
  })
})
</script>

<style scoped>
.header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
}

.navbar {
  padding: 1rem 0;
}

.nav-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.logo {
  flex-shrink: 0;
}

.logo-link {
  text-decoration: none;
  color: inherit;
}

.logo h1 {
  font-size: 1.5rem;
  font-weight: 700;
  color: #3b82f6;
  margin: 0;
}

.nav-menu {
  display: flex;
  list-style: none;
  gap: 2rem;
  margin: 0;
  padding: 0;
}

.nav-menu li a {
  text-decoration: none;
  color: #374151;
  font-weight: 500;
  transition: color 0.2s ease;
  padding: 0.5rem 0;
}

.nav-menu li a:hover {
  color: #3b82f6;
}

.auth-buttons {
  display: flex;
  gap: 1rem;
  align-items: center;
}

.nav-actions {
  display: flex;
  gap: 1.5rem;
  align-items: center;
}

.btn {
  padding: 0.5rem 1rem;
  border-radius: 0.375rem;
  font-weight: 500;
  text-decoration: none;
  transition: all 0.2s ease;
  border: 1px solid transparent;
}

.btn-outline {
  color: #3b82f6;
  border-color: #3b82f6;
}

.btn-outline:hover {
  background-color: #3b82f6;
  color: white;
}

.btn-primary {
  background-color: #3b82f6;
  color: white;
}

.btn-primary:hover {
  background-color: #2563eb;
}

.mobile-menu-toggle {
  display: none;
  flex-direction: column;
  justify-content: center;
  width: 2rem;
  height: 2rem;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
}

.hamburger-line {
  width: 100%;
  height: 2px;
  background-color: #374151;
  margin: 2px 0;
  transition: all 0.3s ease;
  transform-origin: center;
}

.hamburger-line-active:nth-child(1) {
  transform: rotate(45deg) translate(4px, 4px);
}

.hamburger-line-active:nth-child(2) {
  opacity: 0;
}

.hamburger-line-active:nth-child(3) {
  transform: rotate(-45deg) translate(4px, -4px);
}

/* Mobile Styles */
@media (max-width: 768px) {
  .mobile-menu-toggle {
    display: flex;
  }
  
  .nav-menu {
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    background: white;
    flex-direction: column;
    padding: 1rem;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
    transform: translateY(-100%);
    opacity: 0;
    visibility: hidden;
    transition: all 0.3s ease;
    gap: 0;
  }
  
  .nav-menu-open {
    transform: translateY(0);
    opacity: 1;
    visibility: visible;
  }
  
  .nav-menu li {
    padding: 0.75rem 0;
    border-bottom: 1px solid #f3f4f6;
  }
  
  .nav-menu li:last-child {
    border-bottom: none;
  }
  
  .auth-buttons {
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    background: white;
    padding: 1rem;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
    transform: translateY(-100%);
    opacity: 0;
    visibility: hidden;
    transition: all 0.3s ease;
    flex-direction: column;
    margin-top: 200px;
  }
  
  .auth-buttons-open {
    transform: translateY(0);
    opacity: 1;
    visibility: visible;
  }
  
  .btn {
    width: 100%;
    text-align: center;
    padding: 0.75rem 1rem;
  }
}

@media (max-width: 480px) {
  .logo h1 {
    font-size: 1.25rem;
  }
  
  .navbar {
    padding: 0.75rem 0;
  }
}
</style>