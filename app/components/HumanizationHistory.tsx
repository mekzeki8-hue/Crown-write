"use client";
import { useState, useEffect } from "react";
import { useUser } from "@clerk/nextjs";

interface HistoryItem {
  id: string;
  original_text: string;
  humanized_text: string;
  tone: string;
  word_count: number;
  credits_used: number;
  created_at: string;
}

export default function HumanizationHistory() {
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedItem, setSelectedItem] = useState<HistoryItem | null>(null);
  const [copied, setCopied] = useState(false);
  const { isSignedIn } = useUser();

  useEffect(() => {
    if (isSignedIn) {
      fetchHistory();
    }
  }, [isSignedIn]);

  const fetchHistory = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/user/history');
      const data = await response.json();
      setHistory(data.history || []);
    } catch (error) {
      console.error('Error fetching history:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays < 7) return `${diffDays}d ago`;
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  const truncate = (text: string, maxLength: number = 100) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
  };

  const copyToClipboard = async (text: string) => {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (!isSignedIn) {
    return (
      <div style={{
        padding: "60px 20px",
        textAlign: "center",
        color: "var(--muted)",
      }}>
        <p>Please sign in to view your humanization history</p>
      </div>
    );
  }

  if (loading) {
    return (
      <div style={{
        padding: "60px 20px",
        textAlign: "center",
      }}>
        <div style={{ display: "flex", gap: 6, justifyContent: "center", marginBottom: 12 }}>
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
        <p style={{ fontSize: 14, color: "var(--muted)" }}>Loading history...</p>
      </div>
    );
  }

  return (
    <section style={{
      padding: "80px 0",
      background: "var(--bg)",
    }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 32px" }}>
        
        {/* Header */}
        <div style={{
          marginBottom: 40,
        }}>
          <h2 style={{
            fontSize: "clamp(28px, 4vw, 40px)",
            fontFamily: "var(--font-serif)",
            fontWeight: 600,
            color: "var(--ink)",
            marginBottom: 12,
          }}>
            Humanization History
          </h2>
          <p style={{
            fontSize: 15,
            color: "var(--muted)",
          }}>
            View and manage your previous humanization requests
          </p>
        </div>

        {/* History Grid */}
        {history.length === 0 ? (
          <div style={{
            textAlign: "center",
            padding: "60px 20px",
            background: "var(--surface)",
            border: "1px solid var(--border)",
            borderRadius: 16,
          }}>
            <svg 
              width="48" 
              height="48" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="var(--placeholder)" 
              strokeWidth="1.5" 
              strokeLinecap="round"
              style={{ margin: "0 auto 16px" }}
            >
              <path d="M12 2v20M2 12h20"/>
            </svg>
            <p style={{
              fontSize: 16,
              color: "var(--muted)",
              marginBottom: 8,
            }}>
              No humanization history yet
            </p>
            <p style={{
              fontSize: 14,
              color: "var(--subtle)",
            }}>
              Start humanizing text to build your history
            </p>
          </div>
        ) : (
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
            gap: 20,
          }}>
            {history.map((item) => (
              <div
                key={item.id}
                onClick={() => setSelectedItem(item)}
                style={{
                  background: "var(--surface)",
                  border: "1px solid var(--border)",
                  borderRadius: 12,
                  padding: 20,
                  cursor: "pointer",
                  transition: "all 0.2s",
                }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.borderColor = "var(--brand)";
                  el.style.transform = "translateY(-2px)";
                  el.style.boxShadow = "var(--sh-md)";
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.borderColor = "var(--border)";
                  el.style.transform = "translateY(0)";
                  el.style.boxShadow = "none";
                }}
              >
                {/* Header */}
                <div style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  marginBottom: 12,
                }}>
                  <span style={{
                    fontSize: 11,
                    fontWeight: 600,
                    color: "var(--brand)",
                    textTransform: "uppercase",
                    letterSpacing: "0.05em",
                    padding: "4px 10px",
                    background: "var(--brand-xpale)",
                    borderRadius: 6,
                  }}>
                    {item.tone}
                  </span>
                  <span style={{
                    fontSize: 11,
                    color: "var(--subtle)",
                  }}>
                    {formatDate(item.created_at)}
                  </span>
                </div>

                {/* Preview Text */}
                <p style={{
                  fontSize: 14,
                  lineHeight: 1.6,
                  color: "var(--ink)",
                  marginBottom: 12,
                }}>
                  {truncate(item.original_text, 120)}
                </p>

                {/* Stats */}
                <div style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 16,
                  paddingTop: 12,
                  borderTop: "1px solid var(--border)",
                }}>
                  <span style={{
                    fontSize: 12,
                    color: "var(--muted)",
                    display: "flex",
                    alignItems: "center",
                    gap: 4,
                  }}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                      <polyline points="14 2 14 8 20 8"/>
                    </svg>
                    {item.word_count} words
                  </span>
                  <span style={{
                    fontSize: 12,
                    color: "var(--muted)",
                    display: "flex",
                    alignItems: "center",
                    gap: 4,
                  }}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                      <circle cx="12" cy="12" r="10"/>
                      <path d="M12 6v6l4 2"/>
                    </svg>
                    {item.credits_used} credits
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Detail Modal */}
        {selectedItem && (
          <div
            onClick={() => setSelectedItem(null)}
            style={{
              position: "fixed",
              inset: 0,
              background: "rgba(0, 0, 0, 0.6)",
              backdropFilter: "blur(4px)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              zIndex: 1000,
              padding: 20,
              animation: "fadeIn 0.2s ease",
            }}
          >
            <div
              onClick={(e) => e.stopPropagation()}
              style={{
                background: "var(--surface)",
                border: "1px solid var(--border)",
                borderRadius: 16,
                maxWidth: 900,
                width: "100%",
                maxHeight: "80vh",
                overflow: "auto",
                boxShadow: "var(--sh-xl)",
                animation: "popIn 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)",
              }}
            >
              {/* Modal Header */}
              <div style={{
                padding: "24px 32px",
                borderBottom: "1px solid var(--border)",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                background: "var(--bg-2)",
              }}>
                <div>
                  <h3 style={{
                    fontSize: 20,
                    fontWeight: 600,
                    color: "var(--ink)",
                    marginBottom: 6,
                  }}>
                    Humanization Details
                  </h3>
                  <div style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 12,
                    fontSize: 13,
                    color: "var(--muted)",
                  }}>
                    <span>{formatDate(selectedItem.created_at)}</span>
                    <span>•</span>
                    <span style={{ textTransform: "capitalize" }}>{selectedItem.tone} tone</span>
                    <span>•</span>
                    <span>{selectedItem.word_count} words</span>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedItem(null)}
                  style={{
                    width: 32,
                    height: 32,
                    borderRadius: "50%",
                    border: "1px solid var(--border)",
                    background: "var(--surface)",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    transition: "all 0.2s",
                  }}
                  onMouseEnter={(e) => {
                    const el = e.currentTarget as HTMLElement;
                    el.style.borderColor = "var(--danger)";
                    el.style.background = "var(--bg-2)";
                  }}
                  onMouseLeave={(e) => {
                    const el = e.currentTarget as HTMLElement;
                    el.style.borderColor = "var(--border)";
                    el.style.background = "var(--surface)";
                  }}
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                    <line x1="18" y1="6" x2="6" y2="18"/>
                    <line x1="6" y1="6" x2="18" y2="18"/>
                  </svg>
                </button>
              </div>

              {/* Modal Body */}
              <div style={{ padding: "32px" }}>
                {/* Original Text */}
                <div style={{ marginBottom: 32 }}>
                  <div style={{
                    fontSize: 13,
                    fontWeight: 600,
                    color: "var(--subtle)",
                    textTransform: "uppercase",
                    letterSpacing: "0.05em",
                    marginBottom: 12,
                  }}>
                    Original Text
                  </div>
                  <div style={{
                    padding: 20,
                    background: "var(--bg-2)",
                    border: "1px solid var(--border)",
                    borderRadius: 12,
                    fontSize: 15,
                    lineHeight: 1.7,
                    color: "var(--ink)",
                    fontFamily: "var(--font-sans)",
                  }}>
                    {selectedItem.original_text}
                  </div>
                </div>

                {/* Humanized Text */}
                <div>
                  <div style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    marginBottom: 12,
                  }}>
                    <div style={{
                      fontSize: 13,
                      fontWeight: 600,
                      color: "var(--brand)",
                      textTransform: "uppercase",
                      letterSpacing: "0.05em",
                    }}>
                      Humanized Output
                    </div>
                    <button
                      onClick={() => copyToClipboard(selectedItem.humanized_text)}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 6,
                        padding: "6px 12px",
                        borderRadius: 6,
                        border: `1px solid ${copied ? "var(--success)" : "var(--border)"}`,
                        background: copied ? "var(--success-light)" : "transparent",
                        fontSize: 12,
                        fontWeight: 500,
                        color: copied ? "var(--success)" : "var(--muted)",
                        cursor: "pointer",
                        transition: "all 0.2s",
                      }}
                    >
                      {copied ? (
                        <>
                          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                            <polyline points="20 6 9 17 4 12"/>
                          </svg>
                          Copied
                        </>
                      ) : (
                        <>
                          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                            <rect x="9" y="9" width="13" height="13" rx="2"/>
                            <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>
                          </svg>
                          Copy
                        </>
                      )}
                    </button>
                  </div>
                  <div style={{
                    padding: 20,
                    background: "linear-gradient(135deg, var(--brand-ghost) 0%, var(--surface) 100%)",
                    border: "1px solid var(--brand-pale)",
                    borderRadius: 12,
                    fontSize: 15,
                    lineHeight: 1.7,
                    color: "var(--ink)",
                    fontFamily: "var(--font-serif)",
                    fontStyle: "italic",
                  }}>
                    {selectedItem.humanized_text}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
