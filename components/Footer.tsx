'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { fetchSiteContentClient, getSettingValue } from '@/lib/cms';
import './Footer.css';

const DEFAULT_FOOTER = {
  aboutText: 'Your trusted platform for booking beauty services. Connect with verified professionals, book instantly, and look your best.',
  copyrightText: 'Beautcia',
  devCreditName: 'Black-Box Tech',
  devCreditUrl: 'https://blackboxtech.online',
  devCreditEmail: 'info@blackboxtech.online',
  devCreditPhone1: '+2348050205349',
  devCreditPhone2: '+2349024787192',
};

// Social media links
const SOCIAL_LINKS = [
  {
    name: 'Facebook',
    url: 'https://www.facebook.com/share/14Xa78npsGr/?mibextid=wwXIfr',
    icon: (
      <div className="footer-social-icon">
        <svg fill="currentColor" viewBox="0 0 24 24">
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
        </svg>
      </div>
    ),
  },
  {
    name: 'Instagram',
    url: 'https://www.instagram.com/beautcia?igsh=bmQwOXI3eTZneWQ3',
    icon: (
      <div className="footer-social-icon">
        <svg fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
        </svg>
      </div>
    ),
  },
  {
    name: 'X',
    url: 'https://x.com/Beautcia1315881',
    icon: (
      <div className="footer-social-icon">
        <svg fill="currentColor" viewBox="0 0 24 24">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      </div>
    ),
  },
  {
    name: 'TikTok',
    url: 'https://www.tiktok.com/@beautcia?_r=1&_t=ZS-95amweAsToG',
    icon: (
      <div className="footer-social-icon">
        <svg fill="currentColor" viewBox="0 0 24 24">
          <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" />
        </svg>
      </div>
    ),
  },
];

// Contact information
const CONTACT_INFO = {
  phone: '0805 519 9229',
  email: 'beautciaservices@gmail.com',
  website: 'https://www.beautcia.com',
};

