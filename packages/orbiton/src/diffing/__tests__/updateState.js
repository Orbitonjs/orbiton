/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-undef */
import Orbiton from '../../index'
import append from '../../renderer/append'
import Component from '../../renderer/createComponent'

const root = document.createElement('div')
document.body.appendChild(root)
class Header extends Component {
  constructor(props, context) {
    super(props, context)
    this.state = {
      text: ""
    }
    this.Click = this.Click.bind(this)
  }
  Click() {
    this.updateState({ text: "hello" })
  }
  render() {
    return <nav>
      <button id="button" onClick={this.Click}></button>
      <p id="text">{this.state.text}</p>
    </nav>
  }
}

test("Test `updateState()` method", () => {
  append(<div><Header /></div>, root)

  const button = document.getElementById('button')
  button.click()
  const text = document.getElementById('text')
  expect(text.textContent).toEqual('hello')
})
