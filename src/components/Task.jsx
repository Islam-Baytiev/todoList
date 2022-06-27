import React, { useState, useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { formatDistanceToNow } from 'date-fns';

import { todoCompleted, todoRemove, todoIsEditing, todoEdit } from '../redax/slices/taskSlice';

function useInterval(callback, delay) {
  const savedCallback = useRef();

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // eslint-disable-next-line consistent-return
  useEffect(() => {
    function tick() {
      savedCallback.current();
    }
    if (delay !== null) {
      const id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
}

const Task = ({ title, id, timered, completed, isEditing, time }) => {
  const { min, sec } = timered;
  const [timer, setTimer] = useState({ min, sec });
  const [isRunning, setIsRunning] = useState(false);

  const stepping = (field) => {
    let step = +timer[field] + 1;
    step = step < 10 ? `0${step}` : step;
    return step;
  };

  const onStartTimer = () => {
    setIsRunning(true);
  };

  const onPauseTimer = () => {
    setIsRunning(false);
  };

  useInterval(
    () => {
      if (timer.sec < 59) {
        const seconds = stepping('sec');
        setTimer({ ...timer, sec: seconds });
      } else if (timer.min < 59) {
        const minutes = stepping('min');
        setTimer({ min: minutes, sec: '00' });
      }
    },
    isRunning ? 1000 : null
  );
  const [value, setValue] = useState(title);
  const dispatch = useDispatch();

  const onTaskRemove = (id) => {
    dispatch(todoRemove({ id }));
  };
  const onToogleEditing = (id) => {
    dispatch(todoIsEditing({ id }));
  };
  const editTodo = (event, id, title) => {
    if (event.key === 'Enter' && title.trim()) {
      dispatch(todoEdit({ id, title }));
    }
  };
  const onToogleComplete = (id) => {
    dispatch(todoCompleted({ id }));
  };

  let listClass = '';
  if (completed) {
    listClass = 'completed';
  }

  return (
    <div>
      <li className={listClass}>
        <div className="view">
          {isEditing === true ? (
            <label>
              <input
                ref={(input) => input && input.focus()}
                className="editInput"
                onChange={(event) => setValue(event.target.value)}
                value={value}
                onKeyDown={(event) => editTodo(event, id, value)}
              />
            </label>
          ) : (
            <>
              <input
                className="toggle"
                type="checkbox"
                checked={completed}
                onChange={() => {
                  onToogleComplete(id);
                  onPauseTimer();
                }}
              />
              <label>
                {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions */}
                <span
                  className="title"
                  onClick={() => {
                    onToogleComplete(id);
                    onPauseTimer();
                  }}
                >
                  {title}
                </span>
                <span className="description">
                  <button type="button" className="icon icon-play" onClick={onStartTimer} disabled={completed} />
                  <button type="button" className="icon icon-pause" onClick={onPauseTimer} disabled={completed} />
                  {`${timer.min}:${timer.sec}`}
                </span>
                <span className="description">
                  created
                  {` ${formatDistanceToNow(time, { includeSeconds: true })} `}
                  ago
                </span>
              </label>
              <button type="button" className="icon icon-edit" onClick={() => onToogleEditing(id)} />
              <button type="button" onClick={() => onTaskRemove(id)} className="icon icon-destroy" />
            </>
          )}
        </div>
      </li>
    </div>
  );
};
export default Task;
