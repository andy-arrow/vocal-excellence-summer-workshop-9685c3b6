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
				sans: [
					'system-ui',
					'-apple-system',
					'BlinkMacSystemFont',
					'Segoe UI',
					'Roboto',
					'Helvetica Neue',
					'Arial',
					'sans-serif'
				],
				serif: [
					'Didot',
					'Garamond',
					'Times New Roman',
					'Times',
					'serif'
				],
				outfit: ['Outfit', 'sans-serif'],
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
				blue: {
					50: '#f0f5ff',
					100: '#e5eeff',
					200: '#c5d8ff',
					300: '#a4bdff',
					400: '#8599ff',
					500: '#6574ff',
					600: '#3b4bdb',
					700: '#3e4fcc',
					800: '#2d3b94',
					900: '#1e2c6a',
				},
				gray: {
					50: '#f8fafc',
					100: '#f1f5f9',
					200: '#e2e8f0',
					300: '#cbd5e1',
					400: '#94a3b8',
					500: '#64748b',
					600: '#475569',
					700: '#334155',
					800: '#1e293b',
					900: '#0f172a',
				},
				charcoal: {
					DEFAULT: '#403E43',
					50: 'rgba(64, 62, 67, 0.5)',
					70: 'rgba(64, 62, 67, 0.7)',
					80: 'rgba(64, 62, 67, 0.8)',
				},
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			spacing: {
				xs: '0.25rem',
				sm: '0.5rem',
				md: '1rem',
				lg: '1.5rem',
				xl: '2rem',
				'2xl': '3rem',
				'3xl': '4rem',
			},
			boxShadow: {
				sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
				DEFAULT: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
				md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
				lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
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
						fontFamily: 'Didot, Garamond, Times New Roman, Times, serif',
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
							fontFamily: 'Didot, Garamond, Times New Roman, Times, serif',
						},
						h2: {
							fontWeight: '600',
							letterSpacing: '-.009em',
							marginTop: '1.6em',
							marginBottom: '0.8em',
							fontFamily: 'Didot, Garamond, Times New Roman, Times, serif',
						},
						h3: {
							fontWeight: '600',
							marginTop: '1.4em',
							marginBottom: '0.6em',
							fontFamily: 'Didot, Garamond, Times New Roman, Times, serif',
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
	variants: {
		extend: {
			opacity: ['active'],
			scale: ['active', 'group-hover'],
			translate: ['group-hover'],
		},
	},
} satisfies Config;
