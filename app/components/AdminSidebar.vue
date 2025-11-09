<template>
  <aside class="admin-sidebar" :class="{ 'sidebar-collapsed': !isOpen }">
    <div class="sidebar-content">
      <!-- Logo -->
      <div class="sidebar-logo">
        <NuxtLink to="/admin" class="logo-link">
          <div class="logo-icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M3 21h18"/>
              <path d="M5 21V7l8-4v18"/>
              <path d="M19 21V11l-6-4"/>
            </svg>
          </div>
          <span v-show="isOpen" class="logo-text">Construction</span>
        </NuxtLink>
      </div>
      
      <!-- Main Navigation -->
      <nav class="sidebar-nav">
        <div class="nav-section">
          <h3 v-show="isOpen" class="nav-section-title">Overview</h3>
          
          <NuxtLink 
            to="/admin?view=dashboard" 
            class="nav-item"
            :class="{ active: currentView === 'dashboard' }"
            @click="handleNavigation('dashboard')"
          >
            <div class="nav-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <rect x="3" y="3" width="7" height="7"/>
                <rect x="14" y="3" width="7" height="7"/>
                <rect x="14" y="14" width="7" height="7"/>
                <rect x="3" y="14" width="7" height="7"/>
              </svg>
            </div>
            <span v-show="isOpen" class="nav-text">Dashboard</span>
          </NuxtLink>
          
          <NuxtLink 
            to="/admin?view=projects" 
            class="nav-item"
            :class="{ active: currentView === 'projects' }"
            @click="handleNavigation('projects')"
          >
            <div class="nav-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M3 21h18"/>
                <path d="M5 21V7l8-4v18"/>
                <path d="M19 21V11l-6-4"/>
              </svg>
            </div>
            <span v-show="isOpen" class="nav-text">Projects</span>
            <span v-show="isOpen" class="nav-badge">12</span>
          </NuxtLink>
        </div>
        
        <div class="nav-section">
          <h3 v-show="isOpen" class="nav-section-title">Management</h3>
          
          <NuxtLink 
            to="/admin?view=clients" 
            class="nav-item"
            :class="{ active: currentView === 'clients' }"
            @click="handleNavigation('clients')"
          >
            <div class="nav-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/>
                <circle cx="9" cy="7" r="4"/>
                <path d="M22 21v-2a4 4 0 0 0-3-3.87"/>
                <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
              </svg>
            </div>
            <span v-show="isOpen" class="nav-text">Clients</span>
            <span v-show="isOpen" class="nav-badge">8</span>
          </NuxtLink>
          
          <NuxtLink 
            to="/admin/content" 
            class="nav-item"
            :class="{ active: currentView === 'content' }"
            @click="handleNavigation('content')"
          >
            <div class="nav-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                <polyline points="14,2 14,8 20,8"/>
                <line x1="16" y1="13" x2="8" y2="13"/>
                <line x1="16" y1="17" x2="8" y2="17"/>
                <polyline points="10,9 9,9 8,9"/>
              </svg>
            </div>
            <span v-show="isOpen" class="nav-text">Content</span>
            <span v-show="isOpen" class="nav-badge">24</span>
          </NuxtLink>
          
          <NuxtLink 
            to="/admin?view=team" 
            class="nav-item"
            :class="{ active: currentView === 'team' }"
            @click="handleNavigation('team')"
          >
            <div class="nav-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                <circle cx="9" cy="7" r="4"/>
                <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
                <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
              </svg>
            </div>
            <span v-show="isOpen" class="nav-text">Team</span>
            <span v-show="isOpen" class="nav-badge">24</span>
          </NuxtLink>
          
          <NuxtLink 
            to="/admin/media" 
            class="nav-item"
            :class="{ active: currentView === 'media' }"
            @click="handleNavigation('media')"
          >
            <div class="nav-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
                <circle cx="9" cy="9" r="2"/>
                <path d="M21 15l-3.086-3.086a2 2 0 0 0-2.828 0L6 21"/>
              </svg>
            </div>
            <span v-show="isOpen" class="nav-text">Media</span>
            <span v-show="isOpen" class="nav-badge">142</span>
          </NuxtLink>
        </div>
        
        <div class="nav-section">
          <h3 v-show="isOpen" class="nav-section-title">Analytics</h3>
          
          <NuxtLink 
            to="/admin?view=reports" 
            class="nav-item"
            :class="{ active: currentView === 'reports' }"
            @click="handleNavigation('reports')"
          >
            <div class="nav-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M3 3v18h18"/>
                <path d="M18.7 8l-5.1 5.2-2.8-2.7L7 14.3"/>
              </svg>
            </div>
            <span v-show="isOpen" class="nav-text">Reports</span>
          </NuxtLink>
        </div>
        
        <div class="nav-section">
          <h3 v-show="isOpen" class="nav-section-title">Tools</h3>
          
          <button class="nav-item" @click="handleQuickAction('calendar')">
            <div class="nav-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
                <line x1="16" y1="2" x2="16" y2="6"/>
                <line x1="8" y1="2" x2="8" y2="6"/>
                <line x1="3" y1="10" x2="21" y2="10"/>
              </svg>
            </div>
            <span v-show="isOpen" class="nav-text">Calendar</span>
          </button>
          
          <button class="nav-item" @click="handleQuickAction('documents')">
            <div class="nav-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                <polyline points="14,2 14,8 20,8"/>
                <line x1="16" y1="13" x2="8" y2="13"/>
                <line x1="16" y1="17" x2="8" y2="17"/>
                <polyline points="10,9 9,9 8,9"/>
              </svg>
            </div>
            <span v-show="isOpen" class="nav-text">Documents</span>
          </button>
          
          <button class="nav-item" @click="handleQuickAction('messages')">
            <div class="nav-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
              </svg>
            </div>
            <span v-show="isOpen" class="nav-text">Messages</span>
            <span v-show="isOpen" class="nav-badge warning">3</span>
          </button>
        </div>
        
        <div class="nav-section">
          <h3 v-show="isOpen" class="nav-section-title">System</h3>
          
          <NuxtLink 
            to="/admin?view=settings" 
            class="nav-item"
            :class="{ active: currentView === 'settings' }"
            @click="handleNavigation('settings')"
          >
            <div class="nav-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="12" cy="12" r="3"/>
                <path d="M12 1v6m0 6v6m11-7h-6m-6 0H1"/>
              </svg>
            </div>
            <span v-show="isOpen" class="nav-text">Settings</span>
          </NuxtLink>
          
          <button class="nav-item" @click="handleLogout">
            <div class="nav-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
                <polyline points="16,17 21,12 16,7"/>
                <line x1="21" y1="12" x2="9" y2="12"/>
              </svg>
            </div>
            <span v-show="isOpen" class="nav-text">Sign Out</span>
          </button>
        </div>
      </nav>
      
      <!-- Sidebar Footer -->
      <div v-show="isOpen" class="sidebar-footer">
        <div class="footer-content">
          <div class="storage-info">
            <h4>Storage Used</h4>
            <div class="storage-bar">
              <div class="storage-fill" :style="{ width: storagePercentage + '%' }"></div>
            </div>
            <p class="storage-text">{{ storageUsed }} GB of {{ storageTotal }} GB</p>
          </div>
          <button class="upgrade-btn">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <polyline points="23,4 23,10 17,10"/>
              <path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"/>
            </svg>
            Upgrade Plan
          </button>
        </div>
      </div>
      
      <!-- Collapse Toggle -->
      <button 
        class="sidebar-toggle"
        @click="$emit('toggle')"
        :title="isOpen ? 'Collapse sidebar' : 'Expand sidebar'"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <polyline :points="isOpen ? '15,18 9,12 15,6' : '9,18 15,12 9,6'"/>
        </svg>
      </button>
    </div>
  </aside>
