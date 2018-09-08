const path = require('path');
const webpack = require('webpack');
// const HtmlWebPackPlugin = require("html-webpack-plugin");
const ExtractTextPlugin = require("extract-text-webpack-plugin");

// const port = process.env.PORT || '8080';

const config = {
  context: __dirname,
  entry: {
    index: ['babel-polyfill', './src/index.js'],
  },
  // target: 'electron-renderer',
  target: 'node',
  output: {
    filename: 'bundle.js',
    path: __dirname + '/dist/'
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['react', 'es2015']
          }
        }
      },
      {
        test: /\.css$/,
        exclude: /(node_modules)/,
        use: [
          { loader: 'style-loader' },
          { loader: 'css-loader' },
          { loader: 'sass-loader', options: { sourceMap: true } },
        ],
      },
      {
        test: /\.scss$/,
        exclude: "/node_modules/",
        use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: [{ loader: 'css-loader' }, { loader: 'style-loader' },]
        })
      },
      {
        test: /\.(png|jp(e*)g|svg)$/,
        use: [{
          loader: 'url-loader',
          options: {
            limit: 8000, // Convert images < 8kb to base64 strings
            name: 'images/[hash]-[name].[ext]'
          }
        }]
      }
    ]
  },
  externals: ['ws'],
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    // HtmlWebPackPlugin

  ],
  devtool: '#source-map',
  devServer: {
    historyApiFallback: true,
    hot: true,
    inline: true,
    host: 'localhost',
    port: 3000,
    stats: 'errors-only',
    // proxy : {
    //     '/': {
    //         host: 'localhost',
    //         protocol: 'http',
    //         port: 5001


    //     }
    // }
  },
  resolve: {
    modules: [
      path.resolve(__dirname, "src"),
      "node_modules"
    ],
    extensions: ['.js', '.css'],
  }
};

module.exports = config;
