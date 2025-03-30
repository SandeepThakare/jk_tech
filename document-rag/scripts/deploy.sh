#!/bin/bash

# Exit on error
set -e

# Load environment variables
source .env

# Pull latest changes
git pull origin main

# Build docker image
docker-compose build

# Run migrations
docker-compose run --rm app alembic upgrade head

# Restart services
docker-compose down
docker-compose up -d

echo "Deployment completed successfully!" 