# Environment Variables Configuration

This document describes all available environment variables for the Construction Management application.

## Required Environment Variables

### Application Settings
| Variable | Default | Description |
|----------|---------|-------------|
| `NODE_ENV` | `development` | Application environment (`development`, `production`) |
| `NUXT_PORT` | `3000` | Port the application listens on |
| `NUXT_HOST` | `0.0.0.0` | Host the application binds to |
| `APP_PORT` | `3000` | External port mapping for Docker |

### Database Settings
| Variable | Default | Description |
|----------|---------|-------------|
| `NUXT_DB_PATH` | `./data/construction.db` | Path to SQLite database file |

### Security Settings
| Variable | Default | Description |
|----------|---------|-------------|
| `NUXT_JWT_SECRET` | `default-jwt-secret` | Secret key for JWT token signing (CHANGE IN PRODUCTION!) |
| `NUXT_SESSION_SECRET` | `default-session-secret` | Secret key for session signing (CHANGE IN PRODUCTION!) |

### Admin User Settings
| Variable | Default | Description |
|----------|---------|-------------|
| `NUXT_ADMIN_EMAIL` | `admin@construction.com` | Default admin user email |
| `NUXT_ADMIN_PASSWORD` | `admin123` | Default admin user password (CHANGE IN PRODUCTION!) |

## Optional Environment Variables

### External Services
| Variable | Default | Description |
|----------|---------|-------------|
| `SQLITE_ADMIN_PORT` | `8080` | Port for SQLite web admin interface |

### API Settings
| Variable | Default | Description |
|----------|---------|-------------|
| `NUXT_PUBLIC_API_BASE` | `/api` | Base path for API endpoints |

## Environment Files

### Development (.env.dev)
```bash
NODE_ENV=development
NUXT_PORT=3000
NUXT_HOST=0.0.0.0
NUXT_DB_PATH=./data/construction.db
JWT_SECRET=dev-jwt-secret-key
SESSION_SECRET=dev-session-secret-key
ADMIN_EMAIL=admin@construction.local
ADMIN_PASSWORD=admin123
```

### Production (.env)
```bash
NODE_ENV=production
NUXT_PORT=3000
NUXT_HOST=0.0.0.0
NUXT_DB_PATH=/app/data/construction.db
JWT_SECRET=your-super-secure-jwt-secret-key-min-32-characters
SESSION_SECRET=your-super-secure-session-secret-key-min-32-characters
ADMIN_EMAIL=admin@yourdomain.com
ADMIN_PASSWORD=your-secure-password
```

### Koyeb Deployment (.env.koyeb)
```bash
NODE_ENV=production
NUXT_PORT=8000
NUXT_HOST=0.0.0.0
NUXT_DB_PATH=/app/data/construction.db
NUXT_JWT_SECRET=koyeb-jwt-secret-change-in-dashboard
NUXT_SESSION_SECRET=koyeb-session-secret-change-in-dashboard
NUXT_ADMIN_EMAIL=admin@yourdomain.com
NUXT_ADMIN_PASSWORD=your-secure-password
```

## Usage Examples

### Local Development
```bash
# Copy the development environment file
cp .env.dev .env

# Customize values as needed
nano .env

# Run the application
npm run dev
```

### Docker Development
```bash
# Use environment variables in docker-compose
APP_PORT=4000 ADMIN_EMAIL=admin@local.dev docker-compose -f docker-compose.dev.yml up
```

### Docker Production
```bash
# Set environment variables
export NUXT_PORT=3000
export ADMIN_EMAIL=admin@mycompany.com
export ADMIN_PASSWORD=secure-password-123

# Run with custom settings
docker-compose up
```

### Koyeb Deployment
Configure these variables in the Koyeb dashboard under your service's Environment Variables section:

- `NUXT_JWT_SECRET` - Generate a strong 32+ character secret
- `NUXT_SESSION_SECRET` - Generate a strong 32+ character secret  
- `NUXT_ADMIN_EMAIL` - Your admin email address
- `NUXT_ADMIN_PASSWORD` - A secure admin password

## Security Considerations

### Production Checklist
- [ ] Change `NUXT_JWT_SECRET` to a secure random string (32+ characters)
- [ ] Change `NUXT_SESSION_SECRET` to a secure random string (32+ characters)
- [ ] Update `NUXT_ADMIN_EMAIL` to your actual email
- [ ] Set a strong `NUXT_ADMIN_PASSWORD`
- [ ] Never commit `.env` files containing production secrets to version control
- [ ] Use environment variable management in your deployment platform
- [ ] Regularly rotate secrets

### Secret Generation
Generate secure secrets using:
```bash
# Generate a 32-character secret
openssl rand -base64 32

# Or using Node.js
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
```

## Troubleshooting

### Common Issues

1. **Port Already in Use**
   - Change `NUXT_PORT` or `APP_PORT` to an available port
   - Check what's running on the port: `netstat -tulpn | grep :3000`

2. **Database Permission Issues**
   - Ensure the data directory exists and is writable
   - Check Docker volume permissions

3. **Admin Login Not Working**
   - Verify `NUXT_ADMIN_EMAIL` and `NUXT_ADMIN_PASSWORD` are set correctly
   - Check if the database was initialized with different credentials

4. **Environment Variables Not Loading**
   - Ensure `.env` file is in the project root
   - Restart the application after changing environment variables
   - Check for syntax errors in `.env` file (no spaces around `=`)

### Debug Mode
Enable debug logging by setting:
```bash
DEBUG=nuxt:*
NUXT_DEBUG=true
```

This will provide detailed information about the application startup and configuration loading.