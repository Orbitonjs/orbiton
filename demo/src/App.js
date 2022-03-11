import Orbiton, { Component } from "orbiton"
import "../static/index.css"
//import Logo from '../static/logo.png'
import Tasks from './Tasks'



class Header extends Orbiton.Component {
  constructor(props, context) {
    super(props, context)
  }
  Mounted() {
    document.title = "Todo"
  }
  render() {
    return <nav>
      <div className="logo">
        <img src='/' alt="logo" />
      </div>
      <div className="heading">Todo App</div>
      <div className="addtodo"><span className="add">+</span></div>
    </nav>
  }
}

const Containor = <div className="containor">
  <Tasks />
</div>

export const App = <div >
  <Header />
  <Containor />
</div>
