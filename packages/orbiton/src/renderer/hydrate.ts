/* eslint-disable */
/**
 * Copyright (c) 2021 - present Beignana Jim Junior and other contributors.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */
import { RenderOptions } from "../../types/index";
import { Fragment } from "../core/Fragment";
import { appendEvents } from "./Events";
import { triggerMountedLifeCycle } from "./lifeCycles";


export function hydrate(
  element: any,
  node: Node
): void
{
  const childNodes = node.childNodes
  if (element.type === "element") {
    hydrateElement(element , childNodes[0])
  }
  triggerMountedLifeCycle(node)
}

function hydrateElement(
  element: any,
  node: any,
  opts: RenderOptions = {}
) : void
{
  if (element.tag !== node.tagName.toLocaleLowerCase()) {
    throw new Error(`Its seems provided tree does node match with the DOM element.
Expected <${element.tag} ....>...</${element.tag}> but insted got <${node.tagName.toLocaleLowerCase()}>...</${node.tagName.toLocaleLowerCase()}>
    `);

  }
  node.__ORBITON_CONFIG__ = {}

  if (opts.parentNotElement) {
    node.__ORBITON_CONFIG__.__nonElement_parents_hosted = opts.parents
  }
  if (element.attachedComponent) {
    node.__ORBITON_CONFIG__.attachedComponent= element.attachedComponent
  }

  appendEvents(node, element.events)

  if (element.children && element.children.length > 0) {
    let index = -1
    for (const child of element.children) {
      if (Array.isArray(child)) {
        for (const item of child) {
          index = hydrateChild(item, node, {}, index)
        }
      } else {
        index = hydrateChild(child, node, {}, index)
      }
    }
  }

  element.domRef = node
  node.__ORBITON_CONFIG__.__element = element
}


function hydrateChild(element, node, opts,  index= 0) {
  let currentIndex = index
  if (element.type === "Fragment") {
    currentIndex = hydrateFragment(element, node, opts,  currentIndex)
  } else if(element.type === "element") {
    currentIndex++
    hydrateElement(element, node.childNodes[currentIndex], opts)
  }else if (element.type === "Component") {
      currentIndex = hydrateComponet(element, node, opts, currentIndex)
    }
  return currentIndex
}


function hydrateFragment(
  fragment: any,
  node: any,
  options: RenderOptions = {},
  startIndex = -1
): number {
  let currentIndex = startIndex
  let parents = []
  options.parentNotElement = true
  let childOpts = {}
  if (Array.isArray(options.parents)) {
    parents = [...options.parents]
    parents.push(fragment)
  } else {
    parents.push(fragment)
  }

  for (const child of fragment.children) {
    childOpts = {
      ...options,
      parents: parents
    }
    if (child.type === "element") {
      currentIndex++
      hydrateElement(child, node.childNodes[currentIndex], childOpts)
    } else if (child.type === "Fragment") {
      currentIndex = hydrateFragment(child, node, childOpts, currentIndex)
    }else if (child.type === "Component") {
      currentIndex = hydrateComponet(child, node, childOpts, currentIndex)
    }
  }
  return currentIndex
}

function hydrateComponet(
  component: any,
  node: any,
  options: RenderOptions = {},
  startIndex = -1
): number {
  let currentIndex = startIndex
  let parents = []
  options.parentNotElement = true
  let childOpts = {}
  if (Array.isArray(options.parents)) {
    parents = [...options.parents]
    parents.push(component)
  } else {
    parents.push(component)
  }
  let child = component.makeChild()
  childOpts = {
      ...options,
      parents: parents
    }
    if (child.type === "element") {
      currentIndex++
      hydrateElement(child, node.childNodes[currentIndex], childOpts)
    } else if (child.type === "Fragment") {
      currentIndex = hydrateFragment(child, node, childOpts, currentIndex)
    }else if (component.type === "Component") {
      currentIndex = hydrateComponet(child, node, childOpts, currentIndex)
    }
  return currentIndex
}
