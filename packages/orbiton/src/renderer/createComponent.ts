/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable class-methods-use-this */
import { Component as C } from "../core/component";
import { compareTree } from "../core/UpdateTree";
import { createId } from '../core/Selectors';
import { OrbitonDOMElement, OrbitonElement, Props } from "../types/OrbitonTypes";
import { diffAndPatch } from "../diffing/BuildTree";

export function getComponentRoot(id: symbol): OrbitonDOMElement | null {
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



class Component extends C {
  key: any;
  readonly type: 'IS_X_COMPONENT';
  pearlId: symbol;
  currentTree: any;
  static isClassComponent = true
  constructor(props: Props<number> , context = {}) {
    super(props, context)
    this.type = 'IS_X_COMPONENT'
    this.key = props.key || null
    this.pearlId = createId(this.constructor.name, this.key)
    this.makeChild = this.makeChild.bind(this)
    this.Mounted = this.Mounted.bind(this)
    this.WillMount = this.WillMount.bind(this)
    this.getPearlId = this.getPearlId.bind(this)
    this.updateState = this.updateState.bind(this)
    this.changeState = this.changeState.bind(this)
  }

  getPearlId(): symbol {
    return this.pearlId
  }

  Mounted(): void {}

  WillMount(): void { }



  /**
  * Updates a subset of the state in the class
  * @param {any} newState this subset that you want to update
  * @param {?Function} callback this callback function that is called after state updates
  *
  * */
  updateState(newState: Record<string, unknown>, callback: CallableFunction | null = null): void {

    const currentTree = this.currentTree


    let root = getComponentRoot(this.getPearlId())

    if (root === undefined) {
      root = getComponentRoot(this.currentTree.pearlId)
    }
    this.changeState(newState, callback)
    const newItem = this.render()
    const newTree = compareTree(currentTree, newItem)
    const patch = diffAndPatch(this.currentTree, newTree, root)

    root = patch

    this.currentTree = newTree
  }
  makeChild(): any {
    this.currentTree = this.render()
    return this.currentTree
  }
  render() : OrbitonElement {
    return {tag: 'div'} as OrbitonElement
  }

}


export default Component
