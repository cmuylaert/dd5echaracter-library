module.exports = {
  context: `${__dirname}/app`,
  entry: './main.js',
  devtool: 'source-map',
  output: {
    filename: 'bundle.js',
    path: `${__dirname}/dist`,
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: ['react', 'es2015', 'stage-0'],
        },
      },
    ],
  },
};
