<template>
  <div class="content-editor">
    <!-- Editor Header -->
    <div class="editor-header">
      <div class="header-nav">
        <button class="back-btn" @click="goBack">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M19 12H5m7 7l-7-7 7-7"/>
          </svg>
          Back to Content
        </button>
        <div class="breadcrumb">
          <span>Content</span>
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <polyline points="9,18 15,12 9,6"/>
          </svg>
          <span>{{ isEditing ? 'Edit' : 'Create' }}</span>
        </div>
      </div>
      
      <div class="header-actions">
        <button class="btn-secondary" @click="saveAsDraft">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"/>
            <polyline points="17,21 17,13 7,13 7,21"/>
            <polyline points="7,3 7,8 15,8"/>
          </svg>
          Save Draft
        </button>
        <button class="btn-primary" @click="publish">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <polyline points="22,12 18,12 15,21 9,3 6,12 2,12"/>
          </svg>
          {{ form.status === 'published' ? 'Update' : 'Publish' }}
        </button>
      </div>
    </div>

    <!-- Editor Content -->
    <div class="editor-content">
      <!-- Main Editor -->
      <div class="editor-main">
        <!-- Title Section -->
        <div class="title-section">
          <input
            v-model="form.title"
            type="text"
            placeholder="Enter your title here..."
            class="title-input"
            @input="generateSlug"
          >
          <div class="slug-section">
            <label for="slug">URL Slug:</label>
            <input
              id="slug"
              v-model="form.slug"
              type="text"
              class="slug-input"
              placeholder="url-slug"
            >
          </div>
        </div>

        <!-- Excerpt Section -->
        <div class="excerpt-section">
          <label for="excerpt">Excerpt</label>
          <textarea
            id="excerpt"
            v-model="form.excerpt"
            placeholder="Brief description of the content..."
            class="excerpt-textarea"
            rows="3"
          ></textarea>
        </div>

        <!-- Content Editor -->
        <div class="content-section">
          <div class="editor-toolbar">
            <div class="toolbar-group">
              <button class="toolbar-btn" @click="formatText('bold')" title="Bold">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M6 4h8a4 4 0 0 1 4 4 4 4 0 0 1-4 4H6z"/>
                  <path d="M6 12h9a4 4 0 0 1 4 4 4 4 0 0 1-4 4H6z"/>
                </svg>
              </button>
              <button class="toolbar-btn" @click="formatText('italic')" title="Italic">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <line x1="19" y1="4" x2="10" y2="4"/>
                  <line x1="14" y1="20" x2="5" y2="20"/>
                  <line x1="15" y1="4" x2="9" y2="20"/>
                </svg>
              </button>
              <button class="toolbar-btn" @click="formatText('underline')" title="Underline">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M6 3v7a6 6 0 0 0 6 6 6 6 0 0 0 6-6V3"/>
                  <line x1="4" y1="21" x2="20" y2="21"/>
                </svg>
              </button>
            </div>
            
            <div class="toolbar-group">
              <button class="toolbar-btn" @click="insertHeading('h2')" title="Heading 2">H2</button>
              <button class="toolbar-btn" @click="insertHeading('h3')" title="Heading 3">H3</button>
            </div>
            
            <div class="toolbar-group">
              <button class="toolbar-btn" @click="insertList('ul')" title="Bullet List">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <line x1="8" y1="6" x2="21" y2="6"/>
                  <line x1="8" y1="12" x2="21" y2="12"/>
                  <line x1="8" y1="18" x2="21" y2="18"/>
                  <line x1="3" y1="6" x2="3.01" y2="6"/>
                  <line x1="3" y1="12" x2="3.01" y2="12"/>
                  <line x1="3" y1="18" x2="3.01" y2="18"/>
                </svg>
              </button>
              <button class="toolbar-btn" @click="insertList('ol')" title="Numbered List">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <line x1="10" y1="6" x2="21" y2="6"/>
                  <line x1="10" y1="12" x2="21" y2="12"/>
                  <line x1="10" y1="18" x2="21" y2="18"/>
                  <line x1="4" y1="6" x2="4" y2="6"/>
                  <line x1="4" y1="12" x2="4" y2="12"/>
                  <line x1="4" y1="18" x2="4" y2="18"/>
                </svg>
              </button>
            </div>
            
            <div class="toolbar-group">
              <button class="toolbar-btn" @click="insertLink" title="Insert Link">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/>
                  <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/>
                </svg>
              </button>
              <button class="toolbar-btn" @click="insertImage" title="Insert Image">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
                  <circle cx="9" cy="9" r="2"/>
                  <path d="M21 15l-3.086-3.086a2 2 0 0 0-2.828 0L6 21"/>
                </svg>
              </button>
            </div>
            
            <div class="toolbar-group">
              <button class="toolbar-btn" @click="togglePreview" title="Toggle Preview">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                  <circle cx="12" cy="12" r="3"/>
                </svg>
              </button>
            </div>
          </div>
          
          <div class="editor-body">
            <textarea
              v-if="!showPreview"
              ref="contentEditor"
              v-model="form.content"
              class="content-textarea"
              placeholder="Start writing your content here..."
            ></textarea>
            
            <div v-else class="content-preview" v-html="renderedContent"></div>
          </div>
        </div>

        <!-- SEO Section -->
        <div class="seo-section">
          <h3 class="section-title">SEO Settings</h3>
          <div class="seo-fields">
            <div class="field-group">
              <label for="meta-title">Meta Title</label>
              <input
                id="meta-title"
                v-model="form.metaTitle"
                type="text"
                placeholder="SEO title for search engines"
                maxlength="60"
              >
              <small>{{ form.metaTitle?.length || 0 }}/60 characters</small>
            </div>
            
            <div class="field-group">
              <label for="meta-description">Meta Description</label>
              <textarea
                id="meta-description"
                v-model="form.metaDescription"
                placeholder="Brief description for search engine results"
                maxlength="160"
                rows="3"
              ></textarea>
              <small>{{ form.metaDescription?.length || 0 }}/160 characters</small>
            </div>
          </div>
        </div>
      </div>

      <!-- Sidebar -->
      <div class="editor-sidebar">
        <!-- Publish Settings -->
        <div class="sidebar-section">
          <h3 class="section-title">Publish Settings</h3>
          <div class="publish-fields">
            <div class="field-group">
              <label for="status">Status</label>
              <select id="status" v-model="form.status">
                <option value="draft">Draft</option>
                <option value="published">Published</option>
                <option value="archived">Archived</option>
              </select>
            </div>
            
            <div class="field-group">
              <label for="category">Category</label>
              <select id="category" v-model="form.category">
                <option value="projects">Projects</option>
                <option value="news">News</option>
                <option value="services">Services</option>
                <option value="about">About</option>
              </select>
            </div>
            
            <div class="field-group">
              <label for="author">Author</label>
              <input
                id="author"
                v-model="form.author"
                type="text"
                placeholder="Content author"
              >
            </div>
            
            <div class="field-group">
              <label for="publish-date">Publish Date</label>
              <input
                id="publish-date"
                v-model="form.publishDate"
                type="datetime-local"
              >
            </div>
          </div>
        </div>

        <!-- Featured Image -->
        <div class="sidebar-section">
          <h3 class="section-title">Featured Image</h3>
          <div class="image-upload">
            <div v-if="form.featuredImage" class="image-preview">
              <img :src="form.featuredImage" alt="Featured image" />
              <button class="remove-image" @click="removeFeaturedImage">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <line x1="18" y1="6" x2="6" y2="18"/>
                  <line x1="6" y1="6" x2="18" y2="18"/>
                </svg>
              </button>
            </div>
            <button v-else class="upload-btn" @click="uploadImage">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
                <circle cx="9" cy="9" r="2"/>
                <path d="M21 15l-3.086-3.086a2 2 0 0 0-2.828 0L6 21"/>
              </svg>
              Upload Image
            </button>
          </div>
        </div>

        <!-- Tags -->
        <div class="sidebar-section">
          <h3 class="section-title">Tags</h3>
          <div class="tags-input">
            <div class="tags-list">
              <span v-for="(tag, index) in form.tags" :key="index" class="tag">
                {{ tag }}
                <button @click="removeTag(index)">
                  <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <line x1="18" y1="6" x2="6" y2="18"/>
                    <line x1="6" y1="6" x2="18" y2="18"/>
                  </svg>
                </button>
              </span>
            </div>
            <input
              v-model="newTag"
              type="text"
              placeholder="Add tag..."
              @keydown.enter.prevent="addTag"
              @keydown.comma.prevent="addTag"
            >
          </div>
        </div>

        <!-- Content Stats -->
        <div class="sidebar-section">
          <h3 class="section-title">Content Statistics</h3>
          <div class="content-stats">
            <div class="stat-item">
              <span class="stat-label">Words</span>
              <span class="stat-value">{{ wordCount }}</span>
            </div>
            <div class="stat-item">
              <span class="stat-label">Characters</span>
              <span class="stat-value">{{ characterCount }}</span>
            </div>
            <div class="stat-item">
              <span class="stat-label">Reading Time</span>
              <span class="stat-value">{{ readingTime }} min</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// Simple markdown renderer (basic implementation)
