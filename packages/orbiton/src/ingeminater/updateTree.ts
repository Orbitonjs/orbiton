/**
 * Copyright (c) 2021 - present Beignana Jim Junior and other contributors.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */


import { PatchTrees } from "./compareOrbitonTree"
import { OrbitonDOMElement, OrbitonElement } from "../../types/index"
import { diffAndPatch } from "./reconciler"
import Component from "../renderer/createComponent"
import { Fragment } from "../core/Fragment"
import { OrbitonTextNode } from "../../types/index"




export function ComponentRoot(id: symbol): OrbitonDOMElement | null {
  let nodes: OrbitonDOMElement | null = null
  const allNodes = document.querySelectorAll('*') as NodeListOf<OrbitonDOMElement>
  allNodes.forEach((e) => {
    if (e._orbiton$config) {
      if (e._orbiton$config.compomentRootId === id) {
        nodes = e
      }
    }

  })

  return nodes
}

export function updateUITree(
  currentTree: OrbitonElement | Component | Fragment,
  workingProgressTree: OrbitonElement | Component | Fragment,
  ComponentRoot: OrbitonDOMElement[],
) : OrbitonElement | Component | Fragment {
  const newTree = PatchTrees(currentTree, workingProgressTree)


  const patch = diffAndPatch(currentTree, newTree, ComponentRoot)


  return newTree;
}


export function getComponentRoots(
  id: symbol,
  childTree: OrbitonElement | Component | Fragment
): OrbitonDOMElement | OrbitonTextNode | Array<OrbitonDOMElement>
{
  if (childTree.type === "element") {
    return ComponentRoot(id)
  } else if (childTree.type === "Component") {
    return getComponentRoots(childTree.pearlId, childTree.currentTree)
  } else if (childTree.type === "Fragment") {
    console.log(childTree.type)
    return getFragmentRoots(childTree.FragmentID)
  }
}


export function getFragmentRoots(
  id: symbol,
): Array<OrbitonDOMElement>
{
  let FragmentParent: ParentNode

  const allNodes = document.querySelectorAll('*') as NodeListOf<OrbitonDOMElement>
  for (const node of allNodes) {
    if (node._orbiton$config && node._orbiton$config.renderedByFrag ) {
      if (node._orbiton$config.HostFragID === id) {
        FragmentParent = node.parentNode
        break
      }
    }
  }

  return Array.from(FragmentParent.childNodes) as Array<OrbitonDOMElement>
}
