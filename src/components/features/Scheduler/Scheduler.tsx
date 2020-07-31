import React from "react";

import styles from "./Scheduler.module.css";
import { TopMenu } from "../../UI/TopMenu/TopMenu";
import { WeekCalendar } from "../../UI/WeekCalendar/WeekCalendar";
import Paper from "@material-ui/core/Paper";
import AddTask from "../AddTask/AddTask";

export const Scheduler = () => {
  return (
    <div className={styles.scheduleScreen}>
      <div className={styles.scheduleContainer}>
        <TopMenu />
        <Paper elevation={24} className={styles.calendar}>
          <WeekCalendar />
        </Paper>
        <AddTask />
      </div>
    </div>
  );
};
