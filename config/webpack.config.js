const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin')
const CompressionPlugin = require('compression-webpack-plugin')

module.exports = {
    entry: {
        main: './src/index.js',
        common: './src/Common/index.js',
    },
    optimization: {
        splitChunks: {
            chunks: 'all',
            // https://stackoverflow.com/questions/48985780/webpack-4-create-vendor-chunk
            maxInitialRequests: Infinity,
            minSize: 0,
            cacheGroups: {
                reactVendor: {
                  test: /[\\/]node_modules[\\/](react|react-dom)[\\/]/,
                  name: "reactvendor"
                },
                utilityVendor: {
                  test: /[\\/]node_modules[\\/](lodash|moment|moment-timezone)[\\/]/,
                  name: "utilityVendor"
                },
                bootstrapVendor: {
                  test: /[\\/]node_modules[\\/](react-bootstrap)[\\/]/,
                  name: "bootstrapVendor"
                },
                vendor: {
                   test: /[\\/]node_modules[\\/](!react-bootstrap)(!lodash)(!moment)(!moment-timezone)[\\/]/,
                name: "vendor"
              },
            },
        },
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: ['babel-loader']
            },
            {
                test: /\.(css|scss)$/,
                use: [
                    "style-loader",
                    "css-loader"
                ]
            },
            {
                test: /\.(png|jpe?g|gif)$/i,
                use: [
                    {
                        loader: 'file-loader',
                    },
                ],
            }
        ],
    },
    resolve: {
        extensions: ['*', '.js', '.jsx']
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './public/index.html',
            inject: 'body',
            filename: 'index.html',
            favicon: './public/favicon.ico'
        }),
        new webpack.HotModuleReplacementPlugin(),
        new CopyPlugin([
            { from: 'public/assets', to: 'assets' }
        ]),
        // This is causing issues - wav and jpg and png get encoding errors 
        // new CompressionPlugin({
        //     exclude: /\.(mp4|webm)$/,
        //     filename: '[path]'
        // })
    ],
    output: {
        publicPath: '/'
    },
    devServer: {
        hot: true,
        inline: true,
        contentBase: ['./src', './public'],
        historyApiFallback: true,
        open: true,
        port: 3000,
        watchOptions: {
            poll: true
        }
    },
};
