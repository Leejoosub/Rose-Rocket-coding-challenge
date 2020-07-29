import React from "react";
import styles from "./DayCalendar.module.css";
import { Card } from "@material-ui/core";
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
        
        <HourCard position="no border">
          <p>{props.label}</p>
        </HourCard>
      </div>
      {hourly}
    </div>
  );
};
