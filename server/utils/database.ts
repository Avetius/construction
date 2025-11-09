import Database from 'better-sqlite3'
import { mkdir } from 'fs/promises'
import { dirname } from 'path'

export class DatabaseManager {
  private static instance: DatabaseManager
  private db: Database.Database

  private constructor() {
    const dbPath = process.env.NUXT_DB_PATH || './data/construction.db'
    
    // Ensure data directory exists
    this.ensureDataDirectory(dbPath)
    
    // Initialize SQLite database
    this.db = new Database(dbPath)
    this.db.pragma('journal_mode = WAL')
    this.db.pragma('foreign_keys = ON')
    
    // Initialize tables
    this.initializeTables()
  }

  public static getInstance(): DatabaseManager {
    if (!DatabaseManager.instance) {
      DatabaseManager.instance = new DatabaseManager()
    }
    return DatabaseManager.instance
  }

  private async ensureDataDirectory(dbPath: string): Promise<void> {
    try {
      await mkdir(dirname(dbPath), { recursive: true })
    } catch (error) {
      console.error('Failed to create data directory:', error)
    }
  }

  private initializeTables(): void {
    // Users table
    this.db.exec(`
      CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        email TEXT UNIQUE NOT NULL,
        password_hash TEXT NOT NULL,
        first_name TEXT,
        last_name TEXT,
        role TEXT DEFAULT 'user',
        is_active BOOLEAN DEFAULT 1,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `)

    // Projects table
    this.db.exec(`
      CREATE TABLE IF NOT EXISTS projects (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL,
        description TEXT,
        status TEXT DEFAULT 'planning',
        client_name TEXT,
        client_email TEXT,
        start_date DATE,
        end_date DATE,
        budget DECIMAL(15,2),
        progress INTEGER DEFAULT 0,
        images TEXT, -- JSON array of image paths
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `)

    // Content table
    this.db.exec(`
      CREATE TABLE IF NOT EXISTS content (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL,
        slug TEXT UNIQUE NOT NULL,
        content TEXT,
        excerpt TEXT,
        status TEXT DEFAULT 'draft',
        type TEXT DEFAULT 'page',
        author_id INTEGER,
        featured_image TEXT,
        meta_title TEXT,
        meta_description TEXT,
        tags TEXT, -- JSON array of tags
        categories TEXT, -- JSON array of categories
        published_at DATETIME,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (author_id) REFERENCES users (id)
      )
    `)

    // Media table
    this.db.exec(`
      CREATE TABLE IF NOT EXISTS media (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        filename TEXT NOT NULL,
        original_name TEXT NOT NULL,
        file_path TEXT NOT NULL,
        file_size INTEGER,
        mime_type TEXT,
        alt_text TEXT,
        caption TEXT,
        uploaded_by INTEGER,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (uploaded_by) REFERENCES users (id)
      )
    `)

    // Settings table
    this.db.exec(`
      CREATE TABLE IF NOT EXISTS settings (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        key TEXT UNIQUE NOT NULL,
        value TEXT,
        type TEXT DEFAULT 'string',
        description TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `)

    // Insert default admin user if none exists
    this.insertDefaultData()

    console.log('✅ Database tables initialized successfully')
  }

  private insertDefaultData(): void {
    const userCount = this.db.prepare('SELECT COUNT(*) as count FROM users').get() as { count: number }
    
    if (userCount.count === 0) {
      // Insert default admin user (password should be hashed in production)
      this.db.prepare(`
        INSERT INTO users (email, password_hash, first_name, last_name, role)
        VALUES (?, ?, ?, ?, ?)
      `).run('admin@construction.com', 'admin123', 'Admin', 'User', 'admin')

      console.log('✅ Default admin user created: admin@construction.com / admin123')
    }

    // Insert default settings
    const settingsCount = this.db.prepare('SELECT COUNT(*) as count FROM settings').get() as { count: number }
    
    if (settingsCount.count === 0) {
      const defaultSettings = [
        { key: 'site_title', value: 'Construction Management', description: 'Website title' },
        { key: 'site_description', value: 'Professional construction management services', description: 'Website description' },
        { key: 'contact_email', value: 'info@construction.com', description: 'Contact email address' },
        { key: 'contact_phone', value: '+1 (555) 123-4567', description: 'Contact phone number' },
        { key: 'company_address', value: '123 Construction Ave, Building City, BC 12345', description: 'Company address' }
      ]

      const insertSetting = this.db.prepare('INSERT INTO settings (key, value, description) VALUES (?, ?, ?)')
      
      for (const setting of defaultSettings) {
        insertSetting.run(setting.key, setting.value, setting.description)
      }

      console.log('✅ Default settings inserted')
    }
  }

  public getDatabase(): Database.Database {
    return this.db
  }

  public close(): void {
    this.db.close()
  }
}

// Export singleton instance
export const db = DatabaseManager.getInstance().getDatabase()