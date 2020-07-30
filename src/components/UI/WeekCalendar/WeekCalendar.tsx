import React from "react";
import { DayCalendar } from "../DayCalendar/DayCalendar";
import styles from "./WeekCalendar.module.css";
import TimeIndicator from "../TimeIndicators/TimeIndicator";

export const WeekCalendar = () => {
  return (
    <div className={styles.weekCalendarContainer}>
      <TimeIndicator />
      <DayCalendar label="Sunday" day={0} />
      <DayCalendar label="Monday" day={1} />
      <DayCalendar label="Tuesday" day={2} />
      <DayCalendar label="Wednesday" day={3} />
      <DayCalendar label="Thursday" day={4} />
      <DayCalendar label="Friday" day={5} />
      <DayCalendar label="Saturday" day={6} />
    </div>
  );
};
