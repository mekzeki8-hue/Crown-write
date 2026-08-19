"use client";
import { useState } from "react";

const CARDS = [
  {
    icon:<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><polyline points="9 12 11 14 15 10"/></svg>,
    label:"Undetectable", title:"Passes Every Detector",
    desc:"Turnitin, GPTZero, Copyleaks, ZeroGPT, Originality.ai — consistently Achieved good results. Models updated weekly.",
    badge:"99.9% success", span:2,
  },
  {
    icon:<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>,
    label:"Speed", title:"Under 2 Seconds",
    desc:"Results stream back instantly. No queues, no waiting.", span:1,
  },
  {
    icon:<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>,
    label:"Private", title:"Zero Data Storage",
    desc:"Processed in-memory, discarded immediately. Never stored, never trained on.", span:1,
  },
  {
    icon:<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><line x1="4" y1="21" x2="4" y2="14"/><line x1="4" y1="10" x2="4" y2="3"/><line x1="12" y1="21" x2="12" y2="12"/><line x1="12" y1="8" x2="12" y2="3"/><line x1="20" y1="21" x2="20" y2="16"/><line x1="20" y1="12" x2="20" y2="3"/><line x1="1" y1="14" x2="7" y2="14"/><line x1="9" y1="8" x2="15" y2="8"/><line x1="17" y1="16" x2="23" y2="16"/></svg>,
    label:"7 Tones", title:"Choose Your Voice",
    desc:"Auto, Academic, Professional, Friendly, Formal, Casual, Creative — tuned for your audience.", span:2,
  },
  {
    icon:<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M23 12a11.05 11.05 0 0 0-22 0zm-5 7a3 3 0 0 1-6 0v-7"/></svg>,
    label:"Unlimited", title:"Iterate Freely",
    desc:"Rewrite the same passage as many times as needed until it sounds exactly right.", span:1,
  },
];

