import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppThunk, RootState } from "../../../app/store";
import {
  DriversMap,
  TaskDetails,
} from "../../../models/Schedule/ScheduleModel";
import { DRIVER1, DRIVER2, DRIVER3 } from "../../../GlobalVar";

interface SchedulerState {
  Drivers: DriversMap;
  currentWeek: number;
  currentDriver: string;
  downloadScheduleLength: number;
}

const initialState: SchedulerState = {
  Drivers: { [DRIVER1]: {}, [DRIVER2]: {}, [DRIVER3]: {} },
  currentDriver: DRIVER1,
  currentWeek: 1,
  downloadScheduleLength: 2,
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
    changeDriver: (state, action: PayloadAction<string>) => {
      state.currentDriver = action.payload;
    },
    changeDownloadSchedule: (state, action: PayloadAction<number>) => {
      state.downloadScheduleLength = action.payload;
    },
  },
});

//ADD ALL ACTIONS HERE
export const {
  increaseWeek,
  decreaseWeek,
  changeDriver,
  changeDownloadSchedule,
} = schedulerSlice.actions;

//ADD ALL GET VALUES HERE
export const selectWeek = (state: RootState) => state.scheduler.currentWeek;
export const selectDriver = (state: RootState) => state.scheduler.currentDriver;

export default schedulerSlice.reducer;
