/**
 * Copyright (c) 2021 - present Beignana Jim Junior and other contributors.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable class-methods-use-this */
import { BaseComponent } from "../core/component";
import { createId } from '../core/Selectors';
import {  Props } from "../../types/index";
import {  OrbitonElement } from "../../types/index";
import { getComponentRoots, updateUITree } from "../ingeminater/updateTree";
import { Fragment } from "../core/Fragment";



class Component extends BaseComponent {
  key: any;
  readonly type: 'Component';
  pearlId: symbol;
  currentTree: OrbitonElement | Component | Fragment;
  static isClassComponent = true
  constructor(props: Props = {}, context = {}) {

    super(props, context)
    if (props !== {}) {
      this.key = props? props.key ? props.key : null : null
    }
    this.type = 'Component'
    this.pearlId = createId(this.constructor.name, this.key)
    this.makeChild = this.makeChild.bind(this)
    this.Mounted = this.Mounted.bind(this)
    this.WillMount = this.WillMount.bind(this)
    this.getPearlId = this.getPearlId.bind(this)
    this.updateState = this.updateState.bind(this)
    this.changeState = this.changeState.bind(this)
  }

  getPearlId(): symbol {
    return this.pearlId
  }

  Mounted(): void {}

  WillMount(): void { }



  /**
  * Updates a subset of the state in the class
  * @param {any} newState this subset that you want to update
  * @param {?Function} callback this callback function that is called after state updates
  *
  * */
  updateState(
    newState: Record<string, unknown>,
    callback: VoidFunction | null = null
  ): void {

    const root = getComponentRoots(this.getPearlId(), this.currentTree)

    this.changeState(newState, callback)

    updateUITree(this.currentTree, this.render(), root)
    this.currentTree = this.render()
  }
  makeChild(): any {
    this.currentTree = this.render()
    return this.currentTree
  }
  render() : OrbitonElement {
    return {tag: 'div'} as OrbitonElement
  }

}


export default Component



