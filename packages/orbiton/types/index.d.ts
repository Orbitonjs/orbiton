/**
 * Copyright (c) 2021 - present Beignana Jim Junior and other contributors.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */
/* eslint-disable @typescript-eslint/no-explicit-any */

/**
* Base Orbiton class that adds support for updating a subset of state
*/
export class BaseComponent {
  state: any
  props: Props
  context: Record<string, unknown>
  constructor(props?: ProcessEnvOptions, context?: Record<string, unknown>)

  /**
 * Updates a subset of the state in the class
 * @param {object} newState this subset that you want to update
 * @param {?Function} callBack this callback function that is called after state updates
 */

  changeState(
    newState: Record<string, unknown>,
    callBack: VoidFunction | null = null
  ): void

}


/**
* Helper component for creating a class Based component in Orbiton JS. It works in the Browser and provides the `updateState` method that updates the UI when state is updated.
* @extends BaseComponent
*/
export class Component extends BaseComponent {
  key: any;
  readonly type: 'Component';
  pearlId: symbol;
  currentTree: any;
  static isClassComponent = true
  constructor(props?: Props, context?:Record<string, unknown>)

  Mounted(): void

  WillMount(): void

  makeChild(): any
  getPearlId(): symbol

  /**
  * Updates a subset of the state in the class and triggers an update in the UI
  * @param {any} newState this subset that you want to update
  * @param {?Function} callback this callback function that is called after state updates
  *
  * */
  updateState(
    newState: Record<string, unknown>,
    callback: VoidFunction | null = null
  ): void

  render() : OrbitonElement

}

export class LogicalComponent extends BaseComponent {
  key: unknown;
  readonly type: 'Component';
  pearlId: symbol;
  static isClassComponent = true
  constructor(props?: Props, context?:Record<string, unknown>)

  Mounted(): void

  WillMount(): void

  /**
  * Updates a subset of the state in the class
  * @param {any} newState this subset that you want to update
  * @param {?Function} callback this callback function that is called after state updates
  *
  * */
  updateState(
    newState: Record<string, unknown>,
    callback: VoidFunction | null = null
  ): void

}

class Fragment {
  readonly type: "Fragment"
  FragmentID: symbol
  children: OrbitonChildren
  constructor( children: OrbitonChildren )
  getPearlId(): symbol
}

export type OrbitonConfig =  {
  extendEvents?: Record<string, VoidFunction>,
  ref?: symbol,
  isComponentRoot?: boolean,
  componentHosted?: Array<Component | LogicalComponent| Fragment>,
  compomentRootId?: symbol | null | string | number,
  renderedByFrag?: boolean
  HostFragID?: symbol
}

export type RenderOptions = {
  ns?: string,
  parents?: any[],
  parentNotElement?: boolean
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
  attributes: Record<string, string> | Attr,
  events?: Record<string, VoidFunction>,
  children?: OrbitonChildren,
  ref?: symbol,
  domRef?: OrbitonDOMElement | OrbitonSVGElement
  type: 'element',
  attachedComponent?: LogicalComponent | Component,
  props?: Props
}
export type Attr = {
  style?: Record<string, string | number>
}

export type OrbitonChildren = Array<string|OrbitonElement|Component|Fragment>


export interface OrbitonDOMElement extends HTMLElement {
  __ORBITON_CONFIG__: OrbitonConfig
}
export interface OrbitonTextNode extends Text {
  __ORBITON_CONFIG__: OrbitonConfig
}

export interface OrbitonSVGElement extends SVGSVGElement {
  __ORBITON_CONFIG__: OrbitonConfig
}
export type Tree = OrbitonElement | Component

export type Props = any

export type UnsuccesFullAppendError = {
  error: Error,
  result: boolean
}


/**
* The `createComponent` function is used to create a new Orbiton Component that can be appended to an Orbiton Tree of elements. This function returns an instance of the [`Component`](https://orbiton.js.org/docs/api#Component) class. It can also return an Orbiton Element if the input was a functional component or a variable Component.
* @param {any} Component - This is a class or functional component or even just a variable representing an orbiton element.
* @param {Props} props - An object of data that is appended to the component. This object also includes the children of the element.
* @return {Tree}
*/
const createComponent : (Component: any , props?: Props, context?: Props) => Tree

/**
 * The `withComponent` function is used to create elements with Logical Components attached to them.
*/
const withComponent : (
  tag: string,
  component: LogicalComponent,
  options?: Options
) => OrbitonElement

/**
 * The `render` function can be used to turn an Orbiton Element into a DOM element. Or an Array of DOM alamants if a fragment was passed in.
 *
 * Note: If you use the render function you must use the `appendChild` function provided by orbiton to apppend the child to the DOM.
 */
function render(
  node: string|Fragment|OrbitonElement|Component,
  options?: RenderOptions,
  ns = "http://www.w3.org/1999/xhtml"
): any| any[]


/**
* This function is used to append a given orbiton tree or element to the DOM.
* @summary appends a Tree to the DOM
* @param {any} Tree - This is an orbiton element of a tree of orbiton elements that you created. Remember that the first element must be an Orbiton Element not a component.
* @param {HTMLElement} root - The element in the DOM that you want to act as the root of your app.
* @param {CallableFunction?} callback - A callbackfunction that you want to run immediately after the Tree is appended to the DOM.
*/
function append(
  Tree: any,
  root: HTMLElement,
  callback?: CallableFunction
): void

/**
 * This function hydrates HTML markup and appends events to the HTML as long as the markup provided corresponds to the Orbiton Element or tree provided or was created by it. It is usually used in Severside rendered Apps or Staticaly generated Apps.
 * @param {any} element - The vitual node that is created by orbiton. It can be an Element of component or fragment.
 * @param {Node} node - The root node the acts as the parent of the Orbiton App. It is the same as Root in the [`append`](https://orbiton.js.org/docs/api-reference#append) function
*/
function hydrate(
  element: any,
  node: Node
): void

/**
* This function is used to create a normal Orbiton element that represents a DOM element. It returns an object of type `OrbitonElement`. This object is also known as a Orbiton Element. Visit the documentation on [Orbiton Element](https://orbiton.js.org/docs/the_orbiton_element) to know more on How an orbiton Element looks like.
* @summary Creates A new Element
* @param {string} tag - This is the tagname of the element forexample `div`, `input` etc
* @param {Options} options - The options param is an objects that includes entries of `attributes`, `events` and `children`. Both attributes and events are objects of strinds and functions respectively. Children is an array of orbiton elements.
* @return {OrbitonElement}
*/
function createElement(tag: string, options?: Options) :OrbitonElement

const version : string




/**
* A Javascript library for building Browser User Interfaces
* @author Beigana Jim Junior <jimjunior854@outlook.com>
* @copyright Beigana Jim Junior © 2021
* @license MIT
*
* Learn more at the official Documentation: {@link https://orbiton.js.org}
*/
const Orbiton = {
  withComponent,
  render,
  createElement,
  append,
  hydrate,
  createComponent,
  Component,
  Fragment,
  BaseComponent,
  LogicalComponent,
  version,
}
export default Orbiton
