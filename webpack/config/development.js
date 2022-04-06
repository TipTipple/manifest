const path = require("path")
const HtmlPlugin = require("html-webpack-plugin")
const { merge } = require("webpack-merge")

const base = require("./base")

module.exports = theme => merge(base(theme), {
  mode: "development",
  devtool: "inline-source-map",
  devServer: {
    compress: true,
    hot: true,
    static: {
      directory: path.resolve("dist"),
      watch: {
        ignored: /node_modules/,
      },
    },
    client: {
      overlay: true,
    },
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
      "Access-Control-Allow-Headers": "X-Requested-With, content-type, Authorization",
    },
    // historyApiFallback: {
    //   rewrites: [
    //     { from: /^\/$/, to: "/dev.html" },
    //   ],
    // },
    // devMiddleware: {
    //   index: "dev.html",
    //   writeToDisk: true,
    // },
  },
  // plugins: [
  //   new HtmlPlugin({
  //     filename: "dev.html",
  //     template: path.resolve("templates/dev.html"),
  //     inject: "head",
  //   }),
  // ],
})
