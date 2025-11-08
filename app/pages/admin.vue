<template>
  <div class="admin-page">
    <!-- Admin Header -->
    <AdminHeader />
    
    <!-- Admin Sidebar -->
    <AdminSidebar 
      :is-open="sidebarOpen" 
      @toggle="toggleSidebar"
      @navigate="handleNavigation"
    />
    
    <!-- Main Content Area -->
    <main class="admin-main" :class="{ 'sidebar-closed': !sidebarOpen }">
      <!-- Page Header -->
      <div class="page-header">
        <div class="page-title">
          <h1>{{ currentPageTitle }}</h1>
          <p class="page-subtitle">{{ currentPageSubtitle }}</p>
        </div>
        <div class="page-actions">
          <button class="btn btn-primary" @click="handleQuickAction">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M12 5v14m7-7H5"/>
            </svg>
            {{ quickActionLabel }}
          </button>
        </div>
      </div>
      
      <!-- Dashboard Overview -->
      <div v-if="currentView === 'dashboard'" class="dashboard-content">
        <AdminDashboard />
      </div>
      
      <!-- Projects Management -->
      <div v-else-if="currentView === 'projects'" class="projects-content">
        <AdminProjects />
      </div>
      
      <!-- Clients Management -->
      <div v-else-if="currentView === 'clients'" class="clients-content">
        <AdminClients />
      </div>
      
      <!-- Team Management -->
      <div v-else-if="currentView === 'team'" class="team-content">
        <div class="view-placeholder">
          <div class="placeholder-icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1">
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
              <circle cx="9" cy="7" r="4"/>
              <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
              <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
            </svg>
          </div>
          <h3>Team Management</h3>
          <p>Manage team members, roles, and permissions. Track performance and assign project responsibilities.</p>
          <button class="btn btn-primary" @click="handleQuickAction">Add Team Member</button>
        </div>
      </div>
      
      <!-- Reports -->
      <div v-else-if="currentView === 'reports'" class="reports-content">
        <div class="view-placeholder">
          <div class="placeholder-icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1">
              <path d="M3 3v18h18"/>
              <path d="M18.7 8l-5.1 5.2-2.8-2.7L7 14.3"/>
            </svg>
          </div>
          <h3>Reports & Analytics</h3>
          <p>Generate comprehensive reports on project progress, financial performance, and team productivity.</p>
          <button class="btn btn-primary" @click="handleQuickAction">Generate Report</button>
        </div>
      </div>
      
      <!-- Settings -->
      <div v-else-if="currentView === 'settings'" class="settings-content">
        <div class="view-placeholder">
          <div class="placeholder-icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1">
              <circle cx="12" cy="12" r="3"/>
              <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1 1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/>
            </svg>
          </div>
          <h3>System Settings</h3>
          <p>Configure system preferences, user permissions, notification settings, and integration options.</p>
          <button class="btn btn-primary" @click="handleQuickAction">Configure Settings</button>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
// Page meta
definePageMeta({
  title: 'Admin Dashboard - Construction Management',
  description: 'Administrative dashboard for construction project management',
  layout: 'admin'
})

// Reactive state
const sidebarOpen = ref(true)
const currentView = ref('dashboard')

// Computed properties
const currentPageTitle = computed(() => {
  const titles = {
    dashboard: 'Dashboard',
    projects: 'Projects',
    clients: 'Clients', 
    team: 'Team',
    reports: 'Reports',
    settings: 'Settings'
  }
  return titles[currentView.value] || 'Dashboard'
})

const currentPageSubtitle = computed(() => {
  const subtitles = {
    dashboard: 'Overview of your construction management system',
    projects: 'Manage and track all construction projects',
    clients: 'Client information and communication history',
    team: 'Team members and role management',
    reports: 'Analytics and performance reports',
    settings: 'System configuration and preferences'
  }
  return subtitles[currentView.value] || ''
})

const quickActionLabel = computed(() => {
  const labels = {
    dashboard: 'New Project',
    projects: 'Add Project',
    clients: 'Add Client',
    team: 'Add Member',
    reports: 'Generate Report',
    settings: 'Save Settings'
  }
  return labels[currentView.value] || 'Quick Action'
})

// Methods
const toggleSidebar = () => {
  sidebarOpen.value = !sidebarOpen.value
}

const handleNavigation = (view: string) => {
  currentView.value = view
}

const handleQuickAction = () => {
  // TODO: Implement quick actions based on current view
  console.log(`Quick action for ${currentView.value}`)
}

// Initialize view from route query
onMounted(() => {
  const route = useRoute()
  if (route.query.view && typeof route.query.view === 'string') {
    currentView.value = route.query.view
  }
})

// Watch for view changes and update URL
watch(currentView, (newView) => {
  const router = useRouter()
  router.push({ query: { view: newView } })
})
</script>

<style scoped>
.admin-page {
  display: flex;
  min-height: 100vh;
  background-color: #f8fafc;
}

.admin-main {
  flex: 1;
  margin-left: 280px;
  transition: margin-left 0.3s ease;
  padding: 2rem;
}

.admin-main.sidebar-closed {
  margin-left: 80px;
}

.page-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 2rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid #e2e8f0;
}

.page-title h1 {
  font-size: 2rem;
  font-weight: 700;
  color: #1a202c;
  margin-bottom: 0.25rem;
}

.page-subtitle {
  color: #718096;
  font-size: 1rem;
  margin: 0;
}

.page-actions {
  display: flex;
  gap: 1rem;
  align-items: center;
}

.btn {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  border-radius: 0.5rem;
  font-weight: 600;
  text-decoration: none;
  transition: all 0.2s ease;
  border: none;
  cursor: pointer;
}

.btn-primary {
  background-color: #3b82f6;
  color: white;
}

.btn-primary:hover {
  background-color: #2563eb;
  transform: translateY(-1px);
  box-shadow: 0 4px 6px -1px rgba(59, 130, 246, 0.3);
}

.btn svg {
  width: 1.25rem;
  height: 1.25rem;
}

/* Content areas */
.dashboard-content,
.projects-content,
.clients-content,
.team-content,
.reports-content,
.settings-content {
  animation: fadeIn 0.3s ease;
}

.view-placeholder {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 4rem 2rem;
  background: white;
  border-radius: 1rem;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
}

.placeholder-icon {
  color: #d1d5db;
  margin-bottom: 1.5rem;
}

.view-placeholder h3 {
  font-size: 1.5rem;
  font-weight: 600;
  color: #374151;
  margin: 0 0 0.75rem 0;
}

.view-placeholder p {
  color: #6b7280;
  margin: 0 0 2rem 0;
  max-width: 400px;
  line-height: 1.6;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Responsive Design */
@media (max-width: 1024px) {
  .admin-main {
    margin-left: 0;
    padding: 1rem;
  }
  
  .admin-main.sidebar-closed {
    margin-left: 0;
  }
  
  .page-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
  }
  
  .page-actions {
    width: 100%;
    justify-content: flex-end;
  }
}

@media (max-width: 768px) {
  .page-header {
    margin-bottom: 1rem;
  }
  
  .page-title h1 {
    font-size: 1.5rem;
  }
  
  .btn {
    padding: 0.5rem 1rem;
    font-size: 0.875rem;
  }
}
</style>