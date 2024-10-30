# Use a lightweight Python image
FROM python:3.9-slim

# Install fortune for random quote generation, netcat, and clean up
RUN apt-get update && apt-get install -y fortune netcat && apt-get clean

# Set the working directory to root
WORKDIR /

# Copy application files to the root directory
COPY app.sh /
COPY quotes.txt /

# Expose the port the app runs on
EXPOSE 9000

# Set execute permissions for the script and set it as the container's entrypoint
RUN chmod +x /app.sh
ENTRYPOINT ["/app.sh"]
