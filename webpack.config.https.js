process.traceDepracation = true;
const { resolve } = require('path');
const webpack     = require('webpack');

module.exports = {
  entry: [
    'react-hot-loader/patch',

    // bundle the client for webpack-dev-server
    // connect it to the provided endpoint
    'webpack-dev-server/client?http://localhost:8080',

    // bundle the client for hot reloading
    // 'only-' means only hot reload for successful updates
    'webpack/hot/only-dev-server',

    // app entry point
    // rooted at './src'
    './index.js'
  ],

  output: {
    filename: 'bundle.js',
    path: resolve(__dirname, 'dist'),
    publicPath: '/'
    // HMR needs to know where to load hot update chunks
  },

  context: resolve(__dirname, 'src'),

  devtool: 'inline-source-map',

  devServer: {
    hot: true,
    https: true,
    contentBase: resolve(__dirname, 'dist'),
    publicPath: '/',
    quiet: true
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: ['react']
        },
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader?modules',
          'postcss-loader',
        ],
      },
      {
        test: /\.(jpg|png|svg)$/,
        use: [
          'file',
        ],
        include: /static/,
      },
    ],
  },

  plugins: [
    // global HMR
    new webpack.HotModuleReplacementPlugin(),

    // print more readable module names in the browser console
    new webpack.NamedModulesPlugin(),
  ]
};
