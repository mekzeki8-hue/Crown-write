"use client";
import { useState, useEffect } from "react";
import Logo from "./Logo";
import ThemeToggle from "./ThemeToggle";

const NAV = [
  { l:"About",    h:"#"          },
  { l:"Pricing",  h:"#pricing"   },
  { l:"Blog",     h:"#"          },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open,     setOpen]     = useState(false);
  const [banner,   setBanner]   = useState(true);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const bannerH = 40;

  return (
    <div style={{ position:"fixed", inset:"0 0 auto 0", zIndex:200 }}>

      {/* ── Soft announcement bar ── */}
      <div style={{
        height: banner ? bannerH : 0, overflow:"hidden",
        transition:"height .3s ease",
        background:"var(--bg-3)",
        borderBottom:"1px solid var(--border)",
        display:"flex", alignItems:"center", justifyContent:"center",
        gap:10, position:"relative", padding: banner ? "0 56px" : 0,
      }}>
        <span style={{
          fontSize:11, fontWeight:600, padding:"2px 8px", borderRadius:99,
          background:"var(--brand)", color:"white",
          letterSpacing:"0.07em", opacity:.9,
        }}>NEW</span>
        <span style={{ fontSize:13, color:"var(--muted)", fontWeight:400 }}>
          CrownWrite V4 is here — our most refined humanizer yet.
        </span>
        <a href="#workspace" style={{
          fontSize:13, color:"var(--brand-dark)", fontWeight:500,
          borderBottom:"1px solid var(--a400)",
          paddingBottom:1, transition:"opacity .18s",
        }}>Try it now →</a>
        <button onClick={() => setBanner(false)} aria-label="Close" style={{
          position:"absolute", right:14,
          background:"none", border:"none", cursor:"pointer",
          color:"var(--subtle)", fontSize:16, lineHeight:1, padding:4,
        }}>×</button>
      </div>

      {/* ── Modern Pill-Shaped Navbar ── */}
      <header style={{
        padding: "16px 0",
        background: "transparent",
        transition:"all .3s cubic-bezier(0.4, 0, 0.2, 1)",
      }}>
        <div style={{
          maxWidth: 1200,
          margin: "0 auto",
          padding: "0 24px",
          display: "flex",
          justifyContent: "center",
        }}>

          {/* Single Pill Container */}
          <div style={{
            display: "flex",
            alignItems: "center",
            gap: 32,
            padding: "12px 24px",
            background: "rgba(255, 255, 255, 0.95)",
            border: "1px solid rgba(160, 130, 95, 0.12)",
            borderRadius: 999,
            boxShadow: scrolled 
              ? "0 8px 32px rgba(60, 40, 20, 0.08)" 
              : "0 4px 16px rgba(60, 40, 20, 0.04)",
            backdropFilter: "blur(16px) saturate(180%)",
            WebkitBackdropFilter: "blur(16px) saturate(180%)",
            transition: "all .3s cubic-bezier(0.4, 0, 0.2, 1)",
            minHeight: 56,
          }}>

            {/* Logo */}
            <a href="/" style={{ 
              display: "flex",
              alignItems: "center",
              gap: 10,
              flexShrink: 0,
              textDecoration: "none",
            }}>
              <Logo size={32} />
              <span style={{
                fontSize: 17,
                fontWeight: 600,
                letterSpacing: "-0.5px",
                color: "var(--ink)",
                fontFamily: "var(--font-sans)",
              }}>
                Crown<span style={{ color: "var(--brand)" }}>Write</span>
              </span>
            </a>

            {/* Desktop Navigation Links */}
            <nav style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
            }} className="hide-md">
              {NAV.map(l => (
                <a key={l.l} href={l.h} style={{
                  padding: "8px 18px",
                  borderRadius: 999,
                  fontSize: 15,
                  fontWeight: 500,
                  color: "var(--muted)",
                  transition: "all .2s ease",
                  letterSpacing: "-0.01em",
                  textDecoration: "none",
                }}
                onMouseEnter={e => { 
                  const el = e.currentTarget as HTMLElement; 
                  el.style.color = "var(--ink)"; 
                  el.style.background = "rgba(192, 154, 114, 0.08)"; 
                }}
                onMouseLeave={e => { 
                  const el = e.currentTarget as HTMLElement; 
                  el.style.color = "var(--muted)"; 
                  el.style.background = "transparent"; 
                }}>
                  {l.l}
                </a>
              ))}
            </nav>

            {/* Theme Toggle */}
            <div style={{ 
              flexShrink: 0,
              display: "flex",
              alignItems: "center",
            }}>
              <ThemeToggle />
            </div>

            {/* Get Started Button */}
            <a href="/login" style={{
              padding: "10px 24px",
              borderRadius: 999,
              fontSize: 14,
              fontWeight: 500,
              background: "var(--g-brand)",
              color: "white",
              boxShadow: "0 4px 12px rgba(168, 125, 84, 0.25)",
              transition: "all .25s cubic-bezier(0.4, 0, 0.2, 1)",
              border: "none",
              display: "flex",
              alignItems: "center",
              gap: 7,
              textDecoration: "none",
              flexShrink: 0,
            }}
            onMouseEnter={e => { 
              const el = e.currentTarget as HTMLElement;
              el.style.transform = "translateY(-1px)";
              el.style.boxShadow = "0 6px 20px rgba(168, 125, 84, 0.35)";
            }}
            onMouseLeave={e => { 
              const el = e.currentTarget as HTMLElement;
              el.style.transform = "translateY(0)";
              el.style.boxShadow = "0 4px 12px rgba(168, 125, 84, 0.25)";
            }}>
              Get started
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </a>

            {/* Hamburger Menu (Mobile) */}
            <button onClick={() => setOpen(v=>!v)} className="show-md" aria-label="Menu" style={{
              width: 40,
              height: 40,
              background: "transparent",
              border: "1px solid var(--border)",
              borderRadius: 999,
              cursor: "pointer",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: 5,
              flexShrink: 0,
            }}>
              {[0,1,2].map(i => (
                <span key={i} style={{
                  display: "block",
                  width: 16,
                  height: 2,
                  background: "var(--muted)",
                  borderRadius: 2,
                  transition: "all .22s",
                  transform: open && i===0 ? "rotate(45deg) translate(5px, 5px)"
                           : open && i===2 ? "rotate(-45deg) translate(5px, -5px)" : "none",
                  opacity: open && i===1 ? 0 : 1,
                }} />
              ))}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile menu */}
      {open && (
        <>
          <div onClick={() => setOpen(false)} style={{
            position:"fixed", inset:0,
            background:"rgba(30,20,10,.25)", backdropFilter:"blur(4px)", zIndex:-1,
          }} />
          <div style={{
            background:"var(--surface)", borderBottom:"1px solid var(--border)",
            boxShadow:"var(--sh-lg)", padding:"4px 20px 20px",
            backdropFilter:"blur(20px) saturate(180%)",
            WebkitBackdropFilter:"blur(20px) saturate(180%)",
          }}>
            {NAV.map(l => (
              <a key={l.l} href={l.h} onClick={() => setOpen(false)} style={{
                display:"block", padding:"12px 4px", fontSize:15, fontWeight:500,
                color:"var(--muted)", borderBottom:"1px solid var(--border)",
              }}>{l.l}</a>
            ))}
            <div style={{ display:"flex", gap:10, marginTop:14 }}>
              <a href="/login" onClick={() => setOpen(false)} className="btn btn-primary"
                style={{ flex:1, padding:"12px", fontSize:14, borderRadius:99, textAlign:"center" }}>
                Get started →
              </a>
            </div>
          </div>
        </>
      )}

      {/* Dark mode pill override */}
      <style>{`
        .dark header > div > div {
          background: rgba(33, 29, 22, 0.95) !important;
          border-color: rgba(196, 160, 112, 0.15) !important;
          box-shadow: ${scrolled 
            ? '0 8px 32px rgba(0, 0, 0, 0.2)' 
            : '0 4px 16px rgba(0, 0, 0, 0.15)'} !important;
        }
      `}</style>
    </div>
  );
}
