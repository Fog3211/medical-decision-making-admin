const path = require('path');
const merge = require('webpack-merge');
const common = require('./webpack.config.js');
const TerserPlugin = require('terser-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const productionName = require("../package.json").name

// 每次执行打包 先清除之前的打包文件
const {
  CleanWebpackPlugin,
} = require('clean-webpack-plugin')

module.exports = merge(common, {
  mode: 'production',
  output: {
    publicPath: `./`,
    path: path.resolve(__dirname, '../build'),
    filename: `js/${productionName}.[hash:8].js`,
  },
  module: {
    rules: [{
        test: /\.(css|less)$/,
        exclude: /node_modules/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              modules: {
                localIdentName: '[hash:base64]',
              }
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
          'css-loader',
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
    // 打包前清除之前的build目录
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: `css/${productionName}.[hash:8].css`,
      chunkFilename: '[id].css',
      publicPath: `./`,
    }),
  ],
  optimization: {
    minimizer: true,
    minimizer: [
      new TerserPlugin({
        parallel: true,
        terserOptions: {
          output: {
            comments: false
          }
        }
      }),
      new OptimizeCSSAssetsPlugin({
        cssProcessor: require('cssnano'),
        cssProcessorOptions: {
          reduceIndents: false,
          autoprefixer: false,
        },
      }),
    ],
  }
})
