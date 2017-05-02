import React, { Component } from 'react';
import './TodoList.css';
import TodoElement from '../TodoElement/TodoElement'

class TodoList extends Component {
  constructor() {
    super();

    this.state = {
      currentTask: "",
      todoList: [
        {order: 1, title: 'create todo list1', completed: false},
        {order: 2, title: 'create todo list2', completed: false},
        {order: 3, title: 'create todo list3', completed: false}
      ],
      count: 3
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.addTask = this.addTask.bind(this);
  }

  addTask() {
    const order = this.state.count + 1
    const currentTask = {
      order: order,
      title: this.state.currentTask,
      completed: false
    }

    this.setState({todoList: this.state.todoList.concat(currentTask)})
  }

  handleChange(event) {
    this.setState({currentTask: event.target.value});
  }

  handleSubmit(event) {
    event.preventDefault();
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
                   <TodoElement key={element.order} task={element}/>
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

