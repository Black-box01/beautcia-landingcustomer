'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { GlassCard, SectionHeader } from '@/components/ui';
import './TestimonialsSection.css';

const TESTIMONIALS = [
  { name: 'Adaeze O.', avatar: 'A', rating: 5, quote: 'I found my go-to hairstylist on Beautcia! The booking process was so easy, and I loved that I could see real reviews before booking. My hair turned out exactly as I wanted.' },
  { name: 'Chidinma E.', avatar: 'C', rating: 4, quote: 'As someone who is always running late, the smart reminders are a lifesaver. I never miss my appointments now. The secure payment feature gives me peace of mind. Would love more professionals in my area!' },
  { name: 'Funke A.', avatar: 'F', rating: 5, quote: 'Beautcia has changed how I book beauty services. No more haggling or awkward payments. Everything is transparent and professional. I recommend it to all my friends!' },
  { name: 'Blessing N.', avatar: 'B', rating: 3, quote: 'Good concept and easy to use. I had a minor issue with rescheduling but customer support helped resolve it. The professionals are talented and the app is well designed.' },
  { name: 'Ngozi K.', avatar: 'N', rating: 4, quote: 'What I love most is the transparency. I can see prices upfront, compare different professionals, and choose based on my budget. No hidden fees, no surprises. Just great service!' },
  { name: 'Amaka U.', avatar: 'A', rating: 5, quote: 'The app is beautiful and easy to use. I booked a makeup artist for my wedding and she was perfect. Thank you Beautcia for making beauty services so accessible and stress-free!' },
];

export const TestimonialsSection = () => {
  return (
    <section className="testimonials-section">
      <div className="testimonials-container">
        <div className="testimonials-header">
          <SectionHeader
            kicker="Testimonials"
            title="Loved By Thousands Of Happy Customers"
            subtitle="See what our customers are saying about their Beautcia experience"
          />
        </div>

        <motion.div
          className="testimonials-grid"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {TESTIMONIALS.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
            >
              <GlassCard className="h-full" hover={true}>
                <div className="testimonial-card-inner">
                  <div className="testimonial-user">
                    <div className="testimonial-avatar">{testimonial.avatar}</div>
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
