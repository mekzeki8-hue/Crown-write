import { NextRequest, NextResponse } from "next/server";
import { polar } from "@/lib/polar";
import { auth, currentUser } from "@clerk/nextjs/server";

export async function POST(req: NextRequest) {
  try {
    const { productId } = await req.json();
    
    if (!productId) {
      return NextResponse.json(
        { error: "Product ID required" },
        { status: 400 }
      );
    }

    // Get authenticated user from Clerk
    const { userId } = await auth();
    const user = await currentUser();
    
    if (!userId || !user) {
      return NextResponse.json(
        { error: "Unauthorized. Please sign in first." },
        { status: 401 }
      );
    }

    // Create checkout session with Polar
    const checkout = await polar.checkouts.create({
      products: [productId],
      successUrl: `${req.nextUrl.origin}/?checkout=success`,
      customerEmail: user.emailAddresses[0].emailAddress,
      metadata: {
        userId: userId,
        source: "crownwrite_web",
      },
    });

    return NextResponse.json({ 
      checkoutUrl: checkout.url,
      checkoutId: checkout.id 
    });

  } catch (error: any) {
    console.error("Checkout error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to create checkout session" },
      { status: 500 }
    );
  }
}
