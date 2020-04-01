const path = require('path')
const merge = require('webpack-merge')
const common = require('./webpack.config.js')
const TerserPlugin = require('terser-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const WebpackDeepScopeAnalysisPlugin =
  require('webpack-deep-scope-plugin').default
const productionName = process.cwd().split('/').pop()

// 每次执行打包 先清除之前的打包文件
const {
  CleanWebpackPlugin,
} = require('clean-webpack-plugin')
const appSrc = path.resolve(__dirname, '../src')

module.exports = merge(common, {
  mode: 'production',
  // 出口
  output: {
    // pathinfo: false,
    chunkFilename: 'js/[name].chunk.js',
    // // 所有输出文件的目标路径
    // // 必须是绝对路径（使用 Node.js 的 path 模块）
    path: path.resolve(__dirname, './../build'),
    filename: 'js/[name].[chunkhash:8].js',
    sourceMapFilename: 'js/[name].chunk.map.js',
    publicPath: `./`,
  },
  module: {
    rules: [{
        test: /\.(ts|tsx)$/,
        include: appSrc,
        exclude: /node_modules/,
        use: [{
          loader: 'ui-component-loader',
          options: {
            'lib': 'antd',
            'camel2': '-',
            'style': 'style/index.less',
          },
        }],
      },
      // 针对静态文件
      {
        test: /\.(png|jpg|gif)$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: 'static/[name].[hash:8].[ext]',
        },
      },
      {
        test: /\.(css|less)$/,
        exclude: /node_modules/,
        use: [
          MiniCssExtractPlugin.loader,
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
  plugins: [
    // 打包前清除之前的build目录
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin(),
    new WebpackDeepScopeAnalysisPlugin(),
  ],
  optimization: {
    minimizer: true,
    minimizer: [
      new TerserPlugin(),
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
