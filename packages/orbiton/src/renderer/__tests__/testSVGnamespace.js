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
import append from '../append'
import Component from '../createComponent'

const root = document.createElement('div')
document.body.appendChild(root)
class Header extends Component {
  constructor(props, context) {
    super(props, context)
    this.state = {
      text: ""
    }
  }
  render() {
    return <nav>
      <svg id="text" xmlns="http://www.w3.org/2000/svg" height="48px" viewBox="0 0 24 24" width="48px" fill="#000000"><path d="M0 0h24v24H0V0z" fill="none" /><path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z" /></svg>
    </nav>
  }
}

test("Test `svg` namespaceURI", () => {
  append(<div><Header /></div>, root)

  const svg = document.getElementById('text')
  expect(svg.namespaceURI).toEqual('http://www.w3.org/2000/svg')
})
