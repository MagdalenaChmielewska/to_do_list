import React, { Component } from 'react';
import './TodoList.css';
import TodoElement from '../TodoElement/TodoElement'

const backend_uri = "https://todo-backend-sinatra.herokuapp.com/todos";

class TodoList extends Component {
  constructor() {
    super();

    this.state = {
      currentTask: "",
      todoList: []
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.addTask = this.addTask.bind(this);
  }


  fetchTasks() {
    return fetch(backend_uri)
      .then(result => result.json())
      .then(items => items.sort((a,b) => a.uid > b.uid))
      .then(items => this.setState({todoList: items})) 
  }
  
  componentDidMount() {
    this.fetchTasks()
  }

  addTask() {
    const currentTask = {
      title: this.state.currentTask,
      completed: false
    }

    fetch(backend_uri, {
        method: 'POST',
        body: JSON.stringify(currentTask)
      })
      .then(result => result.json())
      .then(task => this.setState({todoList: this.state.todoList.concat(task)}))
  }

  handleChange(event) {
    this.setState({currentTask: event.target.value});
  }

  handleSubmit(event) {
    event.preventDefault();
  }

  onTaskChange() {
    this.fetchTasks()
      .then(this.forceUpdate())
  }

  render() {
    return (
      <main>
        <div>
          <div className="main-all">
            <form id="main" onSubmit={this.handleSubmit}>
              <input id="task" placeholder="What needs to be done?" className="input-lg" autoFocus onChange={this.handleChange} />
              <input type="submit" id="add" className="btn btn-default btn-lg" value="Add" onClick={this.addTask}/>
              <div id="todos">
                {this.state.todoList.map(element => (
                   <TodoElement key={element.uid} task={element} onTaskChange={this.onTaskChange.bind(this)} />
                ))}
              </div>
            </form>
          </div>
          <div className="main-all counter-badge"></div>
          <div className="main-all" id="main-footer"></div>
      </div>
    </main>
    )
  }
}

export default TodoList;