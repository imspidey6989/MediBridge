#!/bin/bash

# MediBridge Frontend Build Script
echo "Building MediBridge Frontend..."

# Install dependencies
echo "Installing dependencies..."
npm ci

# Build the project
echo "Building project..."
npm run build

# Create deployment directory
echo "Preparing deployment..."
mkdir -p deploy
cp -r dist/* deploy/
cp -r public/* deploy/ 2>/dev/null || true

echo "Build completed! Files are in the 'deploy' directory"
echo "You can now copy the 'deploy' directory to your web server"