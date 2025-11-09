@echo off
REM Koyeb Deployment Script for Windows

echo 🚀 Deploying Construction Management to Koyeb
echo =============================================

REM Check if Koyeb CLI is installed
koyeb version >nul 2>&1
if errorlevel 1 (
    echo ❌ Koyeb CLI not found. Please install it first:
    echo    https://www.koyeb.com/docs/cli/
    echo.
    echo    For Windows, download the binary and add it to your PATH
    pause
    exit /b 1
)

REM Check if user is logged in
koyeb auth status >nul 2>&1
if errorlevel 1 (
    echo 🔑 Please login to Koyeb first:
    echo    koyeb auth login
    pause
    exit /b 1
)

REM Set variables
set APP_NAME=construction-management
set SERVICE_NAME=construction-app

echo 📋 Deployment Configuration:
echo    • App Name: %APP_NAME%
echo    • Service: %SERVICE_NAME%
echo    • Dockerfile: Dockerfile.koyeb
echo    • Port: 8000
echo.

REM Check if app exists
koyeb app get %APP_NAME% >nul 2>&1
if errorlevel 1 (
    echo 🆕 Creating new app '%APP_NAME%'...
    
    koyeb service create %SERVICE_NAME% ^
        --app %APP_NAME% ^
        --git github.com/Avetius/construction ^
        --git-branch docker ^
        --git-dockerfile Dockerfile.koyeb ^
        --ports 8000:http ^
        --env NODE_ENV=production ^
        --env NUXT_HOST=0.0.0.0 ^
        --env NUXT_PORT=8000 ^
        --env NUXT_DB_PATH=/app/data/construction.db ^
        --env NUXT_PUBLIC_API_BASE=/api ^
        --instance-type nano ^
        --regions fra
) else (
    echo 🔄 App '%APP_NAME%' already exists. Updating...
    
    koyeb service update %SERVICE_NAME% ^
        --app %APP_NAME% ^
        --git github.com/Avetius/construction ^
        --git-branch docker ^
        --git-dockerfile Dockerfile.koyeb ^
        --ports 8000:http ^
        --env NODE_ENV=production ^
        --env NUXT_HOST=0.0.0.0 ^
        --env NUXT_PORT=8000 ^
        --env NUXT_DB_PATH=/app/data/construction.db ^
        --env NUXT_PUBLIC_API_BASE=/api
)

echo ⏳ Waiting for deployment to complete...
timeout /t 30 /nobreak >nul

echo 📊 Deployment Status:
koyeb service get %SERVICE_NAME% --app %APP_NAME%

echo.
echo 🎉 Deployment Complete!
echo.
echo 📝 Service Information:
echo    • Check your Koyeb dashboard for the service URL
echo    • Health Check: [YOUR-URL]/api/health
echo    • Admin Login: admin@construction.com / admin123
echo.
echo 🔧 Next Steps:
echo    1. Visit your application URL from Koyeb dashboard
echo    2. Change default admin password
echo    3. Configure environment variables in Koyeb dashboard
echo    4. Set up custom domain (optional)
echo.
echo 📊 Useful Commands:
echo    • View logs: koyeb service logs %SERVICE_NAME% --app %APP_NAME%
echo    • Check status: koyeb service get %SERVICE_NAME% --app %APP_NAME%
echo.
pause