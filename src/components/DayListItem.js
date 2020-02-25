import React from "react";

import classnames from "classnames";

import "components/DayListItem.scss";

export default function DayListItem(props) {
  const formatSpots = ((spots) => !spots ? "no spots remaining" :
  spots === 1 ? "1 spot remaining" :
    `${spots} spots remaining`)
  
  const dayClass = classnames({
    "day-list__item": true,
    "day-list__item--selected": props.selected,
    "day-list__item--full": !props.spots
  });
  
  return (
    <li 
      className={dayClass}
      data-testid="day"
      onClick={() => props.setDay(props.name)}>
      <h2 className="text--regular">{props.name}</h2>
      <h3 className="text--light">{formatSpots(props.spots)}</h3>
    </li>
  );
}