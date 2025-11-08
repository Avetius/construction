<template>
  <div class="media-library">
    <!-- Header -->
    <div class="media-header">
      <div class="header-main">
        <h2 class="page-title">Media Library</h2>
        <p class="page-description">Manage images, documents, and other media files</p>
      </div>
      <div class="header-actions">
        <button class="btn-secondary" @click="createFolder">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/>
            <line x1="12" y1="11" x2="12" y2="17"/>
            <line x1="9" y1="14" x2="15" y2="14"/>
          </svg>
          New Folder
        </button>
        <button class="btn-primary" @click="uploadFiles">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
            <polyline points="17,8 12,3 7,8"/>
            <line x1="12" y1="3" x2="12" y2="15"/>
          </svg>
          Upload Files
        </button>
      </div>
    </div>

    <!-- Toolbar -->
    <div class="media-toolbar">
      <div class="toolbar-left">
        <div class="breadcrumb">
          <button 
            v-for="(crumb, index) in breadcrumbs" 
            :key="index"
            class="breadcrumb-item"
            @click="navigateToFolder(crumb.path)"
          >
            {{ crumb.name }}
            <svg v-if="index < breadcrumbs.length - 1" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <polyline points="9,18 15,12 9,6"/>
            </svg>
          </button>
        </div>
      </div>
      
      <div class="toolbar-right">
        <div class="view-options">
          <button 
            class="view-btn"
            :class="{ active: viewMode === 'grid' }"
            @click="viewMode = 'grid'"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <rect x="3" y="3" width="7" height="7"/>
              <rect x="14" y="3" width="7" height="7"/>
              <rect x="14" y="14" width="7" height="7"/>
              <rect x="3" y="14" width="7" height="7"/>
            </svg>
          </button>
          <button 
            class="view-btn"
            :class="{ active: viewMode === 'list' }"
            @click="viewMode = 'list'"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <line x1="8" y1="6" x2="21" y2="6"/>
              <line x1="8" y1="12" x2="21" y2="12"/>
              <line x1="8" y1="18" x2="21" y2="18"/>
              <line x1="3" y1="6" x2="3.01" y2="6"/>
              <line x1="3" y1="12" x2="3.01" y2="12"/>
              <line x1="3" y1="18" x2="3.01" y2="18"/>
            </svg>
          </button>
        </div>
        
        <div class="search-box">
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="11" cy="11" r="8"/>
            <path d="M21 21l-4.35-4.35"/>
          </svg>
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Search files..."
          >
        </div>
      </div>
    </div>

    <!-- Media Grid/List -->
    <div class="media-content">
      <!-- Grid View -->
      <div v-if="viewMode === 'grid'" class="media-grid">
        <!-- Folders -->
        <div
          v-for="folder in filteredFolders"
          :key="folder.id"
          class="media-item folder-item"
          @click="openFolder(folder)"
          @contextmenu.prevent="showContextMenu($event, folder)"
        >
          <div class="folder-icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
              <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/>
            </svg>
          </div>
          <div class="item-info">
            <h4 class="item-name">{{ folder.name }}</h4>
            <p class="item-details">{{ folder.itemCount }} items</p>
          </div>
        </div>

        <!-- Files -->
        <div
          v-for="file in filteredFiles"
          :key="file.id"
          class="media-item file-item"
          :class="{ selected: selectedItems.includes(file.id) }"
          @click="selectFile(file)"
          @dblclick="openFile(file)"
          @contextmenu.prevent="showContextMenu($event, file)"
        >
          <div class="file-preview">
            <img v-if="isImage(file)" :src="file.url" :alt="file.name" />
            <div v-else class="file-icon" :class="getFileTypeClass(file.type)">
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                <polyline points="14,2 14,8 20,8"/>
              </svg>
              <span class="file-extension">{{ getFileExtension(file.name) }}</span>
            </div>
          </div>
          <div class="item-info">
            <h4 class="item-name">{{ file.name }}</h4>
            <p class="item-details">{{ formatFileSize(file.size) }} • {{ formatDate(file.uploadedAt) }}</p>
          </div>
        </div>
      </div>

      <!-- List View -->
      <div v-else class="media-list">
        <div class="list-header">
          <div class="list-col">Name</div>
          <div class="list-col">Type</div>
          <div class="list-col">Size</div>
          <div class="list-col">Modified</div>
          <div class="list-col">Actions</div>
        </div>
        
        <!-- Folders -->
        <div
          v-for="folder in filteredFolders"
          :key="folder.id"
          class="list-row folder-row"
          @click="openFolder(folder)"
        >
          <div class="list-col name-col">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/>
            </svg>
            <span>{{ folder.name }}</span>
          </div>
          <div class="list-col">Folder</div>
          <div class="list-col">{{ folder.itemCount }} items</div>
          <div class="list-col">{{ formatDate(folder.modifiedAt) }}</div>
          <div class="list-col">
            <button class="action-btn" @click.stop="showContextMenu($event, folder)">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="12" cy="12" r="1"/>
                <circle cx="12" cy="5" r="1"/>
                <circle cx="12" cy="19" r="1"/>
              </svg>
            </button>
          </div>
        </div>

        <!-- Files -->
        <div
          v-for="file in filteredFiles"
          :key="file.id"
          class="list-row file-row"
          :class="{ selected: selectedItems.includes(file.id) }"
          @click="selectFile(file)"
        >
          <div class="list-col name-col">
            <div class="file-thumbnail">
              <img v-if="isImage(file)" :src="file.url" :alt="file.name" />
              <svg v-else xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                <polyline points="14,2 14,8 20,8"/>
              </svg>
            </div>
            <span>{{ file.name }}</span>
          </div>
          <div class="list-col">{{ file.type }}</div>
          <div class="list-col">{{ formatFileSize(file.size) }}</div>
          <div class="list-col">{{ formatDate(file.uploadedAt) }}</div>
          <div class="list-col">
            <button class="action-btn" @click.stop="showContextMenu($event, file)">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="12" cy="12" r="1"/>
                <circle cx="12" cy="5" r="1"/>
                <circle cx="12" cy="19" r="1"/>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Upload Drop Zone -->
    <div
      v-if="isDragging"
      class="upload-overlay"
      @drop.prevent="handleDrop"
      @dragover.prevent
      @dragleave="isDragging = false"
    >
      <div class="upload-message">
        <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1">
          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
          <polyline points="17,8 12,3 7,8"/>
          <line x1="12" y1="3" x2="12" y2="15"/>
        </svg>
        <h3>Drop files to upload</h3>
        <p>Release to upload files to the current folder</p>
      </div>
    </div>

    <!-- Context Menu -->
    <div
      v-if="contextMenu.show"
      class="context-menu"
      :style="{ top: contextMenu.y + 'px', left: contextMenu.x + 'px' }"
    >
      <button v-if="contextMenu.item?.type === 'folder'" @click="renameItem">Rename</button>
      <button v-if="contextMenu.item?.type !== 'folder'" @click="downloadFile">Download</button>
      <button v-if="contextMenu.item?.type !== 'folder'" @click="copyUrl">Copy URL</button>
      <button @click="deleteItem" class="danger">Delete</button>
    </div>
  </div>
