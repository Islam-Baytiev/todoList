import React, { Component } from 'react';
import Proptypes from 'prop-types';
import './Task.css';
import { formatDistanceToNow } from 'date-fns';

export default class Task extends Component {
  // eslint-disable-next-line react/state-in-constructor
  state = {
    // eslint-disable-next-line react/destructuring-assignment
    value: this.props.task.label,
  };

  onInputChange = (event) => {
    this.setState({
      value: event.target.value,
    });
  };

  oKeyDown = (event, id) => {
    const { inputKeyDown, task } = this.props;
    const { value } = this.state;
    const { edit } = task;
    if (event.key === 'Enter' && value.trim()) {
      inputKeyDown(value, id, edit);
    }
  };

  render() {
    const { task, deleteItem, onToggleCompleted, editTodo } = this.props;
    const { value } = this.state;
    const { edit, label, time, id, completed } = task;
    let listClass = '';
    if (completed) {
      listClass = 'completed';
    }
    return (
      <li className={listClass} key={id}>
        <div className="view">
          {edit === true ? (
            <label>
              <input
                ref={(input) => input && input.focus()}
                className="editInput"
                onChange={this.onInputChange}
                value={value}
                onKeyDown={(event) => this.oKeyDown(event, id)}
              />
            </label>
          ) : (
            <div>
              <input className="toggle" checked={completed} type="checkbox" onChange={() => onToggleCompleted(id)} />
              <label>
                {/* eslint-disable-next-line jsx-a11y/no-static-element-interactions,jsx-a11y/click-events-have-key-events */}
                <span className="description" onClick={() => onToggleCompleted(id)}>
                  {label}
                </span>
                <span className="created">
                  created
                  {` ${formatDistanceToNow(time, { includeSeconds: true })} `}
                  ago
                </span>
              </label>
              <button
                type="button"
                title="редактировать"
                className="icon icon-edit"
                onClick={() => editTodo(id, edit)}
              />
              <button type="button" title="удалить" className="icon icon-destroy" onClick={() => deleteItem(id)} />
            </div>
          )}
        </div>
      </li>
    );
  }
}

Task.proptype = {
  task: Proptypes.shape({
    id: Proptypes.string.isRequired,
    label: Proptypes.string.isRequired,
    completed: Proptypes.bool.isRequired,
    edit: Proptypes.bool.isRequired,
    time: Proptypes.instanceOf(Date).isRequired,
  }).isRequired,
  del: Proptypes.func.isRequired,
  onToggleCompleted: Proptypes.func.isRequired,
  editTodo: Proptypes.func.isRequired,
};
