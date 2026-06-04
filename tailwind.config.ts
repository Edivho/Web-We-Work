import type { Config } from 'tailwindcss';

export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'warm-beige': 'var(--color-warm-beige)',
        'coffee-brown': 'var(--color-coffee-brown)',
        'coffee-dark': 'var(--color-coffee-dark)',
        'coffee-light': 'var(--color-coffee-light)',
        'dark-gray': 'var(--color-dark-gray)',
        'brand-charcoal': 'var(--color-brand-charcoal)',
      },
      fontFamily: {
        sans: ['var(--font-sans)'],
        display: ['var(--font-display)'],
        mono: ['var(--font-mono)'],
      },
    },
  },
} satisfies Config;
