# PowerShell deployment script for AWS S3
# C3.SYS Records Website Deployment

param(
    [string]$BucketName = $env:AWS_S3_BUCKET,
    [string]$Region = $env:AWS_REGION,
    [string]$CloudFrontId = $env:AWS_CLOUDFRONT_DISTRIBUTION_ID
)

Write-Host "🚀 Starting AWS S3 deployment for C3.SYS Records..." -ForegroundColor Green
Write-Host ""

# Check if AWS CLI is installed
try {
    $awsVersion = aws --version 2>$null
    Write-Host "✅ AWS CLI found: $awsVersion" -ForegroundColor Green
} catch {
    Write-Host "❌ AWS CLI not found. Please install AWS CLI first." -ForegroundColor Red
    Write-Host "Install from: https://aws.amazon.com/cli/" -ForegroundColor Yellow
    exit 1
}

# Check if bucket name is provided
if (-not $BucketName) {
    Write-Host "❌ AWS_S3_BUCKET not set. Please set environment variable or provide -BucketName parameter" -ForegroundColor Red
    exit 1
}

# Set default region if not provided
if (-not $Region) {
    $Region = "us-east-1"
}

# Build the project
Write-Host "📦 Building project..." -ForegroundColor Blue
try {
    npm run build
    Write-Host "✅ Build completed successfully" -ForegroundColor Green
} catch {
    Write-Host "❌ Build failed" -ForegroundColor Red
    exit 1
}

# Sync to S3
Write-Host "📤 Uploading to S3 bucket: $BucketName..." -ForegroundColor Blue
try {
    aws s3 sync ./dist s3://$BucketName --delete --region $Region
    Write-Host "✅ Files uploaded to S3 successfully" -ForegroundColor Green
} catch {
    Write-Host "❌ S3 sync failed" -ForegroundColor Red
    exit 1
}

# Set cache headers for static assets
Write-Host "🔧 Setting cache headers for static assets..." -ForegroundColor Blue
try {
    aws s3 cp s3://$BucketName/assets/ s3://$BucketName/assets/ --recursive --metadata-directive REPLACE --cache-control "public, max-age=31536000" --region $Region 2>$null
    aws s3 cp s3://$BucketName/index.html s3://$BucketName/index.html --metadata-directive REPLACE --cache-control "no-cache, no-store, must-revalidate" --content-type "text/html" --region $Region 2>$null
    Write-Host "✅ Cache headers set successfully" -ForegroundColor Green
} catch {
    Write-Host "⚠️  Warning: Could not set all cache headers" -ForegroundColor Yellow
}

# Invalidate CloudFront cache if distribution ID is provided
if ($CloudFrontId) {
    Write-Host "🔄 Invalidating CloudFront cache: $CloudFrontId..." -ForegroundColor Blue
    try {
        aws cloudfront create-invalidation --distribution-id $CloudFrontId --paths "/*" --region $Region | Out-Null
        Write-Host "✅ CloudFront cache invalidated" -ForegroundColor Green
    } catch {
        Write-Host "⚠️  CloudFront invalidation failed" -ForegroundColor Yellow
    }
} else {
    Write-Host "ℹ️  CloudFront distribution ID not set, skipping cache invalidation" -ForegroundColor Cyan
}

Write-Host ""
Write-Host "🎉 Deployment completed successfully!" -ForegroundColor Green
Write-Host "🌐 Your site should be available at: https://$BucketName.s3-website-$Region.amazonaws.com" -ForegroundColor Cyan

if ($CloudFrontId) {
    Write-Host "📡 CloudFront cache has been invalidated" -ForegroundColor Cyan
}