import { NextRequest, NextResponse } from "next/server";
import { getDb } from "@/lib/db";
import { getCreditsByProductId } from "@/lib/polar";
import crypto from "crypto";

export async function POST(req: NextRequest) {
  try {
    const webhookSecret = process.env.POLAR_WEBHOOK_SECRET;
    
    if (!webhookSecret) {
      console.error("POLAR_WEBHOOK_SECRET not configured");
      return NextResponse.json(
        { error: "Webhook not configured" },
        { status: 500 }
      );
    }

    // Get raw body and signature
    const payload = await req.text();
    const signature = req.headers.get("polar-signature") || "";

    // Validate webhook signature
    const expectedSignature = crypto
      .createHmac("sha256", webhookSecret)
      .update(payload)
      .digest("hex");

    if (signature !== expectedSignature) {
      console.error("Webhook signature validation failed");
      return NextResponse.json(
        { error: "Invalid signature" },
        { status: 401 }
      );
    }

    const event = JSON.parse(payload);
    console.log(`Received Polar webhook: ${event.type}`);

    // Handle different event types
    switch (event.type) {
      case "checkout.created":
        console.log("Checkout created:", event.data.id);
        break;

      case "checkout.updated":
        if (event.data.status === "succeeded") {
          await handleSuccessfulCheckout(event.data);
        }
        break;

      case "subscription.created":
        await handleSubscriptionCreated(event.data);
        break;

      case "subscription.updated":
        await handleSubscriptionUpdated(event.data);
        break;

      case "subscription.canceled":
        await handleSubscriptionCanceled(event.data);
        break;

      case "order.created":
        console.log("Order created:", event.data.id);
        break;

      default:
        console.log(`Unhandled event type: ${event.type}`);
    }

    return NextResponse.json({ received: true });

  } catch (error: any) {
    console.error("Webhook processing error:", error);
    return NextResponse.json(
      { error: "Webhook processing failed" },
      { status: 500 }
    );
  }
}

async function handleSuccessfulCheckout(checkout: any) {
  try {
    const userId = checkout.metadata?.userId;
    if (!userId) {
      console.error("No userId in checkout metadata");
      return;
    }

    // Get product ID and determine credits
    const productId = checkout.product_id;
    const creditsToAdd = getCreditsByProductId(productId);

    if (creditsToAdd === 0) {
      console.error("Unknown product ID:", productId);
      return;
    }

    const pool = await getDb();

    // Get current credits
    const { rows } = await pool.query(
      'SELECT credits FROM users WHERE clerk_id = $1',
      [userId]
    );

    if (rows.length === 0) {
      console.error("User not found:", userId);
      return;
    }

    // Update credits
    const newCredits = (rows[0].credits || 0) + creditsToAdd;
    
    await pool.query(
      'UPDATE users SET credits = $1, updated_at = NOW() WHERE clerk_id = $2',
      [newCredits, userId]
    );

    // Log transaction
    await pool.query(
      `INSERT INTO credit_transactions (user_id, amount, type, description, created_at)
       VALUES ($1, $2, $3, $4, NOW())`,
      [userId, creditsToAdd, 'purchase', `Payment via Polar: ${checkout.product?.name || "Purchase"}`]
    );

    console.log(`✅ Added ${creditsToAdd} credits to user ${userId}`);

  } catch (error) {
    console.error("Error handling successful checkout:", error);
  }
}

async function handleSubscriptionCreated(subscription: any) {
  console.log("Subscription created:", subscription.id);
  // Store subscription details in your database here
}

async function handleSubscriptionUpdated(subscription: any) {
  console.log("Subscription updated:", subscription.id);
  // Handle subscription updates (upgrades, downgrades, etc.)
}

async function handleSubscriptionCanceled(subscription: any) {
  console.log("Subscription canceled:", subscription.id);
  // Handle cancellation (maybe send notification to user)
}
