
import { LogicalComponent } from "../core/component"
import Component from "../renderer/createComponent"

export type OrbitonConfig =  {
  extendEvents?: Record<string, VoidFunction>,
  ref?: symbol,
  isComponentRoot?: boolean,
  componentHosted?: Array<Component | LogicalComponent>
  compomentRootId?: symbol | null | string | number
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

/**
    * A Javascript library for building Browser User Interfaces
    * @author Beigana Jim Junior <jimjunior854@outlook.com>
    * @copyright Beigana Jim Junior © 2021
    * @license MIT
    *
    * Learn more at the official Documentation: {@link https://orbiton.js.org}
    */
const Orbiton: {
  withComponent: (tag: string, component: import("core/component").LogicalComponent, options?: import("types/OrbitonTypes").Options) => import("types/OrbitonTypes").OrbitonElement;
    render: (xElement: any) => any;
    createElement: typeof createElement;
    append: typeof append;
  Component: typeof Component;
        createComponent: (Component: any, props?: {}, context?: {}) => any;
        createJSXElement: typeof createJSXElement;
  version: string;
};


export default Orbiton;
