<template>
  <div class="admin-content">
    <!-- Header Section -->
    <div class="content-header">
      <div class="header-main">
        <h2 class="page-title">Content Management</h2>
        <p class="page-description">Manage website content, blog posts, and project portfolios</p>
      </div>
      <div class="header-actions">
        <button class="btn-secondary" @click="importContent">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-15"/>
            <polyline points="17,10 12,5 7,10"/>
            <line x1="12" y1="5" x2="12" y2="15"/>
          </svg>
          Import
        </button>
        <button class="btn-primary" @click="createContent">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M12 5v14m7-7H5"/>
          </svg>
          Create Content
        </button>
      </div>
    </div>

    <!-- Content Stats -->
    <div class="stats-grid">
      <div class="stat-card">
        <div class="stat-icon articles">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
            <polyline points="14,2 14,8 20,8"/>
            <line x1="16" y1="13" x2="8" y2="13"/>
            <line x1="16" y1="17" x2="8" y2="17"/>
            <polyline points="10,9 9,9 8,9"/>
          </svg>
        </div>
        <div class="stat-content">
          <h3>{{ stats.totalArticles }}</h3>
          <p>Total Articles</p>
        </div>
      </div>
      
      <div class="stat-card">
        <div class="stat-icon published">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <polyline points="22,12 18,12 15,21 9,3 6,12 2,12"/>
          </svg>
        </div>
        <div class="stat-content">
          <h3>{{ stats.publishedArticles }}</h3>
          <p>Published</p>
        </div>
      </div>
      
      <div class="stat-card">
        <div class="stat-icon drafts">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
            <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
          </svg>
        </div>
        <div class="stat-content">
          <h3>{{ stats.draftArticles }}</h3>
          <p>Drafts</p>
        </div>
      </div>
      
      <div class="stat-card">
        <div class="stat-icon media">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
            <circle cx="9" cy="9" r="2"/>
            <path d="M21 15l-3.086-3.086a2 2 0 0 0-2.828 0L6 21"/>
          </svg>
        </div>
        <div class="stat-content">
          <h3>{{ stats.mediaFiles }}</h3>
          <p>Media Files</p>
        </div>
      </div>
    </div>

    <!-- Content Tabs -->
    <div class="content-tabs">
      <button 
        v-for="tab in tabs" 
        :key="tab.id"
        class="tab-button"
        :class="{ active: activeTab === tab.id }"
        @click="activeTab = tab.id"
      >
        <component :is="tab.icon" />
        {{ tab.label }}
        <span class="tab-count">{{ tab.count }}</span>
      </button>
    </div>

    <!-- Filters -->
    <div class="filters-section">
      <div class="filters-group">
        <div class="filter-item">
          <label for="search">Search Content</label>
          <div class="search-input">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="11" cy="11" r="8"/>
              <path d="M21 21l-4.35-4.35"/>
            </svg>
            <input
              id="search"
              v-model="searchQuery"
              type="text"
              placeholder="Search by title, content, or tags..."
            >
          </div>
        </div>
        
        <div class="filter-item">
          <label for="status">Status</label>
          <select id="status" v-model="statusFilter">
            <option value="">All Status</option>
            <option value="published">Published</option>
            <option value="draft">Draft</option>
            <option value="archived">Archived</option>
          </select>
        </div>
        
        <div class="filter-item">
          <label for="category">Category</label>
          <select id="category" v-model="categoryFilter">
            <option value="">All Categories</option>
            <option value="projects">Projects</option>
            <option value="news">News</option>
            <option value="services">Services</option>
            <option value="about">About</option>
          </select>
        </div>
        
        <div class="filter-item">
          <label for="sort">Sort By</label>
          <select id="sort" v-model="sortBy">
            <option value="updated">Last Updated</option>
            <option value="created">Date Created</option>
            <option value="title">Title</option>
            <option value="status">Status</option>
          </select>
        </div>
      </div>
    </div>

    <!-- Content List -->
    <div class="content-list">
      <div
        v-for="item in filteredContent"
        :key="item.id"
        class="content-item"
        @click="editContent(item)"
      >
        <div class="content-thumbnail">
          <img v-if="item.image" :src="item.image" :alt="item.title" />
          <div v-else class="thumbnail-placeholder">
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
              <circle cx="9" cy="9" r="2"/>
              <path d="M21 15l-3.086-3.086a2 2 0 0 0-2.828 0L6 21"/>
            </svg>
          </div>
        </div>
        
        <div class="content-info">
          <div class="content-header">
            <h3 class="content-title">{{ item.title }}</h3>
            <div class="content-status" :class="item.status">
              {{ formatStatus(item.status) }}
            </div>
          </div>
          
          <p class="content-excerpt">{{ item.excerpt }}</p>
          
          <div class="content-meta">
            <div class="meta-item">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                <circle cx="12" cy="7" r="4"/>
              </svg>
              <span>{{ item.author }}</span>
            </div>
            
            <div class="meta-item">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
                <line x1="16" y1="2" x2="16" y2="6"/>
                <line x1="8" y1="2" x2="8" y2="6"/>
                <line x1="3" y1="10" x2="21" y2="10"/>
              </svg>
              <span>{{ formatDate(item.updatedAt) }}</span>
            </div>
            
            <div class="meta-item">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M7 7h10v3l2-2-2-2v3H7V7z"/>
                <path d="M7 17h10v-3l2 2-2 2v-3H7v3z"/>
              </svg>
              <span>{{ item.category }}</span>
            </div>
          </div>
          
          <div v-if="item.tags && item.tags.length" class="content-tags">
            <span v-for="tag in item.tags" :key="tag" class="tag">
              {{ tag }}
            </span>
          </div>
        </div>
        
        <div class="content-actions">
          <button class="action-btn" @click.stop="editContent(item)">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
              <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
            </svg>
          </button>
          
          <button class="action-btn" @click.stop="duplicateContent(item)">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <rect x="9" y="9" width="13" height="13" rx="2" ry="2"/>
              <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>
            </svg>
          </button>
          
          <button 
            class="action-btn"
            :class="{ published: item.status === 'published' }"
            @click.stop="togglePublish(item)"
          >
            <svg v-if="item.status === 'published'" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M18 6L6 18M6 6l12 12"/>
            </svg>
            <svg v-else xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <polyline points="22,12 18,12 15,21 9,3 6,12 2,12"/>
            </svg>
          </button>
          
          <button class="action-btn danger" @click.stop="deleteContent(item)">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <polyline points="3,6 5,6 21,6"/>
              <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
            </svg>
          </button>
        </div>
      </div>
    </div>

    <!-- Empty State -->
    <div v-if="filteredContent.length === 0" class="empty-state">
      <div class="empty-icon">
        <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
          <polyline points="14,2 14,8 20,8"/>
        </svg>
      </div>
      <h3>No content found</h3>
      <p>Start creating content for your website or adjust your filters.</p>
      <button class="btn-primary" @click="createContent">Create Content</button>
    </div>
  </div>
