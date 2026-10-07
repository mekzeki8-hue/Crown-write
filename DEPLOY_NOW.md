# 🚀 Deploy CrownWrite to Vercel - Quick Guide

## Option 1: Deploy via Vercel Dashboard (Recommended - 5 minutes)

### Step 1: Create/Update GitHub Repository

1. Go to https://github.com/new
2. Repository name: `crownwrite` (or any name you prefer)
3. Make it **Private** (recommended - contains API keys in git history)
4. **Don't** initialize with README
5. Click **"Create repository"**

6. Copy the commands shown and run in your terminal:

```bash
cd /Users/mac/Desktop/true/Crownwrite

# Update the remote URL (replace YOUR-USERNAME with your GitHub username)
git remote set-url origin https://github.com/YOUR-USERNAME/crownwrite.git

# Push all commits
git push -u origin main
```

### Step 2: Connect to Vercel

1. Go to https://vercel.com/new
2. Click **"Import Git Repository"**
3. Select your GitHub repository `crownwrite`
4. Vercel will auto-detect it's a Next.js project

### Step 3: Add Environment Variables (CRITICAL!)

Click **"Environment Variables"** and add ALL of these:

#### Database
```
DATABASE_URL=postgresql://neondb_owner:npg_vY5zM8KTyLJb@ep-polished-wave-b5mksl72-pooler.c-7.us-east-2.aws.neon.tech/neondb?sslmode=require&channel_binding=require
```

#### Clerk Authentication
```
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_ZXZvbHZpbmctY2hvdy05MTUwLmNsZXJrLmFjY291bnRzLmRldiQ
CLERK_SECRET_KEY=sk_test_iA5andigUF8BxTF1zJUb4C4f5eohE8T3ySv44fPLDT
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/
```

#### Gemini AI
```
GOOGLE_GEMINI_API_KEY=AQ.Ab8RN6LatSc3gM5hKw4DcF3VG8juu5s2rvYrv-EXnb7es0PExQ
```

#### Polar Payment (Use NEW token!)
```
POLAR_ACCESS_TOKEN=polar_oat_UQ6ew4WoCqVx5Z8SfUjaPgtaYB7nqorXkvFTK2KygnA
POLAR_ORGANIZATION_ID=70620ef9-0b79-4dc0-9ab3-c0629db05525
POLAR_WEBHOOK_SECRET=whsec_cR6DnmLB5ggh8I9mkRnQs0SfHlN2C1XARsxpo2bdPvY
POLAR_ENVIRONMENT=production
```

#### Polar Product IDs - Basic
```
POLAR_PRODUCT_BASIC_MONTHLY=c437f55e-c1fa-4ca3-8fcf-7aa2ccde907e
POLAR_PRODUCT_BASIC_YEARLY=09fe18d1-df18-476d-8d71-aabc5d8e0ac6
POLAR_PRODUCT_BASIC_TOPUP=0324c007-c804-4a82-9e20-f00df9f4836a
```

#### Polar Product IDs - Pro
```
POLAR_PRODUCT_PRO_MONTHLY=e943ea8b-ab3c-4c65-9255-7d8210836fa2
POLAR_PRODUCT_PRO_YEARLY=ee71e551-a3ec-42a1-961f-9bf53de74c78
POLAR_PRODUCT_PRO_TOPUP=f5f0f201-706e-48bb-a1d2-0b1588fc96e8
```

#### Polar Product IDs - Max
```
POLAR_PRODUCT_MAX_MONTHLY=f6379d37-453e-4a39-9a0f-aec55644a561
POLAR_PRODUCT_MAX_YEARLY=b70c5981-a0fb-4779-9fd7-af5d0d0799dd
POLAR_PRODUCT_MAX_TOPUP=e6a41e77-d4f0-4182-b657-679c80dfed3e
```

#### Public Polar Product IDs
```
NEXT_PUBLIC_POLAR_BASIC_MONTHLY=c437f55e-c1fa-4ca3-8fcf-7aa2ccde907e
NEXT_PUBLIC_POLAR_BASIC_YEARLY=09fe18d1-df18-476d-8d71-aabc5d8e0ac6
NEXT_PUBLIC_POLAR_BASIC_TOPUP=0324c007-c804-4a82-9e20-f00df9f4836a
NEXT_PUBLIC_POLAR_PRO_MONTHLY=e943ea8b-ab3c-4c65-9255-7d8210836fa2
NEXT_PUBLIC_POLAR_PRO_YEARLY=ee71e551-a3ec-42a1-961f-9bf53de74c78
NEXT_PUBLIC_POLAR_PRO_TOPUP=f5f0f201-706e-48bb-a1d2-0b1588fc96e8
NEXT_PUBLIC_POLAR_MAX_MONTHLY=f6379d37-453e-4a39-9a0f-aec55644a561
NEXT_PUBLIC_POLAR_MAX_YEARLY=b70c5981-a0fb-4779-9fd7-af5d0d0799dd
NEXT_PUBLIC_POLAR_MAX_TOPUP=e6a41e77-d4f0-4182-b657-679c80dfed3e
```

