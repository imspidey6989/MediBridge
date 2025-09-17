#!/bin/bash

# Fix React Router 404 issues - Quick deployment script

echo "=== Fixing React Router 404 Issues ==="

# Step 1: Update Nginx configuration for React Router
echo "Updating Nginx configuration..."

sudo tee /etc/nginx/sites-available/medibridge << 'EOF'
server {
    listen 80;
    listen [::]:80;
    
    server_name mb.egamei.com www.mb.egamei.com;
    root /var/www/medibridge/frontend;
    index index.html;

    # CRITICAL: This fixes React Router 404 issues
    location / {
        try_files $uri $uri/ /index.html;
    }

    # Handle auth routes specifically
    location /auth {
        try_files $uri $uri/ /index.html;
    }

    location /auth/callback {
        try_files $uri $uri/ /index.html;
    }

    # Cache static assets
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
        try_files $uri /index.html;
    }

    # Security headers
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;
}
EOF

# Step 2: Enable the site
sudo ln -sf /etc/nginx/sites-available/medibridge /etc/nginx/sites-enabled/

# Step 3: Remove default site
sudo rm -f /etc/nginx/sites-enabled/default

# Step 4: Test and reload
echo "Testing Nginx configuration..."
sudo nginx -t

if [ $? -eq 0 ]; then
    echo "Reloading Nginx..."
    sudo systemctl reload nginx
    echo "✅ Configuration updated successfully!"
    echo "Your React Router should now work properly."
    echo "Test by visiting: http://your-server-ip/auth/callback"
else
    echo "❌ Nginx configuration test failed!"
    exit 1
fi