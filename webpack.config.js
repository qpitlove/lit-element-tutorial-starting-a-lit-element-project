const webpack = require("webpack");
const { resolve } = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const webpackMerge = require("webpack-merge");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin");

const modeConfig = (env) =>
  require(`./build-utils/webpack.${env.mode}.js`)(env);
const loadPresets = require("./build-utils/loadPresets");

const webcomponentsjs = "./node_modules/@webcomponents/webcomponentsjs";

const polyfills = [
  {
    from: resolve(`${webcomponentsjs}/webcomponents-*.{js,map}`),
    to: "vendor",
    flatten: true,
  },
  {
    from: resolve(`${webcomponentsjs}/bundles/*.{js,map}`),
    to: "vendor/bundles",
    flatten: true,
  },
  {
    from: resolve(`${webcomponentsjs}/custom-elements-es5-adapter.js`),
    to: "vendor",
    flatten: true,
  },
];

const assets = [
  {
    from: "src/img",
    to: "img/",
  },
];

const plugins = [
  new CleanWebpackPlugin(["dist"]),
  new webpack.ProgressPlugin(),
  new HtmlWebpackPlugin({
    filename: "index.html",
    template: "./src/index.html",
    minify: {
      collapseWhitespace: true,
      minifyCSS: true,
      minifyJS: true,
    },
  }),
  new CopyWebpackPlugin([...polyfills, ...assets], {
    ignore: [".DS_Store"],
  }),
];

module.exports = ({ mode, presets }) => {
  return webpackMerge(
    {
      mode,
      // entry: {
      //   main: "./src", // DEFAULT
      // },
      output: {
        // Make sure to use [name] or [id] in output.filename
        //  when using multiple entry points
        library: "[name]",
        libraryTarget: "umd",
        filename: "[name].bundle.js",
        // filename: '[name].[chunkhash:8].js'
        chunkFilename: "[id].chunk.js",
      },
      module: {
        rules: [
          {
            test: /\.js$/,
            // exclude: /node_modules/,
            exclude: /node_modules\/(?!(@webcomponents\/shadycss|lit-element|lit-html)\/).*/,
            loader: "babel-loader",
            options: {
              plugins: [
                "@babel/plugin-transform-runtime",
                "@babel/plugin-syntax-dynamic-import",
              ],
              presets: [
                [
                  "@babel/preset-env",
                  {
                    useBuiltIns: "usage",
                    corejs: 3,
                    targets: ["last 2 versions", "ie >= 10"],
                  },
                ],
              ],
            },
          },
        ],
      },
      plugins,
    },
    modeConfig({ mode, presets }),
    loadPresets({ mode, presets })
  );
};
