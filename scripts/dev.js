const rollup = require('rollup');
const chalk = require('chalk');
const readline = require('readline')
const express = require("express")
const fs = require("fs")
const { argv } = require('process')
const INPUTS = require('./inputs');
const terser = require('rollup-plugin-terser')
let aqua = chalk.rgb(0, 255, 255)
const log = console.log
const http = require("http")
const pkg = require('../packages/orbiton/package.json')
const webpack = require("webpack")
const babel = require('@rollup/plugin-babel')
const path = require('path')
const AddCustomExtension = require('./plugins/RollupAddExtesion');
const { config } = require('../.config/webpack.config');
const { open } = require('./utils/openURL')

log(`${aqua(`Orbiton JS v${pkg.version}`)} \n${chalk.gray('run script')} ${chalk.underline.yellow('dev')}`)

async function buildOrbitonBundle() {
  log(`Building ${chalk.blue("Orbiton Js")}.
${chalk.magenta('Releasing outputs in:')} ${chalk.underline.green("demo/build/main.js")}
  `)
  const rollupBundle = await rollup.rollup({
    input: "packages/orbiton/src/index.ts",
    plugins: [
      AddCustomExtension.AddCustomExtension('.ts'),
      babel.babel({
        configFile: path.resolve(__dirname, '../.config/.babelrc'),
        babelHelpers: 'bundled',
        extensions: ['.js', '.jsx', '.es6', '.es', '.mjs', '.ts']
      })
    ]
  })
  await rollupBundle.write({
    format: "umd",
    file: `demo/lib/main.js`,
    name: "Orbiton",
    exports: 'auto'
  })
}


async function buildWebpack() {
  log(`Building ${chalk.blue("Bundle")}.`)
  const compiler = webpack(config);

  compiler.run((err, stats) => {
    if (stats.compilation.errors.length > 0) {
      log(chalk.red("An Error Encountered\n"))
      log(stats.compilation.errors)
      log(err)
    }


    compiler.close((closeErr) => {
      // ...
    });
  });
  log(`${chalk.magenta('Releasing outputs in:')} ${chalk.underline.green("demo/build/app.bundle.js")}`)
}


const args = argv.slice(2)
const getport = () => {
  let port = 7320
  for (const arg of args) {
    if (arg.startsWith("port=")) {
      let strp = arg.substring(5)
      port = parseInt(strp)
    }
  }
  return port
}

const app = express()

const port = process.env.PORT || getport()

const devURL = "http://localhost:" + port

log(`Starting development server at ${chalk.blue.underline(devURL)}`)



const dist = path.join(__dirname, "demo/webpack")
const index = path.join(dist, "index.html")
app.use(express.json())
app.use(express.static("demo/webpack"))
app.get('/', (req, res) => {
  res.sendFile(index, (err) => {
    if (err) {
      res.status(500).send(err)
    }
  })
})
const server = http.createServer(app)
server.listen(port)


async function Build() {
  await buildOrbitonBundle()
  await buildWebpack()
  open(devURL)
  const rl = readline.createInterface({ input: process.stdin, output: process.stdout })
  rl.question(`Type ${chalk.black.bgWhite("`Ctrl + c`")} to stop process  or ${chalk.green("`rb`")} to rebuild or ${chalk.green("`clear()`")} to clear terminal: \n${chalk.gray(">>> ")} `, async (userinput) => {
    if (userinput === "clear()") {
      console.clear()
      log(`Type ${chalk.black.bgWhite("`Ctrl + c`")} to stop process  or ${chalk.green("`rb`")} to rebuild: \n `)
      rl.setPrompt(chalk.gray(">>> "))
      rl.prompt()
    } else {
      if (userinput === "rb") {
        await buildOrbitonBundle()
        await buildWebpack()
      }
      rl.setPrompt(chalk.gray(">>> "))
      rl.prompt()
      rl.on("line", async (useri) => {
        if (useri.trim() === "rb") {
          await buildOrbitonBundle()
          await buildWebpack()
          rl.setPrompt(chalk.gray(">>> "))
          rl.prompt()
        } else if (useri.trim() === "clear()") {
          console.clear()
          log(`Type ${chalk.black.bgWhite("`Ctrl + c`")} to stop process  or ${chalk.green("`rb`")} to rebuild: \n `)
          rl.setPrompt(chalk.gray(">>> "))
          rl.prompt()
        } else {
          rl.setPrompt(chalk.gray(">>> "))
          rl.prompt()
        }
      })

    }
  })
}



//buildWebpack()

if (args.includes("--watch") || args.includes("-w")) {
  fs.watch("demo/src", async (e, f) => {
    await buildWebpack()
  })
} else {
  Build()
}
