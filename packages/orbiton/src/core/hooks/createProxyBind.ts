/**
 * Copyright (c) 2021 - present Beignana Jim Junior and other contributors.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import { diffAndPatch } from "../../ingeminater/reconciler_new";


export function createProxyBinder(target: any ): typeof Proxy {
  const proxyObj = new Proxy(target, {
    set: setProxy
  });
  return proxyObj
}

export function setProxy(target: any, property: string | symbol, value: any): boolean {
  target[property] = value
  const allNodes = document.querySelectorAll('*') as NodeListOf<any>
  let rootNode;
  for (const element of allNodes) {
    if (element.___ORBITON_CONFIG____isOrbitonRoot) {
      rootNode = element
      break
    }
  }
  if (rootNode) {
    const oldTree = rootNode.__orbiton__hosted__tree
    target[property] = value
    const newTree = rootNode.__orbiton__hosted__tree
    if (oldTree.type === "element") {
      diffAndPatch(oldTree, newTree, rootNode.children[0])
    } else {
      diffAndPatch(oldTree, newTree, rootNode.children)
    }
  } else {
    target[property] = value
  }
  return true
}
