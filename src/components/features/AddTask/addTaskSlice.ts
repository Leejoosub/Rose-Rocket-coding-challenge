import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppThunk, RootState } from "../../../app/store";
import { Tasks } from "../../../models/Schedule/ScheduleModel";
import { useDispatch } from "react-redux";
import { setScheduleConflict } from "../Scheduler/SchedulerSlice";
import {
  editTaskType,
  taskUpdateDetails,
} from "../../../models/EditTask/EditTaskModel";

/**********************************************************************
 * I have changed the functionality of this feature to the edit task feature.
 * I will change the name later if possilbe, but to save time and avoid running
 * into errors, I shall leave the name for now
 ***********************************************************************/

interface AddTaskState {
  week: number;
  day: number;
  startHour: number;
  endHour: number;
  location: string;
  task: Tasks;
  showModal: boolean;
  editTaskType: editTaskType;
  updateDetails: taskUpdateDetails | null;
}

const initialState: AddTaskState = {
  week: 1,
  day: 1,
  startHour: 0,
  endHour: 1,
  task: "other",
  showModal: false,
  location: "",
  editTaskType: "update",
  updateDetails: null,
};

export const AddTaskSlice = createSlice({
  name: "addTask",
  initialState,
  reducers: {
    setAddTaskWeek: (state, action: PayloadAction<number>) => {
      const week = action.payload;
      if (week > 0 && week <= 52) state.week = week;
    },
    setAddTaskDay: (state, action: PayloadAction<number>) => {
      const day = action.payload;
      //0 = sunday, 6 = saturday
      if (day >= 0 && day <= 6) state.day = day;
    },
    setAddTaskStartHour: (state, action: PayloadAction<number>) => {
      const startHour = action.payload;
      // start hour cant be 24 because that would take them into the next day
      if (startHour >= 0 && startHour <= 23) {
        state.startHour = startHour;
        if (state.startHour >= state.endHour)
          state.endHour = state.startHour + 1;
      }
    },
    setAddTaskEndHour: (state, action: PayloadAction<number>) => {
      const endHour = action.payload;
      // end hour cant be 0 (12am) because that would mean they started the previous day
      if (endHour >= 1 && endHour <= 24) state.endHour = endHour;
    },
    setAddTaskTask: (state, action: PayloadAction<Tasks>) => {
      state.task = action.payload;
    },
    setAddTaskShowModal: (state, action: PayloadAction<boolean>) => {
      //if  the modal is closed, reset updateDetails
      if (action.payload === false) state.updateDetails = null;
      state.showModal = action.payload;
    },
    setAddTaskLocation: (state, action: PayloadAction<string>) => {
      state.location = action.payload;
    },
    setEditTaskType: (state, action: PayloadAction<editTaskType>) => {
      state.editTaskType = action.payload;
    },
    setUpdateDetails: (state, action: PayloadAction<taskUpdateDetails>) => {
      state.updateDetails = action.payload;
    },
    openTaskModalWithNewValues: (
      state,
      action: PayloadAction<{
        modalTaskType: editTaskType;
        week: number;
        day: number;
        startHour: number;
        endHour: number;
        showModal: boolean;
        location: string;
        task: Tasks;
        updateDetails?: taskUpdateDetails;
      }>
    ) => {
      const {
        modalTaskType,
        week,
        day,
        startHour,
        endHour,
        showModal,
        updateDetails,
        location,
        task,
      } = action.payload;
      state.editTaskType = modalTaskType;
      state.week = week;
      state.day = day;
      state.startHour = startHour;
      state.endHour = endHour;
      state.showModal = showModal;
      state.location = location;
      state.task = task;
      if (modalTaskType === "update" && updateDetails)
        state.updateDetails = updateDetails;
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
  setAddTaskLocation,
  setEditTaskType,
  setUpdateDetails,
  openTaskModalWithNewValues,
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
export const selectAddTaskLocation = (state: RootState) =>
  state.addTask.location;
export const selectEditTaskType = (state: RootState) =>
  state.addTask.editTaskType;
export const selectUpdateDetails = (state: RootState) =>
  state.addTask.updateDetails;

export default AddTaskSlice.reducer;
