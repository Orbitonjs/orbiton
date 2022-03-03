// Add variable components
// Add functional Components
import Orbiton, { Component } from "orbiton"
import "../static/index.css"
import Logo from '../static/logo.png'
import Tasks from './Tasks'


class App extends Component {
  constructor(props, context) {
    super(props, context)
    this.state = {
      changed: false
    }
    this.click = this.click.bind(this)
  }
  click() {
    this.updateState({
      changed: !this.state.changed
    })
    //console.log(this.props.children)
  }
  render() {
    return (
      <div>
        {
          this.state.changed ? <div><SpanTwo>new render</SpanTwo></div> : <span><Span>old render</Span></span>}
        <button id="btn" onClick={this.click}>click me</button>
      </div>
    )
  }
}


class Span extends Component {
  constructor(props, context) {
    super(props, context)
    this.state = {
      stateOne: "This is state for first comp"
    }
  }
  render() {
    return (
      <div id="txt">
        {this.props.children}
      </div>
    )
  }
}

class SpanTwo extends Component {
  constructor(props, context) {
    super(props, context)
    this.state = {
      stateTwo: ""
    }
  }
  Mounted() {
    console.log(this.state)
  }
  render() {
    return (
      <span id="txt">
        {this.props.children}
      </span>
    )
  }
}
const root = document.createElement("div")
document.body.appendChild(root)

Orbiton.append(<div><App /></div>, root)

/* class Header extends Orbiton.Component {
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

const Containor = <div className="containor">
  <Tasks />
</div>

const App = <div >
  <Header />
  <Containor />
</div>

Orbiton.append(<div><App /></div>, document.getElementById('root'), () => console.log('App has mounted'))

export function Button(props) {
  return <button>HELLO</button>;
}
 */
