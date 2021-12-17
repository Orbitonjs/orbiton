/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { evaluateAttributes } from "./ElementAttributes";
import { appendEvents } from "./Events";
import { OrbitonElement, OrbitonDOMElement, OrbitonSVGElement } from "../types/OrbitonTypes";
import Component from "./createComponent";

function renderElement(element: OrbitonElement, isComponentRoot = false, componentId = null, comp: Component| null = null) {
  let node
  if (element.tag === 'svg') {
    node = document.createElementNS("http://www.w3.org/2000/svg", "svg")  as OrbitonSVGElement
  } else {
    node = document.createElement(element.tag) as OrbitonDOMElement
  }
  node._orbiton$config = {}
  if (isComponentRoot) {
    node._orbiton$config.isComponentRoot = true
    node._orbiton$config.compomentRootId = componentId
    node._orbiton$config.componentHosted = [comp]
  }
  if (element.attachedComponent) {
    node._orbiton$config.componentHosted = [element.attachedComponent]
  }


  evaluateAttributes(node, element.attributes)

  appendEvents(node, element.events)
  if (element.children) {



    for (const child of element.children) {
      // eslint-disable-next-line no-use-before-define
      if (typeof child === 'string') {
        const Textnode = document.createTextNode(child)
        node.appendChild(Textnode)
      } else {
        if (Array.isArray(child)) {
          for (const elm of child) {
            const element = render(elm)
            node.appendChild(element);

          }
        } else {
          const element = render(child)
          if (element !== null && element !== undefined) {

            node.appendChild(element);
          }
        }

      }
    }
  }

  return node;
}

export const render = (xElement: any) : any | OrbitonDOMElement => {
  if (typeof xElement === 'string' || typeof xElement === "boolean" || typeof xElement === "number") {
    return document.createTextNode(`${xElement}`);
  }
  if (xElement.type === 'element') {
    return renderElement(xElement);
  }

  if (xElement.type === 'IS_X_COMPONENT') {
    const $el = xElement.makeChild()
    if (returnsNothing($el)) {
      return null
    }
    // when the first element is a component
    if ($el.tag === undefined) {
      return render($el)
    }
    xElement.WillMount()
    return renderElement($el, true, xElement.getPearlId(), xElement)
  }

};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function returnsNothing(component: any) : boolean {
  if (component === null || component === undefined) {
    return true
  }
  return false
}
