<template>
  <div class="content-guide">
    <div class="guide-header">
      <h2>Content Management Guide</h2>
      <p>Learn how to manage your website content effectively</p>
    </div>

    <div class="guide-sections">
      <!-- Getting Started -->
      <div class="guide-section">
        <div class="section-header">
          <div class="section-icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
              <polyline points="22,4 12,14.01 9,11.01"/>
            </svg>
          </div>
          <h3>Getting Started</h3>
        </div>
        <div class="steps">
          <div class="step">
            <span class="step-number">1</span>
            <div class="step-content">
              <h4>Access Admin Dashboard</h4>
              <p>Navigate to <code>/admin</code> and login with your credentials</p>
              <NuxtLink to="/admin" class="step-link">Go to Admin Dashboard →</NuxtLink>
            </div>
          </div>
          <div class="step">
            <span class="step-number">2</span>
            <div class="step-content">
              <h4>Open Content Management</h4>
              <p>Click "Content" in the sidebar or go directly to content management</p>
              <NuxtLink to="/admin/content" class="step-link">Open Content Manager →</NuxtLink>
            </div>
          </div>
          <div class="step">
            <span class="step-number">3</span>
            <div class="step-content">
              <h4>Create Your First Content</h4>
              <p>Click "Create Content" button to start writing</p>
              <button class="step-button" @click="createContent">Create Content</button>
            </div>
          </div>
        </div>
      </div>

      <!-- Content Types -->
      <div class="guide-section">
        <div class="section-header">
          <div class="section-icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
              <polyline points="14,2 14,8 20,8"/>
            </svg>
          </div>
          <h3>Content Types You Can Create</h3>
        </div>
        <div class="content-types">
          <div class="content-type">
            <div class="type-icon projects">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M3 21h18"/>
                <path d="M5 21V7l8-4v18"/>
              </svg>
            </div>
            <h4>Project Portfolios</h4>
            <p>Showcase your construction projects with images, descriptions, and case studies</p>
          </div>
          <div class="content-type">
            <div class="type-icon news">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M4 22h16a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v16a2 2 0 0 1-2 2z"/>
                <path d="M6 6h8"/>
                <path d="M6 10h8"/>
                <path d="M6 14h8"/>
                <path d="M6 18h5"/>
              </svg>
            </div>
            <h4>News & Updates</h4>
            <p>Share company news, industry insights, and project updates</p>
          </div>
          <div class="content-type">
            <div class="type-icon services">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
              </svg>
            </div>
            <h4>Service Pages</h4>
            <p>Detail your construction services, capabilities, and expertise</p>
          </div>
          <div class="content-type">
            <div class="type-icon about">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                <circle cx="12" cy="7" r="4"/>
              </svg>
            </div>
            <h4>About Pages</h4>
            <p>Company information, team profiles, and corporate content</p>
          </div>
        </div>
      </div>

      <!-- Quick Actions -->
      <div class="guide-section">
        <div class="section-header">
          <div class="section-icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="12" cy="12" r="3"/>
              <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1 1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/>
            </svg>
          </div>
          <h3>Quick Actions</h3>
        </div>
        <div class="quick-actions">
          <NuxtLink to="/admin/content" class="action-card">
            <div class="action-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                <polyline points="14,2 14,8 20,8"/>
              </svg>
            </div>
            <h4>Manage Content</h4>
            <p>View, edit, and organize all your content</p>
          </NuxtLink>
          
          <NuxtLink to="/admin/media" class="action-card">
            <div class="action-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
                <circle cx="9" cy="9" r="2"/>
                <path d="M21 15l-3.086-3.086a2 2 0 0 0-2.828 0L6 21"/>
              </svg>
            </div>
            <h4>Media Library</h4>
            <p>Upload and manage images, documents, and files</p>
          </NuxtLink>
          
          <button @click="createContent" class="action-card">
            <div class="action-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M12 5v14m7-7H5"/>
              </svg>
            </div>
            <h4>Create Content</h4>
            <p>Start writing new content for your website</p>
          </button>
        </div>
      </div>

      <!-- Features Overview -->
      <div class="guide-section">
        <div class="section-header">
          <div class="section-icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <polyline points="22,12 18,12 15,21 9,3 6,12 2,12"/>
            </svg>
          </div>
          <h3>Content Management Features</h3>
        </div>
        <div class="features-grid">
          <div class="feature">
            <h4>Rich Text Editor</h4>
            <p>Format text, add headings, lists, links, and images with an intuitive toolbar</p>
          </div>
          <div class="feature">
            <h4>SEO Optimization</h4>
            <p>Set meta titles, descriptions, and URL slugs for better search engine visibility</p>
          </div>
          <div class="feature">
            <h4>Media Integration</h4>
            <p>Upload and insert images directly into your content with drag & drop support</p>
          </div>
          <div class="feature">
            <h4>Publishing Controls</h4>
            <p>Save as draft, schedule publishing, and manage content status and categories</p>
          </div>
          <div class="feature">
            <h4>Content Organization</h4>
            <p>Use tags and categories to organize content and make it easy to find</p>
          </div>
          <div class="feature">
            <h4>Preview & Statistics</h4>
            <p>Preview your content before publishing and track word count and reading time</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const createContent = () => {
  // Navigate to content creation
  navigateTo('/admin/content/new')
}
</script>

