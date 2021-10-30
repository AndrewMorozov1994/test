const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin= require('copy-webpack-plugin');
const fs = require('fs')

function generateHtmlPlugins(templateDir) {
    const templateFiles = fs.readdirSync(path.resolve(__dirname, templateDir));
    return templateFiles.map(item => {
      const parts = item.split('.');
      const name = parts[0];
      const extension = parts[1];
      return new HtmlWebpackPlugin({
        filename: `${name}.html`,
        template: path.resolve(__dirname, `${templateDir}/${name}.${extension}`),
        inject: false,
      })
    })
  }
  
const htmlPlugins = generateHtmlPlugins('./src/pages')

module.exports = {
    entry: [
        './src/js/index.js',
        './src/scss/style.scss'
    ],
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: './js/bundle.js',
    },
    devtool: "source-map",
    module: {
    rules: [{
            test: /\.js$/,
            include: path.resolve(__dirname, 'src/js'),
            exclude: /node_modules/,
            use: ['babel-loader'],
        },
        {
            test:/.(s*)css$/,
            use: [
                MiniCssExtractPlugin.loader,
                'css-loader',
                'sass-loader',
            ]
        },
        {
            test: /\.html$/,
            include: path.resolve(__dirname, './src/blocks'),
            loader: 'raw-loader',
            options: {
                esModule: false
            }
        },
        {
            test: /\.(ttf|woff|woff2)$/i,
            type: 'asset/resource',
            generator: {
                filename: 'fonts/[hash][ext][query]'
            }
        }
    ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: 'css/style.css',
        }),
        new CopyWebpackPlugin({
            patterns: [{
                from: 'src/images',
                to: './images'
            }]
        }),
        new CleanWebpackPlugin(),
    ].concat(htmlPlugins)
};
