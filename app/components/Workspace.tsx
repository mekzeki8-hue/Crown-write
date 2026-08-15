"use client";
import { useState, useRef, useEffect } from "react";
import Logo from "./Logo";
import { createClient } from '@/lib/supabase/client';
import CreditDisplay from './CreditDisplay';

type ToneId = "auto"|"academic"|"professional"|"friendly"|"formal"|"casual"|"creative";

const TONES: { id: ToneId; label: string; icon: React.ReactNode }[] = [
  { id:"auto",         label:"Auto",
    icon:<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><circle cx="12" cy="12" r="3"/><path d="M12 3v2M12 19v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M3 12h2M19 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/></svg> },
  { id:"academic",     label:"Academic",
    icon:<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/></svg> },
  { id:"professional", label:"Professional",
    icon:<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg> },
  { id:"friendly",     label:"Friendly",
    icon:<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><circle cx="12" cy="12" r="10"/><path d="M8 13s1.5 2 4 2 4-2 4-2"/><line x1="9" y1="9" x2="9.01" y2="9"/><line x1="15" y1="9" x2="15.01" y2="9"/></svg> },
  { id:"formal",       label:"Formal",
    icon:<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/></svg> },
  { id:"casual",       label:"Casual",
    icon:<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><path d="M18 8h1a4 4 0 0 1 0 8h-1"/><path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"/><line x1="6" y1="1" x2="6" y2="4"/><line x1="10" y1="1" x2="10" y2="4"/><line x1="14" y1="1" x2="14" y2="4"/></svg> },
  { id:"creative",     label:"Creative",
    icon:<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg> },
];

const BRAND_COLOR = "#C09A72";
const BRAND_LIGHT = "#D4B896";
const BRAND_DARK = "#A87D54";

/* ── API Call to Humanize Endpoint ── */
async function callHumanizeAPI(
  text: string, 
  tone: ToneId, 
  ultraMode: boolean
): Promise<string> {
  const response = await fetch('/api/humanize', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      text,
      tone: tone === 'auto' ? 'standard' : tone,
      mode: ultraMode ? 'ultra' : 'standard',
      provider: 'auto',
      qualityMode: 'high',
    }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Humanization failed');
  }

  const data = await response.json();
  return data.humanizedText;
}

const wc = (t: string) => t.trim() ? t.trim().split(/\s+/).length : 0;

export default function Workspace() {
  const [tone,      setTone]      = useState<ToneId>("auto");
  const [input,     setInput]     = useState("");
  const [output,    setOutput]    = useState("");
  const [loading,   setLoading]   = useState(false);
  const [copied,    setCopied]    = useState(false);
  const [toast,     setToast]     = useState("");
  const [ultraMode, setUltraMode] = useState(false);
  const [error,     setError]     = useState("");
  const [credits,   setCredits]   = useState(0);
  const [user,      setUser]      = useState<any>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  const supabase = createClient();

  // Check if user is logged in and get credits
  useEffect(() => {
    const checkUser = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        setUser(user);

        if (user) {
          const { data: profile } = await supabase
            .from('profiles')
            .select('credits')
            .eq('id', user.id)
            .single();
          
          if (profile) {
            setCredits(profile.credits);
          }
        }
      } catch (error) {
        console.error('Error checking user:', error);
      }
    };

    checkUser();

    // Listen for credit updates
    const handleCreditUpdate = () => {
      checkUser();
    };

    window.addEventListener('creditsUpdated' as any, handleCreditUpdate);

    return () => {
      window.removeEventListener('creditsUpdated' as any, handleCreditUpdate);
    };
  }, []);

  const showToast = (msg: string) => { setToast(msg); setTimeout(() => setToast(""), 2400); };

  const run = async () => {
    if (!input.trim() || loading) return;
    
    // Check if user is logged in
    if (!user) {
      setError("Please sign in to use the humanizer");
      showToast("Sign in required");
      return;
    }

    setLoading(true); 
    setOutput("");
    setError("");
    
    try {
      const result = await callHumanizeAPI(input, tone, ultraMode);
      setOutput(result);
      showToast("Humanized successfully");
      
      // Dispatch event to update credits display
      window.dispatchEvent(new CustomEvent('creditsUpdated', { 
        detail: { refresh: true } 
      }));
    } catch (err: any) {
      const errorMsg = err.message || "Humanization failed. Please try again.";
      setError(errorMsg);
      showToast("Error: " + errorMsg);
      console.error('Humanization error:', err);
    } finally {
      setLoading(false);
    }
  };

  const copy = async () => {
    if (!output) return;
    await navigator.clipboard.writeText(output);
    setCopied(true); showToast("Copied to clipboard");
    setTimeout(() => setCopied(false), 2000);
  };

  const clear = () => { 
    setInput(""); 
    setOutput(""); 
    setError("");
    showToast("Cleared"); 
  };

  const download = () => {
    if (!output) return;
    const a = Object.assign(document.createElement("a"), {
      href: URL.createObjectURL(new Blob([output], { type: "text/plain" })),
      download: "crownwrite-output.txt",
    });
    a.click(); showToast("Downloaded");
  };

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0]; if (!f) return;
    const r = new FileReader();
    r.onload = ev => { setInput(ev.target?.result as string ?? ""); showToast(`Imported "${f.name}"`); };
    r.readAsText(f); e.target.value = "";
  };

  const toneLabel = TONES.find(t => t.id === tone)?.label ?? "Auto";
  const inputWords = wc(input);
  const outputWords = wc(output);

  return (
    <section id="workspace" style={{
      background: "var(--bg-2)",
      padding: "60px 0 80px",
      position: "relative",
      minHeight: 'calc(100vh - 200px)',
    }}>

      {/* Toast */}
      {toast && (
        <div style={{
          position: "fixed", bottom: 80, left: "50%",
          transform: "translateX(-50%)",
          background: "var(--ink)", color: "var(--surface)",
          padding: "10px 22px", borderRadius: "var(--r-md)",
          fontSize: 13, fontWeight: 400, zIndex: 600,
          boxShadow: "var(--sh-lg)", whiteSpace: "nowrap",
          animation: "popIn .26s cubic-bezier(.34,1.56,.64,1) both",
        }}>{toast}</div>
      )}

      <div style={{ maxWidth: 1400, margin: "0 auto", padding: "0 32px" }}>

        {/* Credit Display - At top of workspace */}
        {user && (
          <div style={{
            marginBottom: 24,
            display: 'flex',
            justifyContent: 'flex-end',
            alignItems: 'center',
            gap: 12,
          }}>
            <span style={{
              fontSize: 13,
              color: 'var(--muted)',
              fontWeight: 500,
            }}>
              Available Credits:
            </span>
            <CreditDisplay initialCredits={credits} />
          </div>
        )}

        {/* ══════════════════════════════════════════════════
            MAIN EDITOR — modern two-column layout
        ══════════════════════════════════════════════════ */}
        <div style={{
          background: "var(--surface)",
          border: "1px solid var(--border)",
          borderRadius: 16,
          boxShadow: "var(--sh-float)",
          overflow: "hidden",
        }}>

          {/* ── Mode selector toolbar ── */}
          <div style={{
            display: "flex", 
            alignItems: "center",
            justifyContent: "space-between",
            padding: "16px 24px",
            borderBottom: "1px solid var(--border)",
            background: "var(--bg-2)",
            flexWrap: "wrap", 
            gap: 12,
          }}>
            {/* Tone pills */}
            <div style={{
              display: "flex", 
              gap: 6, 
              flexWrap: "wrap",
            }}>
              {TONES.map(t => (
                <button
                  key={t.id}
                  onClick={() => setTone(t.id)}
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 6,
                    padding: "8px 16px",
                    borderRadius: 999,
                    fontSize: 13,
                    fontWeight: tone === t.id ? 600 : 500,
                    color: tone === t.id ? "white" : "var(--muted)",
                    background: tone === t.id ? "var(--g-brand)" : "var(--surface)",
                    border: `1px solid ${tone === t.id ? "var(--brand)" : "var(--border)"}`,
                    cursor: "pointer",
                    transition: "all 0.2s",
                    whiteSpace: "nowrap",
                  }}
                  onMouseEnter={(e) => {
                    if (tone !== t.id) {
                      const el = e.currentTarget as HTMLElement;
                      el.style.borderColor = "var(--border-2)";
                      el.style.background = "var(--bg-3)";
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (tone !== t.id) {
                      const el = e.currentTarget as HTMLElement;
                      el.style.borderColor = "var(--border)";
                      el.style.background = "var(--surface)";
                    }
                  }}
                >
                  {t.icon}
                  {t.label}
                </button>
              ))}
            </div>

            {/* Right controls */}
            <div style={{
              display: "flex", 
              alignItems: "center",
              gap: 10,
            }}>
              {/* Version badge */}
              <div style={{
                display: "flex", 
                alignItems: "center", 
                gap: 6,
                padding: "6px 12px", 
                borderRadius: "var(--r-sm)",
                border: "1px solid var(--border)", 
                background: "var(--surface)",
                fontSize: 12, 
                color: "var(--muted)",
              }}>
                <span style={{ fontWeight: 600, color: "var(--brand)" }}>CrownV4</span>
                <span style={{
                  padding: "2px 6px", 
                  borderRadius: 4,
                  fontSize: 9, 
                  fontWeight: 700,
                  background: "var(--brand)", 
                  color: "white",
                  letterSpacing: "0.05em",
                }}>BETA</span>
              </div>

              {/* Ultra Mode toggle */}
              <button 
                onClick={() => setUltraMode(!ultraMode)}
                style={{
                  padding: "6px 14px", 
                  fontSize: 12,
                  display: "flex", 
                  alignItems: "center", 
                  gap: 6,
                  borderRadius: "var(--r-sm)",
                  border: `1px solid ${ultraMode ? "var(--brand)" : "var(--border)"}`,
                  background: ultraMode ? "var(--brand)" : "var(--surface)",
                  color: ultraMode ? "white" : "var(--muted)",
                  cursor: "pointer",
                  fontWeight: ultraMode ? 600 : 500,
                  transition: "all 0.2s",
                }}
                onMouseEnter={(e) => {
                  if (!ultraMode) {
                    const el = e.currentTarget as HTMLElement;
                    el.style.borderColor = "var(--brand)";
                    el.style.color = "var(--brand)";
                  }
                }}
                onMouseLeave={(e) => {
                  if (!ultraMode) {
                    const el = e.currentTarget as HTMLElement;
                    el.style.borderColor = "var(--border)";
                    el.style.color = "var(--muted)";
                  }
                }}>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
                </svg>
                Ultra Mode
              </button>
            </div>
          </div>

          {/* Error Banner */}
          {error && (
            <div style={{
              padding: "14px 24px",
              background: "#FEE2E2",
              borderBottom: "1px solid #FECACA",
              display: "flex",
              alignItems: "center",
              gap: 10,
            }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#DC2626" strokeWidth="2" strokeLinecap="round">
                <circle cx="12" cy="12" r="10"/>
                <line x1="12" y1="8" x2="12" y2="12"/>
                <line x1="12" y1="16" x2="12.01" y2="16"/>
              </svg>
              <span style={{
                fontSize: 13,
                color: "#DC2626",
                fontWeight: 500,
                flex: 1,
              }}>
                {error}
              </span>
              <button
                onClick={() => setError("")}
                style={{
                  padding: "4px 8px",
                  fontSize: 11,
                  color: "#DC2626",
                  background: "transparent",
                  border: "1px solid #FECACA",
                  borderRadius: 4,
                  cursor: "pointer",
                  fontWeight: 500,
                }}
              >
                Dismiss
              </button>
            </div>
          )}

          {/* ── Split panels ── */}
          <div style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            minHeight: 500,
          }} className="editor-panels">

            {/* INPUT PANEL */}
            <div style={{
              display: "flex", 
              flexDirection: "column",
              borderRight: "1px solid var(--border)",
            }}>
              {/* Panel header */}
              <div style={{
                display: "flex", 
                alignItems: "center",
                justifyContent: "space-between",
                padding: "14px 20px",
                borderBottom: "1px solid var(--border)",
                background: "var(--bg-2)",
              }}>
                <span style={{
                  fontSize: 12, 
                  fontWeight: 600, 
                  color: "var(--subtle)",
                  textTransform: "uppercase", 
                  letterSpacing: "0.05em",
                }}>
                  Input Text
                </span>
                <div style={{ 
                  display: "flex", 
                  alignItems: "center", 
                  gap: 8,
                }}>
                  <button
                    onClick={() => fileRef.current?.click()}
                    style={{
                      padding: "4px 10px",
                      borderRadius: "var(--r-xs)",
                      border: "1px solid var(--border)",
                      background: "var(--surface)",
                      fontSize: 11,
                      fontWeight: 500,
                      color: "var(--muted)",
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      gap: 4,
                      transition: "all 0.2s",
                    }}
                    onMouseEnter={(e) => {
                      const el = e.currentTarget as HTMLElement;
                      el.style.borderColor = "var(--border-2)";
                    }}
                    onMouseLeave={(e) => {
                      const el = e.currentTarget as HTMLElement;
                      el.style.borderColor = "var(--border)";
                    }}
                  >
                    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                      <polyline points="17 8 12 3 7 8"/>
                      <line x1="12" y1="3" x2="12" y2="15"/>
                    </svg>
                    Import
                  </button>
                  <input
                    ref={fileRef} 
                    type="file" 
                    accept=".txt,.md,.doc"
                    style={{ display: "none" }} 
                    onChange={handleFile}
                  />
                  <span style={{ fontSize: 11, color: "var(--placeholder)", fontWeight: 400 }}>
                    {inputWords} words · {input.length} chars
                  </span>
                </div>
              </div>

              {/* Textarea */}
              <textarea
                value={input}
                onChange={e => setInput(e.target.value)}
                placeholder="For optimal results, we recommend using at least 250 words."
                spellCheck
                style={{
                  flex: 1, 
                  resize: "none",
                  border: "none", 
                  outline: "none",
                  background: "var(--surface)",
                  padding: "24px",
                  fontFamily: "var(--font-sans)",
                  fontSize: 15,
                  fontWeight: 400,
                  lineHeight: 1.75,
                  color: "var(--ink)",
                  minHeight: 400,
                }}
              />

              {/* Input footer */}
              <div style={{
                display: "flex", 
                alignItems: "center",
                justifyContent: "space-between",
                padding: "14px 20px",
                borderTop: "1px solid var(--border)",
                background: "var(--bg-2)",
              }}>
                <button 
                  onClick={clear} 
                  style={{
                    padding: "8px 18px", 
                    borderRadius: "var(--r-sm)",
                    border: "1px solid var(--border)", 
                    background: "var(--surface)",
                    fontSize: 13, 
                    fontWeight: 500, 
                    color: "var(--muted)",
                    cursor: "pointer", 
                    transition: "all 0.2s",
                  }}
                  onMouseEnter={e => { 
                    const el = e.currentTarget as HTMLElement; 
                    el.style.borderColor = "var(--danger)"; 
                    el.style.color = "var(--danger)"; 
                  }}
                  onMouseLeave={e => { 
                    const el = e.currentTarget as HTMLElement; 
                    el.style.borderColor = "var(--border)"; 
                    el.style.color = "var(--muted)"; 
                  }}
                >
                  Clear
                </button>
                <button
                  onClick={run}
                  disabled={!input.trim() || loading}
                  className="btn-humanize"
                  style={{
                    minWidth: 120, 
                    padding: "10px 24px", 
                    fontSize: 14,
                    fontWeight: 600,
                    opacity: !input.trim() || loading ? 0.4 : 1,
                  }}
                >
                  {loading
                    ? <><span style={{ animation: "spin .8s linear infinite", display: "inline-block" }}>↻</span>&nbsp;Humanizing…</>
                    : "Humanize"
                  }
                </button>
              </div>
            </div>

            {/* OUTPUT PANEL */}
            <div style={{
              display: "flex", 
              flexDirection: "column",
              background: output ? "var(--surface)" : "var(--bg-2)",
              transition: "background 0.3s ease",
            }}>
              {/* Panel header */}
              <div style={{
                display: "flex", 
                alignItems: "center",
                justifyContent: "space-between",
                padding: "14px 20px",
                borderBottom: "1px solid var(--border)",
                background: "var(--bg-2)",
              }}>
                <span style={{
                  fontSize: 12, 
                  fontWeight: 600, 
                  color: output ? "var(--brand)" : "var(--subtle)",
                  textTransform: "uppercase", 
                  letterSpacing: "0.05em",
                  transition: "color 0.3s",
                }}>
                  Humanized Output
                </span>

                {output && (
                  <div style={{ display: "flex", gap: 6 }}>
                    {/* Copy */}
                    <button 
                      onClick={copy} 
                      style={{
                        display: "flex", 
                        alignItems: "center", 
                        gap: 5,
                        padding: "6px 12px", 
                        borderRadius: "var(--r-xs)",
                        border: `1px solid ${copied ? "var(--success)" : "var(--border)"}`,
                        background: copied ? "var(--success-light)" : "var(--surface)",
                        fontSize: 11, 
                        fontWeight: 500,
                        color: copied ? "var(--success)" : "var(--muted)",
                        cursor: "pointer", 
                        transition: "all 0.2s",
                      }}
                      onMouseEnter={(e) => {
                        if (!copied) {
                          const el = e.currentTarget as HTMLElement;
                          el.style.borderColor = "var(--border-2)";
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (!copied) {
                          const el = e.currentTarget as HTMLElement;
                          el.style.borderColor = "var(--border)";
                        }
                      }}
                    >
                      {copied
                        ? <><svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><polyline points="20 6 9 17 4 12"/></svg> Copied</>
                        : <><svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg> Copy</>
                      }
                    </button>
                    {/* Export */}
                    <button 
                      onClick={download} 
                      style={{
                        display: "flex", 
                        alignItems: "center", 
                        gap: 5,
                        padding: "6px 12px", 
                        borderRadius: "var(--r-xs)",
                        border: "1px solid var(--border)", 
                        background: "var(--surface)",
                        fontSize: 11, 
                        fontWeight: 500, 
                        color: "var(--muted)",
                        cursor: "pointer", 
                        transition: "all 0.2s",
                      }}
                      onMouseEnter={e => { 
                        const el = e.currentTarget as HTMLElement; 
                        el.style.borderColor = "var(--border-2)"; 
                      }}
                      onMouseLeave={e => { 
                        const el = e.currentTarget as HTMLElement; 
                        el.style.borderColor = "var(--border)"; 
                      }}
                    >
                      <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                        <polyline points="7 10 12 15 17 10"/>
                        <line x1="12" y1="15" x2="12" y2="3"/>
                      </svg>
                      Export
                    </button>
                  </div>
                )}
              </div>

              {/* Output body */}
              <div style={{
                flex: 1, 
                display: "flex", 
                flexDirection: "column",
                padding: "24px", 
                minHeight: 400,
              }}>
                {loading ? (
                  <div style={{
                    flex: 1, 
                    display: "flex", 
                    flexDirection: "column",
                    alignItems: "center", 
                    justifyContent: "center", 
                    gap: 18,
                  }}>
                    <div style={{ display: "flex", gap: 6 }}>
                      {[0,1,2].map(i => (
                        <span key={i} style={{
                          width: 10, 
                          height: 10, 
                          borderRadius: "50%",
                          background: "var(--brand)", 
                          display: "inline-block",
                          animation: `dotBounce 1.1s ${i * .18}s ease-in-out infinite`,
                        }} />
                      ))}
                    </div>
                    <p style={{
                      fontSize: 14, 
                      color: "var(--placeholder)", 
                      fontWeight: 400,
                      fontFamily: "var(--font-serif)",
                      fontStyle: "italic",
                    }}>
                      Rewriting with {toneLabel} tone…
                    </p>
                  </div>
                ) : output ? (
                  <>
                    <p style={{
                      fontFamily: "var(--font-serif)",
                      fontStyle: "italic",
                      fontSize: 15,
                      lineHeight: 1.8,
                      color: "var(--ink)",
                      fontWeight: 400,
                      animation: "fadeIn .45s ease both",
                      flex: 1,
                    }}>
                      {output}
                    </p>
                    <div style={{
                      marginTop: 18, 
                      paddingTop: 14,
                      borderTop: "1px solid var(--border)",
                      display: "flex", 
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}>
                      <span style={{ fontSize: 11, color: "var(--placeholder)", fontWeight: 400 }}>
                        {outputWords} words
                      </span>
                      <span style={{
                        fontSize: 12, 
                        fontWeight: 600,
                        color: "var(--success)",
                        display: "flex", 
                        alignItems: "center", 
                        gap: 6,
                      }}>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                          <polyline points="20 6 9 17 4 12"/>
                        </svg>
                        Humanized · ready to use
                      </span>
                    </div>
                  </>
                ) : (
                  <div style={{
                    flex: 1, 
                    display: "flex", 
                    flexDirection: "column",
                    alignItems: "center", 
                    justifyContent: "center",
                    gap: 14, 
                    textAlign: "center", 
                    padding: "40px 20px",
                  }}>
                    <div style={{ opacity: 0.1 }}>
                      <Logo size={56} />
                    </div>
                    <div>
                      <p style={{
                        fontSize: 15, 
                        color: "var(--placeholder)",
                        fontFamily: "var(--font-serif)",
                        fontStyle: "italic",
                        fontWeight: 400, 
                        marginBottom: 6, 
                        lineHeight: 1.5,
                      }}>
                        Your humanized text will appear here
                      </p>
                      <p style={{ fontSize: 12, color: "var(--placeholder)", fontWeight: 400 }}>
                        Paste text on the left and click Humanize
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>

          </div>{/* end panels */}

        </div>{/* end editor card */}

      </div>

      <style>{`
        @media (max-width: 900px) {
          .editor-panels {
            grid-template-columns: 1fr !important;
          }
          .editor-panels > div:first-child {
            border-right: none !important;
            border-bottom: 1px solid var(--border);
          }
        }
        .editor-panels textarea::placeholder {
          color: var(--placeholder);
          opacity: 1;
          font-family: var(--font-serif);
          font-style: italic;
        }
      `}</style>
    </section>
  );
}
