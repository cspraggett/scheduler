import React from "react";

import "components/InterviewerList.scss";
import InterviewerListItem from "components/InterviewerListItem";

export default function InterviewerList(props) {
  console.log('***in map***', props);
  const list = props.interviewers.map(value =>
    <InterviewerListItem
      key={value.id}
      name={value.name}
      avatar={value.avatar}
      selected={value.id === props.value}
      onChange={event => props.onChange(value.id)}
        // 
        />
  );

  return <section className="interviewers">
  <h4 className="interviewers__header text--light">Interviewer</h4>
  <ul className="interviewers__list">{list}</ul>
</section>

};