const webpack              =  require('webpack');
const HtmlWebpackPlugin    = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
// const SWPrecacheWebpackPlugin = require('sw-precache-webpack-plugin');
const { resolve }          = require('path');


// const swPrecacheWebpackPlugin = new SWPrecacheWebpackPlugin();

module.exports = {
  entry: resolve(__dirname, "src/index.tsx"),
  output: {
    path: resolve(__dirname, 'dist'),
    filename: "app-[hash:8].bundle.js",
    chunkFilename: "[name].js",
    publicPath: "/"
  },
  devtool: 'inline-source-map',
  module: {
    rules: [
      {
        test: /\.(js|ts|tsx)$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: "swc-loader"
        }
      },
      {
        test: /\.(sa|sc|c)ss$/,
        // use: ['style-loader', 'css-loader'],
        use: [{
          loader: MiniCssExtractPlugin.loader,
          options: {
            publicPath: resolve(__dirname, 'public/assets'),
          }
        }, 
          'css-loader', 'sass-loader'
        ]
      },
      {
        test: /\.(png|jpg|jpeg|gif)$/,
        use: [
          {
            loader: "url-loader",
            options: {
              esModule: false, 
              name: "[name]-[hash:5].min.[ext]",
              limit: 20000, // size <= 20KB
              publicPath: "static/",
              outputPath: "static/"
            }
          }
        ]
      }
    ]
  },
  resolve: {
    extensions: ['*', '.js', '.ts', '.tsx'],
    modules: [resolve(__dirname, './src'), 'node_modules'],
    alias: {
        '@': resolve(__dirname, '/'),
        '@api': resolve(__dirname, 'src/api')
      }
  },
  plugins: [
    new MiniCssExtractPlugin(),
    new HtmlWebpackPlugin({
      template: 'public/index.html',
      filename: "index.html",
      cache: true
    }),
    // new SWPrecacheWebpackPlugin(
    //   {
    //     cacheId: 'cloudStorage',
    //     // dontCacheBustUrlsMatching: /\.\w{8}\./,
    //     filename: resolve(__dirname, 'src/service_worker.js'),
    //     minify: true,
    //     navigateFallback: './index.html',
    //     staticFileGlobsIgnorePatterns: [/\.map$/, /asset-manifest\.json$/],
    //   }
    // ),
    new webpack.SourceMapDevToolPlugin({})
  ],
  devServer: {
    contentBase: resolve(__dirname, './'),
    // publicPath: '/dist/',
    // host: '0.0.0.0',
    compress: true,
    hot: true,
    port: 6555,
    open: true,
    historyApiFallback: true,
    // proxy: {
    //   '/': 'http://localhost:3000'
    // }
  }
};