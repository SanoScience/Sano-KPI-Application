# Base image
FROM denoland/deno:ubuntu AS base

# Install runtime dependencies
# RUN apk add --no-cache libc6-compat

# Build dependencies stage
FROM base AS deps
WORKDIR /app

# Install project dependencies
COPY package.json yarn.lock* package-lock.json* pnpm-lock.yaml* deno.json ./
# RUN \
#   if [ -f yarn.lock ]; then yarn --frozen-lockfile; \
#   elif [ -f package-lock.json ]; then npm ci --force; \
#   elif [ -f pnpm-lock.yaml ]; then corepack enable pnpm && pnpm i --frozen-lockfile; \
#   else echo "Lockfile not found." && exit 1; \
#   fi
RUN deno install --allow-scripts

# Build stage
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Disable Next.js telemetry
ENV NEXT_TELEMETRY_DISABLED=1

# Build the Next.js application
# RUN \
#   if [ -f yarn.lock ]; then yarn run build; \
#   elif [ -f package-lock.json ]; then npm run build; \
#   elif [ -f pnpm-lock.yaml ]; then corepack enable pnpm && pnpm run build; \
#   else echo "Lockfile not found." && exit 1; \
#   fi

RUN deno task build

# Production runtime stage
FROM base AS runner

# Install runtime dependencies: docker-cli, sqlite, and web-push

WORKDIR /app

# Disable Next.js telemetry
ENV NEXT_TELEMETRY_DISABLED=1

# Copy built assets from builder
COPY --from=builder /app/public ./public
# COPY --from=builder /app/.next/standalone ./.next/standalone
# COPY --from=builder /app/.next/static ./.next/standalone/.next
# COPY --from=builder /app/dist ./dist
COPY --from=builder /app/.env ./.env
COPY --from=builder /app/deno.json ./deno.json
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/.next ./.next

COPY --from=builder /app/node_modules ./node_modules
# Create necessary directories and set permissions
# RUN mkdir .next
# Uncomment and modify the following lines if you create a dedicated user
# RUN addgroup --system --gid 1001 nodejs
# RUN adduser --system --uid 1001 nextjs
# RUN chown nextjs:nodejs .next

# Expose the application port
EXPOSE 3010

# Set environment variables
ENV PORT=3010
ENV HOSTNAME="0.0.0.0"
ENV NODE_ENV=production



# Use the entrypoint to conditionally run migrations
CMD ["deno", "task", "start"]
