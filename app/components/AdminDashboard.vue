<template>
  <div class="admin-dashboard">
    <!-- Stats Cards -->
    <div class="stats-grid">
      <div class="stat-card">
        <div class="stat-icon projects">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M3 21h18"/>
            <path d="M5 21V7l8-4v18"/>
            <path d="M19 21V11l-6-4"/>
          </svg>
        </div>
        <div class="stat-content">
          <h3 class="stat-number">{{ stats.activeProjects }}</h3>
          <p class="stat-label">Active Projects</p>
          <div class="stat-change positive">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <polyline points="23,6 13.5,15.5 8.5,10.5 1,18"/>
              <polyline points="17,6 23,6 23,12"/>
            </svg>
            +12% from last month
          </div>
        </div>
      </div>
      
      <div class="stat-card">
        <div class="stat-icon clients">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/>
            <circle cx="9" cy="7" r="4"/>
            <path d="M22 21v-2a4 4 0 0 0-3-3.87"/>
            <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
          </svg>
        </div>
        <div class="stat-content">
          <h3 class="stat-number">{{ stats.totalClients }}</h3>
          <p class="stat-label">Total Clients</p>
          <div class="stat-change positive">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <polyline points="23,6 13.5,15.5 8.5,10.5 1,18"/>
              <polyline points="17,6 23,6 23,12"/>
            </svg>
            +8% from last month
          </div>
        </div>
      </div>
      
      <div class="stat-card">
        <div class="stat-icon revenue">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <line x1="12" y1="1" x2="12" y2="23"/>
            <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
          </svg>
        </div>
        <div class="stat-content">
          <h3 class="stat-number">${{ formatNumber(stats.monthlyRevenue) }}</h3>
          <p class="stat-label">Monthly Revenue</p>
          <div class="stat-change positive">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <polyline points="23,6 13.5,15.5 8.5,10.5 1,18"/>
              <polyline points="17,6 23,6 23,12"/>
            </svg>
            +18% from last month
          </div>
        </div>
      </div>
      
      <div class="stat-card">
        <div class="stat-icon team">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
            <circle cx="9" cy="7" r="4"/>
            <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
            <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
          </svg>
        </div>
        <div class="stat-content">
          <h3 class="stat-number">{{ stats.teamMembers }}</h3>
          <p class="stat-label">Team Members</p>
          <div class="stat-change neutral">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <line x1="5" y1="12" x2="19" y2="12"/>
            </svg>
            No change
          </div>
        </div>
      </div>
    </div>
    
    <!-- Charts and Recent Activity -->
    <div class="dashboard-grid">
      <!-- Project Progress Chart -->
      <div class="dashboard-card chart-card">
        <div class="card-header">
          <h3 class="card-title">Project Progress</h3>
          <div class="card-actions">
            <select v-model="chartPeriod" class="period-select">
              <option value="week">This Week</option>
              <option value="month">This Month</option>
              <option value="quarter">This Quarter</option>
            </select>
          </div>
        </div>
        <div class="chart-container">
          <!-- Simple progress visualization -->
          <div class="progress-chart">
            <div v-for="project in recentProjects" :key="project.id" class="progress-item">
              <div class="project-info">
                <span class="project-name">{{ project.name }}</span>
                <span class="project-progress">{{ project.progress }}%</span>
              </div>
              <div class="progress-bar">
                <div class="progress-fill" :style="{ width: project.progress + '%' }"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Recent Activity -->
      <div class="dashboard-card activity-card">
        <div class="card-header">
          <h3 class="card-title">Recent Activity</h3>
          <NuxtLink to="/admin/activity" class="view-all-link">View All</NuxtLink>
        </div>
        <div class="activity-list">
          <div v-for="activity in recentActivity" :key="activity.id" class="activity-item">
            <div class="activity-icon" :class="activity.type">
              <svg v-if="activity.type === 'project'" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M3 21h18"/>
                <path d="M5 21V7l8-4v18"/>
              </svg>
              <svg v-else-if="activity.type === 'user'" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                <circle cx="12" cy="7" r="4"/>
              </svg>
              <svg v-else xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                <polyline points="14,2 14,8 20,8"/>
              </svg>
            </div>
            <div class="activity-content">
              <p class="activity-text">{{ activity.description }}</p>
              <span class="activity-time">{{ formatTime(activity.timestamp) }}</span>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Upcoming Deadlines -->
      <div class="dashboard-card deadlines-card">
        <div class="card-header">
          <h3 class="card-title">Upcoming Deadlines</h3>
          <button class="add-deadline-btn" @click="openDeadlineModal">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M12 5v14m7-7H5"/>
            </svg>
          </button>
        </div>
        <div class="deadlines-list">
          <div v-for="deadline in upcomingDeadlines" :key="deadline.id" class="deadline-item">
            <div class="deadline-date" :class="deadline.urgency">
              <span class="date-day">{{ formatDay(deadline.date) }}</span>
              <span class="date-month">{{ formatMonth(deadline.date) }}</span>
            </div>
            <div class="deadline-content">
              <h4 class="deadline-title">{{ deadline.title }}</h4>
              <p class="deadline-project">{{ deadline.project }}</p>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Quick Actions -->
      <div class="dashboard-card actions-card">
        <div class="card-header">
          <h3 class="card-title">Quick Actions</h3>
        </div>
        <div class="actions-grid">
          <button class="action-btn" @click="quickAction('new-project')">
            <div class="action-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M12 5v14m7-7H5"/>
              </svg>
            </div>
            <span>New Project</span>
          </button>
          
          <button class="action-btn" @click="quickAction('add-client')">
            <div class="action-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/>
                <circle cx="9" cy="7" r="4"/>
                <path d="M22 21v-2a4 4 0 0 0-3-3.87"/>
                <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
              </svg>
            </div>
            <span>Add Client</span>
          </button>
          
          <button class="action-btn" @click="quickAction('generate-report')">
            <div class="action-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M3 3v18h18"/>
                <path d="M18.7 8l-5.1 5.2-2.8-2.7L7 14.3"/>
              </svg>
            </div>
            <span>Generate Report</span>
          </button>
          
          <button class="action-btn" @click="quickAction('schedule-meeting')">
            <div class="action-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
                <line x1="16" y1="2" x2="16" y2="6"/>
                <line x1="8" y1="2" x2="8" y2="6"/>
                <line x1="3" y1="10" x2="21" y2="10"/>
              </svg>
            </div>
            <span>Schedule Meeting</span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// Reactive data
