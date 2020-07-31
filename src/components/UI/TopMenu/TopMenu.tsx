import React from "react";

//MATERIAL UI
import NativeSelect from "@material-ui/core/NativeSelect";
import InputLabel from "@material-ui/core/InputLabel";
import ArrowBack from "@material-ui/icons/ArrowBack";
import ArrowForward from "@material-ui/icons/ArrowForward";

import styles from "./TopMenu.module.css";
import { DRIVER1, DRIVER2, DRIVER3 } from "../../../GlobalVar";
import { useDispatch, useSelector } from "react-redux";
import {
  //actions
  increaseWeek,
  decreaseWeek,
  changeDriver,
  changeDownloadSchedule,

  //select
  selectWeek,
  selectDriver,
  selectDownloadScheduleLength,
  selectSchedule,
} from "../../features/Scheduler/SchedulerSlice";
import Button from "@material-ui/core/Button";

export const TopMenu = () => {
  const dispatch = useDispatch();
  const currentWeek = useSelector(selectWeek);
  const driver = useSelector(selectDriver);
  const downloadScheduleLength = useSelector(selectDownloadScheduleLength);
  const schedule = useSelector(selectSchedule);
  const handleDownloadSchedule = () => {
    const printable: (string | number)[][] = [
      ["Time-Frame", "Pickup", "Drop-off", "Other"],
    ];
    let pickup = 0;
    let dropoff = 0;
    let other = 0;
    for (let week = 1; week <= 52; week++) {
      for (let day = 0; day <= 6; day++) {
        const daysSoFar = (week - 1) * 7 + day + 1;
        const weekSchedule = schedule[driver][week];
        if (weekSchedule) {
          const daySchedule = schedule[driver][week][day];
          if (daySchedule) {
            for (let startHour in daySchedule) {
              switch (daySchedule[startHour].task) {
                case "dropoff":
                  dropoff++;

                  break;
                case "pickup":
                  pickup++;

                  break;
                case "other":
                  other++;

                  break;
              }
            }
          }
        }

        if (daysSoFar % downloadScheduleLength === 0) {
          printable.push([
            `Day ${daysSoFar - downloadScheduleLength + 1} - Day ${
              daysSoFar + 1
            }`,
            pickup,
            dropoff,
            other,
          ]);

          pickup = 0;
          dropoff = 0;
          other = 0;
        }
      }
    }

    let printableSchedule =
      "data:text/csv;charset=utf-8," +
      printable.map((daysSchedules) => daysSchedules.join(";")).join("\n");

    const encodedUri = encodeURI(printableSchedule);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "Schedule.csv");
    document.body.appendChild(link);
    link.click();
  };

  return (
    <div className={styles.topMenu}>
      <div className={styles.pickerContainer}>
        <InputLabel htmlFor="select">Driver: </InputLabel>
        <NativeSelect
          className={styles.picker}
          id="select"
          onChange={(event) => {
            dispatch(changeDriver(event.target.value));
          }}
        >
          <option value={DRIVER1}>{DRIVER1}</option>
          <option value={DRIVER2}>{DRIVER2}</option>
          <option value={DRIVER3}>{DRIVER3}</option>
        </NativeSelect>
      </div>

      <div className={styles.pickerContainer}>
        <ArrowBack
          className={styles.icon}
          onClick={() => dispatch(decreaseWeek())}
        />
        <p>{`Week ${currentWeek}`}</p>
        <ArrowForward
          className={styles.icon}
          onClick={() => dispatch(increaseWeek())}
        />
      </div>

      <div className={styles.pickerContainer}>
        <Button onClick={handleDownloadSchedule}>Download Schedule</Button>
        <NativeSelect
          className={styles.picker}
          id="select"
          onChange={(event) => {
            dispatch(changeDownloadSchedule(parseInt(event.target.value)));
          }}
        >
          <option value={2}>2 Days</option>
          <option value={4}>4 Days</option>
          <option value={7}>7 Days</option>
          <option value={14}>14 Days</option>
          <option value={28}>28 Days</option>
        </NativeSelect>
      </div>
    </div>
  );
};
