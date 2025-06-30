const MomentLocalesPlugin = require('moment-locales-webpack-plugin');

module.exports = {
  plugins: [
    new MomentLocalesPlugin({
      localesToKeep: ['en'] // keep only 'en', drop the rest
    })
  ]
};
