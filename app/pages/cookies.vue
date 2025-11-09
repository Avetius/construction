<template>
  <div class="legal-page">
    <!-- Header -->
    <Header />
    
    <!-- Legal Content -->
    <div class="legal-content">
      <div class="container">
        <div class="legal-header">
          <h1>Cookie Policy</h1>
          <p class="last-updated">Last updated: November 8, 2025</p>
          <p class="intro">
            This Cookie Policy explains how Construction uses cookies and similar technologies when you visit our website. 
            It explains what these technologies are, why we use them, and your rights to control our use of them.
          </p>
        </div>

        <div class="legal-sections">
          <!-- Table of Contents -->
          <div class="table-of-contents">
            <h2>Table of Contents</h2>
            <ul>
              <li><a href="#what-are-cookies">What Are Cookies?</a></li>
              <li><a href="#types-of-cookies">Types of Cookies We Use</a></li>
              <li><a href="#essential-cookies">Essential Cookies</a></li>
              <li><a href="#performance-cookies">Performance Cookies</a></li>
              <li><a href="#functional-cookies">Functional Cookies</a></li>
              <li><a href="#marketing-cookies">Marketing Cookies</a></li>
              <li><a href="#third-party-cookies">Third-Party Cookies</a></li>
              <li><a href="#cookie-consent">Cookie Consent</a></li>
              <li><a href="#manage-cookies">How to Manage Cookies</a></li>
              <li><a href="#browser-settings">Browser Settings</a></li>
              <li><a href="#mobile-settings">Mobile Device Settings</a></li>
              <li><a href="#changes">Changes to This Policy</a></li>
              <li><a href="#contact">Contact Information</a></li>
            </ul>
          </div>

          <!-- Content Sections -->
          <section id="what-are-cookies" class="legal-section">
            <h2>1. What Are Cookies?</h2>
            <p>
              Cookies are small text files that are stored on your computer or mobile device when you visit a website. 
              They are widely used to make websites work more efficiently and provide information to website owners.
            </p>

            <h3>How Cookies Work</h3>
            <ul>
              <li>Cookies are created when your browser loads our website</li>
              <li>The website sends information to the browser, which then creates a text file</li>
              <li>Every time you visit the same website, the browser retrieves and sends this file back</li>
              <li>Cookies help websites remember information about your visit</li>
            </ul>

            <h3>Similar Technologies</h3>
            <p>In addition to cookies, we may also use similar technologies such as:</p>
            <ul>
              <li><strong>Web Beacons:</strong> Small graphic images that help us analyze website usage</li>
              <li><strong>Local Storage:</strong> HTML5 technology that stores data in your browser</li>
              <li><strong>Session Storage:</strong> Temporary storage that expires when you close your browser</li>
              <li><strong>Pixels:</strong> Tiny invisible images used for tracking and analytics</li>
            </ul>

            <div class="info-box">
              <h3>Important Note</h3>
              <p>
                When we refer to "cookies" in this policy, we include all similar tracking technologies 
                unless specifically stated otherwise.
              </p>
            </div>
          </section>

          <section id="types-of-cookies" class="legal-section">
            <h2>2. Types of Cookies We Use</h2>
            <p>We categorize cookies based on their purpose and how long they remain on your device:</p>

            <h3>By Duration</h3>
            <div class="cookie-types">
              <div class="cookie-type">
                <h4>Session Cookies</h4>
                <p>These are temporary cookies that expire when you close your browser. They help us:</p>
                <ul>
                  <li>Remember your preferences during your visit</li>
                  <li>Keep you logged in as you navigate between pages</li>
                  <li>Maintain shopping cart contents</li>
                  <li>Ensure website security</li>
                </ul>
              </div>

              <div class="cookie-type">
                <h4>Persistent Cookies</h4>
                <p>These cookies remain on your device for a set period or until you delete them. They help us:</p>
                <ul>
                  <li>Remember your preferences for future visits</li>
                  <li>Analyze how you use our website over time</li>
                  <li>Provide personalized content and recommendations</li>
                  <li>Improve website performance and user experience</li>
                </ul>
              </div>
            </div>

            <h3>By Origin</h3>
            <div class="cookie-types">
              <div class="cookie-type">
                <h4>First-Party Cookies</h4>
                <p>Set directly by our website. We have full control over these cookies and their data.</p>
              </div>

              <div class="cookie-type">
                <h4>Third-Party Cookies</h4>
                <p>Set by external services we use, such as analytics providers or advertising networks.</p>
              </div>
            </div>
          </section>

          <section id="essential-cookies" class="legal-section">
            <h2>3. Essential Cookies</h2>
            <p>
              These cookies are strictly necessary for our website to function properly. 
              They cannot be disabled without severely affecting the usability of our site.
            </p>

            <h3>What Essential Cookies Do</h3>
            <ul>
              <li>Enable basic website functionality</li>
              <li>Remember your login status</li>
              <li>Maintain security features</li>
              <li>Store items in your shopping cart</li>
              <li>Remember form data as you complete multi-step forms</li>
              <li>Load balance traffic across our servers</li>
            </ul>

            <div class="cookie-table">
              <h3>Essential Cookies We Use</h3>
              <table>
                <thead>
                  <tr>
                    <th>Cookie Name</th>
                    <th>Purpose</th>
                    <th>Duration</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>session_id</td>
                    <td>Maintains your session while browsing</td>
                    <td>Session</td>
                  </tr>
                  <tr>
                    <td>csrf_token</td>
                    <td>Security protection against cross-site attacks</td>
                    <td>Session</td>
                  </tr>
                  <tr>
                    <td>load_balancer</td>
                    <td>Directs traffic to appropriate server</td>
                    <td>Session</td>
                  </tr>
                  <tr>
                    <td>auth_token</td>
                    <td>Keeps you logged in</td>
                    <td>30 days</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div class="legal-basis">
              <h3>Legal Basis</h3>
              <p>
                Essential cookies are used based on our legitimate interest in providing a functional website. 
                No consent is required for these cookies under applicable privacy laws.
              </p>
            </div>
          </section>

          <section id="performance-cookies" class="legal-section">
            <h2>4. Performance Cookies</h2>
            <p>
              These cookies collect information about how you use our website, such as which pages you visit 
              and if you encounter any error messages. This information helps us improve our website.
            </p>

            <h3>Performance Data We Collect</h3>
            <ul>
              <li>Pages visited and time spent on each page</li>
              <li>Links clicked and buttons pressed</li>
              <li>Error messages encountered</li>
              <li>Website loading times and performance metrics</li>
              <li>Browser and device information</li>
              <li>Traffic sources and referral information</li>
            </ul>

            <div class="cookie-table">
              <h3>Performance Cookies We Use</h3>
              <table>
                <thead>
                  <tr>
                    <th>Service</th>
                    <th>Cookie Names</th>
                    <th>Purpose</th>
                    <th>Duration</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Google Analytics</td>
                    <td>_ga, _gid, _gat</td>
                    <td>Website usage analytics</td>
                    <td>2 years / 24 hours / 1 minute</td>
                  </tr>
                  <tr>
                    <td>Internal Analytics</td>
                    <td>analytics_session</td>
                    <td>Track user journey and behavior</td>
                    <td>30 days</td>
                  </tr>
                  <tr>
                    <td>Performance Monitoring</td>
                    <td>perf_monitor</td>
                    <td>Monitor website performance</td>
                    <td>7 days</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div class="data-protection">
              <h3>Data Protection</h3>
              <p>All performance data is:</p>
              <ul>
                <li>Anonymized and aggregated</li>
                <li>Used only for website improvement</li>
                <li>Not linked to personally identifiable information</li>
                <li>Retained for a maximum of 26 months</li>
              </ul>
            </div>
          </section>

          <section id="functional-cookies" class="legal-section">
            <h2>5. Functional Cookies</h2>
            <p>
              These cookies allow our website to remember choices you make and provide enhanced, 
              more personal features.
            </p>

            <h3>Functional Features</h3>
            <ul>
              <li>Remember your preferred language</li>
              <li>Store your location for relevant content</li>
              <li>Remember accessibility settings</li>
              <li>Customize content based on your preferences</li>
              <li>Remember form data to save you time</li>
              <li>Provide social media integration</li>
            </ul>

            <div class="cookie-table">
              <h3>Functional Cookies We Use</h3>
              <table>
                <thead>
                  <tr>
                    <th>Cookie Name</th>
                    <th>Purpose</th>
                    <th>Duration</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>user_preferences</td>
                    <td>Stores your website preferences</td>
                    <td>1 year</td>
                  </tr>
                  <tr>
                    <td>language_setting</td>
                    <td>Remembers your language choice</td>
                    <td>1 year</td>
                  </tr>
                  <tr>
                    <td>accessibility_settings</td>
                    <td>Stores accessibility preferences</td>
                    <td>1 year</td>
                  </tr>
                  <tr>
                    <td>form_data</td>
                    <td>Saves partial form submissions</td>
                    <td>30 days</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <p class="consent-note">
              <strong>Consent:</strong> We will ask for your consent before using functional cookies. 
              You can withdraw consent at any time through our cookie preference center.
            </p>
          </section>

          <section id="marketing-cookies" class="legal-section">
            <h2>6. Marketing Cookies</h2>
            <p>
              These cookies track your online activity to help advertisers deliver more relevant advertising 
              or to limit how many times you see an advertisement.
            </p>

            <h3>Marketing Activities</h3>
            <ul>
              <li>Display relevant advertisements on other websites</li>
              <li>Measure the effectiveness of advertising campaigns</li>
              <li>Limit the number of times you see the same ad</li>
              <li>Provide personalized content recommendations</li>
              <li>Track conversion rates from advertising</li>
              <li>Build audience segments for targeted marketing</li>
            </ul>

            <div class="cookie-table">
              <h3>Marketing Cookies We Use</h3>
              <table>
                <thead>
                  <tr>
                    <th>Service</th>
                    <th>Cookie Names</th>
                    <th>Purpose</th>
                    <th>Duration</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Google Ads</td>
                    <td>_gcl_au, IDE</td>
                    <td>Ad personalization and measurement</td>
                    <td>90 days / 2 years</td>
                  </tr>
                  <tr>
                    <td>Facebook Pixel</td>
                    <td>_fbp, _fbc</td>
                    <td>Social media advertising</td>
                    <td>90 days</td>
                  </tr>
                  <tr>
                    <td>LinkedIn Insight</td>
                    <td>_linkedin_shared</td>
                    <td>Professional network advertising</td>
                    <td>1 year</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div class="consent-required">
              <h3>Consent Required</h3>
              <p>
                We will only use marketing cookies with your explicit consent. You can withdraw 
                consent at any time, and this will not affect the lawfulness of processing 
                based on consent before its withdrawal.
              </p>
            </div>
          </section>

          <section id="third-party-cookies" class="legal-section">
            <h2>7. Third-Party Cookies</h2>
            <p>
              Some cookies on our website are set by third-party services. We have no control over 
              these cookies, and they are subject to the respective privacy policies of these services.
            </p>

            <h3>Third-Party Services</h3>
            <div class="third-party-list">
              <div class="third-party-service">
                <h4>Google Services</h4>
                <ul>
                  <li><strong>Google Analytics:</strong> Website analytics and reporting</li>
                  <li><strong>Google Ads:</strong> Advertising and remarketing</li>
                  <li><strong>Google Maps:</strong> Location services and mapping</li>
                </ul>
                <p><a href="https://policies.google.com/privacy" target="_blank" rel="noopener">Google Privacy Policy</a></p>
              </div>

              <div class="third-party-service">
                <h4>Social Media Platforms</h4>
                <ul>
                  <li><strong>Facebook:</strong> Social sharing and advertising</li>
                  <li><strong>LinkedIn:</strong> Professional networking and advertising</li>
                  <li><strong>Twitter:</strong> Social sharing and content distribution</li>
                </ul>
              </div>

              <div class="third-party-service">
                <h4>Other Services</h4>
                <ul>
                  <li><strong>YouTube:</strong> Video embedding and analytics</li>
                  <li><strong>Payment Processors:</strong> Secure payment processing</li>
                  <li><strong>Customer Support:</strong> Live chat and helpdesk services</li>
                </ul>
              </div>
            </div>

            <div class="third-party-notice">
              <h3>Important Notice</h3>
              <p>
                Third-party cookies are governed by the privacy policies of the respective services. 
                We recommend reviewing these policies to understand how your data is used.
              </p>
            </div>
          </section>

          <section id="cookie-consent" class="legal-section">
            <h2>8. Cookie Consent</h2>
            <p>
              When you first visit our website, you will see a cookie banner asking for your consent 
              to use non-essential cookies.
            </p>

            <h3>Consent Options</h3>
            <ul>
              <li><strong>Accept All:</strong> Allow all cookies including marketing cookies</li>
              <li><strong>Reject All:</strong> Only essential cookies will be used</li>
              <li><strong>Customize:</strong> Choose which categories of cookies to allow</li>
              <li><strong>Learn More:</strong> Access detailed information about our cookies</li>
            </ul>

            <h3>Consent Management</h3>
            <ul>
              <li>Your consent choices are stored for 12 months</li>
              <li>You can change your preferences at any time</li>
              <li>Withdrawing consent will not affect previous lawful processing</li>
              <li>Essential cookies do not require consent</li>
            </ul>

            <div class="consent-controls">
              <h3>Update Your Cookie Preferences</h3>
              <p>You can update your cookie preferences at any time by:</p>
              <ul>
                <li>Clicking the "Cookie Settings" link in our footer</li>
                <li>Using the cookie preference center</li>
                <li>Contacting us directly</li>
                <li>Adjusting your browser settings</li>
              </ul>
              
              <button class="cookie-settings-btn" @click="openCookieSettings">
                Manage Cookie Preferences
              </button>
            </div>
          </section>

          <section id="manage-cookies" class="legal-section">
            <h2>9. How to Manage Cookies</h2>
            <p>
              You have several options for managing cookies on your device. You can control cookies 
              through our website settings or through your browser settings.
            </p>

            <h3>Website Cookie Controls</h3>
            <ul>
              <li>Use our cookie preference center to customize settings</li>
              <li>Accept or reject specific categories of cookies</li>
              <li>Update preferences at any time</li>
              <li>View detailed information about each cookie type</li>
            </ul>

            <h3>Browser Cookie Controls</h3>
            <p>All modern browsers allow you to control cookies through their settings:</p>
            <ul>
              <li>Block all cookies from specific websites</li>
              <li>Block third-party cookies only</li>
              <li>Delete existing cookies</li>
              <li>Receive notifications when cookies are set</li>
              <li>Set cookies to be deleted when you close your browser</li>
            </ul>

            <div class="warning-box">
              <h3>Important Warning</h3>
              <p>
                Disabling essential cookies may prevent our website from functioning properly. 
                Some features may not work as expected if you block or delete cookies.
              </p>
            </div>
          </section>

          <section id="browser-settings" class="legal-section">
            <h2>10. Browser Settings</h2>
            <p>Here's how to manage cookies in popular web browsers:</p>

            <div class="browser-guides">
              <div class="browser-guide">
                <h3>Google Chrome</h3>
                <ol>
                  <li>Click the three-dot menu in the top right</li>
                  <li>Select "Settings"</li>
                  <li>Click "Privacy and security"</li>
                  <li>Select "Cookies and other site data"</li>
                  <li>Choose your preferred settings</li>
                </ol>
                <p><a href="https://support.google.com/chrome/answer/95647" target="_blank" rel="noopener">Chrome Cookie Help</a></p>
              </div>

              <div class="browser-guide">
                <h3>Mozilla Firefox</h3>
                <ol>
                  <li>Click the menu button in the top right</li>
                  <li>Select "Settings"</li>
                  <li>Click "Privacy & Security"</li>
                  <li>Find the "Cookies and Site Data" section</li>
                  <li>Adjust your cookie settings</li>
                </ol>
                <p><a href="https://support.mozilla.org/en-US/kb/enhanced-tracking-protection-firefox-desktop" target="_blank" rel="noopener">Firefox Cookie Help</a></p>
              </div>

              <div class="browser-guide">
                <h3>Safari</h3>
                <ol>
                  <li>Click "Safari" in the menu bar</li>
                  <li>Select "Preferences"</li>
                  <li>Click the "Privacy" tab</li>
                  <li>Adjust "Block cookies" settings</li>
                  <li>Choose your preferred level</li>
                </ol>
                <p><a href="https://support.apple.com/en-us/HT201265" target="_blank" rel="noopener">Safari Cookie Help</a></p>
              </div>

              <div class="browser-guide">
                <h3>Microsoft Edge</h3>
                <ol>
                  <li>Click the three-dot menu</li>
                  <li>Select "Settings"</li>
                  <li>Click "Cookies and site permissions"</li>
                  <li>Select "Cookies and site data"</li>
                  <li>Configure your preferences</li>
                </ol>
                <p><a href="https://support.microsoft.com/en-us/microsoft-edge/delete-cookies-in-microsoft-edge-63947406-40ac-c3b8-57b9-2a946a29ae09" target="_blank" rel="noopener">Edge Cookie Help</a></p>
              </div>
            </div>
          </section>

          <section id="mobile-settings" class="legal-section">
            <h2>11. Mobile Device Settings</h2>
            <p>Mobile devices also provide controls for managing cookies and tracking:</p>

            <div class="mobile-guides">
              <div class="mobile-guide">
                <h3>iOS Devices (iPhone/iPad)</h3>
                <ol>
                  <li>Open "Settings"</li>
                  <li>Scroll down and tap "Safari"</li>
                  <li>Find "Privacy & Security" section</li>
                  <li>Toggle "Block All Cookies" or "Prevent Cross-Site Tracking"</li>
                  <li>Adjust "Privacy Report" settings</li>
                </ol>
              </div>

              <div class="mobile-guide">
                <h3>Android Devices</h3>
                <ol>
                  <li>Open your browser app</li>
                  <li>Tap the menu button (usually three dots)</li>
                  <li>Select "Settings"</li>
                  <li>Find "Site settings" or "Privacy"</li>
                  <li>Tap "Cookies" and adjust settings</li>
                </ol>
              </div>
            </div>

            <h3>App-Specific Settings</h3>
            <p>Many mobile apps also have their own privacy settings:</p>
            <ul>
              <li>Check app settings for privacy controls</li>
              <li>Look for "Ad preferences" or "Privacy" sections</li>
              <li>Adjust tracking and analytics preferences</li>
              <li>Review app permissions regularly</li>
            </ul>
          </section>

          <section id="changes" class="legal-section">
            <h2>12. Changes to This Policy</h2>
            <p>
              We may update this Cookie Policy from time to time to reflect changes in our practices, 
              technology, or applicable laws.
            </p>

            <h3>When We Update This Policy</h3>
            <ul>
              <li>We implement new cookie technologies</li>
              <li>We change our third-party service providers</li>
              <li>Privacy laws or regulations change</li>
              <li>We modify our website functionality</li>
            </ul>

            <h3>How We Notify You</h3>
            <ul>
              <li>Update the "Last Updated" date at the top of this policy</li>
              <li>Display a notice on our website</li>
              <li>Send email notifications for significant changes</li>
              <li>Request renewed consent if required by law</li>
            </ul>

            <p>
              We encourage you to review this Cookie Policy periodically to stay informed about 
              how we use cookies and similar technologies.
            </p>
          </section>

          <section id="contact" class="legal-section">
            <h2>13. Contact Information</h2>
            <p>
              If you have questions about this Cookie Policy or our use of cookies, 
              please contact us:
            </p>

            <div class="contact-details">
              <div class="contact-method">
                <h4>Privacy Team</h4>
                <p><a href="mailto:privacy@construction.com">privacy@construction.com</a></p>
              </div>

              <div class="contact-method">
                <h4>Phone</h4>
                <p><a href="tel:+15551234567">+1 (555) 123-4567</a></p>
              </div>

              <div class="contact-method">
                <h4>Mail</h4>
                <p>
                  Construction Privacy Officer<br>
                  123 Construction Ave<br>
                  Building City, BC 12345<br>
                  United States
                </p>
              </div>

              <div class="contact-method">
                <h4>Data Protection Officer</h4>
                <p>
                  For GDPR-related inquiries:<br>
                  <a href="mailto:dpo@construction.com">dpo@construction.com</a>
                </p>
              </div>
            </div>

            <div class="useful-links">
              <h3>Related Information</h3>
              <ul>
                <li><NuxtLink to="/privacy">Privacy Policy</NuxtLink></li>
                <li><NuxtLink to="/terms">Terms of Service</NuxtLink></li>
                <li><a href="#" @click="openCookieSettings">Cookie Preferences</a></li>
                <li><a href="https://www.allaboutcookies.org/" target="_blank" rel="noopener">About Cookies (External)</a></li>
              </ul>
            </div>
          </section>
        </div>
      </div>
    </div>

    <!-- Footer -->
    <Footer />
  </div>
