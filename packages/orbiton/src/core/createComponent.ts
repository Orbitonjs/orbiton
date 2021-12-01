/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */

/**
* Creates a new Component
*/
const createComponent = (Component: any , props = {}, context = {}) => {

  if (typeof Component === "function") {
    if (Component.isClassComponent) {
      const c = new Component(props, context)
      return c
    }
    return Component(props)
  }
  return Component
}

export default createComponent
