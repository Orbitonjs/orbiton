/* eslint-disable @typescript-eslint/no-unused-vars */
import type {OrbitonDOMElement} from '../types/OrbitonTypes'
import Component from './createComponent'

/**
 * Trigers the `Mounted` lifecycle method of any component within the node
 * @param node
 */
export function trigerMountedLifeCycle(node: OrbitonDOMElement | HTMLElement | ChildNode):  void{
  if ("_orbiton$config" in node) {

    if (node._orbiton$config.isComponentRoot) {
      node._orbiton$config.componentHosted.forEach((comp: Component, ind: number)=> {
        if (comp.type === "IS_X_COMPONENT") {
          comp.Mounted()
        }
      })
    }
  }
  node.childNodes.forEach((child: OrbitonDOMElement, i: number) => {
    trigerMountedLifeCycle(child)
  })
}
