'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { SectionHeader } from '@/components/ui';
import { fetchSiteContentClient, getSettingValue } from '@/lib/cms';
import { captureLead } from '@/lib/tracking';
import './CTASection.css';

// Store download links
const GOOGLE_PLAY_URL = 'https://play.google.com/store/apps/details?id=com.yeka1.beautcia';
const APP_STORE_URL = 'https://apps.apple.com/us/app/beautcia/id6754828178';

export const CTASection = () => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [header, setHeader] = useState({
    kicker: 'Ready To Look Your Best?',
    title: 'Download Beautcia Today And Book Your Next Beauty Appointment',
    subtitle: 'Join thousands of happy customers who trust Beautcia for their beauty needs. It is free, fast, and easy.',
  });

  useEffect(() => {
    fetchSiteContentClient().then((content) => {
      const kicker = getSettingValue(content.settings, 'cta', 'kicker');
      const title = getSettingValue(content.settings, 'cta', 'title');
      const subtitle = getSettingValue(content.settings, 'cta', 'subtitle');
      if (kicker || title || subtitle) {
        setHeader((prev) => ({
          kicker: kicker || prev.kicker,
          title: title || prev.title,
          subtitle: subtitle || prev.subtitle,
        }));
      }
    });
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    captureLead(email);
    setSubmitted(true);
    setEmail('');
    setTimeout(() => setSubmitted(false), 4000);
  };

  return (
    <section className="cta-section">
      <div className="cta-container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="cta-content"
        >
          <SectionHeader
            kicker={header.kicker}
            title={header.title}
            subtitle={header.subtitle}
          />

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="cta-buttons"
          >
            {/* Google Play Button */}
            <motion.a
              href={GOOGLE_PLAY_URL}
              target="_blank"
              rel="noopener noreferrer"
              data-track="download_google"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="cta-store-btn cta-store-btn-google"
            >
              <div className="cta-store-icon">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.61 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.5,12.92 20.16,13.19L17.89,14.5L15.39,12L17.89,9.5L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z" />
                </svg>
              </div>
              <div className="cta-store-text">
                <div className="cta-store-label">GET IT ON</div>
                <div className="cta-store-name">Google Play</div>
              </div>
            </motion.a>

            {/* App Store Button */}
            <motion.a
              href={APP_STORE_URL}
              target="_blank"
              rel="noopener noreferrer"
              data-track="download_apple"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="cta-store-btn cta-store-btn-apple"
            >
              <div className="cta-store-icon">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.71,19.5C17.88,20.74 17,21.95 15.66,21.97C14.32,22 13.89,21.18 12.37,21.18C10.84,21.18 10.37,21.95 9.1,22C7.79,22.05 6.8,20.68 5.96,19.47C4.25,16.56 2.93,11.3 4.7,7.72C5.57,5.94 7.36,4.86 9.28,4.84C10.56,4.82 11.78,5.72 12.57,5.72C13.36,5.72 14.85,4.62 16.41,4.8C17.07,4.83 18.89,5.08 20.06,6.76C19.95,6.83 17.63,8.18 17.66,11.03C17.69,14.44 20.6,15.57 20.63,15.58C20.6,15.65 20.17,17.13 19.13,18.64M13,3.5C13.73,2.67 14.94,2.04 15.94,2C16.07,3.17 15.6,4.35 14.9,5.19C14.21,6.04 13.07,6.7 11.95,6.61C11.8,5.46 12.36,4.26 13,3.5Z" />
                </svg>
              </div>
              <div className="cta-store-text">
                <div className="cta-store-label">Download on the</div>
                <div className="cta-store-name">App Store</div>
              </div>
            </motion.a>
          </motion.div>

          {/* Email Capture Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            style={{ width: '100%', maxWidth: '500px', margin: '0 auto 24px' }}
          >
            {submitted ? (
              <p style={{ color: '#000', fontSize: '1rem', fontWeight: 600, textAlign: 'center', padding: '12px 0' }}>
                Thank you! We'll be in touch soon.
              </p>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: 'flex', gap: '10px', width: '100%' }}>
                <input
                  type="email"
                  placeholder="Enter your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  style={{
                    flex: 1,
                    padding: '14px 18px',
                    borderRadius: '12px',
                    border: '1px solid #D1D5DB',
                    background: '#F9FAFB',
                    color: '#000',
                    fontSize: '0.95rem',
                    outline: 'none',
                  }}
                />
                <button
                  type="submit"
                  style={{
                    padding: '14px 28px',
                    borderRadius: '12px',
                    border: 'none',
                    background: '#B28B53',
                    color: '#fff',
                    fontSize: '0.95rem',
                    fontWeight: 700,
                    cursor: 'pointer',
                    whiteSpace: 'nowrap',
                    transition: 'all 0.3s',
                  }}
                >
                  Get Notified
                </button>
              </form>
            )}
          </motion.div>

          {/* Trust Badge */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="cta-trust-badge"
          >
            <div className="cta-trust-icon">
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <span>Free to download • No hidden fees • Secure payments</span>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};
