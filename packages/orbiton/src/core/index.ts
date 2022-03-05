import { BaseComponent, Component, LogicalComponent } from "./component"
import { Config } from "./config"
import createComponent from "./createComponent"
import createElement, { withComponent } from "./createElement"
import { Fragment } from "./Fragment"

const version = "__PACKAGE_VERSION__"

/**
* A Javascript library for building Browser User Interfaces
* @author Beigana Jim Junior <jimjunior854@outlook.com>
* @copyright Beigana Jim Junior © 2021 - present
* @license MIT
*
* Learn more at the official Documentation: {@link https://orbiton.js.org}
*/
const Orbiton = {
  withComponent,
  createElement,
  Component,
  createComponent,
  Fragment,
  BaseComponent,
  LogicalComponent,
  version,
  Config
}
export default Orbiton
