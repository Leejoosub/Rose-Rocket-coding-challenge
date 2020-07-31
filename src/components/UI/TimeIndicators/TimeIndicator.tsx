import React from "react";
import HourCard from "../HourCard/HourCard/HourCard";
import styles from "./TimeIndicator.module.css";
import { convertHours } from "../../../HelperFunctions/convertHours/converthours";

let hourly: JSX.Element[] = [];
for (let i = 0; i < 24; i++) {
  hourly.push(
    <HourCard key={i}>
      <div>{convertHours(i)}</div>
    </HourCard>
  );
}

const TimeIndicator = () => {
  return (
    <div className={styles.dayContainer}>
      <div className={styles.dayLabel}>
        <p>
          <strong>Time</strong>
        </p>
      </div>
      <div className={styles.contentContainer}>{hourly}</div>
    </div>
  );
};

export default TimeIndicator;
