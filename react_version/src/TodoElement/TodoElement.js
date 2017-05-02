import React, { Component } from 'react';
import './TodoElement.css';

class TodoElement extends Component {
  render() {
    return (
      <div className="input-group style">
        <span className="input-group">
          <input type="checkbox" id={this.props.task.order} />
          <label htmlFor="checkbox" id={this.props.task.order} className="edit">{this.props.task.title}</label>
          <input className="edit-input" id={this.props.task.order} />
        </span>
        <span className="input-group-btn">
          <button aria-label="Close" className="close remove" id={this.props.task.order}>
            <span aria-hidden="true">×</span>
          </button>
        </span>
      </div>
    )
  }
}

export default TodoElement;

