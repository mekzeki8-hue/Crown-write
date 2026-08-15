# 🚀 CrownWrite Setup Guide

## ✅ What's Already Done:
- Supabase credentials configured in `.env.local`
- Database schema ready (`supabase-setup.sql`)
- Login/Signup pages with Google OAuth code (commented out)
- Credit system designed (300 free credits per user)

---

## 📋 Step 1: Fix "Invalid Login Credentials" Issue

### **Option A: Disable Email Verification (Quick Fix for Testing)**

1. Go to **Supabase Dashboard** → **Authentication** → **Providers** → **Email**
2. Find "**Confirm email**" toggle
3. **Turn it OFF**
4. Click **Save**
5. Try signing up again with a new email

### **Option B: Verify Your Email (Production Way)**

1. After signing up, check your email inbox
2. Click the verification link
3. Then try logging in

---

## 📋 Step 2: Set Up Database (Credit System)

1. Open **Supabase Dashboard** → **SQL Editor**
2. Click **New Query**
3. Open the file: `/Users/mac/Desktop/true/Crownwrite/supabase-setup.sql`
4. **Copy ALL the SQL** from that file
5. **Paste** into Supabase SQL Editor
6. Click **Run** (or press Cmd/Ctrl + Enter)
7. Should see: ✅ "Success. No rows returned"

**This creates:**
- `profiles` table (stores user credits, 300 default)
- `credit_transactions` table (tracks all credit usage)
- `humanization_history` table (saves all humanizations)
- Auto-creates profile with 300 credits when user signs up

---

## 📋 Step 3: Enable Google OAuth (Optional)

### **Get Google Client ID & Secret:**

1. Go to **Google Cloud Console**: https://console.cloud.google.com
2. Create a new project (or select existing)
3. Go to **APIs & Services** → **Credentials**
4. Click **Create Credentials** → **OAuth 2.0 Client ID**
5. Choose **Web application**
6. Add **Authorized redirect URIs**:
   ```
   https://jvisxehsimzstelrkhre.supabase.co/auth/v1/callback
   ```
7. Click **Create**
8. Copy your **Client ID** and **Client Secret**

### **Configure in Supabase:**

1. Go to **Supabase Dashboard** → **Authentication** → **Providers**
2. Find **Google** and click to expand
3. Toggle **Enable Google provider** to ON
4. Paste:
   - **Client ID** (from Google)
   - **Client Secret** (from Google)
5. Copy the **Authorized redirect URI** shown (should match above)
6. Click **Save**

### **Enable Google Button in Code:**

Open `/Users/mac/Desktop/true/Crownwrite/app/login/page.tsx`
- Find the commented Google login button (around line 165)
- **Uncomment** the divider and Google button sections
- Save the file

Do the same for `/Users/mac/Desktop/true/Crownwrite/app/signup/page.tsx`

---

## 📋 Step 4: Test Everything

1. **Restart dev server:**
   ```bash
   npm run dev
   ```

2. **Test Login:**
   - Go to `http://localhost:3000/login`
   - Sign up with a test email
   - Should work now (no "invalid credentials" error)

3. **Check Credits:**
   - Go to Supabase Dashboard → **Table Editor** → **profiles**
   - Find your user
   - Should see `credits: 300`

4. **Test Google Login (if configured):**
   - Click "Continue with Google"
   - Should redirect to Google
   - After login, redirects back to your app

---

## 📋 Step 5: Integrate Credits with Humanizer

### **How Credits Work:**

- **1 credit = 1 humanization request** (adjust if needed)
- When user clicks "Humanize":
  1. Check if user has credits
  2. Deduct 1 credit
  3. Process humanization
  4. Save to history

### **Next Steps (tell me when ready):**

1. Update `/api/humanize` to check credits before processing
2. Add credit display in dashboard
3. Add "Buy More Credits" page
4. Show credit usage history

---

## ⚠️ Important Notes:

1. **`.env.local` is secret** - Never commit to Git (already gitignored ✅)
2. **Test with fake emails first** - Don't use your real email for testing
3. **Database setup only needs to run ONCE** - Don't run the SQL twice
4. **Google OAuth is optional** - Email login works fine without it

---

## 🆘 Troubleshooting:

### "Invalid login credentials"
- Disable email confirmation in Supabase (Step 1, Option A)
- Or verify your email first

### "Failed to fetch"
- Restart dev server after adding `.env.local`
- Check `.env.local` has correct Supabase URL

### "User already registered"
- Delete test user from Supabase Dashboard → **Authentication** → **Users**
- Or use a different email

### Google OAuth not working
- Check redirect URI matches exactly
- Make sure Google provider is enabled in Supabase
- Check browser console for errors

---

## 📞 Next Steps:

Tell me:
1. ✅ Did database setup work?
2. ✅ Can you login now?
3. ✅ Do you want Google OAuth or skip it?
4. ✅ Ready to integrate credits into humanizer?

