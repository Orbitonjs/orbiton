/**
 * Copyright (c) 2021 - present Beignana Jim Junior and other contributors.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import { Component, OrbitonDOMElement, OrbitonElement } from "../../types/index";
import { Fragment } from "../core/Fragment";
import { render } from "../renderer/render";


type OrbitonNode = OrbitonElement | Component | Fragment | string

function ingeminate(
  oldNode: OrbitonNode,
  newNode: OrbitonNode,
  oldDom: OrbitonDOMElement| OrbitonDOMElement[],
): void
{
  let parentNode: ParentNode
  if (Array.isArray(oldDom)) {
    parentNode = oldDom[0].parentNode
  } else {
    parentNode = oldDom.parentNode


    if (typeof oldNode === "string" || typeof newNode === "string") {
      if (oldDom.nodeValue !== newNode) {
        oldDom.replaceWith(render(newNode))
      }
    }
  }
}


