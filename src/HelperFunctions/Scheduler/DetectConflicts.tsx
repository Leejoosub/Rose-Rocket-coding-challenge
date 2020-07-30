import { DriversMap } from "../../models/Schedule/ScheduleModel";
import { taskUpdateDetails } from "../../models/EditTask/EditTaskModel";

export const detectConfict = (
  driverSchedule: DriversMap,
  currentDriver: string,
  week: number,
  day: number,
  startHour: number,
  endHour: number
): boolean => {
  let conflict = false;
  const driverobj = driverSchedule[currentDriver];
  if (driverobj) {
    const weekObj = driverobj[week];
    if (weekObj) {
      const dayObj = weekObj[day];
      if (dayObj) {
        //loop through all of the hours in day obj
        for (let hour in dayObj) {
          //if there exists another start time as the one we passed in, then conflict
          if (parseInt(hour) === startHour) {
            conflict = true;
            break;
          } else if (parseInt(hour) < startHour) {
            // if there is a start time that starts before the passed in start time
            // and ends after the start time we request, conflict
            if (dayObj[hour].endHour > startHour) {
              conflict = true;
              break;
            }
          } else if (parseInt(hour) < endHour) {
            conflict = true;
            break;
          }
        }
      }
    }
  }
  return conflict;
};

export const detectConfictExcludingCurrent = (
  driverSchedule: DriversMap,
  currentDriver: string,
  week: number,
  day: number,
  startHour: number,
  endHour: number,
  taskDetails: taskUpdateDetails
) => {
  let conflict = false;
  const driverobj = driverSchedule[currentDriver];
  if (driverobj) {
    const weekObj = driverobj[week];
    if (weekObj) {
      const dayObj = weekObj[day];
      if (dayObj) {
        //loop through all of the hours in day obj
        for (let hour in dayObj) {
          // if all the details are the same as task details, its the task we are trying to update
          // so we can ignore it as it will be deleted afterwards
          if (
            !(
              taskDetails.startHour === parseInt(hour) &&
              taskDetails.day === day &&
              taskDetails.week === week &&
              taskDetails.driver === currentDriver
            )
          ) {
            //if there exists another start time as the one we passed in, then conflict
            if (parseInt(hour) === startHour) {
              conflict = true;
              break;
            } else if (parseInt(hour) < startHour) {
              // if there is a start time that starts before the passed in start time
              // and ends after the start time we request, conflict
              if (dayObj[hour].endHour > startHour) {
                conflict = true;
                break;
              }
            } else if (parseInt(hour) < endHour) {
              conflict = true;
              break;
            }
          }
        }
      }
    }
  }
  console.log("conflict?: ", conflict);
  return conflict;
};
