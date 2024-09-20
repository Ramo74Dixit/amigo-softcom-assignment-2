/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx,ts,tsx}"], // Ensure React and TypeScript files are included
  theme: {
    extend: {
      animation: {
        'bounce-slow': 'bounce 5s infinite',
        'floating': 'float 3s ease-in-out infinite',
        'fade-in': 'fadeIn 2s ease-out forwards',
        'slide-up': 'slideUp 1.5s ease-out forwards',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(100px)' },
          '100%': { transform: 'translateY(0)' },
        },
      },
      boxShadow: {
        neon: '0 0 15px rgba(255, 255, 255, 0.5)', // Neon glow effect
      },
    },
  },
  plugins: [],
}
