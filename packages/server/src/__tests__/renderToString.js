

import Orbiton from 'orbiton'
import { renderToString } from '../renderToString'

const Button = <button className="button" id="btn">Click Me</button>

test('should Render Elements right', () => {
  const button = renderToString(Button)
  //console.log(button)
  expect(button).toBe(`<button class="button" id="btn">Click Me</button>`)
})
