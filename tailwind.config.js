/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./tools.html",
    "./json-formatter.html",
    "./base64-encoder.html",
    "./hash-generator.html",
    "./uuid-generator.html",
    "./regex-tester.html",
    "./jwt-decoder.html",
    "./image-compressor.html",
    "./password-strength-analyzer.html",
    "./privacy-policy.html",
    "./terms.html",
    "./how-it-works.html",
    "./contact.html",
    "./layout.js"
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        display: ['Space Grotesk', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      colors: {
        lightBg: '#FFFFFF',
        lightSurface: '#FAFAFA',
        darkBg: '#000000',
        darkSurface: '#111111',
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-out forwards',
        'slide-up': 'slideUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        }
      }
    }
  },
  darkMode: 'class',
  plugins: [],
}
