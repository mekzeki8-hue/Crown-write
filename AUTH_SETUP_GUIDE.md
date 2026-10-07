# 🔐 Authentication Setup Guide

## Current Status: ⚠️ Needs Configuration

Your authentication code is correct, but **Supabase needs to be configured** in the dashboard.

---

## 🚀 Step-by-Step Fix

### Step 1: Run Database Setup SQL

1. Go to: https://supabase.com/dashboard
2. Select your project: `jvisxehsimzstelrkhre`
3. Click **SQL Editor** (left sidebar)
4. Click **New Query**
5. Copy ALL content from `database-setup-simple.sql`
6. Paste it and click **Run**
7. You should see: ✅ Success. No rows returned

### Step 2: Configure Email Authentication

1. Go to **Authentication** → **Providers**
2. Find **Email** provider
3. **Disable "Confirm email"** for instant signup
   - OR keep it enabled and set up email templates
4. Save changes

### Step 3: Configure Google OAuth (Optional)

1. Still in **Authentication** → **Providers**
2. Find **Google** and toggle it ON
3. You'll need:
   - Google Client ID
   - Google Client Secret
4. Get these from: https://console.cloud.google.com/apis/credentials
5. Add to Supabase and Save

### Step 4: Configure Redirect URLs

1. Go to **Authentication** → **URL Configuration**
2. Set **Site URL** to:
   - Local: `http://localhost:3000`
   - Production: `https://your-domain.vercel.app`
3. Add **Redirect URLs**:
   ```
   http://localhost:3000/auth/callback
   http://localhost:3000/dashboard
   http://localhost:3000/
   https://your-domain.vercel.app/auth/callback
   https://your-domain.vercel.app/dashboard
   https://your-domain.vercel.app/
   ```
4. Save changes

---

## 🧪 Testing Authentication

### Test 1: Email/Password Signup

1. Run: `npm run dev`
2. Go to: http://localhost:3000/signup
3. Enter email and password (min 6 chars)
4. Click "Create account"
5. ✅ Should redirect to dashboard then home
6. Check Supabase → **Authentication** → **Users** to see new user

### Test 2: Email/Password Login

1. Go to: http://localhost:3000/login
2. Enter the same credentials
3. Click "Sign in"
4. ✅ Should redirect to dashboard

### Test 3: Check Credits

1. After login, go to: http://localhost:3000/
2. You should see "Available Credits: 300"
3. Check Supabase → **Table Editor** → **profiles**
4. ✅ Your user should have 300 credits

### Test 4: Google OAuth (if enabled)

1. Go to: http://localhost:3000/login
2. Click "Continue with Google"
3. ✅ Should redirect to Google login
4. After auth, should redirect back to dashboard

---

## 🐛 Common Issues & Fixes

### Issue: "Email not confirmed"
**Fix:** Disable email confirmation (Step 2 above)

### Issue: "Invalid redirect URL"
**Fix:** Add your URLs to Supabase (Step 4 above)

### Issue: "User not found"
**Fix:** Make sure database tables exist (Step 1 above)

### Issue: Google login doesn't work
**Fix:** Enable Google provider (Step 3 above)

### Issue: No credits after signup
**Fix:** Check `ensureUserProfile()` is called in auth callback

---

## 🔍 Debug Authentication

Visit: http://localhost:3000/auth-test

This page shows:
- ✅ If you're logged in
- 👤 Your user info
- 💳 Your credit balance
- 🔑 Auth session details

---

## 📝 Need Help?

1. Check Supabase logs: **Project Settings** → **API** → **Logs**
2. Check browser console for errors (F12)
3. Verify environment variables are loaded: `console.log(process.env.NEXT_PUBLIC_SUPABASE_URL)`

---

## ✅ Checklist

- [ ] Database tables created (Step 1)
- [ ] Email auth configured (Step 2)
- [ ] Google OAuth enabled (Step 3) - Optional
- [ ] Redirect URLs added (Step 4)
- [ ] Tested signup (/signup)
- [ ] Tested login (/login)
- [ ] Credits visible (300 credits)
- [ ] Auth test page working (/auth-test)

---

**Once all steps are complete, authentication will work perfectly!** 🎉
