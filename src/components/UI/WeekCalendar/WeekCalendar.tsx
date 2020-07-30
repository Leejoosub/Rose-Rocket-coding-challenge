import React from "react";
import { DayCalendar } from "../DayCalendar/DayCalendar";
import styles from "./WeekCalendar.module.css";
import TimeIndicator from "../TimeIndicators/TimeIndicator";

export const WeekCalendar = () => {
  return (
    <div className={styles.weekCalendarContainer}>
      <TimeIndicator />
      <DayCalendar label="Sunday" />
      <DayCalendar label="Monday" />
      <DayCalendar label="Tuesday" />
      <DayCalendar label="Wednesday" />
      <DayCalendar label="Thursday" />
      <DayCalendar label="Friday" />
      <DayCalendar label="Saturday" />
    </div>
  );
};
