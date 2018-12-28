const path = require('path');
const webpack = require('webpack'); // eslint-disable-line
const webpackMerge = require('webpack-merge'); // eslint-disable-line
const commonConfig = require('./webpack.common.js');
// root 目录表示 app 目录
const root = path.resolve(__dirname, '..');

module.exports = webpackMerge(commonConfig, {
  mode: 'development',
  output: {
    publicPath: '/',
  },
  devtool: 'cheap-module-eval-source-map',
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
  ],
  devServer: {
    host: '0.0.0.0',
    port: 8060,
    hot: true,
    publicPath: '/',
    contentBase: path.join(root, 'dist'),
  },
});
// contentBase 中的资源将会通过域名 + publicPath + 文件名访问到。
