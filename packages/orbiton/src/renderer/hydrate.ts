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


export function createSSRApp(
  element: any,
  node: Node
): void
{
  const childNodes = node.childNodes
  if (element.type === "element") {
    hydrateElement(element , childNodes[0])
  }
}

function hydrateElement(
  element: any,
  node: any,
  opts: RenderOptions = {}
) : void
{
  node.__ORBITON_CONFIG__ = {}

  if (opts.parentNotElement) {
    node.__ORBITON_CONFIG__.__nonElement_parents_hosted = opts.parents
  }
  if (element.attachedComponent) {
    node.__ORBITON_CONFIG__.attachedComponent= element.attachedComponent
  }

  appendEvents(node, element.events)

  if (element.children && element.children.length > 0) {
    for (const child of element.children) {

    }
  }

  element.domRef = node
  node.__ORBITON_CONFIG__.__element = element
}


function hydrateChild(element, node, opts,  index= 0) {
  let currentIndex = index
  if (element.type === "Fragment") {
    currentIndex = hydrateFragment(element, node, opts,  currentIndex)

  }
  return currentIndex
}


function hydrateFragment(
  fragment: any,
  node: any,
  options: RenderOptions = {},
  startIndex = -1
): number {
  let currentIndex = startIndex + 1

  for (const child of fragment.children) {

    const parents = [...options.parents]
    parents.push(fragment)
    const childOpts = {
      ...options,
      parents: parents
    }
    if (child.type === "element") {
      hydrateElement(child, node.childNodes[currentIndex], childOpts)
    } else if (child.type === "Fragment") {
      currentIndex = hydrateFragment(child, node, childOpts, currentIndex)
    }
  }
  return currentIndex
}

