/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-undef */
/**
 * Copyright (c) 2021 - present Beignana Jim Junior and other contributors.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import Component from "../../renderer/createComponent"
import { Fragment } from '../Fragment'
import append from "../../renderer/append"
import Orbiton from "../../index"

class App extends Component {
  constructor(props, context) {
    super(props, context)
    this.state = {
      loaded: "initial state"
    }
    this.click = this.click.bind(this)
  }
  click() {
    this.updateState({
      loaded: "new state"
    })
  }
  render() {
    return (
      <div>
        <Fragment>
          <span id="txt">
            {this.state.loaded}
          </span>
          <button id="btn" onClick={this.click}>click me</button>
        </Fragment>
      </div>
    )
  }
}
const root = document.createElement("div")
document.body.appendChild(root)

append(<div><App /></div>, root)

it('Initially renders fragment correctly', () => {
  const text = document.getElementById("txt")
  expect(text.textContent).toEqual("initial state")
})

it('Renders fragment correctly after update', () => {
  const btn = document.getElementById("btn")
  const text = document.getElementById("txt")
  btn.click()
  expect(text.textContent).toEqual("new state")
})
