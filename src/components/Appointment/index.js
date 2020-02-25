import React from "react";
import "components/Appointment/styles.scss";

import Show from "components/Appointment/Show";
import Header from "components/Appointment/Header";
import Empty from "components/Appointment/Empty";
import useVisualMode from "hooks/useVisualMode";
import Form from "components/Appointment/Form";
import Status from "components/Appointment/Status";
import Confirm from "components/Appointment/Confirm";
import Error from "components/Appointment/Error";

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVE = 'SAVE';
const DELETE = 'DELETE';
const CONFIRM = 'CONFRIM';
const EDIT = 'EDIT';
const SAVE_ERROR = "SAVE_ERROR";
const DELETE_ERROR = "DELETE_ERROR"

export default function Appointment(props) {
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );
   
  const deleteInterview = (() => {
    transition(DELETE, true);
    props.cancelInterview(props.id)
      .then(() => transition(EMPTY))
      .catch(err => transition(DELETE_ERROR, true));
  });

  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer 
    };
    transition(SAVE);
    props.bookInterview(props.id, interview)
    .then(() => {
    transition(SHOW)
    })
    .catch((err) => transition(SAVE_ERROR, true));
       
  }
  return <article className="appointment"
          data-testid="appointment">
    <Header time={props.time}></Header>
    {mode === DELETE_ERROR && (
      <Error message={"Could not delete appointment"}
             onClick={() => back()}
        />
    )}
    {mode === SAVE_ERROR && (
      <Error message={"Could not save appointment."}
             onClick={() => back()}
        />
    )}
    {mode === EDIT && (
      <Form interviewers = {props.interviewers}
            onSave={save}
            onCancel={() => back()}
            name={props.interview.student}
            interviewer={props.interview.interviewer.id}
            />
    )}
    {mode === CONFIRM && (
      <Confirm
      onClick={(() => deleteInterview)}
      onCancel={() => back()}
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
    {mode === SHOW && props.interview && (
    <Show student={props.interview.student} 
    interviewer={props.interview.interviewer}
    onDelete={() => transition(CONFIRM)}
    onEdit={() => transition(EDIT)}
    />    
    )}
    
  </article>
}