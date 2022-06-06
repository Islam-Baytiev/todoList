import React from 'react';
import './TaskList.css';
import Proptypes from 'prop-types';

import Task from '../Task';

const TaskList = ({ task, deleteItem, onToggleCompleted, editTodo, addItem, inputKeyDown }) => {
  const { id, completed } = task;
  return (
    <ul className="todo-list">
      <Task
        key={id}
        task={task}
        inputKeyDown={inputKeyDown}
        addItem={addItem}
        deleteItem={deleteItem}
        onToggleCompleted={onToggleCompleted}
        completed={completed}
        editTodo={editTodo}
        id={id}
      />
    </ul>
  );
};

TaskList.proptype = {
  task: Proptypes.arrayOf(
    Proptypes.shape({
      id: Proptypes.string.isRequired,
      label: Proptypes.string.isRequired,
      completed: Proptypes.bool.isRequired,
      edit: Proptypes.bool.isRequired,
      time: Proptypes.instanceOf(Date).isRequired,
    })
  ),
  del: Proptypes.func.isRequired,
  onToggleCompleted: Proptypes.func.isRequired,
  editTodo: Proptypes.func.isRequired,
};

export default TaskList;
