const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

const ruleForStyles = {
  test: /\.css$/,
  use: ["style-loader", "css-loader", "postcss-loader"]
}

const ruleForHtml = {
  test: /\.html$/i,
  loader: "html-loader"
}

module.exports = (env, argv) => {
  const { mode } = argv
  const isProduction = mode === 'production'
  return {
    // entry: './src/index.js',
    output: {
      filename: isProduction ? '[name].[contenthash].js' : 'main.js',
      path: path.resolve(__dirname, "build")
    },
    module: {
      rules: [
        ruleForStyles,
        ruleForHtml,
      ]
    },
    plugins: [
      new HtmlWebpackPlugin({ template: 'src/index.html' })
    ],
    devServer: {
      open: true,
      port: 3000
    },
  }
}