</template>

<script setup lang="ts">
// Reactive data
const viewMode = ref('grid')
const searchQuery = ref('')
const currentFolder = ref('/')
const selectedItems = ref<number[]>([])
const isDragging = ref(false)

const contextMenu = reactive({
  show: false,
  x: 0,
  y: 0,
  item: null as any
})

// Mock data
const folders = reactive([
  {
    id: 1,
    name: 'Projects',
    path: '/projects',
    itemCount: 24,
    modifiedAt: new Date('2024-11-01'),
    type: 'folder'
  },
  {
    id: 2,
    name: 'Team Photos',
    path: '/team',
    itemCount: 12,
    modifiedAt: new Date('2024-10-15'),
    type: 'folder'
  },
  {
    id: 3,
    name: 'Documents',
    path: '/documents',
    itemCount: 8,
    modifiedAt: new Date('2024-10-20'),
    type: 'folder'
  }
])

const files = reactive([
  {
    id: 101,
    name: 'construction-site-1.jpg',
    type: 'image/jpeg',
    size: 2048000,
    url: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=800',
    uploadedAt: new Date('2024-11-05'),
    folder: '/'
  },
  {
    id: 102,
    name: 'project-blueprint.pdf',
    type: 'application/pdf',
    size: 512000,
    url: '/documents/blueprint.pdf',
    uploadedAt: new Date('2024-11-03'),
    folder: '/'
  },
  {
    id: 103,
    name: 'safety-guidelines.docx',
    type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    size: 256000,
    url: '/documents/safety.docx',
    uploadedAt: new Date('2024-11-02'),
    folder: '/'
  },
  {
    id: 104,
    name: 'office-building.jpg',
    type: 'image/jpeg',
    size: 1536000,
    url: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800',
    uploadedAt: new Date('2024-11-01'),
    folder: '/'
  }
])

// Computed properties
const breadcrumbs = computed(() => {
  const parts = currentFolder.value.split('/').filter(part => part)
  const crumbs = [{ name: 'Home', path: '/' }]
  
  let path = ''
  for (const part of parts) {
    path += `/${part}`
    crumbs.push({ name: part, path })
  }
  
  return crumbs
})

const filteredFolders = computed(() => {
  let filtered = folders.filter(folder => folder.path.startsWith(currentFolder.value))
  
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    filtered = filtered.filter(folder => 
      folder.name.toLowerCase().includes(query)
    )
  }
  
  return filtered
})

