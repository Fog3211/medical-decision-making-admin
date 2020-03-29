const merge = require('webpack-merge');
const common = require('./webpack.config.js');
const path = require('path');

const appSrc = path.resolve(__dirname, '../src');

module.exports = merge(common, {
  mode: 'production',
  devtool: 'source-map',
  // 出口
  output: {
    filename: '[name]_[hash:8].js',
    // pathinfo: true,
    // // 所有输出文件的目标路径
    // // 必须是绝对路径（使用 Node.js 的 path 模块）
    // // chunk名称配置
    // chunkFilename: '[name].chunk.js',
    // // 输出的文件名配置
    // filename: 'bundle.js',
    // sourceMapFilename: '[name].chunk.map.js',
  },
  module: {
    rules: [{
        test: /\.html/,
        use: [{
          loader: 'html-loader',
        }],
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        include: appSrc,
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-env', '@babel/preset-react'],
        },
      },
      // 针对静态文件
      {
        test: /\.(png|jpg|gif)$/,
        loader: 'url-loader',
        options: {
          limit: 8192,
          name: 'static/[name].[hash:8].[ext]',
        },
      },
      {
        test: /\.(css|less)$/,
        exclude: /node_modules/,
        use: [
          'style-loader',
          {
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
  devServer: {
    // HOST
    'host': 'localhost',
    // 端口
    // 'port': 8181,
    // 报错提示在网页遮罩层
    'overlay': true,
    // 显示运行进度
    'progress': true,
    // 'proxy': {
    //   '/api': {
    //     target: 'http://af.sit.hupu.com/',
    //     pathRewrite: {
    //       '^/api': '/api',
    //     },
    //     secure: false,
    //     changeOrigin: true,
    //   },
    // },
    'headers': {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': '*',
      'Access-Control-Allow-Methods': '*',
    },
  },
});
