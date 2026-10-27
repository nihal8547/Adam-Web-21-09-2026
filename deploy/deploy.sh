#!/usr/bin/env bash
# Deployment script for adamtest.webbea.qa
set -e

echo "=== Pulling latest changes from Git ==="
git pull origin claude/adam-technical-services-site-s6294v

echo "=== Building and restarting Docker containers ==="
docker compose up -d --build

echo "=== Cleaning up dangling Docker images ==="
docker image prune -f

echo "=== Deployment Complete! ==="
docker compose ps
