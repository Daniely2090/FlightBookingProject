#!/bin/bash

echo "Starting DEV environment..."
docker-compose -f docker-compose.dev.yml up --build
