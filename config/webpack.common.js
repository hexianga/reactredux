const path = require('path');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const Visualizer = require('webpack-visualizer-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin'); // eslint-disable-line
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const isDev = process.env.NODE_ENV === 'development'
const root = path.resolve(__dirname, '..');

console.log('process.env.NODE_ENV ', process.env.NODE_ENV)
module.exports = {
  mode: isDev ? 'development' : 'production',
  entry: {
    app: path.join(root, 'src/app.tsx'), // 或者是 './src/app.jsx'，这个路径最后会和执行脚本的命令所在的路径进行拼接
  },
  output: {
    filename: 'static/js/[name].[hash:5].js', // 打包后的文件名
    path: path.join(root, 'dist/'), // 所有打包后文件存放的目录
    publicPath: '/', // 域名和文件名之间的路径
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js', '.jsx'],
    alias: {
      net: path.resolve(root, 'net/'),
      components: path.resolve(root, 'src/components/'),
      modules: path.resolve(root, 'src/modules/'),
      assets: path.resolve(root, 'assets/'),
      '@pages': path.resolve(root, 'src/pages/'),
    },
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          // 为什么在开发环境不用剥离开来作为单独的文css件？因为本地文件在内存，读取很快。
          isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1
            },
          },
          'postcss-loader'
        ],
      }, {
        test: /\.scss$/,
        use: [
          isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              modules: true,
              localIdentName: '[local]_[hash:base64:5]',
              importLoaders: 1
            },
          },
          'postcss-loader',
          'sass-loader',
        ],
      }, {
        test: /\.less$/,
        use: [
          isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              modules: true,
              localIdentName: '[local]_[hash:base64:5]',
              importLoaders: 1 // 在 css-loader 前被应用到 @import 引入资源上的 loader 数
            },
          },
          'postcss-loader',
          {
            loader: 'less-loader',
            options: {
              javascriptEnabled: true, // 为什么要这个选项，是不是可以不要？   // 作用：允许通过js调用antd组件
            }
        },
        ],
      }, {
        test: /\.(ts|tsx)$/,
        use: [
          {
            loader: 'babel-loader'
          },
          'ts-loader'
        ],
        exclude: path.join(root, 'node_modules'),
      }, {
        test: /\.(js|jsx)$/,
        use: 'babel-loader',
        exclude: path.join(root, 'node_modules'),
      }, {
        test: /\.(png|jpg|jpeg|gif|woff|woff2|svg|ttf|eot|md)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[hash:5].[ext]',
              outputPath: 'static/assets',
            }
          }
        ]
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: path.join(root, 'src/index.html'),
      inject: true,
      meta: {
        viewport: 'width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0',
      },
    }),

    new MiniCssExtractPlugin({
      filename: 'static/css/[name].[hash:5].css',
    }),
    // new BundleAnalyzerPlugin(), // 弹出打包分析页面
    // new Visualizer() // 生成打包分析页面 stat.htmls

  ],

  // optimization: {
  //   splitChunks: {
  //     chunks: (chunk) => {
  //       return true
  //       // return chunk.name !== 'antdlayout'; // 指定某些块不提取公共部分
  //     },
  //     cacheGroups: {
  //       commons: {
  //         test: /[\\/]node_modules[\\/](react|react-dom)[\\/]/,
  //         name: 'vendors',
  //         chunks: 'all'
  //       }
  //     }
  //   }
  // }
};
