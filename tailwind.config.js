/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        cream: '#F5F0E8',
        'warm-beige': '#E8D5C0',
        'off-white': '#FAFAF8',
        terracotta: '#C4623A',
        ink: '#1A1A1A',
      },
      fontFamily: {
        syne: ['Syne', 'sans-serif'],
        mono: ['"Space Mono"', 'monospace'],
        inter: ['Inter', 'sans-serif'],
      },
      boxShadow: {
        brutal: '5px 5px 0 #1A1A1A',
        'brutal-lg': '7px 7px 0 #1A1A1A',
        'brutal-dark': '5px 5px 0 #F5F0E8',
        'brutal-dark-lg': '7px 7px 0 #F5F0E8',
      },
      animation: {
        'ping-slow': 'ping 2s cubic-bezier(0, 0, 0.2, 1) infinite',
        marquee: 'marquee 22s linear infinite',
        'marquee-reverse': 'marqueeReverse 22s linear infinite',
        bar1: 'bar1 0.8s ease-in-out infinite alternate',
        bar2: 'bar2 0.6s ease-in-out infinite alternate',
        bar3: 'bar3 1.0s ease-in-out infinite alternate',
        bar4: 'bar4 0.7s ease-in-out infinite alternate',
        bar5: 'bar5 0.9s ease-in-out infinite alternate',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        marqueeReverse: {
          '0%': { transform: 'translateX(-50%)' },
          '100%': { transform: 'translateX(0%)' },
        },
        bar1: { from: { height: '20%' }, to: { height: '90%' } },
        bar2: { from: { height: '40%' }, to: { height: '70%' } },
        bar3: { from: { height: '15%' }, to: { height: '100%' } },
        bar4: { from: { height: '30%' }, to: { height: '80%' } },
        bar5: { from: { height: '25%' }, to: { height: '60%' } },
      },
    },
  },
  plugins: [],
}