const renderMarkdown = (content: string) => {
  return content
    .replace(/^### (.*$)/gim, '<h3>$1</h3>')
    .replace(/^## (.*$)/gim, '<h2>$1</h2>')
    .replace(/^# (.*$)/gim, '<h1>$1</h1>')
    .replace(/\*\*(.*)\*\*/gim, '<strong>$1</strong>')
    .replace(/\*(.*)\*/gim, '<em>$1</em>')
    .replace(/!\[([^\]]*)\]\(([^)]+)\)/gim, '<img alt="$1" src="$2" />')
    .replace(/\[([^\]]+)\]\(([^)]+)\)/gim, '<a href="$2">$1</a>')
    .replace(/^\- (.*)$/gim, '<li>$1</li>')
    .replace(/(<li>.*<\/li>)/gims, '<ul>$1</ul>')
    .replace(/\n/gim, '<br />')
}

// Props
interface Props {
  contentId?: string | number
}

const props = defineProps<Props>()

// Reactive data
const isEditing = computed(() => !!props.contentId)
const showPreview = ref(false)
const newTag = ref('')

const form = reactive({
  title: '',
  slug: '',
  excerpt: '',
  content: '',
  status: 'draft',
  category: 'projects',
  author: 'Admin User',
  publishDate: new Date().toISOString().slice(0, 16),
  featuredImage: '',
  tags: [] as string[],
  metaTitle: '',
  metaDescription: ''
})

