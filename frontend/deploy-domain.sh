#!/bin/bash

# Deploy MediBridge to mb.egamei.com with React Router support

echo "=== Deploying MediBridge to mb.egamei.com ==="

# Update Nginx configuration for your domain
sudo tee /etc/nginx/sites-available/medibridge << 'EOF'
server {
    listen 80;
    listen [::]:80;
    
    server_name mb.egamei.com www.mb.egamei.com;
    root /var/www/medibridge/frontend;
    index index.html;

    # CRITICAL: Fix React Router 404 issues
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
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
        try_files $uri /index.html;
    }

    # Security headers
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
}
EOF

# Enable the site
sudo ln -sf /etc/nginx/sites-available/medibridge /etc/nginx/sites-enabled/

# Remove default site
sudo rm -f /etc/nginx/sites-enabled/default

# Test and reload
echo "Testing Nginx configuration..."
sudo nginx -t

if [ $? -eq 0 ]; then
    echo "Reloading Nginx..."
    sudo systemctl reload nginx
    echo "✅ Successfully deployed to mb.egamei.com!"
    echo ""
    echo "Your site is now available at:"
    echo "🌐 http://mb.egamei.com"
    echo "🔐 http://mb.egamei.com/auth/callback"
    echo ""
    echo "Next steps:"
    echo "1. Test the auth callback: http://mb.egamei.com/auth/callback"
    echo "2. Set up SSL certificate: sudo certbot --nginx -d mb.egamei.com"
else
    echo "❌ Nginx configuration test failed!"
    exit 1
fi