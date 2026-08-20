'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { SectionHeader, GradientBlob } from '@/components/ui';
import { fetchSiteContentClient, mapContentItemsToSteps, getSettingValue } from '@/lib/cms';
import './HowItWorksSection.css';

const DEFAULT_STEPS = [
  { step: 1, title: 'Download and Sign Up', description: 'Get the Beautcia app from Google Play or App Store. Create your account in seconds with your email or social login. It is free and takes less than a minute.' },
  { step: 2, title: 'Discover and Book', description: 'Browse beauty professionals near you. Filter by service, rating, price, and availability. See real reviews and photos. Pick your perfect match and book instantly.' },
  { step: 3, title: 'Pay Securely and Enjoy', description: 'Pay safely through the app. Your money is protected until your service is done. Show up, look amazing, and rate your experience. It is that simple.' },
];

export const HowItWorksSection = () => {
  const [steps, setSteps] = useState(DEFAULT_STEPS);
  const [header, setHeader] = useState({
    kicker: 'How It Works',
    title: 'Book Your Beauty Service In 3 Easy Steps',
    subtitle: 'From download to appointment in minutes \u2014 it is that simple',
  });

  useEffect(() => {
    fetchSiteContentClient().then((content) => {
      const kicker = getSettingValue(content.settings, 'how_it_works', 'kicker');
      const title = getSettingValue(content.settings, 'how_it_works', 'title');
      const subtitle = getSettingValue(content.settings, 'how_it_works', 'subtitle');
      if (kicker || title || subtitle) {
        setHeader((prev) => ({
          kicker: kicker || prev.kicker,
          title: title || prev.title,
          subtitle: subtitle || prev.subtitle,
        }));
      }
      const mapped = mapContentItemsToSteps(content.contentItems['how_it_works']);
      if (mapped.length > 0) setSteps(mapped);
    });
  }, []);

  return (
    <section className="how-section">
      <div className="how-bg" />
      <GradientBlob size="medium" color="white" position={{ top: '10%', left: '5%' }} opacity={0.4} />
      <GradientBlob size="large" color="gold" position={{ bottom: '-10%', right: '10%' }} opacity={0.5} />

      <div className="how-container">
        <div className="how-header">
          <SectionHeader
            kicker={header.kicker}
            title={header.title}
            subtitle={header.subtitle}
          />
        </div>

        <div className="how-wrapper">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="how-card">
              <div className="how-card-header">
                <div className="how-card-icon">
                  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                </div>
                <h3 className="how-card-title">For Customers</h3>
              </div>

              <div className="how-steps">
                {steps.map((item, index) => (
                  <motion.div
                    key={item.step}
                    className="how-step"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-50px' }}
                    transition={{ duration: 0.4, delay: index * 0.15 }}
                  >
                    <div className="how-step-inner">
                      <div className="how-step-badge">
                        <span className="how-step-number">{item.step}</span>
                      </div>
                      <div>
                        <h3 className="how-step-title">{item.title}</h3>
                        <p className="how-step-desc">{item.description}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
