<template>
  <div class="admin-projects">
    <!-- Header Section -->
    <div class="projects-header">
      <div class="header-main">
        <h2 class="page-title">Projects Management</h2>
        <p class="page-description">Manage all construction projects and track their progress</p>
      </div>
      <div class="header-actions">
        <button class="btn-secondary" @click="exportProjects">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
            <polyline points="7,10 12,15 17,10"/>
            <line x1="12" y1="15" x2="12" y2="3"/>
          </svg>
          Export
        </button>
        <button class="btn-primary" @click="openProjectModal()">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M12 5v14m7-7H5"/>
          </svg>
          New Project
        </button>
      </div>
    </div>
    
    <!-- Filters Section -->
    <div class="filters-section">
      <div class="filters-group">
        <div class="filter-item">
          <label for="search">Search Projects</label>
          <div class="search-input">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="11" cy="11" r="8"/>
              <path d="M21 21l-4.35-4.35"/>
            </svg>
            <input
              id="search"
              v-model="searchQuery"
              type="text"
              placeholder="Search by name, client, or location..."
            >
          </div>
        </div>
        
        <div class="filter-item">
          <label for="status">Status</label>
          <select id="status" v-model="statusFilter">
            <option value="">All Statuses</option>
            <option value="planning">Planning</option>
            <option value="in-progress">In Progress</option>
            <option value="on-hold">On Hold</option>
            <option value="completed">Completed</option>
          </select>
        </div>
        
        <div class="filter-item">
          <label for="priority">Priority</label>
          <select id="priority" v-model="priorityFilter">
            <option value="">All Priorities</option>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
            <option value="urgent">Urgent</option>
          </select>
        </div>
        
        <div class="filter-item">
          <label for="sort">Sort By</label>
          <select id="sort" v-model="sortBy">
            <option value="name">Name</option>
            <option value="start-date">Start Date</option>
            <option value="end-date">End Date</option>
            <option value="progress">Progress</option>
            <option value="budget">Budget</option>
          </select>
        </div>
      </div>
    </div>
    
    <!-- Projects Grid/List -->
    <div class="projects-container">
      <div class="view-toggle">
        <button
          class="view-btn"
          :class="{ active: viewMode === 'grid' }"
          @click="viewMode = 'grid'"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <rect x="3" y="3" width="7" height="7"/>
            <rect x="14" y="3" width="7" height="7"/>
            <rect x="14" y="14" width="7" height="7"/>
            <rect x="3" y="14" width="7" height="7"/>
          </svg>
          Grid
        </button>
        <button
          class="view-btn"
          :class="{ active: viewMode === 'list' }"
          @click="viewMode = 'list'"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <line x1="8" y1="6" x2="21" y2="6"/>
            <line x1="8" y1="12" x2="21" y2="12"/>
            <line x1="8" y1="18" x2="21" y2="18"/>
            <line x1="3" y1="6" x2="3.01" y2="6"/>
            <line x1="3" y1="12" x2="3.01" y2="12"/>
            <line x1="3" y1="18" x2="3.01" y2="18"/>
          </svg>
          List
        </button>
      </div>
      
      <!-- Grid View -->
      <div v-if="viewMode === 'grid'" class="projects-grid">
        <div
          v-for="project in filteredProjects"
          :key="project.id"
          class="project-card"
          @click="openProjectDetails(project)"
        >
          <div class="project-header">
            <div class="project-status" :class="project.status">
              {{ formatStatus(project.status) }}
            </div>
            <div class="project-priority" :class="project.priority">
              {{ project.priority }}
            </div>
          </div>
          
          <div class="project-image">
            <img :src="project.image" :alt="project.name" />
          </div>
          
          <div class="project-content">
            <h3 class="project-name">{{ project.name }}</h3>
            <p class="project-client">{{ project.client }}</p>
            <p class="project-location">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                <circle cx="12" cy="10" r="3"/>
              </svg>
              {{ project.location }}
            </p>
            
            <div class="project-progress">
              <div class="progress-header">
                <span>Progress</span>
                <span>{{ project.progress }}%</span>
              </div>
              <div class="progress-bar">
                <div class="progress-fill" :style="{ width: project.progress + '%' }"></div>
              </div>
            </div>
            
            <div class="project-meta">
              <div class="meta-item">
                <span class="meta-label">Budget</span>
                <span class="meta-value">${{ formatNumber(project.budget) }}</span>
              </div>
              <div class="meta-item">
                <span class="meta-label">End Date</span>
                <span class="meta-value">{{ formatDate(project.endDate) }}</span>
              </div>
            </div>
          </div>
          
          <div class="project-actions">
            <button class="action-btn" @click.stop="editProject(project)">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
                <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
              </svg>
            </button>
            <button class="action-btn" @click.stop="shareProject(project)">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"/>
                <polyline points="16,6 12,2 8,6"/>
                <line x1="12" y1="2" x2="12" y2="15"/>
              </svg>
            </button>
            <button class="action-btn danger" @click.stop="deleteProject(project)">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <polyline points="3,6 5,6 21,6"/>
                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
              </svg>
            </button>
          </div>
        </div>
      </div>
      
      <!-- List View -->
      <div v-else class="projects-list">
        <div class="list-header">
          <div class="list-col">Project</div>
          <div class="list-col">Client</div>
          <div class="list-col">Status</div>
          <div class="list-col">Progress</div>
          <div class="list-col">Budget</div>
          <div class="list-col">End Date</div>
          <div class="list-col">Actions</div>
        </div>
        
        <div
          v-for="project in filteredProjects"
          :key="project.id"
          class="list-row"
          @click="openProjectDetails(project)"
        >
          <div class="list-col project-info">
            <div class="project-avatar">
              <img :src="project.image" :alt="project.name" />
            </div>
            <div class="project-details">
              <h4 class="project-name">{{ project.name }}</h4>
              <p class="project-location">{{ project.location }}</p>
            </div>
          </div>
          
          <div class="list-col">{{ project.client }}</div>
          
          <div class="list-col">
            <span class="status-badge" :class="project.status">
              {{ formatStatus(project.status) }}
            </span>
          </div>
          
          <div class="list-col">
            <div class="progress-mini">
              <div class="progress-bar-mini">
                <div class="progress-fill-mini" :style="{ width: project.progress + '%' }"></div>
              </div>
              <span class="progress-text">{{ project.progress }}%</span>
            </div>
          </div>
          
          <div class="list-col">${{ formatNumber(project.budget) }}</div>
          
          <div class="list-col">{{ formatDate(project.endDate) }}</div>
          
          <div class="list-col">
            <div class="actions-dropdown">
              <button class="actions-trigger" @click.stop="toggleActionsMenu(project.id)">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <circle cx="12" cy="12" r="1"/>
                  <circle cx="12" cy="5" r="1"/>
                  <circle cx="12" cy="19" r="1"/>
                </svg>
              </button>
              <div v-if="openActionsMenu === project.id" class="actions-menu">
                <button @click.stop="editProject(project)">Edit</button>
                <button @click.stop="shareProject(project)">Share</button>
                <button @click.stop="deleteProject(project)" class="danger">Delete</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Empty State -->
    <div v-if="filteredProjects.length === 0" class="empty-state">
      <div class="empty-icon">
        <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1">
          <path d="M3 21h18"/>
          <path d="M5 21V7l8-4v18"/>
          <path d="M19 21V11l-6-4"/>
        </svg>
      </div>
      <h3>No projects found</h3>
      <p>Get started by creating your first project or adjust your filters.</p>
      <button class="btn-primary" @click="openProjectModal()">Create Project</button>
    </div>
  </div>
