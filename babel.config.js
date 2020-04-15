// https://appear.github.io/2019/01/26/VUE/polyfills/
module.exports = {
  presets: [
    ['@babel/preset-env', {
      'targets': {
        'browsers': ['last 2 versions', 'ie >= 10', 'android >= 4.2']
      },
    }]
	],
	plugins: ["@babel/plugin-transform-runtime"]
};
