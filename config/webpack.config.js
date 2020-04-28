const path = require('path');
const appSrc = path.resolve(__dirname, '../src');
const HtmlWebpackPlugin = require('html-webpack-plugin')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin

module.exports = {
  entry: {
    app: appSrc + '/index.tsx',
  },
  resolve: { // 添加在此的后缀所对应的文件可以省略后缀
    extensions: ['.ts', '.tsx', '.js', '.jsx', '.css', '.less'],
    alias: {
      '@assets': path.resolve(__dirname, '../src/assets'),
      '@components': path.resolve(__dirname, '../src/components'),
      '@config': path.resolve(__dirname, '../src/config'),
      '@layouts': path.resolve(__dirname, '../src/layouts'),
      '@pages': path.resolve(__dirname, '../src/pages'),
      '@store': path.resolve(__dirname, '../src/store'),
      '@styles': path.resolve(__dirname, '../src/styles'),
      '@utils': path.resolve(__dirname, '../src/utils'),
      '@views': path.resolve(__dirname, '../src/views'),
    }
  },
  module: {
    rules: [{
        test: /\.(tsx?)$/,
        use: [{
          loader: 'babel-loader'
        }]
      },
      {
        test: /\.(woff|woff2|eot|ttf|svg|jpe?g|png|gif|webp)$/,
        use: [{
          loader: 'url-loader',
          options: {
            limit: 8192,
            name: 'static/[name].[hash:8].[ext]'
          }
        }]
      }
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: appSrc + '/index.html',
      filename: 'index.html',
      minify: {
        removeComments: true,
        collapseWhitespace: true
      },
    }),
    // new BundleAnalyzerPlugin({
    //   analyzerMode: 'static',
    //   reportFilename: 'report.html',
    //   defaultSizes: 'parsed',
    //   openAnalyzer: true,
    //   generateStatsFile: false,
    //   statsFilename: 'stats.json',
    //   statsOptions: null,
    //   logLevel: 'info'
    // })
  ]
}
