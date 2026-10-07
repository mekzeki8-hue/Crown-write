'use client';

import { useEffect, useState } from 'react';
import { useUser } from '@clerk/nextjs';

export default function CreditDisplay({ initialCredits }: { initialCredits: number }) {
  const [credits, setCredits] = useState(initialCredits);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const { isSignedIn } = useUser();

  // Refresh credits from database
  const refreshCredits = async () => {
    if (!isSignedIn) return;
    
    try {
      setIsRefreshing(true);
      const response = await fetch('/api/user/credits');
      const data = await response.json();
      
      if (data.credits !== undefined) {
        setCredits(data.credits);
      }
    } catch (error) {
      console.error('Error refreshing credits:', error);
    } finally {
      setIsRefreshing(false);
    }
  };

  // Listen for credit updates via custom events
  useEffect(() => {
    const handleCreditUpdate = (event: CustomEvent) => {
      if (event.detail?.credits !== undefined) {
        setCredits(event.detail.credits);
      } else {
        // If no credits in event, refresh from database
        refreshCredits();
      }
    };

    window.addEventListener('creditsUpdated' as any, handleCreditUpdate);

    return () => {
      window.removeEventListener('creditsUpdated' as any, handleCreditUpdate);
    };
  }, []);

  // Auto-refresh every 30 seconds
  useEffect(() => {
    const interval = setInterval(refreshCredits, 30000);
    return () => clearInterval(interval);
  }, [isSignedIn]);

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: 6,
        padding: '6px 14px',
        borderRadius: 999,
        background: 'linear-gradient(135deg, #C09A72 0%, #D4B896 100%)',
        border: '1px solid rgba(192, 154, 114, 0.3)',
        boxShadow: '0 2px 8px rgba(192, 154, 114, 0.15)',
      }}>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round">
          <circle cx="12" cy="12" r="10"/>
          <path d="M12 6v6l4 2"/>
        </svg>
        <span style={{
          fontSize: 13,
          fontWeight: 700,
          color: 'white',
          letterSpacing: '0.02em',
        }}>
          {isRefreshing ? '...' : credits.toLocaleString()}
        </span>
        <span style={{
          fontSize: 11,
          fontWeight: 500,
          color: 'rgba(255, 255, 255, 0.9)',
        }}>
          credits
        </span>
      </div>

      <button
        onClick={refreshCredits}
        disabled={isRefreshing}
        style={{
          padding: '6px',
          borderRadius: '50%',
          border: '1px solid var(--border)',
          background: 'var(--surface)',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transition: 'all 0.2s',
          opacity: isRefreshing ? 0.5 : 1,
        }}
        onMouseEnter={(e) => {
          if (!isRefreshing) {
            e.currentTarget.style.borderColor = 'var(--brand)';
            e.currentTarget.style.background = 'var(--bg-2)';
          }
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.borderColor = 'var(--border)';
          e.currentTarget.style.background = 'var(--surface)';
        }}
        title="Refresh credits"
      >
        <svg 
          width="12" 
          height="12" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="var(--muted)" 
          strokeWidth="2" 
          strokeLinecap="round"
          style={{
            animation: isRefreshing ? 'spin 0.8s linear infinite' : 'none',
          }}
        >
          <path d="M21.5 2v6h-6M2.5 22v-6h6M2 11.5a10 10 0 0 1 18.8-4.3M22 12.5a10 10 0 0 1-18.8 4.2"/>
        </svg>
      </button>

      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}
