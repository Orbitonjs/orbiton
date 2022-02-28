/**
 * Copyright (c) 2021 - present Beignana Jim Junior and other contributors.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */



const hasUpperCaseRegex = /[A-Z]/;
function splitProperty(property: string, index: number, append: string) {
  const firstSection = property.slice(0, index)
  let secondSection = property.slice(index)
  secondSection = secondSection.toLowerCase()
  return `${firstSection}${append}${secondSection}`
}
/**
* @param {string} property -
*/
export function getPropety(property: string ) {
  let validProperty = property
  const upperCaseLetters = validProperty.match(hasUpperCaseRegex) || []
  if (upperCaseLetters.length) {
    for (let i = 0; i < upperCaseLetters.length; i++) {
      const element = upperCaseLetters[i];
      if (property.indexOf(element) !== 0) {
        validProperty = splitProperty(validProperty, property.indexOf(element), '-')
      }
    }
  }

  return validProperty;
}

/**
* Appends attributes to a node
* @param {HTMLElement} node - Node to append attributes to
* @param {object} attributes - attributes
*/
export function evaluateAttributes(node: { setAttribute: (arg0: string, arg1: unknown) => void; classList: { add: (arg0: unknown) => void; }; }, attributes = {}) {
  for (const [property, value] of Object.entries(attributes)) {
    if (property === "style") {
      node.setAttribute(property, evaluateStyleTag(value))
    } else if (property.toLowerCase() === "classname") {
      node.setAttribute("class", value)
    } else {
      node.setAttribute(getPropety(property), value)
    }
  }
  return node
}


/**
* @param {string} property -
* @param {number} index -
* @param {string} append -
* @return {string} .
*/
function splitCSSProperty(property: string, index: number, append: string): string {
  const firstSection = property.slice(0, index)
  let secondSection = property.slice(index)
  secondSection = secondSection.toLowerCase()
  return `${firstSection}${append}${secondSection}`
}


function getValidCSSFromObject(o: Record<string, unknown>) {
  let style = ''
  if (Array.isArray(o)) {
    throw new Error("Style prop only accepts as string os an object arrays ar not accepted");
  }
  for (const [property, value] of Object.entries(o)) {
    const UpperCaseLetters = property.match(hasUpperCaseRegex)
    if (UpperCaseLetters !== null) {
      if (UpperCaseLetters.length === 1) {
        /** @typedef string */
        const beginningOfSecondWord = UpperCaseLetters[0]
        const position = property.indexOf(beginningOfSecondWord)
        // split the word to add a dash `-` sign between them
        const CSSProperty = splitCSSProperty(property, position, '-')
        style = `${style}${CSSProperty}: ${value};`
      }
    } else {
      style = `${style}${property}: ${value};`
    }

  }
  return style
}




// eslint-disable-next-line @typescript-eslint/no-explicit-any
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export function evaluateStyleTag(tag: any): string {
  if (typeof tag === "object") {
    return getValidCSSFromObject(tag)
  }
  return tag
}


