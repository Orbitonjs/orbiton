/**
 * Copyright (c) 2021 - present Beignana Jim Junior and other contributors.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import {
  OrbitonDOMElement,
  OrbitonElement,
  Attr,
  OrbitonChildren,
  OrbitonSVGElement
} from "../../types/index";
import { Fragment } from "../core/Fragment";
import Component from "../renderer/createComponent";
import { render } from "../renderer/render";
import { ingeninateChildren } from "./Children";
import { triggerMountedLifeCycle } from "../renderer/lifeCycles";
import { evaluateStyleTag, getPropety } from "../renderer/ElementAttributes";



export function diffAndPatch(
  oldTree: string | OrbitonElement | Component | Fragment,
  newTree: string | OrbitonElement | Component | Fragment,
  node: OrbitonDOMElement | Array<OrbitonDOMElement>
): OrbitonDOMElement | OrbitonSVGElement {
  if (Array.isArray(node)) {
    //
  } else {


    // Diffing Instances
    // - Element and Element
    // - Component and Component
    // - Fragment and Fragment
    if (newTree === undefined) {
      node.remove()
      return node
    }
    if (typeof oldTree === "string" || typeof newTree === "string") {

      // incase one of the trees is a string
      // we check if the nodeValue od the DOM node is equal to the newTree
      // if its not equal then we replace it with the new string
      // If they are equal we just return the same node
      if (node.nodeValue !== newTree) {


        const newNode = render(newTree)
        if (Array.isArray(newNode)) {
          node.replaceWith(...newNode)
        } else {
          node.replaceWith(newNode)
        }
        triggerMountedLifeCycle(newNode)
        return newNode
      } else {
        return node
      }
    } else if (oldTree.type !== newTree.type) {

      // If the types are not the same we should just render a new Dom Tree.

      const newNode = render(newTree)
      node.replaceWith(newNode)
      triggerMountedLifeCycle(newNode)
      return newNode
    }else if (oldTree.type === "element" && newTree.type === "element") {
      return diffAndPatchElement(oldTree, newTree, node)
    } else if (oldTree.type === "Component" && newTree.type === "Component") {
      return DiffAndPatchComponent(oldTree, newTree, node)
    }else if (oldTree.type === "Fragment" && newTree.type === "Fragment") {
      ingeninateChildren(oldTree.children, newTree.children, node)
      return node
    }
  }
}

type ReplacingNodeObject = {
  isFragmentParent: boolean,
  node: OrbitonDOMElement
}

function replacingNode(node: OrbitonDOMElement | Array<OrbitonDOMElement>): ReplacingNodeObject {
  if (Array.isArray(node)) {
    return {
      isFragmentParent: true,
      node: node[0].parentNode as OrbitonDOMElement
    }
  }
  return {
    isFragmentParent: false,
    node
  }
}



export function diffAndPatchElement(
  oldTree: OrbitonElement ,
  newTree: OrbitonElement ,
  node: OrbitonDOMElement
): OrbitonDOMElement | OrbitonSVGElement {

  // If the tags of the trees are different then the whole tree is replaced
  if (oldTree.tag !== newTree.tag) {
    const newNode = render(newTree)
    node.replaceWith(newNode)
    triggerMountedLifeCycle(newNode)
    return newNode
  }
  PatchElementAttributes(oldTree.attributes, newTree.attributes, node)
  ingeninateChildren(oldTree.children, newTree.children, node)
  return node
}

export function DiffAndPatchComponent(
  oldComp: Component,
  newComp: Component,
  node$: OrbitonDOMElement | Array<OrbitonDOMElement>
): OrbitonDOMElement {
  const {node}  = replacingNode(node$)
  if (oldComp.pearlId !== newComp.pearlId) {
    const newNode = render(newComp)
    node.replaceWith(newNode)
    triggerMountedLifeCycle(newNode)
    return newNode
  } else {
    diffAndPatch(oldComp.makeChild(), newComp.makeChild(), node)
  }
}




export function PatchElementAttributes(
  OldAttr: Record<string, unknown>,
  NewAttrs: Record<string, string> | Attr ,
  node: OrbitonDOMElement | OrbitonSVGElement
): void {
  // Note: We first append all the new attributes
  // so that we can latter just remove the attributes that dont exits in the new attrs
  for (const [attr, value] of Object.entries(NewAttrs)) {
    // In this for loop we add atrributes and
    // also eveluate style objects and classnames.
    if (attr === "style") {
      if (OldAttr[attr] !== value) {
        node.setAttribute(attr, evaluateStyleTag(value))
      }
    } else if (attr.toLowerCase() === "classname") {
      if (OldAttr[attr] !== value) {
        node.setAttribute("class", value)
      }
    } else {
      if (OldAttr[attr] !== value) {
        node.setAttribute(getPropety(attr), value)
      }
    }
  }

  // We loop through the old attributes
  // if one of the old attributes is not in the neww attributes,
  // we ten remove it from the node
  for (const k in OldAttr) {
    if (!(k in NewAttrs)) {
      if (k.toLowerCase() === "className") {
        node.removeAttribute('class')
      } else {
        node.removeAttribute(getPropety(k))

      }
    }
  }
}
