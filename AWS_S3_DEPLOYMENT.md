# AWS S3 Deployment Guide for C3.SYS Records

This guide will help you deploy your React/Vite website to AWS S3 with optional CloudFront CDN.

## 📋 Prerequisites

### 1. AWS Account & CLI Setup
```bash
# Install AWS CLI
# Windows: Download from https://aws.amazon.com/cli/
# macOS: brew install awscli
# Linux: sudo apt install awscli

# Configure AWS credentials
aws configure
# Enter your Access Key ID, Secret Access Key, Region, and output format
```

### 2. S3 Bucket Setup

**Create S3 Bucket:**
1. Go to AWS Console → S3
2. Create a new bucket (e.g., `c3sys-records-website`)
3. **Important**: Uncheck "Block all public access"
4. Enable "Static website hosting" in bucket properties
5. Set Index document: `index.html`
6. Set Error document: `index.html` (for SPA routing)

**Bucket Policy (replace `YOUR-BUCKET-NAME`):**
```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "PublicReadGetObject",
      "Effect": "Allow",
      "Principal": "*",
      "Action": "s3:GetObject",
      "Resource": "arn:aws:s3:::YOUR-BUCKET-NAME/*"
    }
  ]
}
```

## 🚀 Deployment Methods

### Method 1: Automated Script (Recommended)

**1. Configure Environment:**

Edit `.env.production`:
```bash
# Required
AWS_S3_BUCKET=your-bucket-name
AWS_REGION=us-east-1

# Optional (for CloudFront)
AWS_CLOUDFRONT_DISTRIBUTION_ID=E1234567890123
```

**2. Deploy:**
```bash
# Using Node.js script
npm run deploy:s3

# Or using PowerShell script
.\scripts\deploy-s3.ps1
```

### Method 2: Manual AWS CLI

```bash
# Build the project
npm run build

# Sync to S3
aws s3 sync ./dist s3://your-bucket-name --delete

# Set cache headers for performance
aws s3 cp s3://your-bucket-name/assets/ s3://your-bucket-name/assets/ --recursive --metadata-directive REPLACE --cache-control "public, max-age=31536000"

# Set no-cache for HTML
aws s3 cp s3://your-bucket-name/index.html s3://your-bucket-name/index.html --metadata-directive REPLACE --cache-control "no-cache, no-store, must-revalidate" --content-type "text/html"
```

### Method 3: AWS Console Upload

```bash
# Build the project
npm run build

# Then manually upload the contents of the 'dist' folder to your S3 bucket via AWS Console
```

## 🚀 CloudFront Setup (Recommended for Production)

CloudFront provides:
- ✅ Global CDN
- ✅ HTTPS/SSL certificates
- ✅ Custom domains
- ✅ Better performance
- ✅ Reduced S3 costs

**Setup Steps:**
1. Go to AWS Console → CloudFront
2. Create Distribution
3. **Origin Domain**: Select your S3 bucket
4. **Origin Path**: Leave empty
5. **Default Root Object**: `index.html`
6. **Error Pages**: 
   - Add custom error response for 404 → `/index.html` (for SPA routing)
7. **SSL Certificate**: Use AWS or upload custom
8. **Alternate Domain Names**: Add your custom domain

**Custom Domain Setup:**
1. Get SSL certificate via AWS Certificate Manager
2. Add CNAME record in your DNS: `www.yourdomain.com` → `d123456.cloudfront.net`
3. Update CloudFront distribution with your domain

## 🔧 Configuration Files Explained

### `.env.production`
Environment variables for production deployment:
- `AWS_S3_BUCKET`: Your S3 bucket name
- `AWS_REGION`: AWS region (e.g., us-east-1)
- `AWS_CLOUDFRONT_DISTRIBUTION_ID`: CloudFront distribution for cache invalidation

### `vite.config.ts`
Updated to use `VITE_BASE_PATH` for flexible deployment paths.

### `scripts/deploy-s3.js`
Node.js deployment script that:
1. Checks AWS CLI installation
2. Builds the project
3. Syncs files to S3
4. Sets proper cache headers
5. Invalidates CloudFront cache

### `scripts/deploy-s3.ps1`
PowerShell version of the deployment script for Windows users.

## 📊 Performance Optimization

The deployment automatically sets:
- **Static Assets**: 1 year cache (`max-age=31536000`)
- **HTML Files**: No cache for instant updates
- **Gzip Compression**: Enabled via CloudFront
- **Asset Optimization**: Via Vite build process

## 💰 Cost Estimation

**S3 Only (Basic):**
- Storage: ~$0.023/GB/month
- Requests: ~$0.0004/1000 GET requests
- **Estimated monthly cost for small site: $1-5**

**S3 + CloudFront (Recommended):**
- S3 costs reduced (fewer direct requests)
- CloudFront: $0.085/GB for first 10TB
- **Estimated monthly cost: $5-15** (much better performance)

## 🔍 Troubleshooting

**404 Errors on Refresh:**
- Ensure S3 error document is set to `index.html`
- For CloudFront, add custom error response 404 → `/index.html`

**Assets Not Loading:**
- Check bucket policy allows public read access
- Verify CORS configuration if needed

**Slow Loading:**
- Set up CloudFront for global CDN
- Check cache headers are properly set

**Build Errors:**
- Run `npm run build` locally first
- Check environment variables are set correctly

## 🎯 Deployment Checklist

- [ ] AWS CLI installed and configured
- [ ] S3 bucket created and configured for static hosting
- [ ] Bucket policy set for public read access
- [ ] Environment variables configured in `.env.production`
- [ ] Test build locally: `npm run build`
- [ ] Deploy: `npm run deploy:s3`
- [ ] Test website functionality
- [ ] Set up CloudFront (optional but recommended)
- [ ] Configure custom domain (optional)
- [ ] Set up monitoring and analytics

## 🌐 Your Website URLs

After deployment, your site will be available at:
- **S3 Direct**: `https://your-bucket-name.s3-website-your-region.amazonaws.com`
- **CloudFront**: `https://d123456.cloudfront.net`
- **Custom Domain**: `https://your-domain.com` (if configured)

Your C3.SYS Records website is now ready for professional AWS hosting!