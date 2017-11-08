const webpack = require('webpack');
const path = require('path');
const OpenBrowserPlugin = require('open-browser-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const fs = require('fs');
const gitRev = require('git-rev-sync');
const getGitLong = () => {
  try {
    return fs.readFileSync('./REVISION', 'utf8').trim();
  } catch (e) {
    return gitRev.long() || 'error';
  }
};

/**
 * --env.port port
 */

const PAGE_TITLE = "React Planner";
const VENDORS_LIBRARIES = ['immutable', 'react', 'react-dom', 'react-redux', 'redux', 'three'];

module.exports = function (env) {
  let isProduction = process.env.NODE_ENV === 'production';
  let isQuiet = env && env.hasOwnProperty('quiet');
  let port = env && env.hasOwnProperty('port') ? env.port : 8080;

  if (isProduction) console.info('Webpack: Production mode'); else console.info('Webpack: Development mode');

  let config = {
    context: path.resolve(__dirname),
    entry: {
      app: path.join(__dirname, './src/demo/src/renderer.jsx'),
      vendor: VENDORS_LIBRARIES
    },
    output: {
      path: path.join(__dirname, 'dist'),
      filename: '[chunkhash].[name].js',
    },
    performance: {
      hints: isProduction ? 'warning' : false
    },
    devtool: isProduction ? 'source-map' : 'eval',
    devServer: {
      port: port,
      contentBase: path.join(__dirname, './dist'),
      overlay: {
        warnings: true,
        errors: true
      },
      inline: true
    },
    resolve: {
      extensions: ['.js', '.jsx']
    },
    module: {
      rules: [{
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: [{
          loader: 'babel-loader',
          options: {
            "compact": false,
            "plugins": [
              "transform-object-rest-spread"
            ],
            "presets": [
              "react"
            ]
          }

        }]
      }, {
        test: /\.(jpe?g|png|gif|mtl|obj)$/i,
        use: [{
          loader: 'file-loader',
          options: {
            hash: 'sha512',
            digest: 'hex',
            name: '[path][name].[ext]',
            context: 'demo/src'
          }
        }]
      }]
    },
    plugins: [
      new webpack.optimize.CommonsChunkPlugin({
        names: 'vendor',
        chunks: ['vendor', 'app'],
        minChunks: 2
      }),
      new webpack.optimize.CommonsChunkPlugin({
        names: 'app',
        chunks: ['app'],
        minChunks: 2
      }),
      new webpack.optimize.CommonsChunkPlugin({
        names: ['manifest']
      }),
      new webpack.DefinePlugin({
        'process.env': {
          NODE_ENV: JSON.stringify(process.env.NODE_ENV || 'development'),
        },
        defineREV: JSON.stringify(getGitLong()),
        defineVersion: JSON.stringify(require('./package.json').version)
      }),
      new HtmlWebpackPlugin({
        title: PAGE_TITLE,
        template: './src/demo/src/index.html.ejs',
        filename: 'index.html',
        inject: 'body',
      })
    ]
  };

  if (isProduction) {
    config.plugins.push(new webpack.optimize.UglifyJsPlugin());

    config.plugins.push(new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production')
      }
    }));
  }

  if (!isProduction) {
    config.plugins.push(new OpenBrowserPlugin({url: `http://localhost:${port}`}));
  }

  return config;
};
