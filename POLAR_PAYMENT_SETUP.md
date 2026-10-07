# Polar Payment Integration - Setup & Testing Guide

## ✅ Integration Status

Your Polar payment integration is **READY TO TEST** with Clerk + Neon database!

## 🎯 What's Already Configured

### 1. **Backend API Routes** ✅
- `/api/checkout` - Creates Polar checkout sessions with Clerk user auth
- `/api/webhooks/polar` - Handles payment webhooks and updates credits in Neon

### 2. **Frontend Components** ✅
- `Pricing.tsx` - Main pricing cards (Basic, Pro, Max) with monthly/yearly toggle
- `TopUpCredits.tsx` - One-time credit top-up cards
- Both components use Clerk authentication and Polar checkout

### 3. **Database Integration** ✅
- Auto-creates users in Neon PostgreSQL with 300 free credits on signup
- Updates credits when payments succeed via webhook
- Logs all transactions in `credit_transactions` table

### 4. **Environment Variables** ✅
All Polar credentials are configured in `.env.local`:
- ✅ `POLAR_ACCESS_TOKEN`
- ✅ `POLAR_ORGANIZATION_ID`
- ✅ `POLAR_WEBHOOK_SECRET`
- ✅ All product IDs (Basic, Pro, Max - monthly, yearly, topup)

---

## 🔧 Required: Polar Dashboard Configuration

### **Step 1: Configure Webhook URL**

You need to add your webhook endpoint to Polar Dashboard:

1. Go to [Polar Dashboard](https://polar.sh/dashboard)
2. Navigate to **Settings** → **Webhooks**
3. Click **"Add Webhook"**
4. Enter webhook URL:
   - **Development:** `https://your-ngrok-url.ngrok.io/api/webhooks/polar`
   - **Production:** `https://crownwrite.com/api/webhooks/polar` (or your domain)

5. Select events to listen for:
   - ✅ `checkout.created`
   - ✅ `checkout.updated` (REQUIRED for successful payments)
   - ✅ `subscription.created`
   - ✅ `subscription.updated`
   - ✅ `subscription.canceled`
   - ✅ `order.created`

6. Copy the webhook secret and verify it matches your `.env.local`:
   ```bash
   POLAR_WEBHOOK_SECRET=whsec_cR6DnmLB5ggh8I9mkRnQs0SfHlN2C1XARsxpo2bdPvY
   ```

### **Step 2: Verify Product Configuration**

In Polar Dashboard, ensure your products match the IDs in `.env.local`:

**BASIC Plan:**
- Monthly: `c437f55e-c1fa-4ca3-8fcf-7aa2ccde907e`
- Yearly: `09fe18d1-df18-476d-8d71-aabc5d8e0ac6`
- Top-up: `0324c007-c804-4a82-9e20-f00df9f4836a`

**PRO Plan:**
- Monthly: `e943ea8b-ab3c-4c65-9255-7d8210836fa2`
- Yearly: `ee71e551-a3ec-42a1-961f-9bf53de74c78`
- Top-up: `f5f0f201-706e-48bb-a1d2-0b1588fc96e8`

**MAX Plan:**
- Monthly: `f6379d37-453e-4a39-9a0f-aec55644a561`
- Yearly: `b70c5981-a0fb-4779-9fd7-af5d0d0799dd`
- Top-up: `e6a41e77-d4f0-4182-b657-679c80dfed3e`

### **Step 3: Set Success/Cancel URLs**

In your Polar products, configure:
- **Success URL:** `https://crownwrite.com/?checkout=success`
- **Cancel URL:** `https://crownwrite.com/?checkout=cancel`

---

## 🧪 Testing the Payment Flow

### **Local Testing (Development)**

1. **Start ngrok tunnel** (to expose local server to Polar webhooks):
   ```bash
   ngrok http 3000
   ```
   
2. **Update Polar webhook URL** with your ngrok URL:
   ```
   https://abc123.ngrok.io/api/webhooks/polar
   ```

3. **Start dev server:**
   ```bash
   npm run dev
   ```

4. **Test the flow:**
   - ✅ Visit `http://localhost:3000`
   - ✅ Sign in with Clerk (get 300 free credits)
   - ✅ Scroll to Pricing section
   - ✅ Click "Get Started" on any plan
   - ✅ Complete checkout in Polar (use test card)
   - ✅ Get redirected back to homepage
   - ✅ Check credits updated in Workspace section

### **Test Credit Cards (Polar Test Mode)**

If your Polar is in test/sandbox mode, use:
- **Card Number:** `4242 4242 4242 4242`
- **Expiry:** Any future date
- **CVC:** Any 3 digits

### **Verify Webhook Delivery**

1. In Polar Dashboard → Webhooks, check delivery logs
2. In your server logs, look for:
   ```
   Received Polar webhook: checkout.updated
   ✅ Added 10000 credits to user user_xxx
   ```

---

## 🔍 Debugging

### Check Server Logs
```bash
# Terminal where dev server is running
# Look for these messages:
- "Received Polar webhook: checkout.updated"
- "✅ Added X credits to user Y"
```

### Check Database
```bash
# Connect to Neon and verify:
SELECT * FROM users WHERE clerk_id = 'user_xxx';
SELECT * FROM credit_transactions WHERE user_id = 'user_xxx';
```

### Common Issues

**❌ "Webhook signature validation failed"**
- Verify `POLAR_WEBHOOK_SECRET` in `.env.local` matches Polar Dashboard

**❌ "User not found"**
- User must sign in first (creates user in Neon)
- Or webhook will auto-create user from checkout email

**❌ "Product not configured"**
- Verify all `NEXT_PUBLIC_POLAR_*` product IDs are in `.env.local`
- Check product IDs match in Polar Dashboard

**❌ Credits not updating**
- Check webhook is configured in Polar Dashboard
- Verify webhook URL is accessible (use ngrok for local)
- Check `checkout.updated` event is enabled

---

## 📊 Credit Amounts

Current configuration:

| Plan | Credits | Price |
|------|---------|-------|
| Basic Monthly | 10,000 | $5.99 |
| Basic Yearly | 120,000 | $35.88 |
| Basic Top-up | 10,000 | $5.99 |
| Pro Monthly | 50,000 | $19.99 |
| Pro Yearly | 600,000 | $119.88 |
| Pro Top-up | 50,000 | $19.99 |
| Max Monthly | 999,999 | $39.99 |
| Max Yearly | 999,999 | $239.88 |
| Max Top-up | 100,000 | $39.99 |

These are defined in `lib/polar.ts` and can be adjusted.

---

## 🚀 Production Deployment

Before deploying to production:

1. ✅ Set Polar webhook URL to your production domain
2. ✅ Switch Polar to production mode (not sandbox)
3. ✅ Verify all environment variables in Vercel/hosting
4. ✅ Test with real payment (small amount)
5. ✅ Monitor webhook logs in Polar Dashboard
6. ✅ Set up error notifications (Sentry, etc.)

---

## 📝 Payment Flow Summary

```
User Journey:
1. User signs up → Gets 300 free credits (Clerk + Neon)
2. User clicks "Get Started" on pricing card
3. Frontend calls /api/checkout with productId
4. Backend creates Polar checkout session
5. User redirected to Polar checkout page
6. User completes payment
7. Polar sends webhook to /api/webhooks/polar
8. Backend adds credits to user in Neon
9. User redirected back to site with updated credits
```

---

## ✅ Your Integration is Ready!

All code is configured correctly. Just complete the Polar Dashboard setup above and you're ready to accept payments! 🎉
