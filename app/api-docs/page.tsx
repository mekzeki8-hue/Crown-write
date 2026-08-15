"use client";

import { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function ApiDocsPage() {
  const [activeEndpoint, setActiveEndpoint] = useState<string>("humanize");

  const codeExamples = {
    curl: `curl -X POST https://crownwrite.com/api/humanize \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "text": "Your AI-generated text here",
    "tone": "professional",
    "preserveFormatting": true
  }'`,
    javascript: `const response = await fetch('https://crownwrite.com/api/humanize', {
  method: 'POST',
  headers: {
    'Authorization': 'Bearer YOUR_API_KEY',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    text: 'Your AI-generated text here',
    tone: 'professional',
    preserveFormatting: true
  })
});

const data = await response.json();
console.log(data.humanizedText);`,
    python: `import requests

url = "https://crownwrite.com/api/humanize"
headers = {
    "Authorization": "Bearer YOUR_API_KEY",
    "Content-Type": "application/json"
}
payload = {
    "text": "Your AI-generated text here",
    "tone": "professional",
    "preserveFormatting": True
}

response = requests.post(url, json=payload, headers=headers)
result = response.json()
print(result['humanizedText'])`,
    php: `<?php
$url = 'https://crownwrite.com/api/humanize';
$data = [
    'text' => 'Your AI-generated text here',
    'tone' => 'professional',
    'preserveFormatting' => true
];

$ch = curl_init($url);
curl_setopt($ch, CURLOPT_POST, 1);
curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($data));
curl_setopt($ch, CURLOPT_HTTPHEADER, [
    'Authorization: Bearer YOUR_API_KEY',
    'Content-Type: application/json'
]);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

$response = curl_exec($ch);
curl_close($ch);

$result = json_decode($response, true);
echo $result['humanizedText'];
?>`
  };

  const [selectedLang, setSelectedLang] = useState<keyof typeof codeExamples>("curl");

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
        <h1 style={{
          fontSize: "clamp(36px, 5vw, 56px)",
          fontFamily: "var(--font-serif)",
          fontWeight: 600,
          marginBottom: 16,
        }}>CrownWrite API Documentation</h1>
        <p style={{
          fontSize: 18,
          color: "var(--ink-muted)",
          maxWidth: 700,
          margin: "0 auto",
        }}>
          Integrate human-like text generation into your applications with our simple REST API
        </p>
      </section>

      <div style={{
        maxWidth: 1400,
        margin: "0 auto",
        padding: "60px 32px",
        display: "grid",
        gridTemplateColumns: "280px 1fr",
        gap: 48,
      }}>

        {/* Sidebar Navigation */}
        <aside style={{
          position: "sticky",
          top: 100,
          height: "fit-content",
        }}>
          <nav>
            <h3 style={{ fontSize: 14, fontWeight: 600, marginBottom: 16, color: "var(--ink-muted)" }}>GETTING STARTED</h3>
            <ul style={{ listStyle: "none", padding: 0, margin: "0 0 32px" }}>
              {["Authentication", "Rate Limits", "Error Handling"].map(item => (
                <li key={item} style={{ marginBottom: 8 }}>
                  <a href={`#${item.toLowerCase().replace(" ", "-")}`} style={{
                    display: "block",
                    padding: "8px 12px",
                    color: "var(--ink)",
                    textDecoration: "none",
                    borderRadius: 6,
                    fontSize: 14,
                    transition: "background 0.2s",
                  }}
                  onMouseOver={(e) => e.currentTarget.style.background = "var(--bg-2)"}
                  onMouseOut={(e) => e.currentTarget.style.background = "transparent"}
                  >{item}</a>
                </li>
              ))}
            </ul>

            <h3 style={{ fontSize: 14, fontWeight: 600, marginBottom: 16, color: "var(--ink-muted)" }}>ENDPOINTS</h3>
            <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
              {["POST /humanize", "GET /credits", "GET /history"].map(item => (
                <li key={item} style={{ marginBottom: 8 }}>
                  <a href={`#${item.split(" ")[1].replace("/", "")}`} style={{
                    display: "block",
                    padding: "8px 12px",
                    color: "var(--ink)",
                    textDecoration: "none",
                    borderRadius: 6,
                    fontSize: 14,
                    fontFamily: "monospace",
                    transition: "background 0.2s",
                  }}
                  onMouseOver={(e) => e.currentTarget.style.background = "var(--bg-2)"}
                  onMouseOut={(e) => e.currentTarget.style.background = "transparent"}
                  >{item}</a>
                </li>
              ))}
            </ul>
          </nav>
        </aside>

        {/* Main Content */}
        <main style={{ minWidth: 0 }}>

          {/* Quick Start */}
          <section id="authentication" style={{ marginBottom: 64 }}>
            <h2 style={{ fontSize: 32, fontFamily: "var(--font-serif)", marginBottom: 16 }}>Authentication</h2>
            <p style={{ color: "var(--ink-muted)", marginBottom: 24, lineHeight: 1.6 }}>
              All API requests require authentication using an API key. Include your API key in the Authorization header:
            </p>
            <div style={{
              background: "#1e1e1e",
              color: "#d4d4d4",
              padding: 20,
              borderRadius: 8,
              fontFamily: "monospace",
              fontSize: 14,
              overflow: "auto",
            }}>
              <code>Authorization: Bearer YOUR_API_KEY</code>
            </div>
            <div style={{
              marginTop: 16,
              padding: 16,
              background: "#FFF3CD",
              border: "1px solid #FFE69C",
              borderRadius: 8,
              fontSize: 14,
            }}>
              <strong>🔑 Get your API key:</strong> Sign in to your dashboard at{" "}
              <a href="/dashboard" style={{ color: "var(--brand)" }}>crownwrite.com/dashboard</a>
            </div>
          </section>

          {/* Rate Limits */}
          <section id="rate-limits" style={{ marginBottom: 64 }}>
            <h2 style={{ fontSize: 32, fontFamily: "var(--font-serif)", marginBottom: 16 }}>Rate Limits</h2>
            <p style={{ color: "var(--ink-muted)", marginBottom: 24, lineHeight: 1.6 }}>
              API rate limits vary by plan. All responses include rate limit headers:
            </p>
            <div style={{
              background: "var(--surface)",
              border: "1px solid var(--border)",
              borderRadius: 8,
              overflow: "hidden",
            }}>
              <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead>
                  <tr style={{ background: "var(--bg-2)" }}>
                    <th style={{ padding: 16, textAlign: "left", borderBottom: "1px solid var(--border)" }}>Plan</th>
                    <th style={{ padding: 16, textAlign: "left", borderBottom: "1px solid var(--border)" }}>Requests/min</th>
                    <th style={{ padding: 16, textAlign: "left", borderBottom: "1px solid var(--border)" }}>Words/month</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td style={{ padding: 16, borderBottom: "1px solid var(--border)" }}>Free</td>
                    <td style={{ padding: 16, borderBottom: "1px solid var(--border)" }}>5</td>
                    <td style={{ padding: 16, borderBottom: "1px solid var(--border)" }}>5,000</td>
                  </tr>
                  <tr>
                    <td style={{ padding: 16, borderBottom: "1px solid var(--border)" }}>Pro</td>
                    <td style={{ padding: 16, borderBottom: "1px solid var(--border)" }}>30</td>
                    <td style={{ padding: 16, borderBottom: "1px solid var(--border)" }}>100,000</td>
                  </tr>
                  <tr>
                    <td style={{ padding: 16 }}>Enterprise</td>
                    <td style={{ padding: 16 }}>Custom</td>
                    <td style={{ padding: 16 }}>Unlimited</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* Error Handling */}
          <section id="error-handling" style={{ marginBottom: 64 }}>
            <h2 style={{ fontSize: 32, fontFamily: "var(--font-serif)", marginBottom: 16 }}>Error Handling</h2>
            <p style={{ color: "var(--ink-muted)", marginBottom: 24, lineHeight: 1.6 }}>
              The API uses conventional HTTP response codes and returns JSON error responses:
            </p>
            <div style={{
              background: "var(--surface)",
              border: "1px solid var(--border)",
              borderRadius: 8,
              padding: 24,
            }}>
              <div style={{ marginBottom: 20 }}>
                <strong style={{ color: "#27AE60" }}>200 OK</strong> - Success
              </div>
              <div style={{ marginBottom: 20 }}>
                <strong style={{ color: "#F39C12" }}>400 Bad Request</strong> - Invalid parameters
              </div>
              <div style={{ marginBottom: 20 }}>
                <strong style={{ color: "#E74C3C" }}>401 Unauthorized</strong> - Invalid API key
              </div>
              <div style={{ marginBottom: 20 }}>
                <strong style={{ color: "#E74C3C" }}>429 Too Many Requests</strong> - Rate limit exceeded
              </div>
              <div>
                <strong style={{ color: "#E74C3C" }}>500 Server Error</strong> - Internal server error
              </div>
            </div>
          </section>

          {/* POST /humanize */}
          <section id="humanize" style={{ marginBottom: 64 }}>
            <div style={{
              background: "var(--brand)",
              color: "white",
              padding: "12px 20px",
              borderRadius: "8px 8px 0 0",
              fontFamily: "monospace",
              fontSize: 18,
              fontWeight: 600,
            }}>
              POST /api/humanize
            </div>
            <div style={{
              background: "var(--surface)",
              border: "1px solid var(--border)",
              borderTop: "none",
              borderRadius: "0 0 8px 8px",
              padding: 24,
            }}>
              <p style={{ marginBottom: 24, lineHeight: 1.6 }}>
                Transform AI-generated text into natural, human-like prose.
              </p>

              <h3 style={{ fontSize: 18, fontWeight: 600, marginBottom: 16 }}>Request Body</h3>
              <table style={{ width: "100%", marginBottom: 32, fontSize: 14 }}>
                <tbody>
                  <tr style={{ borderBottom: "1px solid var(--border)" }}>
                    <td style={{ padding: "12px 0", fontFamily: "monospace", color: "var(--brand)" }}>text</td>
                    <td style={{ padding: "12px 0" }}>string</td>
                    <td style={{ padding: "12px 0", color: "var(--ink-muted)" }}>Required. The text to humanize (max 5000 words)</td>
                  </tr>
                  <tr style={{ borderBottom: "1px solid var(--border)" }}>
                    <td style={{ padding: "12px 0", fontFamily: "monospace", color: "var(--brand)" }}>tone</td>
                    <td style={{ padding: "12px 0" }}>string</td>
                    <td style={{ padding: "12px 0", color: "var(--ink-muted)" }}>Optional. One of: auto, academic, professional, creative, casual, technical</td>
                  </tr>
                  <tr>
                    <td style={{ padding: "12px 0", fontFamily: "monospace", color: "var(--brand)" }}>preserveFormatting</td>
                    <td style={{ padding: "12px 0" }}>boolean</td>
                    <td style={{ padding: "12px 0", color: "var(--ink-muted)" }}>Optional. Default: true. Preserve line breaks and structure</td>
                  </tr>
                </tbody>
              </table>

              <h3 style={{ fontSize: 18, fontWeight: 600, marginBottom: 16 }}>Example Request</h3>
              
              {/* Language Tabs */}
              <div style={{ display: "flex", gap: 8, marginBottom: 16 }}>
                {(["curl", "javascript", "python", "php"] as const).map(lang => (
                  <button
                    key={lang}
                    onClick={() => setSelectedLang(lang)}
                    style={{
                      padding: "8px 16px",
                      background: selectedLang === lang ? "var(--brand)" : "var(--bg-2)",
                      color: selectedLang === lang ? "white" : "var(--ink)",
                      border: "none",
                      borderRadius: 6,
                      cursor: "pointer",
                      fontSize: 14,
                      fontWeight: 500,
                      textTransform: "uppercase",
                    }}
                  >
                    {lang}
                  </button>
                ))}
              </div>

              <div style={{
                background: "#1e1e1e",
                color: "#d4d4d4",
                padding: 20,
                borderRadius: 8,
                fontFamily: "monospace",
                fontSize: 13,
                overflow: "auto",
                lineHeight: 1.6,
                marginBottom: 24,
              }}>
                <pre style={{ margin: 0 }}>{codeExamples[selectedLang]}</pre>
              </div>

              <h3 style={{ fontSize: 18, fontWeight: 600, marginBottom: 16 }}>Response</h3>
              <div style={{
                background: "#1e1e1e",
                color: "#d4d4d4",
                padding: 20,
                borderRadius: 8,
                fontFamily: "monospace",
                fontSize: 13,
                overflow: "auto",
                lineHeight: 1.6,
              }}>
                <pre style={{ margin: 0 }}>{`{
  "success": true,
  "humanizedText": "Your humanized text here...",
  "originalWordCount": 150,
  "humanizedWordCount": 152,
  "creditsUsed": 15,
  "remainingCredits": 285,
  "processingTime": 1.24
}`}</pre>
              </div>
            </div>
          </section>

          {/* GET /credits */}
          <section id="credits" style={{ marginBottom: 64 }}>
            <div style={{
              background: "#27AE60",
              color: "white",
              padding: "12px 20px",
              borderRadius: "8px 8px 0 0",
              fontFamily: "monospace",
              fontSize: 18,
              fontWeight: 600,
            }}>
              GET /api/credits
            </div>
            <div style={{
              background: "var(--surface)",
              border: "1px solid var(--border)",
              borderTop: "none",
              borderRadius: "0 0 8px 8px",
              padding: 24,
            }}>
              <p style={{ marginBottom: 24, lineHeight: 1.6 }}>
                Check your remaining credits and usage statistics.
              </p>

              <h3 style={{ fontSize: 18, fontWeight: 600, marginBottom: 16 }}>Response</h3>
              <div style={{
                background: "#1e1e1e",
                color: "#d4d4d4",
                padding: 20,
                borderRadius: 8,
                fontFamily: "monospace",
                fontSize: 13,
                overflow: "auto",
                lineHeight: 1.6,
              }}>
                <pre style={{ margin: 0 }}>{`{
  "credits": 285,
  "plan": "pro",
  "wordsUsedThisMonth": 12450,
  "resetDate": "2026-09-01T00:00:00Z"
}`}</pre>
              </div>
            </div>
          </section>

          {/* GET /history */}
          <section id="history" style={{ marginBottom: 64 }}>
            <div style={{
              background: "#27AE60",
              color: "white",
              padding: "12px 20px",
              borderRadius: "8px 8px 0 0",
              fontFamily: "monospace",
              fontSize: 18,
              fontWeight: 600,
            }}>
              GET /api/history
            </div>
            <div style={{
              background: "var(--surface)",
              border: "1px solid var(--border)",
              borderTop: "none",
              borderRadius: "0 0 8px 8px",
              padding: 24,
            }}>
              <p style={{ marginBottom: 24, lineHeight: 1.6 }}>
                Retrieve your humanization history (last 30 days).
              </p>

              <h3 style={{ fontSize: 18, fontWeight: 600, marginBottom: 16 }}>Query Parameters</h3>
              <table style={{ width: "100%", marginBottom: 24, fontSize: 14 }}>
                <tbody>
                  <tr style={{ borderBottom: "1px solid var(--border)" }}>
                    <td style={{ padding: "12px 0", fontFamily: "monospace", color: "var(--brand)" }}>limit</td>
                    <td style={{ padding: "12px 0" }}>integer</td>
                    <td style={{ padding: "12px 0", color: "var(--ink-muted)" }}>Optional. Max items to return (default: 50, max: 100)</td>
                  </tr>
                  <tr>
                    <td style={{ padding: "12px 0", fontFamily: "monospace", color: "var(--brand)" }}>page</td>
                    <td style={{ padding: "12px 0" }}>integer</td>
                    <td style={{ padding: "12px 0", color: "var(--ink-muted)" }}>Optional. Page number for pagination (default: 1)</td>
                  </tr>
                </tbody>
              </table>

              <h3 style={{ fontSize: 18, fontWeight: 600, marginBottom: 16 }}>Response</h3>
              <div style={{
                background: "#1e1e1e",
                color: "#d4d4d4",
                padding: 20,
                borderRadius: 8,
                fontFamily: "monospace",
                fontSize: 13,
                overflow: "auto",
                lineHeight: 1.6,
              }}>
                <pre style={{ margin: 0 }}>{`{
  "history": [
    {
      "id": "hist_abc123",
      "createdAt": "2026-08-12T14:30:00Z",
      "wordCount": 150,
      "tone": "professional",
      "creditsUsed": 15
    }
  ],
  "total": 45,
  "page": 1,
  "hasMore": false
}`}</pre>
              </div>
            </div>
          </section>

          {/* Support */}
          <section style={{
            background: "var(--bg-2)",
            padding: 32,
            borderRadius: 12,
            textAlign: "center",
          }}>
            <h3 style={{ fontSize: 24, marginBottom: 12 }}>Need Help?</h3>
            <p style={{ color: "var(--ink-muted)", marginBottom: 24 }}>
              Our developer support team is here to help you integrate CrownWrite
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
              Contact Support
            </a>
          </section>

        </main>
      </div>

      <Footer />
    </div>
  );
}