<style scoped>
.content-guide {
  max-width: 1000px;
  margin: 0 auto;
  padding: 2rem;
  background: white;
  border-radius: 1rem;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
}

.guide-header {
  text-align: center;
  margin-bottom: 3rem;
}

.guide-header h2 {
  font-size: 2.5rem;
  font-weight: 700;
  color: #1a202c;
  margin: 0 0 1rem 0;
}

.guide-header p {
  font-size: 1.125rem;
  color: #6b7280;
  margin: 0;
}

.guide-sections {
  display: flex;
  flex-direction: column;
  gap: 3rem;
}

.guide-section {
  border: 1px solid #e5e7eb;
  border-radius: 1rem;
  padding: 2rem;
  background: #f8fafc;
}

.section-header {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 2rem;
}

.section-icon {
  width: 3rem;
  height: 3rem;
  background: linear-gradient(135deg, #3b82f6, #1d4ed8);
  border-radius: 0.75rem;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
}

.section-header h3 {
  font-size: 1.5rem;
  font-weight: 600;
  color: #1a202c;
  margin: 0;
}

.steps {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.step {
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  background: white;
  padding: 1.5rem;
  border-radius: 0.75rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.step-number {
  width: 2rem;
  height: 2rem;
  background: #3b82f6;
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  flex-shrink: 0;
}

.step-content h4 {
  font-size: 1.125rem;
  font-weight: 600;
  color: #1a202c;
  margin: 0 0 0.5rem 0;
}

.step-content p {
  color: #6b7280;
  margin: 0 0 1rem 0;
  line-height: 1.5;
}

.step-content code {
  background: #f3f4f6;
  padding: 0.125rem 0.375rem;
  border-radius: 0.25rem;
  font-family: monospace;
  font-size: 0.875rem;
  color: #374151;
}

.step-link {
  color: #3b82f6;
  text-decoration: none;
  font-weight: 500;
  font-size: 0.875rem;
}

.step-link:hover {
  text-decoration: underline;
}

.step-button {
  background: linear-gradient(135deg, #3b82f6, #1d4ed8);
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 0.375rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
}

.step-button:hover {
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(59, 130, 246, 0.4);
}

.content-types {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
}

.content-type {
  background: white;
  padding: 1.5rem;
  border-radius: 0.75rem;
  text-align: center;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.type-icon {
  width: 3rem;
  height: 3rem;
  border-radius: 0.75rem;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 1rem auto;
  color: white;
}

.type-icon.projects {
  background: linear-gradient(135deg, #3b82f6, #1d4ed8);
}

.type-icon.news {
  background: linear-gradient(135deg, #10b981, #059669);
}

.type-icon.services {
  background: linear-gradient(135deg, #f59e0b, #d97706);
}

.type-icon.about {
  background: linear-gradient(135deg, #8b5cf6, #7c3aed);
}

.content-type h4 {
  font-size: 1.125rem;
  font-weight: 600;
  color: #1a202c;
  margin: 0 0 0.5rem 0;
}

.content-type p {
  color: #6b7280;
  margin: 0;
  font-size: 0.875rem;
  line-height: 1.4;
}

.quick-actions {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1.5rem;
}

.action-card {
  background: white;
  padding: 1.5rem;
  border-radius: 0.75rem;
  text-decoration: none;
  color: inherit;
  border: 2px solid transparent;
  transition: all 0.2s ease;
  text-align: center;
  cursor: pointer;
  border: none;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.action-card:hover {
  border-color: #3b82f6;
  transform: translateY(-2px);
  box-shadow: 0 8px 25px -5px rgba(0, 0, 0, 0.1);
}

.action-icon {
  width: 3rem;
  height: 3rem;
  background: linear-gradient(135deg, #3b82f6, #1d4ed8);
  border-radius: 0.75rem;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 1rem auto;
  color: white;
}

.action-card h4 {
  font-size: 1.125rem;
  font-weight: 600;
  color: #1a202c;
  margin: 0 0 0.5rem 0;
}

.action-card p {
  color: #6b7280;
  margin: 0;
  font-size: 0.875rem;
  line-height: 1.4;
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
}

.feature {
  background: white;
  padding: 1.5rem;
  border-radius: 0.75rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.feature h4 {
  font-size: 1.125rem;
  font-weight: 600;
  color: #1a202c;
  margin: 0 0 0.5rem 0;
}

.feature p {
  color: #6b7280;
  margin: 0;
  font-size: 0.875rem;
  line-height: 1.4;
}

/* Responsive Design */
@media (max-width: 768px) {
  .content-guide {
    padding: 1rem;
  }
  
  .guide-header h2 {
    font-size: 2rem;
  }
  
  .content-types,
  .quick-actions,
  .features-grid {
    grid-template-columns: 1fr;
  }
  
  .step {
    flex-direction: column;
    text-align: center;
  }
}
</style>