
import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        apple: {
          text: '#1d1d1f',
          grey: '#86868b',
          blue: '#0071e3',
          'blue-hover': '#0077ED',
          light: '#f5f5f7',
          'light-hover': '#e8e8ed',
          border: '#d2d2d7',
        },
        energy: {
          purple: '#0071e3', // Changed to Apple blue
          pink: '#1d1d1f',   // Changed to Apple dark text
          cyan: '#86868b',   // Changed to Apple grey
          yellow: '#f5f5f7', // Changed to Apple light
          green: '#06c',     // Apple accent blue
        },
        charcoal: {
          DEFAULT: '#403E43',
          50: 'rgba(64, 62, 67, 0.5)',
          70: 'rgba(64, 62, 67, 0.7)',
          80: 'rgba(64, 62, 67, 0.8)',
        },
      },
      fontFamily: {
        sans: ['SF Pro Text', 'SF Pro Icons', 'Helvetica Neue', 'Helvetica', 'Arial', 'sans-serif'],
        serif: [
          'New York',
          'Georgia',
          'Times New Roman',
          'Times',
          'serif'
        ],
        outfit: ['SF Pro Display', 'SF Pro Text', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        'display-lg': ['4.5rem', { lineHeight: '1.1', letterSpacing: '-0.02em' }],
        'display': ['3.75rem', { lineHeight: '1.1', letterSpacing: '-0.02em' }],
        'h1': ['3rem', { lineHeight: '1.2', letterSpacing: '-0.01em' }],
        'h2': ['2.25rem', { lineHeight: '1.3', letterSpacing: '-0.01em' }],
        'h3': ['1.875rem', { lineHeight: '1.4', letterSpacing: '-0.01em' }],
        'h4': ['1.5rem', { lineHeight: '1.4', letterSpacing: '-0.01em' }],
        'body-lg': ['1.125rem', { lineHeight: '1.6' }],
        'body': ['1rem', { lineHeight: '1.6' }],
        'sm': ['0.875rem', { lineHeight: '1.5' }],
        'xs': ['0.75rem', { lineHeight: '1.5' }],
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)'
      },
      spacing: {
        'safe-top': 'env(safe-area-inset-top)',
        'safe-bottom': 'env(safe-area-inset-bottom)',
        'safe-left': 'env(safe-area-inset-left)',
        'safe-right': 'env(safe-area-inset-right)',
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
        to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        'pulse-slow': 'pulse 3s ease-in-out infinite',
      },
      screens: {
        xs: '380px',
      },
      maxWidth: {
        '8xl': '88rem',
        '9xl': '96rem',
      },
      zIndex: {
        '60': '60',
        '70': '70',
        '80': '80',
        '90': '90',
        '100': '100',
      },
    },
  },
  plugins: [require("tailwindcss-animate"), require("@tailwindcss/typography")],
} satisfies Config;
