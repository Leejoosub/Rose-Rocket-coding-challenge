import React, { useState } from "react";
import Modal from "@material-ui/core/Modal";
import {
  //setters
  setAddTaskWeek,
  setAddTaskShowModal,
  setAddTaskDay,
  setAddTaskStartHour,
  setAddTaskTask,
  setAddTaskEndHour,
  setAddTaskLocation,

  //getters
  selectAddTaskShowModal,
  selectAddTaskWeek,
  selectAddTaskDay,
  selectAddTaskStartHour,
  selectAddTaskEndHour,
  selectAddTaskTask,
  selectAddTaskLocation,
  selectEditTaskType,
  selectUpdateDetails,
} from "./addTaskSlice";
import { useDispatch, useSelector } from "react-redux";

import NativeSelect from "@material-ui/core/NativeSelect";
import InputLabel from "@material-ui/core/InputLabel";
import TextField from "@material-ui/core/TextField";

import styles from "./AddTask.module.css";
import {
  dayOptions,
  weekOptions,
  hourOptions,
  taskOptions,
} from "../../../HelperFunctions/SelectOptions/SelectOptions";
import Button from "@material-ui/core/Button";
import { Tasks } from "../../../models/Schedule/ScheduleModel";
import createMuiTheme from "@material-ui/core/styles/createMuiTheme";
import { ThemeProvider } from "@material-ui/core";
import {
  deleteTask,
  selectDriver,
  updateSchedule,
  selectScheduleConflict,
  selectSchedule,
  overWriteSchedule,
} from "../Scheduler/SchedulerSlice";
import {
  detectConfict,
  detectConfictExcludingCurrent,
} from "../../../HelperFunctions/Scheduler/DetectConflicts";

const theme = createMuiTheme({
  palette: { primary: { main: "#3399ff", contrastText: "#fff" } },
});

