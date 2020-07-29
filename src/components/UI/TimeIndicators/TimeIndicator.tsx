import React from "react";
import HourCard from "../HourCard/HourCard/HourCard";
import styles from "./TimeIndicator.module.css";

let hourly: JSX.Element[] = [];
for (let i = 0; i <= 24; i++) {
  hourly.push(
    <HourCard key={i}>
      <div>{i === 12 ? "12pm" : i < 12 ? `${i}am` : `${i - 12}pm`}</div>
    </HourCard>
  );
}

const TimeIndicator = () => {
  return (
    <div className={styles.dayContainer}>
      <div className={styles.dayLabel}>
        <HourCard position="no border" />
          
      </div>
      {hourly}
    </div>
  );
};

export default TimeIndicator;
