'use client';

import { useState, useEffect } from 'react';

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export default function DiscountBanner() {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    // Calculate end time: 3 days from now (auto-rotating)
    const getEndTime = () => {
      const now = new Date();
      const end = new Date(now.getTime() + (3 * 24 * 60 * 60 * 1000)); // 3 days from now
      return end;
    };

    const updateCountdown = () => {
      const now = new Date().getTime();
      const endTime = getEndTime().getTime();
      const distance = endTime - now;

      if (distance > 0) {
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        setTimeLeft({ days, hours, minutes, seconds });
      } else {
        // Auto-reset: When countdown ends, it automatically restarts with 3 days
        setTimeLeft({ days: 2, hours: 23, minutes: 59, seconds: 59 });
      }
    };

    // Initial update
    updateCountdown();

    // Update every second
    const timer = setInterval(updateCountdown, 1000);

    return () => clearInterval(timer);
  }, []);

  const TimeBox = ({ value, label }: { value: number; label: string }) => (
    <div style={{
      background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.08) 0%, rgba(255, 255, 255, 0.03) 100%)',
      backdropFilter: 'blur(10px)',
      borderRadius: 12,
      padding: '16px 20px',
      minWidth: 85,
      textAlign: 'center',
      border: '1px solid rgba(255, 255, 255, 0.12)',
      boxShadow: '0 4px 16px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
    }}>
      <div style={{
        fontSize: 36,
        fontWeight: 700,
        color: 'white',
        lineHeight: 1,
        marginBottom: 6,
        fontFamily: 'var(--font-sans)',
        letterSpacing: '-1px',
        textShadow: '0 2px 8px rgba(0, 0, 0, 0.3)',
      }}>
        {String(value).padStart(2, '0')}
      </div>
      <div style={{
        fontSize: 11,
        fontWeight: 500,
        color: 'rgba(255, 255, 255, 0.6)',
        textTransform: 'uppercase',
        letterSpacing: '0.5px',
      }}>
        {label}
      </div>
    </div>
  );

  return (
    <div style={{
      background: 'var(--bg)',
      padding: '40px 28px',
      display: 'flex',
      justifyContent: 'center',
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Main Card */}
      <div style={{
        background: 'linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 50%, #0f0f0f 100%)',
        borderRadius: 20,
        padding: '36px 48px',
        maxWidth: 900,
        width: '100%',
        position: 'relative',
        overflow: 'hidden',
        boxShadow: '0 20px 60px rgba(0, 0, 0, 0.6), 0 8px 32px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
        border: '1px solid rgba(255, 255, 255, 0.08)',
      }}>
        {/* Decorative gradient overlay - Gold accent */}
        <div aria-hidden style={{
          position: 'absolute',
          top: -150,
          right: -150,
          width: 400,
          height: 400,
          background: 'radial-gradient(circle, rgba(192, 154, 114, 0.12) 0%, transparent 70%)',
          pointerEvents: 'none',
        }} />

        {/* Left side accent glow */}
        <div aria-hidden style={{
          position: 'absolute',
          bottom: -100,
          left: -100,
          width: 300,
          height: 300,
          background: 'radial-gradient(circle, rgba(255, 215, 0, 0.08) 0%, transparent 70%)',
          pointerEvents: 'none',
        }} />

        {/* Subtle grid pattern overlay */}
        <div aria-hidden style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `
            linear-gradient(rgba(255, 255, 255, 0.02) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255, 255, 255, 0.02) 1px, transparent 1px)
          `,
          backgroundSize: '30px 30px',
          pointerEvents: 'none',
        }} />

        <div style={{
          position: 'relative',
          zIndex: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 32,
          flexWrap: 'wrap',
        }}>
          {/* Left Content */}
          <div style={{ flex: 1, minWidth: 300 }}>
            {/* Discount Badge */}
            <div style={{ marginBottom: 18 }}>
              <span style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 6,
                background: 'linear-gradient(135deg, rgba(255, 215, 0, 0.15) 0%, rgba(192, 154, 114, 0.15) 100%)',
                border: '1.5px solid rgba(255, 215, 0, 0.3)',
                padding: '6px 14px',
                borderRadius: 999,
                fontSize: 13,
                fontWeight: 700,
                color: '#ffd700',
                letterSpacing: '0.5px',
                boxShadow: '0 2px 12px rgba(255, 215, 0, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
              }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" stroke="none">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                </svg>
                50% OFF
              </span>
            </div>

            {/* Title */}
            <h2 style={{
              fontSize: 'clamp(24px, 4vw, 32px)',
              fontWeight: 700,
              color: 'white',
              marginBottom: 10,
              lineHeight: 1.2,
              letterSpacing: '-0.5px',
              fontFamily: 'var(--font-sans)',
              textShadow: '0 2px 12px rgba(0, 0, 0, 0.4)',
            }}>
              Limited-time launch offer
            </h2>

            {/* Description */}
            <p style={{
              fontSize: 15,
              color: 'rgba(255, 255, 255, 0.75)',
              lineHeight: 1.5,
              fontWeight: 400,
              maxWidth: 420,
            }}>
              Half price on every plan — ends when the timer hits zero.
            </p>
          </div>

          {/* Countdown Timer */}
          <div style={{
            display: 'flex',
            gap: 12,
            alignItems: 'center',
          }}>
            <TimeBox value={timeLeft.days} label="DAYS" />
            <TimeBox value={timeLeft.hours} label="HOURS" />
            <TimeBox value={timeLeft.minutes} label="MINS" />
            <TimeBox value={timeLeft.seconds} label="SECS" />
          </div>
        </div>
      </div>

      {/* Mobile responsive styles */}
      <style>{`
        @media (max-width: 768px) {
          div[style*="flex-wrap: wrap"] {
            flex-direction: column;
            align-items: flex-start !important;
            text-align: left;
          }
          div[style*="display: flex; gap: 12px"] {
            width: 100%;
            justify-content: space-between;
          }
          div[style*="minWidth: 85"] {
            min-width: 70px !important;
            padding: 12px 14px !important;
          }
          div[style*="fontSize: 36"] {
            font-size: 28px !important;
          }
        }
      `}</style>
    </div>
  );
}
