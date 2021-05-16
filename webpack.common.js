// CommonJs style
// - module.exports = {...} にルールを記述する
//   * 似たようなものにES6から、import/exportというのがある
// 実行方法は：
//   yarn run webpack
// 
const path = require('path'); // output で相対パスにするために読込
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
//
module.exports = ({ outputFile, assetFile, htmlMinifyOption }) => ({
  entry: {app: './src/index.js'},
  output: {
    path: path.resolve(__dirname, 'docs'),
    filename: `${outputFile}.js`
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
      {
        enforce: 'pre',
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'eslint-loader',
      },
      {
        test: /\.scss$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader',
          'sass-loader',
        ]
      },
      {
        test: /\.(jpe?g|gif|png|svg|woff2?|tff|eot)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: `${assetFile}.[ext]`,
              outputPath: 'images',
              publicPath: 'images',
            },
          },
        ]
      },
      {
        test: /\.html$/,
        use: [ 'html-loader'],
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({ 
        filename: `${outputFile}.css`
    }),
    // refer https://codehero.jp/javascript/27639005/how-to-copy-static-files-to-build-directory-with-webpack
    new CopyWebpackPlugin({
      patterns: [
        { from: 'static' }
      ]
    }),
  ]
});
