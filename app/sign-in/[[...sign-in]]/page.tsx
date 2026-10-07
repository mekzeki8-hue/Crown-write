import { SignIn } from '@clerk/nextjs';

export default function SignInPage() {
  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      background: 'var(--bg)',
    }}>
      {/* Left Side - Beautiful Branding */}
      <div style={{
        flex: 1,
        background: 'linear-gradient(135deg, #C09A72 0%, #E5D4B8 50%, #C09A72 100%)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 60,
        position: 'relative',
        overflow: 'hidden',
      }}>
        {/* Background Pattern */}
        <div style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `
            radial-gradient(circle at 20% 30%, rgba(255,255,255,0.15) 0%, transparent 40%),
            radial-gradient(circle at 80% 70%, rgba(255,255,255,0.1) 0%, transparent 40%)
          `,
        }} />

        {/* Content */}
        <div style={{ position: 'relative', zIndex: 1, textAlign: 'center', maxWidth: 520 }}>
          {/* Logo */}
          <div style={{
            width: 100,
            height: 100,
            borderRadius: 24,
            background: 'rgba(255,255,255,0.95)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 40px',
            boxShadow: '0 25px 70px rgba(0,0,0,0.2)',
            backdropFilter: 'blur(10px)',
          }}>
            <img src="/logo.png" alt="CrownWrite" style={{ width: '70%', height: '70%', objectFit: 'contain' }} />
          </div>

          <h1 style={{
            fontSize: 48,
            fontWeight: 800,
            color: 'white',
            marginBottom: 20,
            lineHeight: 1.2,
            letterSpacing: '-0.02em',
          }}>
            Transform AI Text into<br />Authentic Human Writing
          </h1>
          <p style={{
            fontSize: 19,
            color: 'rgba(255,255,255,0.95)',
            lineHeight: 1.7,
            marginBottom: 48,
            fontWeight: 400,
          }}>
            Advanced AI Humanization that bypasses all major detection tools while maintaining your message's clarity and authenticity.
          </p>

          {/* Features */}
          <div style={{ 
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: 20,
            textAlign: 'left'
          }}>
            {[
              { title: 'Precision Humanization', desc: 'Fine-tuned AI model' },
              { title: 'Undetectable Output', desc: 'Bypass 14+ detectors' },
              { title: 'Multiple Tones', desc: '7 writing styles' },
              { title: 'Instant Results', desc: 'Real-time processing' },
            ].map((item, i) => (
              <div key={i} style={{
                background: 'rgba(255,255,255,0.12)',
                backdropFilter: 'blur(10px)',
                padding: 20,
                borderRadius: 12,
                border: '1px solid rgba(255,255,255,0.18)',
              }}>
                <div style={{ fontSize: 15, fontWeight: 600, color: 'white', marginBottom: 4 }}>
                  {item.title}
                </div>
                <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.8)' }}>
                  {item.desc}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right Side - Clerk Sign In */}
      <div style={{
        flex: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 40,
        background: 'var(--surface)',
      }}>
        <SignIn 
          routing="path"
          path="/sign-in"
          signUpUrl="/sign-up"
          forceRedirectUrl="/"
          appearance={{
            elements: {
              rootBox: 'mx-auto',
              card: 'shadow-none',
            }
          }}
        />
      </div>
    </div>
  );
}
