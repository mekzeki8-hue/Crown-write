"use client";

export default function CTA() {
  return (
    <section style={{ background:"var(--bg-2)", padding:"64px 24px 88px" }}>
      <div style={{ maxWidth:800, margin:"0 auto", position:"relative" }}>

        {/* Soft stacked layers */}
        <div style={{
          position:"absolute", inset:0, borderRadius:"var(--r-2xl)",
          background:"var(--brand-xpale)", border:"1px solid var(--border)",
          transform:"rotate(1.5deg) translateY(6px)", zIndex:0,
        }} />
        <div aria-hidden style={{
          position:"absolute", inset:0, borderRadius:"var(--r-2xl)",
          background:"var(--a100)", border:"1px solid var(--border)",
          transform:"rotate(-.8deg) translateY(3px)", zIndex:1,
        }} />

        {/* Main card */}
        <div style={{
          position:"relative", zIndex:2,
          borderRadius:"var(--r-2xl)", overflow:"hidden",
          boxShadow:"var(--sh-float)",
        }}>
          {/* Soft warm bg */}
          <div style={{
            position:"absolute", inset:0,
            background:"var(--g-cta)",
          }} />
          {/* Whisper light bands */}
          <div aria-hidden style={{ position:"absolute", inset:0, overflow:"hidden", pointerEvents:"none" }}>
            <div style={{
              position:"absolute", left:"-5%", right:"-5%",
              height:"30%", top:"10%",
              background:"linear-gradient(90deg, transparent 10%, rgba(255,255,255,.2) 35%, rgba(255,255,255,.28) 55%, rgba(255,255,255,.16) 80%, transparent 90%)",
              filter:"blur(20px)", borderRadius:"50%",
              animation:"bandDrift 10s ease-in-out infinite",
            }} />
            <div style={{
              position:"absolute", left:"-5%", right:"-5%",
              height:"20%", top:"55%",
              background:"linear-gradient(90deg, transparent 10%, rgba(255,255,255,.14) 35%, rgba(255,255,255,.2) 55%, rgba(255,255,255,.1) 80%, transparent 90%)",
              filter:"blur(24px)", borderRadius:"50%",
              animation:"bandDrift 14s ease-in-out infinite", animationDelay:"-6s",
            }} />
          </div>

          <div style={{ position:"relative", zIndex:1, padding:"56px 40px", textAlign:"center" }}>
            <div style={{
              display:"inline-flex", alignItems:"center", gap:6,
              padding:"4px 13px", borderRadius:99,
              background:"rgba(255,255,255,.22)", border:"1px solid rgba(255,255,255,.32)",
              fontSize:11, fontWeight:500, letterSpacing:"0.09em",
              color:"rgba(255,255,255,.9)", textTransform:"uppercase",
              marginBottom:22,
            }}>
              Free to start — no credit card
            </div>

            <h2 style={{
              fontFamily:"var(--font-sans)", fontSize:"clamp(26px,4vw,48px)",
              fontWeight:600, letterSpacing:"-2px", lineHeight:1.1,
              marginBottom:16, color:"white",
            }}>
              Make your writing
              <br />
              sound like{" "}
              <span style={{ fontFamily:"var(--font-serif)", fontStyle:"italic", fontWeight:500 }}>
                you.
              </span>
            </h2>

            <p style={{
              maxWidth:460, margin:"0 auto 32px",
              fontSize:15, lineHeight:1.8,
              color:"rgba(255,255,255,.7)", fontWeight:400,
            }}>
              Join 50,000+ writers, academics, and professionals who trust CrownWrite to make their content sound genuinely human.
            </p>

            <div style={{ display:"flex", gap:10, justifyContent:"center", flexWrap:"wrap" }}>
              <a href="#workspace" style={{
                display:"inline-flex", alignItems:"center", gap:7,
                padding:"12px 28px", borderRadius:99, fontSize:14, fontWeight:500,
                background:"white", color:"var(--brand-deeper)",
                boxShadow:"0 6px 24px rgba(0,0,0,.14)", transition:"all .22s",
              }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform="translateY(-1px)"; (e.currentTarget as HTMLElement).style.boxShadow="0 10px 32px rgba(0,0,0,.18)"; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform="none"; (e.currentTarget as HTMLElement).style.boxShadow="0 6px 24px rgba(0,0,0,.14)"; }}>
                Start Rewriting Free
              </a>
              <a href="#pricing" style={{
                display:"inline-flex", alignItems:"center", gap:7,
                padding:"12px 28px", borderRadius:99, fontSize:14, fontWeight:500,
                background:"rgba(255,255,255,.14)", border:"1px solid rgba(255,255,255,.35)",
                color:"white", transition:"all .22s",
              }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background="rgba(255,255,255,.22)"; (e.currentTarget as HTMLElement).style.transform="translateY(-1px)"; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background="rgba(255,255,255,.14)"; (e.currentTarget as HTMLElement).style.transform="none"; }}>
                View Pricing
              </a>
            </div>

            {/* Soft stats */}
            <div style={{ display:"flex", gap:32, justifyContent:"center", marginTop:36, flexWrap:"wrap" }}>
              {[{v:"50K+",l:"Active Users"},{v:"99.9%",l:"Success Rate"},{v:"< 2s",l:"Processing"}].map(s => (
                <div key={s.l} style={{ textAlign:"center" }}>
                  <div style={{
                    fontSize:22, fontWeight:500, color:"white",
                    letterSpacing:"-.5px", fontFamily:"var(--font-serif)",
                    opacity:.9,
                  }}>{s.v}</div>
                  <div style={{ fontSize:11, color:"rgba(255,255,255,.55)", marginTop:2, fontWeight:400 }}>{s.l}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
