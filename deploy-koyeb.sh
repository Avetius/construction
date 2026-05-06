#!/bin/bash

# Koyeb Deployment Script
echo "🚀 Deploying Construction Management to Koyeb"
echo "============================================="

# Check if Koyeb CLI is installed
if ! command -v koyeb &> /dev/null; then
    echo "❌ Koyeb CLI not found. Installing..."
    
    # Install Koyeb CLI
    if [[ "$OSTYPE" == "darwin"* ]]; then
        # macOS
        brew install koyeb/tap/koyeb
    elif [[ "$OSTYPE" == "linux-gnu"* ]]; then
        # Linux
        curl -sSL https://github.com/koyeb/koyeb-cli/releases/latest/download/koyeb-linux-amd64.tar.gz | tar xz
        sudo mv koyeb /usr/local/bin/
    else
        echo "❌ Unsupported OS. Please install Koyeb CLI manually: https://www.koyeb.com/docs/cli/"
        exit 1
    fi
fi

# Check if user is logged in to Koyeb
if ! koyeb auth status &> /dev/null; then
    echo "🔑 Please login to Koyeb first:"
    echo "   koyeb auth login"
    exit 1
fi

# Validate required files
if [ ! -f "Dockerfile.koyeb" ]; then
    echo "❌ Dockerfile.koyeb not found"
    exit 1
fi

if [ ! -f "koyeb.yml" ]; then
    echo "❌ koyeb.yml not found"
    exit 1
fi

# Set application name
APP_NAME="construction-management"
SERVICE_NAME="construction-app"
DEPLOY_BRANCH="${KOYEB_GIT_BRANCH:-$(git branch --show-current 2>/dev/null)}"

if [ -z "$DEPLOY_BRANCH" ]; then
    DEPLOY_BRANCH="main"
fi

echo "📋 Deployment Configuration:"
echo "   • App Name: $APP_NAME"
echo "   • Service: $SERVICE_NAME"
echo "   • Branch: $DEPLOY_BRANCH"
echo "   • Dockerfile: Dockerfile.koyeb"
echo "   • Port: 8000"
echo ""

# Check if app already exists
if koyeb app get $APP_NAME &> /dev/null; then
    echo "🔄 App '$APP_NAME' already exists. Updating..."
    
    # Update the service
    koyeb service update $SERVICE_NAME \
        --app $APP_NAME \
        --git github.com/Avetius/construction \
        --git-branch "$DEPLOY_BRANCH" \
        --git-dockerfile Dockerfile.koyeb \
        --run-command "node .output/server/index.mjs" \
        --ports 8000:http \
        --env NODE_ENV=production \
        --env NUXT_HOST=0.0.0.0 \
        --env NUXT_PORT=8000 \
        --env NUXT_DB_PATH=/app/data/construction.db \
        --env NUXT_PUBLIC_API_BASE=/api \
        --env NUXT_JWT_SECRET=change-this-jwt-secret \
        --env NUXT_SESSION_SECRET=change-this-session-secret \
        --env NUXT_ADMIN_EMAIL=admin@construction.com \
        --env NUXT_ADMIN_PASSWORD=admin123
else
    echo "🆕 Creating new app '$APP_NAME'..."
    
    # Create new app and service
    koyeb service create $SERVICE_NAME \
        --app $APP_NAME \
        --git github.com/Avetius/construction \
        --git-branch "$DEPLOY_BRANCH" \
        --git-dockerfile Dockerfile.koyeb \
        --run-command "node .output/server/index.mjs" \
        --ports 8000:http \
        --env NODE_ENV=production \
        --env NUXT_HOST=0.0.0.0 \
        --env NUXT_PORT=8000 \
        --env NUXT_DB_PATH=/app/data/construction.db \
        --env NUXT_PUBLIC_API_BASE=/api \
        --env NUXT_JWT_SECRET=change-this-jwt-secret \
        --env NUXT_SESSION_SECRET=change-this-session-secret \
        --env NUXT_ADMIN_EMAIL=admin@construction.com \
        --env NUXT_ADMIN_PASSWORD=admin123 \
        --instance-type nano \
        --regions fra
fi

# Wait for deployment
echo "⏳ Waiting for deployment to complete..."
sleep 30

# Get deployment status
echo "📊 Deployment Status:"
koyeb service get $SERVICE_NAME --app $APP_NAME

# Get service URL
SERVICE_URL=$(koyeb service get $SERVICE_NAME --app $APP_NAME --output json | jq -r '.latest_deployment.definition.routes[0].path')

echo ""
echo "🎉 Deployment Complete!"
echo ""
echo "📝 Service Information:"
echo "   • Service URL: https://$SERVICE_URL"
echo "   • Health Check: https://$SERVICE_URL/api/health"
echo "   • Admin Login: admin@construction.com / admin123"
echo ""
echo "🔧 Next Steps:"
echo "   1. Visit your application: https://$SERVICE_URL"
echo "   2. Change default admin password"
echo "   3. Configure environment variables in Koyeb dashboard"
echo "   4. Set up custom domain (optional)"
echo ""
echo "📊 Useful Commands:"
echo "   • View logs: koyeb service logs $SERVICE_NAME --app $APP_NAME"
echo "   • Check status: koyeb service get $SERVICE_NAME --app $APP_NAME"
echo "   • Update service: koyeb service update $SERVICE_NAME --app $APP_NAME"
echo ""