import {useReducer, useEffect} from 'react';
import axios from "axios";

// export default function useApplicationData() {
  const SET_DAY = "SET_DAY";
  const SET_APPLICATION_DATA = "SET_APPLICATION_DATA";
  const SET_INTERVIEW = "SET_INTERVIEW";

  function reducer(state, action) {
    switch (action.type) {
      case SET_DAY:
        return {}
      case SET_APPLICATION_DATA:
        return {}
      case SET_INTERVIEW:
        return {}
    
    default:
      throw new Error(
        `Tried to reduce with unsupported action type: ${action.type}`
      );
    }
  }
 
  function appointments() {
    const [state, dispatch] = useReducer(reducer, {day: "Monday", days: [], appointments: {}, interviewers: {}});
    const setDay = day => useReducer(reducer, {...state, day });


  useEffect(() => {
    Promise.all([
      axios.get("http://localhost:8001/api/days"),
      axios.get("http://localhost:8001/api/appointments"),
      axios.get("http://localhost:8001/api/interviewers")
    ])
    .then((all) => {
      dispatch(prev => ({ ...prev, days: all[0].data, appointments:
         all[1].data, interviewers: all[2].data}));
    })
  },[])

  // const appointments = getAppointmentsForDay(state, state.day);

  const cancelInterview = (id) => {
    console.log("in cancelInterview-id =", id)
    return axios.delete(`http://localhost:8001/api/appointments/${id}`)
      .then(result => console.log('in result:', result))
      .catch(error => PromiseRejectionEvent());
  }

  function bookInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    return axios.put(`http://localhost:8001/api/appointments/${id}`, appointment)
    .then(results => {
      dispatch({...state, appointments});
    })
    .catch(err => PromiseRejectionEvent());
  }

    return (
      dispatch({ type: SET_DAY, day }) ||
      dispatch({ type: SET_APPLICATION_DATA, days, appointments, interviewers }) ||
      dispatch({ type: SET_INTERVIEW, id, interview }) ||
      dispatch({ type: SET_INTERVIEW, id, interview: null }) 
    )

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