"use client";

import { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { motion } from "framer-motion";

export default function BlogPage() {
  const articles = [
    {
      id: 1,
      title: "How AI Detectors Actually Work (And How to Beat Them)",
      excerpt: "A deep dive into the technology behind GPTZero, Turnitin, and Originality.ai—and what makes text undetectable.",
      category: "AI Detection",
      date: "Aug 10, 2026",
      readTime: "8 min read",
      author: "Sarah Chen"
    },
    {
      id: 2,
      title: "The Complete Guide to AI Writing in 2026",
      excerpt: "Best practices for using ChatGPT, Claude, and Gemini to enhance your writing workflow without sacrificing quality.",
      category: "Writing Tips",
      date: "Aug 8, 2026",
      readTime: "12 min read",
      author: "Alex Rivera"
    },
    {
      id: 3,
      title: "University Policies on AI Writing: What Students Need to Know",
      excerpt: "How top universities handle AI-assisted writing and what's actually allowed vs. prohibited.",
      category: "Education",
      date: "Aug 5, 2026",
      readTime: "6 min read",
      author: "Emily Watson"
    },
    {
      id: 4,
      title: "Case Study: How Marketing Teams Use AI Humanization",
      excerpt: "Real examples of agencies using CrownWrite to scale content production while maintaining brand voice.",
      category: "Case Studies",
      date: "Aug 2, 2026",
      readTime: "10 min read",
      author: "Marcus Johnson"
    },
    {
      id: 5,
      title: "Perplexity vs. Burstiness: Understanding AI Writing Metrics",
      excerpt: "What these terms actually mean and why they matter for human-like text generation.",
      category: "Technical",
      date: "Jul 30, 2026",
      readTime: "7 min read",
      author: "Sarah Chen"
    },
    {
      id: 6,
      title: "The Ethics of AI Writing: Our Perspective",
      excerpt: "Where we draw the line between helpful tool and deceptive practice—and why transparency matters.",
      category: "Ethics",
      date: "Jul 28, 2026",
      readTime: "9 min read",
      author: "Alex Rivera"
    },
    {
      id: 7,
      title: "5 Signs Your Content Was Written by AI (And How to Fix It)",
      excerpt: "Common patterns that give away machine-generated text and how to make your writing more natural.",
      category: "Writing Tips",
      date: "Jul 25, 2026",
      readTime: "5 min read",
      author: "Emily Watson"
    },
    {
      id: 8,
      title: "API Integration Tutorial: Humanize Text in Your App",
      excerpt: "Step-by-step guide to integrating CrownWrite's API into your content management system.",
      category: "Technical",
      date: "Jul 22, 2026",
      readTime: "15 min read",
      author: "Marcus Johnson"
    },
    {
      id: 9,
      title: "The Future of AI Content Detection",
      excerpt: "Where detection technology is headed and how humanization tools will need to adapt.",
      category: "AI Detection",
      date: "Jul 20, 2026",
      readTime: "11 min read",
      author: "Sarah Chen"
    }
  ];

  const categories = ["All", "AI Detection", "Writing Tips", "Education", "Case Studies", "Technical", "Ethics"];
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredArticles = selectedCategory === "All" 
    ? articles 
    : articles.filter(article => article.category === selectedCategory);

  return (
    <div style={{ 
      background: "var(--bg)", 
      color: "var(--ink)",
      minHeight: "100vh",
    }}>
      <Navbar />

      {/* Hero Section */}
      <section style={{
        paddingTop: "clamp(140px, 20vh, 180px)",
        paddingBottom: 60,
        paddingLeft: "clamp(16px, 5vw, 32px)",
        paddingRight: "clamp(16px, 5vw, 32px)",
        textAlign: "center",
        background: "linear-gradient(180deg, var(--bg) 0%, var(--bg-2) 100%)",
      }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          style={{ maxWidth: 800, margin: "0 auto" }}
        >
          <h1 style={{
            fontSize: "clamp(32px, 6vw, 64px)",
            fontFamily: "var(--font-serif)",
            fontWeight: 600,
            marginBottom: 24,
            lineHeight: 1.2,
            letterSpacing: "-1px",
          }}>
            The CrownWrite Blog
          </h1>
          <p style={{
            fontSize: 20,
            color: "var(--ink-muted)",
            lineHeight: 1.6,
          }}>
            Insights on AI writing, detection technology, and the future of content creation
          </p>
        </motion.div>
      </section>

      {/* Category Filter */}
      <section style={{
        padding: "40px clamp(16px, 5vw, 32px)",
        maxWidth: 1400,
        margin: "0 auto",
      }}>
        <div style={{
          display: "flex",
          gap: 12,
          justifyContent: "center",
          flexWrap: "wrap",
        }}>
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              style={{
                padding: "10px 24px",
                background: selectedCategory === cat ? "var(--brand)" : "var(--surface)",
                color: selectedCategory === cat ? "white" : "var(--ink)",
                border: selectedCategory === cat ? "none" : "1px solid var(--border)",
                borderRadius: 24,
                cursor: "pointer",
                fontSize: 15,
                fontWeight: 500,
                transition: "all 0.2s",
              }}
              onMouseOver={(e) => {
                if (selectedCategory !== cat) {
                  e.currentTarget.style.borderColor = "var(--brand)";
                  e.currentTarget.style.color = "var(--brand)";
                }
              }}
              onMouseOut={(e) => {
                if (selectedCategory !== cat) {
                  e.currentTarget.style.borderColor = "var(--border)";
                  e.currentTarget.style.color = "var(--ink)";
                }
              }}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* Featured Article */}
      {selectedCategory === "All" && (
        <section style={{
          padding: "0 clamp(16px, 5vw, 32px) 60px",
          maxWidth: 1400,
          margin: "0 auto",
        }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            style={{
              background: "var(--surface)",
              borderRadius: 20,
              overflow: "hidden",
              border: "1px solid var(--border)",
              boxShadow: "var(--sh-lg)",
              display: "grid",
              gridTemplateColumns: "1fr",
              gap: 0,
            }}
            className="featured-article"
          >
            <div style={{
              background: "var(--brand)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: 80,
            }}>
              <div style={{
                fontSize: 56,
                fontWeight: 700,
                color: "white",
                fontFamily: "var(--font-serif)",
                textAlign: "center",
              }}>
                {articles[0].category}
              </div>
            </div>
            <div style={{ padding: 48 }}>
              <div style={{
                display: "inline-block",
                padding: "6px 16px",
                background: "var(--brand)",
                color: "white",
                borderRadius: 20,
                fontSize: 13,
                fontWeight: 600,
                marginBottom: 16,
              }}>
                FEATURED
              </div>
              <h2 style={{
                fontSize: 32,
                fontFamily: "var(--font-serif)",
                marginBottom: 16,
                lineHeight: 1.3,
              }}>{articles[0].title}</h2>
              <p style={{
                color: "var(--ink-muted)",
                fontSize: 16,
                lineHeight: 1.7,
                marginBottom: 24,
              }}>{articles[0].excerpt}</p>
              <div style={{
                display: "flex",
                alignItems: "center",
                gap: 16,
                fontSize: 14,
                color: "var(--ink-muted)",
                marginBottom: 24,
              }}>
                <span>{articles[0].author}</span>
                <span>•</span>
                <span>{articles[0].date}</span>
                <span>•</span>
                <span>{articles[0].readTime}</span>
              </div>
              <a
                href={`/blog/${articles[0].id}`}
                style={{
                  display: "inline-block",
                  padding: "12px 28px",
                  background: "var(--brand)",
                  color: "white",
                  borderRadius: 8,
                  textDecoration: "none",
                  fontWeight: 600,
                  transition: "transform 0.2s",
                }}
                onMouseOver={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
                onMouseOut={(e) => (e.currentTarget.style.transform = "scale(1)")}
              >
                Read Article →
              </a>
            </div>
          </motion.div>
        </section>
      )}

      {/* Articles Grid */}
      <section style={{
        padding: "0 clamp(16px, 5vw, 32px) 100px",
        maxWidth: 1400,
        margin: "0 auto",
      }}>
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
          gap: 32,
        }}
        className="blog-grid">
          {filteredArticles.slice(selectedCategory === "All" ? 1 : 0).map((article, i) => (
            <motion.article
              key={article.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              style={{
                background: "var(--surface)",
                borderRadius: 16,
                border: "1px solid var(--border)",
                overflow: "hidden",
                transition: "all 0.3s",
                cursor: "pointer",
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.boxShadow = "var(--sh-lg)";
                e.currentTarget.style.transform = "translateY(-4px)";
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.boxShadow = "none";
                e.currentTarget.style.transform = "translateY(0)";
              }}
              onClick={() => window.location.href = `/blog/${article.id}`}
            >
              <div style={{
                background: "var(--bg-2)",
                height: 200,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                borderBottom: "1px solid var(--border)",
              }}>
                <div style={{
                  fontSize: 32,
                  fontWeight: 700,
                  color: "var(--brand)",
                  fontFamily: "var(--font-serif)",
                }}>
                  {article.category}
                </div>
              </div>
              <div style={{ padding: 24 }}>
                <div style={{
                  display: "inline-block",
                  padding: "4px 12px",
                  background: "var(--bg-2)",
                  color: "var(--brand)",
                  borderRadius: 12,
                  fontSize: 12,
                  fontWeight: 600,
                  marginBottom: 12,
                }}>
                  {article.category}
                </div>
                <h3 style={{
                  fontSize: 20,
                  fontWeight: 600,
                  marginBottom: 12,
                  lineHeight: 1.4,
                }}>{article.title}</h3>
                <p style={{
                  color: "var(--ink-muted)",
                  fontSize: 15,
                  lineHeight: 1.6,
                  marginBottom: 20,
                }}>{article.excerpt}</p>
                <div style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  fontSize: 13,
                  color: "var(--ink-muted)",
                }}>
                  <span>{article.author}</span>
                  <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                    <span>{article.date}</span>
                    <span>•</span>
                    <span>{article.readTime}</span>
                  </div>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </section>

      {/* Newsletter CTA */}
      <section style={{
        padding: "clamp(60px, 12vw, 80px) clamp(16px, 5vw, 32px)",
        background: "var(--brand)",
        color: "white",
      }}>
        <div style={{
          maxWidth: 700,
          margin: "0 auto",
          textAlign: "center",
        }}>
          <h2 style={{
            fontSize: 36,
            fontFamily: "var(--font-serif)",
            marginBottom: 16,
          }}>Stay Updated</h2>
          <p style={{
            fontSize: 18,
            opacity: 0.9,
            marginBottom: 32,
          }}>
            Get the latest insights on AI writing, detection tech, and content strategy delivered to your inbox
          </p>
          <form style={{
            display: "flex",
            gap: 12,
            maxWidth: 500,
            margin: "0 auto",
          }}>
            <input
              type="email"
              placeholder="Enter your email"
              style={{
                flex: 1,
                padding: "14px 20px",
                borderRadius: 8,
                border: "none",
                fontSize: 16,
              }}
            />
            <button
              type="submit"
              style={{
                padding: "14px 32px",
                background: "var(--ink)",
                color: "white",
                border: "none",
                borderRadius: 8,
                fontSize: 16,
                fontWeight: 600,
                cursor: "pointer",
                whiteSpace: "nowrap",
              }}
            >
              Subscribe
            </button>
          </form>
          <p style={{
            fontSize: 13,
            opacity: 0.7,
            marginTop: 16,
          }}>
            No spam. Unsubscribe anytime.
          </p>
        </div>
      </section>

      <Footer />
      
      <style>{`
        @media (min-width: 769px) {
          .featured-article {
            grid-template-columns: 1fr 1fr !important;
          }
        }
        
        @media (max-width: 768px) {
          .featured-article {
            grid-template-columns: 1fr !important;
          }
          
          .featured-article > div:first-child {
            padding: 40px !important;
            min-height: 200px;
          }
          
          .featured-article > div:last-child {
            padding: 32px !important;
          }
          
          .blog-grid {
            grid-template-columns: 1fr !important;
            gap: 24px !important;
          }
        }
        
        @media (max-width: 540px) {
          .featured-article h2 {
            font-size: 24px !important;
          }
          
          .blog-grid article h3 {
            font-size: 18px !important;
          }
        }
      `}</style>
    </div>
  );
}
