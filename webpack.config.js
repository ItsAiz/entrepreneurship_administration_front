const path = require("path");

module.exports = {
  // Otras configuraciones de Webpack
  resolve: {
    fallback: {
      crypto: require.resolve("crypto-browserify"),
    },
  },
};
