import { useDispatch, useSelector } from 'react-redux';

import { todoFilter, clearAll } from '../../redux/slices/taskSlice';

const TaskFilter = () => {
  const filters = ['All', 'Completed', 'Active'];
  const dispatch = useDispatch();
  const flag = useSelector((state) => state.todoData.flag);
  const onToogleFilter = (text) => {
    dispatch(todoFilter({ text }));
  };
  const clearTask = () => {
    dispatch(clearAll());
  };

  return (
    <>
      <ul className="filters">
        {filters.map((filter) => (
          <li key={filter}>
            <button
              type="button"
              aria-label={filter}
              className={flag === filter ? 'selected' : ''}
              onClick={(event) => onToogleFilter(event.target.textContent)}
            >
              {filter}
            </button>
          </li>
        ))}
      </ul>
      <button type="button" aria-label="clear-completed" onClick={clearTask} className="clear-completed">
        Clear completed
      </button>
    </>
  );
};
export default TaskFilter;
