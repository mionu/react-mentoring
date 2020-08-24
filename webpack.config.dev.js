const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
    mode: 'development',
    context: path.join(__dirname, 'src'),
    entry: './index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js',
    },
    resolve: {
        modules: [path.resolve(__dirname, './src'), 'node_modules'],
        extensions: ['.js', '.jsx'],
    },
    module: {
        rules: [{
            test: /\.jsx?$/,
            exclude: /node_modules/,
            loader: "babel-loader",
            options: {
                plugins: ['@babel/plugin-proposal-class-properties'],
                presets: ['@babel/preset-react', '@babel/preset-env'],
            },
        }, {
            test: /\.scss$/,
            use: [
                { loader: MiniCssExtractPlugin.loader },
                'css-loader',
                'sass-loader',
            ],
        }],
    },
    plugins: [
        new HtmlWebpackPlugin({ template: '../index.html' }),
        new MiniCssExtractPlugin(),
    ],
    devServer: {
        contentBase: path.join(__dirname, 'dist'),
        compress: true,
        port: 3000,
    },
    optimization: {
        splitChunks: {
            chunks: 'all',
        },
    },
    devtool: 'source-map',
    watch: true,
};