import { OrbitonDOMElement } from "../types/OrbitonTypes";

type Ref = symbol
/**
* Returns an `HTMLElement` represented by a given `ref`
*/
/* eslint-disable no-unused-vars */
export function getRef(ref: Ref): OrbitonDOMElement | null {
  let node: OrbitonDOMElement | null = null
  const allNodes = document.querySelectorAll('*') as NodeListOf<OrbitonDOMElement>
  allNodes.forEach((e: OrbitonDOMElement) => {
    if (e._orbiton$config.ref === ref) {
      node = e
    }
  })
  return node
}


export function createId(name: string, key: null | number = null): symbol {
  if (key === null || key === undefined) {
    key = Math.floor(Math.random() * 100000)
  }
  return Symbol(`${name}_${key}`)
}



/**
* Creates a reference `Symbol`. This can be used to identify an element in the DOM
* @param {string} ref - A reference string.
* @returns {Ref}
*/
export function createRef(ref: string | null = null): Ref {
  const randomKey = Math.floor(Math.random() * 100000)
  if (ref === null) {
    return Symbol(`__null_ref__${randomKey}`)
  }
  return Symbol(`${ref}__${randomKey}`)
}