// Computed properties
const wordCount = computed(() => {
  return form.content.trim().split(/\s+/).filter(word => word.length > 0).length
})

const characterCount = computed(() => {
  return form.content.length
})

const readingTime = computed(() => {
  return Math.ceil(wordCount.value / 200) // Average reading speed
})

const renderedContent = computed(() => {
  return renderMarkdown(form.content)
})

// Methods
const generateSlug = () => {
  if (!form.slug && form.title) {
    form.slug = form.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '')
  }
}

const formatText = (command: string) => {
  const textarea = unref(contentEditor)
  if (!textarea) return
  
  document.execCommand(command, false)
}

const insertHeading = (level: string) => {
  const textarea = unref(contentEditor)
  if (!textarea) return
  
  const start = textarea.selectionStart
  const end = textarea.selectionEnd
  const selectedText = textarea.value.substring(start, end)
  const headingText = selectedText || 'Heading'
  const markdownHeading = level === 'h2' ? `## ${headingText}` : `### ${headingText}`
  
  textarea.setRangeText(markdownHeading, start, end)
}

const insertList = (type: string) => {
  const textarea = unref(contentEditor)
  if (!textarea) return
  
  const start = textarea.selectionStart
  const marker = type === 'ul' ? '- ' : '1. '
  textarea.setRangeText(`${marker}List item`, start, start)
}

