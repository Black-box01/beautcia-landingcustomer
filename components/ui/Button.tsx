'use client';

import React from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';
import './Button.css';

interface ButtonProps extends HTMLMotionProps<'button'> {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg' | 'hero-pill' | 'hero-icon';
  fullWidth?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  loading?: boolean;
}

export const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  leftIcon,
  rightIcon,
  loading = false,
  className = '',
  ...props
}: ButtonProps) => {
  const variantClass = `btn-${variant}`;
  const sizeClass = `btn-${size}`;
  const fullClass = fullWidth ? 'btn-full' : '';

  return (
    <motion.button
      className={`btn ${variantClass} ${sizeClass} ${fullClass} ${className}`}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      disabled={loading || props.disabled}
      {...props}
    >
      {loading && (
        <motion.svg
          className="btn-spinner"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle className="btn-spinner-circle" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="btn-spinner-path" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
        </motion.svg>
      )}

      {!loading && leftIcon && (
        <span className="btn-icon-left">{leftIcon}</span>
      )}

      <span className={loading ? 'btn-text-hidden' : ''}>{children}</span>

      {!loading && rightIcon && (
        <span className="btn-icon-right">{rightIcon}</span>
      )}
    </motion.button>
  );
};
