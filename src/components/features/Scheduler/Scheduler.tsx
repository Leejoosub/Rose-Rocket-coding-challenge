import React, { useState } from "react";

//MATERIAL UI
import Card from "@material-ui/core/Card";
import Container from "@material-ui/core/Container";

import styles from "./Scheduler.module.css";
import { TopMenu } from "../../UI/TopMenu/TopMenu";

export const Scheduler = () => {
  return (
    <Container>
      <TopMenu />

      <Card raised={true} className={styles.calendar}>
        <p>calendar goes here</p>
      </Card>
    </Container>
  );
};
