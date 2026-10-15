# Deployment Guide for C3.SYS Records

This guide covers multiple deployment options for your React/Vite application.

## 🚀 Quick Deployment Options

### 1. Vercel (Recommended)

**Via CLI:**
```bash
# Install Vercel CLI
npm install -g vercel

# Build and deploy
npm run build
vercel --prod
```

**Via GitHub Integration:**
1. Push code to GitHub
2. Visit [vercel.com](https://vercel.com)
3. Import your repository
4. Auto-deploys on every push!

**Benefits:**
- ✅ Automatic HTTPS
- ✅ Global CDN
- ✅ Preview deployments
- ✅ Custom domains
- ✅ Perfect for React/Vite

---

### 2. Netlify

**Drag & Drop Method:**
```bash
npm run build
# Then drag the 'dist' folder to netlify.com
```

**CLI Method:**
```bash
# Install Netlify CLI
npm install -g netlify-cli

# Deploy
npm run deploy:netlify
```

**Via GitHub:**
1. Connect GitHub repository
2. Build command: `npm run build`
3. Publish directory: `dist`

---

### 3. GitHub Pages

**Setup:**
1. Push your code to GitHub
2. Go to Settings > Pages
3. Select "GitHub Actions" as source
4. The `.github/workflows/deploy.yml` file will handle deployment

**Custom Domain (optional):**
- Add a `CNAME` file to `/public` with your domain
- Configure DNS to point to your GitHub Pages URL

---

### 4. Firebase Hosting

**Setup:**
```bash
# Install Firebase CLI
npm install -g firebase-tools

# Login and initialize
firebase login
firebase init hosting

# Deploy
npm run build
firebase deploy
```

The `firebase.json` file is already configured for you.

---

### 5. Surge.sh (Simple & Fast)

```bash
# Install Surge
npm install -g surge

# Deploy
npm run deploy:surge
```

First time will ask for domain name and credentials.

---

## 🛠️ Build Configuration

### Environment Variables

For different environments, create:

**`.env.production`:**
```
VITE_API_URL=https://your-api.com
VITE_SITE_URL=https://your-domain.com
```

**`.env.development`:**
```
VITE_API_URL=http://localhost:3001
VITE_SITE_URL=http://localhost:3000
```

### Custom Domain Setup

1. **Purchase domain** from provider (Namecheap, GoDaddy, etc.)
2. **Configure DNS:**
   - Vercel: Add CNAME record pointing to `cname.vercel-dns.com`
   - Netlify: Add CNAME record pointing to your Netlify subdomain
   - GitHub Pages: Add CNAME record pointing to `username.github.io`

### Performance Optimization

Your site is already optimized with:
- ✅ Code splitting
- ✅ Asset optimization
- ✅ CSS minification
- ✅ Tree shaking

## 📊 Recommended Hosting by Use Case

| Use Case | Best Option | Why |
|----------|-------------|-----|
| **Portfolio/Demo** | Vercel | Free, fast, great DX |
| **Commercial Site** | Vercel/Netlify | Professional features |
| **Open Source** | GitHub Pages | Free, integrated |
| **Quick Test** | Surge.sh | Instant deployment |
| **Google Ecosystem** | Firebase | Integration with other Google services |

## 🔧 Deployment Commands Summary

```bash
# Build the project
npm run build

# Preview build locally
npm run preview

# Deploy to various platforms
npm run deploy:surge      # Surge.sh
npm run deploy:netlify    # Netlify
vercel --prod            # Vercel
firebase deploy          # Firebase
```

## 🌐 Post-Deployment Checklist

- [ ] Test all pages and functionality
- [ ] Verify audio player works
- [ ] Check responsive design on mobile
- [ ] Test navigation and routing
- [ ] Ensure assets load correctly
- [ ] Set up custom domain (if needed)
- [ ] Configure analytics (Google Analytics, etc.)
- [ ] Set up error monitoring (Sentry, etc.)

Choose the platform that best fits your needs and budget!