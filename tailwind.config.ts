/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: ['class'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        serif: ['Playfair Display', 'serif'],
        heading: ['Poppins', 'system-ui', 'sans-serif'], 
        traditional: ['Noto Serif', 'serif'],
      },
      
      // NusaKala brand colors
      colors: {
        nusa: {
          cream: {
            DEFAULT: '#faf8f4',
            dark: '#f5f1e8',
          },
          beige: {
            DEFAULT: '#e8dcc0',
            dark: '#ddd0b0',
          },
          gold: {
            light: '#e5c659',
            DEFAULT: '#d4af37',
            dark: '#b8941f',
          },
          bronze: {
            light: '#d4944d',
            DEFAULT: '#cd7f32',
            dark: '#a66428',
          },
          brown: {
            light: '#a0521a',
            DEFAULT: '#8b4513',
            dark: '#6d350f',
          },
          'dark-brown': {
            DEFAULT: '#654321',
            darker: '#4a2f18',
          },
          red: {
            light: '#d63850',
            DEFAULT: '#c41e3a',
            dark: '#a01828',
          },
          green: {
            light: '#2da02d',
            DEFAULT: '#228b22',
            dark: '#1a6b1a',
          },
        },
        
        // Status colors with better contrast
        info: {
          50: '#eff6ff',
          100: '#dbeafe',
          200: '#bfdbfe',
          300: '#93c5fd',
          400: '#60a5fa',
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8',
          800: '#1e40af',
          900: '#1e3a8a',
          950: '#172554',
        },
        warning: {
          50: '#fffbeb',
          100: '#fef3c7',
          200: '#fde68a',
          300: '#fcd34d',
          400: '#fbbf24',
          500: '#f59e0b',
          600: '#d97706',
          700: '#b45309',
          800: '#92400e',
          900: '#78350f',
          950: '#451a03',
        },
        success: {
          50: '#f0fdf4',
          100: '#dcfce7',
          200: '#bbf7d0',
          300: '#86efac',
          400: '#4ade80',
          500: '#22c55e',
          600: '#16a34a',
          700: '#15803d',
          800: '#166534',
          900: '#14532d',
          950: '#052e16',
        },
        danger: {
          50: '#fef2f2',
          100: '#fee2e2',
          200: '#fecaca',
          300: '#fca5a5',
          400: '#f87171',
          500: '#ef4444',
          600: '#dc2626',
          700: '#b91c1c',
          800: '#991b1b',
          900: '#7f1d1d',
          950: '#450a0a',
        },
      },

      // Custom background images for gradients
      backgroundImage: {
        'gradient-primary': 'linear-gradient(135deg, #d4af37 0%, #cd7f32 50%, #8b4513 100%)',
        'gradient-secondary': 'linear-gradient(135deg, #cd7f32 0%, #d4af37 100%)',
        'gradient-accent': 'linear-gradient(135deg, #faf8f4 0%, #e8dcc0 100%)',
        'gradient-hero': 'linear-gradient(135deg, #e5c659 0%, #d4af37 30%, #cd7f32 70%, #8b4513 100%)',
      },

      // Custom box shadows
      boxShadow: {
        'nusa-gold': '0 4px 14px 0 rgba(212, 175, 55, 0.25)',
        'nusa-bronze': '0 4px 14px 0 rgba(205, 127, 50, 0.25)',
        'nusa-brown': '0 4px 14px 0 rgba(139, 69, 19, 0.25)',
      },

      // Custom animations
      keyframes: {
        'fade-in-up': {
          '0%': {
            opacity: '0',
            transform: 'translateY(30px)',
          },
          '100%': {
            opacity: '1',
            transform: 'translateY(0)',
          },
        },
        'slide-in-left': {
          '0%': {
            opacity: '0',
            transform: 'translateX(-30px)',
          },
          '100%': {
            opacity: '1',
            transform: 'translateX(0)',
          },
        },
        'slide-in-right': {
          '0%': {
            opacity: '0',
            transform: 'translateX(30px)',
          },
          '100%': {
            opacity: '1',
            transform: 'translateX(0)',
          },
        },
        float: {
          '0%, 100%': {
            transform: 'translateY(0px)',
          },
          '50%': {
            transform: 'translateY(-10px)',
          },
        },
        shimmer: {
          '0%': {
            backgroundPosition: '-200px 0',
          },
          '100%': {
            backgroundPosition: 'calc(200px + 100%) 0',
          },
        },
      },
      animation: {
        'fade-in-up': 'fade-in-up 0.8s ease-out',
        'slide-in-left': 'slide-in-left 0.8s ease-out',
        'slide-in-right': 'slide-in-right 0.8s ease-out',
        'float': 'float 3s ease-in-out infinite',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'shimmer': 'shimmer 2s linear infinite',
      },
    },
  },
  plugins: [],
}