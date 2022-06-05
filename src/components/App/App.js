import React, { Component } from 'react';
import './App.css';
import { v1 as uuid } from 'uuid';

import NewTaskForm from '../NewTaskForm';
import TaskList from '../TaskList';
import Footer from '../Footer';
import TaskFilter from '../TaskFilter';

export default class App extends Component {
  // eslint-disable-next-line react/sort-comp,react/state-in-constructor
  state = {
    todoData: [this.createNewEl('Completed task'), this.createNewEl('Editing task'), this.createNewEl('Active task')],
    flag: 'All',
  };

  // eslint-disable-next-line class-methods-use-this
  createNewEl(label) {
    return {
      id: uuid(),
      label,
      completed: false,
      edit: false,
      time: new Date(),
    };
  }

  // eslint-disable-next-line react/sort-comp
  addItem = (text) => {
    const newItem = this.createNewEl(text);
    this.setState(({ todoData }) => {
      const newArr = [...todoData, newItem];
      return {
        todoData: newArr,
      };
    });
  };

  inputKeyDown = (text, id, edit) => {
    const { todoData } = this.state;
    const newArr = todoData.map((element) => {
      if (element.id === id) {
        return { ...element, label: text, edit: !edit };
      }
      return element;
    });
    // eslint-disable-next-line no-unused-vars
    this.setState(({ todoData }) => {
      return {
        todoData: newArr,
      };
    });
  };

  editTodo = (id, edit) => {
    const { todoData } = this.state;
    const newArr = todoData.map((element) => {
      if (element.id === id) {
        return { ...element, edit: !edit };
      }
      return element;
    });
    // eslint-disable-next-line no-unused-vars
    this.setState(({ todoData }) => {
      return {
        todoData: newArr,
      };
    });
  };

  toggleProperty(id, property) {
    const { todoData } = this.state;
    return todoData.map((element) => {
      if (element.id === id) {
        return {
          ...element,
          [property]: !element[property],
        };
      }
      return element;
    });
  }

  deleteItem = (id) => {
    this.setState(({ todoData }) => {
      const idx = todoData.findIndex((el) => el.id === id);
      const before = todoData.slice(0, idx);
      const after = todoData.slice(idx + 1);
      const newArr = [...before, ...after];
      return {
        todoData: newArr,
      };
    });
  };

  onToggleCompleted = (id) => {
    // eslint-disable-next-line no-unused-vars
    this.setState(({ todoData }) => {
      return {
        todoData: this.toggleProperty(id, 'completed'),
      };
    });
  };

  onToggleFilter = (flag) => {
    this.setState({
      flag,
    });
  };

  getByFilter() {
    const { todoData, flag } = this.state;
    switch (flag) {
      case 'Completed':
        return todoData.filter((element) => element.completed);
      case 'Active':
        return todoData.filter((element) => !element.completed);
      default:
        return todoData;
    }
  }

  clearCompletedItem = () => {
    const { todoData } = this.state;
    this.setState({
      todoData: todoData.filter((task) => !task.completed),
    });
  };

  render() {
    const todos = this.getByFilter();
    const { flag } = this.state;
    const completedCount = todos.filter((element) => element.completed).length;
    const noCompletedCount = todos.length - completedCount;
    return (
      <section className="todoapp">
        <header className="header">
          <h1>todos</h1>
          <NewTaskForm addItem={this.addItem} />
        </header>
        <section className="main">
          {todos.map((task) => (
            <TaskList
              key={task.id}
              inputKeyDown={this.inputKeyDown}
              addItem={this.addItem}
              task={task}
              deleteItem={this.deleteItem}
              onToggleCompleted={this.onToggleCompleted}
              editTodo={this.editTodo}
            />
          ))}
          <footer className="footer">
            <Footer noCompletedCount={noCompletedCount} />
            <TaskFilter onToggleFilter={this.onToggleFilter} flag={flag} />
            <button type="button" className="clear-completed" onClick={this.clearCompletedItem}>
              Clear completed
            </button>
          </footer>
        </section>
      </section>
    );
  }
}
