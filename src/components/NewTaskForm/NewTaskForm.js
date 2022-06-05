import React, { Component } from 'react';
import './NewTaskForm.css';

export default class NewTaskForm extends Component {
  // eslint-disable-next-line react/state-in-constructor
  state = {
    label: '',
  };

  onLabelChange = (event) => {
    this.setState({
      label: event.target.value,
    });
  };

  onKeyDown = (event) => {
    const { addItem } = this.props;
    const { label } = this.state;
    if (event.key === 'Enter' && label.trim()) {
      addItem(label);
      this.setState({
        label: '',
      });
    }
  };

  render() {
    const { label } = this.state;
    return (
      <label>
        <input
          className="new-todo"
          placeholder="What needs to be done?"
          onChange={this.onLabelChange}
          onKeyDown={this.onKeyDown}
          value={label}
        />
      </label>
    );
  }
}
