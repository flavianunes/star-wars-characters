import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    colors: {
      blue: '#002B53',
      'gray-dark': '#333333',
      gray: '#666666',
      'gray-light': '#757575',
      'gray-extra-light': '#C8C8C8',
      'gray-extra-lighter': '#E6E6E6',
      black: '#000000',
    },
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      borderWidth: {
        1: '1px',
      },
      lineHeight: {
        '11': '46px',
      },
      spacing: {
        '6.5': '25px',
        '13': '50px',
      },
      fontSize: {
        '1.5xl': '1.375rem',
        '3.5xl': '2rem',
        '5.5xl': '3.375rem',
      },
      width: {
        '38': '9.875rem',
      },
      height: {
        '57': '14.375rem',
      },
    },
  },
  plugins: [],
};
export default config;
