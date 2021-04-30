const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {
    spawn
} = require('child_process');

// Any directories you will be adding code/files into, need to be added to this array so webpack will pick them up
const defaultInclude = path.resolve(__dirname, 'src');

module.exports = {
    mode: 'development',
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
                    loader: 'babel-loader',
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
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('development'),
        }),
    ],
    devtool: 'cheap-source-map',
    devServer: {
        contentBase: path.resolve(__dirname, 'dist'),
        proxy: { // proxy URLs to backend development server
            '/api': 'http://localhost:3000'
        },
        stats: {
            colors: true,
            chunks: false,
            children: false,
        },
        before() {
            spawn('electron', ['.', '--trace-warnings'], {
                    shell: true,
                    env: process.env,
                    stdio: 'inherit'
                })
                .on('close', code => process.exit(0))
                .on('error', spawnError => console.error(spawnError));
        },
        onListening: function (server) {
            const port = server.listeningApp.address().port;
            console.log('Listening on port:', port);
        },
        compress: true,
        port: 8080
    },
};