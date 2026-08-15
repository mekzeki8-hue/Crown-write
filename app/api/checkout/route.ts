import { NextRequest, NextResponse } from "next/server";
import { polar } from "@/lib/polar";
import { createClient } from "@/lib/supabase/server";

export async function POST(req: NextRequest) {
  try {
    const { productId } = await req.json();
    
    if (!productId) {
      return NextResponse.json(
        { error: "Product ID required" },
        { status: 400 }
      );
    }

    // Get authenticated user
    const supabase = await createClient();
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    
    if (authError || !user) {
      return NextResponse.json(
        { error: "Unauthorized. Please sign in first." },
        { status: 401 }
      );
    }

    // Get user profile for email
    const { data: profile } = await supabase
      .from("profiles")
      .select("email, full_name")
      .eq("id", user.id)
      .single();

    // Create checkout session with Polar
    const checkout = await polar.checkouts.create({
      products: [productId],
      successUrl: `${req.nextUrl.origin}/dashboard?checkout=success`,
      customerEmail: profile?.email || user.email || "",
      metadata: {
        userId: user.id,
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
