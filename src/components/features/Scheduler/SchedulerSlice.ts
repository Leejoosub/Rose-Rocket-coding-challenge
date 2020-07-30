import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppThunk, RootState } from "../../../app/store";
import {
  DriversMap,
  TaskDetails,
  Tasks,
} from "../../../models/Schedule/ScheduleModel";
import { DRIVER1, DRIVER2, DRIVER3 } from "../../../GlobalVar";
import { taskUpdateDetails } from "../../../models/EditTask/EditTaskModel";

interface SchedulerState {
  Drivers: DriversMap;
  currentWeek: number;
  currentDriver: string;
  downloadScheduleLength: number;
  scheduleConflict: boolean;
}

const initialState: SchedulerState = {
  Drivers: { [DRIVER1]: {}, [DRIVER2]: {}, [DRIVER3]: {} },
  currentDriver: DRIVER1,
  currentWeek: 1,
  downloadScheduleLength: 2,
  scheduleConflict: false,
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
    setScheduleConflict: (state, action: PayloadAction<boolean>) => {
      state.scheduleConflict = action.payload;
    },
    updateSchedule: (
      state,
      action: PayloadAction<{
        week: number;
        day: number;
        startHour: number;
        endHour: number;
        task: Tasks;
        location: string;
        additionalInfo?: string;
      }>
    ) => {
      const driverobj = state.Drivers[state.currentDriver];
      if (driverobj) {
        const weekObj = driverobj[action.payload.week];
        if (weekObj) {
          const dayObj = weekObj[action.payload.day];
          if (dayObj) {
            //loop through all of the hours in day obj
            for (let hour in dayObj) {
              //if there exists another start time as the one we passed in, then conflict
              if (parseInt(hour) === action.payload.startHour) {
                state.scheduleConflict = true;
                break;
              } else if (parseInt(hour) < action.payload.startHour) {
                // if there is a start time that starts before the passed in start time
                // and ends after the start time we request, conflict
                if (dayObj[hour].endHour > action.payload.startHour) {
                  state.scheduleConflict = true;
                  break;
                }
                //if there is a start time before our end time, conflict
              } else if (parseInt(hour) < action.payload.endHour) {
                state.scheduleConflict = true;
                break;
                //passed all the tests, no conflicting times
              }
            }
            // //if we break out of the for loop with conflicts
            if (!state.scheduleConflict) {
              dayObj[action.payload.startHour] = {
                endHour: action.payload.endHour,
                task: action.payload.task as Tasks,
                location: action.payload.location,
                additionalInfo: "",
              };
            }
            //if there is no day object, there is definitely no conflict
          } else {
            weekObj[action.payload.day] = {
              [action.payload.startHour]: {
                endHour: action.payload.endHour,
                task: action.payload.task as Tasks,
                location: action.payload.location,
                additionalInfo: "",
              },
            };
          }
          //no week object so definitely no conflict
        } else {
          driverobj[action.payload.week] = {
            [action.payload.day]: {
              [action.payload.startHour]: {
                endHour: action.payload.endHour,
                task: action.payload.task as Tasks,
                location: action.payload.location,
                additionalInfo: "",
              },
            },
          };
        }
      }
    },
    overWriteSchedule: (
      state,
      action: PayloadAction<{
        week: number;
        day: number;
        startHour: number;
        endHour: number;
        task: Tasks;
        location: string;
        additionalInfo?: string;
      }>
    ) => {
      const dayObj =
        state.Drivers[state.currentDriver][action.payload.week][
          action.payload.day
        ];
      //if we are overwriting, we know something exists at that path so no need for if checks
      //loop through and delete all conflicts
      for (let hour in dayObj) {
        //if there exists another start time as the one we passed in, then conflict
        if (parseInt(hour) === action.payload.startHour) {
          delete dayObj[hour];
        } else if (parseInt(hour) < action.payload.startHour) {
          // if there is a start time that starts before the passed in start time
          // and ends after the start time we request, conflict
          if (dayObj[hour].endHour > action.payload.startHour) {
            delete dayObj[hour];
          }
          //if there is a start time before our end time, conflict
        } else if (parseInt(hour) < action.payload.endHour) {
          delete dayObj[hour];
        }
      }
      //adding new task
      dayObj[action.payload.startHour] = {
        endHour: action.payload.endHour,
        task: action.payload.task as Tasks,
        location: action.payload.location,
        additionalInfo: "",
      };
    },
    deleteTask: (state, action: PayloadAction<taskUpdateDetails>) => {
      delete state.Drivers[state.currentDriver][action.payload.week][
        action.payload.day
      ][action.payload.startHour];
    },
  },
});

//ADD ALL ACTIONS HERE
export const {
  increaseWeek,
  decreaseWeek,
  changeDriver,
  changeDownloadSchedule,
  updateSchedule,
  setScheduleConflict,
  overWriteSchedule,
  deleteTask,
} = schedulerSlice.actions;

//ADD ALL GET VALUES HERE
export const selectWeek = (state: RootState) => state.scheduler.currentWeek;
export const selectDriver = (state: RootState) => state.scheduler.currentDriver;
export const selectSchedule = (state: RootState) => state.scheduler.Drivers;
export const selectScheduleConflict = (state: RootState) =>
  state.scheduler.scheduleConflict;

export default schedulerSlice.reducer;
