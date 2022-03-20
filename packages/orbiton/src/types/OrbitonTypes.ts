/**
 * Copyright (c) 2021 - present Beignana Jim Junior and other contributors.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import { LogicalComponent } from "../core/component"
import { Fragment } from "../core/Fragment"
import Component from "../renderer/createComponent"

export type OrbitonConfig =  {
  extendEvents?: Record<string, VoidFunction>,
  ref?: symbol,
  isComponentRoot?: boolean,
  componentHosted?: Array<Component | LogicalComponent>,
  compomentRootId?: symbol | null | string | number,
  renderedByFrag?: boolean
  HostFragID?: symbol
}

export type Attributes = {

}


export type Options = {
  attributes?: Record<string, string | Record<string, string | number>>,
  events?: Record<string, VoidFunction>,
  children?: []
  props?: Props
}

export interface OrbitCallBack extends CallableFunction {
  (this: this, newState: Record<string, unknown>) : unknown
}

export type OrbitonElement = {
  tag: string,
  attributes: Record<string, string | Record<string, string | number>>,
  events?: Record<string, VoidFunction>,
  children?: OrbitonChildren,
  ref?: symbol,
  type: 'element',
  attachedComponent?: LogicalComponent,
  props?: Props
}



export interface OrbitonDOMElement extends HTMLElement {
  __ORBITON_CONFIG__: OrbitonConfig
}
export interface OrbitonSVGElement extends SVGSVGElement {
  __ORBITON_CONFIG__: OrbitonConfig
}
export type Tree = OrbitonElement|Component|Fragment

export type Props = {
  key?: unknown,
  children?: Array<OrbitonElement>
}


export type OrbitonChildren = Array<string|OrbitonElement|Component|Fragment>

