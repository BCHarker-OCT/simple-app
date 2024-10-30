# Use a lightweight Alpine Python image
FROM python:3.9-alpine

# Install fortune and netcat for random quote generation and networking
RUN apk update && \
    apk add --no-cache fortune && \
    apk add --no-cache openbsd-netcat

# Set the working directory to root
WORKDIR /

# Copy application files to the root directory
COPY app.sh /
COPY quotes.txt /

# Expose the port the app runs on (9000)
EXPOSE 9000

# Set execute permissions for the script and set it as the container's entrypoint
RUN chmod +x /app.sh
ENTRYPOINT ["/app.sh"]
