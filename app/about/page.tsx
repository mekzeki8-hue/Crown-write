"use client";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { motion } from "framer-motion";

export default function AboutPage() {
  const stats = [
    { value: "50K+", label: "Active Users" },
    { value: "10M+", label: "Words Humanized" },
    { value: "99.8%", label: "Satisfaction Rate" },
    { value: "<2s", label: "Processing Time" }
  ];

  const features = [
    {
      title: "🎯 Undetectable Output",
      description: "Bypasses GPTZero, Turnitin, Originality.ai, and all major AI detectors with 99.9% success rate."
    },
    {
      title: "🔒 Complete Privacy",
      description: "Your content is never stored, shared, or used for training. Process and delete immediately."
    },
    {
      title: "⚡ Lightning Fast",
      description: "Average processing time under 2 seconds. Get results instantly, no waiting."
    },
    {
      title: "🎨 Preserves Meaning",
      description: "Maintains your original message, tone, and intent while making text sound human."
    },
    {
      title: "📊 Quality Scoring",
      description: "Real-time quality metrics show exactly how human your text sounds."
    },
    {
      title: "🌍 Works Everywhere",
      description: "Essays, articles, emails, reports—any text in any context gets humanized perfectly."
    }
  ];

  const useCases = [
    {
      icon: "🎓",
      title: "Students & Academics",
      points: [
        "Humanize research papers and essays",
        "Pass university AI detection checks",
        "Maintain academic integrity",
        "Save hours of manual rewriting"
      ]
    },
    {
      icon: "✍️",
      title: "Content Writers",
      points: [
        "Scale content production 10x",
        "Maintain authentic brand voice",
        "Beat Google's AI content penalties",
        "Keep clients satisfied"
      ]
    },
    {
      icon: "💼",
      title: "Professionals",
      points: [
        "Polish reports and presentations",
        "Humanize email communications",
        "Speed up document creation",
        "Look professional always"
      ]
    },
    {
      icon: "📈",
      title: "Marketing Teams",
      points: [
        "Generate human-like ad copy",
        "Create authentic social content",
        "Produce blog posts at scale",
        "Maintain consistent quality"
      ]
    }
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
        padding: "160px 32px 80px",
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
            fontSize: "clamp(40px, 6vw, 72px)",
            fontFamily: "var(--font-serif)",
            fontWeight: 600,
            marginBottom: 24,
            lineHeight: 1.2,
          }}>
            About <span style={{ color: "var(--brand)" }}>CrownWrite</span>
          </h1>
          <p style={{
            fontSize: 20,
            color: "var(--ink-muted)",
            maxWidth: 700,
            margin: "0 auto",
            lineHeight: 1.7,
          }}>
            Transform AI-generated text into naturally human-sounding content that bypasses all detectors.
          </p>
        </motion.div>
      </section>

      {/* Stats Section */}
      <section style={{
        padding: "60px 32px",
        background: "var(--surface)",
        borderTop: "1px solid var(--border)",
        borderBottom: "1px solid var(--border)",
      }}>
        <div style={{
          maxWidth: 1200,
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gap: 48,
          textAlign: "center",
        }}>
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <div style={{
                fontSize: "clamp(36px, 5vw, 56px)",
                fontWeight: 700,
                color: "var(--brand)",
                marginBottom: 8,
              }}>{stat.value}</div>
              <div style={{
                fontSize: 16,
                color: "var(--ink-muted)",
                fontWeight: 500,
              }}>{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Features Section */}
      <section style={{
        padding: "100px 32px",
        maxWidth: 1200,
        margin: "0 auto",
      }}>
        <h2 style={{
          fontSize: 40,
          fontFamily: "var(--font-serif)",
          marginBottom: 16,
          textAlign: "center",
        }}>Key Features</h2>
        <p style={{
          textAlign: "center",
          color: "var(--ink-muted)",
          fontSize: 18,
          marginBottom: 64,
        }}>
          Everything you need to make AI writing sound human
        </p>

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
              }}
            >
              <h3 style={{ fontSize: 20, fontWeight: 600, marginBottom: 12 }}>{feature.title}</h3>
              <p style={{ color: "var(--ink-muted)", lineHeight: 1.7, fontSize: 15 }}>{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Use Cases Section */}
      <section style={{
        padding: "100px 32px",
        background: "var(--bg-2)",
      }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <h2 style={{
            fontSize: 40,
            fontFamily: "var(--font-serif)",
            marginBottom: 16,
            textAlign: "center",
          }}>Who Uses CrownWrite</h2>
          <p style={{
            textAlign: "center",
            color: "var(--ink-muted)",
            fontSize: 18,
            marginBottom: 64,
          }}>
            Trusted by professionals across industries
          </p>

          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: 40,
          }}>
            {useCases.map((useCase, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                style={{
                  background: "var(--surface)",
                  padding: 32,
                  borderRadius: 16,
                  border: "1px solid var(--border)",
                }}
              >
                <div style={{ fontSize: 48, marginBottom: 16 }}>{useCase.icon}</div>
                <h3 style={{ fontSize: 22, fontWeight: 600, marginBottom: 20 }}>{useCase.title}</h3>
                <ul style={{ 
                  listStyle: "none", 
                  padding: 0, 
                  margin: 0,
                  display: "flex",
                  flexDirection: "column",
                  gap: 12
                }}>
                  {useCase.points.map((point, j) => (
                    <li key={j} style={{ 
                      color: "var(--ink-muted)", 
                      fontSize: 15,
                      paddingLeft: 24,
                      position: "relative"
                    }}>
                      <span style={{
                        position: "absolute",
                        left: 0,
                        color: "var(--brand)",
                        fontWeight: 600
                      }}>✓</span>
                      {point}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section style={{
        padding: "100px 32px",
        textAlign: "center",
      }}>
        <h2 style={{
          fontSize: 40,
          fontFamily: "var(--font-serif)",
          marginBottom: 24,
        }}>Ready to Get Started?</h2>
        <p style={{
          fontSize: 18,
          color: "var(--ink-muted)",
          marginBottom: 40,
          maxWidth: 600,
          margin: "0 auto 40px",
        }}>
          Join 50,000+ users who trust CrownWrite for authentic AI humanization
        </p>
        <a
          href="/#workspace"
          style={{
            display: "inline-block",
            padding: "16px 48px",
            background: "var(--brand)",
            color: "white",
            borderRadius: 12,
            fontWeight: 600,
            fontSize: 18,
            textDecoration: "none",
            transition: "transform 0.2s",
          }}
          onMouseOver={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
          onMouseOut={(e) => (e.currentTarget.style.transform = "scale(1)")}
        >
          Try CrownWrite Free
        </a>
      </section>

      <Footer />
    </div>
  );
}