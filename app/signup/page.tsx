'use client';
import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function SignupPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const router = useRouter();

  async function handleSignup(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      setLoading(false);
      return;
    }

    try {
      // Register user
      const response = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || 'Signup failed');
        setLoading(false);
        return;
      }

      setSuccess('Account created! Signing you in...');
      
      // Auto sign in
      const result = await signIn('credentials', {
        redirect: false,
        email,
        password,
      });

      if (result?.error) {
        setError('Account created but login failed. Please login manually.');
        setLoading(false);
        return;
      }

      setTimeout(() => {
        router.push('/');
        router.refresh();
      }, 1000);
    } catch (err) {
      setError('An error occurred. Please try again.');
      setLoading(false);
    }
  }

  async function handleGoogleSignup() {
    setError('');
    await signIn('google', {
      callbackUrl: '/',
    });
  }

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      background: '#FAFAFA',
    }}>
      {/* Left Side - Branding */}
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
            Make Every Word<br />Authentically Human
          </h1>
          <p style={{
            fontSize: 19,
            color: 'rgba(255,255,255,0.95)',
            lineHeight: 1.7,
            marginBottom: 48,
            fontWeight: 400,
          }}>
            Join professionals who trust CrownWrite to Rewrite AI-generated content with precision and authenticity.
          </p>

          {/* Features */}
          <div style={{ 
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: 20,
            textAlign: 'left'
          }}>
            {[
              { title: 'Smart Rewriting', desc: 'AI that thinks like a human' },
              { title: 'Instant Processing', desc: 'Get results in seconds' },
              { title: 'Achieve Good Results with Detection', desc: 'Undetectable by AI tools' },
              { title: 'Premium Quality', desc: 'Maintains meaning & tone' },
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

      {/* Right Side - Signup Form */}
      <div style={{
        flex: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 40,
        background: 'white',
      }}>
        <div style={{
          width: '100%',
          maxWidth: 420,
        }}>
          {/* Header */}
          <div style={{ marginBottom: 40 }}>
            <h2 style={{
              fontSize: 32,
              fontWeight: 700,
              color: '#1F2937',
              marginBottom: 8,
            }}>
              Create your account
            </h2>
            <p style={{ fontSize: 15, color: '#6B7280' }}>
              Start Rewriting AI content today
            </p>
          </div>

          {/* Error Message */}
          {error && (
            <div style={{
              padding: '14px 16px',
              background: '#FEE2E2',
              border: '1px solid #EF4444',
              borderRadius: 8,
              color: '#DC2626',
              fontSize: 14,
              marginBottom: 24,
              display: 'flex',
              alignItems: 'flex-start',
              gap: 10,
            }}>
              <span style={{ fontSize: 16 }}>⚠️</span>
              <span>{error}</span>
            </div>
          )}

          {/* Success Message */}
          {success && (
            <div style={{
              padding: '14px 16px',
              background: '#D1FAE5',
              border: '1px solid #10B981',
              borderRadius: 8,
              color: '#059669',
              fontSize: 14,
              marginBottom: 24,
              display: 'flex',
              alignItems: 'flex-start',
              gap: 10,
            }}>
              <span style={{ fontSize: 16 }}>✓</span>
              <span>{success}</span>
            </div>
          )}

          {/* Google Button - TEMPORARILY DISABLED
          <button
            onClick={handleGoogleSignup}
            type="button"
            style={{
              width: '100%',
              padding: '14px 20px',
              fontSize: 15,
              fontWeight: 600,
              background: 'white',
              border: '1px solid #E5E7EB',
              borderRadius: 8,
              color: '#1F2937',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 12,
              transition: 'all 0.2s',
              marginBottom: 24,
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = '#F9FAFB';
              e.currentTarget.style.borderColor = '#D1D5DB';
              e.currentTarget.style.transform = 'translateY(-1px)';
              e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.08)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'white';
              e.currentTarget.style.borderColor = '#E5E7EB';
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            Continue with Google
          </button>
          */}

          {/* Divider - HIDDEN WHILE GOOGLE DISABLED
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: 16,
            margin: '28px 0',
          }}>
            <div style={{ flex: 1, height: 1, background: '#E5E7EB' }} />
            <span style={{ fontSize: 13, color: '#9CA3AF', fontWeight: 500 }}>OR</span>
            <div style={{ flex: 1, height: 1, background: '#E5E7EB' }} />
          </div>
          */}

          {/* Email/Password Form */}
          <form onSubmit={handleSignup}>
            <div style={{ marginBottom: 20 }}>
              <label style={{
                display: 'block',
                fontSize: 14,
                fontWeight: 600,
                color: '#374151',
                marginBottom: 8,
              }}>
                Email address
              </label>
              <input
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                style={{
                  width: '100%',
                  padding: '12px 16px',
                  fontSize: 15,
                  border: '1px solid #D1D5DB',
                  borderRadius: 8,
                  background: 'white',
                  color: '#1F2937',
                  outline: 'none',
                  transition: 'all 0.2s',
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = '#C09A72';
                  e.target.style.boxShadow = '0 0 0 3px rgba(192, 154, 114, 0.1)';
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = '#D1D5DB';
                  e.target.style.boxShadow = 'none';
                }}
              />
            </div>

            <div style={{ marginBottom: 24 }}>
              <label style={{
                display: 'block',
                fontSize: 14,
                fontWeight: 600,
                color: '#374151',
                marginBottom: 8,
              }}>
                Password
              </label>
              <input
                type="password"
                placeholder="At least 6 characters"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                style={{
                  width: '100%',
                  padding: '12px 16px',
                  fontSize: 15,
                  border: '1px solid #D1D5DB',
                  borderRadius: 8,
                  background: 'white',
                  color: '#1F2937',
                  outline: 'none',
                  transition: 'all 0.2s',
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = '#C09A72';
                  e.target.style.boxShadow = '0 0 0 3px rgba(192, 154, 114, 0.1)';
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = '#D1D5DB';
                  e.target.style.boxShadow = 'none';
                }}
              />
              <p style={{ fontSize: 12, color: '#9CA3AF', marginTop: 6 }}>
                Must be at least 6 characters
              </p>
            </div>

            <button
              type="submit"
              disabled={loading}
              style={{
                width: '100%',
                padding: '14px 20px',
                fontSize: 15,
                fontWeight: 600,
                background: 'linear-gradient(135deg, #C09A72 0%, #D4B896 100%)',
                border: 'none',
                borderRadius: 8,
                color: 'white',
                cursor: loading ? 'not-allowed' : 'pointer',
                transition: 'all 0.2s',
                opacity: loading ? 0.7 : 1,
              }}
              onMouseEnter={(e) => {
                if (!loading) {
                  e.currentTarget.style.transform = 'translateY(-1px)';
                  e.currentTarget.style.boxShadow = '0 8px 20px rgba(192, 154, 114, 0.3)';
                }
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              {loading ? 'Creating account...' : 'Create account'}
            </button>
          </form>

          {/* Terms */}
          <p style={{
            fontSize: 12,
            color: '#9CA3AF',
            marginTop: 20,
            textAlign: 'center',
            lineHeight: 1.6,
          }}>
            By signing up, you agree to our Terms of Service and Privacy Policy
          </p>

          {/* Sign In Link */}
          <div style={{
            textAlign: 'center',
            marginTop: 28,
            fontSize: 14,
            color: '#6B7280',
          }}>
            Already have an account?{' '}
            <Link href="/login" style={{
              color: '#C09A72',
              fontWeight: 600,
              textDecoration: 'none',
            }}>
              Sign in
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
