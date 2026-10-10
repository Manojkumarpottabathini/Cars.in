# Step 1: Build the Vite / React production bundle
FROM node:18-alpine AS build
WORKDIR /app

# Copy dependency definitions and install packages
COPY package*.json ./
RUN npm install

# Copy application source code and generate the dist directory
COPY . .
RUN npm run build

# Step 2: Serve the compiled assets using Nginx
FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html

# Expose internal port 80 for Nginx
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]