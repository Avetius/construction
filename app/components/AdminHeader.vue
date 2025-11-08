<template>
  <header class="admin-header">
    <div class="header-content">
      <!-- Mobile Menu Toggle -->
      <button 
        class="mobile-menu-btn"
        @click="$emit('toggle-sidebar')"
        aria-label="Toggle sidebar"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M3 12h18M3 6h18M3 18h18"/>
        </svg>
      </button>
      
      <!-- Search Bar -->
      <div class="search-container">
        <div class="search-input-wrapper">
          <svg class="search-icon" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="11" cy="11" r="8"/>
            <path d="m21 21-4.35-4.35"/>
          </svg>
          <input 
            v-model="searchQuery"
            type="text" 
            placeholder="Search projects, clients, team members..."
            class="search-input"
            @keyup.enter="handleSearch"
          >
        </div>
      </div>
      
      <!-- Header Actions -->
      <div class="header-actions">
        <!-- Notifications -->
        <div class="notification-dropdown" ref="notificationRef">
          <button 
            class="notification-btn"
            @click="toggleNotifications"
            :class="{ 'has-notifications': unreadCount > 0 }"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/>
              <path d="M13.73 21a2 2 0 0 1-3.46 0"/>
            </svg>
            <span v-if="unreadCount > 0" class="notification-badge">{{ unreadCount }}</span>
          </button>
          
          <!-- Notifications Dropdown -->
          <div v-if="showNotifications" class="notifications-panel">
            <div class="notifications-header">
              <h3>Notifications</h3>
              <button @click="markAllAsRead" class="mark-read-btn">Mark all as read</button>
            </div>
            <div class="notifications-list">
              <div 
                v-for="notification in notifications" 
                :key="notification.id"
                class="notification-item"
                :class="{ 'unread': !notification.read }"
              >
                <div class="notification-icon" :class="notification.type">
                  <svg v-if="notification.type === 'project'" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M3 21h18"/>
                    <path d="M5 21V7l8-4v18"/>
                  </svg>
                  <svg v-else-if="notification.type === 'user'" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                    <circle cx="12" cy="7" r="4"/>
                  </svg>
                  <svg v-else xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                  </svg>
                </div>
                <div class="notification-content">
                  <p class="notification-title">{{ notification.title }}</p>
                  <p class="notification-message">{{ notification.message }}</p>
                  <span class="notification-time">{{ formatTime(notification.createdAt) }}</span>
                </div>
              </div>
            </div>
            <div class="notifications-footer">
              <NuxtLink to="/admin/notifications" class="view-all-btn">View all notifications</NuxtLink>
            </div>
          </div>
        </div>
        
        <!-- User Profile Dropdown -->
        <div class="user-dropdown" ref="userRef">
          <button class="user-btn" @click="toggleUserMenu">
            <img 
              :src="user.avatar || '/default-avatar.png'" 
              :alt="user.name"
              class="user-avatar"
            >
            <span class="user-name">{{ user.name }}</span>
            <svg class="dropdown-arrow" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M6 9l6 6 6-6"/>
            </svg>
          </button>
          
          <!-- User Menu Dropdown -->
          <div v-if="showUserMenu" class="user-menu">
            <div class="user-info">
              <img 
                :src="user.avatar || '/default-avatar.png'" 
                :alt="user.name"
                class="menu-avatar"
              >
              <div class="user-details">
                <p class="user-display-name">{{ user.name }}</p>
                <p class="user-role">{{ user.role }}</p>
              </div>
            </div>
            <div class="menu-divider"></div>
            <nav class="user-nav">
              <NuxtLink to="/admin/profile" class="menu-item">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                  <circle cx="12" cy="7" r="4"/>
                </svg>
                Profile Settings
              </NuxtLink>
              <NuxtLink to="/admin/preferences" class="menu-item">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <circle cx="12" cy="12" r="3"/>
                  <path d="M12 1v6m0 6v6m11-7h-6m-6 0H1"/>
                </svg>
                Preferences
              </NuxtLink>
              <button @click="handleLogout" class="menu-item logout">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
                  <polyline points="16,17 21,12 16,7"/>
                  <line x1="21" y1="12" x2="9" y2="12"/>
                </svg>
                Sign Out
              </button>
            </nav>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