const filteredFiles = computed(() => {
  let filtered = files.filter(file => file.folder === currentFolder.value)
  
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    filtered = filtered.filter(file => 
      file.name.toLowerCase().includes(query)
    )
  }
  
  return filtered
})

// Methods
const isImage = (file: any) => {
  return file.type.startsWith('image/')
}

const getFileExtension = (filename: string) => {
  return filename.split('.').pop()?.toUpperCase() || ''
}

const getFileTypeClass = (type: string) => {
  if (type.includes('pdf')) return 'pdf'
  if (type.includes('word') || type.includes('document')) return 'doc'
  if (type.includes('excel') || type.includes('spreadsheet')) return 'xls'
  if (type.includes('powerpoint') || type.includes('presentation')) return 'ppt'
  return 'file'
}

const formatFileSize = (bytes: number) => {
  const sizes = ['B', 'KB', 'MB', 'GB']
  if (bytes === 0) return '0 B'
  const i = Math.floor(Math.log(bytes) / Math.log(1024))
  return Math.round(bytes / Math.pow(1024, i) * 100) / 100 + ' ' + sizes[i]
}

const formatDate = (date: Date) => {
  return date.toLocaleDateString('en-US', { 
    month: 'short', 
    day: 'numeric', 
    year: 'numeric' 
  })
}

const navigateToFolder = (path: string) => {
  currentFolder.value = path
}

const openFolder = (folder: any) => {
  currentFolder.value = folder.path
}

const selectFile = (file: any) => {
  const index = selectedItems.value.indexOf(file.id)
  if (index > -1) {
    selectedItems.value.splice(index, 1)
  } else {
    selectedItems.value.push(file.id)
  }
}

const openFile = (file: any) => {
  // TODO: Open file in viewer/editor
  console.log('Opening file:', file.name)
}

const uploadFiles = () => {
  // TODO: Implement file upload
  console.log('Upload files...')
}

const createFolder = () => {
  // TODO: Implement folder creation
  const name = prompt('Folder name:')
  if (name) {
    folders.push({
      id: Math.max(...folders.map(f => f.id)) + 1,
      name,
      path: `${currentFolder.value}${name}`,
      itemCount: 0,
      modifiedAt: new Date(),
      type: 'folder'
    })
  }
}

const showContextMenu = (event: MouseEvent, item: any) => {
  contextMenu.show = true
  contextMenu.x = event.clientX
  contextMenu.y = event.clientY
  contextMenu.item = item
}

const renameItem = () => {
  const newName = prompt('New name:', contextMenu.item.name)
  if (newName) {
    contextMenu.item.name = newName
  }
  contextMenu.show = false
}

const downloadFile = () => {
  // TODO: Implement file download
  console.log('Downloading:', contextMenu.item.name)
  contextMenu.show = false
}

const copyUrl = () => {
  navigator.clipboard.writeText(contextMenu.item.url)
  contextMenu.show = false
}

const deleteItem = () => {
  if (confirm(`Delete ${contextMenu.item.name}?`)) {
    if (contextMenu.item.type === 'folder') {
      const index = folders.findIndex(f => f.id === contextMenu.item.id)
      if (index > -1) folders.splice(index, 1)
    } else {
      const index = files.findIndex(f => f.id === contextMenu.item.id)
      if (index > -1) files.splice(index, 1)
    }
  }
  contextMenu.show = false
}

const handleDrop = (event: DragEvent) => {
  isDragging.value = false
  const droppedFiles = Array.from(event.dataTransfer?.files || [])
  // TODO: Handle file upload
  console.log('Dropped files:', droppedFiles)
}

// Event listeners
onMounted(() => {
  // Hide context menu on click
  document.addEventListener('click', () => {
    contextMenu.show = false
  })
  
  // Drag and drop handlers
  document.addEventListener('dragenter', (e) => {
    e.preventDefault()
    isDragging.value = true
  })
  
  document.addEventListener('dragleave', (e) => {
    if (!e.relatedTarget) {
      isDragging.value = false
    }
  })
})
</script>

<style scoped>
.media-library {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  height: 100vh;
  overflow: hidden;
}