const AddTask = () => {
  const dispatch = useDispatch();
  const showModal = useSelector(selectAddTaskShowModal);
  const selectedWeek = useSelector(selectAddTaskWeek);
  const selectedDay = useSelector(selectAddTaskDay);
  const selectedStartHour = useSelector(selectAddTaskStartHour);
  const selectedEndHour = useSelector(selectAddTaskEndHour);
  const selectedDriver = useSelector(selectDriver);
  const selectedTask = useSelector(selectAddTaskTask);
  const scheduleConflict = useSelector(selectScheduleConflict);
  const location = useSelector(selectAddTaskLocation);
  const schedule = useSelector(selectSchedule);
  const editTaskType = useSelector(selectEditTaskType);
  const updateDetails = useSelector(selectUpdateDetails);

  const [conflictWarning, setConflictWarning] = useState(false);

  const handleCloseModal = () => {
    dispatch(setAddTaskShowModal(false));
  };

  const handleSubmit = () => {
    const conflict = detectConfict(
      schedule,
      selectedDriver,
      selectedWeek,
      selectedDay,
      selectedStartHour,
      selectedEndHour
    );
    if (!conflict) {
      dispatch(
        updateSchedule({
          week: selectedWeek,
          day: selectedDay,
          startHour: selectedStartHour,
          endHour: selectedEndHour,
          task: selectedTask,
          location: location,
        })
      );
      handleCloseModal();
    } else setConflictWarning(true);
  };

  const handleUpdate = () => {
    let conflict = false;
    if (updateDetails) {
      conflict = detectConfictExcludingCurrent(
        schedule,
        selectedDriver,
        selectedWeek,
        selectedDay,
        selectedStartHour,
        selectedEndHour,
        updateDetails
      );
    }
    if (!conflict) {
      if (updateDetails) {
        dispatch(deleteTask(updateDetails));
        dispatch(
          updateSchedule({
            week: selectedWeek,
            day: selectedDay,
            startHour: selectedStartHour,
            endHour: selectedEndHour,
            task: selectedTask,
            location: location,
          })
        );
      }
      handleCloseModal();
    } else {
      setConflictWarning(true);
    }
  };
  const handleDelete = () => {
    if (updateDetails) dispatch(deleteTask(updateDetails));
    handleCloseModal();
  };

  const handleOverwrite = () => {
    if (editTaskType === "update" && updateDetails)
      dispatch(deleteTask(updateDetails));
    dispatch(
      overWriteSchedule({
        week: selectedWeek,
        day: selectedDay,
        startHour: selectedStartHour,
        endHour: selectedEndHour,
        task: selectedTask,
        location: location,
      })
    );
    setConflictWarning(false);
    handleCloseModal();
  };

  let modalButton = (
    <div className={styles.buttonContainer}>
      <ThemeProvider theme={theme}>
        <Button variant="contained" color="primary" onClick={handleSubmit}>
          <p>Add New Task</p>
        </Button>
      </ThemeProvider>
    </div>
  );
  if (editTaskType === "update") {
    modalButton = (
      <div className={styles.buttonContainer}>
        <ThemeProvider theme={theme}>
          <div className={styles.flexRow}>
            <div className={styles.buttonContainer}>
              <Button
                variant="contained"
                color="primary"
                onClick={handleUpdate}
              >
                <p>Update Task</p>
              </Button>
            </div>
            <div className={styles.buttonContainer}>
              <Button
                variant="contained"
                color="secondary"
                onClick={handleDelete}
              >
                <p>Delete Task</p>
              </Button>
            </div>
          </div>
        </ThemeProvider>
      </div>
    );
  }

  return (
    <Modal
      open={showModal}
      onClose={handleCloseModal}
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description"
      className={styles.modal}
    >
      <div className={styles.modalContent}>
        {editTaskType === "add" ? (
          <h1>Add A New Task</h1>
        ) : editTaskType === "update" ? (
          <h1>Update Task</h1>
        ) : null}
        <div className={styles.inputColumn}>
          {/* WEEK SELECTOR */}
          <div className={styles.inputs}>
            <InputLabel htmlFor="select">Week: </InputLabel>
            <NativeSelect
              className={styles.picker}
              id="select"
              value={selectedWeek}
              onChange={(event) => {
                dispatch(setAddTaskWeek(parseInt(event.target.value)));
                if (conflictWarning) setConflictWarning(false);
              }}
            >
              {/* helper function to create <option> tags for me */}
              {weekOptions()}
            </NativeSelect>
          </div>

          {/* DAY SELECTOR */}
          <div className={styles.inputs}>
            <InputLabel htmlFor="select">Day: </InputLabel>
            <NativeSelect
              className={styles.picker}
              id="select"
              value={selectedDay}
              onChange={(event) => {
                dispatch(setAddTaskDay(parseInt(event.target.value)));
              }}
            >
              {/* helper function to create <option> tags for me */}
              {dayOptions()}
            </NativeSelect>
          </div>

          {/* START HOUR SELECTOR  */}
          <div className={styles.inputs}>
            <InputLabel htmlFor="select">Start Hour: </InputLabel>
            <NativeSelect
              className={styles.picker}
              id="select"
              value={selectedStartHour}
              onChange={(event) => {
                dispatch(setAddTaskStartHour(parseInt(event.target.value)));
              }}
            >
              {hourOptions(0, 23)}
            </NativeSelect>
          </div>

          {/* END HOUR SELECTOR */}
          <div className={styles.inputs}>
            <InputLabel htmlFor="select">End Hour: </InputLabel>
            <NativeSelect
              className={styles.picker}
              id="select"
              value={selectedEndHour}
              onChange={(event) => {
                dispatch(setAddTaskEndHour(parseInt(event.target.value)));
              }}
            >
              {/* if the new selected start time is greater than previously selected end time
              change the end time. if not, dont change */}
              {hourOptions(selectedStartHour + 1, 24)}
            </NativeSelect>
          </div>

          {/* TASK SELECTOR  */}
          <div className={styles.inputs}>
            <InputLabel htmlFor="select">Task: </InputLabel>
            <NativeSelect
              className={styles.picker}
              id="select"
              value={selectedTask}
              onChange={(event) => {
                dispatch(setAddTaskTask(event.target.value as Tasks));
              }}
            >
              {taskOptions()}
            </NativeSelect>
          </div>
          <div className={styles.inputs}>
            <InputLabel htmlFor="select">Location: </InputLabel>
            <div className={styles.textField}>
              <TextField
                value={location}
                onChange={(event) =>
                  dispatch(setAddTaskLocation(event.target.value))
                }
              />
            </div>
          </div>
        </div>
        <div className={styles.buttonContainer}>{modalButton}</div>
        <Modal
          open={conflictWarning}
          onClose={() => setConflictWarning(false)}
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
          className={styles.modal}
        >
          <div className={styles.modalContent}>
            <p>WARNING: Conficting Schedule</p>
            <p>
              there is a conflicting schedule. Would you like to overwrite it?
            </p>
            <ThemeProvider theme={theme}>
              <div className={styles.flexRow}>
                <div className={styles.buttonContainer}>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => handleOverwrite()}
                  >
                    <p>Yes! Overwrite</p>
                  </Button>
                </div>
                <div className={styles.buttonContainer}>
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => setConflictWarning(false)}
                  >
                    <p>Cancel</p>
                  </Button>
                </div>
              </div>
            </ThemeProvider>
          </div>
        </Modal>
      </div>
    </Modal>
  );
};

export default AddTask;
