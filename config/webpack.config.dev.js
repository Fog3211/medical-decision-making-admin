const merge = require('webpack-merge');
const common = require('./webpack.config.js')
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin')

module.exports = merge(common, {
  mode: 'development',
  devtool: 'cheap-module-eval-source-map',
  output: {
    publicPath: '/',
    library: '[name]',
    libraryTarget: 'umd',
    jsonpFunction: `webpackJsonp_feedback`,
    globalObject: 'this',
  },
  module: {
    rules: [{
        test: /\.(css|less)$/,
        exclude: /node_modules/,
        use: ['style-loader', {
            loader: 'css-loader',
            options: {
              modules: true,
              localIdentName: '[name]__[local]__[hash:base64:5]',
              importLoaders: 2,
            },
          },
          {
            loader: 'less-loader',
            options: {
              javascriptEnabled: true,
            },
          },
        ],
      },
      {
        test: /\.(css|less)$/,
        include: /node_modules/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              importLoaders: 2,
            },
          },
          {
            loader: 'less-loader',
            options: {
              javascriptEnabled: true,
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new ForkTsCheckerWebpackPlugin(),
  ],
  devServer: {
    'host': 'localhost',
    // 'port': 8181,
    // 报错提示在网页遮罩层
    'overlay': true,
    // 显示运行进度
    'progress': true,
    'proxy': {
      '/admin': {
        target: 'http://kf-feedback.sit.hupu.io',
        pathRewrite: {
          '^/admin': '/admin',
        },
        secure: false,
        changeOrigin: true,
      },
    },
    'headers': {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': '*',
      'Access-Control-Allow-Methods': '*',
    },
  },
});
