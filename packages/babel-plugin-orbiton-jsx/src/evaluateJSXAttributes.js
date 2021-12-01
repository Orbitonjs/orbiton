
function evaluateNode(node) {
  let attribute = {
    attribute: {},
    type: ''
  }
  const isEventRegex = /^on/;

  const isEvent = isEventRegex.test(node.name.name)
  if (isEvent) {
    attribute.type = 'Event'
  } else {
    attribute.type = 'attribute'
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

