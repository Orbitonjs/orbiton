/**
 * Copyright (c) 2021 - present Beignana Jim Junior and other contributors.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import { OrbitonChildren } from "../../types/index";
import { createId } from "./Selectors";


export class Fragment {
  readonly type: "Fragment"
  FragmentID: symbol
  children: OrbitonChildren
  static isFragment = true
  constructor( children: OrbitonChildren ) {
    const key = Math.floor(Math.random() * 100000000)
    this.FragmentID = createId(`Fragment_Type`,`by_fragment_${key}`)
    this.children = children
    this.type = "Fragment"
    this.getPearlId = this.getPearlId.bind(this)
  }
  getPearlId(): symbol {
    return this.FragmentID
  }
}
