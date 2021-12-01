/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-types */


import { Props } from "../types/OrbitonTypes"

/**
* Base Pearl component
*/
export class Component {
  state: any
  props: Props<number>
  context: Record<string, unknown>
  constructor(props: Props<number> = {}, context = {}) {
    this.state = {}
    this.props = props
    this.context = context
  }

  /**
 * Updates a subset of the state in the class
 * @param {object} newState this subset that you want to update
 * @param {?Function} callBack this callback function that is called after state updates
 */

  changeState(newState: Record<string, unknown>, callBack: Function | null = null): void {

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




