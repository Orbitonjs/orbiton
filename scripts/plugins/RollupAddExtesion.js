/**
 * Copyright (c) 2021 - present Beignana Jim Junior and other contributors.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

const chalk = require('chalk');
const path = require('path')
const log = console.log
const pluginutils = require('@rollup/pluginutils')

/**
* Adds a custon file extension other than js that can be compiled by rollup
* @param {string} extension - the extesion you want to add
*/
function AddCustomExtension(extension, options = {}) {
  if (extension === '.js') {
    log(chalk.dim('Files with `.js` are accepted by deault'))
  }
  return {
    resolveId(imported, id) {
      if (id !== undefined) {
        let relativeLocation = pluginutils.addExtension(imported, extension);
        //console.log(reletiveLocation)
        return path.resolve(path.dirname(id), relativeLocation)
      }
    }
  };
}

module.exports.AddCustomExtension = AddCustomExtension
