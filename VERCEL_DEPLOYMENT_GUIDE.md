# 🚀 Vercel Deployment Guide

## ✅ Your Changes Are Ready!

All code has been committed locally. Now let's deploy to Vercel.

---

## Option 1: Deploy via Vercel Dashboard (Recommended)

### Step 1: Fix GitHub Remote (If Needed)

Your current GitHub remote might be incorrect. Let's fix it:

1. **Create a new GitHub repository** (or use existing):
   - Go to https://github.com/new
   - Repository name: `crownwrite` (or your preferred name)
   - Make it **Private** (recommended - has sensitive config)
   - Don't initialize with README (we already have code)

2. **Update git remote:**
   ```bash
   cd /Users/mac/Desktop/true/Crownwrite
   
   # Remove old remote
   git remote remove origin
   
   # Add new remote (replace USERNAME with your GitHub username)
   git remote add origin https://github.com/USERNAME/crownwrite.git
   
   # Push all changes
   git push -u origin main
   ```

### Step 2: Connect to Vercel

1. Go to https://vercel.com/dashboard
2. Click **"Add New Project"**
3. Click **"Import Git Repository"**
4. Select your GitHub repository (`crownwrite`)
5. Vercel will detect it's a Next.js app automatically

### Step 3: Configure Environment Variables

**CRITICAL:** You must add all environment variables in Vercel Dashboard before deploying!

Click **"Environment Variables"** and add these:

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

#### Polar Payment (NEW TOKEN!)
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

#### Public Polar Product IDs (Frontend)
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

### 1. Update Clerk Dashboard

1. Go to [Clerk Dashboard](https://dashboard.clerk.com/)
2. Select your app: "evolving-chow-9150"
3. Go to **"Paths"** or **"URLs"**
4. Add your Vercel domain:
   - **Homepage URL:** `https://crownwrite.vercel.app`
   - **Sign-in URL:** `https://crownwrite.vercel.app/sign-in`
   - **Sign-up URL:** `https://crownwrite.vercel.app/sign-up`
   - **After sign-in URL:** `https://crownwrite.vercel.app/`
   - **After sign-up URL:** `https://crownwrite.vercel.app/`

### 2. Update Polar Webhook URL

1. Go to [Polar Dashboard](https://polar.sh/dashboard)
2. Navigate to **Settings** → **Webhooks**
3. Update webhook URL to:
   ```
   https://crownwrite.vercel.app/api/webhooks/polar
   ```
4. Make sure these events are enabled:
   - ✅ `checkout.created`
   - ✅ `checkout.updated`
   - ✅ `subscription.created`
   - ✅ `subscription.updated`
   - ✅ `subscription.canceled`

### 3. Update Clerk Allowed Domains (for CORS)

1. In Clerk Dashboard → **API Keys**
2. Add your Vercel domain to **Allowed origins**:
   - `https://crownwrite.vercel.app`

---

## Option 2: Manual Git Push + Auto Deploy

If you already have Vercel connected to a GitHub repo:

1. **Fix GitHub remote** (see Step 1 above)
2. **Push changes:**
   ```bash
   git push origin main
   ```
3. Vercel will **auto-deploy** from GitHub
4. Follow **Step 5** (Post-Deployment Configuration)

---

## ✅ Verification Checklist

After deployment, test these:

- [ ] Visit your Vercel URL - homepage loads
- [ ] Click "Sign In" - Clerk auth works
- [ ] Sign in with Google - redirects back correctly
- [ ] Check credits in Workspace section - shows 300
- [ ] Click "Get Started" on pricing - redirects to Polar
- [ ] Use humanizer - credits deduct properly

---

## 🐛 Troubleshooting

### Build fails on Vercel?
- Check build logs in Vercel dashboard
- Verify all environment variables are set
- Make sure no TypeScript errors locally: `npm run build`

### "Unauthorized" on production?
- Verify Clerk environment variables match your dashboard
- Check Clerk allowed domains includes your Vercel URL

### Polar checkout fails?
- Verify `POLAR_ACCESS_TOKEN` is the NEW token
- Check Polar webhook URL is updated
- Verify all product IDs are correct

### Database connection fails?
- Verify `DATABASE_URL` is correct
- Check Neon dashboard - database is active
- Verify SSL mode in connection string

---

## 📝 Summary

**Committed Changes:**
- ✅ Clerk + Neon integration
- ✅ Polar payment system
- ✅ Updated humanizer API
- ✅ Fixed auth redirect loop
- ✅ Enhanced logging

**Next Steps:**
1. Push to GitHub (fix remote first)
2. Deploy to Vercel (add env vars)
3. Update Clerk + Polar dashboards
4. Test complete flow

---

## 🎉 You're Almost There!

Once deployed, your CrownWrite app will be live with:
- ✨ Working authentication (Clerk + Google OAuth)
- 💳 Payment processing (Polar)
- 🗄️ Database (Neon PostgreSQL)
- 🤖 AI humanization (Gemini)
- 📊 Credit system (earn, purchase, spend)

Good luck with the deployment! 🚀
