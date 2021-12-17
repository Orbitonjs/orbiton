/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { OrbitonElement } from "../types/OrbitonTypes";
import createComponent from "./createComponent";
import createElement from "./createElement";


export default function createJSXElement(tag, props, key = '', __source= '', __self = '') : OrbitonElement {
  if (typeof tag === "string") {
    return createElement(tag, props )
  } else {
    return createComponent(tag, props)
  }
}
