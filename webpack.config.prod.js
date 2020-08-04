const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserPlugin = require('terser-webpack-plugin');

module.exports = {
    mode: 'production',
    context: path.join(__dirname, 'src'),
    entry: './index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js',
    },
    resolve: {
        extensions: ['.js', '.jsx'],
    },
    module: {
        rules: [{
            test: /\.jsx?$/,
            exclude: /node_modules/,
            loader: "babel-loader",
            options: {
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
    optimization: {
        minimizer: [new TerserPlugin()],
    },
    plugins: [
        new HtmlWebpackPlugin({ template: '../index.html' }),
        new MiniCssExtractPlugin(),
    ],
    watch: false,
};