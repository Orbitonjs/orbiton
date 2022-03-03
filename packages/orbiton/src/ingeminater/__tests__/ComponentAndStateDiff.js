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
//import { Fragment } from '../Fragment'
import append from "../../renderer/append"
import Orbiton from "../../index"

class App extends Component {
  constructor(props, context) {
    super(props, context)
    this.state = {
      changed: false
    }
    this.click = this.click.bind(this)
  }
  click() {
    this.updateState({
      changed: true
    })
  }
  render() {
    return (
      <div>
        {
          this.state.changed ? <div><SpanTwo>new render</SpanTwo></div> : <div><Span>new render</Span></div>}
        <button id="btn" onClick={this.click}>click me</button>
      </div>
    )
  }
}


class Span extends Component {
  constructor(props, context) {
    super(props, context)
    this.state = {
      stateOne: "This is state for first comp"
    }
  }
  render() {
    return (
      <span id="txt">
        {this.props.children}
      </span>
    )
  }
}

class SpanTwo extends Component {
  constructor(props, context) {
    super(props, context)
    this.state = {
      stateTwo: ""
    }
  }
  Mounted() {
    console.log(this.state)
  }
  render() {
    return (
      <span id="txt">
        {this.props.children}
      </span>
    )
  }
}
const root = document.createElement("div")
document.body.appendChild(root)

append(<div><App /></div>, root)


it('Diffing children with different types', () => {
  const btn = document.getElementById("btn")
  btn.click()
  const text = document.getElementById("txt")
  expect(text.textContent).toEqual("new render")
})
