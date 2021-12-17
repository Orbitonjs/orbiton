const renderer = `
import { h } from 'generic-implementation'

const mdx = (function (createElement) {
  return function (name, props, ...children) {
    if (typeof name === 'string') {
      if (name === 'wrapper') return children.map(createElement)
      if (name === 'inlineCode') return createElement('code', props, ...children)
    }

    return createElement(name, props, ...children)
  }
}(h))
`
