"use client";
import { useState } from "react";
import DiscountBanner from "./DiscountBanner";

const PLANS = [
  {
    name: "Basic",
    monthly: 5.99, yearly: 35.88,
    tagline: "Perfect for occasional use.",
    variant: "light" as const,
    features: [
      { text: "10,000 words / mo",                                         bold: false },
      { text: "Up to 600 words per request",                               bold: false, tip: true },
      { text: "1 free reRewriting per task",                            bold: false, tip: true },
      { text: "Basic Rewriting Engine",                                 bold: false },
      { text: "Standard priority on AI generations",                       bold: false },
      { text: "Achieve good results with all AI detectors (incl. Turnitin & GPTZero)",        bold: false },
      { text: "Error free rewriting",                                      bold: false },
      { text: "3 tones (Standard, Academic, Professional)",                bold: false },
      { text: "All languages supported",                                   bold: false },
      { text: "Customer support",                                          bold: false },
    ],
    cta: "Get Started",
    monthlyId: process.env.NEXT_PUBLIC_POLAR_BASIC_MONTHLY,
    yearlyId: process.env.NEXT_PUBLIC_POLAR_BASIC_YEARLY,
  },
  {
    name: "Pro",
    monthly: 19.99, yearly: 119.88,
    tagline: "Best for regular content creators.",
    variant: "mid" as const,
    features: [
      { text: "50,000 words / mo",                                         bold: true  },
      { text: "Up to 2,000 words per request",                             bold: false, tip: true },
      { text: "2 free reRewritings per task",                           bold: false, tip: true },
      { text: "Ultra Mode access",                                         bold: false, tip: true },
      { text: "Faster processing",                                         bold: false },
      { text: "Advanced Rewriting Engine",                              bold: false },
      { text: "High priority on AI generations",                           bold: false },
      { text: "Achieve good results with all AI detectors (incl. Turnitin & GPTZero)",        bold: false },
      { text: "Error free rewriting",                                      bold: false },
      { text: "All tonalities available",                                  bold: false },
      { text: "All languages supported",                                   bold: false },
      { text: "Priority email support",                                    bold: false },
    ],
    cta: "Get Started",
    monthlyId: process.env.NEXT_PUBLIC_POLAR_PRO_MONTHLY,
    yearlyId: process.env.NEXT_PUBLIC_POLAR_PRO_YEARLY,
  },
  {
    name: "Max",
    monthly: 39.99, yearly: 239.88,
    tagline: "For power users and teams.",
    variant: "dark" as const,
    features: [
      { text: "Unlimited words / mo",                                      bold: true  },
      { text: "Up to 3,000 words per request",                             bold: false, tip: true },
      { text: "3 free reRewritings per task",                           bold: false, tip: true },
      { text: "Ultra Mode access",                                         bold: false, tip: true },
      { text: "Priority processing",                                       bold: false },
      { text: "Advanced Rewriting Engine",                              bold: true  },
      { text: "Always first on AI generations",                            bold: false },
      { text: "Achieve good results with all AI detectors (incl. Turnitin & GPTZero)",        bold: false },
      { text: "Error free rewriting",                                      bold: false },
      { text: "All tonalities available",                                  bold: false },
      { text: "All languages supported",                                   bold: true  },
      { text: "API access for integrations",                               bold: true  },
      { text: "Team support",                                              bold: true  },
      { text: "Dedicated support",                                         bold: false },
    ],
    cta: "Get Started",
    monthlyId: process.env.NEXT_PUBLIC_POLAR_MAX_MONTHLY,
    yearlyId: process.env.NEXT_PUBLIC_POLAR_MAX_YEARLY,
  },
];

function TipIcon({ invert }: { invert: boolean }) {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none"
      stroke={invert ? "rgba(255,255,255,.45)" : "var(--subtle)"}
      strokeWidth="1.8" strokeLinecap="round"
      style={{ flexShrink: 0, marginLeft: 2 }}>
      <circle cx="12" cy="12" r="10"/>
      <path d="M12 16v-4M12 8h.01"/>
    </svg>
  );
}

function CheckIcon({ color }: { color: string }) {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none"
      stroke={color} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"
      style={{ flexShrink: 0, marginTop: 1 }}>
      <polyline points="20 6 9 17 4 12"/>
    </svg>
  );
}

