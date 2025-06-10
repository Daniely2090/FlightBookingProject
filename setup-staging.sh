#!/bin/bash

echo "Starting STAGING environment..."
docker-compose -f docker-compose.staging.yml up --build