</template>

<script setup lang="ts">
// Reactive data
const activeTab = ref('all')
const searchQuery = ref('')
const statusFilter = ref('')
const categoryFilter = ref('')
const sortBy = ref('updated')

// Mock data
const stats = reactive({
  totalArticles: 24,
  publishedArticles: 18,
  draftArticles: 6,
  mediaFiles: 142
})

const tabs = computed(() => [
  { id: 'all', label: 'All Content', count: stats.totalArticles, icon: 'svg' },
  { id: 'articles', label: 'Articles', count: 16, icon: 'svg' },
  { id: 'projects', label: 'Projects', count: 8, icon: 'svg' },
  { id: 'pages', label: 'Pages', count: 6, icon: 'svg' }
])

const content = reactive([
  {
    id: 1,
    title: 'Modern Office Complex Construction',
    excerpt: 'Explore our latest commercial construction project featuring sustainable materials and innovative design.',
    content: '...',
    status: 'published',
    category: 'projects',
    author: 'John Smith',
    createdAt: new Date('2024-10-15'),
    updatedAt: new Date('2024-11-05'),
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=300&h=200&fit=crop',
    tags: ['commercial', 'office', 'sustainable', 'modern']
  },
  {
    id: 2,
    title: 'Construction Safety Guidelines 2024',
    excerpt: 'Updated safety protocols and best practices for construction sites to ensure worker protection.',
    content: '...',
    status: 'published',
    category: 'news',
    author: 'Sarah Johnson',
    createdAt: new Date('2024-10-20'),
    updatedAt: new Date('2024-11-02'),
    image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=300&h=200&fit=crop',
    tags: ['safety', 'guidelines', 'protocols']
  },
  {
    id: 3,
    title: 'Residential Complex Development',
    excerpt: 'Luxury residential development with eco-friendly features and community amenities.',
    content: '...',
    status: 'draft',
    category: 'projects',
    author: 'Michael Brown',
    createdAt: new Date('2024-11-01'),
    updatedAt: new Date('2024-11-07'),
    image: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=300&h=200&fit=crop',
    tags: ['residential', 'luxury', 'eco-friendly']
  },
  {
    id: 4,
    title: 'Our Construction Services',
    excerpt: 'Comprehensive overview of all construction services we offer to our clients.',
    content: '...',
    status: 'published',
    category: 'services',
    author: 'Emily Davis',
    createdAt: new Date('2024-09-15'),
    updatedAt: new Date('2024-10-30'),
    image: null,
    tags: ['services', 'overview', 'construction']
  },
  {
    id: 5,
    title: 'Heritage Building Restoration',
    excerpt: 'Careful restoration of historic buildings preserving architectural heritage while modernizing infrastructure.',
    content: '...',
    status: 'published',
    category: 'projects',
    author: 'Robert Wilson',
    createdAt: new Date('2024-09-10'),
    updatedAt: new Date('2024-10-25'),
    image: 'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=300&h=200&fit=crop',
    tags: ['heritage', 'restoration', 'historic']
  },
  {
    id: 6,
    title: 'About Our Company',
    excerpt: 'Learn about our company history, values, and commitment to excellence in construction.',
    content: '...',
    status: 'draft',
    category: 'about',
    author: 'Lisa Anderson',
    createdAt: new Date('2024-11-03'),
    updatedAt: new Date('2024-11-06'),
    image: null,
    tags: ['company', 'history', 'values']
  }
])

