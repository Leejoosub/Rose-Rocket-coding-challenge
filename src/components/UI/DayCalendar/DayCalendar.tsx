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
  openTaskModalWithNewValues,
} from "../../features/AddTask/addTaskSlice";
import {
  selectWeek,
  selectDriver,
  selectSchedule,
} from "../../features/Scheduler/SchedulerSlice";

import { setAddTaskShowModal } from "../../features/AddTask/addTaskSlice";
import { taskUpdateDetails } from "../../../models/EditTask/EditTaskModel";
import { Tasks } from "../../../models/Schedule/ScheduleModel";

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
  const cardContent = (task: Tasks, location: string) => {
    return (
      <div>
        <div>+ Click For More Details</div>
        <div>Task: {task}</div>
        <div className={styles.noWrap}>Location: {location}</div>
      </div>
    );
  };

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
                  dispatch(
                    openTaskModalWithNewValues({
                      modalTaskType: "update",
                      week: currentWeek,
                      day: props.day,
                      startHour: i,
                      endHour: i + 1,
                      showModal: true,
                      updateDetails: {
                        driver: currentDriver,
                        week: currentWeek,
                        day: props.day,
                        startHour: i,
                      },
                      task: hourlySchedule[i].task,
                      location: hourlySchedule[i].location,
                    })
                  );
                }}
              >
                {cardContent(
                  hourlySchedule[i].task,
                  hourlySchedule[i].location
                )}
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
                  dispatch(
                    openTaskModalWithNewValues({
                      modalTaskType: "update",
                      week: currentWeek,
                      day: props.day,
                      startHour: currStartHour,
                      endHour: hourlySchedule[currStartHour].endHour,
                      showModal: true,
                      updateDetails: updateDetails,
                      task: hourlySchedule[currStartHour].task,
                      location: hourlySchedule[currStartHour].location,
                    })
                  );
                }}
              >
                {cardContent(currentSchedule.task, currentSchedule.location)}
              </HourCard>
            );
            for (let x = i + 1; x < currentSchedule.endHour - 1; x++) {
              hourly.push(
                <HourCard
                  key={"" + i + x + props.day}
                  position="mid"
                  cardOnPress={() => {
                    dispatch(
                      openTaskModalWithNewValues({
                        modalTaskType: "update",
                        week: currentWeek,
                        day: props.day,
                        startHour: currStartHour,
                        endHour: hourlySchedule[currStartHour].endHour,
                        showModal: true,
                        updateDetails: updateDetails,
                        task: hourlySchedule[currStartHour].task,
                        location: hourlySchedule[currStartHour].location,
                      })
                    );
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
                  dispatch(
                    openTaskModalWithNewValues({
                      modalTaskType: "update",
                      week: currentWeek,
                      day: props.day,
                      startHour: currStartHour,
                      endHour: hourlySchedule[currStartHour].endHour,
                      showModal: true,
                      updateDetails: updateDetails,
                      task: hourlySchedule[currStartHour].task,
                      location: hourlySchedule[currStartHour].location,
                    })
                  );
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
                dispatch(
                  openTaskModalWithNewValues({
                    modalTaskType: "add",
                    week: currentWeek,
                    day: props.day,
                    startHour: i,
                    endHour: i + 1,
                    showModal: true,
                    task: "other",
                    location: "",
                  })
                );
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
            dispatch(
              openTaskModalWithNewValues({
                modalTaskType: "add",
                week: currentWeek,
                day: props.day,
                startHour: i,
                endHour: i + 1,
                showModal: true,
                task: "other",
                location: "",
              })
            );
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