// Props and emits
defineEmits(['toggle-sidebar'])

// Reactive data
const searchQuery = ref('')
const showNotifications = ref(false)
const showUserMenu = ref(false)
const notificationRef = ref(null)
const userRef = ref(null)

// Mock user data
const user = reactive({
  name: 'John Smith',
  role: 'Project Manager',
  avatar: '/avatars/john-smith.jpg'
})

// Mock notifications
const notifications = reactive([
  {
    id: 1,
    type: 'project',
    title: 'Project Update',
    message: 'Skyline Tower construction is 75% complete',
    createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
    read: false
  },
  {
    id: 2,
    type: 'user',
    title: 'New Team Member',
    message: 'Sarah Johnson joined the Riverside Mall project',
    createdAt: new Date(Date.now() - 4 * 60 * 60 * 1000), // 4 hours ago
    read: false
  },
  {
    id: 3,
    type: 'alert',
    title: 'Budget Alert',
    message: 'Downtown Office project is approaching budget limit',
    createdAt: new Date(Date.now() - 6 * 60 * 60 * 1000), // 6 hours ago
    read: true
  }
])

// Computed
const unreadCount = computed(() => {
  return notifications.filter(n => !n.read).length
})

// Methods
const toggleNotifications = () => {
  showNotifications.value = !showNotifications.value
  showUserMenu.value = false
}

const toggleUserMenu = () => {
  showUserMenu.value = !showUserMenu.value
  showNotifications.value = false
}

const handleSearch = () => {
  // TODO: Implement search functionality
  console.log('Searching for:', searchQuery.value)
}

const markAllAsRead = () => {
  notifications.forEach(n => n.read = true)
}

const formatTime = (date: Date) => {
  const now = new Date()
  const diff = now.getTime() - date.getTime()
  const hours = Math.floor(diff / (1000 * 60 * 60))
  
  if (hours < 1) {
    const minutes = Math.floor(diff / (1000 * 60))
    return `${minutes}m ago`
  } else if (hours < 24) {
    return `${hours}h ago`
  } else {
    const days = Math.floor(hours / 24)
    return `${days}d ago`
  }
}

const handleLogout = async () => {
  // TODO: Implement logout logic
  console.log('Logging out...')
  await navigateTo('/login')
}

// Close dropdowns when clicking outside
onMounted(() => {
  document.addEventListener('click', (e) => {
    if (!notificationRef.value?.contains(e.target)) {
      showNotifications.value = false
    }
    if (!userRef.value?.contains(e.target)) {
      showUserMenu.value = false
    }
  })
})
</script>

<style scoped>
.admin-header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  background: white;
  border-bottom: 1px solid #e2e8f0;
  height: 4rem;
}

.header-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 100%;
  padding: 0 2rem;
}

.mobile-menu-btn {
  display: none;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0.5rem;
  color: #4a5568;
  border-radius: 0.375rem;
}

.mobile-menu-btn:hover {
  background-color: #f7fafc;
}

.search-container {
  flex: 1;
  max-width: 400px;
  margin: 0 2rem;
}

.search-input-wrapper {
  position: relative;
}

.search-icon {
  position: absolute;
  left: 0.75rem;
  top: 50%;
  transform: translateY(-50%);
  color: #a0aec0;
}

.search-input {
  width: 100%;
  padding: 0.5rem 0.75rem 0.5rem 2.5rem;
  border: 1px solid #e2e8f0;
  border-radius: 0.5rem;
  font-size: 0.875rem;
  background-color: #f8fafc;
  transition: all 0.2s ease;
}

.search-input:focus {
  outline: none;
  border-color: #3b82f6;
  background-color: white;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

.header-actions {
  display: flex;
  align-items: center;
  gap: 1rem;
}

/* Notifications */
.notification-dropdown {
  position: relative;
}

.notification-btn {
  position: relative;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0.5rem;
  color: #4a5568;
  border-radius: 0.375rem;
  transition: background-color 0.2s ease;
}

.notification-btn:hover {
  background-color: #f7fafc;
}

.notification-btn.has-notifications {
  color: #3b82f6;
}

.notification-badge {
  position: absolute;
  top: 0.25rem;
  right: 0.25rem;
  background-color: #ef4444;
  color: white;
  font-size: 0.75rem;
  font-weight: 600;
  padding: 0.125rem 0.375rem;
  border-radius: 0.75rem;
  min-width: 1.25rem;
  text-align: center;
}

.notifications-panel {
  position: absolute;
  top: 100%;
  right: 0;
  margin-top: 0.5rem;
  width: 20rem;
  background: white;
  border-radius: 0.5rem;
  box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
  border: 1px solid #e2e8f0;
  z-index: 50;
}

.notifications-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem;
  border-bottom: 1px solid #e2e8f0;
}

