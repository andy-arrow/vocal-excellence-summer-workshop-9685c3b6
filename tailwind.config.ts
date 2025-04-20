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
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px'
      }
    },
    extend: {
      colors: {
        border: 'hsl(0 0% 85%)', // Light gray border
        input: 'hsl(0 0% 85%)',
        ring: 'hsl(0 0% 0%)', // Pure black
        background: 'hsl(0 0% 100%)', // Pure white
        foreground: 'hsl(0 0% 0%)', // Pure black
        primary: {
          DEFAULT: 'hsl(0 0% 0%)', // Pure black
          foreground: 'hsl(0 0% 100%)' // Pure white
        },
        secondary: {
          DEFAULT: 'hsl(0 0% 95%)', // Very light gray
          foreground: 'hsl(0 0% 0%)' // Pure black
        },
        destructive: {
          DEFAULT: 'hsl(0 0% 0%)', // Pure black
          foreground: 'hsl(0 0% 100%)' // Pure white
        },
        muted: {
          DEFAULT: 'hsl(0 0% 95%)', // Very light gray
          foreground: 'hsl(0 0% 40%)' // Dark gray
        },
        accent: {
          DEFAULT: 'hsl(0 0% 95%)', // Very light gray
          foreground: 'hsl(0 0% 0%)' // Pure black
        },
        popover: {
          DEFAULT: 'hsl(0 0% 100%)', // Pure white
          foreground: 'hsl(0 0% 0%)' // Pure black
        },
        card: {
          DEFAULT: 'hsl(0 0% 100%)', // Pure white
          foreground: 'hsl(0 0% 0%)' // Pure black
        },
        // Remove vibrant color palette
        charcoal: {
          DEFAULT: '#000000', // Pure black
          50: '#ffffff', // Pure white
          100: '#f8f8f8',
          200: '#e0e0e0',
          300: '#c8c8c8',
          400: '#909090',
          500: '#808080',
          600: '#595959',
          700: '#404040',
          800: '#262626',
          900: '#000000',
        },
        coral: {
          DEFAULT: '#000000', // Changed to black
          50: '#ffffff',
          100: '#f8f8f8',
          200: '#e0e0e0',
          300: '#c8c8c8',
          400: '#909090',
          500: '#808080',
          600: '#595959',
          700: '#404040',
          800: '#262626',
          900: '#000000',
        },
        stone: {
          50: '#ffffff',
          100: '#f8f8f8',
          200: '#e0e0e0',
          300: '#c8c8c8',
          400: '#909090',
          500: '#808080',
          600: '#595959',
          700: '#404040',
          800: '#262626',
          900: '#000000',
        },
      },
      fontFamily: {
        // Define consistent font families
        sans: ['Didot', 'serif'],
        serif: ['Didot', 'serif'],
        outfit: ['Didot', 'serif'], // Replacing Outfit with Didot
      },
      fontSize: {
        // Define consistent font sizes
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
      },
    },
  },
  plugins: [require("tailwindcss-animate"), require("@tailwindcss/typography")],
} satisfies Config;
