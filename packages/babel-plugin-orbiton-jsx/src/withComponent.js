/**
 * Copyright (c) 2021 - present Beignana Jim Junior and other contributors.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import { getEventName } from './transformToFunction'
import { evaluateAttribute } from './evaluateJSXAttributes'
import * as t from '@babel/types'
import { getAttrChildrenAndProps } from './utils/get-attrs-props-children'


/**
* Transforms Namespaced JSX usually to result into the `withComponent` function.
* @param {t.StringLiteral} tag - This is the tagName of the JSX element
*/
export function transformNamespacedJSX(tag, component, attributes, events, children) {
  let props = t.objectProperty(
    t.identifier("props"),
    t.objectExpression(
      []
    ),
    false,
    false
  )
  for (let attribute of attributes) {
    if (attribute.name.name === "props") {
      props = t.objectProperty(
        t.identifier(attribute.name.name),
        evaluateAttribute(attribute),
        false,
        false
      )
      let propsIndex = attributes.indexOf(attribute)
      attributes.splice(propsIndex, 1)
    }

  }
  const { RESULT_ATTRS, RESULT_CHILDREN } = getAttrChildrenAndProps(attributes, children)


  /** @type Array<t.ObjectProperty> */
  let EventsArray = new Array()
  // Append Events
  for (let event of events) {
    EventsArray.push(t.objectProperty(
      t.identifier(getEventName(event.name.name)),
      t.toExpression(event.value.expression),
      false,
      false
    ))
  }
  return t.callExpression(
    t.memberExpression(
      t.identifier("Orbiton"),
      t.identifier("withComponent"),
      false
    ), [
    t.stringLiteral(tag.name),
    t.identifier(component.name),
    t.objectExpression(
      [
        t.objectProperty(
          t.identifier("attributes"),
          t.objectExpression(
            [...RESULT_ATTRS]
          ),
          false,
          false
        ),
        props,
        t.objectProperty(
          t.identifier("events"),
          t.objectExpression(
            [...EventsArray]
          ),
          false,
          false
        ),
        t.objectProperty(
          t.identifier("children"),
          t.arrayExpression(
            RESULT_CHILDREN
          ),
          false,
          false
        )
      ]
    )
  ]
  )
}
