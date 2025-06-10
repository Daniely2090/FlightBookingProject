#!/bin/bash

echo "Starting PROD environment..."
docker-compose -f docker-compose.prod.yml up --build
