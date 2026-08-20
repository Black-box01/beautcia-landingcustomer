'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { GlassCard, SectionHeader } from '@/components/ui';
import { fetchSiteContentClient, getSettingValue, mapContentItems } from '@/lib/cms';
import './FeaturesSection.css';

const CUSTOMER_FEATURES = [
  {
    icon: (<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.929c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-4 2.941a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-4-2.941a1 1 0 00-1.176 0l-4 2.941c-.969.57-1.371 1.24-.587 1.81l4-2.941a1 1 0 00.363-1.118l-1.518-4.674c-.969-.57-1.371-1.24-.587-1.81l4-2.941z" /></svg>),
    title: 'Verified Reviews',
    description: 'Read real reviews from real customers. Make informed decisions based on verified experiences. Rate your own bookings to help others.',
  },
  {
    icon: (<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>),
    title: 'Book Confidently',
    description: "Even if it's your first appointment, your money is safe and your booking slot is secured!",
  },
  {
    icon: (<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" /></svg>),
    title: 'Smart Reminders',
    description: 'Never miss an appointment again. Get timely reminders before your booking. Reschedule or cancel with ease if plans change.',
  },
  {
    icon: (<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" /></svg>),
    title: 'Transparent Pricing',
    description: 'See all prices upfront. No hidden fees, no surprises. Compare prices across professionals and choose what fits your budget.',
  },
  {
    icon: (<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>),
    title: '24/7 Availability',
    description: 'Book anytime, anywhere. The app is always available so you can schedule your beauty services whenever inspiration strikes.',
  },
  {
    icon: (<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>),
    title: 'Save Favorites',
    description: 'Found a professional you love? Save them to your favorites for quick rebooking. Build your personal beauty team.',
  },
  {
    icon: (<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>),
    title: 'Discover Top Professionals',
    description: 'Browse verified beauty professionals in your area. Filter by service, location, rating, and availability to find your perfect match.',
  },
  {
    icon: (<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>),
    title: 'Book In Seconds',
    description: 'No more calling around or waiting for callbacks. Book your appointment instantly with just a few taps. Choose your date, time, and service.',
  },
  {
    icon: (<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>),
    title: 'Secure Payments',
    description: 'Pay safely through the app. Your money is protected until your service is complete. No cash needed, no awkward transactions.',
  },
];

export const FeaturesSection = () => {
  const [features, setFeatures] = useState(CUSTOMER_FEATURES);
  const [header, setHeader] = useState({
    kicker: 'Why Choose Beautcia',
    title: 'Everything You Need For Your Beauty Appointments',
    subtitle: "From discovery to booking to payment \u2014 we've got you covered",
  });

  useEffect(() => {
    fetchSiteContentClient().then((content) => {
      // Features header settings
      const title = getSettingValue(content.settings, 'features', 'title');
      const description = getSettingValue(content.settings, 'features', 'description');
      if (title || description) {
        setHeader((prev) => ({
          ...prev,
          title: title || prev.title,
          subtitle: description || prev.subtitle,
        }));
      }
      // Features content items
      const mapped = mapContentItems(content.contentItems['features']);
      if (mapped.length > 0) {
        setFeatures(mapped.map((f, i) => ({
          ...f,
          icon: CUSTOMER_FEATURES[i]?.icon ?? CUSTOMER_FEATURES[0].icon,
        })));
      }
    });
  }, []);

  return (
    <section className="features-section">
      <div className="features-container">
        <div className="features-header">
          <SectionHeader
            kicker={header.kicker}
            title={header.title}
            subtitle={header.subtitle}
          />
        </div>

        <motion.div
          className="features-grid"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {CUSTOMER_FEATURES.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
            >
              <GlassCard className="h-full" hover={true}>
                <div className="feature-card-inner">
                  <div className="feature-icon-badge">{feature.icon}</div>
                  <h3 className="feature-title">{feature.title}</h3>
                  <p className="feature-description">{feature.description}</p>
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
