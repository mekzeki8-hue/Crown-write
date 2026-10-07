# 🚀 Quick Start: Test Polar Payments

## Prerequisites ✅
- [x] Clerk authentication working
- [x] Neon database connected
- [x] All environment variables in `.env.local`

## 1️⃣ Start Development Server

```bash
npm run dev
```

Server will run at: `http://localhost:3000`

## 2️⃣ Test Authentication & Free Credits

1. Open `http://localhost:3000` in your browser
2. Click **"Sign In"** or **"Get Started"**
3. Sign up with your email or **Continue with Google**
4. After signup, you should be redirected to homepage
5. Check the **Workspace** section (humanizer) - you should see **300 credits**

✅ **If you see 300 credits, Clerk + Neon integration is working!**

## 3️⃣ Test Checkout Flow (Without Payment)

1. Scroll down to the **Pricing** section
2. Click **"Get Started"** on any plan (try Basic Monthly - $5.99)
3. You should be redirected to Polar's checkout page
4. **DON'T complete the payment yet** - just verify the redirect works

✅ **If you reach Polar checkout, the `/api/checkout` endpoint is working!**

Check your terminal logs - you should see:
```
📦 Creating checkout for user user_xxx (email@example.com) with product c437f55e-...
✅ Checkout created: checkout_xxx → https://polar.sh/checkout/...
```

## 4️⃣ Setup Webhooks for Local Testing (Required for Credit Addition)

### Option A: Use ngrok (Recommended)

```bash
# Install ngrok if you haven't
brew install ngrok

# Start ngrok tunnel
ngrok http 3000
```

You'll get a URL like: `https://abc123.ngrok.io`

### Configure Polar Webhook:

1. Go to [Polar Dashboard](https://polar.sh/dashboard)
2. Navigate to **Settings** → **Webhooks**
3. Click **"Add Webhook"**
4. Enter webhook URL: `https://abc123.ngrok.io/api/webhooks/polar`
5. Select events:
   - ✅ `checkout.created`
   - ✅ `checkout.updated` ← **CRITICAL**
   - ✅ `subscription.created`
   - ✅ `subscription.updated`
   - ✅ `subscription.canceled`
6. Save webhook

### Option B: Test Webhook Locally (Without Real Payment)

```bash
# Run the test script
./test-polar-webhook.sh
```

This simulates a Polar webhook and adds credits to a test user.

## 5️⃣ Complete a Test Payment

### If Polar is in Test Mode:

1. Go through checkout flow (click "Get Started" on pricing)
2. Use test card:
   - **Card:** `4242 4242 4242 4242`
   - **Expiry:** Any future date (e.g., `12/28`)
   - **CVC:** Any 3 digits (e.g., `123`)
3. Complete payment
4. You should be redirected to homepage with `?checkout=success`
5. Credits should be updated!

### Check Terminal Logs:

```
📨 Received Polar webhook: checkout.updated
   Checkout updated: checkout_xxx → succeeded
✅ Added 10000 credits to user user_xxx. New balance: 10300
```

### Check Database:

```bash
# Connect to your Neon database
psql "postgresql://neondb_owner:npg_...@ep-polished-wave-b5mksl72-pooler.c-7.us-east-2.aws.neon.tech/neondb?sslmode=require"

# Query user credits
SELECT clerk_id, email, credits FROM users WHERE email = 'your@email.com';

# Query credit transactions
SELECT * FROM credit_transactions WHERE user_id = 'user_xxx' ORDER BY created_at DESC;
```

## 6️⃣ Test Credit Deduction (Humanizer)

1. Go to **Workspace** section on homepage
2. Paste some AI-generated text
3. Click **"Transform Text"**
4. Your credits should decrease by the word count

## 🎯 Success Checklist

- [ ] Sign up with Clerk → Get 300 free credits
- [ ] Click "Get Started" → Redirect to Polar checkout
- [ ] Complete payment → Credits added to account
- [ ] Use humanizer → Credits deducted correctly
- [ ] View transaction history in database

## 🐛 Troubleshooting

### No credits after payment?

1. Check webhook is configured in Polar Dashboard
2. Verify ngrok is running (if testing locally)
3. Check terminal logs for webhook receipt
4. Verify `POLAR_WEBHOOK_SECRET` matches Polar Dashboard

### "Unauthorized" error on checkout?

- Make sure you're signed in with Clerk
- Refresh the page and try again

### Webhook signature validation failed?

- Verify `POLAR_WEBHOOK_SECRET` in `.env.local` matches Polar Dashboard
- Don't include quotes in the secret value

### Credits not deducting?

- Check `/api/humanize` route is working
- Verify Gemini API key is configured
- Check database user exists

## 📚 Full Documentation

See `POLAR_PAYMENT_SETUP.md` for comprehensive setup guide.

## 🎉 You're Ready!

Once you complete step 5 successfully, your payment integration is fully working! 🚀
