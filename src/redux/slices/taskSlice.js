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
      state.flag = action.payload.text;
    },
    clearAll: (state) => {
      state.todos = state.todos.filter((todo) => !todo.completed);
    },
  },
});

export const { todoAdd, todoRemove, todoCompleted, todoIsEditing, todoEdit, todoFilter, clearAll } = todoData.actions;

export default todoData.reducer;
