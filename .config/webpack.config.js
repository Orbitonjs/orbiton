const path = require("path")
const HtmlWebpackPlugin = require('html-webpack-plugin');
const renderer = `
import Orbiton from 'orbiton';
import jsx from 'orbiton/jsx-runtime';

`


module.exports.config = {
  entry: "./demo/src/index.js",
  output: {
    filename: "app.bundle.js",
    path: path.resolve("demo/webpack"),
    publicPath: "/"
  },
  mode: "development",
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            plugins: ["@babel/plugin-syntax-jsx", "./packages/babel-plugin-orbiton-jsx/lib/index"]
          }
        }
      },
      {
        test: /\.mdx?$/,
        use: [{
          loader: 'babel-loader',
          options: {
            plugins: ["@babel/plugin-syntax-jsx", "./packages/babel-plugin-orbiton-jsx/lib/index"]
          }
        },
        {
          loader: '@mdx-js/loader',
          options: { renderer }
        }
        ]
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif|json)$/i,
        type: 'asset/resource',
      },
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./demo/lib/template.html"
    })
  ]
}