// Computed properties
const filteredContent = computed(() => {
  let filtered = content

  // Tab filter
  if (activeTab.value !== 'all') {
    const tabCategories: Record<string, string[]> = {
      articles: ['news', 'blog'],
      projects: ['projects'],
      pages: ['about', 'services']
    }
    filtered = filtered.filter(item => 
      tabCategories[activeTab.value]?.includes(item.category)
    )
  }

  // Search filter
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    filtered = filtered.filter(item =>
      item.title.toLowerCase().includes(query) ||
      item.excerpt.toLowerCase().includes(query) ||
      item.tags?.some(tag => tag.toLowerCase().includes(query))
    )
  }

  // Status filter
  if (statusFilter.value) {
    filtered = filtered.filter(item => item.status === statusFilter.value)
  }

  // Category filter
  if (categoryFilter.value) {
    filtered = filtered.filter(item => item.category === categoryFilter.value)
  }

  // Sort
  filtered.sort((a, b) => {
    switch (sortBy.value) {
      case 'updated':
        return b.updatedAt.getTime() - a.updatedAt.getTime()
      case 'created':
        return b.createdAt.getTime() - a.createdAt.getTime()
      case 'title':
        return a.title.localeCompare(b.title)
      case 'status':
        return a.status.localeCompare(b.status)
      default:
        return 0
    }
  })

  return filtered
})

// Methods
const formatStatus = (status: string) => {
  return status.charAt(0).toUpperCase() + status.slice(1)
}

const formatDate = (date: Date) => {
  return date.toLocaleDateString('en-US', { 
    month: 'short', 
    day: 'numeric', 
    year: 'numeric' 
  })
}

const createContent = () => {
  // TODO: Navigate to content editor
  console.log('Creating new content...')
}

const editContent = (item: any) => {
  // TODO: Navigate to content editor with item
  console.log('Editing content:', item.title)
}

const duplicateContent = (item: any) => {
  const duplicate = {
    ...item,
    id: Math.max(...content.map(c => c.id)) + 1,
    title: `${item.title} (Copy)`,
    status: 'draft',
    createdAt: new Date(),
    updatedAt: new Date()
  }
  content.push(duplicate)
}

const togglePublish = (item: any) => {
  item.status = item.status === 'published' ? 'draft' : 'published'
  item.updatedAt = new Date()
}

