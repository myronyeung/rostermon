import { configureStore } from '@reduxjs/toolkit';
import monsterReducer from '../features/monsterSlice';

export const store = configureStore({
  reducer: {
    monster: monsterReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
