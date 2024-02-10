export default {
  base: 'https://naya252.github.io/rs-hangman/',
  plugins: [],
  css: {
    modules: {
      localsConvention: 'camelCase',
      generateScopedName: '[local]',
    },
  },
  build: {
    outDir: './hangman',
    css: {
      devSourcemap: true, // enable CSS source maps during development
    },
    sourcemap: true, // enable production source maps
  },
};
