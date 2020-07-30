import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import counterReducer from '../components/features/counter/counterSlice';
import schedulerReducer from '../components/features/Scheduler/SchedulerSlice';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    scheduler: schedulerReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
