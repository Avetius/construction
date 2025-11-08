<template>
  <div class="change-password-page">
    <div class="change-password-container">
      <div class="change-password-card">
        <div class="logo-section">
          <h1>Construction</h1>
          <p v-if="isResetMode">Reset your password</p>
          <p v-else>Change your password</p>
        </div>
        
        <!-- Email form for password reset -->
        <form v-if="isResetMode && !resetEmailSent" @submit.prevent="handlePasswordReset" class="reset-form">
          <div class="form-group">
            <label for="email">Email Address</label>
            <input
              id="email"
              v-model="resetForm.email"
              type="email"
              required
              class="form-input"
              placeholder="Enter your email address"
            >
            <small class="help-text">
              We'll send you a link to reset your password
            </small>
          </div>
          
          <button type="submit" class="submit-btn" :disabled="isLoading">
            <span v-if="isLoading">Sending...</span>
            <span v-else>Send Reset Link</span>
          </button>
          
          <div class="back-to-login">
            <NuxtLink to="/login">Back to Login</NuxtLink>
          </div>
        </form>
        
        <!-- Success message after email sent -->
        <div v-else-if="isResetMode && resetEmailSent" class="success-message">
          <div class="success-icon">✓</div>
          <h3>Check your email</h3>
          <p>We've sent a password reset link to <strong>{{ resetForm.email }}</strong></p>
          <p class="help-text">
            Didn't receive the email? Check your spam folder or 
            <button @click="handlePasswordReset" class="link-button">try again</button>
          </p>
          <NuxtLink to="/login" class="back-link">Back to Login</NuxtLink>
        </div>
        
        <!-- Change password form (for authenticated users) -->
        <form v-else @submit.prevent="handlePasswordChange" class="change-form">
          <div class="form-group">
            <label for="currentPassword">Current Password</label>
            <input
              id="currentPassword"
              v-model="changeForm.currentPassword"
              type="password"
              required
              class="form-input"
              placeholder="Enter your current password"
            >
          </div>
          
          <div class="form-group">
            <label for="newPassword">New Password</label>
            <input
              id="newPassword"
              v-model="changeForm.newPassword"
              type="password"
              required
              class="form-input"
              placeholder="Enter your new password"
            >
            <div class="password-requirements">
              <small>Password must be at least 8 characters long</small>
            </div>
          </div>
          
          <div class="form-group">
            <label for="confirmNewPassword">Confirm New Password</label>
            <input
              id="confirmNewPassword"
              v-model="changeForm.confirmNewPassword"
              type="password"
              required
              class="form-input"
              placeholder="Confirm your new password"
            >
          </div>
          
          <div v-if="passwordMismatch" class="error-message">
            Passwords do not match
          </div>
          
          <button type="submit" class="submit-btn" :disabled="isLoading || passwordMismatch">
            <span v-if="isLoading">Changing password...</span>
            <span v-else>Change Password</span>
          </button>
          
          <div class="back-to-login">
            <NuxtLink to="/">Back to Dashboard</NuxtLink>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// Check if this is password reset mode (from forgot password link) or change mode
const route = useRoute()
const isResetMode = computed(() => route.query.reset === 'true' || !process.client)

// Reset form data
const resetForm = reactive({
  email: ''
})

// Change password form data
const changeForm = reactive({
  currentPassword: '',
  newPassword: '',
  confirmNewPassword: ''
})

const isLoading = ref(false)
const resetEmailSent = ref(false)

// Password validation
const passwordMismatch = computed(() => {
  return changeForm.newPassword && 
         changeForm.confirmNewPassword && 
         changeForm.newPassword !== changeForm.confirmNewPassword
})

// Handle password reset email
const handlePasswordReset = async () => {
  isLoading.value = true
  
  try {
    // TODO: Implement actual password reset logic
    console.log('Password reset request for:', resetForm.email)
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    resetEmailSent.value = true
  } catch (error) {
    console.error('Password reset error:', error)
    // TODO: Show error message to user
  } finally {
    isLoading.value = false
  }
}

// Handle password change
const handlePasswordChange = async () => {
  if (passwordMismatch.value || changeForm.newPassword.length < 8) {
    return
  }
  
  isLoading.value = true
  
  try {
    // TODO: Implement actual password change logic
    console.log('Password change request')
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    // Redirect to dashboard with success message
    await navigateTo('/?passwordChanged=true')
  } catch (error) {
    console.error('Password change error:', error)
    // TODO: Show error message to user
  } finally {
    isLoading.value = false
  }
}
</script>

<style scoped>
.change-password-page {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 1rem;
}

.change-password-container {
  width: 100%;
  max-width: 400px;
}

.change-password-card {
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

.reset-form,
.change-form {
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

.help-text {
  color: #6b7280;
  font-size: 0.75rem;
  margin-top: 0.25rem;
}

.password-requirements {
  margin-top: 0.25rem;
}

.password-requirements small {
  color: #6b7280;
  font-size: 0.75rem;
}

.error-message {
  color: #ef4444;
  font-size: 0.875rem;
  text-align: center;
  padding: 0.5rem;
  background-color: #fef2f2;
  border: 1px solid #fecaca;
  border-radius: 0.5rem;
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

.success-message {
  text-align: center;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.success-icon {
  width: 4rem;
  height: 4rem;
  background-color: #10b981;
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2rem;
  font-weight: bold;
  margin: 0 auto;
}

.success-message h3 {
  color: #1f2937;
  font-size: 1.5rem;
  margin: 0;
}

.success-message p {
  color: #6b7280;
  margin: 0;
}

.link-button {
  background: none;
  border: none;
  color: #3b82f6;
  text-decoration: underline;
  cursor: pointer;
  font-size: inherit;
}

.link-button:hover {
  color: #2563eb;
}

.back-to-login,
.back-link {
  text-align: center;
  margin-top: 1rem;
}

.back-to-login a,
.back-link {
  color: #3b82f6;
  text-decoration: none;
  font-size: 0.875rem;
}

.back-to-login a:hover,
.back-link:hover {
  text-decoration: underline;
}

@media (max-width: 480px) {
  .change-password-card {
    padding: 1.5rem;
  }
}
</style>