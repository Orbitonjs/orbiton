/**
 * Copyright (c) 2021 - present Beignana Jim Junior and other contributors.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Fragment } from "../core/Fragment";
import { COMPONENT_TYPE, ELEMENT_TYPE } from "../core/shared";
import Component from "../renderer/createComponent";
import { OrbitonChildren, OrbitonElement } from "../../types/index";



export function compareState(oldComponent: Component, newComponent: Component) {
  const finalComponent = newComponent
  finalComponent.state = oldComponent.state
  return finalComponent
}




export function PatchTrees(currentTree:  OrbitonElement | Component | Fragment, newTree: OrbitonElement | Component | Fragment):  OrbitonElement | Component | Fragment {
  // Diffing Instances
  // - Element and Element
  // - Component and Element
  // - Component and Component
  // - Fragment and Component
  // - Fragment and Element
  // - Fragment and Fragment
  // - attached Components
  if (currentTree.type === ELEMENT_TYPE && newTree.type === ELEMENT_TYPE) {
    return CompareAndPatchElement(currentTree, newTree)
  } else if (currentTree.type === COMPONENT_TYPE && newTree.type === ELEMENT_TYPE) {
    return newTree
  } else if (currentTree.type === ELEMENT_TYPE && newTree.type === COMPONENT_TYPE) {
    return newTree
  } else if (currentTree.type === COMPONENT_TYPE && newTree.type === COMPONENT_TYPE) {
    return compareState(currentTree, newTree)
  } else  {
    return newTree
  }
}

export function PatchChildrenTrees(currentTree: string | OrbitonElement | Component | Fragment, newTree: string | OrbitonElement | Component | Fragment): string | OrbitonElement | Component | Fragment {
  // Diffing Instances
  // - Element and Element
  // - Component and Element
  // - Component and Component
  // - Fragment and Component
  // - Fragment and Element
  // - Fragment and Fragment
  // - attached Components
  if (typeof currentTree === "string" || typeof newTree === "string") {
    return newTree
  } else if (currentTree.type === ELEMENT_TYPE && newTree.type === ELEMENT_TYPE) {
    return CompareAndPatchElement(currentTree, newTree)
  } else if (currentTree.type === COMPONENT_TYPE && newTree.type === ELEMENT_TYPE) {
    return newTree
  } else if (currentTree.type === ELEMENT_TYPE && newTree.type === COMPONENT_TYPE) {
    return newTree
  } else if (currentTree.type === COMPONENT_TYPE && newTree.type === COMPONENT_TYPE) {
    return compareState(currentTree, newTree)
  } else  {
    return newTree
  }
}

function CompareAndPatchElement(oldElement: OrbitonElement, newElement: OrbitonElement) {
  const resultElement = newElement
  if (oldElement.attachedComponent !== newElement.attachedComponent) {
    return newElement
  }
  if (oldElement.tag !== newElement.tag ) {
    return newElement
  }
  resultElement.children = CompareAndPatchChildren(oldElement.children, newElement.children)
  return resultElement
}


function CompareAndPatchChildren(oldChildren: OrbitonChildren, newChildren: OrbitonChildren): OrbitonChildren {
  const children = []

  oldChildren.forEach((oldChild: OrbitonElement | string, i: number) => {
    const newChild = newChildren[i]
    children.push(PatchChildrenTrees(oldChild, newChild))
  });

  for (const additionalChild of newChildren.slice(oldChildren.length)) {
    children.push(additionalChild)
  }

  return children
}

