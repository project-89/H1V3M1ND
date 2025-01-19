/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ['class'],
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        // Base theme colors
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        card: 'hsl(var(--card))',
        'card-foreground': 'hsl(var(--card-foreground))',
        popover: 'hsl(var(--popover))',
        'popover-foreground': 'hsl(var(--popover-foreground))',
        primary: 'hsl(var(--primary))',
        'primary-foreground': 'hsl(var(--primary-foreground))',
        secondary: 'hsl(var(--secondary))',
        'secondary-foreground': 'hsl(var(--secondary-foreground))',
        muted: 'hsl(var(--muted))',
        'muted-foreground': 'hsl(var(--muted-foreground))',
        accent: 'hsl(var(--accent))',
        'accent-foreground': 'hsl(var(--accent-foreground))',
        destructive: 'hsl(var(--destructive))',
        'destructive-foreground': 'hsl(var(--destructive-foreground))',
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',

        // Cyberpunk theme
        'cyber-dark': '#13111C',
        'cyber-darker': '#0c0a14',
        'cyber-black': '#0a0814',

        // Neon colors
        neon: {
          purple: '#9d4edd',
          pink: '#ff2ecc',
          blue: '#4b50e6',
        },

        // Main theme colors
        cyber: {
          purple: '#2d1b69',
          'purple-light': '#6247aa',
          pink: '#ff2ecc',
        },

        // Purple spectrum
        'cyber-purple': {
          DEFAULT: '#2d1b69',
          light: '#6247aa',
          dark: '#1a1040',
        },

        // Pink spectrum
        'neon-pink': {
          DEFAULT: '#ff2ecc',
          dark: '#d431ab',
          light: '#ff71d9',
        },

        // Accent colors
        'cyber-blue': {
          DEFAULT: '#4b50e6',
          dark: '#2e32b8',
          light: '#787bff',
        },
        'cyber-green': {
          DEFAULT: '#00ff9f',
          dark: '#00cc7f',
          light: '#33ffb5',
        },

        // Status colors
        'status-success': '#00ff9f',
        'status-warning': '#ffb800',
        'status-error': '#ff3e3e',
        'status-info': '#4b50e6',

        // Text colors
        'cyber-text': {
          DEFAULT: '#ffffff',
          secondary: '#94a1b2',
          disabled: '#4a4a4a',
        },
      },
      boxShadow: {
        cyber: '0 0 10px theme(colors.cyber-purple.light)',
        'cyber-md': '0 0 20px theme(colors.cyber-purple.light)',
        'cyber-lg': '0 0 30px theme(colors.cyber-purple.light)',
      },
      keyframes: {
        shimmer: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' },
        },
        contentShow: {
          from: { opacity: 0, transform: 'scale(0.96)' },
          to: { opacity: 1, transform: 'scale(1)' },
        },
        contentHide: {
          from: { opacity: 1, transform: 'scale(1)' },
          to: { opacity: 0, transform: 'scale(0.96)' },
        },
        glow: {
          '0%, 100%': { filter: 'brightness(1)' },
          '50%': { filter: 'brightness(1.2)' },
        },
      },
      animation: {
        contentShow: 'contentShow 300ms cubic-bezier(0.16, 1, 0.3, 1)',
        contentHide: 'contentHide 300ms cubic-bezier(0.16, 1, 0.3, 1)',
        glow: 'glow 3s infinite',
      },
    },
  },
  plugins: [],
};
