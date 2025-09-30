# Builder stage
FROM node:20-alpine AS builder
WORKDIR /usr/src/app

# Olib kirish: package fayllarni va node_modules cache uchun paketlar o'rnatish
COPY package*.json ./
RUN npm install --production=false

# Copy source va build
COPY tsconfig*.json ./
COPY src ./src
RUN npm run build

# Production stage
FROM node:20-alpine AS runner
WORKDIR /usr/src/app

# Production-only node_modules
COPY package*.json ./
RUN npm ci --omit=dev

# NUTQ: agar siz native modul yoki bcrypt kabi modulga muhtoj bo'lsangiz,
# 'npm ci' builder stage'da ham amalga oshirilishi mumkin. Bu holda yuqori qatlamni moslashtiring.

# Copy built app from builder
COPY --from=builder /usr/src/app/dist ./dist
# Agar sizda public/static fayllar bo'lsa:
# COPY --from=builder /usr/src/app/public ./public

# Agar siz .env faylini konteynerga qo'shmoqchi bo'lsangiz, docker-compose orqali berish tavsiya etiladi.

# Node user yaratish (opsional)
RUN addgroup -S appgroup && adduser -S appuser -G appgroup
USER appuser

ENV NODE_ENV=production
EXPOSE 3000

# Start command
CMD ["node", "dist/main"]
