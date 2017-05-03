import React, { Component } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import TodoList from '../TodoList/TodoList'

class App extends Component {
  header() {
    return (
     <header>
      <h1>ToDo List</h1>
    </header>
    )
  }

  footer() {
    return (
      <footer>
        <div className="text-muted">
          <hr/>
          <p className="footer-on-screen">Double-click to edit a task</p>
          <p className="footer-on-mobile">Touch the screen and swipe your finger a little to edit a task</p>
          <p>Created by Magda</p>
          <p>Copyright © Your Website 2017</p>
        </div>
      </footer>
    )
  }

  render() {
    return (
      <div className="App">
        {this.header()}
        <TodoList />
        {this.footer()}
      </div>
    );
  }
}

export default App;
