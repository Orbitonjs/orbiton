/**
 * Copyright (c) 2021 - present Beignana Jim Junior and other contributors.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import { evaluateAttributes } from "./ElementAttributes";

export function render(
  node: any,
  options: any = {ns: "http://www.w3.org/1999/xhtml"},
  ns = "http://www.w3.org/1999/xhtml"
): any {
  if (Array.isArray(node)) {
    // This might happen when you call the render function on `props.children`
    const children = []
    for (const child of node) {
      children.push(render(child, options, ns))
    }
    return children
  }
  if (typeof node === "string"|| typeof node === "boolean" || typeof node === "number") {
    return renderText(`${node}`, options)
  }
  if (node.type === "element") {
    return renderElement(node, options,ns)
  }
  if (node.type === "Component") {
    return renderComponent(node, options)
  }
  if (node.type === "Fragment") {
    return renderFragment(node, options)
  }

}

function renderElement(
  element: any,
  options: any = {ns: "http://www.w3.org/1999/xhtml"},
  ns = "http://www.w3.org/1999/xhtml"
) : any {
  let node;

  let childns
  if (element.tag === "svg") {
    node = document.createElementNS("http://www.w3.org/2000/svg", "svg")
    childns = "http://www.w3.org/2000/svg"
  } else if (ns !== "http://www.w3.org/1999/xhtml") {
    node = document.createElementNS(ns, element.tag)
    childns = ns
  }else {
    node = document.createElement(element.tag)
    childns= "http://www.w3.org/1999/xhtml"
  }
  node.__ORBITON_CONFIG__ = {}
  if (options.parentNotElement) {
    node.__ORBITON_CONFIG__.__nonElement_parents_hosted = options.parents
  }
  if (element.attachedComponent) {
    node.__ORBITON_CONFIG__.attachedComponent= element.attachedComponent
  }
  evaluateAttributes(node, element.attributes)
  appendEvents(node, element.events)

  if (element.children && element.children.length > 0) {
    const childOptions = {
      ns: element.tag === "svg" ? "http://www.w3.org/2000/svg" : options.ns
    }
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
          const childNode = render(item, childOptions, childns)
          appendChild(node, childNode)
        }
      } else {
        const childNode = render(child, childOptions, childns)
        appendChild(node, childNode)
      }
    }
  }
  element.domRef = node
  node.__ORBITON_CONFIG__.__element = element
  return node
}

function renderText(string: any, options: any) {
  const node = document.createTextNode(string) as any
  node.__ORBITON_CONFIG__ = {}
  if (options.parentNotElement) {
    node.__ORBITON_CONFIG__.__nonElement_parents_hosted = options.parents
  }
  return node
}

function renderComponent(
  component: any,
  options: any
): any {
  const element = component.makeChild()
  options.parentNotElement = true
  if (options.parents && Array.isArray(options.parents)) {
    ////
  } else {
    options.parents = []
  }
  /// We use array destructuring to prevent the runtime from creating the parents variable by reference to `options.parents`
  /// If it is referenced, each time a component in pushed to the varents variable, it will also be pushed to the initial options.parents making each element in the tree have the same array of parents.
  const parents = [...options.parents]
  parents.push(component)
  const childOpts =  {
    ...options,
    parents: parents
  }
  const childNode = render(element, childOpts)
  if (Array.isArray(childNode)) {
    return [...childNode]
  } else {
    return [childNode]
  }

}

function renderFragment(fragment: any, options: any) {
  const children = []
  options.parentNotElement = true
  if (Array.isArray(options.parents)) {
    ///
  }else {
    options.parents = []
  }
  if (fragment.children.length === 0) {
    throw new Error("A fragment Always return have a child element.");
  }
  for (const child of fragment.children) {
    const parents = [...options.parents]
    parents.push(fragment)
    const childOpts = {
      ...options,
      parents: parents
    }
    const childNode = render(child, childOpts)
    if (Array.isArray(childNode)) {
      children.push(...childNode)
    } else {
      children.push(childNode)
    }
  }
  return children
}

function appendEvents(
  node: any,
  events: any
): void {
  node.__ORBITON_CONFIG__.extendEvents = events
  for (const [k, v] of Object.entries(events)) {
    node.addEventListener(k, v)
  }
}

export function appendChild(
  node: any,
  child: any
): void {


  if (Array.isArray(child)) {
    for (const childEl of child) {
      appendChild(node, childEl)
    }
  } else {
    node.appendChild(child)
  }
}
