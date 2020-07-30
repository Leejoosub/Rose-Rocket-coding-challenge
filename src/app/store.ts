import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import counterReducer from '../components/features/counter/counterSlice';
import schedulerReducer from '../components/features/Scheduler/SchedulerSlice';
import addTaskReducer from '../components/features/AddTask/addTaskSlice';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    scheduler: schedulerReducer,
    addTask: addTaskReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
