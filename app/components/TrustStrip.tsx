"use client";

const DETECTORS = [
  { name: "Turnitin", logo: "download-13.png" },
  { name: "Originality.ai", logo: "orignality.png" },
  { name: "GPTZero", logo: "GPTzero.png" },
  { name: "Copyleaks", logo: "copyleaks.png" },
  { name: "Pangram", logo: "pangram.png" },
  { name: "QuillBot", logo: "quilbot.png" },
  { name: "Winston AI", logo: "winstonai.png" },
  { name: "ZeroGPT", logo: "ZeroGPT.png" },
  { name: "Writer", logo: "writer.png" },
  { name: "Smodin", logo: "smodin.png" },
  { name: "Sapling", logo: "sapling.png" },
  { name: "Undetectable.ai", logo: "undetectableai.png" },
  { name: "Scribbr", logo: "scribber.png" },
  { name: "Grammarly AI", logo: "grammarly.png" },
];

export default function TrustStrip() {
  return (
    <section style={{
      background: "var(--surface)",
      borderTop: "1px solid var(--border)",
      borderBottom: "1px solid var(--border)",
      padding: "48px 0",
    }}>
      <div style={{
        maxWidth: 1200,
        margin: "0 auto",
        padding: "0 32px",
        textAlign: "center",
      }}>
        {/* Heading */}
        <h3 style={{
          fontSize: 13,
          fontWeight: 600,
          letterSpacing: "0.1em",
          textTransform: "uppercase",
          color: "var(--subtle)",
          marginBottom: 32,
        }}>
          OUR AI BYPASSES INDUSTRY STANDARD DETECTORS
        </h3>

        {/* Detector logos */}
        <div style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: 40,
          flexWrap: "wrap",
        }}>
          {DETECTORS.map((detector, i) => (
            <div
              key={i}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                opacity: 0.6,
                transition: "opacity 0.2s",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.opacity = "1";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.opacity = "0.6";
              }}
            >
              {/* Logo image */}
              <div
                style={{
                  width: 32,
                  height: 32,
                  borderRadius: 6,
                  background: "var(--bg-2)",
                  border: "1px solid var(--border)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  padding: 4,
                  overflow: "hidden",
                }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img 
                  src={`/detectors/${detector.logo}`}
                  alt={detector.name}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "contain",
                  }}
                />
              </div>
              {/* Detector name */}
              <span
                style={{
                  fontSize: 14,
                  fontWeight: 500,
                  color: "var(--ink-2)",
                }}
              >
                {detector.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
