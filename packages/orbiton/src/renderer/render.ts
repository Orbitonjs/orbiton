/**
 * Copyright (c) 2021 - present Beignana Jim Junior and other contributors.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { evaluateAttributes } from "./ElementAttributes";
import { appendEvents } from "./Events";
import { OrbitonElement, Component, OrbitonDOMElement, OrbitonSVGElement } from "../../types/index";
//import Component from "./createComponent";
import { Fragment } from "../core/Fragment";

function renderElement(
  element: OrbitonElement,
  ns = "http://www.w3.org/1999/xhtml",
  hostComponent: Array<Component> = []
) {
  const componentId = hostComponent.length > 0 ? hostComponent[hostComponent.length - 1].getPearlId() : null
  const comp = hostComponent[0]
  let node : OrbitonDOMElement | OrbitonSVGElement
  let childns : "http://www.w3.org/2000/svg" | "http://www.w3.org/1999/xhtml"
  if (element.tag === 'svg') {
    node = document.createElementNS("http://www.w3.org/2000/svg", "svg")  as OrbitonSVGElement
    // Set the namespace to "http://www.w3.org/2000/svg"
    // since the child elements like path should also
    // have the same namespace
    childns = "http://www.w3.org/2000/svg"
  } else {
    node = document.createElementNS(ns,element.tag) as OrbitonDOMElement
    childns = "http://www.w3.org/1999/xhtml"
  }
  node._orbiton$config = {}
  node._orbiton$config.componentHosted = []
  node._orbiton$config.isComponentRoot = hostComponent.length > 0 ? true : false
  node._orbiton$config.compomentRootId = componentId
  if (comp) {
    node._orbiton$config.componentHosted.push(comp)
  }

  if (element.attachedComponent) {
    node._orbiton$config.componentHosted.push(element.attachedComponent)
  }


  evaluateAttributes(node, element.attributes)

  appendEvents(node, element.events)
  if (element.children) {



    for (const child of element.children) {
      // eslint-disable-next-line no-use-before-define
      if (typeof child === 'string') {
        const Textnode = document.createTextNode(child)
        appendChild(node,Textnode)
      } else {
        // This is usually possible when one maps through an array forexample:
        //     render() {
        //         return  <div>
        //                    {this.state.array.map(...)}
        //                 </div>
        //         }
        if (Array.isArray(child)) {
          for (const elm of child) {
            const element = render(elm, childns)
            appendChild(node,element);

          }
        } else {
          const element = render(child, childns)
          if (element !== null && element !== undefined) {

            appendChild(node,element);
          }
        }

      }
    }
  }

  element.domRef = node

  return node;
}

export const render = (
  o_element: Component|OrbitonElement|Fragment|string,
  ns = "http://www.w3.org/1999/xhtml",
  hostComponent: Array<Component> = []
) : any | OrbitonDOMElement | Array<OrbitonDOMElement> => {
  //console.log(o_element)
  if (typeof o_element === 'string' || typeof o_element === "boolean" || typeof o_element === "number") {
    return document.createTextNode(`${o_element}`);
  }
  if (o_element.type === 'element') {
    return renderElement(o_element, ns, hostComponent);
  }

  if (o_element.type === 'Component') {
    const el = o_element.makeChild();
    if (returnsNothing(el)) {
      return null;
    }
    // when the first element is a component
    if (el.tag === undefined) {
      return render(el);
    }
    // Call the will mount lifecyle method
    // Note: this method is depriciated since it was unstable
    o_element.WillMount();
    hostComponent.push(o_element)

    return render(el, ns, hostComponent);
  }
  if (o_element.type === "Fragment") {
    return  renderFragment(o_element)
  }

};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function returnsNothing(component: any) : boolean {
  if (component === null || component === undefined) {
    return true
  }
  return false
}


function renderFragment(fragment: Fragment) : Array<OrbitonDOMElement> {
  const childNodes = []
  for (const child of fragment.children) {
    if (typeof child !== "string") {
      if (child.type === "Fragment") {
        throw new Error("A Fragment cannot be a direct child to another Fragment. Consider changing your source code.");
      }
    }
    const DOMChild = render(child) as OrbitonDOMElement
    DOMChild._orbiton$config.renderedByFrag = true
    DOMChild._orbiton$config.HostFragID = fragment.FragmentID
    childNodes.push(DOMChild)
  }
  return childNodes
}

export function appendChild(
  node: OrbitonDOMElement|OrbitonSVGElement,
  child: OrbitonDOMElement|OrbitonSVGElement| Text | Array<OrbitonDOMElement|Text|OrbitonSVGElement>
): void {


  if (Array.isArray(child)) {
    for (const childEl of child) {
      node.appendChild(childEl)
    }
  } else {
    node.appendChild(child)
  }
}


