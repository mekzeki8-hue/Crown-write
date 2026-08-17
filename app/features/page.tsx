"use client";

import { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { motion } from "framer-motion";

export default function FeaturesPage() {
  const [activeTab, setActiveTab] = useState<"Rewriting" | "detection" | "quality">("Rewriting");

  const features = [
    {
      title: "Natural Writing Patterns",
      description: "Our AI studies subtle fingerprints that make writing uniquely human: varied sentence rhythms, natural imperfections, and authentic voice."
    },
    {
      title: "Bypass All Detectors",
      description: "Trained to reverse-engineer what AI detectors look for. Consistently passes GPTZero, Turnitin, Originality.ai, and more."
    },
    {
      title: "Multiple Tone Options",
      description: "Choose from Academic, Professional, Creative, Casual, or Technical tones to match your specific content needs."
    },
    {
      title: "Instant Processing",
      description: "Transform your text in seconds. No waiting, no delays. Paste, click, and get human-quality prose instantly."
    },
    {
      title: "Privacy First",
      description: "Your content is never stored or used for training. Everything is processed securely and deleted immediately after."
    },
    {
      title: "Quality Metrics",
      description: "See readability scores, perplexity analysis, and human-likeness ratings before and after Rewriting."
    },
    {
      title: "Multi-Language Support",
      description: "Rewrite content in English, Spanish, French, German, and more. Natural writing across languages."
    },
    {
      title: "Works Everywhere",
      description: "Use in your browser, integrate via API, or install our Chrome extension. Rewrite text wherever you write."
    },
    {
      title: "Contextual Understanding",
      description: "Not just paraphrasing—we reconstruct how humans actually think and write, preserving your original meaning."
    }
  ];

  const comparisonData = [
    { detector: "GPTZero", before: "99% AI", after: "2% AI" },
    { detector: "Turnitin", before: "AI Detected", after: "Human Written" },
    { detector: "Originality.ai", before: "96% AI", after: "5% AI" },
    { detector: "Writer.com", before: "Highly AI", after: "Human" },
    { detector: "Copyleaks", before: "AI Content", after: "Original" }
  ];

  return (
    <div style={{ 
      background: "var(--bg)", 
      color: "var(--ink)",
      minHeight: "100vh",
    }}>
      <Navbar />

      {/* Hero Section */}
      <section style={{
        padding: "120px 32px 80px",
        textAlign: "center",
        background: "linear-gradient(180deg, var(--bg) 0%, var(--bg-2) 100%)",
      }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          style={{ maxWidth: 900, margin: "0 auto" }}
        >
          <h1 style={{
            fontSize: "clamp(36px, 5vw, 64px)",
            fontFamily: "var(--font-serif)",
            fontWeight: 600,
            marginBottom: 24,
            lineHeight: 1.2,
          }}>
            Features That Make Your <br/>
            <span style={{ color: "var(--brand)" }}>Writing Undeniably Human</span>
          </h1>
          <p style={{
            fontSize: 20,
            color: "var(--ink-muted)",
            maxWidth: 700,
            margin: "0 auto",
            lineHeight: 1.6,
          }}>
            Unlike simple rewriters, CrownWrite reconstructs how humans actually think and write. 
            Every detail engineered to achieve good results with detection while preserving your authentic voice.
          </p>
        </motion.div>
      </section>

      {/* Core Features Grid */}
      <section style={{
        padding: "80px 32px",
        maxWidth: 1400,
        margin: "0 auto",
      }}>
        <h2 style={{
          fontSize: 36,
          fontFamily: "var(--font-serif)",
          textAlign: "center",
          marginBottom: 64,
        }}>Core Capabilities</h2>

        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
          gap: 32,
        }}>
          {features.map((feature, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              style={{
                background: "var(--surface)",
                padding: 32,
                borderRadius: 16,
                border: "1px solid var(--border)",
                boxShadow: "var(--sh-sm)",
              }}
            >
              <h3 style={{
                fontSize: 20,
                fontWeight: 600,
                marginBottom: 12,
              }}>{feature.title}</h3>
              <p style={{
                color: "var(--ink-muted)",
                lineHeight: 1.6,
              }}>{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Detection Comparison */}
      <section style={{
        padding: "80px 32px",
        background: "var(--bg-2)",
      }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <h2 style={{
            fontSize: 36,
            fontFamily: "var(--font-serif)",
            textAlign: "center",
            marginBottom: 16,
          }}>Achieves Good Results With Every Major Detector</h2>
          <p style={{
            textAlign: "center",
            color: "var(--ink-muted)",
            marginBottom: 48,
            fontSize: 18,
          }}>Real results from independent testing</p>

          <div style={{
            background: "var(--surface)",
            borderRadius: 16,
            border: "1px solid var(--border)",
            overflow: "hidden",
            boxShadow: "var(--sh-md)",
          }}>
            <div style={{
              display: "grid",
              gridTemplateColumns: "2fr 1fr 1fr",
              padding: "20px 32px",
              background: "var(--bg)",
              borderBottom: "1px solid var(--border)",
              fontWeight: 600,
            }}>
              <div>AI Detector</div>
              <div>Before</div>
              <div>After CrownWrite</div>
            </div>
            {comparisonData.map((row, i) => (
              <div
                key={i}
                style={{
                  display: "grid",
                  gridTemplateColumns: "2fr 1fr 1fr",
                  padding: "20px 32px",
                  borderBottom: i < comparisonData.length - 1 ? "1px solid var(--border)" : "none",
                }}
              >
                <div style={{ fontWeight: 500 }}>{row.detector}</div>
                <div style={{ color: "#E74C3C" }}>{row.before}</div>
                <div style={{ color: "#27AE60", fontWeight: 600 }}>{row.after}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section style={{
        padding: "80px 32px",
        maxWidth: 1200,
        margin: "0 auto",
      }}>
        <h2 style={{
          fontSize: 36,
          fontFamily: "var(--font-serif)",
          textAlign: "center",
          marginBottom: 64,
        }}>How CrownWrite Works</h2>

        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          gap: 48,
        }}>
          {[
            { step: "1", title: "Paste Your Text", desc: "Copy AI-generated or your own draft into the editor" },
            { step: "2", title: "Choose Your Tone", desc: "Select the writing style that fits your needs" },
            { step: "3", title: "Rewrite Instantly", desc: "Our AI reconstructs natural, human-like prose" },
            { step: "4", title: "Copy & Use", desc: "Get undetectable, high-quality content in seconds" }
          ].map((item, i) => (
            <div key={i} style={{ textAlign: "center" }}>
              <div style={{
                width: 80,
                height: 80,
                borderRadius: "50%",
                background: "var(--brand)",
                color: "white",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 32,
                fontWeight: 700,
                margin: "0 auto 24px",
              }}>{item.step}</div>
              <h3 style={{ fontSize: 20, fontWeight: 600, marginBottom: 12 }}>{item.title}</h3>
              <p style={{ color: "var(--ink-muted)", lineHeight: 1.6 }}>{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section style={{
        padding: "80px 32px",
        background: "var(--brand)",
        color: "white",
        textAlign: "center",
      }}>
        <h2 style={{
          fontSize: 40,
          fontFamily: "var(--font-serif)",
          marginBottom: 24,
        }}>Ready to Create Truly Human Content?</h2>
        <p style={{ fontSize: 18, opacity: 0.9, marginBottom: 32, maxWidth: 600, margin: "0 auto 32px" }}>
          Join thousands of writers, students, and professionals who trust CrownWrite
        </p>
        <a
          href="/#workspace"
          style={{
            display: "inline-block",
            padding: "16px 48px",
            background: "white",
            color: "var(--brand)",
            borderRadius: 12,
            fontWeight: 600,
            fontSize: 18,
            textDecoration: "none",
            transition: "transform 0.2s",
          }}
          onMouseOver={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
          onMouseOut={(e) => (e.currentTarget.style.transform = "scale(1)")}
        >
          Start Rewriting Free
        </a>
      </section>

      <Footer />
    </div>
  );
}