const insertLink = () => {
  const textarea = unref(contentEditor)
  if (!textarea) return
  
  const start = textarea.selectionStart
  const end = textarea.selectionEnd
  const selectedText = textarea.value.substring(start, end)
  const linkText = selectedText || 'Link text'
  const markdown = `[${linkText}](https://example.com)`
  
  textarea.setRangeText(markdown, start, end)
}

const insertImage = () => {
  const textarea = unref(contentEditor)
  if (!textarea) return
  
  const start = textarea.selectionStart
  const markdown = '![Alt text](https://example.com/image.jpg)'
  
  textarea.setRangeText(markdown, start, start)
}

const togglePreview = () => {
  showPreview.value = !showPreview.value
}

const addTag = () => {
  if (newTag.value.trim() && !form.tags.includes(newTag.value.trim())) {
    form.tags.push(newTag.value.trim())
    newTag.value = ''
  }
}

const removeTag = (index: number) => {
  form.tags.splice(index, 1)
}

const uploadImage = () => {
  // TODO: Implement image upload
  console.log('Upload image...')
}

const removeFeaturedImage = () => {
  form.featuredImage = ''
}

const saveAsDraft = () => {
  form.status = 'draft'
  save()
}

const publish = () => {
  form.status = 'published'
  save()
}

const save = () => {
  // TODO: Implement save functionality
  console.log('Saving content:', form)
}

const goBack = () => {
  // TODO: Navigate back to content list
  console.log('Going back...')
}

// Template refs
const contentEditor = ref<HTMLTextAreaElement>()

// Load content if editing
onMounted(() => {
  if (isEditing.value) {
    // TODO: Load existing content
    console.log('Loading content:', props.contentId)
  }
})
</script>

<style scoped>
.content-editor {
  display: flex;
  flex-direction: column;
  height: 100vh;
  background: #f8fafc;
}

.editor-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  background: white;
  border-bottom: 1px solid #e5e7eb;
}

