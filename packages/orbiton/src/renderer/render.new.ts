/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, OrbitonDOMElement, OrbitonElement } from "../../types/index";
import { Fragment } from "../core/Fragment";


export function render(
  element: Component|OrbitonElement|Fragment|string,
  isSvg: boolean,
  hostComponents: Component = []
) :any | OrbitonDOMElement {
  if (typeof element === "string") {
    return document.createTextNode("element")
  }else
  if (element.type === "element") {
    return
  } else if (element.type === "Component") {
    return
  }
  else if (element.type === "Fragment") {
    return;
  }
}

function renderElement(
  element: OrbitonElement,
  isSvg: boolean,
  hostComponents: Component[]
): OrbitonDOMElement
{

}
