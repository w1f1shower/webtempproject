# === STAGE 1: Build ===
FROM node:20-alpine AS builder

WORKDIR /app

# Copy source
COPY package.json tsconfig.json ./
COPY src/ ./src

# Install deps and build
RUN npm install
RUN npm run build


# === STAGE 2: Nginx ===
FROM nginx:alpine AS runner

# Clean default Nginx stuff
RUN rm -rf /var/www/html/*

# Insert my stuff
COPY nginx.conf /etc/nginx/nginx.conf

# Copy built files from builder
COPY --from=builder /app/dist /var/www/html/

# Open port :80
EXPOSE 80

# Run Nginx on foreground, so container won't die
CMD ["nginx", "-g", "daemon off;"]
