const path = require('path');
const webpack = require("webpack");
const OpenBrowserPlugin = require('open-browser-webpack-plugin');

module.exports = {
  entry: path.resolve(__dirname, 'src/renderer.js'),
  output: {
    path: __dirname + "/build",
    filename: "demo.build.js"
  },
  plugins: [
    new OpenBrowserPlugin({url: 'http://localhost:8080'})
  ],
  devServer: {
    contentBase: path.resolve(path.join(__dirname, 'build'))
  },
  devtool: "eval",
  module: {
    loaders: [
      {
        test: /\.(js|jsx)$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel'
      },
      {
        test: /\.(jpe?g|png|gif|mtl|obj)$/i,
        include: /demo\/src\/catalog/,
        loaders: [
          'file?hash=sha512&digest=hex&name=[path][name].[ext]?[hash]&context=demo/src',
          'image-webpack?bypassOnDebug&optimizationLevel=7&interlaced=false'
        ]
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        exclude: /demo\/src\/catalog/,
        loaders: [
          'file?hash=sha512&digest=hex&name=[hash].[ext]',
          'image-webpack?bypassOnDebug&optimizationLevel=7&interlaced=false'
        ]
      }
    ],
    plugins: [new OpenBrowserPlugin({url: 'http://localhost:8080'})]
  },
};
