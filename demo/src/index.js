// Add variable components
// Add functional Components
import Orbiton from '@pearl-js/pearl'
import Tasks from './Tasks'

class Header extends Orbiton.Component {
  constructor(props, context) {
    super(props, context)
  }
  render() {
    return <nav>
      <div className="logo">
        <img src="/logo.png" alt="logo" />
      </div>
      <div className="heading">Todo App</div>
      <div className="addtodo"><span className="add">+</span></div>
    </nav>
  }
}

const Containor = <div className="containor">
  <Tasks />
</div>

const App = <div >
  <Header />
  <Containor />
</div>



Orbiton.append(App, document.getElementById('root'), () => console.log('App has mounted'))
