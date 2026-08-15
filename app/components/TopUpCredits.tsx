"use client";
import { useState } from "react";

const TOPUP_PLANS = [
  {
    name: "BASIC TOPUP",
    price: 5.99,
    credits: 10000,
    description: "Credits never expire",
    features: [
      "Instant credit delivery",
      "Works with any plan",
      "No expiration date",
    ],
    productId: process.env.NEXT_PUBLIC_POLAR_BASIC_TOPUP,
    variant: "light" as const,
  },
  {
    name: "PRO TOPUP",
    price: 19.99,
    credits: 50000,
    description: "Credits never expire",
    features: [
      "Instant credit delivery",
      "Works with any plan",
      "No expiration date",
    ],
    productId: process.env.NEXT_PUBLIC_POLAR_PRO_TOPUP,
    variant: "mid" as const,
  },
  {
    name: "ULTRA TOPUP",
    price: 39.99,
    credits: 100000,
    description: "Credits never expire",
    features: [
      "Instant credit delivery",
      "Works with any plan",
      "No expiration date",
    ],
    productId: process.env.NEXT_PUBLIC_POLAR_MAX_TOPUP,
    variant: "dark" as const,
  },
];

function CheckIcon({ color }: { color: string }) {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none"
      stroke={color} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"
      style={{ flexShrink: 0, marginTop: 1 }}>
      <polyline points="20 6 9 17 4 12"/>
    </svg>
  );
}

