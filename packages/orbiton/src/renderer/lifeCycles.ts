/**
 * Copyright (c) 2021 - present Beignana Jim Junior and other contributors.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

/* eslint-disable @typescript-eslint/no-unused-vars */
import type {OrbitonDOMElement} from '../../types/index'
import Component from './createComponent'

/**
 * Trigers the `Mounted` lifecycle method of any component within the node
 */
export function triggerMountedLifeCycle(node: OrbitonDOMElement | HTMLElement | ChildNode):  void{
  if ("_orbiton$config" in node) {

    if (node._orbiton$config.isComponentRoot) {
      node._orbiton$config.componentHosted.forEach((comp: Component, ind: number)=> {
        if (comp.type === "Component") {
          comp.Mounted()
        }
      })
    }
  }
  node.childNodes.forEach((child: OrbitonDOMElement, i: number) => {
    triggerMountedLifeCycle(child)
  })
}
