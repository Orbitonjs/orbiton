"use strict"

module.exports = {
  presets: [
    [
      "@babel/preset-env",
      {
        targets: {
          node: 'current'
        }
      }
    ],
    "@babel/preset-typescript"
  ],
  plugins: ["@babel/plugin-syntax-jsx", "./packages/babel-plugin-orbiton-jsx/lib/index"],
}
