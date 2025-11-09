<template>
  <div class="admin-clients">
    <!-- Header Section -->
    <div class="clients-header">
      <div class="header-main">
        <h2 class="page-title">Clients Management</h2>
        <p class="page-description">Manage client relationships and track project history</p>
      </div>
      <div class="header-actions">
        <button class="btn-secondary" @click="exportClients">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
            <polyline points="7,10 12,15 17,10"/>
            <line x1="12" y1="15" x2="12" y2="3"/>
          </svg>
          Export
        </button>
        <button class="btn-primary" @click="openClientModal()">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M12 5v14m7-7H5"/>
          </svg>
          Add Client
        </button>
      </div>
    </div>
    
    <!-- Stats Cards -->
    <div class="stats-grid">
      <div class="stat-card">
        <div class="stat-icon total">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/>
            <circle cx="9" cy="7" r="4"/>
            <path d="M22 21v-2a4 4 0 0 0-3-3.87"/>
            <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
          </svg>
        </div>
        <div class="stat-content">
          <h3>{{ stats.totalClients }}</h3>
          <p>Total Clients</p>
        </div>
      </div>
      
      <div class="stat-card">
        <div class="stat-icon active">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="9" cy="21" r="1"/>
            <circle cx="20" cy="21" r="1"/>
            <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
          </svg>
        </div>
        <div class="stat-content">
          <h3>{{ stats.activeProjects }}</h3>
          <p>Active Projects</p>
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
          <h3>${{ formatNumber(stats.totalRevenue) }}</h3>
          <p>Total Revenue</p>
        </div>
      </div>
      
      <div class="stat-card">
        <div class="stat-icon satisfaction">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M8 14s1.5 2 4 2 4-2 4-2"/>
            <line x1="9" y1="9" x2="9.01" y2="9"/>
            <line x1="15" y1="9" x2="15.01" y2="9"/>
            <circle cx="12" cy="12" r="10"/>
          </svg>
        </div>
        <div class="stat-content">
          <h3>{{ stats.satisfaction }}%</h3>
          <p>Satisfaction Rate</p>
        </div>
      </div>
    </div>
    
    <!-- Filters Section -->
    <div class="filters-section">
      <div class="filters-group">
        <div class="filter-item">
          <label for="search">Search Clients</label>
          <div class="search-input">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="11" cy="11" r="8"/>
              <path d="M21 21l-4.35-4.35"/>
            </svg>
            <input
              id="search"
              v-model="searchQuery"
              type="text"
              placeholder="Search by name, company, or email..."
            >
          </div>
        </div>
        
        <div class="filter-item">
          <label for="status">Status</label>
          <select id="status" v-model="statusFilter">
            <option value="">All Statuses</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
            <option value="potential">Potential</option>
          </select>
        </div>
        
        <div class="filter-item">
          <label for="type">Client Type</label>
          <select id="type" v-model="typeFilter">
            <option value="">All Types</option>
            <option value="individual">Individual</option>
            <option value="company">Company</option>
            <option value="government">Government</option>
          </select>
        </div>
        
        <div class="filter-item">
          <label for="sort">Sort By</label>
          <select id="sort" v-model="sortBy">
            <option value="name">Name</option>
            <option value="company">Company</option>
            <option value="projects">Projects</option>
            <option value="revenue">Revenue</option>
            <option value="date">Date Added</option>
          </select>
        </div>
      </div>
    </div>
    
    <!-- Clients Grid -->
    <div class="clients-grid">
      <div
        v-for="client in filteredClients"
        :key="client.id"
        class="client-card"
        @click="openClientDetails(client)"
      >
        <div class="client-header">
          <div class="client-avatar">
            <img v-if="client.avatar" :src="client.avatar" :alt="client.name" />
            <div v-else class="avatar-placeholder">
              {{ getInitials(client.name) }}
            </div>
          </div>
          <div class="client-status" :class="client.status">
            {{ formatStatus(client.status) }}
          </div>
        </div>
        
        <div class="client-info">
          <h3 class="client-name">{{ client.name }}</h3>
          <p class="client-company">{{ client.company }}</p>
          <p class="client-type">{{ formatType(client.type) }}</p>
        </div>
        
        <div class="client-contact">
          <div class="contact-item">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
              <polyline points="22,6 12,13 2,6"/>
            </svg>
            <span>{{ client.email }}</span>
          </div>
          <div class="contact-item">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
            </svg>
            <span>{{ client.phone }}</span>
          </div>
        </div>
        
        <div class="client-stats">
          <div class="stat-item">
            <span class="stat-number">{{ client.projectsCount }}</span>
            <span class="stat-label">Projects</span>
          </div>
          <div class="stat-item">
            <span class="stat-number">${{ formatNumber(client.totalRevenue) }}</span>
            <span class="stat-label">Revenue</span>
          </div>
        </div>
        
        <div class="client-actions">
          <button class="action-btn" @click.stop="editClient(client)">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
              <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
            </svg>
          </button>
          <button class="action-btn" @click.stop="contactClient(client)">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
              <polyline points="22,6 12,13 2,6"/>
            </svg>
          </button>
          <button class="action-btn" @click.stop="deleteClient(client)">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <polyline points="3,6 5,6 21,6"/>
              <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
            </svg>
          </button>
        </div>
      </div>
    </div>
    
    <!-- Empty State -->
    <div v-if="filteredClients.length === 0" class="empty-state">
      <div class="empty-icon">
        <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1">
          <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/>
          <circle cx="9" cy="7" r="4"/>
          <path d="M22 21v-2a4 4 0 0 0-3-3.87"/>
          <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
        </svg>
      </div>
      <h3>No clients found</h3>
      <p>Get started by adding your first client or adjust your filters.</p>
      <button class="btn-primary" @click="openClientModal()">Add Client</button>
    </div>
  </div>
