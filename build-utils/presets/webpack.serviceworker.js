const { GenerateSW } = require('workbox-webpack-plugin');

module.exports = () => ({
  plugins: [
    new GenerateSW({swDest: 'sw.js'}),
    // new InjectManifest({
    //   swSrc: './src/sw.js'
    // })
  ]
});

// https://developers.google.com/web/tools/workbox/modules/workbox-webpack-plugin