function TopUpCard({ plan }: { plan: typeof TOPUP_PLANS[0] }) {
  const [loading, setLoading] = useState(false);
  const [hov, setHov] = useState(false);

  const handlePurchase = async () => {
    if (!plan.productId) {
      alert("Product not configured yet. Please contact support.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productId: plan.productId }),
      });

      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.error || "Checkout failed");
      }

      const { checkoutUrl } = await res.json();
      
      if (checkoutUrl) {
        window.location.href = checkoutUrl;
      }
    } catch (error) {
      console.error("Checkout error:", error);
      alert(error instanceof Error ? error.message : "Failed to start checkout. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Styling based on variant
  const isLight = plan.variant === "light";
  const isMid = plan.variant === "mid";
  const isDark = plan.variant === "dark";

  const cardBg = isLight ? "var(--surface)"
               : isMid ? "linear-gradient(155deg, var(--a600) 0%, var(--a500) 45%, var(--a400) 100%)"
               : "linear-gradient(155deg, #2A2420 0%, #3D3630 50%, #4A3A28 100%)";

  const cardBorder = isLight ? "1.5px solid var(--border-2)" : "none";
  
  const cardShadow = isLight
    ? (hov ? "var(--sh-md)" : "var(--sh-xs)")
    : isMid
    ? (hov ? "0 20px 56px rgba(168,125,84,.38)" : "0 10px 36px rgba(168,125,84,.28)")
    : (hov ? "0 20px 56px rgba(20,10,0,.55)" : "0 10px 36px rgba(20,10,0,.42)");

  const nameColor = isLight ? "var(--ink)" : "rgba(255,255,255,.9)";
  const priceColor = isLight ? "var(--ink)" : "white";
  const descColor = isLight ? "var(--muted)" : "rgba(255,255,255,.62)";
  const featureColor = isLight ? "var(--muted)" : "rgba(255,255,255,.78)";
  const dividerColor = isLight ? "var(--border)" : "rgba(255,255,255,.12)";
  const checkColor = isLight ? "var(--success)" : isMid ? "rgba(255,255,255,.85)" : "var(--a400)";

  const ctaBg = isLight ? "transparent" : "rgba(255,255,255,.15)";
  const ctaColor = isLight ? "var(--brand)" : "white";
  const ctaBorder = isLight ? "1.5px solid var(--brand)" : "1.5px solid rgba(255,255,255,.35)";
  const ctaHoverBg = isLight ? "var(--brand-xpale)" : "rgba(255,255,255,.25)";

  return (
    <div
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        borderRadius: 16,
        padding: "28px 22px 26px",
        position: "relative",
        background: cardBg,
        border: cardBorder,
        boxShadow: cardShadow,
        transform: hov ? "translateY(-4px)" : "translateY(0)",
        transition: "transform .25s cubic-bezier(.4,0,.2,1), box-shadow .25s cubic-bezier(.4,0,.2,1)",
        display: "flex",
        flexDirection: "column",
        minHeight: 340,
      }}
    >
      {/* Subtle highlight on gradient cards */}
      {!isLight && (
        <div aria-hidden style={{
          position: "absolute", inset: 0, borderRadius: 16,
          background: "radial-gradient(ellipse at 35% 15%, rgba(255,255,255,.1), transparent 55%)",
          pointerEvents: "none",
        }} />
      )}

      {/* Name */}
      <div style={{ marginBottom: 10 }}>
        <span style={{ fontSize: 15, fontWeight: 600, color: nameColor, letterSpacing: "-.2px" }}>
          {plan.name}
        </span>
      </div>

      {/* Price */}
      <div style={{ marginBottom: 4 }}>
        <span style={{
          fontFamily: "var(--font-serif)", fontSize: 44,
          fontWeight: 600, letterSpacing: "-2px", lineHeight: 1,
          color: priceColor,
        }}>${plan.price}</span>
      </div>
      
      <p style={{ fontSize: 12, color: descColor, marginBottom: 2, fontWeight: 400 }}>
        / one-time
      </p>
      <p style={{ fontSize: 13, color: descColor, marginBottom: 6, fontWeight: 500 }}>
        {plan.credits.toLocaleString()} words
      </p>

      {/* Divider */}
      <div style={{ height: 1, background: dividerColor, margin: "14px 0" }} />

      {/* Description */}
      <p style={{ fontSize: 13, color: descColor, fontWeight: 400, marginBottom: 16, lineHeight: 1.4 }}>
        {plan.description}
      </p>

      {/* Features */}
      <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 8, flex: 1, marginBottom: 18 }}>
        {plan.features.map((f, i) => (
          <li key={i} style={{ display: "flex", alignItems: "flex-start", gap: 8 }}>
            <CheckIcon color={checkColor} />
            <span style={{
              fontSize: 13, lineHeight: 1.4,
              fontWeight: 400,
              color: featureColor,
            }}>
              {f}
            </span>
          </li>
        ))}
      </ul>

      {/* CTA */}
      <button 
        onClick={handlePurchase}
        disabled={loading}
        style={{
          width: "100%", padding: "11px", borderRadius: 99,
          fontSize: 14, fontWeight: 500,
          cursor: loading ? "not-allowed" : "pointer",
          border: ctaBorder,
          background: ctaBg, color: ctaColor,
          letterSpacing: "-.01em",
          transition: "all .2s ease",
          opacity: loading ? 0.6 : 1,
        }}
        onMouseEnter={e => { 
          if (!loading) { 
            const el = e.currentTarget as HTMLElement; 
            el.style.background = ctaHoverBg; 
            el.style.transform = "translateY(-1px)"; 
          }
        }}
        onMouseLeave={e => { 
          if (!loading) { 
            const el = e.currentTarget as HTMLElement; 
            el.style.background = ctaBg; 
            el.style.transform = "none"; 
          }
        }}
      >
        {loading ? "Loading..." : "Buy Credits"}
      </button>
    </div>
  );
}

export default function TopUpCredits() {
  return (
    <section style={{ padding: "60px 0" }}>
      <div style={{ maxWidth: 1080, margin: "0 auto", padding: "0 28px" }}>
        
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: 40 }}>
          <h2 style={{
            fontFamily: "var(--font-sans)", fontSize: "clamp(24px,3vw,36px)",
            fontWeight: 600, letterSpacing: "-1.5px", lineHeight: 1.2,
            marginBottom: 10, color: "var(--ink)",
          }}>
            Need Extra Credits?
          </h2>
          <p style={{ fontSize: 14, color: "var(--muted)", fontWeight: 400 }}>
            Running low? Top up your account with a one-time credit pack.
          </p>
          <p style={{ fontSize: 13, color: "var(--subtle)", fontWeight: 400, marginTop: 4 }}>
            Secure checkout · Instant delivery
          </p>
        </div>

        {/* Cards */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: 16,
        }} className="topup-grid">
          {TOPUP_PLANS.map(plan => (
            <TopUpCard key={plan.name} plan={plan} />
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 860px) {
          .topup-grid { 
            grid-template-columns: 1fr !important; 
            max-width: 380px; 
            margin: 0 auto; 
          }
        }
      `}</style>
    </section>
  );
}
