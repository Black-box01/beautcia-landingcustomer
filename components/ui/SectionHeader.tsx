'use client';

import React from 'react';
import { motion } from 'framer-motion';
import './SectionHeader.css';

interface SectionHeaderProps {
  kicker?: string;
  title: string;
  subtitle?: string;
  className?: string;
  centered?: boolean;
}

export const SectionHeader = ({
  kicker,
  title,
  subtitle,
  className = '',
  centered = true,
}: SectionHeaderProps) => {
  const alignClass = centered ? 'section-header-centered' : 'section-header-left';

  return (
    <motion.div
      className={`section-header ${alignClass} ${className}`}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
    >
      {kicker && (
        <span className="section-header-kicker">{kicker}</span>
      )}
      <h2 className="section-header-title">{title}</h2>
      <div className="section-header-accent-bar" />
      {subtitle && (
        <p className="section-header-subtitle">{subtitle}</p>
      )}
    </motion.div>
  );
};
