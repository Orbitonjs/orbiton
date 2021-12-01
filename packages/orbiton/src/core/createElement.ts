import type { OrbitonElement, Options } from "../types/OrbitonTypes";




/**
* Creates a new Element
*/
function createElement(tag: keyof HTMLElementTagNameMap, options?: Options) :OrbitonElement {
  const { attributes, events, children } = options
  return {
    tag,
    attributes,
    events,
    children,
    type: 'element'
  }
}




export default createElement
