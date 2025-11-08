<template>
  <div class="login-page">
    <div class="login-container">
      <div class="login-card">
        <div class="logo-section">
          <h1>Construction</h1>
          <p>Sign in to your account</p>
        </div>
        
        <form @submit.prevent="handleLogin" class="login-form">
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
            <label for="password">Password</label>
            <input
              id="password"
              v-model="form.password"
              type="password"
              required
              class="form-input"
              placeholder="Enter your password"
            >
          </div>
          
          <div class="form-options">
            <label class="checkbox-label">
              <input v-model="form.rememberMe" type="checkbox">
              <span>Remember me</span>
            </label>
            <NuxtLink to="/changepassword" class="forgot-password">
              Forgot password?
            </NuxtLink>
          </div>
          
          <button type="submit" class="submit-btn" :disabled="isLoading">
            <span v-if="isLoading">Signing in...</span>
            <span v-else>Sign In</span>
          </button>
          
          <div class="divider">
            <span>Don't have an account?</span>
          </div>
          
          <NuxtLink to="/register" class="register-link">
            Create an account
          </NuxtLink>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// Reactive form data
const form = reactive({
  email: '',
  password: '',
  rememberMe: false
})

const isLoading = ref(false)

// Handle login submission
const handleLogin = async () => {
  isLoading.value = true
  
  try {
    // TODO: Implement actual login logic
    console.log('Login attempt:', { 
      email: form.email, 
      rememberMe: form.rememberMe 
    })
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    // Redirect to dashboard or home page
    await navigateTo('/')
  } catch (error) {
    console.error('Login error:', error)
    // TODO: Show error message to user
  } finally {
    isLoading.value = false
  }
}
</script>

<style scoped>
.login-page {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 1rem;
}

.login-container {
  width: 100%;
  max-width: 400px;
}

.login-card {
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

.login-form {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
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

.form-options {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.checkbox-label {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.875rem;
  color: #374151;
  cursor: pointer;
}

.checkbox-label input[type="checkbox"] {
  width: 1rem;
  height: 1rem;
}

.forgot-password {
  font-size: 0.875rem;
  color: #3b82f6;
  text-decoration: none;
}

.forgot-password:hover {
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

.register-link {
  text-align: center;
  color: #3b82f6;
  text-decoration: none;
  font-weight: 500;
  padding: 0.75rem;
  border: 1px solid #3b82f6;
  border-radius: 0.5rem;
  transition: all 0.2s ease;
}

.register-link:hover {
  background-color: #3b82f6;
  color: white;
}

@media (max-width: 480px) {
  .login-card {
    padding: 1.5rem;
  }
  
  .form-options {
    flex-direction: column;
    gap: 1rem;
    align-items: flex-start;
  }
}
</style>