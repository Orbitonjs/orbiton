/**
 * Copyright (c) 2021 - present Beignana Jim Junior and other contributors.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

/* eslint-disable no-unused-vars */

import { OrbitonElement } from "../../types/index"
import { appendChild } from "./DomOperations"
import { triggerMountedLifeCycle } from "./lifeCycles"
import { render } from "./render_new"



/**
* The first time an element is rendered
*/
export function initialRender(root: any, tree: any) {
  const replacedElement = render(tree)
  root.__orbiton__hosted__tree = tree
  root.__ORBITON_CONFIG____isOrbitonRoot = true
  //root.appendChild(replacedElement)
  appendChild(root, replacedElement)
  triggerMountedLifeCycle(root)
}
