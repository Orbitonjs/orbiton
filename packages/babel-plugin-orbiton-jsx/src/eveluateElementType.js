
let IsComponentNameRegex = /^[A-Z]/;

/**
* Evaluates the type of component
* @param {string} name -
*/
export function getElementType(name) {
  let isComponent = IsComponentNameRegex.test(name)
  if (isComponent) {
    return 'Component'
  } else {
    return 'Element'
  }
}
