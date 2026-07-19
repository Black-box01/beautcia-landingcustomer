/**
 * Beautcia Customer Landing Page - Design System Constants
 * Based on the mobile app brand colors and design specifications
 */

// Brand Colors (from Beautcia mobile app)
export const colors = {
  // Primary brand colors from mobile app
  primary: '#B28B53', // Gold/Bronze - MAIN BRAND COLOR (now used as background)
  secondary: '#FFFFFF', // White - for text and elements on gold background
  accent: '#B28B53', // Using brand's gold/bronze as accent
  
  // Extended palette
  white: '#FFFFFF',
  black: '#000000',
  
  // Grays
  lightGray: '#F5F5F5',
  gray: '#CCCCCC',
  darkGray: '#666666',
  
  // Semantic colors
  success: '#10B981',
  error: '#EF4444',
  warning: '#F59E0B',
  
  // Theme surfaces - Light theme only
  surface: {
    light: '#FFFFFF',
    dark: '#151718',
    secondary: {
      light: '#F0F2F5',
      dark: '#21262D',
    },
  },
  
  // Text colors - optimized for gold background
  text: {
    primary: {
      light: '#FFFFFF', // White text on gold background
      dark: '#ECEDEE',
    },
    secondary: 'rgba(255, 255, 255, 0.85)', // Slightly transparent white
    tertiary: 'rgba(255, 255, 255, 0.65)', // More transparent white
  },
  
  // Gradients using brand colors (gold/bronze)
  gradients: {
    gold: 'linear-gradient(135deg, #B28B53, #D4A574)',
    goldLight: 'linear-gradient(135deg, rgba(178,139,83,0.2), rgba(212,165,116,0.2))',
    accentBar: 'linear-gradient(90deg, #B28B53, #D4A574)',
  },
};

// Typography Scale
export const typography = {
  fontSizes: {
    kicker: '12px',
    small: '13px',
    body: '14px',
    sectionTitle: '22px',
    h1: '44px',
  },
  fontWeights: {
    regular: 400,
    medium: 500,
    semiBold: 600,
    bold: 700,
    extraBold: 800,
    black: 900,
  },
  lineHeights: {
    tight: '1.2',
    normal: '1.5',
    relaxed: '1.8',
  },
  letterSpacing: {
    kicker: '1.2px',
    normal: 'normal',
  },
};

// Spacing System (4px base unit)
export const spacing = {
  xs: '4px',
  sm: '8px',
  md: '16px',
  lg: '24px',
  xl: '32px',
  '2xl': '40px',
  '3xl': '48px',
  '4xl': '64px',
};

// Border Radius
export const borderRadius = {
  sm: '4px',
  md: '8px',
  lg: '12px',
  xl: '16px',
  '2xl': '20px',
  '3xl': '24px',
  full: '9999px',
};

// Animation Constants
export const animations = {
  durations: {
    fast: '150ms',
    normal: '300ms',
    slow: '450ms',
    carousel: '1150ms',
    marquee: '6000ms',
    float: '6400ms',
  },
  easing: {
    linear: 'linear',
    easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
    easeOut: 'cubic-bezier(0, 0, 0.2, 1)',
    easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
    cubicOut: 'cubic-bezier(0.33, 1, 0.68, 1)',
    quadInOut: 'cubic-bezier(0.45, 0, 0.55, 1)',
  },
  carousel: {
    delay: 1100,
    animation: 1150,
    pause: 1650,
    interval: 2800,
  },
  marquee: {
    speed: 48, // pixels per second
    minDuration: 6, // seconds
  },
  float: {
    distance: 10, // pixels
    duration: 6400, // ms total (3200 up + 3200 down)
  },
};

// Breakpoints
export const breakpoints = {
  mobile: '768px',
  tablet: '1024px',
  desktop: '1280px',
};

// Layout Constants
export const layout = {
  sectionMargin: '34px',
  sectionPadding: '18px',
  cardPadding: {
    sm: '12px',
    md: '16px',
  },
  gap: {
    sm: '10px',
    md: '14px',
    lg: '18px',
  },
  maxWidth: {
    section: '620px',
    container: '1200px',
  },
  minHeight: {
    section: 'min(70vh, 520px)',
  },
};

// Component Specific Constants
export const components = {
  hero: {
    carouselCard: {
      width: '172px',
      height: '302px',
      borderRadius: '24px',
      visibleCards: 6,
    },
    perspective: '1200px',
    rotation: {
      y: 22, // degrees
      z: 20, // degrees
    },
  },
  features: {
    cardWidth: {
      small: '320px',
      large: '420px',
    },
    imageHeight: {
      desktop: '118px',
      mobile: '92px',
    },
  },
  testimonials: {
    cardWidth: {
      desktop: '360px',
      mobile: '260px',
    },
    avatarSize: '38px',
    arrowSize: '36px',
  },
  team: {
    cardWidth: '260px',
    avatarAspectRatio: 1,
  },
  faq: {
    cardWidth: '520px',
  },
  steps: {
    badgeSize: '28px',
    cardWidth: '360px',
  },
  buttons: {
    primary: {
      padding: '20px 16px',
      borderRadius: '18px',
      minWidth: '180px',
    },
    hero: {
      pill: {
        padding: '12px 10px',
        borderRadius: '16px',
      },
      icon: {
        size: '40px',
        borderRadius: '18px',
      },
    },
  },
};

// Gradient Configurations (using brand gold/bronze colors)
export const gradients = {
  decorative: {
    problem: 'linear-gradient(135deg, rgba(178,139,83,0.20), rgba(255,255,255,0.00) 40%, rgba(212,165,116,0.15))',
    features: 'linear-gradient(135deg, rgba(255,255,255,0.00), rgba(178,139,83,0.12) 45%, rgba(255,255,255,0.00))',
    works: 'linear-gradient(135deg, rgba(212,165,116,0.20), rgba(255,255,255,0.00) 45%, rgba(178,139,83,0.15))',
    cta: 'linear-gradient(135deg, rgba(178,139,83,0.25), rgba(212,165,116,0.20), rgba(255,255,255,0.00))',
  },
  accentBar: 'linear-gradient(90deg, #B28B53, #D4A574)',
  cardBorder: 'linear-gradient(135deg, rgba(178,139,83,0.4), rgba(212,165,116,0.4))',
};

// Blob Configurations
export const blobs = {
  sizes: {
    small: '220px',
    medium: '300px',
    large: '380px',
  },
  opacity: {
    low: 0.45,
    high: 0.7,
  },
  colors: [
    'rgba(178, 139, 83, 0.5)', // Gold/Bronze (brand color)
    'rgba(212, 165, 116, 0.5)', // Light Gold
    'rgba(255, 255, 255, 0.5)', // White
  ],
};
