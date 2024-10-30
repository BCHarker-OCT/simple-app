# Use a lightweight Alpine Python image
FROM python:3.9-alpine

# Set the working directory to root
WORKDIR /

# Copy application files to the root directory
COPY app.sh /

# Expose port 9000
EXPOSE 9000

# Set execute permissions for the script and set it as the container's entrypoint
RUN chmod +x /app.sh
ENTRYPOINT ["/app.sh"]
