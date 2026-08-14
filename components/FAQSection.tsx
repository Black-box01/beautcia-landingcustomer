'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SectionHeader } from '@/components/ui';
import { fetchFAQsClient } from '@/lib/cms';
import type { FAQ } from '@/lib/cms';
import './FAQSection.css';

const DEFAULT_FAQS: FAQ[] = [
  {
    question: 'How do I book a beauty service on Beautcia?',
    answer: 'Simply download the Beautcia app, create an account, browse beauty professionals in your area, choose your service and preferred time, and book instantly. You can filter by service type, location, rating, and price to find your perfect match.',
  },
  {
    question: 'Is it safe to pay through the app?',
    answer: 'Absolutely! Beautcia uses secure payment processing. Your money is held safely until your service is completed. This protects both you and the professional. No cash needed, no awkward transactions.',
  },
  {
    question: 'What if I need to cancel or reschedule my appointment?',
    answer: 'You can easily cancel or reschedule through the app. We recommend giving at least 24 hours notice. Cancellation policies may vary by professional, but we always aim to be fair to both customers and professionals.',
  },
  {
    question: 'How do I know the professionals are verified?',
    answer: 'All beauty professionals on Beautcia go through a verification process. They must provide valid identification, proof of qualifications, and portfolio photos. We only accept verified professionals onto the platform.',
  },
  {
    question: 'Can I see reviews before booking?',
    answer: 'Yes! All reviews are from verified customers who have actually booked and received services. You can read detailed reviews, see ratings, and make informed decisions based on real experiences.',
  },
  {
    question: 'What services can I book on Beautcia?',
    answer: 'Beautcia offers a wide range of beauty services including hair styling, makeup artistry, nail services, skincare treatments, massages, waxing, threading, and more. We are constantly adding new services and professionals.',
  },
];

interface FAQItemProps {
  question: string;
  answer: string;
  isOpen: boolean;
  onClick: () => void;
  number: number;
}

const FAQItem = ({ question, answer, isOpen, onClick, number }: FAQItemProps) => (
  <motion.div
    className={`faq-item ${isOpen ? 'faq-item-active' : ''}`}
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.4, delay: number * 0.05 }}
  >
    <div className="faq-item-header" onClick={onClick}>
      <div className="faq-number">{String(number).padStart(2, '0')}</div>
      <h3 className="faq-question">{question}</h3>
      <motion.div
        animate={{ rotate: isOpen ? 180 : 0 }}
        transition={{ duration: 0.3 }}
        className="faq-icon"
      >
        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </motion.div>
    </div>

    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
          className="faq-answer-wrapper"
        >
          <div className="faq-answer-inner">
            <p className="faq-answer">{answer}</p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  </motion.div>
);

export const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [faqs, setFaqs] = useState<FAQ[]>(DEFAULT_FAQS);

  useEffect(() => {
    fetchFAQsClient().then((data) => {
      if (data.length > 0) setFaqs(data);
    });
  }, []);

  return (
    <section className="faq-section">
      <div className="faq-container">
        <div className="faq-header">
          <SectionHeader
            kicker="FAQ"
            title="Common Questions From Customers"
            subtitle="Everything you need to know about booking with Beautcia"
          />
        </div>

        <div className="faq-list">
          {faqs.map((faq, index) => (
            <FAQItem
              key={index}
              number={index + 1}
              question={faq.question}
              answer={faq.answer}
              isOpen={openIndex === index}
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
