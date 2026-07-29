'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { GradientBlob } from '@/components/ui';
import { gradients } from '@/lib/constants';
import './HeroSection.css';

const GOOGLE_PLAY_URL = 'https://play.google.com/store/apps/details?id=com.yeka1.beautcia';
const APP_STORE_URL = 'https://apps.apple.com/us/app/beautcia/id6754828178';

const BENEFITS = [
  { icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3l1.912 5.813a2 2 0 001.272 1.272L21 12l-5.813 1.912a2 2 0 00-1.272 1.272L12 21l-1.912-5.813a2 2 0 00-1.272-1.272L3 12l5.813-1.912a2 2 0 001.272-1.272L12 3z"/></svg>, text: 'Book Instantly' },
  { icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="5" width="20" height="14" rx="2"/><line x1="2" y1="10" x2="22" y2="10"/></svg>, text: 'Secure Payments' },
  { icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>, text: 'Top-Rated Pros' },
  { icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>, text: 'Easy Scheduling' },
];

const FLOATING_ELEMENTS = [
  { emoji: '💅', x: '10%', y: '20%', delay: 0, duration: 6 },
  { emoji: '💇', x: '85%', y: '15%', delay: 1, duration: 7 },
  { emoji: '💆', x: '15%', y: '75%', delay: 2, duration: 8 },
  { emoji: '✨', x: '90%', y: '70%', delay: 1.5, duration: 6.5 },
  { emoji: '💄', x: '5%', y: '50%', delay: 0.5, duration: 7.5 },
];

export const HeroSection = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth - 0.5) * 20,
        y: (e.clientY / window.innerHeight - 0.5) * 20,
      });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <section className="hero-section">
      <GradientBlob size="large" color="gold" position={{ top: '10%', left: '10%' }} opacity={0.95} orbit={true} orbitDuration={5} />
      <GradientBlob size="medium" color="lightGold" position={{ bottom: '20%', right: '15%' }} opacity={0.75} orbit={true} orbitDuration={8} />
      <GradientBlob size="small" color="white" position={{ top: '50%', left: '50%' }} opacity={0.85} orbit={true} orbitDuration={2} />

      {FLOATING_ELEMENTS.map((item, index) => (
        <motion.div
          key={index}
          className="hero-floating"
          style={{
            left: item.x,
            top: item.y,
            '--orbit-radius': `${30 + index * 10}px`,
            '--orbit-duration': `${item.duration + 10}s`,
            '--orbit-delay': `${item.delay}s`,
          } as React.CSSProperties}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: item.delay }}
        >
          {item.emoji}
        </motion.div>
      ))}

      <div className="hero-content">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="hero-badge"
        >
          <img src="/logo.png" alt="Beautcia logo" className="hero-badge-logo" />
          <span className="hero-badge-text">Your Beauty, Simplified</span>
          <span className="hero-badge-sparkle">✨</span>
        </motion.div>

        <motion.div
          style={{ x: mousePosition.x * 0.5, y: mousePosition.y * 0.5 }}
          transition={{ type: 'spring', stiffness: 100, damping: 30 }}
        >
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="hero-headline"
          >
            Book Beauty
            <br />
            <span className="hero-headline-gradient">Professionals</span>
            <br />
            In Seconds
          </motion.h1>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="hero-subheadline"
        >
          Discover top-rated hair stylists, makeup artists, nail technicians, and more.
          Book instantly, pay securely, and look your best — all from one app.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="hero-benefits"
        >
          {BENEFITS.map((benefit, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: 0.4 + index * 0.1 }}
              className="hero-benefit-pill"
            >
              <span className="hero-benefit-emoji">{benefit.icon}</span>
              <span className="hero-benefit-text">{benefit.text}</span>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="hero-cta"
        >
          <motion.a
            href={GOOGLE_PLAY_URL}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="hero-store-btn hero-store-btn-google"
          >
            <svg className="hero-store-btn-icon" viewBox="0 0 24 24" fill="currentColor">
              <path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.61 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.5,12.92 20.16,13.19L17.89,14.5L15.39,12L17.89,9.5L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z" />
            </svg>
            <div>
              <div className="hero-store-btn-label-small">GET IT ON</div>
              <div className="hero-store-btn-label-large">Google Play</div>
            </div>
          </motion.a>

          <motion.a
            href={APP_STORE_URL}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="hero-store-btn hero-store-btn-apple"
          >
            <svg className="hero-store-btn-icon" viewBox="0 0 24 24" fill="currentColor">
              <path d="M18.71,19.5C17.88,20.74 17,21.95 15.66,21.97C14.32,22 13.89,21.18 12.37,21.18C10.84,21.18 10.37,21.95 9.1,22C7.79,22.05 6.8,20.68 5.96,19.47C4.25,16.56 2.93,11.3 4.7,7.72C5.57,5.94 7.36,4.86 9.28,4.84C10.56,4.82 11.78,5.72 12.57,5.72C13.36,5.72 14.85,4.62 16.41,4.8C17.07,4.83 18.89,5.08 20.06,6.76C19.95,6.83 17.63,8.18 17.66,11.03C17.69,14.44 20.6,15.57 20.63,15.58C20.6,15.65 20.17,17.13 19.13,18.64M13,3.5C13.73,2.67 14.94,2.04 15.94,2C16.07,3.17 15.6,4.35 14.9,5.19C14.21,6.04 13.07,6.7 11.95,6.61C11.8,5.46 12.36,4.26 13,3.5Z" />
            </svg>
            <div>
              <div className="hero-store-btn-label-small">Download on the</div>
              <div className="hero-store-btn-label-large">App Store</div>
            </div>
          </motion.a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="hero-social-proof"
        >
          <div className="hero-avatars">
            {[1, 2, 3, 4, 5].map((i) => (
              <motion.div
                key={i}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.3, delay: 0.8 + i * 0.1 }}
                className="hero-avatar"
              >
                {String.fromCharCode(64 + i)}
              </motion.div>
            ))}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div className="hero-stars">
              {[1, 2, 3, 4, 5].map((i) => (
                <motion.svg
                  key={i}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: 1 + i * 0.1 }}
                  className="hero-star"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </motion.svg>
              ))}
            </div>
            <span className="hero-trust-text">Trusted by 5,000+ happy customers</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
