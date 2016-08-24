require('babel-core/register');
import path from 'path';
import webpack from 'webpack';
import del from 'del';
import ExtractTextPlugin from 'extract-text-webpack-plugin'
import OptimizeCssAssetsPlugin from 'optimize-css-assets-webpack-plugin'

class CleanPlugin {
  constructor(options) {
    this.options = options;
  }

  apply () {
    del.sync(this.options.files);
  }
}

const config = {
    //entry: './app/index',
    entry: {
        app: [
            './app/index'
        ],
        vendor: [
            'react', 'react-dom', 'react-redux', 'react-router', 'react-helmet', 'react-router-scroll', 'react-scroll-listener', 'classnames'
        ]
    },
    output: {
        path: path.join(__dirname, 'dist'),
        filename: '[name].min.js',
        publicPath: '/'
    },
    plugins: [
        new webpack.optimize.OccurrenceOrderPlugin(),
        new webpack.optimize.DedupePlugin(),
        new CleanPlugin({
            files: ['dist/*']
        }),
        new webpack.optimize.UglifyJsPlugin({
            mangle: true,
            compress: {
                warnings: false,,
                //drop_console: true
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
                cascade: true
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
        }),
        new OptimizeCssAssetsPlugin()
    ],
    module: {
        loaders: [
        {
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
        },
        {
            test: /\.json$/,
            loader: 'json-loader'
        },
        {
            test: /\.woff$/,
            loader: 'url?limit=50000',
            include: path.join(__dirname, 'assets/fonts')
        }
    ]
  }
}

export default config