</template>

<script setup lang="ts">
// Props
const props = defineProps<{
  isOpen: boolean
  currentView?: string
}>()

// Emits
const emit = defineEmits<{
  toggle: []
  navigate: [view: string]
}>()

// Storage data
const storageUsed = ref(8.5)
const storageTotal = ref(15)
const storagePercentage = computed(() => (storageUsed.value / storageTotal.value) * 100)

// Methods
const handleNavigation = (view: string) => {
  emit('navigate', view)
}

const handleQuickAction = (action: string) => {
  // TODO: Implement quick actions
  console.log('Quick action:', action)
}

const handleLogout = async () => {
  // TODO: Implement logout logic
  console.log('Logging out...')
  await navigateTo('/login')
}
</script>

<style scoped>
.admin-sidebar {
  position: fixed;
  top: 0;
  left: 0;
  width: 280px;
  height: 100vh;
  background: linear-gradient(180deg, #1e293b 0%, #0f172a 100%);
  border-right: 1px solid #334155;
  transition: width 0.3s ease;
  z-index: 900;
  overflow: hidden;
}

.admin-sidebar.sidebar-collapsed {
  width: 80px;
}

.sidebar-content {
  display: flex;
  flex-direction: column;
  height: 100%;
  position: relative;
}

.sidebar-logo {
  padding: 1.5rem 1.5rem 1rem 1.5rem;
  border-bottom: 1px solid #334155;
}

.logo-link {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  text-decoration: none;
}

.logo-icon {
  width: 2.5rem;
  height: 2.5rem;
  background: linear-gradient(135deg, #3b82f6, #1d4ed8);
  border-radius: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  flex-shrink: 0;
}

.logo-text {
  font-size: 1.25rem;
  font-weight: 700;
  color: white;
  white-space: nowrap;
}

.sidebar-nav {
  flex: 1;
  padding: 1rem 0;
  overflow-y: auto;
  overflow-x: hidden;
}

.nav-section {
  margin-bottom: 2rem;
}

.nav-section-title {
  font-size: 0.75rem;
  font-weight: 600;
  color: #64748b;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin: 0 0 0.75rem 1.5rem;
  white-space: nowrap;
}

.nav-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem 1.5rem;
  color: #cbd5e1;
  text-decoration: none;
  transition: all 0.2s ease;
  border: none;
  background: none;
  cursor: pointer;
  width: 100%;
  font-size: 0.875rem;
  position: relative;
}

.nav-item:hover {
  background-color: rgba(59, 130, 246, 0.1);
  color: #3b82f6;
}

.nav-item.active {
  background-color: rgba(59, 130, 246, 0.15);
  color: #3b82f6;
  border-right: 3px solid #3b82f6;
}

.nav-icon {
  width: 1.25rem;
  height: 1.25rem;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
}

.nav-text {
  flex: 1;
  white-space: nowrap;
  text-align: left;
}

.nav-badge {
  background-color: #3b82f6;
  color: white;
  font-size: 0.75rem;
  font-weight: 600;
  padding: 0.125rem 0.5rem;
  border-radius: 0.75rem;
  min-width: 1.25rem;
  text-align: center;
}

.nav-badge.warning {
  background-color: #f59e0b;
}

.sidebar-footer {
  padding: 1.5rem;
  border-top: 1px solid #334155;
}

.footer-content {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.storage-info h4 {
  font-size: 0.875rem;
  font-weight: 600;
  color: #cbd5e1;
  margin: 0 0 0.5rem 0;
}

.storage-bar {
  width: 100%;
  height: 0.5rem;
  background-color: #334155;
  border-radius: 0.25rem;
  overflow: hidden;
  margin-bottom: 0.5rem;
}

.storage-fill {
  height: 100%;
  background: linear-gradient(90deg, #3b82f6, #1d4ed8);
  transition: width 0.3s ease;
}

.storage-text {
  font-size: 0.75rem;
  color: #64748b;
  margin: 0;
}

.upgrade-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  background: linear-gradient(135deg, #3b82f6, #1d4ed8);
  color: white;
  border: none;
  border-radius: 0.375rem;
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
}

.upgrade-btn:hover {
  transform: translateY(-1px);
  box-shadow: 0 4px 8px rgba(59, 130, 246, 0.3);
}

.sidebar-toggle {
  position: absolute;
  top: 50%;
  right: -0.75rem;
  transform: translateY(-50%);
  width: 1.5rem;
  height: 1.5rem;
  background: #1e293b;
  border: 1px solid #334155;
  border-radius: 50%;
  color: #cbd5e1;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
}

.sidebar-toggle:hover {
  background-color: #334155;
  color: white;
}

/* Responsive Design */
@media (max-width: 1024px) {
  .admin-sidebar {
    transform: translateX(-100%);
    z-index: 1100;
  }
  
  .admin-sidebar.sidebar-collapsed {
    transform: translateX(-100%);
  }
  
  .admin-sidebar.is-open {
    transform: translateX(0);
  }
}

/* Scrollbar Styling */
.sidebar-nav::-webkit-scrollbar {
  width: 0.25rem;
}

.sidebar-nav::-webkit-scrollbar-track {
  background: transparent;
}

.sidebar-nav::-webkit-scrollbar-thumb {
  background: #334155;
  border-radius: 0.125rem;
}

.sidebar-nav::-webkit-scrollbar-thumb:hover {
  background: #475569;
}
</style>