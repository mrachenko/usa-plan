import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        bg: 'var(--color-bg)',
        surface: 'var(--color-surface)',
        text: 'var(--color-text)',
        muted: 'var(--color-muted)',
        'muted-dark': 'var(--color-muted-dark)',
        gold: 'var(--color-gold)',
        'gold-dim': 'rgba(232,200,122,0.1)',
        food: '#f0a050',
        hotel: '#90e870',
        ferry: '#64b4ff',
        flight: '#ff6b6b',
        nature: '#50c878',
        drive: '#c8c0b4',
        'region-ny': '#e8c87a',
        'region-parks': '#e07040',
        'region-la': '#64b4ff',
        'region-maui': '#40c8a0',
        'region-transit': '#c8c0b4',
      },
      fontFamily: {
        display: ['Playfair Display', 'serif'],
        sans: ['DM Sans', 'sans-serif'],
      },
    },
  },
  plugins: [],
};

export default config;
