import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppThunk, RootState } from "../../../app/store";
import {
  DriversMap,
  TaskDetails,
} from "../../../models/Schedule/ScheduleModel";
import { DRIVER1, DRIVER2, DRIVER3 } from "../../../GlobalVar";

interface SchedulerState {
  // Drivers: DriversMap;
  Drivers: DriversMap;
  currentWeek: number;
}

const initialState: SchedulerState = {
  Drivers: { [DRIVER1]: {}, [DRIVER2]: {}, [DRIVER3]: {} },

  currentWeek: 1,
};

export const schedulerSlice = createSlice({
  name: "scheduler",
  initialState,
  reducers: {
    increaseWeek: (state) => {
      if (state.currentWeek < 52) state.currentWeek += 1;
    },
    decreaseWeek: (state) => {
      if (state.currentWeek > 1) {
        state.currentWeek -= 1;
      }
    },
  },
});

//ADD ALL ACTIONS HERE
export const { increaseWeek, decreaseWeek } = schedulerSlice.actions;

//ADD ALL GET VALUES HERE
export const selectWeek = (state: RootState) => state.scheduler.currentWeek;

export default schedulerSlice.reducer;
