// Add variable components
// Add functional Components
import Orbiton from "orbiton"
import "../static/index.css"
import Logo from '../static/logo.png'
import Markdown from './index.mdx'
import Tasks from './Tasks'

class Header extends Orbiton.Component {
  constructor(props, context) {
    super(props, context)
  }
  render() {
    return <nav>
      <div className="logo">
        <img src={Logo} alt="logo" />
      </div>
      <div className="heading">Todo App</div>
      <div className="addtodo"><span className="add">+</span></div>
    </nav>
  }
}
console.log(Markdown)
const Containor = <div className="containor">
  <Tasks />
  <Markdown />
</div>

const App = <div >
  <Header />
  <Containor />
</div>

console.log(App)

Orbiton.append(App, document.getElementById('root'), () => console.log('App has mounted'))

export function Button(props) {
  return <button>HELLO</button>;
}