</template>

<script setup lang="ts">
// Page meta
definePageMeta({
  title: 'Cookie Policy - Construction',
  description: 'Cookie Policy for Construction - Learn how we use cookies and similar tracking technologies.',
})

// SEO meta
useSeoMeta({
  title: 'Cookie Policy - Construction',
  description: 'Cookie Policy for Construction - Learn how we use cookies and similar tracking technologies.',
  ogTitle: 'Cookie Policy - Construction',
  ogDescription: 'Cookie Policy for Construction - Learn how we use cookies and similar tracking technologies.',
  ogType: 'website',
  twitterCard: 'summary',
})

// Methods
const openCookieSettings = () => {
  // TODO: Implement cookie preference center
  alert('Cookie preference center would open here. This would typically integrate with a cookie consent management platform.')
}

// Smooth scrolling for anchor links
onMounted(() => {
  // Handle anchor link clicks
  const anchorLinks = document.querySelectorAll('a[href^="#"]')
  anchorLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault()
      const targetId = link.getAttribute('href')?.substring(1)
      if (targetId) {
        const targetElement = document.getElementById(targetId)
        if (targetElement) {
          targetElement.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          })
        }
      }
    })
  })
})
</script>

<style scoped>
.legal-page {
  min-height: 100vh;
  background-color: #f8fafc;
}

