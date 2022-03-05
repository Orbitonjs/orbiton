/**
 * Copyright (c) 2021 - present Beignana Jim Junior and other contributors.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */


import { getFragHost } from "./children_new"
import { PatchTrees } from "./compareOrbitonTree"
import { diffAndPatch } from "./reconciler_new"



export function ComponentRoot(id: symbol): any {
  let nodes: any | null = null
  const allNodes = document.querySelectorAll('*') as any
  allNodes.forEach((e) => {
    if (e.__ORBITON_CONFIG__) {
      if (e.__ORBITON_CONFIG__.compomentRootId === id) {
        nodes = e
      }
    }

  })

  return nodes
}

export function updateUITree(
  currentTree: any,
  workingProgressTree: any,
  ComponentRoot: any,
) : any {
  const newTree = PatchTrees(currentTree, workingProgressTree)
  const rootArr  = getFragHost(ComponentRoot)
  let root
  if (rootArr.length === 1) {
    root = rootArr[0]
  } else {
    root = rootArr
  }

  diffAndPatch(currentTree, workingProgressTree, root)

  return newTree
}


export function getComponentRoots(
  id: symbol,
  childTree: any
): any
{
  if (childTree.type === "element") {
    return ComponentRoot(id)
  } else if (childTree.type === "Component") {
    return getComponentRoots(childTree.pearlId, childTree.currentTree)
  } else if (childTree.type === "Fragment") {
    return getFragmentRoots(childTree.FragmentID)
  }
}


export function getFragmentRoots(
  id: symbol,
): any
{
  let FragmentParent: ParentNode

  const allNodes = document.querySelectorAll('*') as any
  for (const node of allNodes) {
    if (node.__ORBITON_CONFIG__ && node.__ORBITON_CONFIG__.renderedByFrag ) {
      if (node.__ORBITON_CONFIG__.HostFragID === id) {
        FragmentParent = node.parentNode
        break
      }
    }
  }

  return Array.from(FragmentParent.childNodes) as any
}
