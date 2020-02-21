import React from "react";
import "components/Appointment/styles.scss";

import Show from "components/Appointment/Show";
import Header from "components/Appointment/Header";
import Empty from "components/Appointment/Empty";
import useVisualMode from "hooks/useVisualMode";
import Form from "components/Appointment/Form";
import Status from "components/Appointment/Status";
import Confirm from "components/Appointment/Confirm";

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVE = 'SAVE';
const DELETE = 'DELETE';
const CONFIRM = 'CONFRIM';

export default function Appointment(props) {
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );
   
  const deleteInterview = ((studentName,interviewer) => {
    console.log('in in delete' ,studentName, interviewer)
    transition(DELETE);
    props.cancelInterview(studentName, interviewer.id)
      .then(() => transition(EMPTY));
  });

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
    {mode === CONFIRM && (
      <Confirm
      message="Are you sure you want to delete?" />
    )}
    {mode === DELETE && (
      <Status
      message="Deleting" />
    )}
    {mode === SAVE && (
      <Status
        message="Saving" />
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
    interviewer={props.interview.interviewer}
    onDelete={deleteInterview}
    />    
    )}
    
  </article>
}