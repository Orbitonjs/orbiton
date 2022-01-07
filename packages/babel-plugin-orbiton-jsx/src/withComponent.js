
import { evaluateAttribute, getEventName } from './transformToFunction'
import * as t from '@babel/types'
export function transformNamespacedJSX(tag, component, attributes, events, children) {
  let attrs = []
  let props = t.objectProperty(
    t.identifier("props"),
    t.objectExpression(
      []
    ),
    false,
    false
  )
  for (let attribute of attributes) {
    if (attribute.type === 'JSXSpreadAttribute') {
      let attr = t.spreadElement(attribute.argument)

      attrs.push(attr)
    } else {
      if (attribute.name.name === "props") {
        let prop = t.objectProperty(
          t.identifier(attribute.name.name),
          evaluateAttribute(attribute),
          false,
          false
        )
        props = prop
      } else {
        let attr = t.objectProperty(
          t.identifier(attribute.name.name),
          evaluateAttribute(attribute),
          false,
          false
        )
        attrs.push(attr)
      }

    }


  }
  for (let child of children) {
    if (child.type === 'JSXText') {
      let hasLettersRegex = /[a-z0-9]/ig;
      if (child.value.includes('\n') && hasLettersRegex.test(child.value) === false) {
        let childIndex = children.indexOf(child)
        children.splice(childIndex, 1)
      }
    }
  }
  for (let child of children) {
    if (child.type === 'JSXText') {
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
  let eves = []
  for (let event of events) {
    let eve = t.objectProperty(
      t.identifier(getEventName(event.name.name)),
      t.toExpression(event.value.expression),
      false,
      false
    )
    eves.push(eve)
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
            [...attrs]
          ),
          false,
          false
        ),
        props,
        t.objectProperty(
          t.identifier("events"),
          t.objectExpression(
            [...eves]
          ),
          false,
          false
        ),
        t.objectProperty(
          t.identifier("children"),
          t.arrayExpression(
            children
          ),
          false,
          false
        )
      ]
    )
  ]
  )
}
