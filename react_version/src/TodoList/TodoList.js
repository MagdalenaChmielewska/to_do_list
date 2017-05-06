import React, { Component } from 'react';
import './TodoList.css';
import TodoElement from '../TodoElement/TodoElement'

const backend_uri = "https://todo-backend-sinatra.herokuapp.com/todos";

class TodoList extends Component {
  constructor() {
    super();

    this.state = {
      currentTask: "",
      todoList: [],
      displayedTodoList: []
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    
    this.unCompletedTasks = this.unCompletedTasks.bind(this);
    this.completedTasks = this.completedTasks.bind(this);
    
    this.showAll = this.showAll.bind(this);
    this.showCompleted = this.showCompleted.bind(this);
    this.showUncompleted = this.showUncompleted.bind(this);

    this.addTask = this.addTask.bind(this);

    this.selectAll = this.selectAll.bind(this);
    this.onTaskChange = this.onTaskChange.bind(this);
    this.deselectAll = this.deselectAll.bind(this);
    this.clearCompleted = this.clearCompleted.bind(this);
    this.uncompleteTask = this.uncompleteTask.bind(this);
    this.completeTask = this.completeTask.bind(this);
    this.removeTask = this.removeTask.bind(this);
  }

  fetchTasks() {
    return fetch(backend_uri)
      .then(result => result.json())
      .then(items => items.sort((a,b) => a.uid > b.uid))
      .then(items => {
        this.setState({todoList: items})
      }) 
  }

  unCompletedTasks() {
    return this.state.todoList.filter(task => task.completed == false)
  }

  completedTasks() {
    return this.state.todoList.filter(task => task.completed == true)
  }

  showAll() {
    this.setState({displayedTodoList: this.state.todoList})
  }

  showCompleted() {
    this.setState({displayedTodoList: this.completedTasks()})
  }

  showUncompleted() {
    this.setState({displayedTodoList: this.unCompletedTasks()})
  }

// ROBIE SOBIE KRZYWDE !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  removeTask(url) {
    return fetch(url, {
        method: 'DELETE'
      })
  }

  completeTask(url) {
    return fetch(url, {
      method: "PATCH",
      "body": JSON.stringify({"completed": true})
    })
  } 

  uncompleteTask(url) {
    return fetch(url, {
      method: "PATCH",
      "body": JSON.stringify({"completed": false})
    })
  }

  clearCompleted() {
    const promises = this.completedTasks().map(task => this.removeTask(task.url))

    Promise
      .all(promises)
      .then(result => this.onTaskChange())
  }

  selectAll() {
    const promises = this.unCompletedTasks().map(task => this.completeTask(task.url))
    Promise
      .all(promises)
      .then(result => this.onTaskChange())
  }

  deselectAll() {
    const promises = this.completedTasks().map(task => this.uncompleteTask(task.url))

    Promise
      .all(promises)
      .then(result => this.onTaskChange())
  }

// ROBIE SOBIE KRZYWDE !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! - KONIEC

  componentDidMount() {
    this.fetchTasks()
      .then(x => {
        this.setState({displayedTodoList: this.state.todoList})
      })

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
      .then(result => this.onTaskChange())
  }

  handleChange(event) {
    this.setState({currentTask: event.target.value});
  }

  handleSubmit(event) {
    event.preventDefault();
  }

  onTaskChange() {
    return this.fetchTasks()
      .then(x => this.setState({displayedTodoList: this.state.todoList}))
      .then(x => this.forceUpdate())
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
                {this.state.displayedTodoList.map(element => (
                   <TodoElement key={element.uid} task={element} completed={element.completed} onTaskChange={this.onTaskChange.bind(this)} />
                ))}
              </div>
            </form>
          </div>
          <div className="main-all counter-badge">
            <p className="pull-right"><span className="badge" id="counter">{this.unCompletedTasks().length}</span> items left</p>
          </div>
          <div className="main-all" id="main-footer">
            <div className="select-button-group">
              <div id="selectAll" className="select-button" onClick={this.selectAll}>
                <a title="Select All">
                  <img src="img/select.png" alt="select-all" />
                  <center>Select All</center>
                </a>
              </div>
              <div id="deselectAll" className="select-button" onClick={this.deselectAll}>
                <a title="Deselect All">
                  <img src="img/select.png" alt="deselect-all" className="deselect-all" />
                  <center>Deselect All</center>
                </a>
              </div>
            </div>
            <div>
              <div className="filter-buttons-group">
                <p className="active filterButton" id="allFilter" onClick={this.showAll} >All</p>
                <p className="filterButton" id="activeFilter" onClick={this.showUncompleted} >Active</p>
                <p className="filterButton" id="completedFilter" onClick={this.showCompleted} >Completed</p>
              </div>
              <div className="button-clear-completed">
                <p className="btn btn-default" id="completedRemove" onClick={this.clearCompleted}>Clear Completed</p>
              </div>
            </div>
          </div>
      </div>
    </main>
    )
  }
}

export default TodoList;