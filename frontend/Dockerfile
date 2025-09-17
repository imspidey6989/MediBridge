# Use official Node.js image for development
FROM node:20-alpine

# Set working directory
WORKDIR /app

# Copy package files
COPY package.json package-lock.json* ./

# Install dependencies (including devDependencies for development)
RUN npm ci

# Copy source code
COPY . .

# Expose port 8080 (configured in vite.config.ts)
EXPOSE 8080

# Start the development server
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]
