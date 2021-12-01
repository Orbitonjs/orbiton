const path = require("path")

module.exports.config = {
  entry: "./demo/src/index.js",
  output: {
    filename: "app.bundle.js",
    path: path.resolve("demo/build"),
    publicPath: "/"
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            plugins: ["@babel/plugin-syntax-jsx", "./packages/babel-plugin-orbiton-jsx/lib/index"]
          }
        }
      }
    ]
  }
}
