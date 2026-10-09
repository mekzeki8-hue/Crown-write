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
    // Set a fixed end date that rotates every 3 days
    const getEndTime = () => {
      const CYCLE_DURATION = 3 * 24 * 60 * 60 * 1000; // 3 days in milliseconds
      const LAUNCH_DATE = new Date('2024-01-01').getTime(); // Reference point
      
      const now = Date.now();
      const elapsed = now - LAUNCH_DATE;
      const currentCycle = Math.floor(elapsed / CYCLE_DURATION);
      const nextCycleStart = LAUNCH_DATE + ((currentCycle + 1) * CYCLE_DURATION);
      
      return nextCycleStart;
    };

    const updateCountdown = () => {
      const now = Date.now();
      const endTime = getEndTime();
      const distance = endTime - now;

      if (distance > 0) {
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        setTimeLeft({ days, hours, minutes, seconds });
      } else {
        // Auto-reset to next cycle (should never happen with the calculation above)
        updateCountdown();
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
      background: 'transparent',
      padding: '48px 28px',
      display: 'flex',
      justifyContent: 'center',
      position: 'relative',
      overflow: 'visible',
    }}>
      {/* Main Card - Redesigned with proper edges */}
      <div style={{
        background: 'linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 50%, #1f1f1f 100%)',
        borderRadius: 24,
        padding: '42px 52px',
        maxWidth: 950,
        width: '100%',
        position: 'relative',
        overflow: 'hidden',
        boxShadow: '0 24px 64px rgba(0, 0, 0, 0.4), 0 12px 40px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.06)',
        border: '1px solid rgba(255, 255, 255, 0.06)',
      }}>
        {/* Premium gold accent glow - larger and more visible */}
        <div aria-hidden style={{
          position: 'absolute',
          top: -180,
          right: -180,
          width: 500,
          height: 500,
          background: 'radial-gradient(circle, rgba(255, 215, 0, 0.15) 0%, rgba(192, 154, 114, 0.08) 40%, transparent 70%)',
          pointerEvents: 'none',
          filter: 'blur(40px)',
        }} />

        {/* Left side accent glow - warmer */}
        <div aria-hidden style={{
          position: 'absolute',
          bottom: -120,
          left: -120,
          width: 400,
          height: 400,
          background: 'radial-gradient(circle, rgba(192, 154, 114, 0.12) 0%, transparent 70%)',
          pointerEvents: 'none',
          filter: 'blur(50px)',
        }} />

        <div style={{
          position: 'relative',
          zIndex: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 40,
          flexWrap: 'wrap',
        }}>
          {/* Left Content */}
          <div style={{ flex: 1, minWidth: 320 }}>
            {/* Redesigned Discount Badge - NO CROPPING */}
            <div style={{ marginBottom: 22 }}>
              <div style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 8,
                background: 'linear-gradient(135deg, rgba(255, 215, 0, 0.2) 0%, rgba(255, 193, 7, 0.15) 100%)',
                border: '2px solid rgba(255, 215, 0, 0.4)',
                padding: '8px 18px',
                borderRadius: 999,
                fontSize: 14,
                fontWeight: 800,
                color: '#FFD700',
                letterSpacing: '0.8px',
                textTransform: 'uppercase',
                boxShadow: '0 4px 16px rgba(255, 215, 0, 0.25), inset 0 1px 0 rgba(255, 255, 255, 0.15)',
                position: 'relative',
              }}>
                {/* Glow effect around badge */}
                <div aria-hidden style={{
                  position: 'absolute',
                  inset: -4,
                  background: 'rgba(255, 215, 0, 0.15)',
                  borderRadius: 999,
                  filter: 'blur(8px)',
                  zIndex: -1,
                }} />
                
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" stroke="none">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                </svg>
                <span style={{ textShadow: '0 2px 8px rgba(0, 0, 0, 0.3)' }}>
                  50% OFF
                </span>
              </div>
            </div>

            {/* Title - Improved typography */}
            <h2 style={{
              fontSize: 'clamp(26px, 4.5vw, 38px)',
              fontWeight: 800,
              color: '#FFFFFF',
              marginBottom: 12,
              lineHeight: 1.2,
              letterSpacing: '-1px',
              fontFamily: 'var(--font-sans)',
              textShadow: '0 2px 16px rgba(0, 0, 0, 0.4)',
            }}>
              Limited-Time Launch Offer
            </h2>

            {/* Description - Better contrast */}
            <p style={{
              fontSize: 16,
              color: 'rgba(255, 255, 255, 0.85)',
              lineHeight: 1.6,
              fontWeight: 400,
              maxWidth: 440,
              marginBottom: 8,
            }}>
              Half price on every plan — ends when the timer hits zero.
            </p>
            
            <p style={{
              fontSize: 14,
              color: 'rgba(255, 215, 0, 0.9)',
              fontWeight: 600,
              display: 'flex',
              alignItems: 'center',
              gap: 6,
            }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"/>
                <polyline points="12 6 12 12 16 14"/>
              </svg>
              Automatically renews every 3 days
            </p>
          </div>

          {/* Countdown Timer - Enhanced */}
          <div style={{
            display: 'flex',
            gap: 14,
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
          div[style*="display: flex; gap: 14px"] {
            width: 100%;
            justify-content: space-between;
          }
          div[style*="minWidth: 85"] {
            min-width: 65px !important;
            padding: 10px 12px !important;
          }
          div[style*="fontSize: 36"] {
            font-size: 26px !important;
          }
        }
      `}</style>
    </div>
  );
}
