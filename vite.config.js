export default {
  base: 'https://rolling-scopes-school.github.io/naya252-JSFE2023Q4/hangman/',
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
