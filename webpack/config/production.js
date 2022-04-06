const { merge } = require("webpack-merge")

const base = require("./base")

module.exports = theme => merge(base(theme), {
  mode: "production",
  devtool: "source-map",
  optimization: {
    minimize: true,
    usedExports: true,
  },
})
