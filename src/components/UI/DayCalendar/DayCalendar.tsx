import React from "react";
import styles from "./DayCalendar.module.css";
import Button from "@material-ui/core/Button";
import HourCard from "../HourCard/HourCard/HourCard";
import { useDispatch, useSelector } from "react-redux";
import {
  setAddTaskWeek,
  setAddTaskDay,
  selectAddTaskWeek,
  setAddTaskStartHour,
  setAddTaskEndHour,
  setEditTaskType,
  setUpdateDetails,
} from "../../features/AddTask/addTaskSlice";
import {
  selectWeek,
  selectDriver,
  selectSchedule,
} from "../../features/Scheduler/SchedulerSlice";

import { setAddTaskShowModal } from "../../features/AddTask/addTaskSlice";
import { taskUpdateDetails } from "../../../models/EditTask/EditTaskModel";

interface DayCalendarProps {
  label: string;
  //sunday = 0, saturday = 6
  day: number;
}

export const DayCalendar = (props: DayCalendarProps) => {
  const dispatch = useDispatch();
  const currentWeek = useSelector(selectWeek);
  const currentDriver = useSelector(selectDriver);
  const schedule = useSelector(selectSchedule);

  let hourly: JSX.Element[] = [];

  let emptySchedule = false;
  const dailySchedule = schedule[currentDriver][currentWeek];
  if (dailySchedule) {
    const hourlySchedule = dailySchedule[props.day];
    if (hourlySchedule) {
      // jlee when I start doing the actual functionality, add 10 colors that look nice, and randomize those colors for backgrounds
      // when I start doing the actual functionality, add 10 colors that look nice, and randomize those colors for backgrounds
      for (let i = 0; i < 24; i++) {
        if (hourlySchedule[i]) {
          //if its just a 1 hour schedule
          if (hourlySchedule[i].endHour === i + 1) {
            hourly.push(
              <HourCard
                key={props.day + i}
                position="full"
                cardOnPress={() => {
                  dispatch(setEditTaskType("update"));
                  dispatch(setAddTaskWeek(currentWeek));
                  dispatch(setAddTaskDay(props.day));
                  dispatch(setAddTaskStartHour(i));
                  dispatch(setAddTaskEndHour(i));
                  dispatch(setAddTaskShowModal(true));
                  dispatch(
                    setUpdateDetails({
                      driver: currentDriver,
                      week: currentWeek,
                      day: props.day,
                      startHour: i,
                    })
                  );
                }}
              >
                <div>
                  <div>+ Click For More Details</div>
                  <div>Task: {hourlySchedule[i].task}</div>
                  <div className={styles.noWrap}>
                    Location: {hourlySchedule[i].location}
                  </div>
                </div>
              </HourCard>
            );
          } else {
            const currStartHour = i;
            const currentSchedule = hourlySchedule[currStartHour];

            //details required for updates
            const updateDetails: taskUpdateDetails = {
              driver: currentDriver,
              week: currentWeek,
              day: props.day,
              startHour: currStartHour,
            };

            hourly.push(
              <HourCard
                key={props.day + i}
                position="top"
                cardOnPress={() => {
                  dispatch(setEditTaskType("update"));
                  dispatch(setAddTaskWeek(currentWeek));
                  dispatch(setAddTaskDay(props.day));
                  dispatch(setAddTaskStartHour(currStartHour));
                  dispatch(
                    setAddTaskEndHour(hourlySchedule[currStartHour].endHour)
                  );
                  dispatch(setAddTaskShowModal(true));
                  dispatch(setUpdateDetails(updateDetails));
                }}
              >
                <div>{currentSchedule.task}</div>
              </HourCard>
            );
            for (let x = i + 1; x < currentSchedule.endHour - 1; x++) {
              hourly.push(
                <HourCard
                  key={"" + i + x + props.day}
                  position="mid"
                  cardOnPress={() => {
                    dispatch(setEditTaskType("update"));
                    dispatch(setAddTaskWeek(currentWeek));
                    dispatch(setAddTaskDay(props.day));
                    dispatch(setAddTaskStartHour(currStartHour));
                    dispatch(setAddTaskEndHour(currentSchedule.endHour));
                    dispatch(setAddTaskShowModal(true));
                    dispatch(setUpdateDetails(updateDetails));
                  }}
                />
              );
              // also want to increase the outter loop by 1 because
              // we are adding to the schedule
              i++;
            }
            hourly.push(
              <HourCard
                key={props.day + i + 1}
                position="bot"
                cardOnPress={() => {
                  dispatch(setEditTaskType("update"));
                  dispatch(setAddTaskWeek(currentWeek));
                  dispatch(setAddTaskDay(props.day));
                  dispatch(setAddTaskStartHour(currStartHour));
                  dispatch(setAddTaskEndHour(currentSchedule.endHour));
                  dispatch(setAddTaskShowModal(true));
                  dispatch(setUpdateDetails(updateDetails));
                }}
              />
            );
            // we have to increment for each HourCard we add. we add 1 for the top automatically
            // the inner for loop adds on its own
            // need to add 1 more i for the bottom / last HourCard we add
            i++;
          }
        } else {
          hourly.push(
            <HourCard
              key={i + props.day}
              cardOnPress={() => {
                dispatch(setEditTaskType("add"));
                dispatch(setAddTaskWeek(currentWeek));
                dispatch(setAddTaskDay(props.day));
                dispatch(setAddTaskStartHour(i));
                dispatch(setAddTaskEndHour(i + 1));
                dispatch(setAddTaskShowModal(true));
              }}
            />
          );
        }
      }
    } else emptySchedule = true;
  } else emptySchedule = true;
  if (emptySchedule) {
    for (let i = 0; i < 24; i++) {
      hourly.push(
        <HourCard
          key={i}
          cardOnPress={() => {
            dispatch(setEditTaskType("add"));
            dispatch(setAddTaskWeek(currentWeek));
            dispatch(setAddTaskDay(props.day));
            dispatch(setAddTaskStartHour(i));
            dispatch(setAddTaskEndHour(i + 1));
            dispatch(setAddTaskShowModal(true));
          }}
        />
      );
    }
  }

  return (
    <div className={styles.dayContainer}>
      <div className={styles.dayLabel}>
        <p>
          <strong>{props.label}</strong>
        </p>
        <Button
          variant="contained"
          onClick={() => {
            console.log("add task");
          }}
        >{` + Add Task`}</Button>
      </div>

      <div className={styles.contentContainer}>{hourly}</div>
    </div>
  );
};