const chartPeriod = ref('month')

// Mock data
const stats = reactive({
  activeProjects: 12,
  totalClients: 34,
  monthlyRevenue: 125000,
  teamMembers: 24
})

const recentProjects = reactive([
  { id: 1, name: 'Skyline Tower', progress: 85 },
  { id: 2, name: 'Riverside Mall', progress: 62 },
  { id: 3, name: 'Downtown Office', progress: 41 },
  { id: 4, name: 'Residential Complex', progress: 28 }
])

const recentActivity = reactive([
  {
    id: 1,
    type: 'project',
    description: 'Project "Skyline Tower" milestone completed',
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000)
  },
  {
    id: 2,
    type: 'user',
    description: 'Sarah Johnson joined the team',
    timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000)
  },
  {
    id: 3,
    type: 'document',
    description: 'Contract signed for Riverside Mall project',
    timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000)
  },
  {
    id: 4,
    type: 'project',
    description: 'Budget update for Downtown Office',
    timestamp: new Date(Date.now() - 8 * 60 * 60 * 1000)
  }
])

const upcomingDeadlines = reactive([
  {
    id: 1,
    title: 'Foundation Inspection',
    project: 'Skyline Tower',
    date: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
    urgency: 'high'
  },
  {
    id: 2,
    title: 'Material Delivery',
    project: 'Riverside Mall',
    date: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000),
    urgency: 'medium'
  },
  {
    id: 3,
    title: 'Client Meeting',
    project: 'Downtown Office',
    date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    urgency: 'low'
  }
])

