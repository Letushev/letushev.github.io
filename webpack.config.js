const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const CSSExtractPlugin = require('mini-css-extract-plugin');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: {
    index: './src/index.js',
    math: './src/subject/math.js',
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  module: {
    rules: [
      {
        test: /\.(s[ac]ss)$/,
        use: [
          CSSExtractPlugin.loader,
          'css-loader',
          'sass-loader',
        ],
      },
      {
        test: /\.(png|svg|gif|jpe?g)$/,
        type: 'asset/resource',
      }
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HTMLWebpackPlugin({
      filename: 'index.html',
      template: './src/index.html',
      excludeChunks: ['math']
    }),
    new HTMLWebpackPlugin({
      filename: 'subject.html',
      template: './src/subject/subject.html',
    }),
    new CSSExtractPlugin(),
    new CopyPlugin({
      patterns: [
        {
          from: './src/images',
          to: 'images',
        }
      ]
    }),
  ],
  devServer: {
    contentBase: './dist',
  }
};
