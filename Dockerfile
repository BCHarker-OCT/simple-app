# Use Node.js as the base image
# FROM node:21.7.3-alpine
# Uncomment the next line if you want to use OCT base image
FROM harbor.octanner.io/base/oct-node:20-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json for dependency installation
COPY app/package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application files (including tsconfig.json and src directory)
COPY app/ ./


RUN npm install -g typescript
RUN tsc --project tsconfig.json


# Expose port 9000
EXPOSE 9000

# Run the application
CMD ["node", "dist/app.js"]
