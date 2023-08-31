import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        border: '#e4e4e7',
        input: '#e4e4e7',
        ring: '#18181b',
        background: '#ffffff',
        foreground: '#0a0a0a',
        primary: {
          DEFAULT: '#18181b',
          foreground: '#fafafa',
        },
        secondary: {
          DEFAULT: '#f4f4f5',
          foreground: '#0a0a0a',
        },
        destructive: {
          DEFAULT: '#ef4444',
          foreground: '#fafafa',
        },
        muted: {
          DEFAULT: '#f4f4f5',
          foreground: '#71717a',
        },
        accent: {
          DEFAULT: '#f4f4f5',
          foreground: '#18181b',
        },
        popover: {
          DEFAULT: '#ffffff',
          foreground: '#09090b;',
        },
        card: {
          DEFAULT: '#ffffff',
          foreground: '#09090b',
        },
      },
      borderRadius: {
        xl: `12px`,
        lg: `8px`,
        md: `6px`,
        sm: '4px',
      },
    },
  },
  plugins: [],
};
export default config;
