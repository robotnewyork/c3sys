#!/usr/bin/env node

/**
 * AWS S3 Deployment Script for C3.SYS Records
 * 
 * Prerequisites:
 * 1. AWS CLI installed and configured
 * 2. S3 bucket created and configured for static website hosting
 * 3. Environment variables set (see .env.production)
 */

import { exec } from 'child_process';
import fs from 'fs';
import path from 'path';
import { config } from 'dotenv';

// Load environment variables
config({ path: '.env.production' });

const BUCKET_NAME = process.env.AWS_S3_BUCKET;
const REGION = process.env.AWS_REGION || 'us-east-1';
const CLOUDFRONT_ID = process.env.AWS_CLOUDFRONT_DISTRIBUTION_ID;
const DIST_DIR = './dist';

console.log('🚀 Starting AWS S3 deployment for C3.SYS Records...\n');

// Check if AWS CLI is installed
function checkAWSCLI() {
  return new Promise((resolve, reject) => {
    exec('aws --version', (error, stdout, stderr) => {
      if (error) {
        console.error('❌ AWS CLI not found. Please install AWS CLI first.');
        console.log('Install: https://aws.amazon.com/cli/');
        reject(error);
      } else {
        console.log('✅ AWS CLI found:', stdout.trim());
        resolve();
      }
    });
  });
}

// Build the project
function buildProject() {
  return new Promise((resolve, reject) => {
    console.log('📦 Building project...');
    exec('npm run build', (error, stdout, stderr) => {
      if (error) {
        console.error('❌ Build failed:', error.message);
        reject(error);
      } else {
        console.log('✅ Build completed successfully');
        resolve();
      }
    });
  });
}

// Sync files to S3
function syncToS3() {
  return new Promise((resolve, reject) => {
    if (!BUCKET_NAME) {
      console.error('❌ AWS_S3_BUCKET not set in .env.production');
      reject(new Error('Missing bucket name'));
      return;
    }

    console.log(`📤 Uploading to S3 bucket: ${BUCKET_NAME}...`);
    
    // Removed --delete flag to preserve existing files
    const syncCommand = `aws s3 sync ${DIST_DIR} s3://${BUCKET_NAME} --region ${REGION}`;
    
    exec(syncCommand, (error, stdout, stderr) => {
      if (error) {
        console.error('❌ S3 sync failed:', error.message);
        reject(error);
      } else {
        console.log('✅ Files uploaded to S3 successfully');
        console.log(stdout);
        resolve();
      }
    });
  });
}

// Set proper content types and cache headers
function setS3Headers() {
  return new Promise((resolve, reject) => {
    console.log('🔧 Setting proper content types and cache headers...');
    
    const commands = [
      // Set proper MIME types and cache headers for JavaScript files
      `aws s3 cp s3://${BUCKET_NAME}/assets/ s3://${BUCKET_NAME}/assets/ --recursive --exclude "*" --include "*.js" --metadata-directive REPLACE --content-type "text/javascript" --cache-control "public, max-age=31536000" --region ${REGION}`,
      
      // Set proper MIME types and cache headers for CSS files  
      `aws s3 cp s3://${BUCKET_NAME}/assets/ s3://${BUCKET_NAME}/assets/ --recursive --exclude "*" --include "*.css" --metadata-directive REPLACE --content-type "text/css" --cache-control "public, max-age=31536000" --region ${REGION}`,
      
      // Set proper MIME types and cache headers for JS map files
      `aws s3 cp s3://${BUCKET_NAME}/assets/ s3://${BUCKET_NAME}/assets/ --recursive --exclude "*" --include "*.js.map" --metadata-directive REPLACE --content-type "application/json" --cache-control "public, max-age=31536000" --region ${REGION}`,
      
      // Set no-cache for HTML files
      `aws s3 cp s3://${BUCKET_NAME}/index.html s3://${BUCKET_NAME}/index.html --metadata-directive REPLACE --cache-control "no-cache, no-store, must-revalidate" --content-type "text/html" --region ${REGION}`,
      
      // Set proper MIME types for images
      `aws s3 cp s3://${BUCKET_NAME}/images/ s3://${BUCKET_NAME}/images/ --recursive --exclude "*" --include "*.jpg" --metadata-directive REPLACE --content-type "image/jpeg" --region ${REGION}`,
      `aws s3 cp s3://${BUCKET_NAME}/images/ s3://${BUCKET_NAME}/images/ --recursive --exclude "*" --include "*.png" --metadata-directive REPLACE --content-type "image/png" --region ${REGION}`,
      `aws s3 cp s3://${BUCKET_NAME}/images/ s3://${BUCKET_NAME}/images/ --recursive --exclude "*" --include "*.svg" --metadata-directive REPLACE --content-type "image/svg+xml" --region ${REGION}`
    ];

    Promise.all(commands.map(cmd => 
      new Promise((res, rej) => {
        exec(cmd, (error, stdout, stderr) => {
          if (error) {
            console.warn('⚠️  Warning setting headers:', error.message);
          }
          res();
        });
      })
    )).then(() => {
      console.log('✅ Headers set successfully');
      resolve();
    });
  });
}

// Invalidate CloudFront cache (if configured)
function invalidateCloudFront() {
  return new Promise((resolve) => {
    if (!CLOUDFRONT_ID) {
      console.log('ℹ️  CloudFront distribution ID not set, skipping cache invalidation');
      resolve();
      return;
    }

    console.log(`🔄 Invalidating CloudFront cache: ${CLOUDFRONT_ID}...`);
    
    const invalidateCommand = `aws cloudfront create-invalidation --distribution-id ${CLOUDFRONT_ID} --paths "/*" --region ${REGION}`;
    
    exec(invalidateCommand, (error, stdout, stderr) => {
      if (error) {
        console.warn('⚠️  CloudFront invalidation failed:', error.message);
      } else {
        console.log('✅ CloudFront cache invalidated');
      }
      resolve();
    });
  });
}

// Main deployment function
async function deploy() {
  try {
    await checkAWSCLI();
    await buildProject();
    await syncToS3();
    await setS3Headers();
    await invalidateCloudFront();
    
    console.log('\n🎉 Deployment completed successfully!');
    console.log(`🌐 Your site should be available at: https://${BUCKET_NAME}.s3-website-${REGION}.amazonaws.com`);
    
    if (CLOUDFRONT_ID) {
      console.log('📡 CloudFront cache has been invalidated');
    }
    
  } catch (error) {
    console.error('\n💥 Deployment failed:', error.message);
    process.exit(1);
  }
}

// Run deployment
deploy();