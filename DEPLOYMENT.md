# Deploying to Vercel (Free)

## Quick Deployment (5 minutes)

### Option 1: Deploy via Vercel Website (Easiest)

1. **Create a GitHub Repository**
   - Go to [github.com](https://github.com) and create a new repository
   - Push your code:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/lms-demo.git
   git push -u origin main
   ```

2. **Deploy on Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Click "Sign Up" (use your GitHub account)
   - Click "Add New Project"
   - Import your GitHub repository
   - Vercel will auto-detect Vite settings
   - Click "Deploy"
   - Your app will be live in ~2 minutes! 🎉

3. **Your Live URL**
   - Vercel provides: `https://your-project-name.vercel.app`
   - Free SSL certificate included
   - Automatic deployments on every git push

### Option 2: Deploy via Vercel CLI

```bash
# Install Vercel CLI
npm install -g vercel

# Login to Vercel
vercel login

# Deploy (from project root)
vercel

# Follow the prompts:
# - Set up and deploy? Yes
# - Which scope? Your account
# - Link to existing project? No
# - Project name? lms-demo (or your choice)
# - Directory? ./ (press Enter)
# - Override settings? No

# Your app is now live!
# Production deployment:
vercel --prod
```

## Alternative Free Hosting Options

### Netlify

1. Go to [netlify.com](https://netlify.com)
2. Drag and drop your `dist` folder after running `npm run build`
3. Or connect your GitHub repo for automatic deployments

```bash
# Or use Netlify CLI
npm install -g netlify-cli
netlify login
netlify deploy --prod
```

### GitHub Pages

```bash
# Install gh-pages
npm install --save-dev gh-pages

# Add to package.json scripts:
# "deploy": "npm run build && gh-pages -d dist"

# Deploy
npm run deploy
```

### Render

1. Go to [render.com](https://render.com)
2. Connect your GitHub repository
3. Select "Static Site"
4. Build command: `npm run build`
5. Publish directory: `dist`

## Pre-Deployment Checklist

✅ Build the app locally to test:
```bash
npm run build
npm run preview
```

✅ Environment variables:
- Add `VITE_API_URL` in Vercel dashboard (Settings > Environment Variables)
- For demo without backend, the app uses mock data automatically

✅ Update README with live demo link

## Sharing with Investors

Once deployed, share:
- **Live URL**: `https://your-app.vercel.app`
- **Test Accounts**:
  - Role switcher in top bar (toggle between Student/Teacher)
  - No login required for demo (using mock data)
  
## Features Investors Can Test

### As Student:
- ✨ Dashboard with course progress
- 📚 Browse enrolled courses
- 📝 View assignments and grades
- 📅 Check calendar and deadlines
- 💬 Messages interface
- ⚙️ Profile settings

### As Teacher:
- 📊 Dashboard with statistics
- 📚 Course management
- 📝 Assignment grading
- 📈 Analytics and performance metrics
- 📅 Calendar management
- 💬 Student communications

## Custom Domain (Optional)

Vercel allows free custom domains:
1. Go to Project Settings > Domains
2. Add your domain
3. Update DNS records as instructed
4. SSL automatically configured

## Automatic Updates

Every time you push to GitHub:
- Vercel automatically rebuilds
- New version deployed in ~2 minutes
- Zero downtime deployment
- Preview URLs for branches

## Performance Features (All Free)

✅ Global CDN
✅ Automatic HTTPS
✅ Edge caching
✅ Image optimization
✅ Zero-config deployment
✅ Instant rollbacks

## Support

- Vercel Docs: [vercel.com/docs](https://vercel.com/docs)
- Vercel Community: [github.com/vercel/vercel/discussions](https://github.com/vercel/vercel/discussions)

---

**Recommendation**: Use Vercel with GitHub for the best experience. It's specifically optimized for Vite apps and provides the fastest global CDN.
