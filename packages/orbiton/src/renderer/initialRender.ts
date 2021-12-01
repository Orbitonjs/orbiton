/* eslint-disable no-unused-vars */

import { OrbitonElement } from "../types/OrbitonTypes"
import { trigerMountedLifeCycle } from "./lifeCycles"
import { render } from "./render"



/**
* The first time an element is rendered
*/
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export function initialRender(root: HTMLElement, tree: OrbitonElement) {
  const replacedElement = render(tree)
  root.appendChild(replacedElement)
  trigerMountedLifeCycle(root)
}
