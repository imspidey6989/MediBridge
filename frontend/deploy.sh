#!/bin/bash

# MediBridge Frontend Deployment Script
# Run this script on your server to deploy the frontend

echo "=== MediBridge Frontend Deployment ==="

# Configuration - Update these paths for your server
DEPLOY_PATH="/var/www/medibridge/frontend"
NGINX_SITE_NAME="medibridge"
BACKUP_PATH="/var/backups/medibridge-$(date +%Y%m%d-%H%M%S)"

# Check if running as root
if [ "$EUID" -ne 0 ]; then 
    echo "Please run as root (use sudo)"
    exit 1
fi

# Create backup of existing deployment
if [ -d "$DEPLOY_PATH" ]; then
    echo "Creating backup at $BACKUP_PATH..."
    mkdir -p "$BACKUP_PATH"
    cp -r "$DEPLOY_PATH"/* "$BACKUP_PATH/" 2>/dev/null || true
fi

# Create deployment directory
echo "Creating deployment directory..."
mkdir -p "$DEPLOY_PATH"

# Copy built files (assumes you ran build.sh first)
echo "Copying files to $DEPLOY_PATH..."
if [ -d "deploy" ]; then
    cp -r deploy/* "$DEPLOY_PATH/"
    chown -R www-data:www-data "$DEPLOY_PATH"
    chmod -R 755 "$DEPLOY_PATH"
else
    echo "Error: 'deploy' directory not found. Please run build.sh first."
    exit 1
fi

# Setup Nginx configuration
echo "Setting up Nginx configuration..."
if [ -f "nginx-server.conf" ]; then
    cp nginx-server.conf "/etc/nginx/sites-available/$NGINX_SITE_NAME"
    
    # Enable the site
    ln -sf "/etc/nginx/sites-available/$NGINX_SITE_NAME" "/etc/nginx/sites-enabled/$NGINX_SITE_NAME"
    
    # Test nginx configuration
    nginx -t
    if [ $? -eq 0 ]; then
        echo "Reloading Nginx..."
        systemctl reload nginx
    else
        echo "Nginx configuration test failed!"
        exit 1
    fi
else
    echo "Warning: nginx-server.conf not found. Please configure Nginx manually."
fi

echo "=== Deployment completed successfully! ==="
echo "Your site should be available at: http://your-domain.com"
echo "Don't forget to:"
echo "1. Update the domain name in /etc/nginx/sites-available/$NGINX_SITE_NAME"
echo "2. Configure SSL certificate (Let's Encrypt recommended)"
echo "3. Update DNS records to point to this server"