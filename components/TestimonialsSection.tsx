'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { GlassCard, SectionHeader } from '@/components/ui';
import { fetchTestimonialsClient, fetchSiteContentClient, getSettingValue } from '@/lib/cms';
import type { Testimonial } from '@/lib/cms';
import './TestimonialsSection.css';

const DEFAULT_TESTIMONIALS: Testimonial[] = [
  { id: '1', name: 'Adaeze O.', avatar: 'A', rating: 5, quote: 'I found my go-to hairstylist on Beautcia! The booking process was so easy, and I loved that I could see real reviews before booking. My hair turned out exactly as I wanted.' },
  { id: '2', name: 'Chidinma E.', avatar: 'C', rating: 4, quote: 'As someone who is always running late, the smart reminders are a lifesaver. I never miss my appointments now. The secure payment feature gives me peace of mind. Would love more professionals in my area!' },
  { id: '3', name: 'Funke A.', avatar: 'F', rating: 5, quote: 'Beautcia has changed how I book beauty services. No more haggling or awkward payments. Everything is transparent and professional. I recommend it to all my friends!' },
  { id: '4', name: 'Blessing N.', avatar: 'B', rating: 3, quote: 'Good concept and easy to use. I had a minor issue with rescheduling but customer support helped resolve it. The professionals are talented and the app is well designed.' },
  { id: '5', name: 'Ngozi K.', avatar: 'N', rating: 4, quote: 'What I love most is the transparency. I can see prices upfront, compare different professionals, and choose based on my budget. No hidden fees, no surprises. Just great service!' },
  { id: '6', name: 'Amaka U.', avatar: 'A', rating: 5, quote: 'The app is beautiful and easy to use. I booked a makeup artist for my wedding and she was perfect. Thank you Beautcia for making beauty services so accessible and stress-free!' },
];

export const TestimonialsSection = () => {
  const [testimonials, setTestimonials] = useState<Testimonial[]>(DEFAULT_TESTIMONIALS);
  const [header, setHeader] = useState({
    kicker: 'Testimonials',
    title: 'Loved by happy customers',
    subtitle: 'See what our customers are saying about their Beautcia experience',
  });

  useEffect(() => {
    fetchTestimonialsClient().then((data) => {
      if (data.length > 0) setTestimonials(data);
    });
    fetchSiteContentClient().then((content) => {
      const kicker = getSettingValue(content.settings, 'testimonials', 'kicker');
      const title = getSettingValue(content.settings, 'testimonials', 'title');
      const subtitle = getSettingValue(content.settings, 'testimonials', 'subtitle');
      if (kicker || title || subtitle) {
        setHeader((prev) => ({
          kicker: kicker || prev.kicker,
          title: title || prev.title,
          subtitle: subtitle || prev.subtitle,
        }));
      }
    });
  }, []);

  return (
    <section className="testimonials-section">
      <div className="testimonials-container">
        <div className="testimonials-header">
          <SectionHeader
            kicker={header.kicker}
            title={header.title}
            subtitle={header.subtitle}
          />
        </div>

        <motion.div
          className="testimonials-grid"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id || index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
            >
              <GlassCard className="h-full" hover={true}>
                <div className="testimonial-card-inner">
                  <div className="testimonial-user">
                    {testimonial.avatar && (testimonial.avatar.startsWith('http') || testimonial.avatar.startsWith('/')) ? (
                      <div className="testimonial-avatar" style={{ overflow: 'hidden' }}>
                        <Image
                          src={testimonial.avatar}
                          alt={testimonial.name}
                          width={44}
                          height={44}
                          className="testimonial-avatar-image"
                          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                        />
                      </div>
                    ) : (
                      <div className="testimonial-avatar">{testimonial.avatar}</div>
                    )}
                    <div>
                      <h4 className="testimonial-name">{testimonial.name}</h4>
                      <div className="testimonial-stars">
                        {Array.from({ length: testimonial.rating }).map((_, i) => (
                          <svg key={i} className="testimonial-star" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                      </div>
                    </div>
                  </div>
                  <p className="testimonial-quote">&ldquo;{testimonial.quote}&rdquo;</p>
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
