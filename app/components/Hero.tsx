"use client";

export default function Hero() {
  return (
    <section style={{
      background: "var(--g-hero)",
      padding: "100px 0 80px",
      position: "relative",
      overflow: "hidden",
    }}>
      {/* Soft layered bands */}
      <div aria-hidden style={{ position:"absolute", inset:0, zIndex:0, pointerEvents:"none", overflow:"hidden" }}>
        <div style={{
          position:"absolute", left:"-5%", right:"-5%",
          height:"28%", top:"5%",
          background:"linear-gradient(90deg, transparent 5%, var(--a200) 30%, var(--a150) 55%, var(--a100) 80%, transparent 95%)",
          filter:"blur(24px)", borderRadius:"50%",
          animation:"bandDrift 10s ease-in-out infinite",
        }} />
        <div style={{
          position:"absolute", left:"-5%", right:"-5%",
          height:"22%", top:"40%",
          background:"linear-gradient(90deg, transparent 5%, var(--a100) 25%, var(--a150) 50%, var(--a100) 75%, transparent 95%)",
          filter:"blur(30px)", borderRadius:"50%",
          animation:"bandDrift 14s ease-in-out infinite", animationDelay:"-6s",
        }} />
        <div style={{
          position:"absolute", left:"-5%", right:"-5%",
          height:"20%", top:"70%",
          background:"linear-gradient(90deg, transparent 5%, rgba(212,184,150,.18) 30%, rgba(239,220,195,.28) 55%, rgba(212,184,150,.14) 80%, transparent 95%)",
          filter:"blur(28px)", borderRadius:"50%",
          animation:"bandDrift 12s ease-in-out infinite", animationDelay:"-3s",
        }} />
      </div>

      <div style={{
        position:"relative", zIndex:1,
        maxWidth:1200, margin:"0 auto", padding:"0 32px",
        textAlign: "center",
      }}>
        {/* Trust badge */}
        <div style={{ 
          display:"inline-flex", 
          alignItems:"center", 
          gap:8, 
          marginBottom:40,
          padding: "6px 16px",
          background: "var(--brand-xpale)",
          border: "1px solid var(--brand-pale)",
          borderRadius: 999,
        }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--brand)" strokeWidth="2" strokeLinecap="round">
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
          </svg>
          <span style={{
            fontSize:13, 
            fontWeight:600, 
            color:"var(--brand-dark)",
          }}>
            Trusted by <strong>1,225,415</strong> writers worldwide
          </span>
        </div>

        {/* Main headline */}
        <h1 style={{ 
          marginBottom:28, 
          maxWidth: 920, 
          margin: "0 auto 28px",
        }}>
          <span style={{
            display:"block",
            fontFamily:"var(--font-sans)",
            fontSize:"clamp(34px,5.2vw,64px)",
            fontWeight:700, 
            letterSpacing:"-2.5px",
            lineHeight:1.12, 
            color:"var(--ink)",
          }}>
            Get the{" "}
            <span style={{
              position: "relative",
              display: "inline-block",
              fontFamily:"var(--font-serif)", 
              fontStyle:"italic",
            }} className="grad-text">
              Crown
              <svg 
                style={{
                  position: "absolute",
                  bottom: -6,
                  left: "50%",
                  transform: "translateX(-50%)",
                  width: "110%",
                  height: "auto",
                }}
                viewBox="0 0 300 20" 
                xmlns="http://www.w3.org/2000/svg"
              >
                <path 
                  d="M5 15 Q 75 5, 150 10 T 295 12" 
                  stroke="var(--brand)" 
                  strokeWidth="3" 
                  fill="none" 
                  strokeLinecap="round"
                  opacity="0.4"
                />
              </svg>
            </span>
            {" "}of Natural,{" "}
            <br />
            Human-Sounding Writing
          </span>
        </h1>

        {/* Subheading */}
        <h2 style={{
          fontSize: "clamp(19px, 2.2vw, 24px)",
          lineHeight: 1.5,
          color: "var(--brand-dark)",
          fontWeight: 600,
          fontFamily: "var(--font-sans)",
          maxWidth: 680,
          margin: "0 auto 36px",
          letterSpacing: "-0.5px",
        }}>
          Get the Crown of Natural Writing
        </h2>

        {/* Description - centered and professional */}
        <div style={{
          maxWidth: 680,
          margin: "0 auto 40px",
          textAlign: "center",
        }}>
          <p style={{
            fontSize: 17,
            lineHeight: 1.7,
            color: "var(--muted)",
            fontWeight: 400,
            marginBottom: 22,
          }}>
            Transform AI-generated text into natural, human-sounding writing. CrownWrite refines your words, improves flow, and gives your content an authentic voice—while keeping your original meaning intact.
          </p>

          <p style={{
            fontSize: 18,
            lineHeight: 1.7,
            color: "var(--brand-dark)",
            fontWeight: 600,
            fontFamily: "var(--font-serif)",
            fontStyle: "italic",
            marginTop: 28,
          }}>
            Smart writing deserves the Crown.
          </p>
        </div>

        {/* Stat cards row */}
        <div style={{
          display: "flex",
          gap: 16,
          justifyContent: "center",
          flexWrap: "wrap",
          marginTop: 56,
        }}>
          {[
            { icon: "✓", label: "99%+ Rewriting effectiveness" },
            { icon: "🌐", label: "Supports over 100 languages" },
            { icon: "⚡", label: "Blazing fast Rewriting" }
          ].map((stat, i) => (
            <div key={i} style={{
              padding: "16px 28px",
              background: "var(--surface)",
              border: "1px solid var(--border)",
              borderRadius: 12,
              display: "flex",
              alignItems: "center",
              gap: 10,
              boxShadow: "var(--sh-xs)",
            }}>
              <span style={{ fontSize: 20 }}>{stat.icon}</span>
              <span style={{ 
                fontSize: 14, 
                fontWeight: 500, 
                color: "var(--ink-2)",
                whiteSpace: "nowrap",
              }}>
                {stat.label}
              </span>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
