# Construction Management System

A modern construction project management application built with Nuxt 4, featuring content management, client administration, and project tracking capabilities.

## Features

- 🏗️ **Project Management**: Track construction projects with detailed information
- 👥 **Client Administration**: Manage client relationships and communications  
- 📝 **Content Management**: Rich content editor with media library
- 🌍 **Multi-language Support**: English and Spanish localization
- 📱 **Responsive Design**: Mobile-first design approach
- 🔒 **Legal Compliance**: GDPR-compliant privacy policy and terms of service
- 🐳 **Docker Support**: Containerized deployment options
- ☁️ **Cloud Deployment**: Koyeb serverless deployment ready

## Tech Stack

- **Framework**: Nuxt 4.2.1 with Vue 3.5.22
- **Language**: TypeScript 5.9.3
- **Database**: SQLite with better-sqlite3
- **Styling**: CSS3 with responsive design
- **Content**: @nuxt/content for rich content management
- **Internationalization**: @nuxtjs/i18n for multi-language support

## Setup

Make sure to install dependencies:

```bash
# npm
npm install

# pnpm
pnpm install

# yarn
yarn install

# bun
bun install
```

## Development Server

Start the development server on `http://localhost:3000`:

```bash
# npm
npm run dev

# pnpm
pnpm dev

# yarn
yarn dev

# bun
bun run dev
```

## Production

Build the application for production:

```bash
# npm
npm run build

# pnpm
pnpm build

# yarn
yarn build

# bun
bun run build
```

Locally preview production build:

```bash
# npm
npm run preview

# pnpm
pnpm preview

# yarn
yarn preview

# bun
bun run preview
```

## Deployment Options

### Local Docker Development

```bash
# Start development environment
docker-compose -f docker-compose.dev.yml up --build

# Start production environment  
docker-compose up --build
```

### Koyeb Serverless Deployment

Deploy to Koyeb's serverless platform:

```bash
# Deploy to Koyeb
npm run koyeb:deploy

# Check deployment status
npm run koyeb:status

# View logs
npm run koyeb:logs
```

For detailed deployment instructions, see [KOYEB_DEPLOYMENT.md](./KOYEB_DEPLOYMENT.md).

## Project Structure

```
app/
├── components/         # Vue components
│   ├── AdminContent.vue    # Content management dashboard
│   ├── ContentEditor.vue   # Rich text editor
│   ├── MediaLibrary.vue    # File management
│   └── ...
├── pages/             # Application pages
│   ├── admin/         # Admin panel pages
│   ├── privacy.vue    # Privacy policy
│   ├── terms.vue      # Terms of service
│   └── ...
└── assets/            # Static assets and styles

server/
├── api/               # API endpoints
└── utils/             # Server utilities

content/               # Content files
i18n/                 # Internationalization
public/               # Public assets
```

## Database

The application uses SQLite for data persistence:

- **Development**: Local SQLite file
- **Docker**: Persistent volume mounting
- **Koyeb**: Persistent storage with automatic backups

Database initialization happens automatically via health check endpoints.

## Environment Variables

Key environment variables for production:

```bash
NODE_ENV=production
NUXT_PORT=8000
NUXT_HOST=0.0.0.0
JWT_SECRET=your-jwt-secret-key
SESSION_SECRET=your-session-secret-key
NUXT_DB_PATH=./data/construction.db
NUXT_PUBLIC_GOOGLE_CLIENT_ID=your-google-oauth-web-client-id
```

## API Endpoints

- `GET /api/health` - Health check and database initialization
- `POST /api/auth/google` - Google One Tap token verification and user upsert
- Admin endpoints for content and project management
- Media upload and management endpoints

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

For deployment and configuration questions, refer to:
- [Docker Setup Guide](./DOCKER.md)
- [Koyeb Deployment Guide](./KOYEB_DEPLOYMENT.md)
- [Nuxt Documentation](https://nuxt.com/docs)


## To Do

Setup required on your side:

Create a Google OAuth Web Client in Google Cloud Console.
Set NUXT_PUBLIC_GOOGLE_CLIENT_ID in your environment.
In Google OAuth client settings, add your site origins to Authorized JavaScript origins, for example localhost and your production domain.
Notes:

Existing app auth was mostly placeholder, so this implementation handles Google identity verification plus user creation/update, then redirects to home.
I did not run end-to-end browser testing in this session.
Next options:

Add server-side session issuance after Google login so users stay authenticated across requests.
Add route guards for admin pages based on returned user role.
Add a visible “Continue with Google” fallback button on additional pages if you want One Tap available everywhere.