.media-header {
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

.btn-secondary {
  background: white;
  color: #374151;
  border: 1px solid #e5e7eb;
}

.media-toolbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: white;
  padding: 1rem 1.5rem;
  border-radius: 1rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.breadcrumb {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.breadcrumb-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: none;
  border: none;
  color: #6b7280;
  cursor: pointer;
  padding: 0.25rem 0.5rem;
  border-radius: 0.25rem;
  transition: all 0.2s ease;
}

.breadcrumb-item:hover {
  background: #f3f4f6;
  color: #374151;
}

.breadcrumb-item:last-child {
  color: #1a202c;
  font-weight: 500;
}

.toolbar-right {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.view-options {
  display: flex;
  gap: 0.25rem;
}

.view-btn {
  width: 2.5rem;
  height: 2.5rem;
  border: 1px solid #e5e7eb;
  border-radius: 0.375rem;
  background: white;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
}

.view-btn.active {
  background: #3b82f6;
  border-color: #3b82f6;
  color: white;
}

.search-box {
  position: relative;
  display: flex;
  align-items: center;
}

.search-box svg {
  position: absolute;
  left: 1rem;
  color: #9ca3af;
}

.search-box input {
  padding: 0.5rem 1rem 0.5rem 2.5rem;
  border: 1px solid #e5e7eb;
  border-radius: 0.5rem;
  width: 250px;
}

.media-content {
  flex: 1;
  overflow-y: auto;
  background: white;
  border-radius: 1rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.media-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 1rem;
  padding: 1.5rem;
}

.media-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1rem;
  border: 2px solid transparent;
  border-radius: 0.75rem;
  cursor: pointer;
  transition: all 0.2s ease;
}

.media-item:hover {
  background: #f8fafc;
  border-color: #e5e7eb;
}

.media-item.selected {
  background: #eff6ff;
  border-color: #3b82f6;
}

.folder-icon {
  color: #3b82f6;
  margin-bottom: 0.75rem;
}

.file-preview {
  width: 80px;
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 0.75rem;
  border-radius: 0.5rem;
  overflow: hidden;
}

.file-preview img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.file-icon {
  position: relative;
  color: #6b7280;
}

.file-extension {
  position: absolute;
  bottom: -8px;
  right: -8px;
  background: #374151;
  color: white;
  font-size: 0.625rem;
  font-weight: 600;
  padding: 0.125rem 0.25rem;
  border-radius: 0.25rem;
}

.item-info {
  text-align: center;
  width: 100%;
}

.item-name {
  font-size: 0.875rem;
  font-weight: 500;
  color: #1a202c;
  margin: 0 0 0.25rem 0;
  word-break: break-word;
}

.item-details {
  font-size: 0.75rem;
  color: #6b7280;
  margin: 0;
}

.media-list {
  display: flex;
  flex-direction: column;
}

.list-header {
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1fr 0.5fr;
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
  grid-template-columns: 2fr 1fr 1fr 1fr 0.5fr;
  gap: 1rem;
  padding: 1rem 1.5rem;
  border-bottom: 1px solid #f1f5f9;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.list-row:hover {
  background: #f9fafb;
}

.list-row.selected {
  background: #eff6ff;
}

.list-col {
  display: flex;
  align-items: center;
  font-size: 0.875rem;
}

.name-col {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.file-thumbnail {
  width: 2rem;
  height: 2rem;
  border-radius: 0.25rem;
  overflow: hidden;
  flex-shrink: 0;
}

.file-thumbnail img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.action-btn {
  width: 2rem;
  height: 2rem;
  border-radius: 0.25rem;
  border: none;
  background: none;
  cursor: pointer;
  color: #6b7280;
  display: flex;
  align-items: center;
  justify-content: center;
}

.action-btn:hover {
  background: #f3f4f6;
}

.upload-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(59, 130, 246, 0.9);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.upload-message {
  text-align: center;
  color: white;
}

.upload-message svg {
  margin-bottom: 1rem;
}

.upload-message h3 {
  font-size: 1.5rem;
  margin: 0 0 0.5rem 0;
}

.upload-message p {
  margin: 0;
  opacity: 0.8;
}

.context-menu {
  position: fixed;
  background: white;
  border: 1px solid #e5e7eb;
  border-radius: 0.5rem;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
  z-index: 1000;
  min-width: 8rem;
}

.context-menu button {
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

.context-menu button:hover {
  background: #f9fafb;
}

.context-menu button.danger {
  color: #dc2626;
}

/* File type specific styling */
.file-icon.pdf {
  color: #dc2626;
}

.file-icon.doc {
  color: #2563eb;
}

.file-icon.xls {
  color: #16a34a;
}

.file-icon.ppt {
  color: #ea580c;
}

/* Responsive Design */
@media (max-width: 1024px) {
  .media-grid {
    grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  }
  
  .list-header,
  .list-row {
    grid-template-columns: 2fr 1fr 0.5fr;
  }
  
  .list-col:nth-child(2),
  .list-col:nth-child(4) {
    display: none;
  }
}

@media (max-width: 768px) {
  .media-header {
    flex-direction: column;
    align-items: stretch;
  }
  
  .media-toolbar {
    flex-direction: column;
    gap: 1rem;
    align-items: stretch;
  }
  
  .toolbar-right {
    justify-content: space-between;
  }
  
  .search-box input {
    width: 200px;
  }
  
  .media-grid {
    grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
    gap: 0.75rem;
    padding: 1rem;
  }
}
</style>