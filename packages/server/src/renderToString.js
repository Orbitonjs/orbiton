/**
 * Copyright (c) 2021 - present Beignana Jim Junior and other contributors.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import { evaluateAttributes } from "./attributes"
export function renderToString(node) {
  if (Array.isArray(node)) {
    // This might happen when you call the render function on `props.children`
    const children = []
    for (const child of node) {
      children.push(renderToString(child))
    }
    return children
  }
  if (typeof node === "string" || typeof node === "boolean" || typeof node === "number") {
    return `${node}`
  }
  if (node.type === "element") {
    return getReturnString(renderElement(node))
  }
  if (node.type === "Component") {
    return getReturnString(renderComponent(node))
  }
  if (node.type === "Fragment") {
    return getReturnString(renderFragment(node))
  }
}



function createElement(element) {
  const attrs = evaluateAttributes(element.attributes)
  const opennigElement = '<' + element.tag + attrs + '>'
  const closingElement = '</' + element.tag + '>'
  return {
    opennigElement,
    closingElement,
    children: []
  }
}


export function renderElement(element) {
  const HTMLElementObj = createElement(element)
  if (element.children && element.children.length > 0) {
    for (const child of element.children) {

      if (Array.isArray(child)) {
        // This is documented at https://orbiton.js.org/docs/learn/list-rendering
        // This is usually possible when one maps through an array forexample:
        // render() {
        //   return (
        //     <div>
        //       {this.state.array.map(...)}
        //     </div>
        //   )
        // }
        for (const item of child) {
          if (!(item.key)) {
            console.warn(`Consider providing a ${"`key`"} for \`${item}\`. Rendering and array or maped array without providing a key for the elements might cause vulnerabilities. Visit https://orbiton.js.org/docs/learn/list-rendering for more information `)
          }
          const childNode = renderToString(item)
          HTMLElementObj.children.push(childNode)
        }
      } else {
        const childNode = renderToString(child)
        HTMLElementObj.children.push(childNode)
      }
    }
  }
  return createHTMLString(HTMLElementObj)
}

function createHTMLString(element) {
  let HtmlStr = ""
  HtmlStr = HtmlStr + element.opennigElement
  for (const child of element.children) {
    HtmlStr = HtmlStr + child
  }
  HtmlStr = HtmlStr + element.closingElement
  return HtmlStr
}


export function renderFragment(fragment) {
  const children = []
  if (fragment.children.length === 0) {
    throw new Error("A fragment Always return have a child element.");
  }
  for (const child of fragment.children) {
    const childNode = renderToString(child)
    if (Array.isArray(childNode)) {
      children.push(...childNode)
    } else {
      children.push(childNode)
    }
  }
  return children
}


export function renderComponent(
  component,
) {
  const element = component.makeChild()
  const childNode = renderToString(element)
  if (Array.isArray(childNode)) {
    return [...childNode]
  } else {
    return [childNode]
  }

}

function getReturnString(value) {
  let HtmlStr = ""
  if (Array.isArray(value)) {
    for (const child of value) {
      HtmlStr = HtmlStr + child
    }
    return HtmlStr
  }
  return value
}
