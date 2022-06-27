import { configureStore } from '@reduxjs/toolkit';

import todoData from './slices/taskSlice';

// eslint-disable-next-line import/prefer-default-export
export const store = configureStore({
  reducer: {
    todoData,
  },
});
