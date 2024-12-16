# Use Node.js as the base image
FROM node:16-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json for dependency installation
COPY app/package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application files (including tsconfig.json)
COPY app/ ./

# Compile TypeScript code to JavaScript
RUN npx tsc

# Expose port 9000
EXPOSE 9000

# Run the application
CMD ["node", "src/app.js"]
