import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './lib/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        panel: '#111827',
        glass: 'rgba(255,255,255,0.05)'
      },
      boxShadow: {
        glow: '0 0 24px rgba(59,130,246,0.25)'
      }
    }
  },
  plugins: []
};

export default config;