### Step 4: Deploy!

1. Click **"Deploy"**
2. Wait 2-3 minutes for build to complete
3. You'll get a URL like: `https://crownwrite.vercel.app`

---

## Step 5: Post-Deployment Configuration

### Update Clerk Dashboard

1. Go to https://dashboard.clerk.com/
2. Select "evolving-chow-9150" (your app)
3. Go to **Settings** → **Domains**
4. Add your Vercel domain:
   - **Production URL:** `https://crownwrite.vercel.app`
5. Go to **Paths**:
   - **Sign-in URL:** `https://crownwrite.vercel.app/sign-in`
   - **Sign-up URL:** `https://crownwrite.vercel.app/sign-up`
   - **After sign-in:** `https://crownwrite.vercel.app/`
   - **After sign-up:** `https://crownwrite.vercel.app/`

### Update Polar Webhook

1. Go to https://polar.sh/dashboard
2. Navigate to **Settings** → **Webhooks**
3. Update webhook URL:
   ```
   https://crownwrite.vercel.app/api/webhooks/polar
   ```
4. Make sure these events are enabled:
   - ✅ `checkout.created`
   - ✅ `checkout.updated`
   - ✅ `subscription.created`
   - ✅ `subscription.updated`
   - ✅ `subscription.canceled`

---

## Option 2: Deploy via Vercel CLI (Advanced)

```bash
# Install Vercel CLI
npm install -g vercel

# Login to Vercel
vercel login

# Deploy from your project directory
cd /Users/mac/Desktop/true/Crownwrite
vercel

# Follow the prompts:
# - Set up and deploy? Yes
# - Which scope? Your account
# - Link to existing project? No
# - Project name? crownwrite
# - Directory? ./
# - Override settings? No

# Then add environment variables via Vercel dashboard
```

---

## Troubleshooting

### Build Fails?
- Check build logs in Vercel dashboard
- Verify all environment variables are set
- Try building locally first: `npm run build`

### "Unauthorized" on production?
- Verify Clerk environment variables match dashboard
- Check Clerk allowed domains includes Vercel URL
- Clear browser cache and cookies

### Polar checkout fails?
- Verify `POLAR_ACCESS_TOKEN` is the NEW token (starts with `polar_oat_UQ6ew4`)
- Check webhook URL is updated in Polar dashboard
- Verify all product IDs are correct

### Database connection fails?
- Verify `DATABASE_URL` is correct
- Check Neon dashboard - database is active
- Ensure SSL mode is in connection string

---

## ✅ Deployment Checklist

Before going live:
- [ ] All environment variables added to Vercel
- [ ] GitHub repository created and pushed
- [ ] Vercel deployment successful
- [ ] Clerk domain configured
- [ ] Polar webhook URL updated
- [ ] Test sign-up flow
- [ ] Test humanizer with credits
- [ ] Test payment flow
- [ ] Test dark mode toggle
- [ ] Mobile responsive check

---

## 🎉 Your Site is Live!

Once deployed, share your link:
- **Production:** https://crownwrite.vercel.app (or your custom domain)
- **Analytics:** Check Vercel dashboard for traffic
- **Monitoring:** Monitor errors in Vercel logs

**Need a custom domain?**
1. Buy domain (Namecheap, Google Domains, etc.)
2. In Vercel dashboard → Domains → Add
3. Follow DNS configuration steps
4. Update Clerk + Polar with new domain

---

## Quick Commands

```bash
# View current status
git status

# See what will be deployed
git log --oneline -10

# Push to GitHub (after setting remote)
git push origin main

# Check production logs (after deploy)
# Go to: https://vercel.com/your-project/logs
```

---

**Your website is ready to go live! 🚀**

All features are implemented:
- ✅ Modern UI with Tailwind CSS
- ✅ Clerk authentication
- ✅ Neon database
- ✅ Polar payments
- ✅ Credit system
- ✅ Humanization history
- ✅ Dark mode
- ✅ Fully responsive

Just follow the steps above and you'll be live in minutes!
