const webpack = require("webpack");
const merge = require("webpack-merge");

const common = require("./webpack.common.js");

module.exports = merge(common, {
  mode: "production",
  performance: {
    hints: "warning"
  },
  devtool: "source-map",
  optimization: {
    minimize: true
  },
  plugins: [
    new webpack.DefinePlugin({
      isProduction: true
    })
  ]
});
