# Use a lightweight Python image
FROM python:3.9-alpine

# Set the working directory to /app
WORKDIR /app

# Copy the Python application file to /app
COPY app/app.py /app

# Expose port 9000
EXPOSE 9000

# Run the Python server
CMD ["python", "app.py"]
