/** @type {import('tailwindcss').Config} */
export default {
    content: ['./index.html', './src/**/*.{js,jsx}'],
    theme: {
        extend: {
            screens: {
                'xs': '475px',
            },
            colors: {
                gold: {
                    50: '#FFF9E6',
                    100: '#FFF0BF',
                    200: '#FFE699',
                    300: '#FFD966',
                    400: '#FFCC33',
                    500: '#D4A017',
                    600: '#B8860B',
                    700: '#996515',
                    800: '#7A5012',
                    900: '#5C3D0E',
                },
                silver: {
                    50: '#F8F9FA',
                    100: '#E9ECEF',
                    200: '#DEE2E6',
                    300: '#CED4DA',
                    400: '#ADB5BD',
                    500: '#8B939B',
                    600: '#6C757D',
                    700: '#495057',
                    800: '#343A40',
                    900: '#212529',
                },
                primary: {
                    50: '#FFF8E1',
                    100: '#FFECB3',
                    200: '#FFE082',
                    300: '#FFD54F',
                    400: '#FFCA28',
                    500: '#D4A017',
                    600: '#B8860B',
                    700: '#8D6E0A',
                    800: '#6B5309',
                    900: '#4A3A06',
                },
            },
            fontFamily: {
                heading: ['Playfair Display', 'serif'],
                body: ['Inter', 'sans-serif'],
            },
            backgroundImage: {
                'gold-gradient': 'linear-gradient(135deg, #D4A017 0%, #FFD54F 50%, #B8860B 100%)',
                'dark-gradient': 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)',
                'hero-pattern': 'radial-gradient(ellipse at center, rgba(212,160,23,0.15) 0%, transparent 70%)',
            },
            animation: {
                'shimmer': 'shimmer 2s infinite linear',
                'float': 'float 3s ease-in-out infinite',
                'fade-in': 'fadeIn 0.5s ease-out',
                'slide-up': 'slideUp 0.5s ease-out',
                'pulse-gold': 'pulseGold 2s ease-in-out infinite',
            },
            keyframes: {
                shimmer: {
                    '0%': { backgroundPosition: '-200% 0' },
                    '100%': { backgroundPosition: '200% 0' },
                },
                float: {
                    '0%, 100%': { transform: 'translateY(0)' },
                    '50%': { transform: 'translateY(-10px)' },
                },
                fadeIn: {
                    '0%': { opacity: '0' },
                    '100%': { opacity: '1' },
                },
                slideUp: {
                    '0%': { opacity: '0', transform: 'translateY(20px)' },
                    '100%': { opacity: '1', transform: 'translateY(0)' },
                },
                pulseGold: {
                    '0%, 100%': { boxShadow: '0 0 0 0 rgba(212,160,23,0.4)' },
                    '50%': { boxShadow: '0 0 0 10px rgba(212,160,23,0)' },
                },
            },
        },
    },
    plugins: [],
};
