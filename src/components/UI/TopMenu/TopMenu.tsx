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
} from "../../features/Scheduler/SchedulerSlice";

export const TopMenu = () => {
  const dispatch = useDispatch();
  const currentWeek = useSelector(selectWeek);
  const driver = useSelector(selectDriver);
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
        <InputLabel htmlFor="select">Download Schedule</InputLabel>
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
          <option value={27}>27 Days</option>
        </NativeSelect>
      </div>
    </div>
  );
};
