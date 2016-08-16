import path from 'path';
import webpack from 'webpack';

const config = {
  devtool: '#source-map',
  entry: [
    'webpack-hot-middleware/client',
    './app/index.js'
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'app.js',
    publicPath: '/'
  },
  plugins: [
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new webpack.DefinePlugin({
         'process.env': {
             WEBPACK_BUILD: JSON.stringify(true),
             NODE_ENV: JSON.stringify('development')
         }
     })
  ],
  module: {
    loaders: [
      {
          test: /\.js?$/,
          loader: 'babel',
          include: path.join(__dirname, 'app'),
          query: {
            plugins: [
              ['react-transform', {
                'transforms': [{
                  transform: 'react-transform-hmr',
                  // If you use React Native, pass 'react-native' instead:
                  imports: ['react'],
                  // This is important for Webpack HMR:
                  locals: ['module']
                }]
              }],
              ['transform-object-assign']
            ]
          }
        },
        {
            test: /\.scss$/,
            loaders: ['style', 'css', 'sass']
        },
        {
            test: /\.js$/,
            loader: 'eslint-loader',
            exclude: /node_modules/
        },
        {
            test: /\.json$/,
            loader: 'json-loader'
        },
        {
          test: /\.woff$/,
          loader: 'url?limit=50000',
          include: path.join(__dirname, 'assets/fonts'),
        }
    ]
  }
};

export default config;
