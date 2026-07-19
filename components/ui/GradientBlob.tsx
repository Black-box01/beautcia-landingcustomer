'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { blobs } from '@/lib/constants';
import './GradientBlob.css';

interface GradientBlobProps {
  className?: string;
  size?: 'small' | 'medium' | 'large';
  color?: 'gold' | 'lightGold' | 'white';
  position?: {
    top?: string;
    right?: string;
    bottom?: string;
    left?: string;
  };
  opacity?: number;
  blur?: boolean;
  orbit?: boolean;
  orbitDuration?: number;
}

export const GradientBlob = ({
  className = '',
  size = 'medium',
  color = 'gold',
  position,
  opacity = 1,
  blur = true,
  orbit = false,
  orbitDuration = 30,
}: GradientBlobProps) => {
  const sizeClass = `gradient-blob-${size}`;
  const blurClass = blur ? 'gradient-blob-blur' : '';

  const colorMap = {
    gold: 'rgba(178, 139, 83, 0.9)',
    lightGold: 'rgba(212, 165, 116, 0.9)',
    white: 'rgba(255, 255, 255, 0.5)',
  };

  return (
    <motion.div
      className={`gradient-blob ${sizeClass} ${blurClass} ${orbit ? 'gradient-blob-orbit' : ''} ${className}`}
      style={{
        opacity: opacity * blobs.opacity.high,
        background: `radial-gradient(circle at 30% 30%, ${colorMap[color]}, transparent 70%)`,
        ...position,
        '--orbit-duration': `${orbitDuration}s`,
      } as React.CSSProperties}
      animate={{
        scale: [1, 1.1, 1],
        opacity: [opacity * blobs.opacity.low, opacity * blobs.opacity.high, opacity * blobs.opacity.low],
        rotate: [0, 360],
      }}
      transition={{
        scale: {
          duration: 8,
          repeat: Infinity,
          ease: 'easeInOut',
        },
        opacity: {
          duration: 8,
          repeat: Infinity,
          ease: 'easeInOut',
        },
        rotate: {
          duration: 20,
          repeat: Infinity,
          ease: 'linear',
        },
      }}
    />
  );
};
