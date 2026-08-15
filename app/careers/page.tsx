"use client";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { motion } from "framer-motion";

export default function CareersPage() {
  const benefits = [
    { title: "Competitive Salary", desc: "Top-tier compensation plus equity" },
    { title: "Health Coverage", desc: "Medical, dental, vision for you and family" },
    { title: "Unlimited PTO", desc: "Take time off when you need it" },
    { title: "Remote First", desc: "Work from anywhere in the world" },
    { title: "Learning Budget", desc: "$2000/year for courses and conferences" },
    { title: "Top Equipment", desc: "Latest MacBook Pro and accessories" },
    { title: "Fast Growth", desc: "Rapid career advancement opportunities" },
    { title: "Amazing Team", desc: "Work with world-class engineers and AI researchers" }
  ];

  const openings = [
    {
      title: "Senior Machine Learning Engineer",
      department: "Engineering",
      location: "Remote",
      type: "Full-time",
      description: "Build and improve our humanization models. Work on NLP, transformer architectures, and detector reverse-engineering."
    },
    {
      title: "Full Stack Engineer",
      department: "Engineering",
      location: "Remote",
      type: "Full-time",
      description: "Own features end-to-end. React, Next.js, Node.js, PostgreSQL. Help scale our platform to millions of users."
    },
    {
      title: "Product Designer",
      department: "Design",
      location: "Remote",
      type: "Full-time",
      description: "Design intuitive interfaces for complex AI features. Create experiences writers love using every day."
    },
    {
      title: "Growth Marketing Manager",
      department: "Marketing",
      location: "Remote",
      type: "Full-time",
      description: "Drive user acquisition across channels. SEO, content, paid ads, partnerships. Proven track record scaling SaaS products."
    },
    {
      title: "Customer Success Lead",
      department: "Customer Success",
      location: "Remote",
      type: "Full-time",
      description: "Own the post-signup experience. Help enterprise customers integrate and succeed with CrownWrite."
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
        padding: "120px 32px 80px",
        textAlign: "center",
        background: "linear-gradient(180deg, var(--bg) 0%, var(--bg-2) 100%)",
      }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          style={{ maxWidth: 800, margin: "0 auto" }}
        >
          <h1 style={{
            fontSize: "clamp(40px, 6vw, 64px)",
            fontFamily: "var(--font-serif)",
            fontWeight: 600,
            marginBottom: 24,
            lineHeight: 1.2,
          }}>
            Help Shape the Future <br/>
            <span style={{ color: "var(--brand)" }}>of AI Writing</span>
          </h1>
          <p style={{
            fontSize: 20,
            color: "var(--ink-muted)",
            lineHeight: 1.6,
          }}>
            Join a small team building technology that helps millions of writers work smarter
          </p>
        </motion.div>
      </section>

      {/* Why Join */}
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
        }}>Why CrownWrite?</h2>

        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
          gap: 32,
        }}>
          {benefits.map((benefit, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              style={{
                background: "var(--surface)",
                padding: 28,
                borderRadius: 16,
                border: "1px solid var(--border)",
                textAlign: "center",
              }}
            >
              <h3 style={{ fontSize: 18, fontWeight: 600, marginBottom: 8 }}>{benefit.title}</h3>
              <p style={{ color: "var(--ink-muted)", fontSize: 14 }}>{benefit.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Open Positions */}
      <section style={{
        padding: "80px 32px",
        maxWidth: 1000,
        margin: "0 auto",
      }}>
        <h2 style={{
          fontSize: 36,
          fontFamily: "var(--font-serif)",
          textAlign: "center",
          marginBottom: 16,
        }}>Open Positions</h2>
        <p style={{
          textAlign: "center",
          color: "var(--ink-muted)",
          marginBottom: 48,
          fontSize: 18,
        }}>
          {openings.length} openings across {new Set(openings.map(o => o.department)).size} teams
        </p>

        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          {openings.map((job, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              style={{
                background: "var(--surface)",
                padding: 32,
                borderRadius: 16,
                border: "1px solid var(--border)",
                transition: "all 0.3s",
                cursor: "pointer",
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.boxShadow = "var(--sh-md)";
                e.currentTarget.style.transform = "translateX(4px)";
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.boxShadow = "none";
                e.currentTarget.style.transform = "translateX(0)";
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "start", marginBottom: 16 }}>
                <div>
                  <h3 style={{ fontSize: 22, fontWeight: 600, marginBottom: 8 }}>{job.title}</h3>
                  <div style={{ display: "flex", gap: 16, fontSize: 14, color: "var(--ink-muted)" }}>
                    <span>📁 {job.department}</span>
                    <span>📍 {job.location}</span>
                    <span>⏰ {job.type}</span>
                  </div>
                </div>
                <button style={{
                  padding: "10px 24px",
                  background: "var(--brand)",
                  color: "white",
                  border: "none",
                  borderRadius: 8,
                  fontWeight: 600,
                  cursor: "pointer",
                  fontSize: 14,
                }}>
                  Apply →
                </button>
              </div>
              <p style={{ color: "var(--ink-muted)", lineHeight: 1.6 }}>{job.description}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section style={{
        padding: "80px 32px",
        background: "var(--brand)",
        color: "white",
        textAlign: "center",
      }}>
        <h2 style={{ fontSize: 36, fontFamily: "var(--font-serif)", marginBottom: 16 }}>
          Don't See Your Role?
        </h2>
        <p style={{ fontSize: 18, opacity: 0.9, marginBottom: 32, maxWidth: 600, margin: "0 auto 32px" }}>
          We're always looking for exceptional talent. Send us your resume and let's talk.
        </p>
        <a
          href="mailto:crownwrite.humanizer@gmail.com"
          style={{
            display: "inline-block",
            padding: "14px 36px",
            background: "white",
            color: "var(--brand)",
            borderRadius: 8,
            textDecoration: "none",
            fontWeight: 600,
            fontSize: 16,
          }}
        >
          crownwrite.humanizer@gmail.com
        </a>
      </section>

      <Footer />
    </div>
  );
}
