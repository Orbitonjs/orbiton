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
import { Fragment } from '../../core/Fragment'
import append from "../../renderer/append"
import Orbiton from "../../index"

describe("Children Diffing", () => {
  class App extends Component {
    constructor(props, context) {
      super(props, context)
    }
    render() {
      return (
        <div>
          {this.props.children}
        </div>
      )
    }
  }
  beforeEach(() => {
    document.body.appendChild(
      document.createElement("div")
        .setAttribute("id", "app-root")
    )

  })
  afterEach(() => {
    document.body
      .removeChild(
        document.getElementById("app-root")
      )
  })
  it("Updates Multiple Fragment Children Correctly", () => {
    class Auth extends Component {
      constructor(props, context) {
        super(props, context)
        this.state = {
          loggedIn: false
        }
      }
      render() {
        const { loggedIn } = this.state
        return (
          <Fragment>
            <Fragment>
              <Fragment>
                <Fragment>
                  <button id="btn" onClick={() => { this.updateState({ loggedIn: !loggedIn }) }}>{loggedIn ? "Logout" : "Login"}</button>
                </Fragment>
              </Fragment>
            </Fragment>
          </Fragment>
        )
      }
    }
    append(
      <div>
        <App>
          <Auth />
        </App>
      </div>,
      document.getElementById("app-root")
    )
    const btn = document.getElementById("btn")
    btn.click()
    expect(btn.textContent).toBe("Logout")
  })
})
