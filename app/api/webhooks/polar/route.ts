import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { getCreditsByProductId } from "@/lib/polar";
import crypto from "crypto";

// Use service role for webhook operations
const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

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

    // Get current credits
    const { data: profile } = await supabaseAdmin
      .from("profiles")
      .select("credits")
      .eq("id", userId)
      .single();

    if (!profile) {
      console.error("Profile not found for user:", userId);
      return;
    }

    // Update credits
    const newCredits = (profile.credits || 0) + creditsToAdd;
    
    await supabaseAdmin
      .from("profiles")
      .update({ 
        credits: newCredits,
        updated_at: new Date().toISOString() 
      })
      .eq("id", userId);

    // Log transaction
    await supabaseAdmin.from("credit_transactions").insert({
      user_id: userId,
      amount: creditsToAdd,
      transaction_type: "add",
      description: `Payment via Polar: ${checkout.product?.name || "Purchase"}`,
      created_at: new Date().toISOString(),
    });

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
