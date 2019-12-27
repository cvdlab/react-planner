const webpack = require("webpack");
const merge = require("webpack-merge");

const common = require("./webpack.common.js");

module.exports = merge(common, {
  mode: "development",
  performance: {
    hints: false
  },
  devtool: "eval",
  optimization: {
    minimize: false
  },
  plugins: [
    new webpack.DefinePlugin({
      isProduction: false
    })
  ]
});
