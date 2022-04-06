const path = require("path");
const webpack = require("webpack");
const MiniCSSExtractPlugin = require("mini-css-extract-plugin");

const utils = require("../utils");

const config = utils.getConfig();

const getManifest = require("../plugin/manifest");

module.exports = (theme) => ({
  entry: {
    wizzard: "./src/index.js",
  },
  output: {
    filename: "assets/wizzard-[contenthash].js",
    assetModuleFilename: "assets/[name]-[contenthash].[ext]",
    path: path.resolve(config.outputDir),
    publicPath: `${config.assetsUrl}/`,
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        include: /src/,
        loader: "babel-loader",
      },
      {
        test: /\.ya?ml$/,
        type: "json",
        use: "yaml-loader",
      },
      {
        test: /\.css$/,
        use: [
          MiniCSSExtractPlugin.loader,
          {
            loader: "css-loader",
            options: {
              modules: true,            },
          },
        ],
      },
    ],
  },
  plugins: [
    new MiniCSSExtractPlugin({ filename: "assets/wizzard-[contenthash].css" }),
    new webpack.DefinePlugin({ __CONFIG__: JSON.stringify(config) }),
    ...getManifest(theme),
  ],
});
