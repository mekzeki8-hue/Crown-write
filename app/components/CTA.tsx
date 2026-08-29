"use client";

export default function CTA() {
  return (
    <section style={{ 
      background: "var(--bg)", 
      padding: "80px 24px 100px",
      position: "relative",
      overflow: "hidden",
    }}>
      {/* Subtle gradient background */}
      <div aria-hidden style={{
        position: "absolute",
        inset: 0,
        background: "radial-gradient(ellipse at center, rgba(192, 154, 114, 0.04) 0%, transparent 70%)",
        pointerEvents: "none",
      }} />

      <div style={{ 
        maxWidth: 1200, // Increased from 1000px
        margin: "0 auto", 
        position: "relative",
        zIndex: 1,
        padding: "0 80px", // Added padding
      }}>
        {/* Main CTA Card - Modern & Clean */}
        <div style={{
          background: "var(--surface)",
          borderRadius: 32,
          padding: "64px 48px",
          textAlign: "center",
          boxShadow: "0 20px 60px rgba(0, 0, 0, 0.08), 0 8px 24px rgba(0, 0, 0, 0.04)",
          border: "1px solid var(--border)",
          position: "relative",
          overflow: "hidden",
        }}>
          {/* Decorative gradient orbs */}
          <div aria-hidden style={{
            position: "absolute",
            top: -100,
            right: -100,
            width: 300,
            height: 300,
            background: "radial-gradient(circle, rgba(192, 154, 114, 0.12) 0%, transparent 70%)",
            borderRadius: "50%",
            filter: "blur(60px)",
            pointerEvents: "none",
          }} />
          <div aria-hidden style={{
            position: "absolute",
            bottom: -100,
            left: -100,
            width: 300,
            height: 300,
            background: "radial-gradient(circle, rgba(192, 154, 114, 0.08) 0%, transparent 70%)",
            borderRadius: "50%",
            filter: "blur(60px)",
            pointerEvents: "none",
          }} />

          {/* Content */}
          <div style={{ position: "relative", zIndex: 1 }}>
            {/* Badge */}
            <div style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              padding: "10px 20px",
              borderRadius: 999,
              background: "var(--bg-2)",
              border: "2px solid var(--border)",
              fontSize: 13,
              fontWeight: 700,
              letterSpacing: "0.5px",
              textTransform: "uppercase",
              color: "var(--muted)",
              marginBottom: 32,
              boxShadow: "0 2px 8px rgba(0, 0, 0, 0.04)",
            }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
              </svg>
              Free to start — no credit card
            </div>

            {/* Headline */}
            <h2 style={{
              fontFamily: "var(--font-sans)",
              fontSize: "clamp(32px, 5vw, 58px)",
              fontWeight: 800,
              letterSpacing: "-2.5px",
              lineHeight: 1.1,
              marginBottom: 24,
              color: "var(--ink)",
            }}>
              Make your writing
              <br />
              sound like{" "}
              <span style={{
                background: "linear-gradient(135deg, #C09A72 0%, #8C6440 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                fontFamily: "var(--font-serif)",
                fontStyle: "italic",
                fontWeight: 700,
              }}>
                you
              </span>
              .
            </h2>

            {/* Description */}
            <p style={{
              maxWidth: 580,
              margin: "0 auto 40px",
              fontSize: 18,
              lineHeight: 1.7,
              color: "var(--muted)",
              fontWeight: 400,
            }}>
              Join <strong style={{ color: "var(--ink)", fontWeight: 700 }}>50,000+ writers</strong>, academics, and professionals who trust CrownWrite to make their content sound genuinely human.
            </p>

            {/* CTA Buttons - Gen Z Style */}
            <div style={{ 
              display: "flex", 
              gap: 16, 
              justifyContent: "center", 
              flexWrap: "wrap",
              marginBottom: 48,
            }}>
              <a 
                href="#workspace" 
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 10,
                  padding: "18px 40px",
                  borderRadius: 16,
                  fontSize: 16,
                  fontWeight: 700,
                  background: "#000000",
                  color: "#FFFFFF",
                  textDecoration: "none",
                  boxShadow: "0 8px 24px rgba(0, 0, 0, 0.2)",
                  transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                  border: "none",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-3px)";
                  e.currentTarget.style.boxShadow = "0 12px 32px rgba(0, 0, 0, 0.25)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "0 8px 24px rgba(0, 0, 0, 0.2)";
                }}
              >
                Start Humanizing Free
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </a>

              <a 
                href="#pricing" 
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 10,
                  padding: "18px 40px",
                  borderRadius: 16,
                  fontSize: 16,
                  fontWeight: 700,
                  background: "var(--surface)",
                  color: "var(--ink)",
                  textDecoration: "none",
                  border: "2px solid var(--border)",
                  transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-3px)";
                  e.currentTarget.style.borderColor = "#C09A72";
                  e.currentTarget.style.color = "#C09A72";
                  e.currentTarget.style.boxShadow = "0 8px 24px rgba(192, 154, 114, 0.15)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  const isDark = document.documentElement.classList.contains('dark');
                  e.currentTarget.style.borderColor = isDark ? "rgba(255, 255, 255, 0.1)" : "#E0E0E0";
                  e.currentTarget.style.color = isDark ? "#FFFFFF" : "#000000";
                  e.currentTarget.style.boxShadow = "none";
                }}
              >
                View Pricing
              </a>
            </div>

            {/* Stats - Clean & Modern */}
            <div style={{ 
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
              gap: 32,
              maxWidth: 700,
              margin: "0 auto",
              paddingTop: 40,
              borderTop: "1px solid var(--border)",
            }}>
              {[
                { icon: "👥", value: "50K+", label: "Active Users" },
                { icon: "✨", value: "99.9%", label: "Success Rate" },
                { icon: "⚡", value: "< 2s", label: "Processing" }
              ].map((stat) => (
                <div key={stat.label} style={{ textAlign: "center" }}>
                  <div style={{
                    fontSize: 28,
                    marginBottom: 8,
                  }}>
                    {stat.icon}
                  </div>
                  <div style={{
                    fontSize: 32,
                    fontWeight: 800,
                    color: "var(--ink)",
                    letterSpacing: "-1px",
                    marginBottom: 6,
                    fontFamily: "var(--font-sans)",
                  }}>
                    {stat.value}
                  </div>
                  <div style={{
                    fontSize: 14,
                    color: "var(--muted)",
                    fontWeight: 600,
                    letterSpacing: "0.5px",
                    textTransform: "uppercase",
                  }}>
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Trust indicators */}
        <div style={{
          marginTop: 32,
          textAlign: "center",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 24,
          flexWrap: "wrap",
          color: "var(--muted)",
          fontSize: 13,
          fontWeight: 500,
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#4CAF50" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="20 6 9 17 4 12"/>
            </svg>
            No credit card required
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#4CAF50" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="20 6 9 17 4 12"/>
            </svg>
            7-day free trial
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#4CAF50" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="20 6 9 17 4 12"/>
            </svg>
            Cancel anytime
          </div>
        </div>
      </div>

      {/* Responsive styles */}
      <style>{`
        @media (max-width: 768px) {
          section > div > div {
            padding: 48px 32px !important;
            border-radius: 24px !important;
          }
        }
      `}</style>
    </section>
  );
}