</template>

<script setup lang="ts">
// Reactive data
const viewMode = ref('grid')
const searchQuery = ref('')
const statusFilter = ref('')
const priorityFilter = ref('')
const sortBy = ref('name')
const openActionsMenu = ref<number | null>(null)

// Mock data
const projects = reactive([
  {
    id: 1,
    name: 'Skyline Tower',
    client: 'Urban Developers Inc.',
    location: 'Downtown District',
    status: 'in-progress',
    priority: 'high',
    progress: 85,
    budget: 2500000,
    startDate: new Date('2024-01-15'),
    endDate: new Date('2024-08-30'),
    image: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=400&h=300&fit=crop'
  },
  {
    id: 2,
    name: 'Riverside Mall',
    client: 'Retail Holdings Corp',
    location: 'Riverside District',
    status: 'in-progress',
    priority: 'medium',
    progress: 62,
    budget: 1800000,
    startDate: new Date('2024-02-01'),
    endDate: new Date('2024-09-15'),
    image: 'https://images.unsplash.com/photo-1555636222-cae831e670b3?w=400&h=300&fit=crop'
  },
  {
    id: 3,
    name: 'Downtown Office Complex',
    client: 'Business Center LLC',
    location: 'Central Business District',
    status: 'planning',
    priority: 'medium',
    progress: 41,
    budget: 3200000,
    startDate: new Date('2024-03-01'),
    endDate: new Date('2024-12-01'),
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=400&h=300&fit=crop'
  },
  {
    id: 4,
    name: 'Green Residential Complex',
    client: 'Eco Living Developers',
    location: 'Suburban Area',
    status: 'on-hold',
    priority: 'low',
    progress: 28,
    budget: 1500000,
    startDate: new Date('2024-01-10'),
    endDate: new Date('2024-10-30'),
    image: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=400&h=300&fit=crop'
  },
  {
    id: 5,
    name: 'Heritage Restoration',
    client: 'City Council',
    location: 'Historic District',
    status: 'completed',
    priority: 'urgent',
    progress: 100,
    budget: 950000,
    startDate: new Date('2023-10-01'),
    endDate: new Date('2024-01-15'),
    image: 'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=400&h=300&fit=crop'
  }
])

