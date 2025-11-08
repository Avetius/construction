<template>
  <div class="register-page">
    <div class="register-container">
      <div class="register-card">
        <div class="logo-section">
          <h1>Construction</h1>
          <p>Create your account</p>
        </div>
        
        <form @submit.prevent="handleRegister" class="register-form">
          <div class="form-row">
            <div class="form-group">
              <label for="firstName">First Name</label>
              <input
                id="firstName"
                v-model="form.firstName"
                type="text"
                required
                class="form-input"
                placeholder="Enter your first name"
              >
            </div>
            
            <div class="form-group">
              <label for="lastName">Last Name</label>
              <input
                id="lastName"
                v-model="form.lastName"
                type="text"
                required
                class="form-input"
                placeholder="Enter your last name"
              >
            </div>
          </div>
          
          <div class="form-group">
            <label for="email">Email Address</label>
            <input
              id="email"
              v-model="form.email"
              type="email"
              required
              class="form-input"
              placeholder="Enter your email"
            >
          </div>
          
          <div class="form-group">
            <label for="company">Company Name</label>
            <input
              id="company"
              v-model="form.company"
              type="text"
              class="form-input"
              placeholder="Enter your company name (optional)"
            >
          </div>
          
          <div class="form-group">
            <label for="password">Password</label>
            <input
              id="password"
              v-model="form.password"
              type="password"
              required
              class="form-input"
              placeholder="Create a password"
            >
            <div class="password-requirements">
              <small>Password must be at least 8 characters long</small>
            </div>
          </div>
          
          <div class="form-group">
            <label for="confirmPassword">Confirm Password</label>
            <input
              id="confirmPassword"
              v-model="form.confirmPassword"
              type="password"
              required
              class="form-input"
              placeholder="Confirm your password"
            >
          </div>
          
          <div class="form-group">
            <label class="checkbox-label">
              <input v-model="form.agreeToTerms" type="checkbox" required>
              <span>
                I agree to the 
                <a href="/terms" target="_blank">Terms of Service</a> 
                and 
                <a href="/privacy" target="_blank">Privacy Policy</a>
              </span>
            </label>
          </div>
          
          <button type="submit" class="submit-btn" :disabled="isLoading || !isFormValid">
            <span v-if="isLoading">Creating account...</span>
            <span v-else>Create Account</span>
          </button>
          
          <div class="divider">
            <span>Already have an account?</span>
          </div>
          
          <NuxtLink to="/login" class="login-link">
            Sign in here
          </NuxtLink>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// Reactive form data
const form = reactive({
  firstName: '',
  lastName: '',
  email: '',
  company: '',
  password: '',
  confirmPassword: '',
  agreeToTerms: false
})

const isLoading = ref(false)

// Form validation
const isFormValid = computed(() => {
  return form.firstName.trim() &&
         form.lastName.trim() &&
         form.email.trim() &&
         form.password.length >= 8 &&
         form.password === form.confirmPassword &&
         form.agreeToTerms
})

// Handle registration submission
const handleRegister = async () => {
  if (!isFormValid.value) {
    return
  }
  
  isLoading.value = true
  
  try {
    // TODO: Implement actual registration logic
    console.log('Registration attempt:', {
      firstName: form.firstName,
      lastName: form.lastName,
      email: form.email,
      company: form.company || undefined
    })
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    // Redirect to login page with success message
    await navigateTo('/login?registered=true')
  } catch (error) {
    console.error('Registration error:', error)
    // TODO: Show error message to user
  } finally {
    isLoading.value = false
  }
}
</script>

<style scoped>
.register-page {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 1rem;
}

.register-container {
  width: 100%;
  max-width: 500px;
}

.register-card {
  background: white;
  border-radius: 1rem;
  padding: 2rem;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
}

.logo-section {
  text-align: center;
  margin-bottom: 2rem;
}

.logo-section h1 {
  font-size: 2rem;
  font-weight: bold;
  color: #1f2937;
  margin-bottom: 0.5rem;
}

.logo-section p {
  color: #6b7280;
  font-size: 0.875rem;
}

.register-form {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.form-group label {
  font-weight: 500;
  color: #374151;
  font-size: 0.875rem;
}

.form-input {
  padding: 0.75rem;
  border: 1px solid #d1d5db;
  border-radius: 0.5rem;
  font-size: 1rem;
  transition: border-color 0.2s ease;
}

.form-input:focus {
  outline: none;
  border-color: #3b82f6;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

.password-requirements {
  margin-top: 0.25rem;
}

.password-requirements small {
  color: #6b7280;
  font-size: 0.75rem;
}

.checkbox-label {
  display: flex;
  align-items: flex-start;
  gap: 0.5rem;
  font-size: 0.875rem;
  color: #374151;
  cursor: pointer;
  line-height: 1.4;
}

.checkbox-label input[type="checkbox"] {
  width: 1rem;
  height: 1rem;
  margin-top: 0.125rem;
  flex-shrink: 0;
}

.checkbox-label a {
  color: #3b82f6;
  text-decoration: none;
}

.checkbox-label a:hover {
  text-decoration: underline;
}

.submit-btn {
  width: 100%;
  background-color: #3b82f6;
  color: white;
  padding: 0.75rem;
  border: none;
  border-radius: 0.5rem;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.submit-btn:hover:not(:disabled) {
  background-color: #2563eb;
}

.submit-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.divider {
  text-align: center;
  position: relative;
  margin: 1rem 0;
}

.divider::before {
  content: '';
  position: absolute;
  top: 50%;
  left: 0;
  right: 0;
  height: 1px;
  background-color: #e5e7eb;
}

.divider span {
  background-color: white;
  padding: 0 1rem;
  color: #6b7280;
  font-size: 0.875rem;
}

.login-link {
  text-align: center;
  color: #3b82f6;
  text-decoration: none;
  font-weight: 500;
  padding: 0.75rem;
  border: 1px solid #3b82f6;
  border-radius: 0.5rem;
  transition: all 0.2s ease;
}

.login-link:hover {
  background-color: #3b82f6;
  color: white;
}

@media (max-width: 768px) {
  .register-card {
    padding: 1.5rem;
  }
  
  .form-row {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 480px) {
  .register-card {
    padding: 1rem;
  }
}
</style>