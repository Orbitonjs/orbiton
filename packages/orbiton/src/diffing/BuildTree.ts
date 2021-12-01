/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component } from "../core/component";
import { evaluateStyleTag, getPropety } from "../renderer/ElementAttributes";
import { trigerMountedLifeCycle } from "../renderer/lifeCycles";
import { render } from "../renderer/render";
import { OrbitonDOMElement, OrbitonElement } from "../types/OrbitonTypes";


export function diffAndPatch(oldTree: OrbitonElement | any, newTree: OrbitonElement | any, node: OrbitonDOMElement ): OrbitonDOMElement {

  if (newTree === undefined) {
    node.remove()
    return node
  }

  if (typeof oldTree === "string" || typeof newTree === "string") {

    if (node.nodeValue !== newTree) {
      const newNode = render(newTree)
      node.replaceWith(newNode)
      trigerMountedLifeCycle(newNode)
      return newNode
    } else {
      return node
    }
  }
  if (oldTree.tag !== newTree.tag) {
    const newNode = render(newTree)
    node.replaceWith(newNode)
    trigerMountedLifeCycle(newNode)
    return node
  }
  DiffAttr(oldTree.attributes, newTree.attributes, node)
  DiffChildren(oldTree.children, newTree.children, node)
  return node
}




export function DiffAttr(OldAttr: Record<string, unknown>, NewAttrs: { [s: string]: string; } | ArrayLike<string>, node: OrbitonDOMElement ): void {
  for (const [attr, value] of Object.entries(NewAttrs)) {
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

export function DiffChildren(OldChildren: any[], NewChildren: { [x: string]: any; }, node: OrbitonDOMElement): void {
  const nodes = node.childNodes
  let index = 0

  OldChildren.forEach((child: any[], i: string | number)=> {
    const newVChild = NewChildren[i]

    if (Array.isArray(newVChild) || Array.isArray(child) ) {

      if (Array.isArray(newVChild)) {

        if (Array.isArray(child)) {

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
            trigerMountedLifeCycle(node)
          } else {
            node.append(...additionalChidren)
            trigerMountedLifeCycle(node)
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
          trigerMountedLifeCycle(nodechild)
        }
      }
    } else{
      const nodechild = nodes[index] as OrbitonDOMElement
      checkChildrenAndDiff(child, newVChild, nodechild)
      index++
    }
  })
}

function checkChildrenAndDiff(child: OrbitonElement | Component, newVChild: OrbitonElement | Component, nodeChild: OrbitonDOMElement) {

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
  const componentType = 'IS_X_COMPONENT'
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
