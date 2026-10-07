import { NextRequest, NextResponse } from "next/server";
import { polar } from "@/lib/polar";
import { auth, currentUser } from "@clerk/nextjs/server";

export async function POST(req: NextRequest) {
  try {
    const { productId } = await req.json();
    
    if (!productId) {
      console.error("❌ Checkout error: No product ID provided");
      return NextResponse.json(
        { error: "Product ID required" },
        { status: 400 }
      );
    }

    // Get authenticated user from Clerk
    const { userId } = await auth();
    const user = await currentUser();
    
    if (!userId || !user) {
      console.error("❌ Checkout error: User not authenticated");
      return NextResponse.json(
        { error: "Unauthorized. Please sign in first." },
        { status: 401 }
      );
    }

    const userEmail = user.emailAddresses[0]?.emailAddress;
    if (!userEmail) {
      console.error("❌ Checkout error: User has no email address");
      return NextResponse.json(
        { error: "User email not found" },
        { status: 400 }
      );
    }

    console.log(`📦 Creating checkout for user ${userId} (${userEmail}) with product ${productId}`);

    // Create checkout session with Polar
    const checkout = await polar.checkouts.create({
      products: [productId],
      successUrl: `${req.nextUrl.origin}/?checkout=success`,
      customerEmail: userEmail,
      metadata: {
        userId: userId,
        source: "crownwrite_web",
      },
    });

    console.log(`✅ Checkout created: ${checkout.id} → ${checkout.url}`);

    return NextResponse.json({ 
      checkoutUrl: checkout.url,
      checkoutId: checkout.id 
    });

  } catch (error: any) {
    console.error("❌ Checkout error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to create checkout session" },
      { status: 500 }
    );
  }
}
