/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { OrbitonDOMElement } from "../types/OrbitonTypes"

/**
* Appends events to a node that is passed in
* @param {Node} node - The node to append the events
* @param {object} events - an object containing the key as the event and the value as the function
*/
export function appendEvents(node: OrbitonDOMElement, events: Record<string, VoidFunction> ): void {
  console.log(events)
  node._orbiton$config.extendEvents = events
  for (const [k, v] of Object.entries(events)) {
    node.addEventListener(k, v)
  }
}



export function compareEventListeners(oldEvents: any, newEvents: Record<string, VoidFunction>) {

  return (node: OrbitonDOMElement) => {
    // eslint-disable-next-line no-use-before-define
    removeFromeNode(node)
    appendEvents(node, newEvents)
    return node
  }
}


export function removeFromeNode(node: OrbitonDOMElement) {
  for (const [k, v] of Object.entries(node._orbiton$config.extendEvents)) {
    node.removeEventListener(k, v)
  }
}

/**
 * The `_pearl$config` attributes on the node are used to identify HTML Elements that are created by pearl js
*/
