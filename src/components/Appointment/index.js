import React from "react";
import "components/Appointment/styles.scss";

import Show from "components/Appointment/Show";
import Header from "components/Appointment/Header";
import Empty from "components/Appointment/Empty";
import useVisualMode from "hooks/useVisualMode";
import Form from "components/Appointment/Form"
// import getInterviewersForDay from "helpers/selectors";

// interviewers={interviewers()}



const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";

export default function Appointment(props) {
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );
  return <article className="appointment">
    <Header time={props.time}></Header>
    {mode === CREATE && (
      <Form interviewers={[]}
            // onSave={props.onSave}
            onCancel={() => back()} 
            />
    )}
    {mode === EMPTY && <Empty 
     onAdd={() => transition(CREATE)} />}
    {mode === SHOW && (
    <Show student={props.interview.student} 
    interviewer={props.interview.interviewer} />    
    )}
    
  </article>
}