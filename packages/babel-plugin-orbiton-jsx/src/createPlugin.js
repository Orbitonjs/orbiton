/* eslint-disable no-undef */
import evaluateJSXAttributes from "./evaluateJSXAttributes"
import { getElementType } from "./eveluateElementType"
import { TransformToCreateComponent, TransformToCreateElement } from "./transformToFunction";
const t = require('@babel/types')
/* eslint-disable no-unused-vars */
export function TransformSyntax() {
  return {
    visitor: {
      JSXText(path) {
        let value = path.node.value
        path.replaceWith(
          t.stringLiteral(value)
        )
      },

      JSXElement(path) {
        const _JSXElement = path.node
        const openingElement = _JSXElement.openingElement
        const ElementName = openingElement.name.name
        const ElementType = getElementType(ElementName)

        if (ElementType === "Element") {
          const AttributesAndEvents = evaluateJSXAttributes(openingElement.attributes)
          const Children = _JSXElement.children
          path.replaceWith(
            TransformToCreateElement(
              ElementName,
              AttributesAndEvents.attributes,
              AttributesAndEvents.events,
              Children
            )
          )
        }
        if (ElementType === "Component") {
          path.replaceWith(
            TransformToCreateComponent(
              ElementName,
              openingElement.attributes,
              _JSXElement.children
            )
          )
        }
      },
    }
  }
}

