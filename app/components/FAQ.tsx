"use client";
import { useState } from "react";

const FAQS = [
  { q:"How does CrownWrite work?", a:"It analyzes your text's structure, vocabulary, and phrasing, then rewrites it to match natural human patterns — preserving every idea and argument you intended." },
  { q:"Which AI detectors does it bypass?", a:"Turnitin, GPTZero, Copyleaks, ZeroGPT, Originality.ai, Winston AI and all other major detectors. Models update regularly as detectors evolve." },
  { q:"Will it change the meaning of my content?", a:"No. CrownWrite only changes how your ideas are expressed — never what they mean. Your arguments, facts, and structure stay intact." },
  { q:"Is my content private and secure?", a:"Yes. Text is processed in-memory and discarded immediately. Nothing is stored, logged, or used for model training." },
  { q:"What tones are available?", a:"Auto, Academic, Professional, Friendly, Formal, Casual, and Creative. Each adjusts vocabulary, sentence length, and rhythm accordingly." },
  { q:"Is there a free plan?", a:"Yes — Starter gives you 5,000 words per month completely free. No credit card required." },
  { q:"Can I cancel my subscription?", a:"Anytime, instantly, from your account settings. No waiting periods, no cancellation fees." },
];

export default function FAQ() {
  const [open, setOpen] = useState<number|null>(null);
  return (
    <section id="faq" style={{ background:"var(--bg)", padding:"88px 0 100px" }}>
      <div style={{ maxWidth:680, margin:"0 auto", padding:"0 28px" }}>
        <div style={{ textAlign:"center", marginBottom:48 }}>
          <p className="section-label">FAQ</p>
          <h2 style={{
            fontFamily:"var(--font-sans)", fontSize:"clamp(26px,3.5vw,44px)",
            fontWeight:600, letterSpacing:"-1.8px", lineHeight:1.1, color:"var(--ink)",
          }}>
            Got{" "}
            <span className="grad-text" style={{ fontFamily:"var(--font-serif)", fontStyle:"italic", fontWeight:500 }}>
              questions?
            </span>
          </h2>
        </div>

        <div style={{ display:"flex", flexDirection:"column", gap:6 }}>
          {FAQS.map((f,i) => (
            <div key={i} style={{
              background:"var(--surface)",
              border:`1px solid ${open===i?"var(--border-2)":"var(--border)"}`,
              borderRadius:"var(--r-md)", overflow:"hidden",
              transition:"border-color .2s, box-shadow .2s",
              boxShadow: open===i ? "var(--sh-sm)" : "none",
            }}>
              <button onClick={() => setOpen(open===i?null:i)} style={{
                width:"100%", display:"flex", alignItems:"center",
                justifyContent:"space-between", padding:"16px 18px",
                background:"none", border:"none", cursor:"pointer",
                textAlign:"left", gap:16,
              }}>
                <span style={{
                  fontSize:14, fontWeight:500, lineHeight:1.45,
                  color: open===i ? "var(--brand-dark)" : "var(--ink)",
                  transition:"color .2s",
                }}>{f.q}</span>
                <span style={{
                  flexShrink:0, width:26, height:26, borderRadius:"50%",
                  background: open===i ? "var(--brand)" : "var(--bg-3)",
                  border:`1px solid ${open===i?"var(--brand)":"var(--border)"}`,
                  display:"flex", alignItems:"center", justifyContent:"center",
                  fontSize:16, color: open===i?"white":"var(--subtle)",
                  transform: open===i?"rotate(45deg)":"none",
                  transition:"all .22s ease",
                  opacity: open===i?0.8:0.6,
                }}>+</span>
              </button>
              <div style={{
                maxHeight: open===i?280:0, overflow:"hidden",
                transition:"max-height .3s cubic-bezier(.4,0,.2,1)",
              }}>
                <p style={{
                  padding:"0 18px 16px",
                  fontSize:13.5, lineHeight:1.8,
                  color:"var(--muted)", fontWeight:400,
                }}>{f.a}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