// Computed properties
const filteredProjects = computed(() => {
  let filtered = projects

  // Search filter
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    filtered = filtered.filter(project =>
      project.name.toLowerCase().includes(query) ||
      project.client.toLowerCase().includes(query) ||
      project.location.toLowerCase().includes(query)
    )
  }

  // Status filter
  if (statusFilter.value) {
    filtered = filtered.filter(project => project.status === statusFilter.value)
  }

  // Priority filter
  if (priorityFilter.value) {
    filtered = filtered.filter(project => project.priority === priorityFilter.value)
  }

  // Sort
  filtered.sort((a, b) => {
    switch (sortBy.value) {
      case 'name':
        return a.name.localeCompare(b.name)
      case 'start-date':
        return a.startDate.getTime() - b.startDate.getTime()
      case 'end-date':
        return a.endDate.getTime() - b.endDate.getTime()
      case 'progress':
        return b.progress - a.progress
      case 'budget':
        return b.budget - a.budget
      default:
        return 0
    }
  })

  return filtered
})

// Methods
const formatStatus = (status: string) => {
  return status.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())
}

const formatNumber = (num: number) => {
  return new Intl.NumberFormat('en-US').format(num)
}

const formatDate = (date: Date) => {
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
}

const openProjectModal = (project?: any) => {
  // TODO: Open project creation/edit modal
  console.log('Opening project modal:', project)
}

const openProjectDetails = (project: any) => {
  // TODO: Navigate to project details page
  console.log('Opening project details:', project.name)
}

const editProject = (project: any) => {
  openProjectModal(project)
}

const shareProject = (project: any) => {
  // TODO: Implement project sharing
  console.log('Sharing project:', project.name)
}

const deleteProject = (project: any) => {
  if (confirm(`Are you sure you want to delete "${project.name}"?`)) {
    const index = projects.findIndex(p => p.id === project.id)
    if (index > -1) {
      projects.splice(index, 1)
    }
  }
}

const exportProjects = () => {
  // TODO: Implement project export
  console.log('Exporting projects...')
}

const toggleActionsMenu = (projectId: number) => {
  openActionsMenu.value = openActionsMenu.value === projectId ? null : projectId
}

// Close actions menu when clicking outside
onMounted(() => {
  document.addEventListener('click', () => {
    openActionsMenu.value = null
  })
})
</script>

<style scoped>
.admin-projects {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.projects-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 2rem;
}

.page-title {
  font-size: 2rem;
  font-weight: 700;
  color: #1a202c;
  margin: 0 0 0.5rem 0;
}

.page-description {
  color: #718096;
  margin: 0;
}

.header-actions {
  display: flex;
  gap: 1rem;
  flex-shrink: 0;
}

.btn-primary,
.btn-secondary {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  border-radius: 0.5rem;
  font-weight: 500;
  cursor: pointer;
  border: none;
  transition: all 0.2s ease;
}

