// Add variable components
// Add functional Components
import Orbiton from 'orbiton'
import { App } from './App'

Orbiton.append(<div><App /></div>, document.getElementById('root'), () => console.log('App has mounted'))

export function Button(props) {
  return <button>HELLO</button>;
}

