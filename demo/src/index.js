// Add variable components
// Add functional Components
import Orbiton from 'orbiton'
import { App } from './App'

Orbiton.hydrate(<App />, document.getElementById('root'), () => console.log('App has mounted'))


