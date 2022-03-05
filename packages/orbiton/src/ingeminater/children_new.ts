/**
 * Copyright (c) 2021 - present Beignana Jim Junior and other contributors.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */
import * as dom from "../renderer/DomOperations"
import { render } from "../renderer/render_new";
import { diffAndPatch } from "./reconciler_new";

// Case1: children from element
// Caser: children from fragment

export function getFragHost(fragment: any) : any {
  const allNodes = dom.allDocumentNodes()
  const result = []
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  allNodes.forEach((el, _)=> {
    if (el.__ORBITON_CONFIG__) {
      if (Array.isArray(el.__ORBITON_CONFIG__.__nonElement_parents_hosted)) {
        for (const item of el.__ORBITON_CONFIG__.__nonElement_parents_hosted) {
          if (item === fragment) {
            result.push(el)
            break
          }
        }
      }
    }
  })
  return result
}


export function ingenimateChildren(
  OldChildren: any,
  NewChildren: any,
  node: any
) : void
{
  let index = 0
  const childNodes = dom.childNodes(node)
  let parentNode
  if (childNodes.length > 0) {
    parentNode = childNodes[0].parentNode
  }
  for (let i = 0; i < OldChildren.length; i++) {
    const oldChild = OldChildren[i];
    const newChild = NewChildren[i];
    if (Array.isArray(oldChild) || Array.isArray(newChild)) {
      if (Array.isArray(newChild)) {
        if (Array.isArray(oldChild)) {
          // if both the new child and the old child are Arrays
          // we loop through the old child and get the index of each element and its corresponding element if the new child
          // we also get the DOM child at that index then diff them
          oldChild.forEach((item, ind)=> {
            const newItem = newChild[ind]
            const added = CheckChildrenAndDiff(item, newItem, index, childNodes)
            index = index + added
          })
          const additionalChidren = []
          // if the new child has additional children longer than  the old child then have to append them to the dom too.
          for (const additionalChild of newChild.slice(oldChild.length)) {
            const DomChild = render(additionalChild)
            if (Array.isArray(DomChild)) {
              additionalChidren.push(...dom.destructureArrays(DomChild))
            } else {
              additionalChidren.push(DomChild)
            }
          }
          const nextIndex = index
          let nextNode = childNodes[nextIndex]

          if (nextNode !== undefined) {
            const parentNode = childNodes[0].parentNode
            for (const iterator of additionalChidren) {
              parentNode.insertBefore(iterator, nextNode)
              index++
              nextNode = childNodes[index]
            }
          } else {
            const parentNode = childNodes[0].parentNode
            parentNode.append(...additionalChidren)
          }
        } else {
          const nodechild = childNodes[index]
          const nodeArr: Array<Node> = []
          newChild.forEach((item, ind)=> {
            nodeArr.push(render(item))
            if (ind !== 0) {
              index++
            }
          })
          dom.replaceWith(nodechild, nodeArr)
        }
      }
    } else {
      const added = CheckChildrenAndDiff(oldChild, newChild, index, childNodes, parentNode)
      index = index + added
    }
  }


  const ecessesChildren = []
  for (const childEl of NewChildren.slice(OldChildren.length)) {
    const DomChild = render(childEl)
    ecessesChildren.push(DomChild)
  }
  if (ecessesChildren.length > 0) {
    dom.appendChild(parentNode, ecessesChildren)
  }
}

function CheckChildrenAndDiff(
  oldChild: any,
  newChild : any,
  index: any,
  nodes:any,
  parentNode = null
): number {
  let added = 0
  if (oldChild === undefined) {
    diffAndPatch(oldChild, newChild, nodes, parentNode)
  } else {
    if (oldChild.type === "Fragment") {
      const hosts = getFragHost(oldChild)
      added = added + hosts.length
      diffAndPatch(oldChild, newChild, hosts)
    } else if (oldChild.type === "Component") {
      const hosts = getFragHost(oldChild)
      added = added + hosts.length
      diffAndPatch(oldChild, newChild, hosts)
    }else {
      diffAndPatch(oldChild, newChild, nodes[index])
      added++
    }
  }

  return added
}
