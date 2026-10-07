import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Brand Colors - Warm & Premium
        brand: {
          50: '#FDFAF7',
          100: '#FAF4ED',
          200: '#F5EDE1',
          300: '#E4D0B8',
          400: '#D4B896',
          500: '#C09A72', // Primary brand
          600: '#A87D54',
          700: '#8C6440',
          800: '#6B4E31',
          900: '#4A3622',
        },
        // Neutral Warm Greys
        warm: {
          50: '#FEFEFD',
          100: '#F8F7F5',
          200: '#F1EFEC',
          300: '#E6E3DE',
          400: '#CEC9C1',
          500: '#ADA89F',
          600: '#8A8580',
          700: '#5C5852',
          800: '#3A3731',
          900: '#1E1C18',
        },
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        serif: ['var(--font-playfair)', 'Georgia', 'serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-out',
        'fade-up': 'fadeUp 0.6s ease-out',
        'slide-in': 'slideIn 0.4s ease-out',
        'scale-in': 'scaleIn 0.3s ease-out',
        'shimmer': 'shimmer 2s linear infinite',
        'pulse-glow': 'pulseGlow 2s ease-in-out infinite',
        'float': 'float 3s ease-in-out infinite',
        'bounce-subtle': 'bounceSubtle 2s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideIn: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(0)' },
        },
        scaleIn: {
          '0%': { transform: 'scale(0.9)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        pulseGlow: {
          '0%, 100%': { boxShadow: '0 0 20px rgba(192, 154, 114, 0.3)' },
          '50%': { boxShadow: '0 0 40px rgba(192, 154, 114, 0.6)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        bounceSubtle: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-5px)' },
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-warm': 'linear-gradient(135deg, #C09A72 0%, #E5D4B8 50%, #C09A72 100%)',
        'gradient-soft': 'linear-gradient(150deg, #FAF8F5 0%, #F5EDE1 50%, #FAF4ED 100%)',
        'gradient-hero': 'linear-gradient(160deg, #FDFCFB 0%, #FAF7F2 20%, #F5EDE1 40%, #FAF0E8 55%, #F8F3EC 70%, #FDFAF7 85%, #FEFEFE 100%)',
        'glass-gradient': 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)',
      },
      backdropBlur: {
        xs: '2px',
      },
      boxShadow: {
        'soft': '0 2px 10px rgba(60, 40, 20, 0.06)',
        'medium': '0 6px 24px rgba(60, 40, 20, 0.07)',
        'large': '0 14px 44px rgba(60, 40, 20, 0.09)',
        'xl': '0 28px 72px rgba(60, 40, 20, 0.11)',
        'brand': '0 6px 22px rgba(168, 125, 84, 0.20)',
        'brand-lg': '0 14px 40px rgba(168, 125, 84, 0.26)',
        'glass': '0 8px 32px 0 rgba(31, 38, 135, 0.07)',
        'glow': '0 0 20px rgba(192, 154, 114, 0.4)',
      },
    },
  },
  plugins: [],
}

export default config