</template>

<script setup lang="ts">
// Reactive data
const searchQuery = ref('')
const statusFilter = ref('')
const typeFilter = ref('')
const sortBy = ref('name')

// Mock data
const stats = reactive({
  totalClients: 34,
  activeProjects: 12,
  totalRevenue: 4250000,
  satisfaction: 94
})

const clients = reactive([
  {
    id: 1,
    name: 'John Smith',
    company: 'Urban Developers Inc.',
    email: 'john.smith@urbandev.com',
    phone: '+1 (555) 123-4567',
    type: 'company',
    status: 'active',
    projectsCount: 3,
    totalRevenue: 1250000,
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face',
    dateAdded: new Date('2023-08-15')
  },
  {
    id: 2,
    name: 'Sarah Johnson',
    company: 'Retail Holdings Corp',
    email: 'sarah.j@retailholdings.com',
    phone: '+1 (555) 987-6543',
    type: 'company',
    status: 'active',
    projectsCount: 2,
    totalRevenue: 890000,
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face',
    dateAdded: new Date('2023-09-22')
  },
  {
    id: 3,
    name: 'Michael Brown',
    company: 'Personal Residence',
    email: 'michael.brown@email.com',
    phone: '+1 (555) 456-7890',
    type: 'individual',
    status: 'active',
    projectsCount: 1,
    totalRevenue: 450000,
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
    dateAdded: new Date('2024-01-10')
  },
  {
    id: 4,
    name: 'Emily Davis',
    company: 'Eco Living Developers',
    email: 'emily.davis@ecoliving.com',
    phone: '+1 (555) 234-5678',
    type: 'company',
    status: 'potential',
    projectsCount: 0,
    totalRevenue: 0,
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face',
    dateAdded: new Date('2024-02-28')
  },
  {
    id: 5,
    name: 'City Planning Department',
    company: 'City Council',
    email: 'planning@city.gov',
    phone: '+1 (555) 111-2222',
    type: 'government',
    status: 'active',
    projectsCount: 2,
    totalRevenue: 1150000,
    avatar: null,
    dateAdded: new Date('2023-07-05')
  },
  {
    id: 6,
    name: 'Robert Wilson',
    company: 'Wilson Enterprises',
    email: 'r.wilson@wilsonent.com',
    phone: '+1 (555) 345-6789',
    type: 'company',
    status: 'inactive',
    projectsCount: 1,
    totalRevenue: 320000,
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face',
    dateAdded: new Date('2023-05-18')
  }
])

// Computed properties
const filteredClients = computed(() => {
  let filtered = clients

  // Search filter
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    filtered = filtered.filter(client =>
      client.name.toLowerCase().includes(query) ||
      client.company.toLowerCase().includes(query) ||
      client.email.toLowerCase().includes(query)
    )
  }

  // Status filter
  if (statusFilter.value) {
    filtered = filtered.filter(client => client.status === statusFilter.value)
  }

  // Type filter
  if (typeFilter.value) {
    filtered = filtered.filter(client => client.type === typeFilter.value)
  }

  // Sort
  filtered.sort((a, b) => {
    switch (sortBy.value) {
      case 'name':
        return a.name.localeCompare(b.name)
      case 'company':
        return a.company.localeCompare(b.company)
      case 'projects':
        return b.projectsCount - a.projectsCount
      case 'revenue':
        return b.totalRevenue - a.totalRevenue
      case 'date':
        return b.dateAdded.getTime() - a.dateAdded.getTime()
      default:
        return 0
    }
  })

  return filtered
})

