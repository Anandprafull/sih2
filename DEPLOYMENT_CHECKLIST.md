# 🚀 Deployment Checklist - DPR Analyzer

## Pre-Deployment Tasks

### 1. Environment Configuration ✅
- [ ] Create `.env` file with Sarvam AI key
- [ ] Verify API key is valid
- [ ] Test translation in development
- [ ] Remove any test/debug keys

```env
VITE_SARVAM_API_KEY=your_production_api_key_here
```

### 2. PWA Assets 🎨
- [ ] Replace `public/icon-192.png` with actual app icon
- [ ] Replace `public/icon-512.png` with actual app icon
- [ ] Add `public/screenshot1.png` (1280×720 for desktop)
- [ ] Add `public/screenshot2.png` (750×1334 for mobile)
- [ ] Add shortcut icons (upload-icon.png, projects-icon.png)
- [ ] Verify icons are square and maskable
- [ ] Test icons on different backgrounds

**Icon Requirements:**
- 192×192: For Android devices
- 512×512: For splash screens
- Format: PNG with transparency
- Design: Simple, recognizable at small sizes

### 3. Build & Optimization 🔧
- [ ] Run production build: `npm run build`
- [ ] Check dist/ size (<5MB recommended)
- [ ] Test production preview: `npm run preview`
- [ ] Verify all routes work in production
- [ ] Check console for warnings/errors
- [ ] Test service worker registration

```bash
npm run build
npm run preview
# Open http://localhost:4173
```

### 4. Testing Checklist 🧪

#### Functionality Tests
- [ ] Upload PDF document (success flow)
- [ ] Upload invalid file (error handling)
- [ ] Save analysis (localStorage)
- [ ] Delete saved analysis
- [ ] Export to Excel (verify 5 sheets)
- [ ] Export to JSON (verify structure)
- [ ] Compare 2 DPRs
- [ ] Search & filter risks
- [ ] Navigate all tabs
- [ ] Q&A with AI assistant

#### PWA Tests
- [ ] Install on Chrome desktop
- [ ] Install on Edge desktop
- [ ] Install on iOS Safari
- [ ] Install on Android Chrome
- [ ] Verify standalone mode works
- [ ] Test offline mode (disable network)
- [ ] Verify offline.html appears
- [ ] Test service worker cache
- [ ] Check manifest in DevTools

#### Multilingual Tests
- [ ] Switch to Hindi (verify translation)
- [ ] Switch to Tamil (verify translation)
- [ ] Switch to Bengali (verify translation)
- [ ] Test with poor network (cached labels)
- [ ] Verify language persists on reload

#### Visual Tests
- [ ] Dark mode toggle works
- [ ] Dark mode persists on reload
- [ ] All animations smooth (60fps)
- [ ] No layout shifts
- [ ] Icons render correctly
- [ ] Charts display properly

#### Responsive Tests
- [ ] Mobile (375px - iPhone SE)
- [ ] Mobile (390px - iPhone 12/13/14)
- [ ] Tablet (768px - iPad)
- [ ] Desktop (1920×1080)
- [ ] Ultra-wide (2560px)

### 5. Performance Audit 📊

#### Lighthouse Scores (Target)
- [ ] Performance: 90+
- [ ] Accessibility: 95+
- [ ] Best Practices: 95+
- [ ] SEO: 90+
- [ ] PWA: 100 ✓

Run Lighthouse:
```
1. Open DevTools (F12)
2. Go to Lighthouse tab
3. Select "Progressive Web App"
4. Click "Analyze page load"
```

#### Bundle Analysis
- [ ] Check bundle size: `npm run build -- --mode=analyze`
- [ ] Identify large dependencies
- [ ] Code split heavy routes
- [ ] Lazy load components

### 6. Security Review 🔒
- [ ] No API keys in client code (only .env)
- [ ] HTTPS required for PWA (production)
- [ ] Content Security Policy headers
- [ ] No console.log in production
- [ ] Sanitize user inputs
- [ ] Validate file uploads

### 7. Browser Compatibility 🌐
- [ ] Chrome 90+ (Desktop)
- [ ] Chrome 90+ (Android)
- [ ] Edge 90+ (Desktop)
- [ ] Safari 14+ (iOS)
- [ ] Safari 14+ (macOS)
- [ ] Firefox 88+ (Desktop)

### 8. Documentation 📚
- [ ] Update README.md
- [ ] Review IMPLEMENTATION_SUMMARY.md
- [ ] Review QUICK_START_GUIDE.md
- [ ] Add deployment instructions
- [ ] Document environment variables
- [ ] Create user manual (if needed)

---

## Deployment Steps

### Option 1: Vercel (Recommended)

```bash
# 1. Install Vercel CLI
npm i -g vercel

# 2. Login
vercel login

# 3. Deploy
vercel

# 4. Set environment variables
vercel env add VITE_SARVAM_API_KEY

# 5. Production deployment
vercel --prod
```

