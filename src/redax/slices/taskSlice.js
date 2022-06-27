import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  todos: [],
  flag: 'All',
};

export const todoData = createSlice({
  name: 'todoData',
  initialState,
  reducers: {
    todoAdd: (state, action) => {
      state.todos.push({
        id: new Date().toISOString(),
        title: action.payload.title,
        completed: false,
        isEditing: false,
        time: new Date(),
        timered: { min: action.payload.min || '00', sec: action.payload.sec || '00' },
      });
    },
    todoRemove: (state, action) => {
      // eslint-disable-next-line no-param-reassign
      state.todos = state.todos.filter((todo) => todo.id !== action.payload.id);
    },
    todoCompleted: (state, action) => {
      const completedTodo = state.todos.find((todo) => todo.id === action.payload.id);
      completedTodo.completed = !completedTodo.completed;
    },
    todoIsEditing: (state, action) => {
      const editingTodo = state.todos.find((todo) => todo.id === action.payload.id);
      editingTodo.isEditing = !editingTodo.isEditing;
    },
    todoEdit: (state, action) => {
      const editTodo = state.todos.find((todo) => todo.id === action.payload.id);
      editTodo.isEditing = !editTodo.isEditing;
      editTodo.title = action.payload.title;
    },
    todoFilter: (state, action) => {
      // eslint-disable-next-line no-param-reassign
      state.flag = action.payload.text;
    },
    // eslint-disable-next-line no-unused-vars
    clearAll: (state, action) => {
      // eslint-disable-next-line no-param-reassign
      state.todos = [];
    },
  },
});

export const { todoAdd, todoRemove, todoCompleted, todoIsEditing, todoEdit, todoFilter, clearAll } = todoData.actions;

export default todoData.reducer;
