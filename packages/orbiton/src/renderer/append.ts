/**
 * Copyright (c) 2021 - present Beignana Jim Junior and other contributors.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import { OrbitonElement } from "../../types/index"
import { initialRender } from "./initialRender"

type UnsuccesFullAppendError = {
  error: Error,
  result: boolean
}

/**
* appends a Tree to the DOM
*/
function append(Tree: OrbitonElement, root: HTMLElement, callback?: CallableFunction): boolean | UnsuccesFullAppendError {
  try {
    initialRender(root, Tree)
    if (callback) {
      callback()
    }
    return true
  } catch (error) {
    return {
      result: false,
      error,
    }
  }

}

export default append
