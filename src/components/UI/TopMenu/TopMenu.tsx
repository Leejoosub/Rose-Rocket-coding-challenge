import React from "react";

//MATERIAL UI
import NativeSelect from "@material-ui/core/NativeSelect";
import InputLabel from "@material-ui/core/InputLabel";
import ArrowBack from "@material-ui/icons/ArrowBack";
import ArrowForward from "@material-ui/icons/ArrowForward";

import styles from "./TopMenu.module.css";
import { DRIVER1, DRIVER2, DRIVER3 } from "../../../GlobalVar";

export const TopMenu = () => {
  return (
    <div className={styles.topMenu}>
      <div className={styles.pickerContainer}>
        <InputLabel htmlFor="select">Age</InputLabel>
        <NativeSelect
          className={styles.picker}
          id="select"
          //jlee implement using redux
          // onChange={(event) => {
          //   changeDriver(event.target.value);
          // }}
        >
          <option value={DRIVER1}>{DRIVER1}</option>
          <option value={DRIVER2}>{DRIVER2}</option>
          <option value={DRIVER3}>{DRIVER3}</option>
        </NativeSelect>
      </div>

      <div className={styles.pickerContainer}>
        <ArrowBack
          className={styles.icon}
          onClick={() => console.log("left")}
        />
        <p>Week</p>
        <ArrowForward
          className={styles.icon}
          onClick={() => console.log("right")}
        />
      </div>

      <div className={styles.pickerContainer}>
        <InputLabel htmlFor="select">Download Schedule</InputLabel>
        <NativeSelect
          className={styles.picker}
          id="select"
          //jlee implement using redux
          // onChange={(event) => {
          //   changeDriver(event.target.value);
          // }}
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