// Methods
const formatNumber = (num: number) => {
  return new Intl.NumberFormat('en-US').format(num)
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

const formatDay = (date: Date) => {
  return date.getDate().toString()
}

const formatMonth = (date: Date) => {
  return date.toLocaleDateString('en-US', { month: 'short' })
}

const quickAction = (action: string) => {
  // TODO: Implement quick actions
  console.log('Quick action:', action)
}

const openDeadlineModal = () => {
  // TODO: Open deadline creation modal
  console.log('Opening deadline modal...')
}
</script>

<style scoped>
.admin-dashboard {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
}

.stat-card {
  background: white;
  border-radius: 1rem;
  padding: 1.5rem;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  gap: 1rem;
}

.stat-icon {
  width: 3rem;
  height: 3rem;
  border-radius: 0.75rem;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
}

.stat-icon.projects {
  background: linear-gradient(135deg, #3b82f6, #1d4ed8);
}

.stat-icon.clients {
  background: linear-gradient(135deg, #10b981, #059669);
}

.stat-icon.revenue {
  background: linear-gradient(135deg, #f59e0b, #d97706);
}

.stat-icon.team {
  background: linear-gradient(135deg, #8b5cf6, #7c3aed);
}

.stat-content {
  flex: 1;
}

.stat-number {
  font-size: 2rem;
  font-weight: 700;
  color: #1a202c;
  margin: 0 0 0.25rem 0;
}

.stat-label {
  color: #718096;
  margin: 0 0 0.5rem 0;
  font-size: 0.875rem;
}

.stat-change {
  display: flex;
  align-items: center;
  gap: 0.25rem;
  font-size: 0.75rem;
  font-weight: 500;
}

.stat-change.positive {
  color: #10b981;
}

.stat-change.neutral {
  color: #718096;
}

.dashboard-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  gap: 1.5rem;
}

.dashboard-card {
  background: white;
  border-radius: 1rem;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  overflow: hidden;
}

.card-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1.5rem 1.5rem 1rem 1.5rem;
  border-bottom: 1px solid #f1f5f9;
}

.card-title {
  font-size: 1.125rem;
  font-weight: 600;
  color: #1a202c;
  margin: 0;
}

.period-select {
  padding: 0.25rem 0.5rem;
  border: 1px solid #e2e8f0;
  border-radius: 0.375rem;
  font-size: 0.875rem;
  background: white;
}

.view-all-link {
  color: #3b82f6;
  font-size: 0.875rem;
  text-decoration: none;
  font-weight: 500;
}

.add-deadline-btn {
  background: none;
  border: none;
  color: #3b82f6;
  cursor: pointer;
  padding: 0.25rem;
  border-radius: 0.25rem;
}

.add-deadline-btn:hover {
  background-color: #eff6ff;
}

.chart-container {
  padding: 1rem 1.5rem 1.5rem 1.5rem;
}

.progress-chart {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.progress-item {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.project-info {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.project-name {
  font-weight: 500;
  color: #374151;
}

.project-progress {
  font-weight: 600;
  color: #3b82f6;
}

.progress-bar {
  width: 100%;
  height: 0.5rem;
  background-color: #f1f5f9;
  border-radius: 0.25rem;
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  background: linear-gradient(90deg, #3b82f6, #1d4ed8);
  transition: width 0.3s ease;
}

.activity-list {
  padding: 1rem 1.5rem 1.5rem 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.activity-item {
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
}

.activity-icon {
  width: 2rem;
  height: 2rem;
  border-radius: 0.375rem;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.activity-icon.project {
  background-color: #dbeafe;
  color: #3b82f6;
}

.activity-icon.user {
  background-color: #d1fae5;
  color: #10b981;
}

.activity-icon.document {
  background-color: #fef3c7;
  color: #f59e0b;
}

.activity-content {
  flex: 1;
  min-width: 0;
}

.activity-text {
  font-size: 0.875rem;
  color: #374151;
  margin: 0 0 0.25rem 0;
}

.activity-time {
  font-size: 0.75rem;
  color: #9ca3af;
}

.deadlines-list {
  padding: 1rem 1.5rem 1.5rem 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.deadline-item {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.deadline-date {
  width: 3rem;
  height: 3rem;
  border-radius: 0.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.deadline-date.high {
  background-color: #fef2f2;
  border: 1px solid #fecaca;
}

.deadline-date.medium {
  background-color: #fef3c7;
  border: 1px solid #fde68a;
}

.deadline-date.low {
  background-color: #f0f9ff;
  border: 1px solid #bfdbfe;
}

.date-day {
  font-weight: 700;
  font-size: 0.875rem;
  line-height: 1;
}

.date-month {
  font-size: 0.75rem;
  text-transform: uppercase;
}

.deadline-date.high .date-day,
.deadline-date.high .date-month {
  color: #dc2626;
}

.deadline-date.medium .date-day,
.deadline-date.medium .date-month {
  color: #d97706;
}

.deadline-date.low .date-day,
.deadline-date.low .date-month {
  color: #2563eb;
}

.deadline-content {
  flex: 1;
  min-width: 0;
}

.deadline-title {
  font-size: 0.875rem;
  font-weight: 500;
  color: #1a202c;
  margin: 0 0 0.25rem 0;
}

.deadline-project {
  font-size: 0.75rem;
  color: #718096;
  margin: 0;
}

.actions-grid {
  padding: 1rem 1.5rem 1.5rem 1.5rem;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
}

.action-btn {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.75rem;
  padding: 1.5rem 1rem;
  background: #f8fafc;
  border: 1px solid #e2e8f0;
  border-radius: 0.5rem;
  cursor: pointer;
  transition: all 0.2s ease;
  font-size: 0.875rem;
  font-weight: 500;
  color: #374151;
}

.action-btn:hover {
  background: #f1f5f9;
  border-color: #cbd5e1;
  transform: translateY(-1px);
}

.action-icon {
  width: 2.5rem;
  height: 2.5rem;
  background: linear-gradient(135deg, #3b82f6, #1d4ed8);
  border-radius: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
}

/* Responsive Design */
@media (max-width: 768px) {
  .stats-grid {
    grid-template-columns: 1fr;
  }
  
  .dashboard-grid {
    grid-template-columns: 1fr;
  }
  
  .actions-grid {
    grid-template-columns: 1fr;
  }
  
  .stat-card {
    padding: 1rem;
  }
  
  .card-header {
    padding: 1rem;
  }
  
  .chart-container,
  .activity-list,
  .deadlines-list,
  .actions-grid {
    padding: 1rem;
  }
}
</style>