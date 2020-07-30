export const convertHours = (militaryTime: number) => {
  if (militaryTime === 12) {
    return "12pm";
  }
  if (militaryTime === 0 || militaryTime === 24) {
    return "12am";
  }
  if (militaryTime < 12) {
    return `${militaryTime}am`;
  }
  return `${militaryTime - 12}pm`;
};
