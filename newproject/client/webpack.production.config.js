var path = require('path');

module.exports = {
  entry: [
    path.resolve(__dirname, 'app/main.js')
  ],
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'bundle.js',
  },
  modulesDirectory: [
    'node_modules'
  ],
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "babel",
        query: {
          presets: ['react']
        }
      },
      {
        test: /\.css$/, 
        loader: "style-loader!css-loader"
      }
    ]
  }
};
