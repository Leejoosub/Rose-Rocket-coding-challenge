import { DriversMap } from "../../models/Schedule/ScheduleModel";

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
