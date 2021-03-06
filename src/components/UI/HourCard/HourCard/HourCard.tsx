import React from "react";
import styles from "./HourCard.module.css";

interface HourcardProps {
  children?: JSX.Element;
  position?: "top" | "mid" | "bot" | "full" | "no border" | undefined;
  cardOnPress?: VoidFunction;
  additionalStyling?: string;
}
const HourCard = (props: HourcardProps) => {
  let cardStyle = styles.fullHourCardContainer;
  switch (props.position) {
    case "top":
      cardStyle = styles.topHourCardContainer;
      break;
    case "mid":
      cardStyle = styles.midHourCardContainer;
      break;
    case "bot":
      cardStyle = styles.botHourCardContainer;
      break;
    case "no border":
      cardStyle = styles.noBorderHourCardContainer;
  }

  return (
    <div
      className={[
        cardStyle,
        styles.cardContainer,
        props.additionalStyling ? props.additionalStyling : null,
      ].join(" ")}
      onClick={props.cardOnPress}
    >
      {props.children ? props.children : <div />}
    </div>
  );
};

export default HourCard;