.btn-primary {
  background: linear-gradient(135deg, #3b82f6, #1d4ed8);
  color: white;
}

.btn-primary:hover {
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(59, 130, 246, 0.4);
}

.btn-secondary {
  background: white;
  color: #374151;
  border: 1px solid #e5e7eb;
}

.btn-secondary:hover {
  background: #f9fafb;
}

.filters-section {
  background: white;
  border-radius: 1rem;
  padding: 1.5rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.filters-group {
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1fr;
  gap: 1.5rem;
  align-items: end;
}

.filter-item {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.filter-item label {
  font-weight: 500;
  color: #374151;
  font-size: 0.875rem;
}

.search-input {
  position: relative;
}

.search-input svg {
  position: absolute;
  left: 1rem;
  top: 50%;
  transform: translateY(-50%);
  color: #9ca3af;
}

.search-input input {
  width: 100%;
  padding: 0.75rem 1rem 0.75rem 3rem;
  border: 1px solid #e5e7eb;
  border-radius: 0.5rem;
  font-size: 0.875rem;
}

.search-input input:focus {
  outline: none;
  border-color: #3b82f6;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

select {
  padding: 0.75rem 1rem;
  border: 1px solid #e5e7eb;
  border-radius: 0.5rem;
  font-size: 0.875rem;
  background: white;
}

select:focus {
  outline: none;
  border-color: #3b82f6;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

.projects-container {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.view-toggle {
  display: flex;
  gap: 0.5rem;
  align-self: flex-end;
}

.view-btn {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  border: 1px solid #e5e7eb;
  background: white;
  border-radius: 0.375rem;
  cursor: pointer;
  font-size: 0.875rem;
  color: #374151;
  transition: all 0.2s ease;
}

.view-btn.active {
  background: #3b82f6;
  border-color: #3b82f6;
  color: white;
}

.projects-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 1.5rem;
}

.project-card {
  background: white;
  border-radius: 1rem;
  overflow: hidden;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  transition: all 0.2s ease;
}

.project-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px -5px rgba(0, 0, 0, 0.1);
}

.project-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 1rem 0 1rem;
}

.project-status,
.project-priority {
  padding: 0.25rem 0.75rem;
  border-radius: 9999px;
  font-size: 0.75rem;
  font-weight: 500;
  text-transform: uppercase;
}

.project-status.planning {
  background: #fef3c7;
  color: #92400e;
}

.project-status.in-progress {
  background: #dbeafe;
  color: #1e40af;
}

.project-status.on-hold {
  background: #fee2e2;
  color: #dc2626;
}

.project-status.completed {
  background: #d1fae5;
  color: #065f46;
}

.project-priority.low {
  background: #f3f4f6;
  color: #374151;
}

.project-priority.medium {
  background: #fef3c7;
  color: #92400e;
}

.project-priority.high {
  background: #fed7d7;
  color: #c53030;
}

.project-priority.urgent {
  background: #fecaca;
  color: #dc2626;
}

.project-image {
  height: 200px;
  overflow: hidden;
}

.project-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.project-content {
  padding: 1.5rem;
}

.project-name {
  font-size: 1.25rem;
  font-weight: 600;
  color: #1a202c;
  margin: 0 0 0.5rem 0;
}

.project-client {
  color: #718096;
  margin: 0 0 0.5rem 0;
  font-size: 0.875rem;
}

.project-location {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #718096;
  margin: 0 0 1.5rem 0;
  font-size: 0.875rem;
}

.project-progress {
  margin-bottom: 1.5rem;
}

.progress-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.5rem;
  font-size: 0.875rem;
  font-weight: 500;
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

.project-meta {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
}

.meta-item {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.meta-label {
  font-size: 0.75rem;
  color: #718096;
  text-transform: uppercase;
  font-weight: 500;
}

.meta-value {
  font-weight: 600;
  color: #1a202c;
}

.project-actions {
  display: flex;
  justify-content: center;
  gap: 0.5rem;
  padding: 1rem;
  border-top: 1px solid #f1f5f9;
}

.action-btn {
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 0.5rem;
  border: 1px solid #e5e7eb;
  background: white;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
}

.action-btn:hover {
  background: #f9fafb;
}

.action-btn.danger:hover {
  background: #fef2f2;
  border-color: #fecaca;
  color: #dc2626;
}

.projects-list {
  background: white;
  border-radius: 1rem;
  overflow: hidden;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.list-header {
  display: grid;
  grid-template-columns: 2fr 1.5fr 1fr 1fr 1fr 1fr 0.5fr;
  gap: 1rem;
  padding: 1rem 1.5rem;
  background: #f8fafc;
  font-weight: 600;
  color: #374151;
  font-size: 0.875rem;
  border-bottom: 1px solid #e5e7eb;
}

.list-row {
  display: grid;
  grid-template-columns: 2fr 1.5fr 1fr 1fr 1fr 1fr 0.5fr;
  gap: 1rem;
  padding: 1rem 1.5rem;
  border-bottom: 1px solid #f1f5f9;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.list-row:hover {
  background: #f9fafb;
}

.list-col {
  display: flex;
  align-items: center;
  font-size: 0.875rem;
}

.project-info {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.project-avatar {
  width: 3rem;
  height: 3rem;
  border-radius: 0.5rem;
  overflow: hidden;
  flex-shrink: 0;
}

.project-avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.project-details h4 {
  font-weight: 600;
  color: #1a202c;
  margin: 0 0 0.25rem 0;
}

.project-details p {
  color: #718096;
  margin: 0;
  font-size: 0.75rem;
}

.status-badge {
  padding: 0.25rem 0.75rem;
  border-radius: 9999px;
  font-size: 0.75rem;
  font-weight: 500;
  text-transform: uppercase;
}

.progress-mini {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  width: 100%;
}

.progress-bar-mini {
  flex: 1;
  height: 0.375rem;
  background-color: #f1f5f9;
  border-radius: 0.25rem;
  overflow: hidden;
}

.progress-fill-mini {
  height: 100%;
  background: linear-gradient(90deg, #3b82f6, #1d4ed8);
  transition: width 0.3s ease;
}

.progress-text {
  font-size: 0.75rem;
  font-weight: 500;
  color: #374151;
  min-width: 3rem;
}

.actions-dropdown {
  position: relative;
}

.actions-trigger {
  width: 2rem;
  height: 2rem;
  border-radius: 0.25rem;
  border: none;
  background: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #6b7280;
}

.actions-trigger:hover {
  background: #f3f4f6;
}

.actions-menu {
  position: absolute;
  top: 100%;
  right: 0;
  background: white;
  border: 1px solid #e5e7eb;
  border-radius: 0.5rem;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
  z-index: 10;
  min-width: 8rem;
}

.actions-menu button {
  display: block;
  width: 100%;
  padding: 0.5rem 1rem;
  text-align: left;
  border: none;
  background: none;
  cursor: pointer;
  font-size: 0.875rem;
  color: #374151;
}

.actions-menu button:hover {
  background: #f9fafb;
}

.actions-menu button.danger {
  color: #dc2626;
}

.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 4rem 2rem;
  text-align: center;
}

.empty-icon {
  color: #d1d5db;
  margin-bottom: 1rem;
}

.empty-state h3 {
  font-size: 1.25rem;
  font-weight: 600;
  color: #374151;
  margin: 0 0 0.5rem 0;
}

.empty-state p {
  color: #6b7280;
  margin: 0 0 2rem 0;
}

/* Responsive Design */
@media (max-width: 1024px) {
  .filters-group {
    grid-template-columns: 1fr 1fr;
    gap: 1rem;
  }
  
  .projects-grid {
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  }
  
  .list-header,
  .list-row {
    grid-template-columns: 2fr 1fr 1fr 0.5fr;
  }
  
  .list-col:nth-child(2),
  .list-col:nth-child(5),
  .list-col:nth-child(6) {
    display: none;
  }
}

@media (max-width: 768px) {
  .projects-header {
    flex-direction: column;
    align-items: stretch;
  }
  
  .header-actions {
    align-self: stretch;
  }
  
  .filters-group {
    grid-template-columns: 1fr;
  }
  
  .projects-grid {
    grid-template-columns: 1fr;
  }
  
  .view-toggle {
    align-self: center;
  }
  
  .list-header,
  .list-row {
    grid-template-columns: 1fr 0.5fr;
    gap: 0.5rem;
  }
  
  .list-col:not(:first-child):not(:last-child) {
    display: none;
  }
}
</style>