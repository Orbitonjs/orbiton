import Orbiton from 'orbiton'
import { Fragment } from '../../core/Fragment';
import { hydrate } from "../hydrate";


test("Hydrate", () => {
  let value = true
  const setValue = () => {
    value = !value
  }
  const HTMLbtn = `<div><btn></btn><h1></h1><span></span><btn id="btn" >Hello World</btn><btn></btn><btn></btn></div >`
  const btn = (
    <div>
      <Fragment>
        <btn></btn>
        <h1></h1>
        <Fragment>
          <span></span>
          <btn id="btn" onClick={setValue}>Hello World</btn>
          <btn></btn>
        </Fragment>
        <btn></btn>
      </Fragment>
    </div>
  )
  document.body.innerHTML = HTMLbtn
  hydrate(btn, document.body)
  const DOMbtn = document.getElementById("btn")
  DOMbtn.click()
  expect(value).toBe(false)
})

