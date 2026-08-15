"use client";
import { useEffect, useState } from "react";

export default function ScrollToTop() {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const fn = () => setVisible(window.scrollY > 500);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);
  return (
    <button
      onClick={() => window.scrollTo({ top:0, behavior:"smooth" })}
      aria-label="Back to top"
      style={{
        position:"fixed", bottom:24, right:24, zIndex:200,
        width:40, height:40, borderRadius:"50%",
        background:"var(--surface)", color:"var(--muted)",
        border:"1px solid var(--border-2)",
        display:"flex", alignItems:"center", justifyContent:"center",
        cursor:"pointer", boxShadow:"var(--sh-md)",
        opacity: visible?1:0,
        transform: visible?"scale(1)":"scale(0.75)",
        transition:"all .3s cubic-bezier(.34,1.56,.64,1)",
        pointerEvents: visible?"auto":"none",
      }}
      onMouseEnter={e => {
        const el = e.currentTarget as HTMLElement;
        el.style.background = "var(--brand)";
        el.style.color = "white";
        el.style.borderColor = "var(--brand)";
        el.style.transform = "scale(1.08)";
      }}
      onMouseLeave={e => {
        const el = e.currentTarget as HTMLElement;
        el.style.background = "var(--surface)";
        el.style.color = "var(--muted)";
        el.style.borderColor = "var(--border-2)";
        el.style.transform = "scale(1)";
      }}
    >
      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
        <polyline points="18 15 12 9 6 15"/>
      </svg>
    </button>
  );
}
