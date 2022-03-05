/**
 * Copyright (c) 2021 - present Beignana Jim Junior and other contributors.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

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

export function remove(node: any) {
  if (Array.isArray(node)) {
    for (const childEl of node) {
      remove(childEl)
    }
  } else {
    node.remove()
  }
}

export function nodeValue(node: any): any {
  if (Array.isArray(node)) {
    throw new Error("Cannot extract node value from array");
  } else {
    return node.nodeValue
  }
}


export function replaceWith(node: any, replacingNode: any) {
  if (Array.isArray(node)) {
    const parentNode = node[0].parentNode as ParentNode
    for (const child of parentNode.childNodes) {
      child.remove()
    }
    if (Array.isArray(replacingNode)) {
      parentNode.append(...destructureArrays(replacingNode))
    } else {
      parentNode.append(replacingNode)
    }
  } else {
    if (Array.isArray(replacingNode)) {
      node.replaceWith(...destructureArrays(replacingNode))
    } else {
      node.replaceWith(replacingNode)
    }
  }

}

export function destructureArrays(array: any[] | any): any[] {
  const finalArray = []
  for (let i = 0; i < array.length; i++) {
    const element = array[i];
    if (Array.isArray(element)) {
      const destrItems = destructureArrays(element)
      for (const item of destrItems) {
        finalArray.push(item)
      }
    } else {
      finalArray.push(element)
    }
  }
  return finalArray
}


export function childNodes(node) {
  if (Array.isArray(node)) {
    return node
  }
  return node.childNodes
}
export function parentNode(node) {
  if (Array.isArray(node)) {
    return node[0].parentNode
  }
  return node.parentNode
}

export function allDocumentNodes(): any[] {
  const allNodes = document.querySelectorAll('*')
  const result = []
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  allNodes.forEach((el, _)=> {
    const childNodes = el.childNodes
    result.push(el)
    for (const child of childNodes) {
      if (child instanceof Text) {
        result.push(child)
      }
    }
  })
  return result
}
