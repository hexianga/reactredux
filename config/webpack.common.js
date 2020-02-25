const path = require('path');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const Visualizer = require('webpack-visualizer-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin'); // eslint-disable-line
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const isDev = process.env.NODE_ENV === 'development'
const root = path.resolve(__dirname, '..');

module.exports = {
  mode: isDev ? 'development' : 'production',
  entry: {
    app: path.join(root, 'src/app.jsx'), // 或者是 './src/app.jsx'，这个路径最后会和执行脚本的命令所在的路径进行拼接
  },
  output: {
    filename: 'js/[name].[hash:5].js', // 打包后的文件名
    path: path.join(root, 'dist/static/'), // 所有打包后文件存放的目录
    publicPath: '/static/', // 域名和文件名之间的路径
  },
  resolve: {
    extensions: ['.js', '.jsx'],
    alias: {
      utils: path.resolve(root, 'src/utils/'),
      components: path.resolve(root, 'src/components/'),
      modules: path.resolve(root, 'src/modules/'),
      '@pages': path.resolve(root, 'src/pages/'),
      'react-virtualized/List': 'react-virtualized/dist/es/List',
    },
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          // 为什么在开发环境不用剥离开来作为单独的文css件？因为本地文件在内存，读取很快。
          isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
          'css-loader'
        ],
      }, {
        test: /\.scss$/,
        use: [
          isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              modules: true,
              localIdentName: '[local]__[hash:base64:5]',
            },
          },
          'sass-loader',
        ],
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
              name: '[name].[hash:5:5].[ext]',
              outputPath: 'assets',
            }
          }
        ]
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: '../index.html',
      template: path.join(root, 'src/index.html'),
      inject: true,
      meta: {
        viewport: 'width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0',
      },
    }),

    new MiniCssExtractPlugin({
      filename: 'css/[name].[hash:5].css',
    }),
    new BundleAnalyzerPlugin(),
    new Visualizer()

  ],

  optimization: {
    splitChunks: {
      chunks: (chunk) => {
        return chunk.name !== 'antdlayout'; // 指定某些块不提取公共部分
      },
      cacheGroups: {
        commons: {
          test: /[\\/]node_modules[\\/](react|react-dom)[\\/]/,
          name: 'vendors',
          chunks: 'all'
        }
      }
    }
  }
};
