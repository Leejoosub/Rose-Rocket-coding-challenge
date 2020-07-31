import React from "react";

//MATERIAL UI
import Container from "@material-ui/core/Container";

import styles from "./Scheduler.module.css";
import { TopMenu } from "../../UI/TopMenu/TopMenu";
import { WeekCalendar } from "../../UI/WeekCalendar/WeekCalendar";
import Paper from "@material-ui/core/Paper";
import AddTask from "../AddTask/AddTask";

export const Scheduler = () => {
  return (
    <Container>
      <TopMenu />
      <Paper elevation={24} className={styles.calendar}>
        <WeekCalendar />
      </Paper>
      <AddTask />
    </Container>
  );
};
