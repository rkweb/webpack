const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ImageminPlugin = require('imagemin-webpack-plugin').default;
const imageminMozjpeg = require('imagemin-mozjpeg');
const pngquant = require('imagemin-pngquant');
const HtmlWebpackInlineSourcePlugin = require('html-webpack-inline-source-plugin');

let isDev = process.env.npm_lifecycle_event == "dev"?true:false;

var plugin = [
    new CleanWebpackPlugin(['dist']),
    new ExtractTextPlugin({
        filename: 'dist/css/[hash].css',
        allChunks: true
    }),
    new HtmlWebpackPlugin({
        filename: 'index.html',
        template: 'src/index.html',
        inject: true,
        hash: false,
        minify: {
            removeComments: true,
            collapseWhitespace: true
        },
        inlineSource: '.(js|css)$'
    }),
    new HtmlWebpackInlineSourcePlugin()
];

if (!isDev){
    plugin.push(new ImageminPlugin({
        plugins: [
            imageminMozjpeg({
                quality: 80,
                progressive: true
            }),
            pngquant({
                quality: 70
            })
        ]
    }));
}

module.exports = {
    mode: 'development',
    entry: './src/js/main.js',
    output: {
        filename: 'dist/js/[name]-[hash:8].js',
        path: path.resolve(__dirname, './'),
        publicPath: ''
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /(node_modules)/,
                include: [
                    path.resolve(__dirname, "src"),
                ],
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['env']
                    }
                }
            },
            {
                test: /\.js$/,
                exclude: /(node_modules)/,
                include: [
                    path.resolve(__dirname, "src"),
                ],
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['env']
                    }
                }
            },
            {
                test: /\.css$/,
                exclude: /(node_modules)/,
                use: [
                    'style-loader', {
                        loader: 'css-loader',
                        options: {
                            importLoaders: 1
                        },
                    },
                    'postcss-loader'
                ]
            },
            {
                test: /\.scss/,
                exclude: /(node_modules)/,
                use: ExtractTextPlugin.extract({
                    use: [{
                        loader: 'css-loader'
                    }, {
                        loader: 'sass-loader'
                    }],
                    fallback: 'style-loader'
                })
            },
            {
                test: /\.png|.jpg|.gif|json$/,
                use: {
                    loader: 'url-loader',
                    options: {
                        limit: 8192,
                        fallback: 'file-loader',
                        publicPath: '',
                        outputPath: 'dist/image/',
                        name: '[name]-[hash:8].[ext]'
                    }
                }
            },
            {
                test: /\.mp3$/,
                use: {
                    loader: 'file-loader',
                    options: {
                        publicPath: '',
                        outputPath: 'dist/music/',
                        name: '[name]-[hash:8].[ext]'
                    }
                }
            },
            {
                test: /\.ts|.obj|.mtl$/,
                loader: 'file-loader',
                options: {
                    name: '[name]-[hash:8].[ext]',
                    outputPath: 'dist/asset/'
                }
            },
            {
                test: /\.(html)$/,
                use: {
                    loader: 'html-withimg-loader',
                    options: {
                        name: '[hash].[ext]'
                    }
                }
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/, 
                use: {
                    loader: 'file-loader',
                    options: {
                        outputPath: 'dist/fonts',
                        name: '[hash].[ext]'
                    }
                }
            }
        ]
    },
    plugins: plugin,
    devServer: {
        compress: true,
        port: 9000,
        disableHostCheck: true,
        host: "10.234.152.130",
        hot: true,
        inline: true,
        open: true,
        historyApiFallback: true,
        progress: true
    }
};