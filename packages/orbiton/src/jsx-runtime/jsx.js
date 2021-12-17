import Orbiton from 'orbiton';

export function createFromJSX(tag, props) {
  if (typeof tag === 'string') {
    return Orbiton.createElement(tag, props)
  }

  return Orbiton.createComponent(tag, props)
}


