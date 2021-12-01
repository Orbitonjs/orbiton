/* eslint-disable no-undef */
import { evaluateStyleTag } from '../ElementAttributes'

const style = {
  backgroundAttachment: "fixed",
  fontFamily: "Roboto"
}

const styleString = "background-attachment: fixed;font-family: Roboto;"

test("Transform Javascript Object to CSS style attr string", () => {
  expect(evaluateStyleTag(style)).toEqual(styleString)
})
