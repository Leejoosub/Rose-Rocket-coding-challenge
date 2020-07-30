import React from "react";
import { convertHours } from "../convertHours/converthours";

export const weekOptions = () => {
  const weekOptionsJsx: JSX.Element[] = [];
  for (let i = 1; i <= 52; i++) {
    weekOptionsJsx.push(<option key={i} value={i}>{`Week ${i}`}</option>);
  }
  return weekOptionsJsx;
};

export const dayOptions = () => {
  return [
    <option key={0} value={0}>
      Sunday
    </option>,
    <option key={1} value={1}>
      Monday
    </option>,
    <option key={2} value={2}>
      Tuesday
    </option>,
    <option key={3} value={3}>
      Wednesday
    </option>,
    <option key={4} value={4}>
      Thursday
    </option>,
    <option key={5} value={5}>
      Friday
    </option>,
    <option key={6} value={6}>
      Saturday
    </option>,
  ];
};

export const hourOptions = (start = 0, end = 24) => {
  const hours: JSX.Element[] = [];
  for (let i = start; i <= end; i++) {
    hours.push(
      <option key={i} value={i}>
        {convertHours(i)}
      </option>
    );
  }
  return hours;
};

export const taskOptions = () => {
  return [
    <option key={1} value={"other"}>
      Other
    </option>,
    <option key={2} value={"pickup"}>
      Pick Up
    </option>,
    <option key={3} value={"dropoff"}>
      Drop Off
    </option>,
  ];
};
