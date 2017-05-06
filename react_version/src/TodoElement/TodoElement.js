import React, { Component } from 'react';
import './TodoElement.css';

class TodoElement extends Component {
  constructor(props) {
    super(props);

    this.state = {
      editedTask: "",
      isEditing: false,
      taskCompleted: this.props.completed,
    };

    this.removeTask = this.removeTask.bind(this)
    this.changeStatus = this.changeStatus.bind(this)
    this.completeTask = this.completeTask.bind(this)
    this.uncompleteTask = this.uncompleteTask.bind(this)
    this.editingStarted = this.editingStarted.bind(this)
    this.editingFinished = this.editingFinished.bind(this)
    this.handleChange = this.handleChange.bind(this)
    
  }

  removeTask() {
    fetch(this.props.task.url, {
        method: 'DELETE'
      })
      .then(result => this.props.onTaskChange())
   }

  completeTask() {
    fetch(this.props.task.url, {
      method: "PATCH",
      "body": JSON.stringify({"completed": true})
    })
    .then(response => this.setState({taskCompleted: !this.state.taskCompleted}))
  } 

  uncompleteTask() {
    fetch(this.props.task.url, {
      method: "PATCH",
      "body": JSON.stringify({"completed": false})
    })
    .then(response => this.setState({taskCompleted: !this.state.taskCompleted}))
  }

  changeStatus() {
    if(this.state.taskCompleted) {
      this.uncompleteTask()
    } else {
      this.completeTask()
    }
  }
  
  handleChange(event) {
    this.setState({editedTask: event.target.value});
  }

  editingStarted() {
    this.setState({isEditing: true})
  }

  editingFinished() {
    fetch(this.props.task.url, {
      method: "PATCH",
      "body": JSON.stringify({title: this.state.editedTask})
    })
    .then(result => this.props.onTaskChange())
    

    this.setState({editedTask: ""});
    this.setState({isEditing: false})
  }

  render() {
    var content = null
    if(this.state.isEditing) {
      content = <input type="text" autoFocus id={this.props.task.uid} onBlur={this.editingFinished} onChange={this.handleChange} />
    } else {
      content = <label htmlFor="checkbox" id={this.props.task.uid} className="edit" onDoubleClick={this.editingStarted}>{this.props.task.title}</label>  
    }
  
    return (
      <div className="input-group style">
        <span className="input-group">
          <input type="checkbox" id={this.props.task.uid} onClick={this.changeStatus} checked={this.state.taskCompleted} />
          {content}   
          </span>
        <span className="input-group-btn">
          <button aria-label="Close" className="close remove" id={this.props.task.uid} onClick={this.removeTask}>
            <span aria-hidden="true">×</span>
          </button>
        </span>
      </div>
    )
  }
}

export default TodoElement;

