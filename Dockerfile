# Use official Node.js 22 Alpine image for a lightweight base
FROM node:22-alpine

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json for reproducible builds
COPY package.json package-lock.json* ./

# Install production dependencies
RUN npm ci --production && npm cache clean --force

# Copy application code
COPY server.js ./
COPY .env ./

# Create non-root user for security
RUN addgroup -S appgroup && adduser -S appuser -G appgroup
USER appuser

# Expose port 3000
EXPOSE 3000

# Set environment for production
ENV NODE_ENV=production

# Healthcheck for monitoring
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s \
  CMD wget --no-verbose --tries=1 --spider http://localhost:3000/health || exit 1

# Run the application
CMD ["node", "server.js"]

