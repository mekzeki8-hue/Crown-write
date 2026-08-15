"use client";

import { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { motion } from "framer-motion";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    subject: "",
    message: ""
  });
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    
    // Simulate sending
    setTimeout(() => {
      setStatus("success");
      setFormData({ fullName: "", email: "", subject: "", message: "" });
      setTimeout(() => setStatus("idle"), 3000);
    }, 1500);
  };

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle newsletter subscription
    setNewsletterEmail("");
  };

  return (
    <div style={{ 
      background: "var(--bg)", 
      color: "var(--ink)",
      minHeight: "100vh",
    }}>
      <Navbar />

      {/* Hero */}
      <section style={{
        padding: "120px 32px 60px",
        textAlign: "center",
        background: "linear-gradient(180deg, var(--bg) 0%, var(--bg-2) 100%)",
      }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          style={{ maxWidth: 800, margin: "0 auto" }}
        >
          <h1 style={{
            fontSize: "clamp(40px, 6vw, 56px)",
            fontFamily: "var(--font-serif)",
            fontWeight: 600,
            marginBottom: 16,
            lineHeight: 1.2,
          }}>
            Contact CrownWrite Support
          </h1>
          <p style={{
            fontSize: 18,
            color: "var(--ink-muted)",
            lineHeight: 1.6,
            maxWidth: 700,
            margin: "0 auto",
          }}>
            Have questions about AI text humanization, billing, or features? We'd love to hear from you. Our team typically responds within 24 hours.
          </p>
        </motion.div>
      </section>

      {/* Main Content */}
      <section style={{
        padding: "60px 32px 100px",
        maxWidth: 1200,
        margin: "0 auto",
      }}>
        <div style={{
          display: "grid",
          gridTemplateColumns: "1.5fr 1fr",
          gap: 48,
        }}>

          {/* Left: Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <h2 style={{
              fontSize: 24,
              fontWeight: 600,
              marginBottom: 8,
            }}>Send us a Message</h2>
            <p style={{
              color: "var(--ink-muted)",
              marginBottom: 32,
              fontSize: 15,
            }}>
              Fill out the form and we'll get back to you soon
            </p>

            <form onSubmit={handleSubmit}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, marginBottom: 20 }}>
                <div>
                  <label style={{
                    display: "block",
                    fontSize: 14,
                    fontWeight: 600,
                    marginBottom: 8,
                  }}>
                    Full Name <span style={{ color: "#E74C3C" }}>*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="John Doe"
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    style={{
                      width: "100%",
                      padding: "12px 16px",
                      fontSize: 15,
                      border: "1px solid var(--border)",
                      borderRadius: 8,
                      background: "var(--bg)",
                      color: "var(--ink)",
                      fontFamily: "inherit",
                    }}
                  />
                </div>

                <div>
                  <label style={{
                    display: "block",
                    fontSize: 14,
                    fontWeight: 600,
                    marginBottom: 8,
                  }}>
                    Email Address <span style={{ color: "#E74C3C" }}>*</span>
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="john@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    style={{
                      width: "100%",
                      padding: "12px 16px",
                      fontSize: 15,
                      border: "1px solid var(--border)",
                      borderRadius: 8,
                      background: "var(--bg)",
                      color: "var(--ink)",
                      fontFamily: "inherit",
                    }}
                  />
                </div>
              </div>

              <div style={{ marginBottom: 20 }}>
                <label style={{
                  display: "block",
                  fontSize: 14,
                  fontWeight: 600,
                  marginBottom: 8,
                }}>
                  Subject <span style={{ color: "#E74C3C" }}>*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="What's this about?"
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  style={{
                    width: "100%",
                    padding: "12px 16px",
                    fontSize: 15,
                    border: "1px solid var(--border)",
                    borderRadius: 8,
                    background: "var(--bg)",
                    color: "var(--ink)",
                    fontFamily: "inherit",
                  }}
                />
              </div>

              <div style={{ marginBottom: 24 }}>
                <label style={{
                  display: "block",
                  fontSize: 14,
                  fontWeight: 600,
                  marginBottom: 8,
                }}>
                  Message <span style={{ color: "#E74C3C" }}>*</span>
                </label>
                <textarea
                  required
                  placeholder="Tell us more about your inquiry..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  rows={6}
                  style={{
                    width: "100%",
                    padding: "12px 16px",
                    fontSize: 15,
                    border: "1px solid var(--border)",
                    borderRadius: 8,
                    background: "var(--bg)",
                    color: "var(--ink)",
                    fontFamily: "inherit",
                    resize: "vertical",
                  }}
                />
              </div>

              <button
                type="submit"
                disabled={status === "sending"}
                style={{
                  width: "100%",
                  padding: "14px",
                  background: status === "success" ? "#27AE60" : "#1AAFA0",
                  color: "white",
                  border: "none",
                  borderRadius: 8,
                  fontSize: 16,
                  fontWeight: 600,
                  cursor: status === "sending" ? "not-allowed" : "pointer",
                  transition: "all 0.3s",
                  opacity: status === "sending" ? 0.7 : 1,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 8,
                }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z"/>
                </svg>
                {status === "idle" && "Send Message"}
                {status === "sending" && "Sending..."}
                {status === "success" && "Message Sent!"}
                {status === "error" && "Error - Try Again"}
              </button>

              {status === "success" && (
                <p style={{
                  marginTop: 12,
                  textAlign: "center",
                  color: "#27AE60",
                  fontSize: 14,
                }}>
                  Thanks! We'll get back to you within 24 hours.
                </p>
              )}
            </form>
          </motion.div>

          {/* Right: Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <div style={{
              background: "var(--surface)",
              border: "1px solid var(--border)",
              borderRadius: 16,
              padding: 32,
              marginBottom: 32,
            }}>
              <h3 style={{
                fontSize: 18,
                fontWeight: 600,
                marginBottom: 24,
              }}>Contact Information</h3>

              <div style={{ marginBottom: 24 }}>
                <div style={{
                  fontSize: 13,
                  fontWeight: 600,
                  color: "var(--ink-muted)",
                  marginBottom: 8,
                  textTransform: "uppercase",
                  letterSpacing: "0.05em",
                }}>Email</div>
                <a
                  href="mailto:crownwrite.humanizer@gmail.com"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                    color: "#1AAFA0",
                    textDecoration: "none",
                    fontSize: 15,
                    fontWeight: 500,
                  }}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                    <polyline points="22,6 12,13 2,6"/>
                  </svg>
                  crownwrite.humanizer@gmail.com
                </a>
              </div>

              <div>
                <div style={{
                  fontSize: 13,
                  fontWeight: 600,
                  color: "var(--ink-muted)",
                  marginBottom: 8,
                  textTransform: "uppercase",
                  letterSpacing: "0.05em",
                }}>Response Time</div>
                <div style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  fontSize: 15,
                }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="10"/>
                    <polyline points="12 6 12 12 16 14"/>
                  </svg>
                  Within 24 hours
                </div>
              </div>
            </div>

            {/* Stay Updated */}
            <div style={{
              background: "var(--surface)",
              border: "1px solid var(--border)",
              borderRadius: 16,
              padding: 32,
            }}>
              <h3 style={{
                fontSize: 18,
                fontWeight: 600,
                marginBottom: 8,
              }}>Stay Updated</h3>
              <p style={{
                fontSize: 14,
                color: "var(--ink-muted)",
                marginBottom: 20,
                lineHeight: 1.6,
              }}>
                Get the latest tips, product updates, and exclusive offers delivered to your inbox.
              </p>
              
              <form onSubmit={handleNewsletterSubmit}>
                <input
                  type="email"
                  required
                  placeholder="Enter your email"
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  style={{
                    width: "100%",
                    padding: "12px 16px",
                    fontSize: 15,
                    border: "1px solid var(--border)",
                    borderRadius: 8,
                    background: "var(--bg)",
                    color: "var(--ink)",
                    fontFamily: "inherit",
                    marginBottom: 12,
                  }}
                />
                <button
                  type="submit"
                  style={{
                    width: "100%",
                    padding: "12px",
                    background: "#1AAFA0",
                    color: "white",
                    border: "none",
                    borderRadius: 8,
                    fontSize: 15,
                    fontWeight: 600,
                    cursor: "pointer",
                  }}
                >
                  Subscribe
                </button>
                <p style={{
                  fontSize: 12,
                  color: "var(--ink-muted)",
                  marginTop: 12,
                  textAlign: "center",
                }}>
                  We respect your privacy. Unsubscribe anytime.
                </p>
              </form>
            </div>
          </motion.div>

        </div>
      </section>

      <Footer />
    </div>
  );
}
