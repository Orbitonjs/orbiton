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
import * as dom from "./DomOperations"
/**
 * Trigers the `Mounted` lifecycle method of any component within the node
 */
export function triggerMountedLifeCycle(node: any , component: any = null):  void{
  if ("__ORBITON_CONFIG__" in node) {

    if (Array.isArray(node.__ORBITON_CONFIG__.__nonElement_parents_hosted)) {
      if (node.__ORBITON_CONFIG__.attachedComponent) {
        node.__ORBITON_CONFIG__.attachedComponent.Mounted()
      }
      if (component !== null) {
        const startIndex = node.__ORBITON_CONFIG__.__nonElement_parents_hosted.indexOf(component)
        node.__ORBITON_CONFIG__.__nonElement_parents_hosted.forEach((comp: Component, ind: number)=> {
          if (comp.type === "Component" && ind >= startIndex) {
            comp.Mounted()
          }
        })
      } else {
        node.__ORBITON_CONFIG__.__nonElement_parents_hosted.forEach((comp: Component, ind: number)=> {
          if (comp.type === "Component") {
            comp.Mounted()
          }
        })
      }

    }
  }
  if (Array.isArray(node)) {
    dom.childNodes(node).forEach((child: OrbitonDOMElement, i: number) => {
      triggerMountedLifeCycle(child, component)
    })
  } else {
    node.childNodes.forEach((child: OrbitonDOMElement, i: number) => {

      triggerMountedLifeCycle(child)
    })
  }
}



