"use client";
import { useState, useEffect } from "react";
import Logo from "./Logo";
import ThemeToggle from "./ThemeToggle";
import { createClient } from "@/lib/supabase/client";
import { User } from "@supabase/supabase-js";

const NAV = [
  { l:"About",    h:"/about"     },
  { l:"Pricing",  h:"#pricing"   },
  { l:"Blog",     h:"#"          },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open,     setOpen]     = useState(false);
  const [banner,   setBanner]   = useState(true);
  const [user,     setUser]     = useState<User | null>(null);
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  useEffect(() => {
    const supabase = createClient();
    
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleSignOut = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    window.location.href = '/';
  };

  const bannerH = 40;

  return (
    <div style={{ position:"fixed", inset:"0 0 auto 0", zIndex:200 }}>

      {/* ── Professional Clean Discount Banner ── */}
      <div style={{
        height: banner ? bannerH : 0, overflow:"hidden",
        transition:"height .3s ease",
        background:"linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%)",
        borderBottom:"1px solid rgba(192, 154, 114, 0.2)",
        display:"flex", alignItems:"center", justifyContent:"center",
        gap:20,
        position:"relative", 
        padding: banner ? "0 80px" : 0,
        boxShadow: "0 2px 12px rgba(0, 0, 0, 0.15)",
      }}>
        {/* Subtle gradient overlay */}
        <div aria-hidden style={{
          position:"absolute",
          inset:0,
          background:"radial-gradient(ellipse at center, rgba(192, 154, 114, 0.06) 0%, transparent 70%)",
          pointerEvents:"none",
        }} />

        {/* Content - Clean & Professional */}
        <div style={{ 
          position:"relative", 
          zIndex:1,
          display:"flex", 
          alignItems:"center", 
          gap:20,
          flexWrap:"wrap",
          justifyContent:"center",
          width: "100%",
          maxWidth: 1400,
        }}>
          {/* Clean Badge */}
          <div style={{
            display:"inline-flex",
            alignItems:"center",
            gap:8,
            padding:"4px 14px",
            borderRadius:6,
            background:"rgba(192, 154, 114, 0.15)",
            border:"1px solid rgba(192, 154, 114, 0.3)",
            fontSize:11,
            fontWeight:700,
            letterSpacing:"0.8px",
            textTransform:"uppercase",
            color:"#C09A72",
          }}>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
            </svg>
            50% Off
          </div>

          {/* Clean Message */}
          <span style={{ 
            fontSize:13.5, 
            color:"rgba(255, 255, 255, 0.9)", 
            fontWeight:500,
            letterSpacing:"0.2px",
          }}>
            Limited time offer — Save 50% on annual plans
          </span>

          {/* Professional CTA Button */}
          <a href="#pricing" style={{
            display:"inline-flex",
            alignItems:"center",
            gap:6,
            fontSize:12,
            fontWeight:600,
            padding:"7px 18px",
            borderRadius:6,
            background:"rgba(255, 255, 255, 0.95)",
            color:"#1a1a1a",
            textDecoration:"none",
            transition:"all .25s ease",
            letterSpacing:"0.3px",
            border:"none",
            boxShadow:"0 1px 3px rgba(0, 0, 0, 0.12)",
          }}
          onMouseEnter={e => {
            e.currentTarget.style.background = "#FFFFFF";
            e.currentTarget.style.transform = "translateY(-1px)";
            e.currentTarget.style.boxShadow = "0 3px 8px rgba(0, 0, 0, 0.18)";
          }}
          onMouseLeave={e => {
            e.currentTarget.style.background = "rgba(255, 255, 255, 0.95)";
            e.currentTarget.style.transform = "translateY(0)";
            e.currentTarget.style.boxShadow = "0 1px 3px rgba(0, 0, 0, 0.12)";
          }}>
            View Plans
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </a>
        </div>

        {/* Minimalist close button */}
        <button onClick={() => setBanner(false)} aria-label="Close" style={{
          position:"absolute", 
          right:16,
          background:"transparent", 
          border:"1px solid rgba(255, 255, 255, 0.15)", 
          borderRadius: 4,
          cursor:"pointer",
          color:"rgba(255, 255, 255, 0.6)", 
          fontSize:16, 
          lineHeight:1, 
          padding: "4px 7px",
          transition:"all .2s ease",
          fontWeight: 300,
        }}
        onMouseEnter={e => {
          e.currentTarget.style.background = "rgba(255, 255, 255, 0.1)";
          e.currentTarget.style.color = "rgba(255, 255, 255, 0.9)";
          e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.25)";
        }}
        onMouseLeave={e => {
          e.currentTarget.style.background = "transparent";
          e.currentTarget.style.color = "rgba(255, 255, 255, 0.6)";
          e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.15)";
        }}
        >×</button>
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

            {/* User Profile or Get Started Button */}
            {user ? (
              <div style={{ position: "relative" }}>
                <button
                  onClick={() => setShowProfileMenu(!showProfileMenu)}
                  style={{
                    padding: "10px 18px",
                    borderRadius: 999,
                    fontSize: 14,
                    fontWeight: 500,
                    background: "var(--surface)",
                    color: "var(--ink)",
                    border: "1px solid var(--border)",
                    boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
                    transition: "all .25s cubic-bezier(0.4, 0, 0.2, 1)",
                    display: "flex",
                    alignItems: "center",
                    gap: 10,
                    textDecoration: "none",
                    flexShrink: 0,
                    cursor: "pointer",
                  }}
                  onMouseEnter={e => {
                    const el = e.currentTarget as HTMLElement;
                    el.style.boxShadow = "0 4px 12px rgba(0,0,0,0.08)";
                    el.style.borderColor = "var(--brand)";
                  }}
                  onMouseLeave={e => {
                    const el = e.currentTarget as HTMLElement;
                    el.style.boxShadow = "0 2px 8px rgba(0,0,0,0.04)";
                    el.style.borderColor = "var(--border)";
                  }}
                >
                  <div style={{
                    width: 28,
                    height: 28,
                    borderRadius: "50%",
                    background: "var(--g-brand)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "white",
                    fontSize: 12,
                    fontWeight: 600,
                  }}>
                    {user.email?.charAt(0).toUpperCase()}
                  </div>
                  <div style={{ textAlign: "left", maxWidth: 150 }}>
                    <div style={{
                      fontSize: 13,
                      fontWeight: 600,
                      color: "var(--ink)",
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}>
                      {user.user_metadata?.full_name || user.email?.split('@')[0]}
                    </div>
                    <div style={{
                      fontSize: 11,
                      color: "var(--muted)",
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}>
                      {user.email}
                    </div>
                  </div>
                  <svg
                    width="12"
                    height="12"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    style={{
                      transition: "transform .2s",
                      transform: showProfileMenu ? "rotate(180deg)" : "rotate(0deg)",
                    }}
                  >
                    <path d="M6 9l6 6 6-6"/>
                  </svg>
                </button>

                {/* Profile Dropdown Menu */}
                {showProfileMenu && (
                  <>
                    <div
                      onClick={() => setShowProfileMenu(false)}
                      style={{
                        position: "fixed",
                        inset: 0,
                        zIndex: 199,
                      }}
                    />
                    <div style={{
                      position: "absolute",
                      top: "calc(100% + 8px)",
                      right: 0,
                      minWidth: 220,
                      background: "var(--surface)",
                      border: "1px solid var(--border)",
                      borderRadius: 12,
                      boxShadow: "0 8px 24px rgba(0,0,0,0.12)",
                      padding: "8px",
                      zIndex: 200,
                      backdropFilter: "blur(20px)",
                      WebkitBackdropFilter: "blur(20px)",
                    }}>
                      <a
                        href="/dashboard"
                        onClick={() => setShowProfileMenu(false)}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: 10,
                          padding: "10px 12px",
                          borderRadius: 8,
                          fontSize: 14,
                          fontWeight: 500,
                          color: "var(--ink)",
                          textDecoration: "none",
                          transition: "background .15s",
                        }}
                        onMouseEnter={e => {
                          e.currentTarget.style.background = "var(--bg-2)";
                        }}
                        onMouseLeave={e => {
                          e.currentTarget.style.background = "transparent";
                        }}
                      >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
                          <line x1="9" y1="3" x2="9" y2="21"/>
                        </svg>
                        Dashboard
                      </a>
                      <div style={{
                        height: 1,
                        background: "var(--border)",
                        margin: "4px 0",
                      }} />
                      <button
                        onClick={handleSignOut}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: 10,
                          padding: "10px 12px",
                          borderRadius: 8,
                          fontSize: 14,
                          fontWeight: 500,
                          color: "#e53e3e",
                          textDecoration: "none",
                          transition: "background .15s",
                          width: "100%",
                          background: "transparent",
                          border: "none",
                          cursor: "pointer",
                          textAlign: "left",
                        }}
                        onMouseEnter={e => {
                          e.currentTarget.style.background = "rgba(229, 62, 62, 0.08)";
                        }}
                        onMouseLeave={e => {
                          e.currentTarget.style.background = "transparent";
                        }}
                      >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
                          <polyline points="16 17 21 12 16 7"/>
                          <line x1="21" y1="12" x2="9" y2="12"/>
                        </svg>
                        Sign Out
                      </button>
                    </div>
                  </>
                )}
              </div>
            ) : (
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
            )}

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
                textDecoration: "none",
              }}>{l.l}</a>
            ))}
            <div style={{ display:"flex", flexDirection: "column", gap:10, marginTop:14 }}>
              {user ? (
                <>
                  <div style={{
                    padding: "12px",
                    background: "var(--bg-2)",
                    borderRadius: 12,
                    border: "1px solid var(--border)",
                  }}>
                    <div style={{
                      fontSize: 14,
                      fontWeight: 600,
                      color: "var(--ink)",
                      marginBottom: 4,
                    }}>
                      {user.user_metadata?.full_name || user.email?.split('@')[0]}
                    </div>
                    <div style={{
                      fontSize: 12,
                      color: "var(--muted)",
                    }}>
                      {user.email}
                    </div>
                  </div>
                  <a href="/dashboard" onClick={() => setOpen(false)} className="btn btn-primary"
                    style={{ flex:1, padding:"12px", fontSize:14, borderRadius:99, textAlign:"center", textDecoration: "none" }}>
                    Dashboard →
                  </a>
                  <button onClick={() => { handleSignOut(); setOpen(false); }}
                    style={{
                      padding:"12px",
                      fontSize:14,
                      borderRadius:99,
                      textAlign:"center",
                      background: "transparent",
                      border: "1px solid #e53e3e",
                      color: "#e53e3e",
                      fontWeight: 500,
                      cursor: "pointer",
                    }}>
                    Sign Out
                  </button>
                </>
              ) : (
                <a href="/login" onClick={() => setOpen(false)} className="btn btn-primary"
                  style={{ flex:1, padding:"12px", fontSize:14, borderRadius:99, textAlign:"center", textDecoration: "none" }}>
                  Get started →
                </a>
              )}
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
