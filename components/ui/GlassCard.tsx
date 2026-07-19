'use client';

import React from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';
import './GlassCard.css';

interface GlassCardProps extends HTMLMotionProps<'div'> {
  children: React.ReactNode;
  className?: string;
  variant?: 'default' | 'featured';
  hover?: boolean;
}

export const GlassCard = ({
  children,
  className = '',
  variant = 'default',
  hover = true,
  ...props
}: GlassCardProps) => {
  const hoverClass = hover ? 'glass-card-hover' : '';
  const featuredClass = variant === 'featured' ? 'glass-card-featured' : '';

  return (
    <motion.div
      className={`glass-card ${hoverClass} ${featuredClass} ${className}`}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
      {...props}
    >
      <div className="glass-card-border" />
      <div className="glass-card-content">
        {children}
      </div>
    </motion.div>
  );
};
