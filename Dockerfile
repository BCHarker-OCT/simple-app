# Use a lightweight Python image
FROM python:3.9-slim

# Install fortune for random quote generation and ensure system is up-to-date
RUN apt-get update && apt-get install -y fortune && apt-get clean

# Copy application files
WORKDIR /app
COPY app.sh /app/
COPY quotes.txt /app/

# Expose the port the app runs on
EXPOSE 8080

# Set execute permissions for the script and set it as the container's entrypoint
RUN chmod +x app.sh
ENTRYPOINT ["./app.sh"]
