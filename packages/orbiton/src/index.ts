
import createComponent from "./core/createComponent";
import createElement, {withComponent} from "./core/createElement";
import createJSXElement from "./core/createJSXElement";
import append from "./renderer/append";
import Component from "./renderer/createComponent";
import { render } from "./renderer/render";
const version = '1.0.0'
/**
* A Javascript library for building Browser User Interfaces
* @author Beigana Jim Junior <jimjunior854@outlook.com>
* @copyright Beigana Jim Junior © 2021
* @license MIT
*
* Learn more at the official Documentation: {@link https://orbiton.js.org}
*/
const Orbiton = {
  withComponent,
  render,
  createElement,
  append,
  Component,
  createComponent,
  createJSXElement,
  version
}
export default Orbiton

