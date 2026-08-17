"use client";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function ResponsibleUsePage() {
  return (
    <div style={{ background: "var(--bg)", color: "var(--ink)", minHeight: "100vh" }}>
      <Navbar />
      
      <div style={{ maxWidth: 900, margin: "0 auto", padding: "120px 32px 80px" }}>
        <h1 style={{
          fontSize: 48,
          fontFamily: "var(--font-serif)",
          marginBottom: 16,
        }}>Responsible Use Guidelines</h1>
        <p style={{ color: "var(--ink-muted)", marginBottom: 48, fontSize: 18 }}>
          How to use CrownWrite ethically and effectively
        </p>

        <div style={{ fontSize: 16, lineHeight: 1.8, color: "var(--ink)" }}>
          
          <h2 style={{ fontSize: 28, marginTop: 48, marginBottom: 16, fontWeight: 600 }}>Our Philosophy</h2>
          <p style={{ marginBottom: 24 }}>
            CrownWrite is designed to enhance human creativity, not replace it. We believe AI should 
            be a tool that amplifies your voice and productivity—not a way to deceive or mislead readers.
          </p>
          <p style={{ marginBottom: 24 }}>
            This guide outlines how to use our Rewriting technology responsibly and in line with 
            ethical standards.
          </p>

          <div style={{
            padding: 24,
            background: "#E3F2FD",
            borderLeft: "4px solid #2196F3",
            borderRadius: 8,
            marginBottom: 32,
          }}>
            <p style={{ margin: 0, fontWeight: 600, color: "#1976D2" }}>
              Core Principle: Transparency over deception. Use CrownWrite to improve your writing, 
              not to misrepresent authorship.
            </p>
          </div>

          <h2 style={{ fontSize: 28, marginTop: 48, marginBottom: 16, fontWeight: 600 }}>✅ Recommended Uses</h2>
          
          <h3 style={{ fontSize: 20, marginTop: 32, marginBottom: 12, fontWeight: 600 }}>1. Improving Your Own Writing</h3>
          <p style={{ marginBottom: 24 }}>
            Use CrownWrite to refine AI-assisted drafts you've created. AI is your brainstorming 
            partner, CrownWrite makes the output sound like you.
          </p>

          <h3 style={{ fontSize: 20, marginTop: 32, marginBottom: 12, fontWeight: 600 }}>2. Content Marketing & SEO</h3>
          <p style={{ marginBottom: 24 }}>
            Create blog posts, product descriptions, and marketing copy that sounds natural and 
            engages readers. Ensure your brand voice remains authentic.
          </p>

          <h3 style={{ fontSize: 20, marginTop: 32, marginBottom: 12, fontWeight: 600 }}>3. Business Communications</h3>
          <p style={{ marginBottom: 24 }}>
            Polish emails, reports, and presentations. Make formal communications more natural 
            while maintaining professionalism.
          </p>

          <h3 style={{ fontSize: 20, marginTop: 32, marginBottom: 12, fontWeight: 600 }}>4. Academic Research Assistance</h3>
          <p style={{ marginBottom: 24 }}>
            Use AI to help structure ideas and CrownWrite to refine your prose—but always cite 
            sources and ensure your own understanding. Check your institution's AI policies.
          </p>

          <h3 style={{ fontSize: 20, marginTop: 32, marginBottom: 12, fontWeight: 600 }}>5. Creative Writing</h3>
          <p style={{ marginBottom: 24 }}>
            Overcome writer's block, explore different tones, and refine storytelling. The creative 
            direction should always be yours.
          </p>

          <h2 style={{ fontSize: 28, marginTop: 48, marginBottom: 16, fontWeight: 600 }}>Use With Caution</h2>

          <h3 style={{ fontSize: 20, marginTop: 32, marginBottom: 12, fontWeight: 600 }}>Academic Assignments</h3>
          <p style={{ marginBottom: 24 }}>
            Many institutions have specific AI policies. Some allow AI-assisted writing with disclosure, 
            others prohibit it entirely. <strong>Always check your school's guidelines</strong> and 
            disclose AI use when required.
          </p>

          <h3 style={{ fontSize: 20, marginTop: 32, marginBottom: 12, fontWeight: 600 }}>Professional Certifications</h3>
          <p style={{ marginBottom: 24 }}>
            Certification exams and professional writing samples should reflect your genuine abilities. 
            Using AI to misrepresent your skills is unethical.
          </p>

          <h3 style={{ fontSize: 20, marginTop: 32, marginBottom: 12, fontWeight: 600 }}>Journalism & News</h3>
          <p style={{ marginBottom: 24 }}>
            Journalistic integrity requires accurate attribution and fact-checking. If using AI 
            assistance, clearly disclose it and verify all facts independently.
          </p>

          <h2 style={{ fontSize: 28, marginTop: 48, marginBottom: 16, fontWeight: 600 }}>❌ Prohibited Uses</h2>
          
          <p style={{ marginBottom: 16 }}>
            We explicitly prohibit using CrownWrite for:
          </p>
          <ul style={{ marginLeft: 32, marginBottom: 24 }}>
            <li style={{ marginBottom: 8 }}>Generating misinformation, fake news, or propaganda</li>
            <li style={{ marginBottom: 8 }}>Creating spam, phishing content, or scam materials</li>
            <li style={{ marginBottom: 8 }}>Producing harmful, abusive, or illegal content</li>
            <li style={{ marginBottom: 8 }}>Impersonating others or creating fake testimonials</li>
            <li style={{ marginBottom: 8 }}>Bypassing content moderation systems maliciously</li>
            <li style={{ marginBottom: 8 }}>Academic dishonesty in violation of institutional policies</li>
            <li style={{ marginBottom: 8 }}>Generating content that violates copyright or plagiarizes</li>
          </ul>

          <div style={{
            padding: 24,
            background: "#FFEBEE",
            borderLeft: "4px solid #E74C3C",
            borderRadius: 8,
            marginBottom: 32,
          }}>
            <p style={{ margin: 0, fontWeight: 600, color: "#C62828" }}>
              Warning: Violation of these guidelines may result in immediate account suspension or termination.
            </p>
          </div>

          <h2 style={{ fontSize: 28, marginTop: 48, marginBottom: 16, fontWeight: 600 }}>Best Practices</h2>
          
          <h3 style={{ fontSize: 20, marginTop: 32, marginBottom: 12, fontWeight: 600 }}>1. Maintain Authenticity</h3>
          <p style={{ marginBottom: 24 }}>
            Your voice, your ideas. Use CrownWrite to enhance, not replace, your authentic expression.
          </p>

          <h3 style={{ fontSize: 20, marginTop: 32, marginBottom: 12, fontWeight: 600 }}>2. Fact-Check Everything</h3>
          <p style={{ marginBottom: 24 }}>
            AI can hallucinate facts. Always verify claims, statistics, and quotes before publishing.
          </p>

          <h3 style={{ fontSize: 20, marginTop: 32, marginBottom: 12, fontWeight: 600 }}>3. Disclose When Required</h3>
          <p style={{ marginBottom: 24 }}>
            When policies or ethics require disclosure of AI use (academic work, journalism, etc.), 
            always be transparent.
          </p>

          <h3 style={{ fontSize: 20, marginTop: 32, marginBottom: 12, fontWeight: 600 }}>4. Respect Copyright</h3>
          <p style={{ marginBottom: 24 }}>
            Don't Rewrite copyrighted content to pass it off as your own. That's plagiarism, 
            regardless of Rewriting.
          </p>

          <h3 style={{ fontSize: 20, marginTop: 32, marginBottom: 12, fontWeight: 600 }}>5. Consider Your Audience</h3>
          <p style={{ marginBottom: 24 }}>
            Ask yourself: "Would my readers feel misled if they knew AI was involved?" If yes, 
            reconsider or add disclosure.
          </p>

          <h2 style={{ fontSize: 28, marginTop: 48, marginBottom: 16, fontWeight: 600 }}>Academic Integrity</h2>
          <p style={{ marginBottom: 16 }}>
            Educational institutions have varying AI policies:
          </p>
          <ul style={{ marginLeft: 32, marginBottom: 24 }}>
            <li style={{ marginBottom: 8 }}><strong>Allowed with disclosure:</strong> Many schools permit AI-assisted writing if properly cited</li>
            <li style={{ marginBottom: 8 }}><strong>Restricted use:</strong> Some allow AI for brainstorming but not final drafts</li>
            <li style={{ marginBottom: 8 }}><strong>Complete prohibition:</strong> Others ban AI tools entirely for academic work</li>
          </ul>
          <p style={{ marginBottom: 24 }}>
            <strong>Your responsibility:</strong> Know your institution's policy and follow it. Ignorance 
            is not a defense for academic misconduct.
          </p>

          <h2 style={{ fontSize: 28, marginTop: 48, marginBottom: 16, fontWeight: 600 }}>Reporting Misuse</h2>
          <p style={{ marginBottom: 24 }}>
            If you encounter content you believe was created with CrownWrite for harmful or prohibited 
            purposes, report it to{" "}
            <a href="mailto:crownwrite.Rewriter@gmail.com" style={{ color: "var(--brand)" }}>
              crownwrite.Rewriter@gmail.com
            </a>.
          </p>

          <h2 style={{ fontSize: 28, marginTop: 48, marginBottom: 16, fontWeight: 600 }}>Our Commitment</h2>
          <p style={{ marginBottom: 24 }}>
            We're committed to building AI tools that enhance human creativity responsibly. We 
            continuously monitor for misuse, cooperate with institutions investigating violations, 
            and improve our guidelines based on community feedback.
          </p>

          <div style={{
            padding: 32,
            background: "var(--bg-2)",
            borderRadius: 12,
            border: "1px solid var(--border)",
            textAlign: "center",
            marginTop: 48,
          }}>
            <h3 style={{ fontSize: 24, marginBottom: 16 }}>Questions About Responsible Use?</h3>
            <p style={{ marginBottom: 24, color: "var(--ink-muted)" }}>
              We're here to help you use CrownWrite ethically
            </p>
            <a
              href="/contact"
              style={{
                display: "inline-block",
                padding: "12px 32px",
                background: "var(--brand)",
                color: "white",
                borderRadius: 8,
                textDecoration: "none",
                fontWeight: 600,
              }}
            >
              Contact Us
            </a>
          </div>

        </div>
      </div>

      <Footer />
    </div>
  );
}
