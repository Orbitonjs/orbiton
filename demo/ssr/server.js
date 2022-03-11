
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
app.use(express.json())
app.use(express.static('demo/webpack'))
app.get('/', (req, res) => {
  res.send(`
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8" />
  <meta http-equiv="X-UA-Compatible" content="IE=edge" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <link rel="shortcut icon" href="/favicon.png" type="image/png" />
</head>

<body>
  <div class="pearl">
    <div id="root">${OrbitonServer.renderToString(App.App)}</div>
  </div>
</body>

</html>

  `)
})

app.listen(3000)
console.log("App listening ")
