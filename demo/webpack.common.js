const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");
const autoprefixer = require("autoprefixer");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const PAGE_TITLE = "React Planner";
const VENDORS_LIBRARIES = ["react", "react-dom"];

const CSSExtractPlugin = {
  loader: MiniCssExtractPlugin.loader
};

const CSSModuleLoader = {
  loader: "css-loader",
  options: {
    modules: true,
    importLoaders: 1
  }
};

const CSSLoader = {
  loader: "css-loader",
  options: {
    modules: false
  }
};

const postCSSLoader = {
  loader: "postcss-loader",
  options: {
    ident: "postcss",
    sourceMap: true,
    plugins: () => [autoprefixer()]
  }
};

module.exports = {
  context: path.resolve(__dirname),
  entry: {
    app: "./src/renderer.jsx",
    vendor: VENDORS_LIBRARIES
  },
  output: {
    path: path.join(__dirname, "dist"),
    filename: "[chunkhash].[name].js"
  },
  devServer: {
    open: true,
    contentBase: path.join(__dirname, "./dist")
  },
  resolve: {
    extensions: [".js", ".jsx"],
    alias: {
      "react-planner": path.join(__dirname, "../src/index")
    }
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: "babel-loader",
            options: {
              compact: true,
              presets: ["@babel/react"]
            }
          }
        ]
      },
      {
        test: /\.(jpe?g|png|gif|mtl|obj)$/i,
        use: [
          {
            loader: "file-loader",
            options: {
              hash: "sha512",
              digest: "hex",
              name: "[path][name].[ext]",
              context: "demo/src"
            }
          }
        ]
      },
      {
        test: /\.scss$/,
        exclude: /\.module\.scss$/,
        use: [CSSExtractPlugin, CSSLoader, postCSSLoader, "sass-loader"]
      },
      {
        test: /\.module\.scss$/,
        use: [CSSExtractPlugin, CSSModuleLoader, postCSSLoader, "sass-loader"]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: PAGE_TITLE,
      template: "./src/index.html.ejs",
      filename: "index.html",
      inject: "body"
    }),
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename: "[name].[hash].css",
      chunkFilename: "[id].[hash].css"
    })
  ],
  optimization: {
    splitChunks: {
      cacheGroups: {
        default: false,
        commons: {
          test: /[\\/]node_modules[\\/]/,
          name: "vendor",
          chunks: "all",
          minSize: 10000,
          reuseExistingChunk: true
        }
      }
    }
  }
};
