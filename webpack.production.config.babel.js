require('babel-core/register');
import path from 'path';
import webpack from 'webpack';
import del from 'del';
import ExtractTextPlugin from 'extract-text-webpack-plugin';

class CleanPlugin {
  constructor(options) {
    this.options = options;
  }

  apply () {
    del.sync(this.options.files);
  }
}

const config = {
  entry: './app/index',
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'app.min.js',
    publicPath: '/'
  },
  plugins: [
    new webpack.optimize.OccurrenceOrderPlugin(),
    new CleanPlugin({
      files: ['dist/*']
    }),
    new webpack.optimize.UglifyJsPlugin({
      mangle: true,
      compress: {
          warnings: false,
          screw_ie8: true,
          sequences: true,
          dead_code: true,
          drop_debugger: true,
          comparisons: true,
          conditionals: true,
          evaluate: true,
          booleans: true,
          loops: true,
          unused: true,
          hoist_funs: true,
          if_return: true,
          join_vars: true,
          cascade: true,
          drop_console: true
      },
      output: {
          comments: false
      }
    }),
    new webpack.DefinePlugin({
      'process.env':{
         WEBPACK_BUILD: JSON.stringify(true),
         NODE_ENV: JSON.stringify('production')
      }
    }),
    new ExtractTextPlugin({
       filename: 'app.css',
       allChunks: true
     })
  ],
  module: {
    loaders: [{
      test: /\.js?$/,
      loader: 'babel',
      include: path.join(__dirname, 'app'),
      query: {
        plugins: [
          ['transform-object-assign']
        ]
      }
    },
    {
      test: /\.scss$/,
          loader: ExtractTextPlugin.extract({
            fallbackLoader: 'style-loader',
            loader: ['css', 'sass']
          })
      }
    ]
  }
};

export default config;
