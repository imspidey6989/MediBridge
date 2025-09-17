#!/bin/bash

# Complete MediBridge Frontend Deployment Script
# This script does everything from build to deployment

set -e  # Exit on any error

echo "================================================"
echo "🚀 MediBridge Frontend Complete Deployment"
echo "================================================"

# Configuration
DOMAIN="mb.egamei.com"
DEPLOY_PATH="/var/www/medibridge/frontend"
PROJECT_PATH="/var/www/MediBridge/frontend"

echo "📋 Configuration:"
echo "   Domain: $DOMAIN"
echo "   Deploy Path: $DEPLOY_PATH"
echo "   Project Path: $PROJECT_PATH"
echo ""

# Step 1: Update system and install prerequisites
echo "🔧 Step 1: Installing prerequisites..."
sudo apt update -y
sudo apt install -y nginx nodejs npm curl

# Step 2: Clone repository if it doesn't exist
echo "📥 Step 2: Getting source code..."
if [ ! -d "/var/www/MediBridge" ]; then
    cd /var/www
    sudo git clone https://github.com/bhagyabajoria/MediBridge.git
fi

# Step 3: Navigate to project and install dependencies
echo "📦 Step 3: Installing dependencies..."
cd $PROJECT_PATH
sudo npm install

# Step 4: Build the project
echo "🏗️  Step 4: Building project..."
sudo npm run build

# Step 5: Create deployment directory and copy files
echo "📁 Step 5: Deploying files..."
sudo mkdir -p $DEPLOY_PATH
sudo cp -r dist/* $DEPLOY_PATH/

# Step 6: Set proper permissions
echo "🔐 Step 6: Setting permissions..."
sudo chown -R www-data:www-data $DEPLOY_PATH
sudo chmod -R 755 $DEPLOY_PATH

# Step 7: Configure Nginx
echo "⚙️  Step 7: Configuring Nginx..."
sudo tee /etc/nginx/sites-available/medibridge << EOF
server {
    listen 80;
    listen [::]:80;
    
    server_name $DOMAIN www.$DOMAIN;
    root $DEPLOY_PATH;
    index index.html;

    # Enable gzip compression
    gzip on;
    gzip_vary on;
    gzip_min_length 1024;
    gzip_comp_level 6;
    gzip_types text/plain text/css text/xml text/javascript application/javascript application/xml+rss application/json;

    # CRITICAL: Fix React Router 404 issues
    location / {
        try_files \$uri \$uri/ /index.html;
    }

    # Handle auth routes specifically
    location /auth {
        try_files \$uri \$uri/ /index.html;
    }

    location /auth/callback {
        try_files \$uri \$uri/ /index.html;
    }

    # Cache static assets
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
        try_files \$uri /index.html;
    }

    # Security headers
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;
}
EOF

# Step 8: Enable site and remove default
echo "🔗 Step 8: Enabling site..."
sudo ln -sf /etc/nginx/sites-available/medibridge /etc/nginx/sites-enabled/
sudo rm -f /etc/nginx/sites-enabled/default

# Step 9: Test and start services
echo "✅ Step 9: Testing and starting services..."
sudo nginx -t

if [ $? -eq 0 ]; then
    sudo systemctl enable nginx
    sudo systemctl restart nginx
    echo ""
    echo "================================================"
    echo "🎉 DEPLOYMENT SUCCESSFUL!"
    echo "================================================"
    echo "✅ Your site is now live at:"
    echo "   🌐 http://$DOMAIN"
    echo "   🔐 http://$DOMAIN/auth/callback"
    echo ""
    echo "🔒 Next steps for SSL:"
    echo "   sudo snap install --classic certbot"
    echo "   sudo certbot --nginx -d $DOMAIN -d www.$DOMAIN"
    echo ""
    echo "🔍 Troubleshooting commands:"
    echo "   sudo systemctl status nginx"
    echo "   sudo tail -f /var/log/nginx/error.log"
    echo "   curl -I http://$DOMAIN"
    echo "================================================"
else
    echo "❌ Nginx configuration test failed!"
    echo "Check the logs: sudo nginx -t"
    exit 1
fi