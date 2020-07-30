import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppThunk, RootState } from "../../../app/store";

interface SchedulerState {
  test: string
}

const initialState: SchedulerState = {
  test: 'hi'
};

export const schedulerSlice = createSlice({
  name: "scheduler",
  initialState,
  reducers: {
    changeTest: (state, action: PayloadAction<string>) => {
      state.test = action.payload
    }
  },
});

//ADD ALL ACTIONS HERE
export const {changeTest} = schedulerSlice.actions;

//ADD ALL GET VALUES HERE
export const selectSOMETHING = (state: RootState) => state.scheduler.test;


export default schedulerSlice.reducer;
