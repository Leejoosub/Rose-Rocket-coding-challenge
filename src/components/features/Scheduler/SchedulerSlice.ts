import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppThunk, RootState } from "../../../app/store";
import {
  DriversMap,
  TaskDetails,
  Tasks,
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
    updateSchedule: (
      state,
      action: PayloadAction<{
        week: number;
        day: number;
        startHour: number;
        endHour: number;
        task: Tasks;
        additionalInfo?: string;
      }>
    ) => {
      console.log("hi", action.payload);
      let conflicts = false;
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
                console.log("conflicting times same time");
                conflicts = true;
                break;
              } else if (parseInt(hour) < action.payload.startHour) {
                // if there is a start time that starts before the passed in start time
                // and ends after the start time we request, conflict
                if (dayObj[hour].endHour > action.payload.startHour) {
                  console.log("conflicting times start hour");
                  conflicts = true;
                  break;
                }
                //if there is a start time before our end time, conflict
              } else if (parseInt(hour) < action.payload.endHour) {
                console.log("conflicint times end hour");
                conflicts = true;
                break;
                //passed all the tests, no conflicting times
              }
            }
            // //if we break out of the for loop with conflicts
            if (!conflicts) {
              console.log("no conflicts!");
              dayObj[action.payload.startHour] = {
                endHour: action.payload.endHour,
                task: action.payload.task as Tasks,
                location: "",
                additionalInfo: "",
              };
            }
            //if there is no day object, there is definitely no conflict
          } else {
            console.log("no day obj");
            weekObj[action.payload.day] = {
              [action.payload.startHour]: {
                endHour: action.payload.endHour,
                task: action.payload.task as Tasks,
                location: "",
                additionalInfo: "",
              },
            };
          }
          //no week object so definitely no conflict
        } else {
          console.log("no week obj");
          driverobj[action.payload.week] = {
            [action.payload.day]: {
              [action.payload.startHour]: {
                endHour: action.payload.endHour,
                task: action.payload.task as Tasks,
                location: "",
                additionalInfo: "",
              },
            },
          };
        }
      } else {
        console.log("error no driver");
      }
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
} = schedulerSlice.actions;

//ADD ALL GET VALUES HERE
export const selectWeek = (state: RootState) => state.scheduler.currentWeek;
export const selectDriver = (state: RootState) => state.scheduler.currentDriver;
export const selectSchedule = (state: RootState) => state.scheduler.Drivers;

export default schedulerSlice.reducer;
