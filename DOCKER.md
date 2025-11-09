# 🏗️ Construction Management - Docker Setup

This document explains how to run the Construction Management application using Docker and Docker Compose with SQLite database.

## 📋 Prerequisites

- Docker Desktop (Windows/Mac) or Docker Engine (Linux)
- Docker Compose v2.0+
- Git

## 🚀 Quick Start

### Option 1: Automated Setup (Recommended)

**Windows:**
```cmd
npm run docker:setup:win
```

**Linux/Mac:**
```bash
npm run docker:setup
```

### Option 2: Manual Setup

1. **Create data directories:**
```bash
mkdir -p data/sqlite data/uploads data/ssl
```

2. **Build and start services:**
```bash
docker-compose up --build -d
```

## 🐳 Docker Services

### Production Environment

| Service | Description | Port | URL |
|---------|-------------|------|-----|
| `construction-app` | Main Nuxt application | 3000 | http://localhost:3000 |
| `sqlite-web` | SQLite database admin | 8080 | http://localhost:8080 |
| `nginx` | Reverse proxy & static files | 80/443 | http://localhost |

### Development Environment

| Service | Description | Port | URL |
|---------|-------------|------|-----|
| `construction-dev` | Nuxt dev server with hot reload | 3000 | http://localhost:3000 |
| `sqlite-web-dev` | SQLite database admin | 8080 | http://localhost:8080 |

## 📝 Available Commands

### Docker Management
```bash
# Development environment
npm run docker:dev          # Start dev environment with hot reload
npm run docker:stop         # Stop all services
npm run docker:logs         # View logs from all services

# Production environment
npm run docker:prod         # Start production environment
npm run docker:logs         # View production logs

# Database management
npm run docker:db           # Access SQLite CLI
npm run docker:shell        # Access container shell
```

### Direct Docker Compose
```bash
# Development
docker-compose -f docker-compose.dev.yml up --build
docker-compose -f docker-compose.dev.yml down

# Production
docker-compose up --build -d
docker-compose down

# View logs
docker-compose logs -f [service-name]

# Execute commands in containers
docker-compose exec construction-app sh
docker-compose exec construction-app sqlite3 /app/data/construction.db
```

## 📂 Directory Structure

```
construction/
├── data/                   # Persistent data (mounted volumes)
│   ├── sqlite/            # SQLite database files
│   ├── uploads/           # User uploaded files
│   └── ssl/               # SSL certificates
├── server/                # Nuxt server-side code
│   ├── api/               # API endpoints
│   └── utils/             # Server utilities
├── docker-compose.yml     # Production Docker Compose
├── docker-compose.dev.yml # Development Docker Compose
├── Dockerfile             # Production Docker image
├── Dockerfile.dev         # Development Docker image
├── nginx.conf             # Nginx configuration
└── .env                   # Environment variables
```

## 🗄️ Database Information

### SQLite Database
- **Location:** `./data/sqlite/construction.db`
- **Admin Interface:** http://localhost:8080
- **Default Admin User:**
  - Email: `admin@construction.com`
  - Password: `admin123`

### Database Tables
- `users` - User accounts and authentication
- `projects` - Construction projects
- `content` - CMS content (pages, posts)
- `media` - File uploads and media library
- `settings` - Application settings

### Database Access
```bash
# Via Docker
npm run docker:db

# Direct SQLite CLI
sqlite3 ./data/sqlite/construction.db

# Via Web Interface
# Open http://localhost:8080 in browser
```

## ⚙️ Environment Configuration

Create a `.env` file with your configuration:

```env
# Environment
NODE_ENV=production

# Database
NUXT_DB_PATH=/app/data/construction.db

# Application
NUXT_PUBLIC_API_BASE=/api
NUXT_HOST=0.0.0.0
NUXT_PORT=3000

# Security
JWT_SECRET=your-super-secret-jwt-key
SESSION_SECRET=your-super-secret-session-key

# Email (Optional)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password

# File Uploads
MAX_FILE_SIZE=10485760
ALLOWED_FILE_TYPES=jpg,jpeg,png,gif,pdf,doc,docx
```

## 🔒 Production Deployment

### SSL/HTTPS Setup
1. Obtain SSL certificates
2. Place certificates in `./data/ssl/`
3. Uncomment HTTPS section in `nginx.conf`
4. Update domain name in `nginx.conf`

### Environment Variables
```bash
# Set secure secrets
JWT_SECRET=$(openssl rand -base64 32)
SESSION_SECRET=$(openssl rand -base64 32)

# Update .env file with production values
```

### Security Considerations
- Change default admin password
- Use strong JWT/session secrets
- Configure firewall rules
- Set up SSL certificates
- Regular database backups

## 🔧 Troubleshooting

### Common Issues

**Port already in use:**
```bash
# Check what's using the port
netstat -tulpn | grep :3000

# Kill the process or use different port
docker-compose down && docker-compose up -d
```

**Permission denied (Linux/Mac):**
```bash
# Fix file permissions
chmod +x docker-setup.sh
sudo chown -R $USER:$USER data/
```

**Database connection errors:**
```bash
# Check if database file exists
ls -la data/sqlite/

# Check container logs
docker-compose logs construction-app
```

**Hot reload not working (Development):**
```bash
# Ensure volume mounts are correct
docker-compose -f docker-compose.dev.yml down
docker-compose -f docker-compose.dev.yml up --build
```

### Health Checks

**Application Health:**
```bash
curl http://localhost:3000/api/health
```

**Database Health:**
```bash
docker-compose exec construction-app sqlite3 /app/data/construction.db "SELECT 1;"
```

## 📊 Monitoring & Logs

### View Logs
```bash
# All services
docker-compose logs -f

# Specific service
docker-compose logs -f construction-app

# Last 100 lines
docker-compose logs --tail=100 construction-app
```

### Health Monitoring
- Application: http://localhost:3000/api/health
- Database Admin: http://localhost:8080
- Nginx Status: http://localhost/health

## 🔄 Updates & Maintenance

### Updating the Application
```bash
# Pull latest code
git pull origin main

# Rebuild and restart
docker-compose down
docker-compose up --build -d
```

### Database Backup
```bash
# Create backup
docker-compose exec construction-app sqlite3 /app/data/construction.db ".backup /app/data/backup-$(date +%Y%m%d).db"

# Copy backup to host
docker cp construction-app:/app/data/backup-$(date +%Y%m%d).db ./backup-$(date +%Y%m%d).db
```

### Database Restore
```bash
# Stop application
docker-compose stop construction-app

# Restore from backup
cp backup-YYYYMMDD.db data/sqlite/construction.db

# Start application
docker-compose start construction-app
```

## 🆘 Support

For issues and questions:
1. Check the troubleshooting section above
2. Review Docker and application logs
3. Ensure all prerequisites are installed
4. Verify environment configuration

---

**Happy Building! 🏗️**