/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      // Aspect ratios for responsive elements
      aspectRatio: {
        1: '1',
        '4/3': '4 / 3',
        '3/4': '3 / 4',
        '16/9': '16 / 9',
        '9/16': '9 / 16',
      },
      // Add consistent spacing for containers
      spacing: {
        128: '32rem',
        144: '36rem',
      },
      // Add custom colors for your brand
      colors: {
        brand: {
          light: '#4da8da',
          DEFAULT: '#0078b4',
          dark: '#004d73',
        },
      },
      // Add custom animation durations
      transitionDuration: {
        2000: '2000ms',
      },
    },
  },
  plugins: [],
};