.legal-content {
  padding: 2rem 0 4rem 0;
  min-height: calc(100vh - 200px);
}

.legal-header {
  text-align: center;
  margin-bottom: 3rem;
  padding: 3rem 0;
  background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%);
  color: white;
  border-radius: 1rem;
}

.legal-header h1 {
  font-size: 3rem;
  font-weight: 700;
  margin-bottom: 1rem;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.last-updated {
  font-size: 1rem;
  opacity: 0.9;
  margin-bottom: 2rem;
  font-style: italic;
}

.intro {
  font-size: 1.125rem;
  line-height: 1.7;
  max-width: 800px;
  margin: 0 auto;
  opacity: 0.95;
}

.legal-sections {
  display: grid;
  grid-template-columns: 300px 1fr;
  gap: 3rem;
  align-items: start;
}

.table-of-contents {
  background: white;
  padding: 2rem;
  border-radius: 1rem;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  position: sticky;
  top: 2rem;
  max-height: calc(100vh - 4rem);
  overflow-y: auto;
}

.table-of-contents h2 {
  font-size: 1.25rem;
  font-weight: 600;
  color: #1f2937;
  margin-bottom: 1.5rem;
  padding-bottom: 0.75rem;
  border-bottom: 2px solid #e5e7eb;
}

.table-of-contents ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.table-of-contents li {
  margin-bottom: 0.75rem;
}

.table-of-contents a {
  color: #6b7280;
  text-decoration: none;
  font-size: 0.875rem;
  line-height: 1.5;
  transition: all 0.2s ease;
  display: block;
  padding: 0.5rem 0;
  border-left: 3px solid transparent;
  padding-left: 1rem;
}

.table-of-contents a:hover {
  color: #f59e0b;
  border-left-color: #f59e0b;
  background-color: #fffbeb;
  border-radius: 0 0.375rem 0.375rem 0;
}

.legal-section {
  background: white;
  padding: 2.5rem;
  border-radius: 1rem;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  margin-bottom: 2rem;
}

.legal-section h2 {
  font-size: 1.75rem;
  font-weight: 700;
  color: #1f2937;
  margin-bottom: 1.5rem;
  padding-bottom: 0.75rem;
  border-bottom: 3px solid #f59e0b;
}

.legal-section h3 {
  font-size: 1.25rem;
  font-weight: 600;
  color: #374151;
  margin: 2rem 0 1rem 0;
}

.legal-section h4 {
  font-size: 1.125rem;
  font-weight: 600;
  color: #4b5563;
  margin: 1.5rem 0 0.75rem 0;
}

.legal-section p {
  color: #6b7280;
  line-height: 1.7;
  margin-bottom: 1.5rem;
}

.legal-section ul {
  margin: 1rem 0 1.5rem 0;
  padding-left: 1.5rem;
}

.legal-section ol {
  margin: 1rem 0 1.5rem 0;
  padding-left: 1.5rem;
}

.legal-section li {
  color: #6b7280;
  line-height: 1.6;
  margin-bottom: 0.75rem;
}

.legal-section strong {
  color: #374151;
  font-weight: 600;
}

.legal-section a {
  color: #f59e0b;
  text-decoration: none;
  font-weight: 500;
}

.legal-section a:hover {
  text-decoration: underline;
}

.info-box,
.legal-basis,
.data-protection,
.consent-required,
.third-party-notice {
  background: #fffbeb;
  border: 1px solid #f59e0b;
  border-radius: 0.5rem;
  padding: 1.5rem;
  margin: 1.5rem 0;
}

.info-box h3,
.legal-basis h3,
.data-protection h3,
.consent-required h3,
.third-party-notice h3 {
  color: #d97706;
  margin: 0 0 0.75rem 0;
  font-size: 1.125rem;
}

.warning-box {
  background: #fef2f2;
  border: 1px solid #ef4444;
  border-radius: 0.5rem;
  padding: 1.5rem;
  margin: 1.5rem 0;
}

.warning-box h3 {
  color: #dc2626;
  margin: 0 0 0.75rem 0;
  font-size: 1.125rem;
}

.cookie-types {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
  margin: 1.5rem 0;
}

.cookie-type {
  background: #f8fafc;
  padding: 1.5rem;
  border-radius: 0.75rem;
  border: 1px solid #e5e7eb;
}

.cookie-type h4 {
  color: #374151;
  margin: 0 0 0.75rem 0;
  font-size: 1.125rem;
}

.cookie-table {
  margin: 2rem 0;
}

.cookie-table table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 1rem;
}

