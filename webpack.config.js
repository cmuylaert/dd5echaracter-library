const webpack = require('webpack');
const path = require('path');

module.exports = {
  entry: [path.resolve(__dirname+'/app/main.jsx'),
    'webpack/hot/dev-server',
  ],
  devtool: 'source-map',
  output: {
    filename: 'bundle.js',
    path: `${__dirname}/dist`,
    publicPath: `${__dirname}/dist`,
  },
  plugins: [
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
    }), new webpack.HotModuleReplacementPlugin(),
  ],
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loaders: ['babel'],
      },
    ],
  },
  resolve: {
    extensions: ['', '.js', '.jsx'],
  },

};
