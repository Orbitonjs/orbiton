/**
 * Copyright (c) 2021 - present Beignana Jim Junior and other contributors.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */
const pkg = require('../packages/orbiton/package.json')
const babel = require('@rollup/plugin-babel')
const path = require('path')
const AddCustomExtension = require('./plugins/RollupAddExtesion');
const replace = require('@rollup/plugin-replace');

module.exports = [
  {
    entry: 'packages/orbiton/src/jsx-runtime/index.js',
    output: [
      {
        format: 'cjs',
        file: 'packages/orbiton/jsx-runtime.js'
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
    name: 'orbiton/jsx-runtime'
  },
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
      },
      {
        format: 'es',
        file: 'deno/esm/orbiton.development.js'
      },
      {
        format: 'es',
        file: 'deno/esm/orbiton.production.js',
        compress: true
      }
    ],
    rollupInputOptions: {
      plugins: [
        AddCustomExtension.AddCustomExtension('.ts'),
        replace({
          '__PACKAGE_VERSION__': pkg.version,
        }),
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
