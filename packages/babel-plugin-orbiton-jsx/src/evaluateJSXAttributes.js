/**
 * Copyright (c) 2021 - present Beignana Jim Junior and other contributors.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import * as t from '@babel/types'


function evaluateNode(node) {
  let attribute = {
    attribute: {},
    type: ''
  }
  const isEventRegex = /^on/;
  if (node.type === 'JSXSpreadAttribute') {
    attribute.type = 'attribute'
  } else {
    const isEvent = isEventRegex.test(node.name.name)
    if (isEvent) {
      attribute.type = 'Event'
    } else {
      attribute.type = 'attribute'
    }
  }


  attribute.attribute = node
  return attribute
}


/**
* @param {Array} JSXNodes -
*/
export default function evaluateJSXAttributes(JSXNodes) {

  let result = {
    events: [],
    attributes: []
  }
  for (const node of JSXNodes) {
    // eslint-disable-next-line no-unused-vars
    let resultNode = evaluateNode(node)
    if (resultNode.type === 'Event') {
      result.events.push(resultNode.attribute)
    } else {
      result.attributes.push(resultNode.attribute)
    }
  }
  return result
}

export function evaluateAttribute(attribute) {
  if (attribute.type === 'JSXSpreadAttribute') {
    return t.spreadElement(attribute.argument)
  } else {

    if (attribute.value.type === 'StringLiteral') {
      return t.toExpression(attribute.value)
    }
    if (attribute.value.type === 'JSXExpressionContainer') {
      return t.toExpression(attribute.value.expression)
    }
  }

}
