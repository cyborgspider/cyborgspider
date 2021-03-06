var webpack         = require('webpack');
var path            = require('path');
var nodeModulesPath = path.resolve(__dirname, 'node_modules');
var buildPath       = path.resolve(__dirname, './build/js/');
var common          = new webpack.optimize.CommonsChunkPlugin('common.js');

module.exports = {
  watch: true,
  devtool:'source-map',
  entry: {
    main:'./site/scripts/scripts.js',
    work:'./site/scripts/work.js'
  },
  output: {
    path:              buildPath,
    filename:          '[name].webpack.js',
    sourceMapFilename: '[file].map'
  },
  plugins:[common],
  module:{
    loaders:[
      { test: /\.js$/, loader: 'babel-loader', exclude: [nodeModulesPath] }
    ]
  }
};
