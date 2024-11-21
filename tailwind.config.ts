import type { Config } from 'tailwindcss';
import forms from '@tailwindcss/forms';
import typography from '@tailwindcss/typography';

const config: Config = {
  darkMode: 'class',
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    screens: {
      smMobile: { min: '300px', max: '768px' },

      md: { min: '768px', max: '1024px' },
      // => @media (min-width: 768px and max-width: 1023px)

      lg: { min: '1024px', max: '1280px' },
      // => @media (min-width: 1024px and max-width: 1279px)

      xl: { min: '1280px', max: '1535px' },
      // => @media (min-width: 1280px and max-width: 1535px)

      '2xl': { min: '1536px' },
      // => @media (min-width: 1536px and max-width: 1905px)
    },
    extend: {
      boxShadow: {
        custom: '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
      },
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',
      },
    },
  },
  plugins: [forms, typography],
};

export default config;
