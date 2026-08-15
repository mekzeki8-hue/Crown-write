"use client";

import { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { motion } from "framer-motion";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    
    // Simulate sending
    setTimeout(() => {
      setStatus("success");
      setFormData({ name: "", email: "", subject: "", message: "" });
      setTimeout(() => setStatus("idle"), 3000);
    }, 1500);
  };

  const contactMethods = [
    {
      icon: "📧",
      title: "Email Us",
      content: "support@crownwrite.com",
      link: "mailto:support@crownwrite.com"
    },
    {
      icon: "💬",
      title: "Live Chat",
      content: "Available 9am-6pm EST",
      link: "#"
    },
    {
      icon: "📚",
      title: "Documentation",
      content: "API docs & guides",
      link: "/api-docs"
    },
    {
      icon: "🐦",
      title: "Twitter",
      content: "@crownwrite",
      link: "https://twitter.com/crownwrite"
    }
  ];

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
          style={{ maxWidth: 700, margin: "0 auto" }}
        >
          <h1 style={{
            fontSize: "clamp(40px, 6vw, 64px)",
            fontFamily: "var(--font-serif)",
            fontWeight: 600,
            marginBottom: 24,
            lineHeight: 1.2,
          }}>
            Get in Touch
          </h1>
          <p style={{
            fontSize: 20,
            color: "var(--ink-muted)",
            lineHeight: 1.6,
          }}>
            Have questions? We're here to help. Reach out and we'll get back to you within 24 hours.
          </p>
        </motion.div>
      </section>

      {/* Contact Methods */}
      <section style={{
        padding: "60px 32px",
        maxWidth: 1200,
        margin: "0 auto",
      }}>
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
          gap: 24,
        }}>
          {contactMethods.map((method, i) => (
            <motion.a
              key={i}
              href={method.link}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              style={{
                background: "var(--surface)",
                padding: 32,
                borderRadius: 16,
                border: "1px solid var(--border)",
                textAlign: "center",
                textDecoration: "none",
                color: "inherit",
                transition: "all 0.3s",
                display: "block",
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.boxShadow = "var(--sh-md)";
                e.currentTarget.style.transform = "translateY(-4px)";
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.boxShadow = "none";
                e.currentTarget.style.transform = "translateY(0)";
              }}
            >
              <div style={{ fontSize: 48, marginBottom: 16 }}>{method.icon}</div>
              <h3 style={{ fontSize: 18, fontWeight: 600, marginBottom: 8 }}>{method.title}</h3>
              <p style={{ color: "var(--ink-muted)", fontSize: 14 }}>{method.content}</p>
            </motion.a>
          ))}
        </div>
      </section>

      {/* Contact Form */}
      <section style={{
        padding: "60px 32px 100px",
        maxWidth: 800,
        margin: "0 auto",
      }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          style={{
            background: "var(--surface)",
            padding: 48,
            borderRadius: 20,
            border: "1px solid var(--border)",
            boxShadow: "var(--sh-lg)",
          }}
        >
          <h2 style={{
            fontSize: 28,
            fontFamily: "var(--font-serif)",
            marginBottom: 8,
            textAlign: "center",
          }}>Send Us a Message</h2>
          <p style={{
            textAlign: "center",
            color: "var(--ink-muted)",
            marginBottom: 32,
          }}>
            Fill out the form below and we'll respond as soon as possible
          </p>

          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: 24 }}>
              <label style={{
                display: "block",
                fontSize: 14,
                fontWeight: 600,
                marginBottom: 8,
              }}>
                Name *
              </label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                style={{
                  width: "100%",
                  padding: "12px 16px",
                  fontSize: 16,
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
                Email *
              </label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                style={{
                  width: "100%",
                  padding: "12px 16px",
                  fontSize: 16,
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
                Subject *
              </label>
              <select
                required
                value={formData.subject}
                onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                style={{
                  width: "100%",
                  padding: "12px 16px",
                  fontSize: 16,
                  border: "1px solid var(--border)",
                  borderRadius: 8,
                  background: "var(--bg)",
                  color: "var(--ink)",
                  fontFamily: "inherit",
                }}
              >
                <option value="">Select a subject</option>
                <option value="support">Technical Support</option>
                <option value="billing">Billing Question</option>
                <option value="feature">Feature Request</option>
                <option value="api">API Integration Help</option>
                <option value="partnership">Partnership Inquiry</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div style={{ marginBottom: 32 }}>
              <label style={{
                display: "block",
                fontSize: 14,
                fontWeight: 600,
                marginBottom: 8,
              }}>
                Message *
              </label>
              <textarea
                required
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                rows={6}
                style={{
                  width: "100%",
                  padding: "12px 16px",
                  fontSize: 16,
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
                padding: "16px",
                background: status === "success" ? "#27AE60" : "var(--brand)",
                color: "white",
                border: "none",
                borderRadius: 8,
                fontSize: 16,
                fontWeight: 600,
                cursor: status === "sending" ? "not-allowed" : "pointer",
                transition: "all 0.3s",
                opacity: status === "sending" ? 0.7 : 1,
              }}
            >
              {status === "idle" && "Send Message"}
              {status === "sending" && "Sending..."}
              {status === "success" && "✓ Message Sent!"}
              {status === "error" && "Error - Try Again"}
            </button>

            {status === "success" && (
              <p style={{
                marginTop: 16,
                textAlign: "center",
                color: "#27AE60",
                fontSize: 14,
              }}>
                Thanks! We'll get back to you within 24 hours.
              </p>
            )}
          </form>
        </motion.div>
      </section>

      {/* FAQ Quick Links */}
      <section style={{
        padding: "60px 32px",
        background: "var(--bg-2)",
      }}>
        <div style={{ maxWidth: 1000, margin: "0 auto", textAlign: "center" }}>
          <h2 style={{
            fontSize: 32,
            fontFamily: "var(--font-serif)",
            marginBottom: 16,
          }}>Looking for Quick Answers?</h2>
          <p style={{
            color: "var(--ink-muted)",
            marginBottom: 32,
            fontSize: 16,
          }}>
            Check out these resources before reaching out
          </p>
          <div style={{
            display: "flex",
            gap: 16,
            justifyContent: "center",
            flexWrap: "wrap",
          }}>
            {[
              { label: "Help Center", href: "/#faq" },
              { label: "API Docs", href: "/api-docs" },
              { label: "Pricing", href: "/#pricing" },
              { label: "Status Page", href: "#" }
            ].map((link, i) => (
              <a
                key={i}
                href={link.href}
                style={{
                  padding: "12px 24px",
                  background: "var(--surface)",
                  border: "1px solid var(--border)",
                  borderRadius: 8,
                  textDecoration: "none",
                  color: "var(--ink)",
                  fontWeight: 500,
                  transition: "all 0.2s",
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.borderColor = "var(--brand)";
                  e.currentTarget.style.color = "var(--brand)";
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.borderColor = "var(--border)";
                  e.currentTarget.style.color = "var(--ink)";
                }}
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