.cookie-table th,
.cookie-table td {
  padding: 0.75rem;
  text-align: left;
  border-bottom: 1px solid #e5e7eb;
}

.cookie-table th {
  background: #f8fafc;
  font-weight: 600;
  color: #374151;
}

.cookie-table td {
  color: #6b7280;
}

.consent-controls {
  background: #f0f9ff;
  border: 1px solid #0ea5e9;
  border-radius: 0.75rem;
  padding: 1.5rem;
  margin: 2rem 0;
  text-align: center;
}

.cookie-settings-btn {
  background: linear-gradient(135deg, #f59e0b, #d97706);
  color: white;
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 0.5rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  margin-top: 1rem;
}

.cookie-settings-btn:hover {
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(245, 158, 11, 0.4);
}

.consent-note {
  background: #ecfdf5;
  padding: 1rem;
  border-radius: 0.5rem;
  border-left: 4px solid #10b981;
  margin: 1.5rem 0;
}

.third-party-list {
  display: grid;
  gap: 1.5rem;
  margin: 1.5rem 0;
}

.third-party-service {
  background: #f8fafc;
  padding: 1.5rem;
  border-radius: 0.75rem;
  border: 1px solid #e5e7eb;
}

.third-party-service h4 {
  color: #374151;
  margin: 0 0 1rem 0;
}

.browser-guides,
.mobile-guides {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
  margin: 1.5rem 0;
}

.browser-guide,
.mobile-guide {
  background: #f8fafc;
  padding: 1.5rem;
  border-radius: 0.75rem;
  border: 1px solid #e5e7eb;
}

.browser-guide h3,
.mobile-guide h3 {
  color: #374151;
  margin: 0 0 1rem 0;
  font-size: 1.125rem;
}

.browser-guide ol,
.mobile-guide ol {
  margin: 0 0 1rem 0;
  padding-left: 1.25rem;
}

.contact-details {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  margin-top: 2rem;
}

.contact-method {
  background: #f8fafc;
  padding: 1.5rem;
  border-radius: 0.75rem;
  border: 1px solid #e5e7eb;
}

.contact-method h4 {
  font-size: 1rem;
  font-weight: 600;
  color: #374151;
  margin: 0 0 0.75rem 0;
}

.contact-method p {
  margin: 0;
  color: #6b7280;
  line-height: 1.5;
}

.contact-method a {
  color: #f59e0b;
  text-decoration: none;
  font-weight: 500;
}

.contact-method a:hover {
  text-decoration: underline;
}

.useful-links {
  background: #f8fafc;
  padding: 2rem;
  border-radius: 0.75rem;
  border: 1px solid #e5e7eb;
  margin-top: 2rem;
}

.useful-links h3 {
  color: #374151;
  margin: 0 0 1rem 0;
}

.useful-links ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.useful-links li {
  margin-bottom: 0.5rem;
}

.useful-links a {
  color: #f59e0b;
  text-decoration: none;
  font-weight: 500;
}

.useful-links a:hover {
  text-decoration: underline;
}

/* Responsive Design */
@media (max-width: 1024px) {
  .legal-sections {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
  
  .table-of-contents {
    position: static;
    max-height: none;
    order: -1;
  }
  
  .cookie-types,
  .browser-guides,
  .mobile-guides {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 768px) {
  .legal-content {
    padding: 1rem 0 2rem 0;
  }
  
  .legal-header {
    padding: 2rem 1rem;
    margin: 0 1rem 2rem 1rem;
  }
  
  .legal-header h1 {
    font-size: 2rem;
  }
  
  .intro {
    font-size: 1rem;
  }
  
  .legal-section {
    padding: 1.5rem;
    margin: 0 1rem 1.5rem 1rem;
  }
  
  .table-of-contents {
    margin: 0 1rem 1.5rem 1rem;
    padding: 1.5rem;
  }
  
  .contact-details {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
  
  .cookie-table {
    overflow-x: auto;
  }
  
  .cookie-table table {
    min-width: 600px;
  }
}

@media (max-width: 480px) {
  .legal-header {
    padding: 1.5rem 0.75rem;
  }
  
  .legal-header h1 {
    font-size: 1.75rem;
  }
  
  .legal-section {
    padding: 1rem;
    margin: 0 0.5rem 1rem 0.5rem;
  }
  
  .table-of-contents {
    margin: 0 0.5rem 1rem 0.5rem;
    padding: 1rem;
  }
}

/* Print Styles */
@media print {
  .table-of-contents {
    display: none;
  }
  
  .legal-sections {
    grid-template-columns: 1fr;
  }
  
  .legal-section {
    break-inside: avoid;
    page-break-inside: avoid;
  }
  
  .cookie-settings-btn {
    display: none;
  }
}
</style>