function PlanCard({ plan, yearly }: { plan: typeof PLANS[0]; yearly: boolean }) {
  const [hov, setHov] = useState(false);
  const [loading, setLoading] = useState(false);
  
  // Calculate monthly equivalent for yearly plan
  const yearlyMonthly = plan.yearly / 12;
  const displayPrice = yearly ? yearlyMonthly : plan.monthly;
  const productId = yearly ? plan.yearlyId : plan.monthlyId;

  const handleCheckout = async () => {
    if (!productId) {
      alert("Product not configured yet. Please contact support.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productId }),
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

  /* ── Variant-specific tokens ── */
  const isLight = plan.variant === "light";
  const isMid   = plan.variant === "mid";
  const isDark  = plan.variant === "dark";

  const cardBg      = isLight ? "var(--surface)"
                    : isMid   ? "linear-gradient(155deg, var(--a600) 0%, var(--a500) 45%, var(--a400) 100%)"
                    :           "linear-gradient(155deg, #2A2420 0%, #3D3630 50%, #4A3A28 100%)";

  const cardBorder  = isLight ? "1.5px solid var(--border-2)"
                    : isMid   ? "none"
                    :           "none";

  const cardShadow  = isLight
    ? (hov ? "var(--sh-md)" : "var(--sh-xs)")
    : isMid
    ? (hov ? "0 20px 56px rgba(168,125,84,.38)" : "0 10px 36px rgba(168,125,84,.28)")
    : (hov ? "0 20px 56px rgba(20,10,0,.55)"    : "0 10px 36px rgba(20,10,0,.42)");

  /* Text colors */
  const nameColor    = isLight ? "var(--ink)"          : "rgba(255,255,255,.9)";
  const priceColor   = isLight ? "var(--ink)"          : "white";
  const priceSubColor= isLight ? "var(--subtle)"       : "rgba(255,255,255,.55)";
  const taglineColor = isLight ? "var(--muted)"        : "rgba(255,255,255,.62)";
  const featureColor = isLight ? "var(--muted)"        : "rgba(255,255,255,.78)";
  const boldColor    = isLight ? "var(--ink-2)"        : isMid ? "white" : "var(--a300)";
  const dividerColor = isLight ? "var(--border)"       : "rgba(255,255,255,.12)";
  const checkColor   = isLight ? "var(--success)"      : isMid ? "rgba(255,255,255,.85)" : "var(--a400)";

  /* CTA */
  const ctaBg        = isLight ? "transparent"         : "rgba(255,255,255,.15)";
  const ctaColor     = isLight ? "var(--brand)"        : "white";
  const ctaBorder    = isLight ? "1.5px solid var(--brand)" : "1.5px solid rgba(255,255,255,.35)";
  const ctaHoverBg   = isLight ? "var(--brand-xpale)"  : "rgba(255,255,255,.25)";

  /* Most Popular badge — mid card only */
  const showBadge = isMid;

  return (
    <div
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        borderRadius: 20,
        padding: "34px 26px 30px",
        position: "relative",
        background: cardBg,
        border: cardBorder,
        boxShadow: cardShadow,
        transform: hov ? (isMid ? "translateY(-6px)" : "translateY(-3px)") : "translateY(0)",
        transition: "transform .25s cubic-bezier(.4,0,.2,1), box-shadow .25s cubic-bezier(.4,0,.2,1)",
        display: "flex", flexDirection: "column",
        minHeight: isMid ? 720 : 680,
      }}
    >
      {/* Subtle inner highlight on gradient cards */}
      {!isLight && (
        <div aria-hidden style={{
          position: "absolute", inset: 0, borderRadius: 20,
          background: "radial-gradient(ellipse at 35% 15%, rgba(255,255,255,.1), transparent 55%)",
          pointerEvents: "none",
        }} />
      )}

      {/* Most Popular badge */}
      {showBadge && (
        <div style={{
          position: "absolute", top: -13, left: "50%", transform: "translateX(-50%)",
          padding: "4px 16px", borderRadius: 99,
          background: "var(--ink)", color: "rgba(255,255,255,.88)",
          fontSize: 10, fontWeight: 600, letterSpacing: "0.09em",
          whiteSpace: "nowrap", boxShadow: "var(--sh-sm)",
        }}>Most Popular</div>
      )}

      {/* Name */}
      <div style={{ marginBottom: 10 }}>
        <span style={{ fontSize: 17, fontWeight: 600, color: nameColor, letterSpacing: "-.2px" }}>
          {plan.name}
        </span>
      </div>

      {/* Price with strikethrough for yearly */}
      <div style={{ marginBottom: 4 }}>
        {yearly && (
          <div style={{ marginBottom: 6 }}>
            <span style={{
              fontSize: 20,
              fontWeight: 500,
              color: priceSubColor,
              textDecoration: "line-through",
              opacity: 0.6,
            }}>$​{plan.monthly.toFixed(2)}</span>
          </div>
        )}
        <span style={{
          fontFamily: "var(--font-sans)", fontSize: 52,
          fontWeight: 600, letterSpacing: "-1px", lineHeight: 1,
          color: priceColor,
        }}>$​{displayPrice.toFixed(2)}</span>
      </div>
      
      <p style={{ fontSize: 12, color: priceSubColor, marginBottom: yearly ? 2 : 4, fontWeight: 400 }}>
        per month {yearly ? "(billed annually)" : "(billed monthly)"}
      </p>
      
      {yearly && (
        <p style={{ fontSize: 11, color: priceSubColor, marginBottom: 4, fontWeight: 400, opacity: 0.8 }}>
          ${plan.yearly.toFixed(2)}/year total
        </p>
      )}

      {/* Divider */}
      <div style={{ height: 1, background: dividerColor, margin: "16px 0" }} />

      {/* Tagline */}
      <p style={{ fontSize: 13, color: taglineColor, fontWeight: 400, marginBottom: 18, lineHeight: 1.5 }}>
        {plan.tagline}
      </p>

      {/* Features */}
      <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 10, flex: 1 }}>
        {plan.features.map((f, i) => (
          <li key={i} style={{ display: "flex", alignItems: "flex-start", gap: 8 }}>
            <CheckIcon color={checkColor} />
            <span style={{
              fontSize: 13.5, lineHeight: 1.5,
              fontWeight: f.bold ? 600 : 400,
              color: f.bold ? boldColor : featureColor,
            }}>
              {f.text}
            </span>
            {f.tip && <TipIcon invert={!isLight} />}
          </li>
        ))}
      </ul>

      {/* Divider */}
      <div style={{ height: 1, background: dividerColor, margin: "22px 0 18px" }} />

      {/* CTA */}
      <button 
        onClick={handleCheckout}
        disabled={loading}
        style={{
        width: "100%", padding: "12px", borderRadius: 99,
        fontSize: 14, fontWeight: 500,
        cursor: loading ? "not-allowed" : "pointer", border: ctaBorder,
        backgroundColor: ctaBg, color: ctaColor,
        letterSpacing: "-.01em",
        transition: "all .2s ease",
        opacity: loading ? 0.6 : 1,
      }}
      onMouseEnter={e => { if (!loading) { const el = e.currentTarget as HTMLElement; el.style.backgroundColor = ctaHoverBg; el.style.transform = "translateY(-1px)"; }}}
      onMouseLeave={e => { if (!loading) { const el = e.currentTarget as HTMLElement; el.style.backgroundColor = ctaBg; el.style.transform = "none"; }}}>
        {loading ? "Loading..." : plan.cta}
      </button>
    </div>
  );
}

