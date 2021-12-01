import Component from "../renderer/createComponent"

export type OrbitonConfig =  {
  extendEvents?: HTMLElementEventMap,
  ref?: symbol,
  isComponentRoot?: boolean,
  componentHosted?: Array<Component>
  compomentRootId?: symbol | null | string | number
}

export type Attributes = {

}

export type Options = {
  attributes?: Record<string, string | Record<string, string | number>>,
  events?: HTMLElementEventMap,
  children?: []
}

export interface OrbitCallBack extends CallableFunction {
  (this: this, newState: Record<string, unknown>) : unknown
}

export type OrbitonElement = {
  tag: keyof HTMLElementTagNameMap,
  attributes: Record<string, string | Record<string, string | number>>,
  events?: HTMLElementEventMap,
  children?: Array<string|OrbitonElement|Component>,
  ref?: symbol,
  type: 'element' | 'IS_X_COMPONENT' | 'Fragment'
}



export interface OrbitonDOMElement extends HTMLElement {
  _orbiton$config: OrbitonConfig
}

export type Tree = OrbitonElement | Component

export type Props<KeyType> = {
  key?: KeyType,
  children?: Array<OrbitonElement>
}
