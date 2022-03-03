/**
 * Copyright (c) 2021 - present Beignana Jim Junior and other contributors.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import { OrbitonDOMElement } from "../../types/index";

type Ref = symbol
/**
* Returns an `HTMLElement` represented by a given `ref`
*/
/* eslint-disable no-unused-vars */
export function getRef(ref: Ref): OrbitonDOMElement | null {
  let node: OrbitonDOMElement | null = null
  const allNodes = document.querySelectorAll('*') as NodeListOf<OrbitonDOMElement>
  allNodes.forEach((e: OrbitonDOMElement) => {
    if (e.__ORBITON_CONFIG__.ref === ref) {
      node = e
    }
  })
  return node
}


export function createId(name: string, key: null | unknown = null): symbol {
  if (key === null || key === undefined) {
    key = Math.floor(Math.random() * 100000000)
    return Symbol(`${name}_random_generated_key_${key}`)
  }
  return Symbol(`${name}_provided_key_${key}`)
}



/**
* Creates a reference `Symbol`. This can be used to identify an element in the DOM
* @param {string} ref - A reference string.
* @returns {Ref}
*/
export function createRef(ref: string | null = null): Ref {
  const randomKey = Math.floor(Math.random() * 10000000)
  if (ref === null) {
    return Symbol(`__null_ref__${randomKey}`)
  }
  return Symbol(`${ref}__${randomKey}`)
}

