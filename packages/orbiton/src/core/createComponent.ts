/**
 * Copyright (c) 2021 - present Beignana Jim Junior and other contributors.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import { Options, Props } from "../../types/index"
import createElement from "./createElement"

/**
* Creates a new Component
*/
function createComponent<T>(comp: any , props: Props = {}, context: Props = {}): T| any{


  if (typeof comp === "function") {
    if (comp.isClassComponent) {
      const c = new comp(props, context)
      return c
    } if (comp.isFragment) {
      const c = new comp(props.children)
      return c
    }
    // Returns if the component was a Fuctional Component
    return comp(props)
  }
  if (typeof comp === 'string') {
    const opts = props as Options
    return createElement(comp, opts)
  }
  // If the component was a Variable
  // This stops the error encountered when initalising Mdx
  return comp
}

export default createComponent