const deleteContent = (item: any) => {
  if (confirm(`Are you sure you want to delete "${item.title}"?`)) {
    const index = content.findIndex(c => c.id === item.id)
    if (index > -1) {
      content.splice(index, 1)
    }
  }
}

const importContent = () => {
  // TODO: Implement content import
  console.log('Importing content...')
}
</script>

<style scoped>
.admin-content {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.content-header {
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

.stat-icon.articles {
  background: linear-gradient(135deg, #3b82f6, #1d4ed8);
}

.stat-icon.published {
  background: linear-gradient(135deg, #10b981, #059669);
}

.stat-icon.drafts {
  background: linear-gradient(135deg, #f59e0b, #d97706);
}

.stat-icon.media {
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

.content-tabs {
  display: flex;
  gap: 0.5rem;
  background: white;
  border-radius: 0.75rem;
  padding: 0.5rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.tab-button {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1rem;
  border: none;
  border-radius: 0.5rem;
  background: transparent;
  cursor: pointer;
  font-weight: 500;
  color: #6b7280;
  transition: all 0.2s ease;
}

.tab-button.active {
  background: #3b82f6;
  color: white;
}

.tab-count {
  background: rgba(0, 0, 0, 0.1);
  padding: 0.125rem 0.5rem;
  border-radius: 9999px;
  font-size: 0.75rem;
  font-weight: 600;
}

.tab-button.active .tab-count {
  background: rgba(255, 255, 255, 0.2);
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

.content-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.content-item {
  background: white;
  border-radius: 1rem;
  padding: 1.5rem;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  gap: 1.5rem;
  align-items: flex-start;
}

.content-item:hover {
  transform: translateY(-1px);
  box-shadow: 0 8px 25px -5px rgba(0, 0, 0, 0.1);
}

.content-thumbnail {
  width: 120px;
  height: 80px;
  border-radius: 0.5rem;
  overflow: hidden;
  flex-shrink: 0;
}

.content-thumbnail img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.thumbnail-placeholder {
  width: 100%;
  height: 100%;
  background: #f3f4f6;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #9ca3af;
}

.content-info {
  flex: 1;
  min-width: 0;
}

.content-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 0.5rem;
}

.content-title {
  font-size: 1.125rem;
  font-weight: 600;
  color: #1a202c;
  margin: 0;
}

.content-status {
  padding: 0.25rem 0.75rem;
  border-radius: 9999px;
  font-size: 0.75rem;
  font-weight: 500;
  text-transform: uppercase;
  flex-shrink: 0;
}

.content-status.published {
  background: #d1fae5;
  color: #065f46;
}

.content-status.draft {
  background: #fef3c7;
  color: #92400e;
}

.content-status.archived {
  background: #f3f4f6;
  color: #374151;
}

.content-excerpt {
  color: #6b7280;
  margin: 0 0 1rem 0;
  line-height: 1.5;
}

.content-meta {
  display: flex;
  gap: 1.5rem;
  margin-bottom: 1rem;
}

.meta-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #9ca3af;
  font-size: 0.875rem;
}

.content-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.tag {
  background: #f1f5f9;
  color: #475569;
  padding: 0.25rem 0.5rem;
  border-radius: 0.25rem;
  font-size: 0.75rem;
  font-weight: 500;
}

.content-actions {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  flex-shrink: 0;
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

.action-btn.published {
  background: #10b981;
  border-color: #10b981;
  color: white;
}

.action-btn.danger:hover {
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
  background: white;
  border-radius: 1rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
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
  
  .content-item {
    flex-direction: column;
  }
  
  .content-thumbnail {
    width: 100%;
    height: 200px;
  }
  
  .content-actions {
    flex-direction: row;
    justify-content: center;
  }
}

@media (max-width: 768px) {
  .content-header {
    flex-direction: column;
    align-items: stretch;
  }
  
  .header-actions {
    align-self: stretch;
  }
  
  .stats-grid {
    grid-template-columns: repeat(2, 1fr);
  }
  
  .content-tabs {
    overflow-x: auto;
  }
  
  .filters-group {
    grid-template-columns: 1fr;
  }
  
  .content-meta {
    flex-direction: column;
    gap: 0.5rem;
  }
}

@media (max-width: 480px) {
  .stats-grid {
    grid-template-columns: 1fr;
  }
  
  .content-item {
    padding: 1rem;
  }
}
</style>