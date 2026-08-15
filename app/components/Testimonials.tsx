'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Testimonial {
  id: number;
  text: string;
  highlights: string[];
  author: string;
  role: string;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    text: "Recommend CrownWrite to all my students. It's an excellent tool for improving academic writing quality while maintaining originality and passing detection tools",
    highlights: ["recommend CrownWrite to all my students", "improving academic writing quality", "maintaining originality"],
    author: "Achieng Dennis",
    role: "Lecturer, CMU"
  },
  {
    id: 2,
    text: "CrownWrite has revolutionized how I approach content creation. The humanization is so natural that even I can't tell it was AI-processed. It's become essential to my workflow",
    highlights: ["revolutionized how I approach content creation", "humanization is so natural", "essential to my workflow"],
    author: "James Chen",
    role: "Content Strategist"
  },
  {
    id: 3,
    text: "As a freelance writer, bypassing AI detection while maintaining quality was crucial. CrownWrite delivers every single time. My clients have never been happier with my work",
    highlights: ["bypassing AI detection", "delivers every single time", "clients have never been happier"],
    author: "Maria Rodriguez",
    role: "Freelance Writer"
  },
  {
    id: 4,
    text: "The difference between CrownWrite and other tools is night and day. It doesn't just swap words - it actually makes the text sound human. Worth every penny",
    highlights: ["difference is night and day", "actually makes the text sound human", "Worth every penny"],
    author: "Alex Thompson",
    role: "Digital Marketer"
  },
  {
    id: 5,
    text: "Was skeptical at first, but CrownWrite proved me wrong. It helped me pass all AI detectors while keeping my authentic voice. This tool is a game changer for students",
    highlights: ["proved me wrong", "pass all AI detectors", "game changer for students"],
    author: "Emily Parker",
    role: "Graduate Student, MIT"
  },
  {
    id: 6,
    text: "Using CrownWrite has saved me hours of rewriting. The quality is consistent, the output is natural, and it's incredibly fast. Can't imagine working without it now",
    highlights: ["saved me hours", "quality is consistent", "incredibly fast"],
    author: "David Kim",
    role: "SEO Specialist"
  }
];

function renderHighlightedText(text: string, highlights: string[]) {
  const parts: Array<{ text: string; isHighlight: boolean }> = [];
  let remainingText = text;
  let processed = '';

  highlights.forEach(highlight => {
    const lowerText = remainingText.toLowerCase();
    const lowerHighlight = highlight.toLowerCase();
    const index = lowerText.indexOf(lowerHighlight);
    
    if (index !== -1) {
      // Add text before highlight
      if (index > 0) {
        parts.push({ text: remainingText.substring(0, index), isHighlight: false });
      }
      // Add highlight
      parts.push({ text: remainingText.substring(index, index + highlight.length), isHighlight: true });
      // Update remaining text
      remainingText = remainingText.substring(index + highlight.length);
    }
  });

  // Add remaining text
  if (remainingText) {
    parts.push({ text: remainingText, isHighlight: false });
  }

  return parts;
}

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const currentTestimonial = testimonials[currentIndex];
  const textParts = renderHighlightedText(currentTestimonial.text, currentTestimonial.highlights);

  return (
    <section style={{
      background: 'var(--bg)',
      padding: '120px 0',
      position: 'relative',
    }}>
      <div style={{
        maxWidth: '1100px',
        margin: '0 auto',
        padding: '0 40px',
      }}>
        {/* Header */}
        <div style={{
          textAlign: 'center',
          marginBottom: '80px',
        }}>
          <h2 style={{
            fontFamily: 'var(--font-sans)',
            fontSize: 'clamp(32px, 4vw, 44px)',
            fontWeight: 600,
            letterSpacing: '-1.5px',
            color: 'var(--ink)',
            marginBottom: '16px',
            lineHeight: 1.2,
          }}>
            Loved by Content Creators Worldwide
          </h2>
          <p style={{
            fontFamily: 'var(--font-sans)',
            fontSize: '16px',
            fontWeight: 400,
            color: 'var(--muted)',
            lineHeight: 1.6,
          }}>
            See what our users have to say about their experience with CrownWrite
          </p>
        </div>

        {/* Testimonial */}
        <div style={{
          position: 'relative',
          minHeight: '380px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
          <AnimatePresence mode="wait">
            <motion.div
              key={currentTestimonial.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              style={{
                textAlign: 'center',
                width: '100%',
              }}
            >
              {/* Quote */}
              <blockquote style={{
                fontFamily: 'var(--font-serif)',
                fontSize: 'clamp(24px, 3.2vw, 38px)',
                fontWeight: 400,
                fontStyle: 'italic',
                lineHeight: 1.65,
                color: 'var(--ink)',
                marginBottom: '56px',
                letterSpacing: '-0.5px',
                maxWidth: '900px',
                margin: '0 auto 56px',
              }}>
                {textParts.map((part, index) => (
                  part.isHighlight ? (
                    <span key={index} style={{
                      color: 'var(--brand)',
                      fontStyle: 'italic',
                    }}>
                      {part.text}
                    </span>
                  ) : (
                    <span key={index}>{part.text}</span>
                  )
                ))}
              </blockquote>

              {/* Author */}
              <div style={{
                marginTop: '48px',
              }}>
                <p style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: '16px',
                  fontWeight: 600,
                  color: 'var(--ink)',
                  letterSpacing: '-0.2px',
                  marginBottom: '6px',
                }}>
                  {currentTestimonial.author}
                </p>
                <p style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: '14px',
                  fontWeight: 400,
                  color: 'var(--muted)',
                  letterSpacing: '0.01em',
                }}>
                  {currentTestimonial.role}
                </p>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Navigation Dots */}
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: '72px',
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '4px',
            padding: '6px 12px',
            background: 'var(--surface)',
            border: '1px solid var(--border)',
            borderRadius: '99px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
          }}>
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                style={{
                  width: index === currentIndex ? '32px' : '8px',
                  height: '8px',
                  borderRadius: '99px',
                  background: index === currentIndex ? 'var(--brand)' : 'var(--border-2)',
                  transition: 'all 0.3s ease',
                  border: 'none',
                  cursor: 'pointer',
                  opacity: index === currentIndex ? 1 : 0.5,
                }}
                onMouseEnter={(e) => {
                  if (index !== currentIndex) {
                    e.currentTarget.style.opacity = '0.8';
                    e.currentTarget.style.background = 'var(--brand-light)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (index !== currentIndex) {
                    e.currentTarget.style.opacity = '0.5';
                    e.currentTarget.style.background = 'var(--border-2)';
                  }
                }}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
