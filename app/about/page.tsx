"use client";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { motion } from "framer-motion";

export default function AboutPage() {
  const stats = [
    { value: "50K+", label: "Active Users" },
    { value: "10M+", label: "Words Humanized" },
    { value: "99.8%", label: "Satisfaction Rate" },
    { value: "150+", label: "Countries" }
  ];

  const values = [
    {
      icon: "🎯",
      title: "Quality First",
      description: "We never compromise on output quality. Every piece of text is carefully processed to sound authentically human."
    },
    {
      icon: "🔒",
      title: "Privacy Always",
      description: "Your content is yours. We never store, share, or use your text for training. Everything is processed and immediately deleted."
    },
    {
      icon: "⚡",
      title: "Constant Innovation",
      description: "AI detection evolves daily. So do we. Our models are continuously updated to stay ahead of every detector."
    },
    {
      icon: "🤝",
      title: "Ethical Use",
      description: "We believe AI should enhance human creativity, not replace it. CrownWrite is built to help writers, not deceive readers."
    }
  ];

  const team = [
    {
      name: "Alex Rivera",
      role: "Founder & CEO",
      bio: "Former ML researcher at OpenAI. Built CrownWrite to solve the AI detection problem for content creators.",
      image: "👨‍💼"
    },
    {
      name: "Sarah Chen",
      role: "Head of AI",
      bio: "PhD in NLP from Stanford. Leads our humanization model development and detector reverse-engineering.",
      image: "👩‍💻"
    },
    {
      name: "Marcus Johnson",
      role: "Lead Engineer",
      bio: "15 years building scalable systems. Ensures CrownWrite stays fast and reliable at any scale.",
      image: "👨‍🔧"
    },
    {
      name: "Emily Watson",
      role: "Head of Product",
      bio: "Former content strategist. Designs features that writers actually want and need.",
      image: "👩‍🎨"
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
            fontSize: "clamp(40px, 6vw, 72px)",
            fontFamily: "var(--font-serif)",
            fontWeight: 600,
            marginBottom: 24,
            lineHeight: 1.2,
          }}>
            AI Writing That Feels <br/>
            <span style={{ color: "var(--brand)" }}>Undeniably Human</span>
          </h1>
          <p style={{
            fontSize: 20,
            color: "var(--ink-muted)",
            maxWidth: 700,
            margin: "0 auto",
            lineHeight: 1.7,
          }}>
            We're on a mission to help writers leverage AI without sacrificing authenticity. 
            CrownWrite transforms robotic text into prose that sounds like you wrote it.
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

      {/* Story Section */}
      <section style={{
        padding: "100px 32px",
        maxWidth: 900,
        margin: "0 auto",
      }}>
        <h2 style={{
          fontSize: 40,
          fontFamily: "var(--font-serif)",
          marginBottom: 32,
          textAlign: "center",
        }}>Our Story</h2>
        
        <div style={{ fontSize: 18, lineHeight: 1.8, color: "var(--ink)" }}>
          <p style={{ marginBottom: 24 }}>
            In early 2024, AI writing tools exploded in popularity. ChatGPT, Claude, and Gemini made it 
            easier than ever to generate content—but there was a problem. The writing was obviously artificial.
          </p>
          
          <p style={{ marginBottom: 24 }}>
            Universities deployed AI detectors. Google started penalizing AI content. Clients could spot 
            machine-written text from a mile away. Writers who used AI as a tool suddenly found themselves 
            under suspicion.
          </p>
          
          <p style={{ marginBottom: 24 }}>
            We saw talented writers spending hours manually rewriting AI drafts just to make them sound human. 
            There had to be a better way.
          </p>
          
          <p style={{ marginBottom: 24 }}>
            So we built CrownWrite. Not as a replacement for human creativity, but as a bridge. A tool that 
            lets you harness AI's efficiency while preserving your authentic voice. Something that makes your 
            AI-assisted drafts sound exactly like you wrote them from scratch.
          </p>
          
          <p style={{ marginBottom: 24 }}>
            Today, over 50,000 writers, students, marketers, and professionals trust CrownWrite to enhance 
            their workflow. Our humanization technology has been tested against every major AI detector and 
            consistently delivers natural, undetectable prose.
          </p>
          
          <p>
            We're not here to trick anyone. We're here to help good writers work smarter—because AI should 
            amplify human creativity, not replace it.
          </p>
        </div>
      </section>

      {/* Values Section */}
      <section style={{
        padding: "80px 32px",
        background: "var(--bg-2)",
      }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <h2 style={{
            fontSize: 40,
            fontFamily: "var(--font-serif)",
            marginBottom: 64,
            textAlign: "center",
          }}>What We Stand For</h2>

          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: 40,
          }}>
            {values.map((value, i) => (
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
                <div style={{ fontSize: 48, marginBottom: 16 }}>{value.icon}</div>
                <h3 style={{ fontSize: 22, fontWeight: 600, marginBottom: 12 }}>{value.title}</h3>
                <p style={{ color: "var(--ink-muted)", lineHeight: 1.7 }}>{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
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
        }}>Meet The Team</h2>
        <p style={{
          textAlign: "center",
          color: "var(--ink-muted)",
          fontSize: 18,
          marginBottom: 64,
        }}>
          A small team obsessed with making AI work for humans
        </p>

        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
          gap: 40,
        }}>
          {team.map((member, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              style={{
                textAlign: "center",
                padding: 24,
              }}
            >
              <div style={{
                fontSize: 80,
                marginBottom: 16,
              }}>{member.image}</div>
              <h3 style={{ fontSize: 20, fontWeight: 600, marginBottom: 4 }}>{member.name}</h3>
              <div style={{
                color: "var(--brand)",
                fontSize: 14,
                fontWeight: 500,
                marginBottom: 12,
              }}>{member.role}</div>
              <p style={{
                color: "var(--ink-muted)",
                fontSize: 15,
                lineHeight: 1.6,
              }}>{member.bio}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Backed By Section */}
      <section style={{
        padding: "60px 32px",
        background: "var(--surface)",
        borderTop: "1px solid var(--border)",
      }}>
        <div style={{ maxWidth: 1000, margin: "0 auto", textAlign: "center" }}>
          <h3 style={{ fontSize: 16, color: "var(--ink-muted)", marginBottom: 32, fontWeight: 600 }}>
            BACKED BY LEADING INVESTORS
          </h3>
          <div style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: 64,
            flexWrap: "wrap",
          }}>
            {["Y Combinator", "Sequoia Capital", "Andreessen Horowitz", "OpenAI Startup Fund"].map((investor, i) => (
              <div
                key={i}
                style={{
                  fontSize: 18,
                  fontWeight: 600,
                  color: "var(--ink-muted)",
                  opacity: 0.7,
                }}
              >{investor}</div>
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
        }}>Join Thousands of Happy Writers</h2>
        <p style={{
          fontSize: 18,
          color: "var(--ink-muted)",
          marginBottom: 40,
          maxWidth: 600,
          margin: "0 auto 40px",
        }}>
          Start humanizing your AI-generated content today. No credit card required.
        </p>
        <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
          <a
            href="/#workspace"
            style={{
              display: "inline-block",
              padding: "16px 40px",
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
            Try It Free
          </a>
          <a
            href="/contact"
            style={{
              display: "inline-block",
              padding: "16px 40px",
              background: "var(--surface)",
              color: "var(--ink)",
              border: "2px solid var(--border)",
              borderRadius: 12,
              fontWeight: 600,
              fontSize: 18,
              textDecoration: "none",
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
            Contact Us
          </a>
        </div>
      </section>

      <Footer />
    </div>
  );
}
