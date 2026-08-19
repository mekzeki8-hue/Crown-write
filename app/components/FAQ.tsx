"use client";
import { useState } from "react";

const FAQS = [
  { 
    q: "How does CrownWrite humanize AI-generated text?", 
    a: "CrownWrite uses advanced algorithms to analyze your text's structure, vocabulary, tone, and phrasing patterns. It then rewrites it to match natural human writing styles while preserving your original meaning, arguments, and key information. The result? Text that reads authentically human." 
  },
  { 
    q: "Which AI detectors can CrownWrite bypass?", 
    a: "CrownWrite consistently achieves excellent results with all major AI detectors including Turnitin, GPTZero, Copyleaks, ZeroGPT, Originality.ai, Winston AI, Sapling, Writer.com, and Content at Scale. Our models are updated weekly to stay ahead of detector improvements." 
  },
  { 
    q: "Will CrownWrite change the meaning of my content?", 
    a: "No, absolutely not. CrownWrite only transforms how your ideas are expressed, never what they mean. Your core arguments, facts, data, structure, and intended message remain completely intact. Think of it as translating your content into a more natural, human voice." 
  },
  { 
    q: "Is my content private and secure?", 
    a: "Yes, 100%. All text is processed in-memory and immediately discarded after humanization. We never store, log, or use your content for any purpose including model training. Your privacy is our top priority." 
  },
  { 
    q: "What writing tones can I choose from?", 
    a: "CrownWrite offers 7 different tones: Auto (smart detection), Academic (scholarly writing), Professional (business communication), Friendly (casual but polished), Formal (official documents), Casual (conversational), and Creative (engaging storytelling). Each tone adjusts vocabulary, sentence structure, and rhythm to match your audience." 
  },
  { 
    q: "How fast is the humanization process?", 
    a: "Lightning fast! Most texts are humanized in under 2 seconds. We use optimized AI models and efficient processing to ensure you get instant results without any queues or waiting times." 
  },
  { 
    q: "Can I use CrownWrite for academic essays and papers?", 
    a: "Yes! CrownWrite is perfect for academic writing. Use the Academic tone to maintain scholarly language while ensuring your paper passes AI detection. Many students and researchers use CrownWrite to refine AI-assisted drafts into authentic academic writing." 
  },
  { 
    q: "What's the difference between the pricing plans?", 
    a: "Plans differ in monthly word limits, words per request, and processing priority. Basic (10K words/mo) is great for light use. Pro (50K words/mo) includes Ultra Mode and faster processing for regular content creators. Max (unlimited words) is perfect for heavy users and teams with API access." 
  },
  { 
    q: "Is there a free trial or plan?", 
    a: "Yes! All paid plans include a 7-day free trial with no credit card required. You can test all features risk-free before committing." 
  },
  { 
    q: "Can I cancel my subscription anytime?", 
    a: "Absolutely. You can cancel instantly from your account settings with no waiting periods, no cancellation fees, and no questions asked. Your subscription remains active until the end of your billing period." 
  },
  { 
    q: "What happens if I run out of words?", 
    a: "You can either upgrade to a higher plan or purchase a one-time top-up credit pack. Top-up credits never expire and work with any plan, giving you flexibility when you need extra words." 
  },
  { 
    q: "Does CrownWrite work with all languages?", 
    a: "Yes! CrownWrite supports humanization in over 50 languages including English, Spanish, French, German, Chinese, Arabic, Portuguese, and more. The quality is optimized for English but works well across all major languages." 
  },
  { 
    q: "Can I use CrownWrite for commercial/business content?", 
    a: "Definitely! Many businesses, marketers, and agencies use CrownWrite to create authentic-sounding content for blogs, social media, email campaigns, product descriptions, and more. All plans include commercial usage rights." 
  },
  { 
    q: "What's Ultra Mode and who can access it?", 
    a: "Ultra Mode is our premium humanization algorithm that provides even higher quality output with enhanced natural variation. It's available on Pro and Max plans. Ultra Mode is perfect for content that needs to be extra polished." 
  },
  { 
    q: "How do I know if my humanized text will pass AI detectors?", 
    a: "CrownWrite is tested against all major detectors daily. Our success rate is 99.9%+ across all detectors. However, for complete peace of mind, we recommend testing your humanized output with your specific detector tool." 
  },
];

