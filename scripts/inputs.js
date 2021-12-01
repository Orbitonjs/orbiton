
const babel = require('@rollup/plugin-babel')
const path = require('path')
const AddCustomExtension = require('./plugins/RollupAddExtesion')


module.exports = [
  {
    entry: 'packages/babel-plugin-orbiton-jsx/src/index.js',
    output: [
      {
        format: 'cjs',
        file: 'packages/babel-plugin-orbiton-jsx/lib/index.js'
      }
    ],
    rollupInputOptions: {
      plugins: [
        babel.babel({
          configFile: path.resolve(__dirname, '../.config/.babelrc'),
          babelHelpers: 'bundled'
        })
      ]
    },
    name: 'babel-plugin-orbiton-jsx'
  },
  {
    entry: 'packages/orbiton/src/index.ts',
    output: [
      {
        format: 'umd',
        file: 'packages/orbiton/umd/orbiton.development.js'
      },
      {
        format: 'umd',
        file: 'packages/orbiton/umd/orbiton.production.js',
        compress: true
      },
      {
        format: 'cjs',
        file: 'packages/orbiton/cjs/orbiton.development.js'
      },
      {
        format: 'cjs',
        file: 'packages/orbiton/cjs/orbiton.production.js',
        compress: true
      }
    ],
    rollupInputOptions: {
      plugins: [
        AddCustomExtension.AddCustomExtension('.ts'),
        babel.babel({
          configFile: path.resolve(__dirname, '../.config/.babelrc'),
          babelHelpers: 'bundled',
          extensions: ['.js', '.jsx', '.es6', '.es', '.mjs', '.ts']
        })
      ]
    },/*
    rollupOutputPlugins: [
      AddCustomExtension.AddCustomExtension('ts')
    ], */
    name: 'Orbiton'
  }
]