function TopUpCard({ plan, yearly }: { plan: { name: string; price: number; credits: number; productId?: string }; yearly: boolean }) {
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

  const features = [
    "Instant credit delivery",
    "Works with any plan",
    "No expiration date",
  ];

  return (
    <div
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        borderRadius: 16,
        padding: "28px 24px",
        background: "var(--surface)",
        border: "1.5px solid var(--border-2)",
        boxShadow: hov ? "var(--sh-md)" : "var(--sh-card)",
        transform: hov ? "translateY(-4px)" : "translateY(0)",
        transition: "all .25s cubic-bezier(.4,0,.2,1)",
        display: "flex",
        flexDirection: "column",
        minHeight: 380,
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Subtle gradient overlay */}
      <div aria-hidden style={{
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        height: 80,
        background: "linear-gradient(180deg, var(--brand-ghost) 0%, transparent 100%)",
        pointerEvents: "none",
        opacity: hov ? 1 : 0.6,
        transition: "opacity .3s ease",
      }} />

      {/* Content */}
      <div style={{ position: "relative", zIndex: 1, display: "flex", flexDirection: "column", flex: 1 }}>
        {/* Name */}
        <div style={{ marginBottom: 12 }}>
          <span style={{ fontSize: 15, fontWeight: 600, color: "var(--ink)", letterSpacing: "-.2px" }}>
            {plan.name}
          </span>
        </div>

        {/* Price */}
        <div style={{ marginBottom: 4 }}>
          <span style={{
            fontFamily: "var(--font-sans)", fontSize: 44,
            fontWeight: 600, letterSpacing: "-1px", lineHeight: 1,
            color: "var(--ink)",
          }}>$​{plan.price}</span>
          <span style={{ fontSize: 14, color: "var(--muted)", marginLeft: 4 }}>/one-time</span>
        </div>
        
        {/* Credits info */}
        <p style={{ fontSize: 13, color: "var(--subtle)", marginBottom: 18, fontWeight: 400 }}>
          Credits never expire
        </p>

        {/* Buy Button - Brand gradient */}
        <button 
          onClick={handlePurchase}
          disabled={loading}
          style={{
            width: "100%", 
            padding: "12px", 
            borderRadius: 8,
            fontSize: 14, 
            fontWeight: 600,
            cursor: loading ? "not-allowed" : "pointer",
            border: "none",
            backgroundImage: hov && !loading ? "none" : "var(--g-brand)",
            backgroundColor: hov && !loading ? "var(--brand-dark)" : "transparent",
            backgroundSize: "200% 200%",
            color: "white",
            letterSpacing: "-.01em",
            transition: "all .2s ease",
            opacity: loading ? 0.7 : 1,
            marginBottom: 18,
            boxShadow: hov && !loading ? "var(--sh-brandlg)" : "var(--sh-brand)",
          }}
        >
          {loading ? "Loading..." : "Buy Credits"}
        </button>

        {/* Divider with text */}
        <div style={{ 
          textAlign: "center", 
          fontSize: 11, 
          color: "var(--subtle)", 
          marginBottom: 14,
          fontWeight: 400,
        }}>
          Secure checkout · Instant delivery
        </div>

        {/* Features with checkmarks */}
        <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 10, flex: 1 }}>
          {features.map((feature, i) => (
            <li key={i} style={{ display: "flex", alignItems: "flex-start", gap: 8 }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
                stroke="var(--brand)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
                style={{ flexShrink: 0, marginTop: 2 }}>
                <circle cx="12" cy="12" r="10"/>
                <path d="M9 12l2 2 4-4"/>
              </svg>
              <span style={{
                fontSize: 13, lineHeight: 1.5,
                fontWeight: 400,
                color: "var(--ink-2)",
              }}>
                {feature}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default function Pricing() {
  const [yearly, setYearly] = useState(true); // Default to yearly

  const TOPUP_PLANS = [
    { name: "BASIC TOPUP", price: 5.99, credits: 10000, productId: process.env.NEXT_PUBLIC_POLAR_BASIC_TOPUP },
    { name: "PRO TOPUP", price: 19.99, credits: 50000, productId: process.env.NEXT_PUBLIC_POLAR_PRO_TOPUP },
    { name: "ULTRA TOPUP", price: 39.99, credits: 100000, productId: process.env.NEXT_PUBLIC_POLAR_MAX_TOPUP },
  ];

  return (
    <section id="pricing" style={{ 
      background: "var(--g-soft)", 
      padding: "clamp(60px, 12vw, 88px) 0 clamp(80px, 15vw, 108px)",
      position: "relative",
      overflow: "hidden",
    }}>
      {/* Decorative gradient bands */}
      <div aria-hidden style={{
        position: "absolute",
        top: "20%",
        left: "-10%",
        width: "120%",
        height: 200,
        background: "var(--g-warm-band)",
        transform: "rotate(-3deg)",
        pointerEvents: "none",
        opacity: 0.4,
      }} />

      <div style={{ maxWidth: 1400, margin: "0 auto", padding: "0 clamp(16px, 5vw, 80px)", position: "relative", zIndex: 1 }}>

        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: 48 }}>
          <p className="section-label">Pricing</p>
          <h2 style={{
            fontFamily: "var(--font-sans)", fontSize: "clamp(26px,3.5vw,44px)",
            fontWeight: 600, letterSpacing: "-1.8px", lineHeight: 1.1,
            marginBottom: 12, color: "var(--ink)",
          }}>
            Simple,{" "}
            <span className="grad-text" style={{ fontFamily: "var(--font-serif)", fontStyle: "italic", fontWeight: 500 }}>
              honest pricing.
            </span>
          </h2>
          <p style={{ fontSize: 15, color: "var(--muted)", fontWeight: 400, marginBottom: 28 }}>
            No hidden fees. Cancel anytime.
          </p>
        </div>

        {/* Discount Banner */}
        <div style={{ marginBottom: 36 }}>
          <DiscountBanner />
        </div>

        {/* Toggle */}
        <div style={{ textAlign: "center", marginBottom: 40 }}>
          <div style={{
            display: "inline-flex", background: "var(--surface)",
            border: "1px solid var(--border)", borderRadius: 99, padding: 3,
            boxShadow: "var(--sh-xs)",
          }}>
            {[{ v: false, l: "Monthly" }, { v: true, l: "Yearly" }].map(({ v, l }) => (
              <button key={l} onClick={() => setYearly(v)} style={{
                padding: "7px 22px", borderRadius: 99, fontSize: 13,
                fontWeight: yearly === v ? 600 : 400, border: "none", cursor: "pointer",
                transition: "all .2s",
                background: yearly === v ? "var(--g-brand)" : "transparent",
                color: yearly === v ? "white" : "var(--muted)",
                display: "flex", alignItems: "center", gap: 8,
              }}>
                {l}
                {v && (
                  <span style={{
                    fontSize: 10, fontWeight: 700, padding: "2px 8px", borderRadius: 99,
                    background: yearly ? "rgba(255,255,255,.28)" : "var(--success)",
                    color: "white",
                  }}>–50%</span>
                )}
              </button>
            ))}
          </div>
          
          <p style={{
            fontSize: 13,
            color: "var(--success)",
            fontWeight: 600,
            marginTop: 12,
            letterSpacing: "-0.01em",
          }}>
            Save 50% per month with yearly billing
          </p>
        </div>

        {/* Subscription Cards - Increased spacing */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "1fr 1.08fr 1fr",
          gap: 32, // Increased from 28px
          alignItems: "start",
          maxWidth: 1300, // Increased from 1120px
          margin: "0 auto",
        }} className="price-grid">
          {PLANS.map(p => (
            <PlanCard key={p.name} plan={p} yearly={yearly} />
          ))}
        </div>

        <p style={{
          textAlign: "center", marginTop: 28,
          fontSize: 12, color: "var(--placeholder)", fontWeight: 400,
        }}>
          All plans include a 7-day free trial. No credit card required to start.
        </p>

        {/* Top-Up Credits Section */}
        <div style={{ marginTop: 80, position: "relative" }}>
          {/* Subtle decorative gradient */}
          <div aria-hidden style={{
            position: "absolute",
            top: -40,
            left: "50%",
            transform: "translateX(-50%)",
            width: "80%",
            height: 1,
            background: "linear-gradient(90deg, transparent 0%, var(--border-2) 50%, transparent 100%)",
            pointerEvents: "none",
          }} />

          <div style={{ textAlign: "center", marginBottom: 36 }}>
            <h3 style={{
              fontFamily: "var(--font-sans)", fontSize: "clamp(22px,3vw,32px)",
              fontWeight: 600, letterSpacing: "-1.2px", lineHeight: 1.2,
              marginBottom: 8, color: "var(--ink)",
            }}>
              Need{" "}
              <span className="grad-text" style={{ fontFamily: "var(--font-serif)", fontStyle: "italic" }}>
                Extra Credits?
              </span>
            </h3>
            <p style={{ fontSize: 14, color: "var(--muted)", fontWeight: 400 }}>
              Running low? Top up your account with a one-time credit pack.
            </p>
            <p style={{ fontSize: 12, color: "var(--subtle)", fontWeight: 400, marginTop: 4 }}>
              Secure checkout · Instant delivery
            </p>
          </div>

          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: 28, // Increased from 24px
            maxWidth: 1100, // Increased from 960px
            margin: "0 auto",
          }} className="topup-grid">
            {TOPUP_PLANS.map(plan => (
              <TopUpCard key={plan.name} plan={plan} yearly={yearly} />
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 1100px) {
          .price-grid { grid-template-columns: 1fr !important; max-width: 500px; margin: 0 auto; gap: 24px !important; }
        }
        @media (max-width: 860px) {
          .price-grid { max-width: 420px; }
          .topup-grid { grid-template-columns: 1fr !important; max-width: 360px; margin: 0 auto; }
        }
        @media (max-width: 540px) {
          .price-grid { max-width: 100%; }
          .topup-grid { max-width: 100%; }
        }
      `}</style>
    </section>
  );
}
