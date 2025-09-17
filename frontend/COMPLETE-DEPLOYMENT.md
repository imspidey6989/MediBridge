# 🚀 MediBridge Frontend Complete Deployment Guide

## Step-by-Step Instructions for mb.egamei.com

### Prerequisites

- ✅ Fresh Ubuntu/Debian server
- ✅ Domain `mb.egamei.com` pointing to your server IP
- ✅ SSH access to your server

---

## 🎯 Option 1: Automatic Deployment (Recommended)

### Step 1: Upload the script to your server

```bash
# Upload complete-deploy.sh to your server using SCP or Git
scp complete-deploy.sh user@your-server:/tmp/
```

### Step 2: Run the complete deployment

```bash
# SSH into your server
ssh user@your-server

# Make script executable and run
chmod +x /tmp/complete-deploy.sh
sudo /tmp/complete-deploy.sh
```

**That's it! The script does everything automatically.**

---

## 🔧 Option 2: Manual Step-by-Step

### Step 1: Update system and install prerequisites

```bash
# Update system
sudo apt update && sudo apt upgrade -y

# Install required packages
sudo apt install -y nginx nodejs npm curl git
```

### Step 2: Install Node.js 20 (recommended)

```bash
# Install Node.js 20
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs

# Verify installation
node --version
npm --version
```

### Step 3: Clone your repository

```bash
# Navigate to web directory
cd /var/www

# Clone repository
sudo git clone https://github.com/bhagyabajoria/MediBridge.git

# Navigate to frontend
cd MediBridge/frontend
```

### Step 4: Install dependencies and build

```bash
# Install dependencies
sudo npm install

# Build the project
sudo npm run build

# Verify build folder exists
ls -la dist/
```

### Step 5: Deploy files

```bash
# Create deployment directory
sudo mkdir -p /var/www/medibridge/frontend

# Copy built files
sudo cp -r dist/* /var/www/medibridge/frontend/

# Set proper permissions
sudo chown -R www-data:www-data /var/www/medibridge/frontend
sudo chmod -R 755 /var/www/medibridge/frontend

# Verify files are copied
ls -la /var/www/medibridge/frontend/
```

### Step 6: Configure Nginx

```bash
# Create nginx configuration
sudo tee /etc/nginx/sites-available/medibridge << 'EOF'
server {
    listen 80;
    listen [::]:80;

    server_name mb.egamei.com www.mb.egamei.com;
    root /var/www/medibridge/frontend;
    index index.html;

    # Enable gzip compression
    gzip on;
    gzip_vary on;
    gzip_min_length 1024;
    gzip_comp_level 6;
    gzip_types text/plain text/css text/xml text/javascript application/javascript application/xml+rss application/json;

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
    add_header X-XSS-Protection "1; mode=block" always;
}
EOF
```

### Step 7: Enable site and restart Nginx

```bash
# Enable the site
sudo ln -sf /etc/nginx/sites-available/medibridge /etc/nginx/sites-enabled/

# Remove default site
sudo rm -f /etc/nginx/sites-enabled/default

# Test nginx configuration
sudo nginx -t

# Restart nginx
sudo systemctl restart nginx

# Enable nginx to start on boot
sudo systemctl enable nginx
```

### Step 8: Configure firewall (if needed)

```bash
# Check firewall status
sudo ufw status

# Allow HTTP and HTTPS
sudo ufw allow 'Nginx Full'

# Or manually
sudo ufw allow 80
sudo ufw allow 443
```

---

## ✅ Verification Steps

### Test your deployment

```bash
# Test locally on server
curl -I http://localhost

# Test with domain
curl -I http://mb.egamei.com

# Test auth callback route
curl -I http://mb.egamei.com/auth/callback

# Should all return "200 OK"
```

### Check logs if there are issues

```bash
# Check nginx status
sudo systemctl status nginx

# Check nginx error logs
sudo tail -20 /var/log/nginx/error.log

# Check nginx access logs
sudo tail -20 /var/log/nginx/access.log

# Check what files exist
ls -la /var/www/medibridge/frontend/
```

---

## 🔒 Step 9: Set Up SSL (Highly Recommended)

```bash
# Install Certbot
sudo snap install core
sudo snap refresh core
sudo snap install --classic certbot

# Get SSL certificate
sudo certbot --nginx -d mb.egamei.com -d www.mb.egamei.com

# Test auto-renewal
sudo certbot renew --dry-run
```

---

## 🔄 Updating Your Site

When you make changes to your code:

```bash
# Go to project directory
cd /var/www/MediBridge/frontend

# Pull latest changes
sudo git pull

# Rebuild
sudo npm run build

# Deploy new files
sudo cp -r dist/* /var/www/medibridge/frontend/

# Restart nginx (optional)
sudo systemctl reload nginx
```

---

## 🆘 Troubleshooting

### Common Issues:

**1. 404 errors on routes:**

- Check nginx config has `try_files $uri $uri/ /index.html;`

**2. Permission denied:**

```bash
sudo chown -R www-data:www-data /var/www/medibridge/frontend
sudo chmod -R 755 /var/www/medibridge/frontend
```

**3. Nginx won't start:**

```bash
sudo nginx -t
sudo systemctl status nginx
```

**4. Files not found:**

```bash
ls -la /var/www/medibridge/frontend/
# Should contain index.html and assets folder
```

### Useful Commands:

```bash
# Restart everything
sudo systemctl restart nginx

# Check what's running on port 80
sudo netstat -tlnp | grep :80

# Check nginx configuration
sudo nginx -T

# Monitor logs in real-time
sudo tail -f /var/log/nginx/error.log
```

---

## 🎉 Success!

After completing these steps, your MediBridge frontend will be:

✅ **Live at**: http://mb.egamei.com  
✅ **Auth callback working**: http://mb.egamei.com/auth/callback  
✅ **All React routes working**: No more 404 errors  
✅ **Optimized**: Gzip compression and caching  
✅ **Secure**: Basic security headers

🔒 **With SSL**: https://mb.egamei.com (after Step 9)
