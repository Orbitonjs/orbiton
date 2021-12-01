
// This file is used in development when testing in the browser

const path = require('path')
const customplugin = require('../scripts/plugins/RollupAddExtesion')
import { babel } from '@rollup/plugin-babel';
const AddCustomExtension = customplugin.AddCustomExtension



const devConfig = {
  input: 'tests/jsx/index.js',
  output: {
    format: 'umd',
    file: 'tests/visual/app.bundle.js'
  },
  plugins: [
    babel({
      plugins: ["@babel/plugin-syntax-jsx", "./packages/babel-plugin-orbiton-jsx/lib/index"],
      babelHelpers: 'bundled',
    })
  ]
}


const _devConfig = {
  input: 'packages/orbiton/src/index.ts',
  output: {
    format: 'umd',
    name: 'Pearl',
    file: 'tests/visual/main.js'
  },
  plugins: [
    AddCustomExtension('.ts'),
    babel({
      configFile: path.resolve(__dirname, '.babelrc'),
      babelHelpers: 'bundled',
      extensions: ['.js', '.jsx', '.es6', '.es', '.mjs', '.ts']
    }),
  ]
}

const pluginConfig = {
  input: 'packages/babel-plugin-orbiton-jsx/src/index.js',
  output: {
    format: 'cjs',
    exports: "default",
    file: 'packages/babel-plugin-orbiton-jsx/lib/index.js'
  },
  plugins: [
    babel({
      configFile: path.resolve(__dirname, '.babelrc'),
      babelHelpers: 'bundled'
    }),
  ]
}

export default [
  pluginConfig,
  _devConfig,
  devConfig
]
