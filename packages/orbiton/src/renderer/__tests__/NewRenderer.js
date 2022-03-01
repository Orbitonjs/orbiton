/**
 * Copyright (c) 2021 - present Beignana Jim Junior and other contributors.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-undef */
import Orbiton from '../../index'
import Component from '../createComponent'
import { appendChild } from '../render.new'
import { render } from "../render.new"

describe("Test new Render Method", () => {
  beforeEach(() => {
    const root = document.createElement("div");
    root.setAttribute("id", "app-root");
    document.body.appendChild(root)

  })
  afterEach(() => {
    const root = document.getElementById("app-root");
    document.body
      .removeChild(
        root
      )
  })
  test("Renders reccuring Fragments", () => {
    const App = <Orbiton.Fragment>
      <Orbiton.Fragment>
        <button id="el1">Click Me</button>
        <Orbiton.Fragment>
          <span id="el2">Span Element</span>
        </Orbiton.Fragment>
        <Orbiton.Fragment>
          <Orbiton.Fragment>
            <Orbiton.Fragment>
              <Orbiton.Fragment>
                <h1 id="el3">Heading</h1>
              </Orbiton.Fragment>
            </Orbiton.Fragment>
          </Orbiton.Fragment>
          <Orbiton.Fragment>
            <Orbiton.Fragment>
              <div id="el4">Hello Div</div>
            </Orbiton.Fragment>
          </Orbiton.Fragment>
        </Orbiton.Fragment>
      </Orbiton.Fragment>
    </Orbiton.Fragment>
    const root = document.getElementById("app-root")
    root.append(...render(App))
    const button = document.getElementById("el1")
    const span = document.getElementById("el2")
    const h1 = document.getElementById("el3")
    const div = document.getElementById("el4")
    expect(button.textContent).toBe("Click Me");
    expect(span.textContent).toBe("Span Element");
    expect(h1.textContent).toBe("Heading");
    expect(div.textContent).toBe("Hello Div");
    expect(root.childNodes.length).toBe(4);
    expect(button.__ORBITON_CONFIG__.__nonElement_parents_hosted.length).toBe(2)
    expect(span.__ORBITON_CONFIG__.__nonElement_parents_hosted.length).toBe(3)
    expect(h1.__ORBITON_CONFIG__.__nonElement_parents_hosted.length).toBe(6)
    expect(div.__ORBITON_CONFIG__.__nonElement_parents_hosted.length).toBe(5)
  })
  class Div extends Component {
    constructor(props, context) {
      super(props, context)
    }
    render() {
      return <Orbiton.Fragment>
        {this.props.children}
      </Orbiton.Fragment>
    }
  }
  class Div2 extends Component {
    constructor(props, context) {
      super(props, context)
    }
    render() {
      return <Div>
        {this.props.children}
      </Div>
    }
  }
  test("Renders reccuring Components with Fragments", () => {
    const App = <Div>
      <Orbiton.Fragment>
        <button id="el1">Click Me</button>
        <Orbiton.Fragment>
          <span id="el2">Span Element</span>
        </Orbiton.Fragment>
        <Orbiton.Fragment>
          <Orbiton.Fragment>
            <Orbiton.Fragment>
              <Div2>
                <h1 id="el3">Heading</h1>
              </Div2>
            </Orbiton.Fragment>
          </Orbiton.Fragment>
          <Orbiton.Fragment>
            <Div>
              <div id="el4">Hello Div</div>
            </Div>
          </Orbiton.Fragment>
        </Orbiton.Fragment>
      </Orbiton.Fragment>
    </Div>
    const root = document.getElementById("app-root")
    appendChild(root, render(App))
    const button = document.getElementById("el1")
    const span = document.getElementById("el2")
    const h1 = document.getElementById("el3")
    const div = document.getElementById("el4")
    expect(button.textContent).toBe("Click Me");
    expect(span.textContent).toBe("Span Element");
    expect(h1.textContent).toBe("Heading");
    expect(div.textContent).toBe("Hello Div");
    expect(root.childNodes.length).toBe(4);
    expect(button.__ORBITON_CONFIG__.__nonElement_parents_hosted.length).toBe(3)
    expect(span.__ORBITON_CONFIG__.__nonElement_parents_hosted.length).toBe(4)
    expect(h1.__ORBITON_CONFIG__.__nonElement_parents_hosted.length).toBe(9)
    expect(div.__ORBITON_CONFIG__.__nonElement_parents_hosted.length).toBe(7)
  })

})

