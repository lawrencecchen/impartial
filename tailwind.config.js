module.exports = {
  purge: ['./src/**/*.jsx'],
  theme: {
    extend: {},
    fontFamily: {
      sans: [
        'Source\\ Sans\\ Pro',
        '-apple-system',
        'BlinkMacSystemFont',
        'sans-serif',
      ],
      serif: ['Source\\ Serif\\ Pro', 'serif'],
    },
  },
  variants: {},
  plugins: [],
  corePlugins: {
    preFlight: false,
  },
};
