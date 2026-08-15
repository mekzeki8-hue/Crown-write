# Polar Payment Integration Guide

## Overview
Polar acts as a **Merchant of Record** - they handle taxes, compliance, and payouts in your local currency. You just focus on your product.

---

## Step 1: Create Polar Account

1. Go to https://polar.sh
2. Sign up for an account
3. Create your organization (CrownWrite)

**Use Sandbox first for testing!**

---

## Step 2: Get Your API Access Token

1. Go to your organization settings
2. Navigate to **Developers** section
3. Click **"New Token"**
4. Name it: "CrownWrite Production"
5. Set expiration (or no expiration)
6. Select all scopes (for simplicity)
7. **Copy the token immediately** (you won't see it again!)

---

## Step 3: Install Polar SDK

Run these commands:

```bash
cd /Users/mac/Desktop/true/Crownwrite
npm install @polar-sh/sdk @polar-sh/nextjs
```

---

## Step 4: Add Environment Variables

Add to your `.env` file:

```env
# Polar Payment Integration
POLAR_ACCESS_TOKEN=polar_at_your_token_here
POLAR_ORGANIZATION_ID=your_org_id_here
POLAR_WEBHOOK_SECRET=your_webhook_secret_here

# Use 'sandbox' for testing, 'production' when live
POLAR_ENVIRONMENT=sandbox
```

---

## Step 5: Create Products in Polar Dashboard

Go to **Products** tab in Polar and create your pricing tiers:

### Example Products:

**1. Free Plan** (0 credits after initial)
- Type: Free / No payment needed
- Just for display

**2. Starter Plan** - $9/month
- 10,000 words/month
- Basic support
- Recurring subscription

**3. Pro Plan** - $29/month
- 50,000 words/month
- Priority support
- Advanced features
- Recurring subscription

**4. Enterprise Plan** - $99/month
- Unlimited words
- Dedicated support
- API access
- Custom integration
- Recurring subscription

**Copy the Product IDs** - you'll need them!

---

## Step 6: Create Polar Client

Create `/lib/polar.ts`:

```typescript
import { Polar } from "@polar-sh/sdk";

export const polar = new Polar({
  accessToken: process.env.POLAR_ACCESS_TOKEN!,
  server: process.env.POLAR_ENVIRONMENT === "production" ? "production" : "sandbox",
});

export const POLAR_ORG_ID = process.env.POLAR_ORGANIZATION_ID!;

// Product IDs from Polar Dashboard
export const PRODUCTS = {
  STARTER: "your_starter_product_id",
  PRO: "your_pro_product_id",
  ENTERPRISE: "your_enterprise_product_id",
};
```

---

## Step 7: Create Checkout API Route

Create `/app/api/checkout/route.ts`:

```typescript
import { NextRequest, NextResponse } from "next/server";
import { polar, POLAR_ORG_ID } from "@/lib/polar";
import { createClient } from "@/lib/supabase/server";

export async function POST(req: NextRequest) {
  try {
    const { productId } = await req.json();
    
    // Get authenticated user
    const supabase = await createClient();
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    
    if (authError || !user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Create checkout session
    const checkout = await polar.checkouts.custom.create({
      productId,
      successUrl: `${req.nextUrl.origin}/dashboard?checkout=success`,
      customerEmail: user.email,
      customerMetadata: {
        userId: user.id,
      },
    });

    return NextResponse.json({ checkoutUrl: checkout.url });
  } catch (error) {
    console.error("Checkout error:", error);
    return NextResponse.json(
      { error: "Failed to create checkout" },
      { status: 500 }
    );
  }
}
```

---

## Step 8: Create Webhook Handler

Create `/app/api/webhooks/polar/route.ts`:

```typescript
import { NextRequest, NextResponse } from "next/server";
import { validateEvent } from "@polar-sh/nextjs/webhooks";
import { createClient } from "@/lib/supabase/server";

export async function POST(req: NextRequest) {
  try {
    // Get webhook secret from env
    const webhookSecret = process.env.POLAR_WEBHOOK_SECRET!;
    
    // Get raw body
    const payload = await req.text();
    const signature = req.headers.get("polar-signature");

    if (!signature) {
      return NextResponse.json({ error: "No signature" }, { status: 400 });
    }

    // Validate webhook
    const event = validateEvent(payload, signature, webhookSecret);

    // Handle different event types
    switch (event.type) {
      case "checkout.created":
        console.log("Checkout created:", event.data);
        break;

      case "checkout.updated":
        if (event.data.status === "succeeded") {
          // Payment successful! Grant credits
          await handleSuccessfulPayment(event.data);
        }
        break;

      case "subscription.created":
        console.log("Subscription created:", event.data);
        await handleSubscriptionCreated(event.data);
        break;

      case "subscription.updated":
        console.log("Subscription updated:", event.data);
        break;

      case "subscription.cancelled":
        console.log("Subscription cancelled:", event.data);
        await handleSubscriptionCancelled(event.data);
        break;

      default:
        console.log("Unhandled event type:", event.type);
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error("Webhook error:", error);
    return NextResponse.json(
      { error: "Webhook processing failed" },
      { status: 500 }
    );
  }
}

async function handleSuccessfulPayment(checkout: any) {
  const supabase = await createClient();
  const userId = checkout.customer_metadata?.userId;

  if (!userId) return;

  // Determine credits based on product
  let creditsToAdd = 0;
  const productId = checkout.product_id;

  if (productId === "starter_id") creditsToAdd = 10000;
  else if (productId === "pro_id") creditsToAdd = 50000;
  else if (productId === "enterprise_id") creditsToAdd = 999999;

  // Add credits to user
  const { data: profile } = await supabase
    .from("profiles")
    .select("credits")
    .eq("id", userId)
    .single();

  if (profile) {
    await supabase
      .from("profiles")
      .update({ credits: profile.credits + creditsToAdd })
      .eq("id", userId);

    // Log transaction
    await supabase.from("credit_transactions").insert({
      user_id: userId,
      amount: creditsToAdd,
      transaction_type: "add",
      description: `Purchased via Polar: ${checkout.product_name}`,
    });
  }
}

async function handleSubscriptionCreated(subscription: any) {
  // Store subscription details in your database
  console.log("New subscription:", subscription);
}

async function handleSubscriptionCancelled(subscription: any) {
  // Handle cancellation (maybe reduce credits on next cycle)
  console.log("Subscription cancelled:", subscription);
}
```

---

## Step 9: Configure Webhook in Polar Dashboard

1. Go to your organization settings → **Webhooks**
2. Click **"Add Endpoint"**
3. **For local testing**, use ngrok:
   ```bash
   ngrok http 3000
   ```
   Then use: `https://your-ngrok-id.ngrok-free.app/api/webhooks/polar`

4. **For production**, use: `https://crownwrite.com/api/webhooks/polar`

5. Select events to listen for:
   - ✅ `checkout.created`
   - ✅ `checkout.updated`
   - ✅ `subscription.created`
   - ✅ `subscription.updated`
   - ✅ `subscription.cancelled`

6. **Generate webhook secret** and save it to `.env`

---

## Step 10: Update Pricing Component

Update `/app/components/Pricing.tsx` to use Polar checkout:

```typescript
const handleCheckout = async (productId: string) => {
  try {
    const res = await fetch("/api/checkout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ productId }),
    });

    const { checkoutUrl } = await res.json();
    
    if (checkoutUrl) {
      window.location.href = checkoutUrl;
    }
  } catch (error) {
    console.error("Checkout failed:", error);
  }
};
```

---

## Step 11: Test the Integration

### Using Sandbox:

1. Set `POLAR_ENVIRONMENT=sandbox` in `.env`
2. Use test product IDs from Polar sandbox
3. Run your app: `npm run dev`
4. Try purchasing a plan
5. Check webhook logs in Polar dashboard
6. Verify credits are added to user account

### Test Card Numbers (Sandbox):
- **Success**: `4242 4242 4242 4242`
- **Decline**: `4000 0000 0000 0002`

---

## Step 12: Go Live!

When ready for production:

1. Switch to **production environment** in Polar
2. Create real products with actual pricing
3. Update `.env`:
   ```
   POLAR_ENVIRONMENT=production
   POLAR_ACCESS_TOKEN=polar_at_production_token
   ```
4. Update webhook URL to production domain
5. Update product IDs in `/lib/polar.ts`
6. Test one more time with a small purchase
7. 🚀 Launch!

---

## Benefits of Polar

✅ **Merchant of Record** - Handles all taxes and compliance  
✅ **Global Payments** - Accept payments worldwide  
✅ **Automatic Tax** - Calculates and remits taxes  
✅ **Clean Payouts** - Get paid in your local currency  
✅ **Subscription Management** - Built-in recurring billing  
✅ **Customer Portal** - Users can manage their subscriptions  
✅ **Webhook Events** - Real-time payment notifications  

---

## Next Steps

1. Install Polar SDK
2. Get access token from Polar
3. Create products in dashboard
4. Add environment variables
5. Create API routes
6. Test in sandbox
7. Go live!

Need help? Contact: crownwrite.humanizer@gmail.com
