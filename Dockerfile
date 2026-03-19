# ── Stage 1: Build client ─────────────────────────────────────
FROM node:20-alpine AS client-builder

WORKDIR /app/client

COPY client/package*.json ./
RUN npm ci --silent

COPY client/ .
RUN npm run build


# ── Stage 2: Production server ────────────────────────────────
FROM node:20-alpine AS production

# Install dumb-init for proper signal handling
RUN apk add --no-cache dumb-init

WORKDIR /app

# Copy server dependencies
COPY server/package*.json ./server/
RUN cd server && npm ci --omit=dev --silent

# Copy server source
COPY server/ ./server/

# Copy built client (served as static files if needed)
COPY --from=client-builder /app/client/dist ./client/dist

# Create non-root user
RUN addgroup -g 1001 -S nodejs && \
    adduser -S nodejs -u 1001
USER nodejs

# Expose API port
EXPOSE 5000

# Health check
HEALTHCHECK --interval=30s --timeout=10s --start-period=30s --retries=3 \
  CMD wget -qO- http://localhost:5000/api/health || exit 1

WORKDIR /app/server

ENTRYPOINT ["dumb-init", "--"]
CMD ["node", "server.js"]
