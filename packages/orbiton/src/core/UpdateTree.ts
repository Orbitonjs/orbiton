/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { OrbitonElement } from "../types/OrbitonTypes";



export function compareState(oldComponent: { type?: string; state?: any }, newComponent: any) {
  const finalComponent = newComponent
  finalComponent.state = oldComponent.state
  return finalComponent
}


export function EvaluateChildren(oldChildren: any[], newChildren: string | any[]) {
  const children = []
  const elementType = 'element'
  const componentType = 'IS_X_COMPONENT'


  oldChildren.forEach((oldChild: { type: string; }, i: number) => {
    const newChild = newChildren[i]
    if (oldChild.type === newChild.type) {
      if (oldChild.type === elementType && newChild.type === elementType) {
        children.push(newChild)
      } else if (oldChild.type === componentType && newChild.type === componentType) {
        children.push(compareState(oldChild, newChild))
      } else if (typeof newChild === "string") {
        children.push(newChild)
      }
    }
  });

  for (const additionalChild of newChildren.slice(oldChildren.length)) {
    children.push(additionalChild)
  }

  return children
}




// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export function compareTree(oldDomTree: OrbitonElement, newDomTree: OrbitonElement) {

  const result: any = newDomTree
  if (newDomTree === undefined) {
    return;
  }

  if (typeof oldDomTree === 'string' ||
    typeof newDomTree === 'string') {
    if (oldDomTree !== newDomTree) {
      return newDomTree
    } else {
      return newDomTree;
    }
  }

  if (oldDomTree.tag !== newDomTree.tag) {
    // we assume that they are totally different and
    // will not attempt to find the differences.
    return newDomTree;
  }

  const newChildren = EvaluateChildren(oldDomTree.children, newDomTree.children)

  result.children = newChildren

  return result

}
