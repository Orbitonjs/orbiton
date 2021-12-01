import { OrbitonElement } from "../types/OrbitonTypes"
import { initialRender } from "./initialRender"

/**
* appends a Tree to the DOM
*/
function append(Tree: OrbitonElement, root: HTMLElement, callback?: CallableFunction): void {
  initialRender(root, Tree)
  if (callback) {
    callback()
  }
}

export default append
