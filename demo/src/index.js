// Add variable components
// Add functional Components
import Orbiton from 'orbiton'
import { App } from './App'

Orbiton.append(App, document.getElementById('root'), () => console.log('App has mounted'))


console.log(Orbiton)
