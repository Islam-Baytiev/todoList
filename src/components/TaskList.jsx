import React from 'react';
import { useSelector } from 'react-redux';

import Task from './Task';

const TaskList = () => {
  const todos = useSelector((state) => state.todoData.todos);
  const flag = useSelector((state) => state.todoData.flag);

  const getByFilter = () => {
    switch (flag) {
      case 'Completed':
        return todos.filter((element) => element.completed);
      case 'Active':
        return todos.filter((element) => !element.completed);
      default:
        return todos;
    }
  };
  const filtredTodo = getByFilter();
  return (
    <ul className="todo-list">
      {filtredTodo.map((todo) => (
        <Task key={todo.id} {...todo} />
      ))}
    </ul>
  );
};
export default TaskList;
