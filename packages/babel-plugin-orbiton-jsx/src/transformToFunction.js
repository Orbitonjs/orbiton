/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
// eslint-disable-next-line @typescript-eslint/no-var-requires
const t = require('@babel/types')




function evaluateAttribute(attribute) {
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
/**
* @param {string} event -
*/
function getEventName(event) {
  let eventName = event.slice(2)
  return eventName.toLowerCase()
}

export function TransformToCreateComponent(tag, attributes, children) {
  let props = []
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
    if (child.type === 'JSXSpreadChild') {
      let spreadChild = t.spreadElement(child.expression)
      children[children.indexOf(child)] = spreadChild
    }
  }
  for (let attribute of attributes) {
    if (attribute.type === 'JSXSpreadAttribute') {
      let attr = t.spreadElement(attribute.argument)

      props.push(attr)
    } else {
      let attr = t.objectProperty(
        t.identifier(attribute.name.name),
        evaluateAttribute(attribute),
        false,
        false
      )
      props.push(attr)
    }


  }

  let childs = t.objectProperty(
    t.identifier('children'),
    t.arrayExpression(children)
  )
  props.push(childs)
  return t.callExpression(
    t.memberExpression(
      t.identifier("Orbiton"),
      t.identifier("createComponent"),
      false
    ),
    [
      t.identifier(tag),
      t.objectExpression(
        [...props]
      ),
    ]
  )
}


/* function getJSXSpreadAttr(attr) {

} */
/**
* @param {Array} children -
*/
export function TransformToCreateElement(tag, attributes, events, children) {
  let attrs = []
  for (let attribute of attributes) {
    if (attribute.type === 'JSXSpreadAttribute') {
      let attr = t.spreadElement(attribute.argument)

      attrs.push(attr)
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
              [...attrs]
            ),
            false,
            false
          ),
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


