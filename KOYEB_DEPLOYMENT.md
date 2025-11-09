# Koyeb Deployment Guide

This guide will walk you through deploying your Construction Management application to Koyeb's serverless platform.

## Prerequisites

1. **Koyeb Account**: Sign up at [koyeb.com](https://www.koyeb.com)
2. **GitHub Repository**: Your code should be in a GitHub repository
3. **Koyeb CLI** (optional): Install for command-line deployment

## Deployment Options

### Option 1: GitHub Integration (Recommended)

1. **Connect GitHub Repository**
   - Go to your Koyeb dashboard
   - Click "Create Service"
   - Select "GitHub" as source
   - Connect your GitHub repository
   - Select the branch to deploy from

2. **Configure Service**
   - **Service Name**: `construction-app`
   - **Region**: `fra` (Frankfurt) or your preferred region
   - **Instance Type**: `nano` (1 CPU, 512MB RAM)
   - **Port**: `8000`
   - **Dockerfile**: Select `Dockerfile.koyeb`

3. **Environment Variables**
   Configure these in the Koyeb dashboard:
   ```bash
   NODE_ENV=production
   NUXT_PORT=8000
   NUXT_HOST=0.0.0.0
   JWT_SECRET=your-super-secret-jwt-key-min-32-chars
   SESSION_SECRET=your-super-secret-session-key-min-32-chars
   NUXT_DB_PATH=/app/data/construction.db
   NUXT_PUBLIC_API_BASE=/api
   ```

4. **Persistent Storage**
   - Add a volume: `/app/data` (for SQLite database)
   - Size: 1GB minimum

### Option 2: CLI Deployment

1. **Install Koyeb CLI**
   ```bash
   # On Windows (PowerShell)
   curl -L https://github.com/koyeb/koyeb-cli/releases/latest/download/koyeb-cli_windows_amd64.exe -o koyeb.exe
   
   # On macOS
   brew install koyeb/tap/koyeb
   
   # On Linux
   curl -L https://github.com/koyeb/koyeb-cli/releases/latest/download/koyeb-cli_linux_amd64 -o koyeb
   chmod +x koyeb
   ```

2. **Login to Koyeb**
   ```bash
   koyeb login
   ```

3. **Deploy using configuration file**
   ```bash
   # Windows
   ./deploy-koyeb.bat
   
   # Unix/macOS
   ./deploy-koyeb.sh
   ```

### Option 3: Manual Configuration

If you prefer to configure manually:

1. **Create Service**
   ```bash
   koyeb service create \
     --app construction-app \
     --name construction-service \
     --git https://github.com/your-username/your-repo \
     --git-branch main \
     --git-dockerfile Dockerfile.koyeb \
     --ports 8000:http \
     --routes /:8000 \
     --env NODE_ENV=production \
     --env NUXT_PORT=8000 \
     --env NUXT_HOST=0.0.0.0 \
     --instance-type nano \
     --regions fra
   ```

## Database Setup

Your SQLite database will be stored in persistent storage:

1. **Volume Configuration**
   - Mount point: `/app/data`
   - Size: 1GB (minimum)
   - This ensures your database persists between deployments

2. **Database Initialization**
   The database will be automatically created on first run via the health check endpoint.

## Post-Deployment Steps

1. **Verify Deployment**
   - Check service status in Koyeb dashboard
   - Visit your application URL
   - Test the `/api/health` endpoint

2. **Custom Domain** (Optional)
   - Go to your service settings
   - Add your custom domain
   - Configure DNS records as instructed

3. **SSL Certificate**
   - Koyeb automatically provides SSL certificates
   - Your app will be available via HTTPS

## Environment Variables Reference

| Variable | Description | Required |
|----------|-------------|----------|
| `NODE_ENV` | Environment (production) | Yes |
| `NUXT_PORT` | Port number (8000) | Yes |
| `NUXT_HOST` | Host address (0.0.0.0) | Yes |
| `JWT_SECRET` | JWT signing secret | Yes |
| `SESSION_SECRET` | Session signing secret | Yes |
| `NUXT_DB_PATH` | SQLite database path | Yes |
| `NUXT_PUBLIC_API_BASE` | API base URL | No |

## Monitoring and Logs

1. **View Logs**
   ```bash
   # Using CLI
   koyeb service logs construction-service
   
   # Using npm script
   npm run koyeb:logs
   ```

2. **Check Status**
   ```bash
   # Using CLI
   koyeb service describe construction-service
   
   # Using npm script
   npm run koyeb:status
   ```

## Scaling

Koyeb automatically scales your application based on traffic:

- **Auto-scaling**: Automatically adjusts instances based on demand
- **Zero-downtime**: Deployments with zero downtime
- **Global edge**: Content served from edge locations

## Troubleshooting

### Common Issues

1. **Port Configuration**
   - Ensure port 8000 is configured in both Dockerfile and service settings
   - Verify `NUXT_PORT=8000` environment variable

2. **Database Access**
   - Check that persistent volume is mounted to `/app/data`
   - Verify database file permissions

3. **Build Failures**
   - Check build logs in Koyeb dashboard
   - Ensure all dependencies are in package.json
   - Verify Dockerfile.koyeb syntax

### Support

- **Koyeb Documentation**: [docs.koyeb.com](https://docs.koyeb.com)
- **Koyeb Community**: [community.koyeb.com](https://community.koyeb.com)
- **Status Page**: [status.koyeb.com](https://status.koyeb.com)

## Cost Optimization

- **Nano Instance**: Perfect for small to medium applications
- **Pay-per-use**: Only pay for actual usage
- **Free Tier**: Available for development and testing

Your construction management application is now ready for production deployment on Koyeb! 🚀