
const exec = require('child_process').exec

function open(url) {
  const pltfm = process.platform
  let comand;
  if (pltfm === 'darwin') {
    comand = 'open'
  } else if (pltfm === 'win32') {
    comand = 'start'
  } else {
    comand = 'xdg-open'
  }
  const cmd = comand + " " + url;
  exec(cmd)
}


module.exports.open = open
