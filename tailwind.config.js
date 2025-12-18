/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ['class'],
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}', './src/**/*.html', './src/**/*.vue'],
  theme: {
    extend: {
      fontFamily: {
        nunito: ['Nunito'],
        titan: ['"Titan One"'],
      },
      animation: {
        wiggle: 'wiggle 1s ease-in-out infinite'
      },
      keyframes: {
        wiggle: {
          '0%, 100%': {
            transform: 'rotate(-3deg)'
          },
          '50%': {
            transform: 'rotate(3deg)'
          }
        }
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)'
      },
      // Custom font sizes (rem-based + some pixel-exact helpers)
      fontSize: {
        xs: ['0.75rem', { lineHeight: '1rem' }],     // 12px
        sm: ['0.875rem', { lineHeight: '1.25rem' }], // 14px
        base: ['1rem', { lineHeight: '1.5rem' }],    // 16px
        lg: ['1.125rem', { lineHeight: '1.75rem' }], // 18px
        xl: ['1.25rem', { lineHeight: '1.75rem' }],  // 20px
        '2xl': ['1.5rem', { lineHeight: '2rem' }],   // 24px
        '3xl': ['1.875rem', { lineHeight: '2.25rem' }], // 30px
        '4xl': ['2.25rem', { lineHeight: '2.5rem' }], // 36px
        '5xl': ['3rem', { lineHeight: '1' }],        // 48px

        // Flutter-like exact pixel helpers (use when you need exact px values)
        'flutter-12': ['12px', { lineHeight: '16px' }],
        'flutter-14': ['14px', { lineHeight: '20px' }],
        'flutter-16': ['16px', { lineHeight: '24px' }],
        'flutter-18': ['18px', { lineHeight: '24px' }],
        'flutter-20': ['20px', { lineHeight: '28px' }],
      },
      colors: {
        'content-primary': '#403B36',
        'content-secondary': '#595550',
        'primary-light': '#F8EEE2',
        'primary-app': '#E5151E',
        'button-primary': '#D9614C',
        'border-color': '#F2E5D5',
        'card-color': '#FFFDFA',
        neutral: '#F4F4F5',
        background: '#F8EEE2',
        foreground: 'hsl(var(--foreground))',
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))'
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))'
        },
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))'
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))'
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))'
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))'
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))'
        },
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        chart: {
          1: 'hsl(var(--chart-1))',
          2: 'hsl(var(--chart-2))',
          3: 'hsl(var(--chart-3))',
          4: 'hsl(var(--chart-4))',
          5: 'hsl(var(--chart-5))'
        },
        borderGray: '#E5E5E5',
      }
    }
  },
  plugins: [require('tailwindcss-animate')]
}
