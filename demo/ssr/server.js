
require('ignore-styles')
require("@babel/register")({
  plugins: ["@babel/plugin-syntax-jsx", "babel-plugin-orbiton-jsx"]
})
require("@babel/plugin-syntax-jsx")
require("babel-plugin-orbiton-jsx")

const express = require('express');
const App = require('../src/App')
const app = express()
const OrbitonServer = require('@orbiton/server')
const fs = require("fs")
const path = require("path")

app.get('/', (req, res) => {
  const app = OrbitonServer.renderToString(App.App)
  const indexfile = path.resolve("demo/webpack/index.html")

  fs.readFile(indexfile, 'utf8', (err, data) => {
    if (err) {
      console.err('An error occured \n', err)
      return res.status(500).send('Opps errr')
    }
    return res.send(
      data.replace('<div id="root"></div>', `<div id="root">${app}</div>`)
    )
  })

})
const PORT = process.env.PORT || 3000
app.use(express.json())
app.use(express.static('demo/webpack'))
app.listen(PORT)
console.log("App listening at http://localhost:" + PORT)
