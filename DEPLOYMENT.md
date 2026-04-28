# Deployment Guide - Vercel

## 🚀 Quick Deploy

1. **Push to GitHub**:
```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin your-repo-url
git push -u origin main
```

2. **Deploy on Vercel**:
   - Go to [vercel.com](https://vercel.com)
   - Click "Import Project"
   - Select your GitHub repository
   - Click "Deploy"

3. **Add Environment Variables**:
   - Go to Project Settings → Environment Variables
   - Add all variables from `.env.example`
   - Redeploy

## 🗄️ Database Setup

### Option 1: Vercel Postgres

1. In Vercel dashboard, go to Storage tab
2. Click "Create Database" → "Postgres"
3. Environment variables will be added automatically
4. Run migrations:
```bash
npx prisma migrate deploy
```

### Option 2: External Database

1. Setup MongoDB Atlas or other database
2. Add connection string to Vercel environment variables
3. Run migrations

## 🔐 Generate Secrets

```bash
# Generate NEXTAUTH_SECRET
openssl rand -base64 32
```

## ✅ Post-Deployment Checklist

- [ ] Environment variables added
- [ ] Database connected
- [ ] Migrations run
- [ ] Custom domain configured (optional)
- [ ] Test all features
- [ ] Check error logs

## 🌐 Custom Domain

1. Go to Project Settings → Domains
2. Add your domain
3. Update DNS records as shown
4. Update NEXTAUTH_URL to your domain

## 📊 Monitoring

- Check Vercel Analytics
- Monitor error logs in Vercel dashboard
- Setup alerts for critical errors

## 🔄 Updates

```bash
# Make changes locally
git add .
git commit -m "Update message"
git push

# Vercel will auto-deploy
```

---

**Your app will be live at**: `https://your-project.vercel.app`
