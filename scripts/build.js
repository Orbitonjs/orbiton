/**
 * Copyright (c) 2021 - present Beignana Jim Junior and other contributors.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

const rollup = require('rollup');
const chalk = require('chalk');
const INPUTS = require('./inputs');
const terser = require('rollup-plugin-terser')
let aqua = chalk.rgb(0, 255, 255)
const log = console.log
const { argv } = require('process')
const pkg = require('../packages/orbiton/package.json')

log(`
${aqua(`Orbiton JS v${pkg.version}`)}
${chalk.gray('script')} ${chalk.underline.yellow('build')}
`)


const build = async (package) => {

  log(`
Building ${chalk.blue(package.name)}.
  ${chalk.magenta('Releasing outputs in:')}
  `)




  const inputOptions = {
    input: package.entry,
    ...package.rollupInputOptions
  }

  const bundle = await rollup.rollup(inputOptions)

  for (const output of package.output) {
    let rollupOutputPlugins = []

    if (typeof package.rollupOutputPlugins !== 'undefined') {
      for (const plugin of package.rollupOutputPlugins) {
        rollupOutputPlugins.push(plugin)
      }
    }

    const outputOptions = {
      format: output.format,
      file: output.file,
      name: package.name,
      exports: output.exports ? output.exports : 'auto',
      plugins: [
        ...rollupOutputPlugins,
        output.compress && terser.terser(),
      ]
    }
    log(`      - ${chalk.underline.green(outputOptions.file)}`)
    await bundle.write(outputOptions)
  }

}


async function buildAll() {
  for (const input of INPUTS) {
    await build(input)
  }
  log(`
  ✨ ${chalk.green('Success')} ${chalk.gray(' finished to bundle all libraries')}
  `)
}

const args = argv.slice(2)
const getPkg = () => {
  let pkg = null
  for (const arg of args) {
    if (arg.startsWith("pkg=")) {
      let strp = arg.substring(4)
      pkg = strp
    }
  }
  return pkg
}
const packageName = getPkg()


async function buildPackages(params) {
  if (packageName === null) {
    await buildAll()
  } else {
    for (const input of INPUTS) {
      //console.log(input.name)
      if (input.name === packageName) {
        await build(input)
        log(`
✨ ${chalk.green('Success:')} ${chalk.gray(' Finished to bundle ' + packageName)}`
        )
      }
    }

  }
}
buildPackages()
module.exports.build = buildAll
