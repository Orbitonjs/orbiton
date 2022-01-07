import { LogicalComponent } from "./component";
import type { OrbitonElement, Options } from "../types/OrbitonTypes";
import createComponent from "./createComponent";




/**
* Creates a new Element
*/
function createElement(tag: string, options?: Options) :OrbitonElement {
  const { attributes ={}, events={}, children=[] } = options
  return {
    tag,
    attributes,
    events,
    children,
    type: 'element'
  }
}


export const withComponent = (tag: string, component: LogicalComponent, options?: Options): OrbitonElement => {
  const { attributes ={}, events={}, children=[], props={} } = options
  return {
    tag,
    attributes,
    events,
    children,
    type: 'element',
    attachedComponent: createComponent(component, props),
    props: props
  }
}


export default createElement
