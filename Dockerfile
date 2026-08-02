# Stage 1: build the app
FROM node:22-alpine AS builder

WORKDIR /app

# Install dependencies first for better caching
COPY package*.json ./
COPY package-lock.json ./
RUN npm ci

# Copy app sources and build
COPY . .
RUN npm run build

# Stage 2: runtime image
FROM node:22-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production

COPY --from=builder /app/package.json ./
COPY --from=builder /app/package-lock.json ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/.svelte-kit ./.svelte-kit
COPY --from=builder /app/static ./static

EXPOSE 4173
CMD ["npm", "run", "preview", "--", "--host", "0.0.0.0", "--port", "4173"]
