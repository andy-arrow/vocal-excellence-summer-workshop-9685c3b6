
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
			fontFamily: {
				sans: ['Poppins', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Helvetica Neue', 'sans-serif'],
				outfit: ['Outfit', 'sans-serif'],
				poppins: ['Poppins', 'sans-serif'],
				serif: ['Playfair Display', 'Georgia', 'serif'],
			},
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				// Vibrant color palette for youth-friendly design
				energy: {
					purple: '#7C3AED',
					pink: '#EC4899',
					cyan: '#06B6D4',
					yellow: '#FBBF24',
					green: '#10B981',
				},
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			keyframes: {
				'accordion-down': {
					from: { height: '0' },
					to: { height: 'var(--radix-accordion-content-height)' }
				},
				'accordion-up': {
					from: { height: 'var(--radix-accordion-content-height)' },
					to: { height: '0' }
				},
				'fade-in': {
					'0%': { opacity: '0', transform: 'translateY(10px)' },
					'100%': { opacity: '1', transform: 'translateY(0)' }
				},
				'fade-in-left': {
					'0%': { opacity: '0', transform: 'translateX(-20px)' },
					'100%': { opacity: '1', transform: 'translateX(0)' }
				},
				'fade-in-right': {
					'0%': { opacity: '0', transform: 'translateX(20px)' },
					'100%': { opacity: '1', transform: 'translateX(0)' }
				},
				'scale-in': {
					'0%': { opacity: '0', transform: 'scale(0.95)' },
					'100%': { opacity: '1', transform: 'scale(1)' }
				},
				'float': {
					'0%, 100%': { transform: 'translateY(0)' },
					'50%': { transform: 'translateY(-10px)' }
				},
				'pulse-slow': {
					'0%, 100%': { opacity: '0.8' },
					'50%': { opacity: '1' }
				},
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'fade-in': 'fade-in 0.6s ease-out',
				'fade-in-left': 'fade-in-left 0.6s ease-out',
				'fade-in-right': 'fade-in-right 0.6s ease-out',
				'scale-in': 'scale-in 0.5s ease-out',
				'float': 'float 3s ease-in-out infinite',
				'pulse-slow': 'pulse-slow 3s ease-in-out infinite',
			},
			backgroundImage: {
				'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
				'hero-pattern': 'linear-gradient(rgba(124, 58, 237, 0.7), rgba(236, 72, 153, 0.6))',
				'energy-gradient': 'linear-gradient(135deg, #7C3AED 0%, #EC4899 50%, #06B6D4 100%)',
			},
			typography: {
				DEFAULT: {
					css: {
						maxWidth: 'none',
						color: '#1d1d1f',
						lineHeight: '1.47059',
						p: {
							marginTop: '0.8em',
							marginBottom: '0.8em',
						},
						a: {
							color: '#06c',
							textDecoration: 'none',
							'&:hover': {
								textDecoration: 'underline',
							},
						},
						h1: {
							fontWeight: '600',
							letterSpacing: '-.009em',
						},
						h2: {
							fontWeight: '600',
							letterSpacing: '-.009em',
							marginTop: '1.6em',
							marginBottom: '0.8em',
						},
						h3: {
							fontWeight: '600',
							marginTop: '1.4em',
							marginBottom: '0.6em',
						},
						ul: {
							marginTop: '0.8em',
							marginBottom: '0.8em',
							paddingLeft: '1.4em',
						},
						li: {
							marginTop: '0.3em',
							marginBottom: '0.3em',
						},
					},
				},
			},
		}
	},
	// Safelist critical classes that might be dynamically used
	safelist: [
		'bg-energy-purple',
		'bg-energy-pink',
		'bg-energy-cyan',
		'text-white',
		'animate-fade-in',
		'animate-scale-in',
	],
	plugins: [
		require("tailwindcss-animate"),
		require("@tailwindcss/typography"),
	],
	// Reduce variants to improve build time
	variants: {
		extend: {
			opacity: ['active'],
			scale: ['active', 'group-hover'],
			translate: ['group-hover'],
		},
	},
} satisfies Config;
