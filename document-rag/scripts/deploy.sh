#!/bin/bash

set -e

source .env

git pull origin main

docker-compose build

docker-compose run --rm app alembic upgrade head

docker-compose down
docker-compose up -d

echo "Deployment completed successfully!" 