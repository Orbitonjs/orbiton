/**
 * Copyright (c) 2021 - present Beignana Jim Junior and other contributors.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

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