.notifications-header h3 {
  font-size: 1rem;
  font-weight: 600;
  color: #1a202c;
  margin: 0;
}

.mark-read-btn {
  background: none;
  border: none;
  color: #3b82f6;
  font-size: 0.875rem;
  cursor: pointer;
}

.notifications-list {
  max-height: 20rem;
  overflow-y: auto;
}

.notification-item {
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
  padding: 1rem;
  border-bottom: 1px solid #f7fafc;
  transition: background-color 0.2s ease;
}

.notification-item:hover {
  background-color: #f8fafc;
}

.notification-item.unread {
  background-color: #eff6ff;
}

.notification-icon {
  width: 2rem;
  height: 2rem;
  border-radius: 0.375rem;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.notification-icon.project {
  background-color: #dbeafe;
  color: #3b82f6;
}

.notification-icon.user {
  background-color: #d1fae5;
  color: #10b981;
}

.notification-icon.alert {
  background-color: #fef3c7;
  color: #f59e0b;
}

.notification-content {
  flex: 1;
  min-width: 0;
}

.notification-title {
  font-weight: 500;
  color: #1a202c;
  margin: 0 0 0.25rem 0;
  font-size: 0.875rem;
}

.notification-message {
  color: #718096;
  margin: 0 0 0.5rem 0;
  font-size: 0.875rem;
  line-height: 1.4;
}

.notification-time {
  color: #a0aec0;
  font-size: 0.75rem;
}

.notifications-footer {
  padding: 0.75rem 1rem;
  border-top: 1px solid #e2e8f0;
}

.view-all-btn {
  display: block;
  text-align: center;
  color: #3b82f6;
  font-size: 0.875rem;
  font-weight: 500;
  text-decoration: none;
}

/* User Dropdown */
.user-dropdown {
  position: relative;
}

.user-btn {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0.5rem;
  border-radius: 0.5rem;
  transition: background-color 0.2s ease;
}

.user-btn:hover {
  background-color: #f7fafc;
}

.user-avatar {
  width: 2rem;
  height: 2rem;
  border-radius: 50%;
  object-fit: cover;
}

.user-name {
  font-weight: 500;
  color: #1a202c;
  font-size: 0.875rem;
}

.dropdown-arrow {
  color: #a0aec0;
  transition: transform 0.2s ease;
}

.user-menu {
  position: absolute;
  top: 100%;
  right: 0;
  margin-top: 0.5rem;
  width: 16rem;
  background: white;
  border-radius: 0.5rem;
  box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
  border: 1px solid #e2e8f0;
  z-index: 50;
}

.user-info {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 1rem;
}

.menu-avatar {
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 50%;
  object-fit: cover;
}

.user-details {
  flex: 1;
}

.user-display-name {
  font-weight: 500;
  color: #1a202c;
  margin: 0 0 0.25rem 0;
  font-size: 0.875rem;
}

.user-role {
  color: #718096;
  margin: 0;
  font-size: 0.75rem;
}

.menu-divider {
  height: 1px;
  background-color: #e2e8f0;
}

.user-nav {
  padding: 0.5rem 0;
}

.menu-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  width: 100%;
  padding: 0.75rem 1rem;
  color: #4a5568;
  text-decoration: none;
  font-size: 0.875rem;
  background: none;
  border: none;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.menu-item:hover {
  background-color: #f7fafc;
  color: #1a202c;
}

.menu-item.logout {
  color: #e53e3e;
}

.menu-item.logout:hover {
  background-color: #fed7d7;
}

/* Responsive Design */
@media (max-width: 768px) {
  .mobile-menu-btn {
    display: block;
  }
  
  .search-container {
    display: none;
  }
  
  .user-name {
    display: none;
  }
  
  .header-content {
    padding: 0 1rem;
  }
}
</style>