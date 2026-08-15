"use client";

const CARDS = [
  {
    icon:<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><polyline points="9 12 11 14 15 10"/></svg>,
    label:"Undetectable", title:"Passes Every Detector",
    desc:"Turnitin, GPTZero, Copyleaks, ZeroGPT, Originality.ai — consistently bypassed. Models updated weekly.",
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
  return (
    <section id="features" style={{ background:"var(--bg)", padding:"88px 0 100px" }}>
      <div style={{ maxWidth:1200, margin:"0 auto", padding:"0 28px" }}>
        <div style={{ textAlign:"center", marginBottom:52 }}>
          <p className="section-label">Why CrownWrite</p>
          <h2 style={{
            fontFamily:"var(--font-sans)", fontSize:"clamp(26px,3.5vw,44px)",
            fontWeight:600, letterSpacing:"-1.8px", lineHeight:1.1,
            marginBottom:14, color:"var(--ink)",
          }}>
            Less robotic.{" "}
            <span className="grad-text" style={{ fontFamily:"var(--font-serif)", fontStyle:"italic", fontWeight:500 }}>More you.</span>
          </h2>
          <p style={{ fontSize:15, color:"var(--muted)", maxWidth:420, margin:"0 auto", lineHeight:1.75, fontWeight:400 }}>
            Everything you need to turn AI output into writing that feels genuinely human.
          </p>
        </div>

        <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:12 }} className="feat-grid">
          {CARDS.map(c => (
            <div key={c.title} style={{
              gridColumn:`span ${c.span}`,
              background:"var(--surface)", border:"1px solid var(--border)",
              borderRadius:"var(--r-lg)", padding:"26px 28px",
              position:"relative", overflow:"hidden",
              transition:"box-shadow .22s, transform .22s, border-color .22s",
            }}
            onMouseEnter={e => { const el=e.currentTarget as HTMLElement; el.style.boxShadow="var(--sh-md)"; el.style.transform="translateY(-2px)"; el.style.borderColor="var(--border-2)"; }}
            onMouseLeave={e => { const el=e.currentTarget as HTMLElement; el.style.boxShadow="none"; el.style.transform="none"; el.style.borderColor="var(--border)"; }}>

              {/* Whisper blob */}
              <div aria-hidden style={{
                position:"absolute", top:-30, right:-30, width:130, height:130, borderRadius:"50%",
                background:"radial-gradient(circle, var(--a100), transparent 70%)",
                pointerEvents:"none",
              }} />

              {/* Icon */}
              <div style={{
                width:40, height:40, borderRadius:"var(--r-sm)",
                background:"var(--brand-xpale)", border:"1px solid var(--a300)",
                display:"flex", alignItems:"center", justifyContent:"center",
                color:"var(--brand)", marginBottom:16, opacity:.9,
              }}>{c.icon}</div>

              <div style={{ fontSize:10, fontWeight:600, letterSpacing:"0.11em", textTransform:"uppercase", color:"var(--brand)", marginBottom:6, opacity:.8 }}>
                {c.label}
              </div>
              <h3 style={{
                fontFamily:"var(--font-sans)", fontSize:17, fontWeight:600,
                marginBottom:7, color:"var(--ink)", letterSpacing:"-.3px",
              }}>{c.title}</h3>
              <p style={{ fontSize:13.5, lineHeight:1.75, color:"var(--muted)", fontWeight:400 }}>{c.desc}</p>

              {c.badge && (
                <div style={{
                  marginTop:16, display:"inline-flex", alignItems:"center", gap:5,
                  padding:"4px 11px", borderRadius:99,
                  background:"var(--brand-xpale)", border:"1px solid var(--a300)",
                  fontSize:11, fontWeight:500, color:"var(--brand-dark)", opacity:.85,
                }}>
                  <span style={{ width:4, height:4, borderRadius:"50%", background:"var(--brand)", display:"inline-block" }} />
                  {c.badge}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
      <style>{`
        @media(max-width:860px){.feat-grid{grid-template-columns:1fr 1fr !important;}.feat-grid>div{grid-column:span 1 !important;}}
        @media(max-width:540px){.feat-grid{grid-template-columns:1fr !important;}}
      `}</style>
    </section>
  );
}
