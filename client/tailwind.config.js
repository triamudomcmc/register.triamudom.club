const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  corePlugins: {
    preflight: true,
  },
  purge: {
    enabled: process.env.NODE_ENV !== 'development',
    content: ['./src/**/*.ts', './src/**/*.tsx'],
    options: {
      defaultExtractor: (content) => content.match(/[\w-/.:]+(?<!:)/g) || [],
    },
  },
  theme: {
    fontFamily: {
      sans: ['Inter', ...defaultTheme.fontFamily.sans],
      serif: ['Inter', ...defaultTheme.fontFamily.serif],
      display: [
        'SF Pro Display',
        'Sukhumvit Set',
        'Kanit',
        ...defaultTheme.fontFamily.sans,
      ],
    },
  },
  variants: {},
  plugins: [require('@tailwindcss/typography')],
}
