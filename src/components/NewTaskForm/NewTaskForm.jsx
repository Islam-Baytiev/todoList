import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import { todoAdd } from '../../redux/slices/taskSlice';

const NewTaskForm = () => {
  const dispatch = useDispatch();
  const [title, setTitle] = useState('');
  const [time, setTime] = useState({ min: '', sec: '' });

  const onChangeTime = (e) => {
    const { value, name } = e.target;
    if (value.trim() && !Number.isNaN(value) && +value <= 59 && +value >= 0) {
      setTime({ ...time, [name]: value });
    }
    if (!value.trim()) setTime({ ...time, [name]: '' });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { min, sec } = time;
    if (title.trim() && min.trim() && sec.trim()) {
      dispatch(todoAdd({ title, min, sec }));
      setTitle('');
      setTime({ min: '', sec: '' });
    }
  };

  return (
    <header className="header">
      <h1>todos</h1>
      <form className="new-todo-form" onSubmit={handleSubmit}>
        <input
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          className="new-todo"
          placeholder="Task"
        />
        <input className="new-todo-form__timer" placeholder="Min" value={time.min} name="min" onChange={onChangeTime} />
        <input className="new-todo-form__timer" placeholder="Sec" value={time.sec} name="sec" onChange={onChangeTime} />
        <button type="submit" hidden />
      </form>
    </header>
  );
};
export default NewTaskForm;
