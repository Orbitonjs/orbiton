/**
 * Copyright (c) 2021 - present Beignana Jim Junior and other contributors.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */
/* eslint-disable no-undef */
import evaluateJSXAttributes from "./evaluateJSXAttributes"
import { getElementType } from "./eveluateElementType"
import { TransformToCreateComponent, TransformToFragment, TransformToCreateElement } from "./transformToFunction";
import { transformNamespacedJSX } from "./withComponent";
import * as babel from "@babel/core"
const t = babel.types



/* eslint-disable no-unused-vars */
export default function () {
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
        // Transforming namespaced JSX by tag
        // forexample:
        //            <div:Root></div:Root>
        if (openingElement.name.type === "JSXNamespacedName") {
          const AttributesAndEvents = evaluateJSXAttributes(openingElement.attributes)
          path.replaceWith(
            transformNamespacedJSX(
              openingElement.name.namespace,
              openingElement.name.name,
              AttributesAndEvents.attributes,
              AttributesAndEvents.events,
              _JSXElement.children
            )
          )
        } else {

          const ElementName = openingElement.name.name
          //console.log(openingElement)
          const ElementType = getElementType(ElementName)

          if (ElementType === "Element") {
            //console.log(" this is called")
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
                _JSXElement.children,
                openingElement
              )
            )
          }
        }
      },
      JSXFragment(path) {
        path.replaceWith(TransformToFragment(path.node.children))
      }
    }
  }
}