export const Footer = () => {
  const [showAbout, setShowAbout] = useState(false);
  const [showDownloadDropdown, setShowDownloadDropdown] = useState(false);
  const [footer, setFooter] = useState(DEFAULT_FOOTER);
  const [socialLinks, setSocialLinks] = useState(SOCIAL_LINKS);
  const currentYear = new Date().getFullYear();

  useEffect(() => {
    fetchSiteContentClient().then((content) => {
      // Footer settings
      const aboutText = getSettingValue(content.settings, 'footer', 'aboutText');
      const copyrightText = getSettingValue(content.settings, 'footer', 'copyrightText');
      const devCreditName = getSettingValue(content.settings, 'footer', 'devCreditName');
      const devCreditUrl = getSettingValue(content.settings, 'footer', 'devCreditUrl');
      const devCreditEmail = getSettingValue(content.settings, 'footer', 'devCreditEmail');
      const devCreditPhone1 = getSettingValue(content.settings, 'footer', 'devCreditPhone1');
      const devCreditPhone2 = getSettingValue(content.settings, 'footer', 'devCreditPhone2');
      setFooter({
        aboutText: aboutText || DEFAULT_FOOTER.aboutText,
        copyrightText: copyrightText || DEFAULT_FOOTER.copyrightText,
        devCreditName: devCreditName || DEFAULT_FOOTER.devCreditName,
        devCreditUrl: devCreditUrl || DEFAULT_FOOTER.devCreditUrl,
        devCreditEmail: devCreditEmail || DEFAULT_FOOTER.devCreditEmail,
        devCreditPhone1: devCreditPhone1 || DEFAULT_FOOTER.devCreditPhone1,
        devCreditPhone2: devCreditPhone2 || DEFAULT_FOOTER.devCreditPhone2,
      });
      // Social links from CMS
      const socialSettings = content.settings['social'] || [];
      if (socialSettings.length > 0) {
        const socialMap: Record<string, string> = {};
        for (const s of socialSettings) {
          socialMap[s.key] = s.value || '';
        }
        const platforms = [
          { key: 'facebookUrl', name: 'Facebook' },
          { key: 'instagramUrl', name: 'Instagram' },
          { key: 'xUrl', name: 'X' },
          { key: 'tiktokUrl', name: 'TikTok' },
        ];
        const updated: typeof SOCIAL_LINKS = [];
        for (const p of platforms) {
          const url = socialMap[p.key];
          const defaultLink = SOCIAL_LINKS.find((s) => s.name === p.name);
          const href = url || defaultLink?.url || '';
          if (href) {
            updated.push({ name: p.name, url: href, icon: defaultLink?.icon || SOCIAL_LINKS[0].icon });
          }
        }
        if (updated.length > 0) setSocialLinks(updated);
      }
    });
  }, []);

  return (
    <>
      <footer className="footer">
        <div className="footer-container">
          <div className="footer-grid">
            {/* Brand Column */}
            <div className="footer-brand">
              <div className="footer-brand-header">
                <img src="/logo.png" alt="Beautcia" className="footer-logo" />
                <h3 className="footer-brand-name">Beautcia</h3>
              </div>
              <p className="footer-description">
                {footer.aboutText}
              </p>
              <div className="footer-social">
                {socialLinks.map((social) => (
                  <motion.a
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className="footer-social-link"
                    title={social.name}
                  >
                    {social.icon}
                  </motion.a>
                ))}
              </div>
            </div>

            {/* Support Column */}
            <div className="footer-column">
              <h4 className="footer-column-title">Support</h4>
              <div className="footer-links">
                <a href={`tel:${CONTACT_INFO.phone}`} className="footer-link">
                  📞 {CONTACT_INFO.phone}
                </a>
                <a href={`mailto:${CONTACT_INFO.email}`} className="footer-link">
                  ✉️ {CONTACT_INFO.email}
                </a>
                <button onClick={() => setShowAbout(true)} className="footer-link">
                  About Beautcia
                </button>
              </div>
            </div>

            {/* Company Column */}
            <div className="footer-column">
              <h4 className="footer-column-title">Company</h4>
              <div className="footer-links">
                <button onClick={() => setShowAbout(true)} className="footer-link">
                  About Us
                </button>
                <a
                  href="https://www.beautcia.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="footer-link"
                >
                  Official Website
                </a>
                <div className="footer-dropdown">
                  <button
                    onClick={() => setShowDownloadDropdown(!showDownloadDropdown)}
                    className="footer-link footer-dropdown-trigger"
                  >
                    Download App
                    <svg className={`footer-dropdown-arrow ${showDownloadDropdown ? 'footer-dropdown-arrow-open' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  <div className={`footer-dropdown-menu ${showDownloadDropdown ? 'footer-dropdown-menu-open' : ''}`}>
                    <a
                      href="https://play.google.com/store/apps/details?id=com.yeka1.beautcia"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="footer-dropdown-item"
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.61 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.5,12.92 20.16,13.19L17.89,14.5L15.39,12L17.89,9.5L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z" />
                      </svg>
                      Google Play
                    </a>
                    <a
                      href="https://apps.apple.com/us/app/beautcia/id6754828178"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="footer-dropdown-item"
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M18.71,19.5C17.88,20.74 17,21.95 15.66,21.97C14.32,22 13.89,21.18 12.37,21.18C10.84,21.18 10.37,21.95 9.1,22C7.79,22.05 6.8,20.68 5.96,19.47C4.25,16.56 2.93,11.3 4.7,7.72C5.57,5.94 7.36,4.86 9.28,4.84C10.56,4.82 11.78,5.72 12.57,5.72C13.36,5.72 14.85,4.62 16.41,4.8C17.07,4.83 18.89,5.08 20.06,6.76C19.95,6.83 17.63,8.18 17.66,11.03C17.69,14.44 20.6,15.57 20.63,15.58C20.6,15.65 20.17,17.13 19.13,18.64M13,3.5C13.73,2.67 14.94,2.04 15.94,2C16.07,3.17 15.6,4.35 14.9,5.19C14.21,6.04 13.07,6.7 11.95,6.61C11.8,5.46 12.36,4.26 13,3.5Z" />
                      </svg>
                      App Store
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="footer-bottom">
            <p className="footer-copyright">
              © {currentYear} {footer.copyrightText}. All rights reserved.
            </p>
            <div className="footer-bottom-links">
              <a href="/privacy-policy" className="footer-bottom-link">
                Privacy Policy
              </a>
              <a href="/terms-of-service" className="footer-bottom-link">
                Terms of Service
              </a>
            </div>
          </div>

          {/* Developer Credit */}
          <div style={{ textAlign: 'center', padding: '16px 0 8px' }}>
            <p style={{ fontSize: '0.95rem', color: 'rgba(255,255,255,0.9)', fontWeight: 500, margin: 0 }}>
              Designed and Developed by{' '}
              <a href={footer.devCreditUrl} target="_blank" rel="noopener noreferrer" style={{ color: '#fff', textDecoration: 'underline', fontWeight: 600 }}>
                {footer.devCreditName}
              </a>
              {' | '}
              <a href={footer.devCreditUrl} target="_blank" rel="noopener noreferrer" style={{ color: '#fff', textDecoration: 'underline', fontWeight: 600 }}>
                {footer.devCreditUrl.replace('https://', '')}
              </a>
              {' | '}
              <a href={`mailto:${footer.devCreditEmail}?subject=${encodeURIComponent('Inquiry from Beautcia')}&body=${encodeURIComponent(`Hello ${footer.devCreditName},

We are reaching out regarding a project. We would love to discuss how you can help us.

Thank you.`)}`} style={{ color: '#fff', textDecoration: 'underline', fontWeight: 600 }}>
                {footer.devCreditEmail}
              </a>
              {' | '}
              <a href={`tel:${footer.devCreditPhone1}`} style={{ color: '#fff', textDecoration: 'underline', fontWeight: 600 }}>
                {footer.devCreditPhone1}
              </a>
              {', '}
              <a href={`tel:${footer.devCreditPhone2}`} style={{ color: '#fff', textDecoration: 'underline', fontWeight: 600 }}>
                {footer.devCreditPhone2}
              </a>
            </p>
          </div>
        </div>
      </footer>

      {/* About Modal */}
      <AnimatePresence>
        {showAbout && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="modal-overlay"
            onClick={() => setShowAbout(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="modal-content"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="modal-header">
                <h2 className="modal-title">About Beautcia</h2>
                <button onClick={() => setShowAbout(false)} className="modal-close-btn">
                  <div className="modal-close-icon">
                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </div>
                </button>
              </div>
              <div className="modal-body">
                <p>
                  Beautcia is Nigeria&apos;s leading beauty services platform, connecting customers with verified beauty professionals for seamless booking and secure payments.
                </p>
                <p>
                  We believe looking your best should be easy, stress-free, and accessible. That&apos;s why we created a platform where you can discover top-rated beauty professionals, read real reviews, book instantly, and pay securely — all from one app.
                </p>
                <p>
                  Our mission is to empower beauty professionals and delight customers by providing a trusted marketplace that prioritizes quality, transparency, and convenience.
                </p>
                <p>
                  Whether you need a hairstylist, makeup artist, nail technician, or skincare expert, Beautcia has got you covered. Join thousands of happy customers who trust Beautcia for their beauty needs.
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
