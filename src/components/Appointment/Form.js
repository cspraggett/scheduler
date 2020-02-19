import React, {useState} from "react";

import Button from "components/Button";
import InterviewerList from "components/InterviewerList"

export default function Form(props) {
  const [name, setName] = useState(props.name || "");
  const [interviewer, setInterviewer] = useState(props.interviewer || null);

  const reset = () => {
    setName("");
    setInterviewer(null);
  }

  const cancel = () => {
    props.onCancel();
    reset();
  }

  const save = () => {
    props.onSave(name, interviewer)
  }
  console.log({props})
  // const changeName = e => setName(e.target.value);

  return <main className="appointment__card appointment__card--create">
  <section className="appointment__card-left">
    <form autoComplete="off"
          onSubmit={event => event.preventDefault()}>
      <input 
        
        className="appointment__create-input text--semi-bold"
        name="name"
        type="text"
        value={name}
        onChange={e => setName(e.target.value)}
        placeholder= {name || "Enter Student Name"}
       
        
       
      />
    </form>
    <InterviewerList interviewers={props.interviewers}
       value={interviewer} 
       onChange={ e => {
          console.log(e)
          return setInterviewer(e)}} 
        //
        />
  </section>
  <section className="appointment__card-right">
    <section className="appointment__actions">
      <Button danger
        onClick={cancel}>
        Cancel</Button>
      <Button confirm
        onClick={save}
        >Save</Button>
    </section>
  </section>
</main>
}