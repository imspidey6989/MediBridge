# MediBridge Frontend Server Deployment Guide

## Prerequisites

### On your local machine (Windows):
- Node.js installed
- Git (to push/pull code)

### On your server (Linux):
- Ubuntu/Debian/CentOS server
- Nginx installed
- Node.js installed (for building if needed)
- Domain name pointing to your server

## Step 1: Prepare Your Code

### On your local machine:
1. Make sure all your changes are committed
2. Run the build script:
   ```bash
   # On Windows
   build.bat
   
   # On Linux/Mac
   chmod +x build.sh
   ./build.sh
   ```

## Step 2: Upload to Server

### Option A: Using Git (Recommended)
```bash
# On your server
cd /var/www
sudo git clone https://github.com/bhagyabajoria/MediBridge.git
cd MediBridge/frontend
sudo ./build.sh
```

### Option B: Upload build files directly
1. Zip the `deploy` folder from your local machine
2. Upload to your server using SCP/SFTP:
   ```bash
   scp -r deploy/ user@your-server:/tmp/medibridge-frontend/
   ```

## Step 3: Install Dependencies on Server

```bash
# Update system
sudo apt update && sudo apt upgrade -y

# Install Nginx (if not installed)
sudo apt install nginx -y

# Install Node.js (if not installed)
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs

# Start and enable Nginx
sudo systemctl start nginx
sudo systemctl enable nginx
```

## Step 4: Deploy the Application

### If you uploaded via Git:
```bash
cd /path/to/MediBridge/frontend
sudo chmod +x deploy.sh
sudo ./deploy.sh
```

### Manual deployment:
```bash
# Create deployment directory
sudo mkdir -p /var/www/medibridge/frontend

# Copy files
sudo cp -r deploy/* /var/www/medibridge/frontend/

# Set permissions
sudo chown -R www-data:www-data /var/www/medibridge/frontend
sudo chmod -R 755 /var/www/medibridge/frontend

# Copy nginx configuration
sudo cp nginx-server.conf /etc/nginx/sites-available/medibridge

# Enable the site
sudo ln -s /etc/nginx/sites-available/medibridge /etc/nginx/sites-enabled/

# Remove default nginx site (optional)
sudo rm /etc/nginx/sites-enabled/default

# Test nginx configuration
sudo nginx -t

# Reload nginx
sudo systemctl reload nginx
```

## Step 5: Configure Your Domain

1. **Update Nginx configuration:**
   ```bash
   sudo nano /etc/nginx/sites-available/medibridge
   ```
   
   Replace `your-domain.com` with your actual domain name.

2. **Make sure your domain DNS points to your server IP**

## Step 6: Set Up SSL (Highly Recommended)

```bash
# Install Certbot
sudo apt install snapd
sudo snap install core; sudo snap refresh core
sudo snap install --classic certbot

# Create certificate
sudo certbot --nginx -d your-domain.com -d www.your-domain.com

# Test auto-renewal
sudo certbot renew --dry-run
```

## Step 7: Verify Deployment

1. Visit your domain: `http://your-domain.com`
2. Check if the site loads properly
3. Test navigation and functionality

## Updating Your Deployment

When you make changes:

1. **On local machine:**
   ```bash
   # Make your changes
   # Run build
   build.bat  # or ./build.sh
   ```

2. **On server:**
   ```bash
   # Pull latest changes (if using Git)
   cd /var/www/MediBridge/frontend
   sudo git pull
   sudo ./build.sh
   sudo ./deploy.sh
   
   # Or manually copy new deploy folder
   ```

## Troubleshooting

### Check Nginx status:
```bash
sudo systemctl status nginx
```

### Check Nginx error logs:
```bash
sudo tail -f /var/log/nginx/error.log
```

### Check if port 80/443 is open:
```bash
sudo ufw status
sudo ufw allow 'Nginx Full'
```

### Restart services:
```bash
sudo systemctl restart nginx
```

## File Structure on Server

```
/var/www/medibridge/frontend/
├── index.html
├── assets/
│   ├── *.js
│   ├── *.css
│   └── images/
└── other static files...

/etc/nginx/sites-available/medibridge
/etc/nginx/sites-enabled/medibridge -> ../sites-available/medibridge
```

## Environment Variables

If your app needs environment variables, create a `.env.production` file:

```bash
# Create environment file
sudo nano /var/www/medibridge/frontend/.env.production

# Add your variables
VITE_API_URL=https://api.your-domain.com
VITE_APP_ENV=production
```

Then rebuild with:
```bash
sudo npm run build
```

Your MediBridge frontend is now deployed and running on your server!