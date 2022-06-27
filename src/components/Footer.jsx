import { useSelector } from 'react-redux';

import TaskFilter from './TaskFilter';

const Footer = () => {
  const tasks = useSelector((state) => state.todoData.todos);
  const leftTasks = tasks.filter((task) => !task.completed).length;
  return (
    <footer className="footer">
      <span className="todo-count">{leftTasks} items left</span>
      <TaskFilter />
    </footer>
  );
};
export default Footer;
