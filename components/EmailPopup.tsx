'use client';

import { useState, useEffect } from 'react';
import { captureLead } from '@/lib/tracking';

const POPUP_DELAY = 5000; // 5 seconds after page load
const SESSION_KEY = 'beautcia_email_popup_shown';

export default function EmailPopup() {
  const [visible, setVisible] = useState(false);
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [closing, setClosing] = useState(false);

  useEffect(() => {
    // Don't show if already shown this session
    if (sessionStorage.getItem(SESSION_KEY)) return;

    const timer = setTimeout(() => {
      setVisible(true);
      sessionStorage.setItem(SESSION_KEY, '1');
    }, POPUP_DELAY);

    return () => clearTimeout(timer);
  }, []);

  const handleClose = () => {
    setClosing(true);
    setTimeout(() => setVisible(false), 300);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    captureLead(email);
    setSubmitted(true);
    setEmail('');
    setTimeout(() => handleClose(), 2500);
  };

  if (!visible) return null;

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px',
        animation: closing ? 'popupFadeOut 0.3s ease forwards' : 'popupFadeIn 0.4s ease',
      }}
    >
      {/* Backdrop */}
      <div
        onClick={handleClose}
        style={{
          position: 'absolute',
          inset: 0,
          background: 'rgba(0,0,0,0.5)',
          backdropFilter: 'blur(4px)',
        }}
      />

      {/* Popup Card */}
      <div
        style={{
          position: 'relative',
          background: '#fff',
          borderRadius: '20px',
          padding: '36px 32px 28px',
          maxWidth: '420px',
          width: '100%',
          boxShadow: '0 25px 60px rgba(0,0,0,0.3)',
          textAlign: 'center',
          animation: closing ? 'popupSlideOut 0.3s ease forwards' : 'popupSlideIn 0.4s ease',
        }}
      >
        {/* Close Button */}
        <button
          onClick={handleClose}
          style={{
            position: 'absolute',
            top: '12px',
            right: '14px',
            background: 'none',
            border: 'none',
            fontSize: '22px',
            color: '#999',
            cursor: 'pointer',
            lineHeight: 1,
            padding: '4px',
          }}
          aria-label="Close"
        >
          ×
        </button>

        {/* Sparkle Icon */}
        <div
          style={{
            width: '56px',
            height: '56px',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #B28B53, #d4a966)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 16px',
            fontSize: '26px',
          }}
        >
          ✨
        </div>

        {submitted ? (
          <div>
            <h3 style={{ fontSize: '1.3rem', fontWeight: 700, color: '#1a1a1a', margin: '0 0 8px' }}>
              You're In! 🎉
            </h3>
            <p style={{ fontSize: '0.95rem', color: '#666', margin: 0 }}>
              Welcome to the Beautcia family. We'll keep you updated with the latest!
            </p>
          </div>
        ) : (
          <>
            <h3 style={{ fontSize: '1.3rem', fontWeight: 700, color: '#1a1a1a', margin: '0 0 6px' }}>
              Get Exclusive Beauty Deals
            </h3>
            <p style={{ fontSize: '0.9rem', color: '#666', margin: '0 0 20px', lineHeight: 1.5 }}>
              Join 10,000+ beauty lovers getting early access to promotions, new features, and special offers.
            </p>

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <input
                type="email"
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                style={{
                  width: '100%',
                  padding: '14px 16px',
                  borderRadius: '12px',
                  border: '2px solid #e5e5e5',
                  fontSize: '0.95rem',
                  outline: 'none',
                  transition: 'border-color 0.2s',
                  boxSizing: 'border-box',
                }}
                onFocus={(e) => (e.target.style.borderColor = '#B28B53')}
                onBlur={(e) => (e.target.style.borderColor = '#e5e5e5')}
              />
              <button
                type="submit"
                style={{
                  width: '100%',
                  padding: '14px',
                  borderRadius: '12px',
                  border: 'none',
                  background: 'linear-gradient(135deg, #B28B53, #d4a966)',
                  color: '#fff',
                  fontSize: '1rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                  transition: 'transform 0.2s, box-shadow 0.2s',
                  boxShadow: '0 4px 15px rgba(178,139,83,0.3)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-1px)';
                  e.currentTarget.style.boxShadow = '0 6px 20px rgba(178,139,83,0.4)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 4px 15px rgba(178,139,83,0.3)';
                }}
              >
                Get Early Access
              </button>
            </form>

            <p style={{ fontSize: '0.75rem', color: '#aaa', margin: '12px 0 0' }}>
              No spam, ever. Unsubscribe anytime.
            </p>
          </>
        )}
      </div>

      {/* Animations */}
      <style>{`
        @keyframes popupFadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes popupFadeOut {
          from { opacity: 1; }
          to { opacity: 0; }
        }
        @keyframes popupSlideIn {
          from { opacity: 0; transform: scale(0.9) translateY(20px); }
          to { opacity: 1; transform: scale(1) translateY(0); }
        }
        @keyframes popupSlideOut {
          from { opacity: 1; transform: scale(1) translateY(0); }
          to { opacity: 0; transform: scale(0.9) translateY(20px); }
        }
      `}</style>
    </div>
  );
}
