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
    text: ""I recommend CrownWrite to all my students. It's been an absolute game changer for refining their academic writing while maintaining authenticity and consistently passing detection systems."",
    highlights: ["game changer"],
    author: "Dr. Marcus Chen",
    role: "Professor of English, Columbia University"
  },
  {
    id: 2,
    text: ""This tool has completely transformed my content workflow. The humanization is so seamless that I honestly can't distinguish it from naturally written text. CrownWrite has become absolutely essential to how I create content."",
    highlights: ["completely transformed"],
    author: "Sarah Goldstein",
    role: "Content Director, Manhattan"
  },
  {
    id: 3,
    text: ""As a freelance writer in New York, achieving good results with AI detection while maintaining quality was critical. CrownWrite delivers consistently - every single time. My clients have never been more satisfied with my submissions."",
    highlights: ["delivers consistently"],
    author: "Jamal Washington",
    role: "Freelance Writer, Brooklyn"
  },
  {
    id: 4,
    text: ""The difference between CrownWrite and competing tools is absolutely night and day. It doesn't just swap synonyms - it genuinely makes text sound naturally human. Worth every single penny."",
    highlights: ["night and day"],
    author: "Rachel Bernstein",
    role: "Digital Marketing Consultant"
  },
  {
    id: 5,
    text: ""I was honestly skeptical at first, but CrownWrite completely proved me wrong. It helped me pass every AI detector while preserving my authentic voice. This is genuinely a game changer for graduate students."",
    highlights: ["proved me wrong"],
    author: "Michael Torres",
    role: "PhD Candidate, NYU"
  },
  {
    id: 6,
    text: ""Using CrownWrite has literally saved me countless hours of manual rewriting. The quality is remarkably consistent, the output reads completely natural, and the processing is incredibly fast. I genuinely can't imagine my workflow without it."",
    highlights: ["saved me countless hours"],
    author: "Jennifer Park",
    role: "SEO Specialist, Queens"
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
        maxWidth: '1300px', // Increased from 1100px
        margin: '0 auto',
        padding: '0 80px', // Increased from 40px
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
                maxWidth: '1000px', // Increased from 900px
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
