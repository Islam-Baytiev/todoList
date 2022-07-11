import { configureStore } from '@reduxjs/toolkit';

import todoData from './slices/taskSlice';

export const store = configureStore({
  reducer: {
    todoData,
  },
});