// Methods
const formatNumber = (num: number) => {
  return new Intl.NumberFormat('en-US').format(num)
}

const formatStatus = (status: string) => {
  return status.charAt(0).toUpperCase() + status.slice(1)
}

const formatType = (type: string) => {
  return type.charAt(0).toUpperCase() + type.slice(1)
}

const getInitials = (name: string) => {
  return name
    .split(' ')
    .map(word => word.charAt(0))
    .join('')
    .toUpperCase()
    .slice(0, 2)
}

const openClientModal = (client?: any) => {
  // TODO: Open client creation/edit modal
  console.log('Opening client modal:', client)
}

const openClientDetails = (client: any) => {
  // TODO: Navigate to client details page
  console.log('Opening client details:', client.name)
}

const editClient = (client: any) => {
  openClientModal(client)
}

const contactClient = (client: any) => {
  // TODO: Open contact/email modal
  console.log('Contacting client:', client.name)
}

const deleteClient = (client: any) => {
  if (confirm(`Are you sure you want to delete "${client.name}"?`)) {
    const index = clients.findIndex(c => c.id === client.id)
    if (index > -1) {
      clients.splice(index, 1)
    }
  }
}

const exportClients = () => {
  // TODO: Implement client export
  console.log('Exporting clients...')
}
</script>

<style scoped>
.admin-clients {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.clients-header {
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

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
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

.stat-icon.total {
  background: linear-gradient(135deg, #3b82f6, #1d4ed8);
}

.stat-icon.active {
  background: linear-gradient(135deg, #10b981, #059669);
}

.stat-icon.revenue {
  background: linear-gradient(135deg, #f59e0b, #d97706);
}

.stat-icon.satisfaction {
  background: linear-gradient(135deg, #8b5cf6, #7c3aed);
}

.stat-content h3 {
  font-size: 1.5rem;
  font-weight: 700;
  color: #1a202c;
  margin: 0 0 0.25rem 0;
}

.stat-content p {
  color: #718096;
  margin: 0;
  font-size: 0.875rem;
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

.clients-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 1.5rem;
}

.client-card {
  background: white;
  border-radius: 1rem;
  padding: 1.5rem;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.client-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px -5px rgba(0, 0, 0, 0.1);
}

.client-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.client-avatar {
  width: 3rem;
  height: 3rem;
  border-radius: 0.75rem;
  overflow: hidden;
}

.client-avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.avatar-placeholder {
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, #3b82f6, #1d4ed8);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: 600;
  font-size: 1rem;
}

.client-status {
  padding: 0.25rem 0.75rem;
  border-radius: 9999px;
  font-size: 0.75rem;
  font-weight: 500;
  text-transform: uppercase;
}

.client-status.active {
  background: #d1fae5;
  color: #065f46;
}

.client-status.inactive {
  background: #fee2e2;
  color: #dc2626;
}

.client-status.potential {
  background: #fef3c7;
  color: #92400e;
}

.client-info {
  text-align: left;
}

.client-name {
  font-size: 1.25rem;
  font-weight: 600;
  color: #1a202c;
  margin: 0 0 0.25rem 0;
}

.client-company {
  color: #718096;
  margin: 0 0 0.25rem 0;
  font-size: 0.875rem;
}

.client-type {
  color: #9ca3af;
  margin: 0;
  font-size: 0.75rem;
  text-transform: uppercase;
  font-weight: 500;
}

.client-contact {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.contact-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #6b7280;
  font-size: 0.875rem;
}

.client-stats {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  padding: 1rem 0;
  border-top: 1px solid #f1f5f9;
  border-bottom: 1px solid #f1f5f9;
}

.stat-item {
  text-align: center;
}

.stat-number {
  display: block;
  font-size: 1.125rem;
  font-weight: 600;
  color: #1a202c;
}

.stat-label {
  font-size: 0.75rem;
  color: #718096;
  text-transform: uppercase;
  font-weight: 500;
}

.client-actions {
  display: flex;
  justify-content: center;
  gap: 0.5rem;
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
  color: #6b7280;
}

.action-btn:hover {
  background: #f9fafb;
  color: #374151;
}

.action-btn:last-child:hover {
  background: #fef2f2;
  border-color: #fecaca;
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
  
  .clients-grid {
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  }
}

@media (max-width: 768px) {
  .clients-header {
    flex-direction: column;
    align-items: stretch;
  }
  
  .header-actions {
    align-self: stretch;
  }
  
  .stats-grid {
    grid-template-columns: repeat(2, 1fr);
  }
  
  .filters-group {
    grid-template-columns: 1fr;
  }
  
  .clients-grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 480px) {
  .stats-grid {
    grid-template-columns: 1fr;
  }
  
  .client-card {
    padding: 1rem;
  }
}
</style>