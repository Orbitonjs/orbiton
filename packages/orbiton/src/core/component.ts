/**
 * Copyright (c) 2021 - present Beignana Jim Junior and other contributors.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @typescript-eslint/ban-types */


import { createId } from './Selectors';
import { Props } from "../../types/index"
import { Config } from './config';
import { PatchTrees } from '../ingeminater/compareOrbitonTree';

/**
* Base component
*/
export class BaseComponent {
  state: any
  props: Props
  context: Record<string, unknown>
  constructor(props: any = {}, context: Record<string, unknown> = {}) {
    this.state = {}
    this.props = props
    this.context = context
  }

  /**
 * Updates a subset of the state in the class
 * @param {object} newState this subset that you want to update
 * @param {?Function} callBack this callback function that is called after state updates
 */

  changeState(
    newState: Record<string, unknown>,
    callBack: VoidFunction | null = null
  ): void {

    if (newState.constructor.name !== 'Object') {
      throw Error('updateState(...) method takes in an object')
    }
    const values = Object.getOwnPropertyNames(newState)
    const stateValues = Object.getOwnPropertyNames(this.state)

    for (const value of values) {
      if (stateValues.includes(value)) {
        this.state[value] = newState[value]
      } else {
        throw Error('The value `' + value + '` is not in the state object')
      }

    }
    if (callBack !== null) {
      callBack.call(this, newState)
    }
  }

}




export class LogicalComponent extends BaseComponent {
  key: unknown;
  readonly type: 'Component';
  pearlId: symbol;
  static isClassComponent = true
  constructor(props: any = {}, context = {}) {

    super(props, context)
    if (props !== {}) {
      this.key = props? props.key ? props.key : null : null
    }
    this.type = 'Component'
    this.pearlId = createId(this.constructor.name, this.key)
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
    this.changeState(newState, callback)
  }

}



export class Component extends BaseComponent {
  key: any;
  readonly type: 'Component';
  pearlId: symbol;
  currentTree: any;
  static isClassComponent = true
  constructor(props: any = {}, context = {}) {

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


    this.changeState(newState, callback)

    const newVTree = PatchTrees(this.currentTree, this.render())
    Config.renderer.updateUI(this.currentTree, newVTree, this)
    this.currentTree = newVTree
  }
  makeChild(): any {
    this.currentTree = this.render()
    return this.currentTree
  }
  render(): any {}

}

