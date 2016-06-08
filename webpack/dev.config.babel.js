/* eslint no-var: 0, no-console: 0 */

import path from 'path'
import webpack from 'webpack'
import WebpackErrorNotificationPlugin from 'webpack-error-notification'
import HtmlWebpackPlugin from 'html-webpack-plugin'


const host = process.env.HOST || 'localhost'
const port = (process.env.PORT + 1) || 9999

const config = {
    devtool: 'source-map',
    entry: [
        'webpack-dev-server/client?http://' + host + ':' + port,
        'webpack/hot/only-dev-server',
        './src/index.js'
    ],
    output: {
      filename: '[name].bundle.js',
      path:  path.join(__dirname, '/'),
      publicPath: '/'
    },
    module: {
        loaders: [
            { test: /\.js$/, exclude: /node_modules/, loaders: ['react-hot', 'babel?cacheDirectory'] },
            { test: /(\.css|\.scss)$/, loaders: ['style', 'css?sourceMap', 'sass?sourceMap']},
            { test: /\.(png|jpg|jpeg|gif|eot|ttf|woff|woff2|svg|svgz)(\?.+)?$/, loader: 'file-loader?name=img/[name].[ext]' }
          ]
    },
    plugins: [

        new webpack.HotModuleReplacementPlugin(),
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify('development'),
                BROWSER: JSON.stringify(true)
            }
        }),
        new webpack.NoErrorsPlugin(),
        new WebpackErrorNotificationPlugin(),
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: './src/index.html',
            inject: 'body'
        })

    ]

}

export default config