export default function FAQ() {
  const [open, setOpen] = useState<number|null>(null);
  
  return (
    <section id="faq" style={{ 
      background: "linear-gradient(180deg, var(--bg) 0%, var(--bg-2) 100%)", 
      padding: "100px 0 120px",
      position: "relative",
      overflow: "hidden",
    }}>
      {/* Decorative elements */}
      <div aria-hidden style={{
        position: "absolute",
        top: "15%",
        left: "-5%",
        width: 400,
        height: 400,
        background: "radial-gradient(circle, rgba(192, 154, 114, 0.04) 0%, transparent 70%)",
        filter: "blur(60px)",
        pointerEvents: "none",
      }} />
      <div aria-hidden style={{
        position: "absolute",
        bottom: "10%",
        right: "-5%",
        width: 500,
        height: 500,
        background: "radial-gradient(circle, rgba(192, 154, 114, 0.03) 0%, transparent 70%)",
        filter: "blur(80px)",
        pointerEvents: "none",
      }} />

      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 80px", position: "relative", zIndex: 1 }}>
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: 64 }}>
          {/* Badge */}
          <div style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            background: "var(--surface)",
            border: "1.5px solid var(--border-2)",
            padding: "8px 20px",
            borderRadius: 999,
            marginBottom: 24,
            boxShadow: "var(--sh-sm)",
          }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--brand)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10"/>
              <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/>
              <line x1="12" y1="17" x2="12.01" y2="17"/>
            </svg>
            <span style={{
              fontSize: 12,
              fontWeight: 700,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              color: "var(--brand-dark)",
            }}>
              Frequently Asked Questions
            </span>
          </div>

          <h2 style={{
            fontFamily: "var(--font-sans)", 
            fontSize: "clamp(32px, 5vw, 56px)",
            fontWeight: 700, 
            letterSpacing: "-2px", 
            lineHeight: 1.1,
            marginBottom: 20, 
            color: "var(--ink)",
          }}>
            Everything you need to{" "}
            <span style={{ 
              fontFamily: "var(--font-serif)", 
              fontStyle: "italic", 
              fontWeight: 600,
              background: "linear-gradient(135deg, var(--brand) 0%, var(--brand-dark) 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}>
              know
            </span>
          </h2>

          <p style={{ 
            fontSize: 18, 
            color: "var(--muted)", 
            maxWidth: 600, 
            margin: "0 auto", 
            lineHeight: 1.7, 
            fontWeight: 400,
          }}>
            Have questions? We've got answers. Can't find what you're looking for?{" "}
            <a href="/contact" style={{ 
              color: "var(--brand)", 
              fontWeight: 600, 
              textDecoration: "underline",
              textUnderlineOffset: "3px",
            }}>
              Contact us
            </a>
          </p>
        </div>

        {/* FAQ Items - Large & Spacious */}
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}> {/* Increased from 12px */}
          {FAQS.map((f, i) => (
            <div key={i} style={{
              background: "var(--surface)",
              border: `2px solid ${open === i ? "var(--brand)" : "var(--border)"}`,
              borderRadius: 20,
              overflow: "hidden",
              transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
              boxShadow: open === i ? "0 12px 32px rgba(192, 154, 114, 0.15)" : "var(--sh-xs)",
            }}>
              <button 
                onClick={() => setOpen(open === i ? null : i)} 
                style={{
                  width: "100%", 
                  display: "flex", 
                  alignItems: "center",
                  justifyContent: "space-between", 
                  padding: "28px 32px",
                  background: "none", 
                  border: "none", 
                  cursor: "pointer",
                  textAlign: "left", 
                  gap: 24,
                }}
              >
                {/* Question Icon */}
                <div style={{
                  flexShrink: 0,
                  width: 44,
                  height: 44,
                  borderRadius: 12,
                  background: open === i 
                    ? "linear-gradient(135deg, var(--brand) 0%, var(--brand-dark) 100%)" 
                    : "var(--bg-2)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  transition: "all 0.3s ease",
                  boxShadow: open === i ? "0 4px 12px rgba(192, 154, 114, 0.25)" : "none",
                }}>
                  <span style={{
                    fontSize: 20,
                    fontWeight: 700,
                    color: open === i ? "white" : "var(--brand)",
                    transition: "color 0.3s ease",
                  }}>
                    Q
                  </span>
                </div>

                {/* Question Text */}
                <span style={{
                  flex: 1,
                  fontSize: 18,
                  fontWeight: 600,
                  lineHeight: 1.5,
                  color: open === i ? "var(--ink)" : "var(--ink-2)",
                  transition: "color 0.3s ease",
                }}>
                  {f.q}
                </span>

                {/* Expand Icon */}
                <div style={{
                  flexShrink: 0, 
                  width: 36, 
                  height: 36, 
                  borderRadius: 12,
                  background: open === i ? "var(--brand)" : "var(--bg-3)",
                  border: `2px solid ${open === i ? "var(--brand)" : "var(--border-2)"}`,
                  display: "flex", 
                  alignItems: "center", 
                  justifyContent: "center",
                  transition: "all 0.3s ease",
                }}>
                  <svg 
                    width="18" 
                    height="18" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    stroke={open === i ? "white" : "var(--muted)"} 
                    strokeWidth="3" 
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                    style={{
                      transition: "transform 0.3s ease",
                      transform: open === i ? "rotate(180deg)" : "rotate(0deg)",
                    }}
                  >
                    <polyline points="6 9 12 15 18 9"/>
                  </svg>
                </div>
              </button>

              {/* Answer */}
              <div style={{
                maxHeight: open === i ? 500 : 0, 
                overflow: "hidden",
                transition: "max-height 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
              }}>
                <div style={{
                  padding: "0 32px 32px 108px",
                  fontSize: 16,
                  lineHeight: 1.8,
                  color: "var(--muted)",
                  fontWeight: 400,
                }}>
                  {f.a}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Still have questions CTA */}
        <div style={{
          marginTop: 56,
          textAlign: "center",
          padding: "40px",
          background: "var(--surface)",
          borderRadius: 20,
          border: "2px solid var(--border)",
          boxShadow: "var(--sh-sm)",
        }}>
          <h3 style={{
            fontSize: 24,
            fontWeight: 600,
            color: "var(--ink)",
            marginBottom: 12,
          }}>
            Still have questions?
          </h3>
          <p style={{
            fontSize: 16,
            color: "var(--muted)",
            marginBottom: 24,
            lineHeight: 1.6,
          }}>
            Our support team is here to help. Get in touch and we'll respond within 24 hours.
          </p>
          <a 
            href="/contact"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              padding: "14px 32px",
              background: "var(--g-brand)",
              color: "white",
              borderRadius: 999,
              fontSize: 15,
              fontWeight: 600,
              textDecoration: "none",
              boxShadow: "var(--sh-brand)",
              transition: "all 0.3s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-2px)";
              e.currentTarget.style.boxShadow = "var(--sh-brandlg)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "var(--sh-brand)";
            }}
          >
            Contact Support
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
