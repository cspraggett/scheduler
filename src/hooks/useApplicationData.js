import {useReducer, useEffect} from 'react';
import axios from "axios";

// export default function useApplicationData() {
  const SET_DAY = "SET_DAY";
  const SET_APPLICATION_DATA = "SET_APPLICATION_DATA";
  const SET_INTERVIEW = "SET_INTERVIEW";
  let i = 0;
  function reducer(state, action) {
    console.log(`In reducer ${++i} times`);
    console.log(state)
    console.log(action)
    switch (action.type) {
      case SET_DAY:
        return {...state, day:action.day}
      case SET_APPLICATION_DATA:
        return {...state, day:state.day, days:action.days, appointments:action.appointments, interviewers:action.interviewers}
      case SET_INTERVIEW:
        console.log('set_interview - oldState', state);
        console.log('set_interview - newState', action.newState)
        return {...action.newState};
    
    default:
      throw new Error(
        `Tried to reduce with unsupported action type: ${action.type}`
      );
    }
  }
 
  export default function useApplicationData() {
    const [state, dispatch] = useReducer(reducer, {day: "Monday", days: [], appointments: {}, interviewers: {}});
    
    
    const setDay = day => dispatch({type: SET_DAY, day})//useReducer(reducer, {...state, day });


  useEffect(() => {
    Promise.all([
      axios.get("http://localhost:8001/api/days"),
      axios.get("http://localhost:8001/api/appointments"),
      axios.get("http://localhost:8001/api/interviewers")
    ])
    .then((all) => {
      dispatch({type: SET_APPLICATION_DATA, day: "Monday", days: all[0].data, appointments:
        all[1].data, interviewers: all[2].data })
    }) 
  },[])


  // const appointments = getAppointmentsForDay(state, state.day);

  const cancelInterview = (id) => {
    console.log("in cancelInterview-id =", id)
    return axios.delete(`http://localhost:8001/api/appointments/${id}`)
      .then(result => {
        dispatch({type: SET_INTERVIEW, newState: state})
      })
      .catch(error => PromiseRejectionEvent());
  }

  function bookInterview(id, interview) {
    console.log('in bookInterview:', id, '\n\n', interview)
    //dispatch({ type: SET_INTERVIEW, id, interview })
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    // const newState = {...state, appointments}
    // dispatch({ type: SET_INTERVIEW, newState: newState })
    return axios.put(`http://localhost:8001/api/appointments/${id}`, appointment)
    .then(results => {
      console.log('in hook:', state, id, appointments)
      const newState = {...state, appointments}
      interview = newState.interview
      console.log('old state:', state, '\n\nnew state', newState);
      dispatch({ type: SET_INTERVIEW, newState: newState })
    })
    .catch(err => PromiseRejectionEvent())
    // dispatch({type: SET_INTERVIEW, id:id, interview:interview});
  }

    // return (
    //   // dispatch({ type: SET_DAY, day }) ||
    //   // dispatch({ type: SET_APPLICATION_DATA, days, appointments, interviewers }) ||
    //   // dispatch({ type: SET_INTERVIEW, id, interview }) ||
    //   // dispatch({ type: SET_INTERVIEW, id, interview: null }) 
    // )
    return {state, setDay, bookInterview, cancelInterview}
  }
  // const schedule = appointments.map((appointment) => {
  //   const interview = getInterview(state, appointment.interview);
  //   const interviewers = getInterviewersForDay(state, {day: state.day, interviewers:state.interviewers}) || [];
  //   return (
  //     <Appointment
  //       key={appointment.id}
  //       id={appointment.id}
  //       time={appointment.time}
  //       interview={interview}
  //       interviewers={interviewers}
  //       bookInterview={bookInterview}
  //       cancelInterview={cancelInterview}
  //       />
  //   );
  //   });
  // return {state, setDay, bookInterview, cancelInterview}
// }