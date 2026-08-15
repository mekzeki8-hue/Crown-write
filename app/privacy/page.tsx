"use client";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function PrivacyPage() {
  return (
    <div style={{ background: "var(--bg)", color: "var(--ink)", minHeight: "100vh" }}>
      <Navbar />
      
      <div style={{ maxWidth: 900, margin: "0 auto", padding: "120px 32px 80px" }}>
        <h1 style={{
          fontSize: 48,
          fontFamily: "var(--font-serif)",
          marginBottom: 16,
        }}>Privacy Policy</h1>
        <p style={{ color: "var(--ink-muted)", marginBottom: 48 }}>
          Last updated: August 12, 2026
        </p>

        <div style={{ fontSize: 16, lineHeight: 1.8, color: "var(--ink)" }}>
          
          <h2 style={{ fontSize: 28, marginTop: 48, marginBottom: 16, fontWeight: 600 }}>1. Introduction</h2>
          <p style={{ marginBottom: 24 }}>
            At CrownWrite, we take your privacy seriously. This Privacy Policy explains how we collect, 
            use, and protect your personal information. We are committed to transparency and giving you 
            control over your data.
          </p>

          <h2 style={{ fontSize: 28, marginTop: 48, marginBottom: 16, fontWeight: 600 }}>2. Information We Collect</h2>
          
          <h3 style={{ fontSize: 20, marginTop: 32, marginBottom: 12, fontWeight: 600 }}>Account Information</h3>
          <ul style={{ marginLeft: 32, marginBottom: 24 }}>
            <li style={{ marginBottom: 8 }}>Email address</li>
            <li style={{ marginBottom: 8 }}>Name (optional)</li>
            <li style={{ marginBottom: 8 }}>Password (encrypted)</li>
            <li style={{ marginBottom: 8 }}>Profile photo (optional)</li>
          </ul>

          <h3 style={{ fontSize: 20, marginTop: 32, marginBottom: 12, fontWeight: 600 }}>Usage Data</h3>
          <ul style={{ marginLeft: 32, marginBottom: 24 }}>
            <li style={{ marginBottom: 8 }}>Word count processed</li>
            <li style={{ marginBottom: 8 }}>Features used (tone selection, etc.)</li>
            <li style={{ marginBottom: 8 }}>API calls and timestamps</li>
            <li style={{ marginBottom: 8 }}>Device and browser information</li>
          </ul>

          <h3 style={{ fontSize: 20, marginTop: 32, marginBottom: 12, fontWeight: 600 }}>Payment Information</h3>
          <p style={{ marginBottom: 24 }}>
            We use Stripe for payment processing. We never store your full credit card details. 
            Stripe retains card information according to their{" "}
            <a href="https://stripe.com/privacy" target="_blank" rel="noopener" style={{ color: "var(--brand)" }}>
              Privacy Policy
            </a>.
          </p>

          <h2 style={{ fontSize: 28, marginTop: 48, marginBottom: 16, fontWeight: 600 }}>3. What We Do NOT Collect</h2>
          <div style={{
            padding: 24,
            background: "#E8F5E9",
            borderLeft: "4px solid #27AE60",
            borderRadius: 8,
            marginBottom: 24,
          }}>
            <p style={{ margin: 0, fontWeight: 600, color: "#27AE60" }}>
              Privacy First: We DO NOT store, log, or retain the text content you submit for humanization.
            </p>
          </div>
          <p style={{ marginBottom: 24 }}>
            Your submitted text is processed in memory and immediately deleted after humanization. 
            We never use your content for model training or any other purpose.
          </p>

          <h2 style={{ fontSize: 28, marginTop: 48, marginBottom: 16, fontWeight: 600 }}>4. How We Use Your Information</h2>
          <ul style={{ marginLeft: 32, marginBottom: 24 }}>
            <li style={{ marginBottom: 8 }}>To provide and improve the Service</li>
            <li style={{ marginBottom: 8 }}>To process payments and manage subscriptions</li>
            <li style={{ marginBottom: 8 }}>To send account-related notifications</li>
            <li style={{ marginBottom: 8 }}>To respond to support requests</li>
            <li style={{ marginBottom: 8 }}>To detect and prevent fraud or abuse</li>
            <li style={{ marginBottom: 8 }}>To analyze usage patterns (aggregate data only)</li>
          </ul>

          <h2 style={{ fontSize: 28, marginTop: 48, marginBottom: 16, fontWeight: 600 }}>5. Data Sharing and Disclosure</h2>
          <p style={{ marginBottom: 16 }}>
            We do not sell your personal information. We may share data only in these cases:
          </p>
          <ul style={{ marginLeft: 32, marginBottom: 24 }}>
            <li style={{ marginBottom: 8 }}><strong>Service Providers:</strong> Stripe (payments), Supabase (authentication), Google Analytics (anonymized usage)</li>
            <li style={{ marginBottom: 8 }}><strong>Legal Requirements:</strong> When required by law or to protect our rights</li>
            <li style={{ marginBottom: 8 }}><strong>Business Transfers:</strong> In case of merger, acquisition, or asset sale</li>
          </ul>

          <h2 style={{ fontSize: 28, marginTop: 48, marginBottom: 16, fontWeight: 600 }}>6. Data Retention</h2>
          <p style={{ marginBottom: 16 }}>
            We retain your data as follows:
          </p>
          <ul style={{ marginLeft: 32, marginBottom: 24 }}>
            <li style={{ marginBottom: 8 }}><strong>Account Data:</strong> Until you delete your account</li>
            <li style={{ marginBottom: 8 }}><strong>Usage Metadata:</strong> 24 months for analytics</li>
            <li style={{ marginBottom: 8 }}><strong>Submitted Text:</strong> Immediately deleted after processing</li>
            <li style={{ marginBottom: 8 }}><strong>Payment Records:</strong> 7 years for tax compliance</li>
          </ul>

          <h2 style={{ fontSize: 28, marginTop: 48, marginBottom: 16, fontWeight: 600 }}>7. Your Rights (GDPR & CCPA)</h2>
          <p style={{ marginBottom: 16 }}>
            You have the right to:
          </p>
          <ul style={{ marginLeft: 32, marginBottom: 24 }}>
            <li style={{ marginBottom: 8 }}>Access your personal data</li>
            <li style={{ marginBottom: 8 }}>Correct inaccurate information</li>
            <li style={{ marginBottom: 8 }}>Delete your account and data</li>
            <li style={{ marginBottom: 8 }}>Export your data (data portability)</li>
            <li style={{ marginBottom: 8 }}>Opt-out of marketing communications</li>
            <li style={{ marginBottom: 8 }}>Restrict or object to processing</li>
          </ul>
          <p style={{ marginBottom: 24 }}>
            To exercise these rights, email{" "}
            <a href="mailto:crownwrite.humanizer@gmail.com" style={{ color: "var(--brand)" }}>
              crownwrite.humanizer@gmail.com
            </a>.
          </p>

          <h2 style={{ fontSize: 28, marginTop: 48, marginBottom: 16, fontWeight: 600 }}>8. Security</h2>
          <p style={{ marginBottom: 24 }}>
            We implement industry-standard security measures including:
          </p>
          <ul style={{ marginLeft: 32, marginBottom: 24 }}>
            <li style={{ marginBottom: 8 }}>TLS/SSL encryption for data in transit</li>
            <li style={{ marginBottom: 8 }}>AES-256 encryption for data at rest</li>
            <li style={{ marginBottom: 8 }}>Regular security audits and penetration testing</li>
            <li style={{ marginBottom: 8 }}>Two-factor authentication (2FA) support</li>
            <li style={{ marginBottom: 8 }}>Employee access controls and training</li>
          </ul>

          <h2 style={{ fontSize: 28, marginTop: 48, marginBottom: 16, fontWeight: 600 }}>9. Cookies and Tracking</h2>
          <p style={{ marginBottom: 16 }}>
            We use cookies for:
          </p>
          <ul style={{ marginLeft: 32, marginBottom: 24 }}>
            <li style={{ marginBottom: 8 }}><strong>Essential:</strong> Authentication and security</li>
            <li style={{ marginBottom: 8 }}><strong>Functional:</strong> Preferences and settings</li>
            <li style={{ marginBottom: 8 }}><strong>Analytics:</strong> Anonymized usage data (can be disabled)</li>
          </ul>
          <p style={{ marginBottom: 24 }}>
            You can control cookies through your browser settings.
          </p>

          <h2 style={{ fontSize: 28, marginTop: 48, marginBottom: 16, fontWeight: 600 }}>10. Children's Privacy</h2>
          <p style={{ marginBottom: 24 }}>
            Our Service is not intended for users under 13. We do not knowingly collect data from 
            children. If you believe a child has provided information, contact us immediately.
          </p>

          <h2 style={{ fontSize: 28, marginTop: 48, marginBottom: 16, fontWeight: 600 }}>11. International Data Transfers</h2>
          <p style={{ marginBottom: 24 }}>
            Your data may be processed in the United States or other countries. We use Standard 
            Contractual Clauses (SCCs) approved by the EU Commission for international transfers.
          </p>

          <h2 style={{ fontSize: 28, marginTop: 48, marginBottom: 16, fontWeight: 600 }}>12. Changes to This Policy</h2>
          <p style={{ marginBottom: 24 }}>
            We may update this Privacy Policy. Significant changes will be communicated via email. 
            Continued use after changes constitutes acceptance.
          </p>

          <h2 style={{ fontSize: 28, marginTop: 48, marginBottom: 16, fontWeight: 600 }}>13. Contact Us</h2>
          <p style={{ marginBottom: 48 }}>
            Questions about privacy? Contact our Data Protection Officer:<br/>
            Email: <a href="mailto:crownwrite.humanizer@gmail.com" style={{ color: "var(--brand)" }}>crownwrite.humanizer@gmail.com</a><br/>
            Address: CrownWrite Inc., 123 AI Street, San Francisco, CA 94103
          </p>

          <div style={{
            padding: 24,
            background: "var(--bg-2)",
            borderRadius: 12,
            border: "1px solid var(--border)",
          }}>
            <p style={{ margin: 0, fontSize: 14, color: "var(--ink-muted)" }}>
              EU Users: For EU users, you have additional rights under GDPR. Contact our EU representative 
              for data subject requests.
            </p>
          </div>

        </div>
      </div>

      <Footer />
    </div>
  );
}
