const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const webpack = require('webpack');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
    entry: {
        main: ['webpack-hot-middleware/client?reload=true', './src/index.js']
    }, 
    mode: 'development', 
    devServer: {
        contentBase: './dist', 
        watchContentBase: true,
        overlay: true, 
        hot: true, 
        stats: {
            colors: true
        }, 
        publicPath: '/'
    }, 
    module: {
        rules: [
            {
                test: /\.js$/, 
                exclude: /node_modules/,
                use: ['babel-loader']
            }, 
            {
                test: /\.(gif|png)$/, 
                use: ['file-loader']
            }, 
            {
                test: /\.css$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            // you can specify a publicPath here
                            // by default it uses publicPath in webpackOptions.output
                            publicPath: '/',
                            hmr: true,
                        }
                    },
                    'css-loader'
                ]
            }, 
            {
                test: /\.(html)$/,
                use: ['html-loader']
            }            
        ]
    }, 
    plugins: [
        new CleanWebpackPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new HtmlWebpackPlugin({
            template: __dirname + '/src/index.html',
            filename: 'index.html',
            inject: true
        }),
        new MiniCssExtractPlugin({
            // Options similar to the same options in webpackOptions.output
            // all options are optional
            filename: '[name].css',
            chunkFilename: '[id].css',
            ignoreOrder: false, // Enable to remove warnings about conflicting order
        })
    ], 
    output: {
        filename: '[name]-bundle.js', 
        chunkFilename: '[id].js',
        path: path.resolve(__dirname, 'dist'),
        publicPath: '/'
    }    
}