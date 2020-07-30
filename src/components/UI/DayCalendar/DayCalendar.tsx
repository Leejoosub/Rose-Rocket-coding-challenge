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
} from "../../features/AddTask/addTaskSlice";
import {
  selectWeek,
  selectDriver,
  selectSchedule,
} from "../../features/Scheduler/SchedulerSlice";

import { setAddTaskShowModal } from "../../features/AddTask/addTaskSlice";

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
      // when I start doing the actual functionality, add 10 colors that look nice, and randomize those colors for backgrounds
      // when I start doing the actual functionality, add 10 colors that look nice, and randomize those colors for backgrounds
      // when I start doing the actual functionality, add 10 colors that look nice, and randomize those colors for backgrounds
      for (let i = 0; i <= 24; i++) {
        if (hourlySchedule[i]) {
          hourly.push(
            <HourCard
              key={i}
              position="top"
              cardOnPress={() => {
                console.log("time has been filled");
              }}
            >
              <p>{hourlySchedule[i].task}</p>
            </HourCard>
          );
        } else {
          hourly.push(
            <HourCard
              key={i}
              cardOnPress={() => {
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

  // const hourlySchedule = schedule[currentDriver][currentWeek][props.day];

  // if (hourlySchedule) {
  //   // when I start doing the actual functionality, add 10 colors that look nice, and randomize those colors for backgrounds
  //   // when I start doing the actual functionality, add 10 colors that look nice, and randomize those colors for backgrounds
  //   // when I start doing the actual functionality, add 10 colors that look nice, and randomize those colors for backgrounds
  //   for (let i = 0; i <= 24; i++) {
  //     if (hourlySchedule[i]) {
  //       hourly.push(
  //         <HourCard
  //           key={i}
  //           position="top"
  //           cardOnPress={() => {
  //             console.log("time has been filled");
  //           }}
  //         />
  //       );
  //     } else {
  //       hourly.push(
  //         <HourCard
  //           key={i}
  //           cardOnPress={() => {
  //             dispatch(setAddTaskWeek(currentWeek));
  //             dispatch(setAddTaskDay(props.day));
  //             dispatch(setAddTaskStartHour(i));
  //             dispatch(setAddTaskEndHour(i + 1));
  //             dispatch(setAddTaskShowModal(true));
  //           }}
  //         />
  //       );
  //     }
  //   }
  // } else {
  if (emptySchedule) {
    for (let i = 0; i <= 24; i++) {
      hourly.push(
        <HourCard
          key={i}
          cardOnPress={() => {
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

  // }

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
