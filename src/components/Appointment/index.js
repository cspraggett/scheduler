import React from "react";
import "components/Appointment/styles.scss";

import Show from "components/Appointment/Show";
import Header from "components/Appointment/Header";
import Empty from "components/Appointment/Empty";
import useVisualMode from "hooks/useVisualMode";
import Form from "components/Appointment/Form"
import Status from "components/Appointment/Status"
// import getInterviewersForDay from "helpers/selectors";

// interviewers={interviewers()}



const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVE = 'SAVE';

export default function Appointment(props) {
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  function save(name, interviewer) {
    transition(SAVE);
    const interview = {
      student: name,
      interviewer 
    };
    props.bookInterview(props.id, interview)
    .then(() => transition(SHOW))
       
  }
  return <article className="appointment">
    <Header time={props.time}></Header>
    {mode === SAVE && (
      <Status />
    )}
    {mode === CREATE && (
      <Form interviewers={props.interviewers}
            onSave={save}
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