export default function Features() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section id="features" style={{ 
      background: "linear-gradient(180deg, var(--bg) 0%, var(--bg-2) 100%)", 
      padding: "100px 0 120px",
      position: "relative",
      overflow: "hidden",
    }}>
      {/* Decorative background elements */}
      <div aria-hidden style={{
        position: "absolute",
        top: "10%",
        left: "-10%",
        width: 500,
        height: 500,
        background: "radial-gradient(circle, rgba(192, 154, 114, 0.03) 0%, transparent 70%)",
        pointerEvents: "none",
        filter: "blur(60px)",
      }} />
      <div aria-hidden style={{
        position: "absolute",
        bottom: "10%",
        right: "-10%",
        width: 600,
        height: 600,
        background: "radial-gradient(circle, rgba(192, 154, 114, 0.04) 0%, transparent 70%)",
        pointerEvents: "none",
        filter: "blur(80px)",
      }} />

      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 28px", position: "relative", zIndex: 1 }}>
        {/* Beautiful Header Section */}
        <div style={{ 
          textAlign: "center", 
          marginBottom: 64,
          position: "relative",
        }}>
          {/* Animated label */}
          <div style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            background: "linear-gradient(135deg, var(--brand-xpale) 0%, rgba(192, 154, 114, 0.08) 100%)",
            border: "1.5px solid var(--a300)",
            padding: "8px 20px",
            borderRadius: 999,
            marginBottom: 24,
            boxShadow: "0 4px 16px rgba(192, 154, 114, 0.08)",
            transition: "all 0.3s ease",
            cursor: "default",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "scale(1.05)";
            e.currentTarget.style.boxShadow = "0 6px 24px rgba(192, 154, 114, 0.15)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "scale(1)";
            e.currentTarget.style.boxShadow = "0 4px 16px rgba(192, 154, 114, 0.08)";
          }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" style={{ color: "var(--brand)" }}>
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
            </svg>
            <span style={{
              fontSize: 12,
              fontWeight: 700,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              background: "linear-gradient(135deg, var(--brand) 0%, var(--brand-dark) 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}>
              Why CrownWrite
            </span>
          </div>

          {/* Main Heading with gradient animation */}
          <h2 style={{
            fontFamily: "var(--font-sans)", 
            fontSize: "clamp(32px, 5vw, 56px)",
            fontWeight: 700, 
            letterSpacing: "-2px", 
            lineHeight: 1.1,
            marginBottom: 20, 
            color: "var(--ink)",
            position: "relative",
          }}>
            Less robotic.{" "}
            <span style={{ 
              fontFamily: "var(--font-serif)", 
              fontStyle: "italic", 
              fontWeight: 600,
              background: "linear-gradient(135deg, var(--brand) 0%, var(--brand-dark) 50%, var(--brand) 100%)",
              backgroundSize: "200% 200%",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              animation: "gradientShift 3s ease infinite",
            }}>
              More you.
            </span>
          </h2>

          {/* Description with better spacing */}
          <p style={{ 
            fontSize: 18, 
            color: "var(--muted)", 
            maxWidth: 540, 
            margin: "0 auto", 
            lineHeight: 1.8, 
            fontWeight: 400,
          }}>
            Everything you need to turn AI output into writing that feels{" "}
            <span style={{ 
              color: "var(--brand)",
              fontWeight: 600,
            }}>
              genuinely human
            </span>.
          </p>

          {/* Call-to-action buttons */}
          <div style={{
            display: "flex",
            gap: 16,
            justifyContent: "center",
            marginTop: 32,
            flexWrap: "wrap",
          }}>
            <a
              href="#workspace"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                padding: "14px 32px",
                background: "var(--g-brand)",
                color: "white",
                borderRadius: 999,
                fontSize: 15,
                fontWeight: 600,
                textDecoration: "none",
                boxShadow: "0 4px 16px rgba(192, 154, 114, 0.25)",
                transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                border: "none",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-2px)";
                e.currentTarget.style.boxShadow = "0 8px 24px rgba(192, 154, 114, 0.35)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "0 4px 16px rgba(192, 154, 114, 0.25)";
              }}
            >
              Try it now
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </a>
            <a
              href="#pricing"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                padding: "14px 32px",
                background: "var(--surface)",
                color: "var(--ink)",
                borderRadius: 999,
                fontSize: 15,
                fontWeight: 600,
                textDecoration: "none",
                border: "2px solid var(--border)",
                transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "var(--brand)";
                e.currentTarget.style.color = "var(--brand)";
                e.currentTarget.style.transform = "translateY(-2px)";
                e.currentTarget.style.boxShadow = "0 4px 12px rgba(0, 0, 0, 0.08)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "var(--border)";
                e.currentTarget.style.color = "var(--ink)";
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "none";
              }}
            >
              View pricing
            </a>
          </div>
        </div>

        {/* Enhanced Cards Grid */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 16 }} className="feat-grid">
          {CARDS.map((c, index) => (
            <div 
              key={c.title} 
              style={{
                gridColumn: `span ${c.span}`,
                background: hoveredIndex === index 
                  ? "linear-gradient(135deg, var(--surface) 0%, rgba(255, 255, 255, 0.5) 100%)" 
                  : "var(--surface)",
                border: hoveredIndex === index 
                  ? "1.5px solid var(--brand)" 
                  : "1px solid var(--border)",
                borderRadius: "var(--r-lg)",
                padding: "32px",
                position: "relative",
                overflow: "hidden",
                transition: "all 0.35s cubic-bezier(0.4, 0, 0.2, 1)",
                cursor: "default",
              }}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              {/* Animated background gradient on hover */}
              <div aria-hidden style={{
                position: "absolute",
                top: -100,
                right: -100,
                width: 300,
                height: 300,
                borderRadius: "50%",
                background: "radial-gradient(circle, var(--a200), transparent 70%)",
                pointerEvents: "none",
                opacity: hoveredIndex === index ? 0.6 : 0,
                transition: "opacity 0.5s ease",
                transform: hoveredIndex === index ? "scale(1.2)" : "scale(1)",
              }} />

              {/* Icon with enhanced styling */}
              <div style={{
                width: 52,
                height: 52,
                borderRadius: "var(--r-md)",
                background: hoveredIndex === index 
                  ? "linear-gradient(135deg, var(--brand) 0%, var(--brand-dark) 100%)" 
                  : "var(--brand-xpale)",
                border: hoveredIndex === index 
                  ? "1.5px solid var(--brand-dark)" 
                  : "1px solid var(--a300)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: hoveredIndex === index ? "white" : "var(--brand)",
                marginBottom: 20,
                transition: "all 0.35s cubic-bezier(0.4, 0, 0.2, 1)",
                transform: hoveredIndex === index ? "scale(1.1) rotate(5deg)" : "scale(1) rotate(0deg)",
                boxShadow: hoveredIndex === index 
                  ? "0 8px 24px rgba(192, 154, 114, 0.3)" 
                  : "0 2px 8px rgba(0, 0, 0, 0.04)",
              }}>
                {c.icon}
              </div>

              <div style={{ 
                fontSize: 11, 
                fontWeight: 700, 
                letterSpacing: "0.1em", 
                textTransform: "uppercase", 
                color: hoveredIndex === index ? "var(--brand-dark)" : "var(--brand)", 
                marginBottom: 8,
                transition: "color 0.3s ease",
              }}>
                {c.label}
              </div>
              
              <h3 style={{
                fontFamily: "var(--font-sans)",
                fontSize: 20,
                fontWeight: 700,
                marginBottom: 10,
                color: "var(--ink)",
                letterSpacing: "-0.5px",
                transition: "color 0.3s ease",
              }}>
                {c.title}
              </h3>
              
              <p style={{ 
                fontSize: 14.5, 
                lineHeight: 1.8, 
                color: "var(--muted)", 
                fontWeight: 400,
                transition: "color 0.3s ease",
              }}>
                {c.desc}
              </p>

              {c.badge && (
                <div style={{
                  marginTop: 20,
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 6,
                  padding: "6px 14px",
                  borderRadius: 999,
                  background: hoveredIndex === index 
                    ? "linear-gradient(135deg, var(--brand) 0%, var(--brand-dark) 100%)" 
                    : "var(--brand-xpale)",
                  border: hoveredIndex === index 
                    ? "1.5px solid var(--brand-dark)" 
                    : "1px solid var(--a300)",
                  fontSize: 12,
                  fontWeight: 600,
                  color: hoveredIndex === index ? "white" : "var(--brand-dark)",
                  transition: "all 0.35s cubic-bezier(0.4, 0, 0.2, 1)",
                  transform: hoveredIndex === index ? "scale(1.05)" : "scale(1)",
                  boxShadow: hoveredIndex === index 
                    ? "0 4px 12px rgba(192, 154, 114, 0.3)" 
                    : "none",
                }}>
                  <span style={{ 
                    width: 6, 
                    height: 6, 
                    borderRadius: "50%", 
                    background: hoveredIndex === index ? "white" : "var(--brand)",
                    display: "inline-block",
                    transition: "background 0.3s ease",
                  }} />
                  {c.badge}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes gradientShift {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        
        @media(max-width:860px){
          .feat-grid{grid-template-columns:1fr 1fr !important;}
          .feat-grid>div{grid-column:span 1 !important;}
        }
        @media(max-width:540px){
          .feat-grid{grid-template-columns:1fr !important;}
        }
      `}</style>
    </section>
  );
}
