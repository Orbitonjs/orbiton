/**
 * Copyright (c) 2021 - present Beignana Jim Junior and other contributors.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

/* eslint-disable no-unused-vars */

import { OrbitonElement } from "../../types/index"
import { triggerMountedLifeCycle } from "./lifeCycles"
import { render } from "./render"



/**
* The first time an element is rendered
*/
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export function initialRender(root: HTMLElement, tree: OrbitonElement) {
  const replacedElement = render(tree)
  root.appendChild(replacedElement)
  triggerMountedLifeCycle(root)
}
