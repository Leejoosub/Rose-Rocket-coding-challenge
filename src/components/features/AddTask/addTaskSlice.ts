import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppThunk, RootState } from "../../../app/store";
import { Tasks } from "../../../models/Schedule/ScheduleModel";

interface AddTaskState {
  week: number;
  day: number;
  startHour: number;
  endHour: number;
  task: Tasks;
  showModal: boolean;
}

const initialState: AddTaskState = {
  week: 1,
  day: 1,
  startHour: 0,
  endHour: 1,
  task: "other",
  showModal: false,
};

export const AddTaskSlice = createSlice({
  name: "addTask",
  initialState,
  reducers: {
    setAddTaskWeek: (state, action: PayloadAction<number>) => {
      console.log("week: ", action.payload);
      const week = action.payload;
      if (week > 0 && week <= 52) state.week = week;
    },
    setAddTaskDay: (state, action: PayloadAction<number>) => {
      console.log("Day: ", action.payload);
      const day = action.payload;
      //0 = sunday, 8 = saturday
      if (day >= 0 && day <= 6) state.day = day;
    },
    setAddTaskStartHour: (state, action: PayloadAction<number>) => {
      console.log("start hour: ", action.payload);
      const startHour = action.payload;
      // start hour cant be 24 because that would take them into the next day
      if (startHour >= 0 && startHour <= 23) {
        state.startHour = startHour;
        if (state.startHour >= state.endHour)
          state.endHour = state.startHour + 1;
      }
    },
    setAddTaskEndHour: (state, action: PayloadAction<number>) => {
      console.log("end hour: ", action.payload);
      const endHour = action.payload;
      // end hour cant be 0 (12am) because that would mean they started the previous day
      if (endHour >= 1 && endHour <= 24) state.endHour = endHour;
    },
    setAddTaskTask: (state, action: PayloadAction<Tasks>) => {
      console.log("task: ", action.payload);
      state.task = action.payload;
    },
    setAddTaskShowModal: (state, action: PayloadAction<boolean>) => {
      state.showModal = action.payload;
    },
  },
});

//actions
export const {
  setAddTaskWeek,
  setAddTaskDay,
  setAddTaskStartHour,
  setAddTaskEndHour,
  setAddTaskTask,
  setAddTaskShowModal,
} = AddTaskSlice.actions;

//getters
export const selectAddTaskWeek = (state: RootState) => state.addTask.week;
export const selectAddTaskDay = (state: RootState) => state.addTask.day;
export const selectAddTaskStartHour = (state: RootState) =>
  state.addTask.startHour;
export const selectAddTaskEndHour = (state: RootState) => state.addTask.endHour;
export const selectAddTaskTask = (state: RootState) => state.addTask.task;
export const selectAddTaskShowModal = (state: RootState) =>
  state.addTask.showModal;

export default AddTaskSlice.reducer;
