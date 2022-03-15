/**
 * Copyright (c) 2021 - present Beignana Jim Junior and other contributors.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import { RenderOptions } from "../../types/index";
import * as dom from "../renderer/DomOperations"
import { evaluateStyleTag, getPropety } from "../renderer/ElementAttributes";
import { triggerMountedLifeCycle } from "../renderer/lifeCycles";
import { render } from "../renderer/render_new"
import { ingenimateChildren } from "./children_new";

function getParentComponentsAndFrags(node, parent): any[] {
  let checkingNode;
  if (Array.isArray(node)) {
    checkingNode = node[0]
  }else {
    checkingNode = node
  }
  const hosts = []
  for (const item of checkingNode.__ORBITON_CONFIG__.__nonElement_parents_hosted) {
    if (item === parent) {
      break
    } else {
      hosts.push(item)
    }
  }
  return hosts
}


export function diffAndPatch(
  oldTree: any,
  newTree: any,
  node: any,
  parentNode = null,
): any {

  if (newTree === undefined || oldTree === undefined) {
    if (newTree === undefined) {
      dom.remove(node)
      return node
    } else {
      const newNode = render(newTree)
      dom.appendChild(parentNode, newNode)
      return newNode
    }

  }
  if (typeof oldTree === "string" || typeof newTree === "string") {
    let nodeValue;
    try {
      nodeValue = dom.nodeValue(node)
    } catch (error) {
      nodeValue = undefined
    }
    // incase one of the trees is a string
    // we check if the nodeValue od the DOM node is equal to the newTree
    // if its not equal then we replace it with the new string
    // If they are equal we just return the same node
    if (nodeValue !== newTree) {
      const newNode = render(newTree)
      dom.replaceWith(node, newNode)
      triggerMountedLifeCycle(newNode)
      return newNode
    } else {
      return node
    }
  }
  if (oldTree.type !== newTree.type) {

    // If the types are not the same we should just render a new Dom Tree.
    let newNode;
    if (oldTree.type !== "element") {
      const opts = {
        parentNotElement: true,
        parents: getParentComponentsAndFrags(node, oldTree)
      }
      newNode = render(newTree, opts)
    } else {
      newNode = render(newTree)
    }
    dom.replaceWith(node, newNode)
    triggerMountedLifeCycle(newNode)
    return newNode
  }
  if (oldTree.type === "element" && newTree.type === "element") {
    return diffAndPatchElement(oldTree, newTree, node)
  }
  if (oldTree.type === "Fragment" && newTree.type === "Fragment") {
    ingenimateChildren(oldTree.children, newTree.children, node)
    return node
  }
  if (oldTree.type === "Component" && newTree.type === "Component") {
    return DiffAndPatchComponent(oldTree, newTree, node)
  }
}

export function DiffAndPatchComponent(
  oldComp: any,
  newComp: any,
  node: any
): any {
  if (oldComp.pearlId !== newComp.pearlId) {
    const opts = {
      parentNotElement: true,
      parents: getParentComponentsAndFrags(node, oldComp)
    }

    const newNode = render(newComp, opts)
    dom.replaceWith(node, newNode)
    triggerMountedLifeCycle(newNode, newComp)
    return newNode
  } else {
    diffAndPatch(oldComp.makeChild(), newComp.makeChild(), node)
  }
}

export function diffAndPatchElement(
  oldTree: any ,
  newTree: any ,
  node: any
): any {
  if (oldTree.tag !== newTree.tag) {
    const hosts = []
    let parentIsComp = false
    if (Array.isArray(node.__ORBITON_CONFIG__.__nonElement_parents_hosted)) {
      parentIsComp = true
      for (const item of node.__ORBITON_CONFIG__.__nonElement_parents_hosted) {
        if (item === parent) {
          break
        } else {
          hosts.push(item)
        }
      }
    }
    const opts : RenderOptions = {
      parentNotElement: parentIsComp,
      parents: parentIsComp ? hosts : undefined
    }
    const newNode = render(newTree, opts)
    dom.replaceWith(node, newNode)
    triggerMountedLifeCycle(newNode)
    return newNode;
  }
  PatchElementAttributes(oldTree.attributes, newTree.attributes, node)
  ingenimateChildren(oldTree.children, newTree.children, node)
}

export function PatchElementAttributes(
  OldAttr: any,
  NewAttrs: any ,
  node: any
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
