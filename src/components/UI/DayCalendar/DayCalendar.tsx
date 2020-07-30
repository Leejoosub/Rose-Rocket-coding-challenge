import React from "react";
import styles from "./DayCalendar.module.css";
import Button from "@material-ui/core/Button";
import HourCard from "../HourCard/HourCard/HourCard";

interface DayCalendarProps {
  label: string;
}

let hourly: JSX.Element[] = [];
for (let i = 0; i <= 24; i++) {
  // when I start doing the actual functionality, add 10 colors that look nice, and randomize those colors for backgrounds
  hourly.push(<HourCard key={i} />);
}

export const DayCalendar = (props: DayCalendarProps) => {
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
