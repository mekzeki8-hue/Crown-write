"use client";
import { useState, useEffect } from "react";
import Logo from "./Logo";
import ThemeToggle from "./ThemeToggle";
import { UserButton, useUser } from "@clerk/nextjs";

const NAV = [
  { l:"About",    h:"/about"     },
  { l:"Pricing",  h:"#pricing"   },
  { l:"Blog",     h:"/blog"      },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open,     setOpen]     = useState(false);
  const [banner,   setBanner]   = useState(true);
  const { isSignedIn, user } = useUser();
  
  // Countdown timer state
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  // Countdown timer - auto-rotating every 3 days
  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date().getTime();
      // Create end time: 3 days from now (auto-resets)
      const endTime = now + (3 * 24 * 60 * 60 * 1000);
      const distance = endTime - now;

      if (distance > 0) {
        return {
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((distance % (1000 * 60)) / 1000),
        };
      }
      // Auto-reset when reaches zero
      return { days: 2, hours: 23, minutes: 59, seconds: 59 };
    };

    // Initial calculation
    setTimeLeft(calculateTimeLeft());

    // Update every second
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleSignOut = async () => {
    await signOut({ callbackUrl: '/' });
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
          {/* Clean Badge with Countdown */}
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

          {/* Celebration Message */}
          <span style={{ 
            fontSize:13.5, 
            color:"rgba(255, 255, 255, 0.9)", 
            fontWeight:500,
            letterSpacing:"0.2px",
          }}>
            Celebrating 50,000+ users — Save 50% on annual plans
          </span>

          {/* Countdown Timer */}
          <div style={{
            fontSize:12,
            fontWeight:600,
            color:"rgba(192, 154, 114, 1)",
            letterSpacing:"0.5px",
            fontVariantNumeric:"tabular-nums",
          }}>
            Ends in: {timeLeft.days}d {String(timeLeft.hours).padStart(2, '0')}h {String(timeLeft.minutes).padStart(2, '0')}m {String(timeLeft.seconds).padStart(2, '0')}s
          </div>

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
            {isSignedIn ? (
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <UserButton afterSignOutUrl="/" />
              </div>
            ) : (
              <a href="/sign-in" style={{
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
              {isSignedIn ? (
                <>
                  <div style={{
                    padding: "12px",
                    background: "var(--bg-2)",
                    borderRadius: 12,
                    border: "1px solid var(--border)",
                    display: "flex",
                    alignItems: "center",
                    gap: 12,
                  }}>
                    <UserButton afterSignOutUrl="/" />
                    <div>
                      <div style={{
                        fontSize: 14,
                        fontWeight: 600,
                        color: "var(--ink)",
                      }}>
                        {user?.firstName || user?.emailAddresses[0].emailAddress.split('@')[0]}
                      </div>
                      <div style={{
                        fontSize: 12,
                        color: "var(--muted)",
                      }}>
                        {user?.emailAddresses[0].emailAddress}
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                <a href="/sign-in" onClick={() => setOpen(false)} className="btn btn-primary"
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
