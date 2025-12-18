import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: "class",
  theme: {
    extend: {
        colors: {
            "primary": "#00f0ff","secondary": "#7000ff","accent": "#00ff9d","background-dark": "#050505",
            "panel-dark": "#0a0a0a",
            "border-dark": "#1a1a1a",
            "glass": "rgba(10, 10, 10, 0.7)",
            "india-orange": "#FF9933",
            "india-green": "#138808",
            "india-blue": "#000080",
        },
        fontFamily: {
            "mono": "var(--font-jetbrains-mono)",
            "sans": "var(--font-inter)",
            "telugu": "var(--font-noto-sans-telugu)",
            "hindi": "var(--font-noto-sans-devanagari)",
        },
        boxShadow: {
            'neon-blue': '0 0 10px rgba(0, 240, 255, 0.3), 0 0 20px rgba(0, 240, 255, 0.2)',
            'neon-purple': '0 0 10px rgba(112, 0, 255, 0.3), 0 0 20px rgba(112, 0, 255, 0.2)',
            'neon-green': '0 0 10px rgba(0, 255, 157, 0.3), 0 0 20px rgba(0, 255, 157, 0.2)',
            'neon-orange': '0 0 10px rgba(255, 153, 51, 0.3), 0 0 20px rgba(255, 153, 51, 0.2)',
        },
        animation: {
            'pulse-fast': 'pulse 1.5s cubic-bezier(0.4, 0, 0.6, 1) infinite',
            'scanline': 'scanline 8s linear infinite',
            'glitch': 'glitch 1s linear infinite',
            'data-stream': 'dataStream 2s linear infinite',
            'typewriter-pulse': 'typewriterPulse 2s ease-in-out infinite',
            'hologram-flicker': 'hologramFlicker 4s infinite',
            'badge-spin': 'badgeSpin 3s linear infinite',
            'badge-pulse': 'badgePulse 2s ease-in-out infinite',
            'color-surge-red': 'colorSurgeRed 2s ease-in-out forwards',
            'resolve-char': 'resolveChar 0.6s cubic-bezier(0.2, 0.8, 0.2, 1) forwards',
            'melt-in': 'meltIn 1.5s cubic-bezier(0.4, 0, 0.2, 1) forwards',
            'fade-in-up': 'fadeInUp 0.5s ease-out forwards',
            'electric-trace': 'electricTrace 3s ease-in-out infinite',
            'ripple-text': 'rippleText 3s linear infinite',
            'toast-slide': 'toastSlide 5s ease-in-out forwards',
            'text-cycle': 'textCycle 9s infinite',
        },
        keyframes: {
            scanline: {
                '0%': { backgroundPosition: '0% 0%' },
                '100%': { backgroundPosition: '0% 100%' },
            },
            dataStream: {
                '0%': { transform: 'translateY(0)', opacity: '0' },
                '20%': { opacity: '1' },
                '80%': { opacity: '1' },
                '100%': { transform: 'translateY(-20px)', opacity: '0' },
            },
            typewriterPulse: {
                '0%, 100%': { borderRightColor: 'rgba(0, 240, 255, 0)' },
                '50%': { borderRightColor: 'rgba(0, 240, 255, 1)' },
            },
            hologramFlicker: {
                '0%, 100%': { opacity: '1', filter: 'brightness(1)' },
                '33%': { opacity: '0.95', filter: 'brightness(1.1)' },
                '34%': { opacity: '0.8', filter: 'brightness(1.5) blur(1px)' },
                '35%': { opacity: '0.95', filter: 'brightness(1.1)' },
                '66%': { opacity: '0.98', filter: 'brightness(1)' },
                '67%': { opacity: '0.94', filter: 'brightness(0.9)' },
            },
            badgeSpin: {
                '0%': { transform: 'rotateY(0deg)', filter: 'brightness(1)' },
                '50%': { transform: 'rotateY(180deg)', filter: 'brightness(1.5)' },
                '100%': { transform: 'rotateY(360deg)', filter: 'brightness(1)' },
            },
            badgePulse: {
                 '0%, 100%': { boxShadow: '0 0 5px currentColor', opacity: '1' },
                 '50%': { boxShadow: '0 0 15px currentColor', opacity: '0.8' },
            },
            colorSurgeRed: {
                '0%': { color: 'inherit', textShadow: 'none', transform: 'scale(1)' },
                '10%': { color: '#ef4444', textShadow: '0 0 12px rgba(239, 68, 68, 0.9)', transform: 'scale(1.02) skewX(-2deg)' },
                '30%': { color: '#ef4444', textShadow: '0 0 8px rgba(239, 68, 68, 0.6)', transform: 'scale(1) skewX(2deg)' },
                '100%': { color: 'inherit', textShadow: 'inherit', transform: 'scale(1)' },
            },
            resolveChar: {
                '0%': { opacity: '0', transform: 'scale(2) translateZ(50px)', filter: 'blur(8px)', color: 'white' },
                '60%': { opacity: '1', transform: 'scale(0.9) translateZ(0)', filter: 'blur(0px)', color: 'var(--tw-text-opacity)' },
                '80%': { transform: 'scale(1.1)' },
                '100%': { opacity: '1', transform: 'scale(1)' },
            },
            meltIn: {
                 '0%': { opacity: '0', transform: 'translateY(-20px) scaleY(2) rotateX(45deg)', filter: 'blur(5px)' },
                 '40%': { opacity: '1', transform: 'translateY(5px) scaleY(0.9) rotateX(0deg)', filter: 'blur(0px)' },
                 '100%': { opacity: '0', transform: 'translateY(10px) scaleY(1) rotateX(0deg)', filter: 'blur(2px)' },
            },
            fadeInUp: {
                '0%': { opacity: '0', transform: 'translateY(10px)' },
                '100%': { opacity: '1', transform: 'translateY(0)' },
            },
            electricTrace: {
                '0%': { backgroundPosition: '-100% 0' },
                '100%': { backgroundPosition: '200% 0' },
            },
            rippleText: {
                '0%': { textShadow: '0 0 0 transparent' },
                '50%': { textShadow: '0 0 5px rgba(255,255,255,0.5)' },
                '100%': { textShadow: '0 0 0 transparent' },
            },
            toastSlide: {
                '0%': { transform: 'translateX(-20px)', opacity: '0' },
                '10%': { transform: 'translateX(0)', opacity: '1' },
                '80%': { transform: 'translateX(0)', opacity: '1' },
                '100%': { transform: 'translateX(0)', opacity: '0', pointerEvents: 'none' },
            },
            textCycle: {
                '0%, 5%': { opacity: '0', transform: 'translateY(10px)' },
                '10%, 25%': { opacity: '1', transform: 'translateY(0)' },
                '30%, 100%': { opacity: '0', transform: 'translateY(-10px)' }
            }
        }
    },
  },
  plugins: [],
}
export default config