**Vercel Configuration (vercel.json):**
```json
{
  "rewrites": [
    { "source": "/(.*)", "destination": "/index.html" }
  ],
  "headers": [
    {
      "source": "/sw.js",
      "headers": [
        {
          "key": "Service-Worker-Allowed",
          "value": "/"
        }
      ]
    }
  ]
}
```

### Option 2: Netlify

```bash
# 1. Install Netlify CLI
npm i -g netlify-cli

# 2. Login
netlify login

# 3. Initialize
netlify init

# 4. Deploy
netlify deploy --prod
```

**Netlify Configuration (netlify.toml):**
```toml
[build]
  command = "npm run build"
  publish = "dist"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200

[[headers]]
  for = "/sw.js"
  [headers.values]
    Service-Worker-Allowed = "/"
```

### Option 3: GitHub Pages

```bash
# 1. Install gh-pages
npm install -D gh-pages

# 2. Add to package.json scripts
"deploy": "npm run build && gh-pages -d dist"

# 3. Deploy
npm run deploy
```

**Vite Config for GitHub Pages (vite.config.ts):**
```typescript
export default defineConfig({
  base: '/your-repo-name/',
  // ... rest of config
})
```

### Option 4: Custom Server

```bash
# 1. Build production
npm run build

# 2. Copy dist/ to server
scp -r dist/* user@server:/var/www/html/

# 3. Configure nginx
# Add redirect rules for SPA
# Add headers for service worker
```

**Nginx Configuration:**
```nginx
server {
  listen 80;
  server_name your-domain.com;

  root /var/www/html;
  index index.html;

  location / {
    try_files $uri $uri/ /index.html;
  }

  location /sw.js {
    add_header Service-Worker-Allowed /;
    add_header Cache-Control "no-cache";
  }
}
```

---

## Post-Deployment Verification

### 1. Smoke Tests (Production URL)
- [ ] Visit production URL
- [ ] Verify homepage loads
- [ ] Check all routes work
- [ ] Test upload flow
- [ ] Verify PWA installability
- [ ] Test offline mode

### 2. Monitor Console
- [ ] No JavaScript errors
- [ ] Service worker registers
- [ ] No 404 errors for assets
- [ ] API calls successful

### 3. Test from Different Devices
- [ ] Desktop (Windows)
- [ ] Desktop (macOS)
- [ ] Mobile (iOS)
- [ ] Mobile (Android)
- [ ] Tablet

### 4. Share with Team
- [ ] Send production URL
- [ ] Share installation instructions
- [ ] Collect feedback
- [ ] Monitor analytics

---

## Rollback Plan

If issues arise:

```bash
# Vercel rollback
vercel rollback

# Netlify rollback
netlify deploy --alias previous-version

# GitHub Pages rollback
git revert HEAD
npm run deploy
```

---

## Monitoring & Analytics

### Add Analytics (Optional)

**Google Analytics:**
```html
<!-- Add to index.html -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>
```

**Sentry Error Tracking:**
```typescript
// Add to main.tsx
import * as Sentry from "@sentry/react";

Sentry.init({
  dsn: "YOUR_SENTRY_DSN",
  environment: import.meta.env.MODE,
});
```

### Monitor
- [ ] Error rates
- [ ] Page load times
- [ ] PWA install rates
- [ ] User engagement
- [ ] Translation API usage

---

## Maintenance Tasks

### Weekly
- [ ] Check error logs
- [ ] Review user feedback
- [ ] Monitor API usage
- [ ] Update dependencies

### Monthly
- [ ] Security audit
- [ ] Performance review
- [ ] Backup user data patterns
- [ ] Update documentation

### Quarterly
- [ ] Major dependency updates
- [ ] Feature enhancements
- [ ] User satisfaction survey
- [ ] Competitive analysis

---

## Support Contacts

**Technical Issues:**
- Development Team: [email]
- Sarvam AI Support: https://www.sarvam.ai/support

**Deployment Issues:**
- Vercel Support: https://vercel.com/support
- Netlify Support: https://www.netlify.com/support/

---

## Success Criteria ✅

Deployment is successful when:
- ✅ All 15 features working
- ✅ Zero console errors
- ✅ PWA installable on all platforms
- ✅ Lighthouse PWA score: 100
- ✅ All tests passing
- ✅ Responsive on all devices
- ✅ Translations working
- ✅ Offline mode functional
- ✅ Service worker active
- ✅ Team approval received

---

## 🎉 Launch Checklist

Final steps before going live:
1. ✅ All tests passed
2. ✅ Documentation complete
3. ✅ Team training done
4. ✅ Backup plan ready
5. ✅ Monitoring setup
6. ✅ Support contacts shared
7. ✅ Announcement prepared
8. 🚀 **DEPLOY!**

---

**Good luck with your deployment! 🚀**

**Questions?** Review [QUICK_START_GUIDE.md](./QUICK_START_GUIDE.md)

**Issues?** Check troubleshooting section

**Ready?** Let's ship this! 📦
