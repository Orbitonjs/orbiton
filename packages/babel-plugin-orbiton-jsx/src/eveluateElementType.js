/**
 * Copyright (c) 2021 - present Beignana Jim Junior and other contributors.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

let IsComponentNameRegex = /^[A-Z]/;

/**
* Evaluates the type of component
* @param {string} name -
*/
export function getElementType(name) {
  let isComponent = IsComponentNameRegex.test(name)
  if (typeof name !== 'string') {
    return "Component"
  }
  if (isComponent) {
    return 'Component'
  } else {
    return 'Element'
  }
}