.header-nav {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.back-btn {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  border: 1px solid #e5e7eb;
  border-radius: 0.5rem;
  background: white;
  cursor: pointer;
  color: #374151;
  text-decoration: none;
  transition: all 0.2s ease;
}

.back-btn:hover {
  background: #f9fafb;
}

.breadcrumb {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #6b7280;
  font-size: 0.875rem;
}

.header-actions {
  display: flex;
  gap: 1rem;
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

.editor-content {
  display: flex;
  flex: 1;
  overflow: hidden;
}

.editor-main {
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  padding: 2rem;
  gap: 2rem;
}

.title-section {
  background: white;
  border-radius: 1rem;
  padding: 1.5rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.title-input {
  width: 100%;
  border: none;
  outline: none;
  font-size: 2rem;
  font-weight: 700;
  color: #1a202c;
  background: transparent;
  margin-bottom: 1rem;
}

.title-input::placeholder {
  color: #d1d5db;
}

.slug-section {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.slug-section label {
  font-weight: 500;
  color: #374151;
  white-space: nowrap;
}

.slug-input {
  flex: 1;
  padding: 0.5rem 1rem;
  border: 1px solid #e5e7eb;
  border-radius: 0.5rem;
  font-family: monospace;
  font-size: 0.875rem;
}

.excerpt-section {
  background: white;
  border-radius: 1rem;
  padding: 1.5rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.excerpt-section label {
  display: block;
  font-weight: 500;
  color: #374151;
  margin-bottom: 0.5rem;
}

.excerpt-textarea {
  width: 100%;
  border: 1px solid #e5e7eb;
  border-radius: 0.5rem;
  padding: 1rem;
  resize: vertical;
  font-family: inherit;
}

.content-section {
  background: white;
  border-radius: 1rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  flex: 1;
  display: flex;
  flex-direction: column;
}

.editor-toolbar {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem 1.5rem;
  border-bottom: 1px solid #e5e7eb;
  background: #f8fafc;
}

.toolbar-group {
  display: flex;
  align-items: center;
  gap: 0.25rem;
}

.toolbar-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2.5rem;
  height: 2.5rem;
  border: 1px solid #e5e7eb;
  border-radius: 0.375rem;
  background: white;
  cursor: pointer;
  transition: all 0.2s ease;
  color: #374151;
}

.toolbar-btn:hover {
  background: #f3f4f6;
}

.editor-body {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.content-textarea {
  flex: 1;
  border: none;
  outline: none;
  padding: 1.5rem;
  font-family: inherit;
  font-size: 1rem;
  line-height: 1.6;
  resize: none;
}

.content-preview {
  flex: 1;
  padding: 1.5rem;
  overflow-y: auto;
  line-height: 1.6;
}

.seo-section {
  background: white;
  border-radius: 1rem;
  padding: 1.5rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.section-title {
  font-size: 1.125rem;
  font-weight: 600;
  color: #1a202c;
  margin: 0 0 1rem 0;
}

.seo-fields {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.field-group {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.field-group label {
  font-weight: 500;
  color: #374151;
  font-size: 0.875rem;
}

.field-group input,
.field-group textarea,
.field-group select {
  padding: 0.75rem 1rem;
  border: 1px solid #e5e7eb;
  border-radius: 0.5rem;
  font-size: 0.875rem;
}

.field-group small {
  color: #6b7280;
  font-size: 0.75rem;
}

.editor-sidebar {
  width: 320px;
  background: white;
  border-left: 1px solid #e5e7eb;
  overflow-y: auto;
  padding: 2rem 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.sidebar-section {
  background: #f8fafc;
  border-radius: 1rem;
  padding: 1.5rem;
}

.publish-fields {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.image-upload {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
}

.image-preview {
  position: relative;
  width: 100%;
  border-radius: 0.5rem;
  overflow: hidden;
}

.image-preview img {
  width: 100%;
  height: auto;
  display: block;
}

.remove-image {
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
  width: 2rem;
  height: 2rem;
  border-radius: 50%;
  background: rgba(0, 0, 0, 0.5);
  border: none;
  color: white;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
}

.upload-btn {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  padding: 2rem;
  border: 2px dashed #d1d5db;
  border-radius: 0.5rem;
  background: white;
  cursor: pointer;
  color: #6b7280;
  transition: all 0.2s ease;
  width: 100%;
}

.upload-btn:hover {
  border-color: #3b82f6;
  color: #3b82f6;
}

.tags-input {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.tags-list {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.tag {
  display: flex;
  align-items: center;
  gap: 0.25rem;
  background: #e5e7eb;
  color: #374151;
  padding: 0.25rem 0.5rem;
  border-radius: 0.25rem;
  font-size: 0.75rem;
}

.tag button {
  background: none;
  border: none;
  cursor: pointer;
  color: #6b7280;
  padding: 0;
  display: flex;
  align-items: center;
}

.tags-input input {
  padding: 0.5rem 0.75rem;
  border: 1px solid #e5e7eb;
  border-radius: 0.25rem;
  font-size: 0.875rem;
}

.content-stats {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.stat-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.stat-label {
  color: #6b7280;
  font-size: 0.875rem;
}

.stat-value {
  font-weight: 600;
  color: #1a202c;
}

/* Responsive Design */
@media (max-width: 1024px) {
  .editor-content {
    flex-direction: column;
  }
  
  .editor-sidebar {
    width: 100%;
    border-left: none;
    border-top: 1px solid #e5e7eb;
  }
}

@media (max-width: 768px) {
  .editor-header {
    flex-direction: column;
    gap: 1rem;
    align-items: stretch;
  }
  
  .header-actions {
    justify-content: center;
  }
  
  .editor-main {
    padding: 1rem;
  }
  
  .toolbar-group {
    flex-wrap: wrap;
  }
}
</style>