#!/bin/bash

# Exit on error
set -e

# Load environment variables
source .env

# Pull latest changes
git pull origin main

# Build and start services
docker-compose -f docker-compose.yml -f docker-compose.prod.yml build
docker-compose -f docker-compose.yml -f docker-compose.prod.yml up -d

# Run migrations
docker-compose exec backend npm run migrate
docker-compose exec rag-service alembic upgrade head

echo "Deployment completed successfully!" 