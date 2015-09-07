module.exports = {
  entry: {
    main:'./site/scripts/scripts.js',
    work:'./site/scripts/work.js'
  },
  output: {
    path:'./build/js',
    filename:'[name].webpack.js'
  },
  module:{
    loaders:[
      { test: /\.js$/, loader: 'babel-loader' }
    ]
  }
};
