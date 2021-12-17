
import { LogicalComponent } from "../core/component"
import Component from "../renderer/createComponent"

export type OrbitonConfig =  {
  extendEvents?: Record<string, VoidFunction>,
  ref?: symbol,
  isComponentRoot?: boolean,
  componentHosted?: Array<Component>
  compomentRootId?: symbol | null | string | number
}

export type Attributes = {

}

export type Options = {
  attributes?: Record<string, string | Record<string, string | number>>,
  events?: Record<string, VoidFunction>,
  children?: []
}

export interface OrbitCallBack extends CallableFunction {
  (this: this, newState: Record<string, unknown>) : unknown
}

export type OrbitonElement = {
  tag: string,
  attributes: Record<string, string | Record<string, string | number>>,
  events?: Record<string, VoidFunction>,
  children?: Array<string|OrbitonElement|Component>,
  ref?: symbol,
  type: 'element' | 'IS_X_COMPONENT' | 'Fragment',
  attachedComponent?: LogicalComponent,
  props?: Props
}



export interface OrbitonDOMElement extends HTMLElement {
  _orbiton$config: OrbitonConfig
}
export interface OrbitonSVGElement extends SVGSVGElement {
  _orbiton$config: OrbitonConfig
}
export type Tree = OrbitonElement | Component

export type Props = {
  key?: unknown,
  children?: Array<OrbitonElement>
}
