# Use an official node runtime as a parent image
FROM node:22-bookworm-slim

# Install apt packages if needed (add package names if required)
RUN apt-get update && apt-get install --no-install-recommends -y

# Define build environment and application home directory arguments
ARG BUILD_ENVIRONMENT=local
ARG APP_HOME=/app

# Set the working directory for the container
WORKDIR /frontend
COPY package*.json ./
RUN npm install
COPY . /frontend

ENV NEXT_TELEMETRY_DISABLED=1
CMD ["npm", "run", "dev"]
