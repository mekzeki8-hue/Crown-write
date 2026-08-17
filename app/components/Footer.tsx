"use client";
import Logo from "./Logo";

const COLS = [
  { title:"Product", links:[{l:"Rewrite",h:"/#workspace"},{l:"Features",h:"/features"},{l:"Pricing",h:"/#pricing"}] },
  { title:"Company", links:[{l:"About",h:"/about"},{l:"Blog",h:"/blog"},{l:"Contact",h:"/contact"}] },
  { title:"Legal",   links:[{l:"Terms of Service",h:"/terms"},{l:"Privacy Policy",h:"/privacy"},{l:"Responsible Use",h:"/responsible-use"}] },
];

export default function Footer() {
  return (
    <footer style={{
      background:"var(--ink)",
      color:"rgba(200,185,168,.4)",
      padding:"60px 0 32px",
    }}>
      <div style={{ maxWidth:1200, margin:"0 auto", padding:"0 28px" }}>
        <div style={{
          display:"grid", gridTemplateColumns:"2fr 1fr 1fr 1fr",
          gap:48, paddingBottom:48,
          borderBottom:"1px solid rgba(200,185,168,.1)",
        }} className="footer-grid">

          <div>
            <a href="#" style={{ display:"flex", alignItems:"center", gap:9, marginBottom:14 }}>
              <Logo size={26} light />
              <span style={{ fontSize:15, fontWeight:600, letterSpacing:"-.3px", color:"rgba(240,230,216,.7)" }}>
                Crown<span style={{ color:"var(--a400)" }}>Write</span>
              </span>
            </a>
            <p style={{ fontSize:13, lineHeight:1.75, maxWidth:240, fontWeight:400 }}>
              AI-generated text rewritten into natural, human-like prose.
            </p>
            <div style={{
              marginTop:18, display:"inline-flex", alignItems:"center", gap:6,
              padding:"5px 12px", borderRadius:99,
              background:"rgba(94,158,126,.1)", border:"1px solid rgba(94,158,126,.18)",
              fontSize:11, fontWeight:500, color:"rgba(94,158,126,.8)",
            }}>
              <span style={{ width:6, height:6, borderRadius:"50%", background:"rgba(94,158,126,.7)", display:"inline-block" }} />
              All systems operational
            </div>
          </div>

          {COLS.map(col => (
            <div key={col.title}>
              <h4 style={{
                fontSize:10, fontWeight:600, textTransform:"uppercase",
                letterSpacing:"0.12em", color:"rgba(200,185,168,.28)",
                marginBottom:16,
              }}>{col.title}</h4>
              <ul style={{ listStyle:"none", display:"flex", flexDirection:"column", gap:11 }}>
                {col.links.map(lk => (
                  <li key={lk.l}>
                    <a href={lk.h} style={{ fontSize:13, fontWeight:400, color:"rgba(200,185,168,.45)", transition:"color .18s" }}
                    onMouseEnter={e => (e.currentTarget as HTMLElement).style.color="rgba(200,185,168,.75)"}
                    onMouseLeave={e => (e.currentTarget as HTMLElement).style.color="rgba(200,185,168,.45)"}>
                      {lk.l}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div style={{
          paddingTop:24, display:"flex",
          justifyContent:"space-between", alignItems:"center",
          flexWrap:"wrap", gap:12,
        }}>
          <p style={{ fontSize:12, fontWeight:400 }}>© 2026 CrownWrite. All rights reserved.</p>
          <div style={{ display:"flex", gap:12 }}>
            {[
              {label:"Twitter",  d:"M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"},
              {label:"LinkedIn", d:"M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"},
              {label:"GitHub",   d:"M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"},
            ].map(s => (
              <a key={s.label} href="#" aria-label={s.label} style={{
                width:28, height:28, borderRadius:"var(--r-xs)",
                background:"rgba(200,185,168,.07)",
                border:"1px solid rgba(200,185,168,.1)",
                display:"flex", alignItems:"center", justifyContent:"center",
                color:"rgba(200,185,168,.35)", transition:"all .18s",
              }}
              onMouseEnter={e => { const el=e.currentTarget as HTMLElement; el.style.color="rgba(200,185,168,.65)"; el.style.background="rgba(200,185,168,.12)"; el.style.borderColor="rgba(200,185,168,.18)"; }}
              onMouseLeave={e => { const el=e.currentTarget as HTMLElement; el.style.color="rgba(200,185,168,.35)"; el.style.background="rgba(200,185,168,.07)"; el.style.borderColor="rgba(200,185,168,.1)"; }}>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d={s.d}/></svg>
              </a>
            ))}
          </div>
        </div>
      </div>
      <style>{`
        @media(max-width:860px){.footer-grid{grid-template-columns:1fr 1fr !important;}}
        @media(max-width:520px){.footer-grid{grid-template-columns:1fr !important;}}
        /* Footer always looks dark regardless of theme */
        footer { background: #1E1C18 !important; }
        .dark footer { background: #111009 !important; }
      `}</style>
    </footer>
  );
}
