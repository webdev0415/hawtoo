
module.exports = {
    darkMode: "class",
    mode: 'jit',
    purge: {
        // Learn more on https://tailwindcss.com/docs/controlling-file-size/#removing-unused-css
        enabled: process.env.NODE_ENV === "production",
        content: [
            `components/**/*.{vue,js}`,
            `layouts/**/*.vue`,
            `pages/**/*.vue`,
            `plugins/**/*.{js,ts}`,
            `nuxt.config.{js,ts}`
        ],
    },

    theme: {
        container: {
            center: true,
            padding: '1.5rem',
            screens: {
                sm: "100%",
                md: "100%",
                lg: "1200px",
                xl: "1400px"
            }
        },
        fontFamily: {
            sans: ["Circular"],
            serif: ["Constantia", "Georgia", "serif"],
        },
        extend: {
            colors: {
                "tertiary": '#f7ece1',
                "binance-yellow": "#F0B90B",
                gray: {
                    100: '#FBFBFB',
                    200: '#EAEAEA',
                    300: '#DFDFDF',
                    400: '#999999',
                    500: '#7F7F7F',
                    600: '#666666',
                    700: '#4C4C4C',
                    800: '#1a1a1a',
                    900: '#0f0f0f',
                },
                blue: {
                    100: '#E6F0FD',
                    200: '#CCE2FC',
                    300: '#99C5FA',
                    400: '#66A9F7',
                    500: '#338CF5',
                    600: '#0070F4',
                    700: '#0064DA',
                    800: '#0059C2',
                    900: '#004391',
                },
                teal: {
                    100: '#E6FFFA',
                    200: '#B2F5EA',
                    300: '#81E6D9',
                    400: '#4FD1C5',
                    500: '#3ABAB4',
                    600: '#319795',
                    700: '#2C7A7B',
                    800: '#285E61',
                    900: '#234E52',
                },
            },
            boxShadow: {
                xs: '0 0 0 1px rgba(0, 0, 0, 0.08)',
                sm: '0 1px 2px 0 rgba(0, 0, 0, 0.16)',
                default: '0 1px 3px 0 rgba(0, 0, 0, 0.12), 0 1px 2px 0 rgba(0, 0, 0, 0.03)',
                md: '0 4px 6px -1px rgba(0, 0, 0, 0.04), 0 2px 4px -1px rgba(0, 0, 0, 0.03)',
                lg: '0 10px 15px -3px rgba(0, 0, 0, 0.04), 0 4px 6px -2px rgba(0, 0, 0, 0.02)',
                xl: '0 20px 25px -5px rgba(0, 0, 0, 0.12), 0 10px 10px -5px rgba(0, 0, 0, 0.02)',
                '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.15)',
                inner: 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.04)',
                outline: '0 0 0 3px rgba(66, 153, 225, 0.5)',
                none: 'none',
            },
            spacing: {
                '9/16': '56.25%',
                '3/4': '75%',
                '1/1': '100%',
            },
            fontSize: {
                xs: ['0.75rem', { lineHeight: '1rem' }],
                sm: ['0.875rem', { lineHeight: '1.25rem' }],
                base: ['1rem', { lineHeight: '1.5rem' }],
                lg: ['1.125rem', { lineHeight: '1.75rem' }],
                xl: ['1.25rem', { lineHeight: '1.75rem' }],
                '2xl': ['1.5rem', { lineHeight: '2rem' }],
                '3xl': ['1.875rem', { lineHeight: '2.25rem' }],
                '4xl': ['2.25rem', { lineHeight: '2.5rem' }],
                '5xl': ['3rem', { lineHeight: '1' }],
                '6xl': ['4rem', { lineHeight: '1' }],
            },
            letterSpacing: {
                tighter: '-0.02em',
                tight: '-0.01em',
                normal: '0',
                wide: '0.01em',
                wider: '0.02em',
                widest: '0.4em',
            },
            lineHeight: {
                none: '1',
                tighter: '1.125',
                tight: '1.25',
                snug: '1.375',
                normal: '1.5',
                relaxed: '1.625',
                loose: '2',
                '3': '.75rem',
                '4': '1rem',
                '5': '1.2rem',
                '6': '1.5rem',
                '7': '1.75rem',
                '8': '2rem',
                '9': '2.25rem',
                '10': '2.5rem',
            },
            minWidth: {
                '10': '2.5rem',
                '48': '12rem',
            },
            opacity: {
                '90': '0.9',
            },
            scale: {
                '98': '.98'
            },
            animation: {
                float: 'float 3s ease-in-out infinite',
            },
            keyframes: {
                float: {
                    '0%, 100%': { transform: 'translateY(0)', },
                    '50%': { transform: 'translateY(-5%)', },
                },
            },
            zIndex: {
                '-1': '-1',
            },
        }
    },
    future: {
        defaultLineHeights: true,
        // Doc: https://tailwindcss.com/docs/upcoming-changes#remove-deprecated-gap-utilities
        removeDeprecatedGapUtilities: true,
        // https://tailwindcss.com/docs/upcoming-changes#purge-layers-by-default
        purgeLayersByDefault: true
    },
    variants: {
        backgroundColor: [
            'responsive',
            'hover',
            'focus',
            'group-hover',
            "dark",
            "dark-hover",
            "dark-group-hover",
            "dark-even",
            "dark-odd"
        ],
        textColor: ['responsive', 'hover', 'focus', 'group-hover', "dark", "dark-hover", "dark-active"],
        borderColor: ["dark", "dark-focus", "dark-focus-within"],
        translate: ['responsive', 'hover', 'focus', 'group-hover'],
        boxShadow: ['responsive', 'hover', 'focus', 'focus-within'],
        opacity: ['responsive', 'hover', 'focus', 'group-hover'],
    },
    plugins: [
        require('@tailwindcss/forms'),
    ],
}
