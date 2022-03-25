
// This file is used in development when testing in babel plugin

const path = require('path')
import { babel } from '@rollup/plugin-babel';



const pluginConfig = {
  input: 'packages/babel-plugin-orbiton-jsx/src/index.js',
  output: {
    format: 'cjs',
    exports: "default",
    file: 'packages/babel-plugin-orbiton-jsx/lib/index.esm.js'
  },
  plugins: [
    babel({
      configFile: path.resolve(__dirname, '.babelrc'),
    }),
  ]
}

export default [
  pluginConfig
]
