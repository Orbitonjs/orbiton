/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */


import { Options, Props, Tree } from "types/OrbitonTypes"
import createElement from "./createElement"

/**
* Creates a new Component
*/
const createComponent = (Component: any , props: Props = {}, context: Props = {}): Tree => {

  if (typeof Component === "function") {
    if (Component.isClassComponent) {
      const c = new Component(props, context)
      return c
    }
    // Returns if the component was a Fuctional Component
    return Component(props)
  }
  if (typeof Component === 'string') {
    const opts = props as Options
    return createElement(Component, opts)
  }
  // If the component was a Variable
  // This stops the error encountered when initalising Mdx
  return Component
}

export default createComponent

