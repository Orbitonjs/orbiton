/**
 * Copyright (c) 2021 - present Beignana Jim Junior and other contributors.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { OrbitonElement } from "../../types/index";
import createComponent from "./createComponent";
import createElement from "./createElement";


export default function createJSXElement(tag, props, key = '', __source= '', __self = '') : OrbitonElement {
  if (typeof tag === "string") {
    return createElement(tag, props )
  } else {
    return createComponent(tag, props)
  }
}
