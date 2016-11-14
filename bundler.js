const Webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const webpackConfig = require('./webpack.config.js');

module.exports = function () {
  new WebpackDevServer(Webpack(webpackConfig), {
    hot: true,
    historyApiFallback: true,
    proxy: {
      '*': 'http://localhost:3000',
    },
  }).listen(3001, 'localhost', (err, result) => {
    if (err) {
      console.log(err);
    }
    console.log('Listening at localhost:3001');
  });
};
