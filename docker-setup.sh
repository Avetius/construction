#!/bin/bash

# Docker Development Setup Script for Construction Management

echo "🏗️  Construction Management - Docker Setup"
echo "=========================================="

# Create data directories
echo "📁 Creating data directories..."
mkdir -p data/sqlite
mkdir -p data/uploads
mkdir -p data/ssl

# Set permissions
echo "🔐 Setting permissions..."
chmod 755 data
chmod 755 data/sqlite
chmod 755 data/uploads
chmod 755 data/ssl

# Create .env file if it doesn't exist
if [ ! -f .env ]; then
    echo "⚙️  Creating .env file..."
    cat > .env << EOF
# Environment Configuration
NODE_ENV=production

# Database Configuration
NUXT_DB_PATH=/app/data/construction.db

# Application Configuration
NUXT_PUBLIC_API_BASE=/api
NUXT_HOST=0.0.0.0
NUXT_PORT=3000

# Security
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
SESSION_SECRET=your-super-secret-session-key-change-this-in-production

# Email Configuration (Optional)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password

# File Upload Configuration
MAX_FILE_SIZE=10485760
ALLOWED_FILE_TYPES=jpg,jpeg,png,gif,pdf,doc,docx

# Admin Configuration
DEFAULT_ADMIN_EMAIL=admin@construction.com
DEFAULT_ADMIN_PASSWORD=admin123
EOF
    echo "✅ .env file created with default values"
    echo "⚠️  Please update the .env file with your actual configuration"
else
    echo "ℹ️  .env file already exists"
fi

# Build and start services
echo "🐳 Building Docker containers..."
docker-compose build

echo "🚀 Starting services..."
docker-compose up -d

echo "⏳ Waiting for services to start..."
sleep 10

# Check if services are running
echo "🔍 Checking service status..."
docker-compose ps

echo ""
echo "🎉 Setup complete!"
echo ""
echo "📝 Service URLs:"
echo "   • Application: http://localhost:3000"
echo "   • SQLite Admin: http://localhost:8080"
echo "   • Nginx (if enabled): http://localhost:80"
echo ""
echo "📊 Useful commands:"
echo "   • View logs: docker-compose logs -f"
echo "   • Stop services: docker-compose down"
echo "   • Restart services: docker-compose restart"
echo "   • View database: http://localhost:8080"
echo ""
echo "🔧 Database info:"
echo "   • Database file: ./data/sqlite/construction.db"
echo "   • Default admin: admin@construction.com / admin123"
echo ""