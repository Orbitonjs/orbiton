/**
 * Copyright (c) 2021 - present Beignana Jim Junior and other contributors.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */


import { OrbitonChildren, OrbitonDOMElement, OrbitonSVGElement } from "../../types/index";
import { triggerMountedLifeCycle } from "../renderer/lifeCycles";
import { render } from "../renderer/render";
import { diffAndPatch } from "./reconciler";


export function ingeninateChildren(
  OldChildren: OrbitonChildren,
  NewChildren: OrbitonChildren,
  parentNode: OrbitonDOMElement | OrbitonSVGElement,
) : void
{
  const childNodes = parentNode.childNodes
  let index = 0
  for (let i = 0; i < OldChildren.length; i++) {
    const oldChild = OldChildren[i]
    const NewChild = NewChildren[i]
    if (Array.isArray(oldChild) || Array.isArray(NewChild)) {
      if (Array.isArray(NewChild)) {
        if (Array.isArray(oldChild)) {
          // if both the new child and the old child are Arrays
          // we loop through the old child and get the index of each element and its corresponding element if the neww child
          // we also get the DOM child at that index then diff them
          oldChild.forEach((item, ind)=> {
            const nodechild = childNodes[index] as OrbitonDOMElement
            const newItem = NewChild[ind]
            //diffAndPatch(item, newItem, nodechild)
            CheckChildrenAndDiff(item, newItem, parentNode, nodechild)
            index++
          })
          const additionalChidren = []
          // if the new child has additional children longer than  the old child then have to append them to the dom too.
          for (const additionalChild of NewChild.slice(oldChild.length)) {
            const DomChild = render(additionalChild)
            additionalChidren.push(DomChild)
          }
          const nextIndex = index
          let nextNode = childNodes[nextIndex]

          if (nextNode !== undefined) {
            for (const iterator of additionalChidren) {
              parentNode.insertBefore(iterator, nextNode)
              index++
              nextNode = childNodes[index]
            }
            triggerMountedLifeCycle(parentNode)
          } else {
            parentNode.append(...additionalChidren)
            triggerMountedLifeCycle(parentNode)
          }
        } else {
          const nodechild = childNodes[index]
          const nodeArr: Array<Node> = []
          NewChild.forEach((item, ind)=> {
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
      const nodechild = childNodes[index] as OrbitonDOMElement
      //console.log(childNodes)

      CheckChildrenAndDiff(oldChild, NewChild, parentNode, nodechild)

      index++
    }
  }
  const exessChildren = []

  for (const childEl of NewChildren.slice(OldChildren.length)) {
    const DomChild = render(childEl)
    exessChildren.push(DomChild)
  }
  if (exessChildren.length > 0) {
    parentNode.append(...exessChildren)
  }
}


function CheckChildrenAndDiff(oldChild, NewChild, parentNode, nodechild) {

  if (typeof oldChild !== "string") {
    if (oldChild.type === "Fragment") {
      diffAndPatch(oldChild, NewChild, parentNode)
    } else {
      diffAndPatch(oldChild, NewChild, nodechild)
    }
  } else {
    diffAndPatch(oldChild, NewChild, nodechild)
  }
}


export function ingeninateFragmentChildren(
  OldChildren: OrbitonChildren,
  NewChildren: OrbitonChildren,
  parentNode: OrbitonDOMElement,
) : void
{
  const childNodes = parentNode.childNodes
  let index = 0
  for (let i = 0; i < OldChildren.length; i++) {
    const oldChild = OldChildren[i]
    const NewChild = NewChildren[i]
    if (Array.isArray(oldChild) || Array.isArray(NewChild)) {
      if (Array.isArray(NewChild)) {
        if (Array.isArray(oldChild)) {
          // if both the new child and the old child are Arrays
          // we loop through the old child and get the index of each element and its corresponding element if the neww child
          // we also get the DOM child at that index then diff them
          oldChild.forEach((item, ind)=> {
            const nodechild = childNodes[index] as OrbitonDOMElement
            const newItem = NewChild[ind]
            //diffAndPatch(item, newItem, nodechild)
            CheckChildrenAndDiff(item, newItem, parentNode, nodechild)
            index++
          })
          const additionalChidren = []
          // if the new child has additional children longer than  the old child then have to append them to the dom too.
          for (const additionalChild of NewChild.slice(oldChild.length)) {
            const DomChild = render(additionalChild)
            additionalChidren.push(DomChild)
          }
          const nextIndex = index
          let nextNode = childNodes[nextIndex]

          if (nextNode !== undefined) {
            for (const iterator of additionalChidren) {
              parentNode.insertBefore(iterator, nextNode)
              index++
              nextNode = childNodes[nextIndex]
            }
            triggerMountedLifeCycle(parentNode)
          } else {
            parentNode.append(...additionalChidren)
            triggerMountedLifeCycle(parentNode)
          }
        } else {
          const nodechild = childNodes[index]
          const nodeArr: Array<Node> = []
          NewChild.forEach((item, ind)=> {
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
      const nodechild = childNodes[index] as OrbitonDOMElement

      CheckChildrenAndDiff(oldChild, NewChild, parentNode, nodechild)

      index++
    }
  }
}
