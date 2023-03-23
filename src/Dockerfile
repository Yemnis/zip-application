# Use the official Node.js LTS (Long Term Support) image as the base image
FROM node:lts AS build

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install the dependencies
RUN npm ci

# Copy the rest of the application code to the working directory
COPY . .

# Build the React application
RUN npm run build

# Use the official Nginx image as the base image for the production build
FROM nginx:stable-alpine

# Copy the React build output to the Nginx container
COPY --from=build /app/build /usr/share/nginx/html

# Expose the port the app will run on
EXPOSE 3000

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
