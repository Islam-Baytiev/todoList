import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { formatDistanceToNow } from 'date-fns';

import { todoCompleted, todoRemove, todoIsEditing, todoEdit } from '../../redux/slices/taskSlice';

const getPadTime = (time) => time.toString().padStart(2, '0');

const Task = ({ title, id, timered, completed, isEditing, time }) => {
  const { min, sec } = timered;
  const newSec = Number(min * 60) + Number(sec);
  const [timer, setTimer] = useState(newSec);
  const [isRunning, setIsRunning] = useState(false);
  const minutes = getPadTime(Math.floor(timer / 60));
  const seconds = getPadTime(timer - minutes * 60);

  useEffect(() => {
    const interval = setInterval(() => {
      isRunning && setTimer((timer) => (timer >= 1 ? timer - 1 : 0));
    }, 1000);
    return () => {
      clearInterval(interval);
    };
  }, [isRunning]);

  const onStartTimer = () => {
    setIsRunning(true);
  };

  const onPauseTimer = () => {
    setIsRunning(false);
  };

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
                <span
                  role="button"
                  tabIndex={0}
                  className="title"
                  onClick={() => {
                    onToogleComplete(id);
                    onPauseTimer();
                  }}
                >
                  {title}
                </span>
                <span className="description">
                  <button
                    type="button"
                    title="play"
                    className="icon icon-play"
                    onClick={onStartTimer}
                    disabled={completed}
                  />
                  <button
                    type="button"
                    title="pause"
                    className="icon icon-pause"
                    onClick={onPauseTimer}
                    disabled={completed}
                  />
                  {`${minutes}:${seconds}`}
                </span>
                <span className="description">
                  created
                  {` ${formatDistanceToNow(time, { includeSeconds: true })} `}
                  ago
                </span>
              </label>
              <button type="button" title="edit" className="icon icon-edit" onClick={() => onToogleEditing(id)} />
              <button type="button" title="destroy" onClick={() => onTaskRemove(id)} className="icon icon-destroy" />
            </>
          )}
        </div>
      </li>
    </div>
  );
};
export default Task;
