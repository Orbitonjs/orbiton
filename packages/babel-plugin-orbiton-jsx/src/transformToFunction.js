/**
 * Copyright (c) 2021 - present Beignana Jim Junior and other contributors.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import * as t from '@babel/types'
import { getAttrChildrenAndProps } from './utils/get-attrs-props-children'



/**
* @param {string} event -
*/
export function getEventName(event) {
  let eventName = event.slice(2)
  return eventName.toLowerCase()
}
/**
* @param {string} tag -
* @param {Array<t.JSXNamespacedName|t.JSXAttribute|t.JSXSpreadAttribute>} attributes -
* @param {Array<t.JSXElement|t.JSXText|t.JSXSpreadChild>} children -
* @param {t.JSXOpeningElement} openingElement -
* @return {t.CallExpression}
*/
export function TransformToCreateComponent(tag, attributes, children, openingElement) {
  let ExpressionTag;
  if (openingElement.name.type === "JSXMemberExpression") {
    ExpressionTag = t.memberExpression(
      t.identifier(openingElement.name.object.name),
      t.identifier(openingElement.name.property.name),
      false
    )
  } else {
    ExpressionTag = t.identifier(tag)
  }
  const { RESULT_ATTRS, RESULT_CHILDREN } = getAttrChildrenAndProps(attributes, children)

  RESULT_ATTRS.push(
    t.objectProperty(
      t.identifier('children'),
      t.arrayExpression(RESULT_CHILDREN)
    )
  )
  return t.callExpression(
    t.memberExpression(
      t.identifier("Orbiton"),
      t.identifier("createComponent"),
      false
    ),
    [
      ExpressionTag,
      t.objectExpression(
        [...RESULT_ATTRS]
      ),
    ]
  )
}


/**
* @param {string} tag -
* @param {Array<t.JSXNamespacedName|t.JSXAttribute|t.JSXSpreadAttribute>} attributes -
* @param {Array<t.JSXAttribute>} events -
* @param {Array<t.JSXElement|t.JSXText|t.JSXSpreadChild>} children -
* @return {t.CallExpression}
*/
export function TransformToCreateElement(tag, attributes, events, children) {
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
      t.identifier("createElement"),
      false
    ),
    [
      t.stringLiteral(tag),
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


