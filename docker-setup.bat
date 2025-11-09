@echo off
REM Docker Development Setup Script for Construction Management (Windows)

echo 🏗️  Construction Management - Docker Setup
echo ==========================================

REM Create data directories
echo 📁 Creating data directories...
if not exist "data\sqlite" mkdir "data\sqlite"
if not exist "data\uploads" mkdir "data\uploads"
if not exist "data\ssl" mkdir "data\ssl"

REM Create .env file if it doesn't exist
if not exist ".env" (
    echo ⚙️  Creating .env file...
    (
        echo # Environment Configuration
        echo NODE_ENV=production
        echo.
        echo # Database Configuration
        echo NUXT_DB_PATH=/app/data/construction.db
        echo.
        echo # Application Configuration
        echo NUXT_PUBLIC_API_BASE=/api
        echo NUXT_HOST=0.0.0.0
        echo NUXT_PORT=3000
        echo.
        echo # Security
        echo JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
        echo SESSION_SECRET=your-super-secret-session-key-change-this-in-production
        echo.
        echo # Email Configuration (Optional^)
        echo SMTP_HOST=smtp.gmail.com
        echo SMTP_PORT=587
        echo SMTP_USER=your-email@gmail.com
        echo SMTP_PASS=your-app-password
        echo.
        echo # File Upload Configuration
        echo MAX_FILE_SIZE=10485760
        echo ALLOWED_FILE_TYPES=jpg,jpeg,png,gif,pdf,doc,docx
        echo.
        echo # Admin Configuration
        echo DEFAULT_ADMIN_EMAIL=admin@construction.com
        echo DEFAULT_ADMIN_PASSWORD=admin123
    ) > .env
    echo ✅ .env file created with default values
    echo ⚠️  Please update the .env file with your actual configuration
) else (
    echo ℹ️  .env file already exists
)

REM Build and start services
echo 🐳 Building Docker containers...
docker-compose build

echo 🚀 Starting services...
docker-compose up -d

echo ⏳ Waiting for services to start...
timeout /t 10 /nobreak >nul

REM Check if services are running
echo 🔍 Checking service status...
docker-compose ps

echo.
echo 🎉 Setup complete!
echo.
echo 📝 Service URLs:
echo    • Application: http://localhost:3000
echo    • SQLite Admin: http://localhost:8080
echo    • Nginx (if enabled): http://localhost:80
echo.
echo 📊 Useful commands:
echo    • View logs: docker-compose logs -f
echo    • Stop services: docker-compose down
echo    • Restart services: docker-compose restart
echo    • View database: http://localhost:8080
echo.
echo 🔧 Database info:
echo    • Database file: ./data/sqlite/construction.db
echo    • Default admin: admin@construction.com / admin123
echo.
pause