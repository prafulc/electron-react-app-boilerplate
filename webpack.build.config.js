const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

// Any directories you will be adding code/files into, need to be added to this array so webpack will pick them up
const defaultInclude = path.resolve(__dirname, 'src');

module.exports = {
    mode: 'production',
    entry: {
        app: defaultInclude
    },
    module: {
        rules: [{
                test: /\.(scss|css)$/,
                use: [{
                    loader: 'style-loader'
                }, {
                    loader: 'css-loader'
                }, {
                    loader: 'sass-loader'
                }],
                include: defaultInclude,
            },
            {
                test: /\.(js|jsx)?$/,
                use: [{
                    loader: 'babel-loader'
                }],
                include: defaultInclude,
            },
            {
                test: /\.(jpe?g|png|gif)$/,
                use: [{
                    loader: 'file-loader?name=img/[name]__[hash:base64:5].[ext]'
                }],
                include: defaultInclude,
            },
            {
                test: /\.(eot|svg|ttf|woff|woff2)$/,
                use: [{
                    loader: 'file-loader?name=font/[name]__[hash:base64:5].[ext]'
                }],
                include: defaultInclude,
            },
        ],
    },
    target: ['electron-renderer', 'web'],
    plugins: [
        new HtmlWebpackPlugin({
            title: 'New app title',
            inject: false,
            templateContent: ({
                htmlWebpackPlugin
            }) => `
                <html>
                <head>
                    <script>
                        global = globalThis //<- this should be enough
                    </script>
                    ${htmlWebpackPlugin.tags.headTags}
                </head>
                <body>
                    <div id="body"></div>
                    ${htmlWebpackPlugin.tags.bodyTags}
                </body>
                </html>
            `,
            meta: {
                viewport: 'width=device-width, initial-scale=1, shrink-to-fit=no',
                'theme-color': '#4285f4',
                charset: 'UTF-8',
            }
        }),
        new MiniCssExtractPlugin({
            // Options similar to the same options in webpackOptions.output
            // both options are optional
            filename: 'bundle.css',
            chunkFilename: '[id].css',
        }),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('production'),
        }),
    ],
    stats: {
        colors: true,
        children: false,
        chunks: false,
        modules: false,
    },
};