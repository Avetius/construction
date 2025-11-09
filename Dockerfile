# Use Node.js 20 Alpine as base image
FROM node:20-alpine AS base

# Install dependencies only when needed
FROM base AS deps
# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
RUN apk add --no-cache libc6-compat python3 make g++ sqlite

WORKDIR /app

# Copy package files
COPY package*.json ./
COPY pnpm-lock.yaml* ./

# Install dependencies
RUN corepack enable pnpm && pnpm install --frozen-lockfile

# Rebuild the source code only when needed
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Set environment to production
ENV NODE_ENV=production

# Build the application
RUN corepack enable pnpm && pnpm run build

# Production image, copy all the files and run nuxt
FROM base AS runner
WORKDIR /app

# Install sqlite for runtime
RUN apk add --no-cache sqlite

ENV NODE_ENV=production

# Create non-root user
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nuxtjs

# Copy built application
COPY --from=builder --chown=nuxtjs:nodejs /app/.output ./.output
COPY --from=builder --chown=nuxtjs:nodejs /app/package.json ./package.json

# Create data directory for SQLite
RUN mkdir -p /app/data && chown nuxtjs:nodejs /app/data

USER nuxtjs

# Expose port
EXPOSE 3000

# Set environment variables
ENV HOST=0.0.0.0
ENV PORT=3000
ENV NUXT_DB_PATH=/app/data/construction.db

# Start the application
CMD ["node", ".output/server/index.mjs"]