/**
 * Copyright (c) 2021 - present Beignana Jim Junior and other contributors.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

/* eslint-disable @typescript-eslint/no-explicit-any */
import { BaseComponent } from "../core/component";
import { evaluateStyleTag, getPropety } from "../renderer/ElementAttributes";
import { triggerMountedLifeCycle } from "../renderer/lifeCycles";
import { render } from "../renderer/render";
import { OrbitonDOMElement, OrbitonElement, Attr } from "../../types/index";


export function diffAndPatch(
  oldTree: OrbitonElement | any,
  newTree: OrbitonElement | any,
  node: OrbitonDOMElement
): OrbitonDOMElement {

  // Incase the new Tree is undefined we just remove the whole DOM element.
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
      node.replaceWith(newNode)
      triggerMountedLifeCycle(newNode)
      return newNode
    } else {
      return node
    }
  }
  // If the tags of the trees are different then the whole tree is replaced
  if (oldTree.tag !== newTree.tag) {
    const newNode = render(newTree)
    node.replaceWith(newNode)
    triggerMountedLifeCycle(newNode)
    return node
  }
  DiffAttr(oldTree.attributes, newTree.attributes, node)
  DiffChildren(oldTree.children, newTree.children, node)
  return node
}



export function DiffAttr(
  OldAttr: Record<string, unknown>,
  NewAttrs: Record<string, string> | Attr ,
  node: OrbitonDOMElement
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

export function DiffChildren(
  OldChildren: any[],
  NewChildren: { [x: string]: any; },
  node: OrbitonDOMElement
): void {
  const nodes = node.childNodes
  let index = 0

  OldChildren.forEach((child: any[], i: string | number)=> {
    const newVChild = NewChildren[i]

    if (Array.isArray(newVChild) || Array.isArray(child) ) {

      if (Array.isArray(newVChild)) {

        if (Array.isArray(child)) {
          // if both the new child and the old child are Arrays
          // we loop through the old child and get the index of each element and its corresponding element if the neww child
          // we also get the DOM child at that index then diff them

          child.forEach((item, ind)=> {
            const nodechild = nodes[index] as OrbitonDOMElement
            const newItem = newVChild[ind]
            checkChildrenAndDiff(item, newItem, nodechild)
            index++
          })
          const additionalChidren = []
          for (const additionalChild of newVChild.slice(child.length)) {
            const DomChild = render(additionalChild)
            additionalChidren.push(DomChild)
          }
          const nextIndex = index
          let nextNode = nodes[nextIndex]

          if (nextNode !== undefined) {
            for (const iterator of additionalChidren) {
              node.insertBefore(iterator, nextNode)
              index++
              nextNode = nodes[nextIndex]
            }
            triggerMountedLifeCycle(node)
          } else {
            node.append(...additionalChidren)
            triggerMountedLifeCycle(node)
          }

        } else {
          const nodechild = nodes[index]
          const nodeArr: Array<Node> = []
          newVChild.forEach((item, ind)=> {
            nodeArr.push(render(item))
            if (ind !== 0) {
              index++
            }
          })
          nodechild.replaceWith(...nodeArr)
          triggerMountedLifeCycle(nodechild)
        }
      }
    } else{
      const nodechild = nodes[index] as OrbitonDOMElement
      checkChildrenAndDiff(child, newVChild, nodechild)
      index++
    }
  })
}

function checkChildrenAndDiff(
  child: OrbitonElement | BaseComponent,
  newVChild: OrbitonElement | BaseComponent,
  nodeChild: OrbitonDOMElement
) {

  if (newVChild !== undefined && child !== undefined) {
    const [oldChild, newChild] = CheckType(child, newVChild)
    diffAndPatch(oldChild, newChild, nodeChild)
  } else {
    if (newVChild !== undefined) {
      const [, newChild] = CheckType(" ", newVChild)
      diffAndPatch(child, newChild, nodeChild)
    } else {
      const [oldChild,] = CheckType(child, "")
      diffAndPatch(oldChild, newVChild, nodeChild)
    }
  }


}

function CheckType(old: any, newC: any) {
  const elementType = 'element'
  const componentType = 'Component'
  let oldChild: string;
  let newChild: string;
  if (old.type === elementType) {
    oldChild = old
  }
  if (old.type === componentType) {
    oldChild = old.makeChild()
  }
  if (newC.type === elementType) {
    newChild = newC
  }
  if (newC.type === componentType) {
    newChild = newC.makeChild()
  }
  if (typeof old === 'string') {
    oldChild = old
  }
  if (typeof newC === 'string') {
    newChild = newC
  }
  return [oldChild, newChild]
}
