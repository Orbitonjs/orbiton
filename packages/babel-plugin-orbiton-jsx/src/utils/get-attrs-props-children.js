/**
 * Copyright (c) 2021 - present Beignana Jim Junior and other contributors.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import * as t from '@babel/types'
import { evaluateAttribute } from "../evaluateJSXAttributes";


//const TEXT_REGEX = /^(A-Z|a-z)/


/**
* @param {Array<t.JSXNamespacedName|t.JSXAttribute|t.JSXSpreadAttribute>} attributes -
* @param {Array<t.JSXElement|t.JSXText|t.JSXSpreadChild>} children -
* @return {Object}
*/
export function getAttrChildrenAndProps(attributes = [], children = []) {
  for (let child of children) {
    if (child.type === 'JSXText') {
      let hasLettersRegex = /[a-z0-9]/ig;
      if (child.value.includes('\n') && hasLettersRegex.test(child.value) === false) {
        let childIndex = children.indexOf(child)
        children.splice(childIndex, 1)
      }
    }
  }
  const RESULT_ATTRS = loopThroughAttributes(attributes)
  const RESULT_CHILDREN = loopThroughChildren(children)
  return { RESULT_ATTRS, RESULT_CHILDREN }
}

/**
* @param {Array<t.JSXNamespacedName|t.JSXAttribute|t.JSXSpreadAttribute>} attributes -
* @return {Array}
*/
function loopThroughAttributes(attributes) {
  const result = new Array()
  for (const attribute of attributes) {

    if (attribute.type === 'JSXSpreadAttribute') {
      // If the attribute is a spread element
      // forexample:
      //           <div {...attributes}>
      result.push(t.spreadElement(attribute.argument))
    } else if (attribute.name.type === "JSXNamespacedName") {
      // If the attribute is a Namespaced Attribute
      // forexample:
      //           <svg xmlns:inkspace="http://www.inkscape.org/namespaces/inkscape">
      result.push(evaluateNamespacedAttr(attribute))
    } else {
      // A normal Attribute
      result.push(t.objectProperty(
        t.identifier(attribute.name.name),
        evaluateAttribute(attribute),
        false,
        false
      ))
    }
  }
  return result
}
/**
* @param {t.JSXAttribute} attribute -
* @return {t.ObjectProperty}
*/
function evaluateNamespacedAttr(attribute) {
  let namespace = attribute.name.namespace.name
  let name = attribute.name.name.name

  let attributeKey = namespace + ":" + name;
  return t.objectProperty(
    t.stringLiteral(attributeKey),
    evaluateAttribute(attribute)
  )

}

function loopThroughChildren(children) {
  for (let child of children) {
    if (child.type === 'JSXText') {
      //removeWhitSpaces(child.value)
      let Stringchild = t.stringLiteral(child.value)
      children[children.indexOf(child)] = Stringchild
    }
    if (child.type === 'JSXExpressionContainer') {
      let type = child.expression.type
      if (type === 'JSXEmptyExpression') {
        children[children.indexOf(child)] = t.stringLiteral('')
      } else if (child.type === 'JSXSpreadChild') {
        let spreadChild = t.spreadElement(child.expression)
        children[children.indexOf(child)] = spreadChild
      } else {
        let Expression = t.toExpression(child.expression)
        children[children.indexOf(child)] = Expression
      }
    }
    if (child.type === 'JSXSpreadChild') {
      let spreadChild = t.spreadElement(child.expression)
      children[children.indexOf(child)] = spreadChild
    }
  }
  return children;
}
/**
* @param {string} text -
* @return {string}
*/
/* function removeWhitSpaces(text) {
  const ArrayOfText = text.split("\n")
  console.log(ArrayOfText);
} */
