import Orbiton from "orbiton"
import DB from '../static/db.json'

class Tasks extends Orbiton.Component {
  constructor(props, context) {
    super(props, context)
    this.state = {
      tasks: []
    }
    //this.Fetch = this.Fetch.bind(this)
  }
  Mounted() {
    fetch(DB).then(resp => resp.json())
      .then(data => {
        setTimeout(() => {
          this.updateState({
            tasks: data
          })
        }, 5000);

      })
  }
  render() {
    return (
    <div className="taskss">
      <Orbiton.Fragment>
      {this.state.tasks.length === 0 ? <div className="fetchtasks">Loading...</div> : <div className="tasks">
        {this.state.tasks.map((task) => <Task title={task.title} description={task.description} time={task.time} />)}</div>}
        </Orbiton.Fragment>
    </div>
    )
  }
}

class Task extends Orbiton.Component {
  constructor(props, context) {
    super(props, context)
    this.state = {
      task: this.props,
      isEditing: false
    }
  }
  render() {
    return (
      <div className="task">
        <div className="tasktitle">{this.props.title}</div>
        <div className="taskdesc">{this.props.description.slice(0, 40) + "..."}</div>
        <div className="time">{this.props.time}</div>
        <div className="taskactions"></div>
      </div>
    )
  }
}

export default Tasks
