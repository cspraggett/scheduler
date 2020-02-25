import {useReducer, useEffect} from 'react';
import axios from "axios";


// export default function useApplicationData() {
  const SET_DAY = "SET_DAY";
  const SET_APPLICATION_DATA = "SET_APPLICATION_DATA";
  const SET_INTERVIEW = "SET_INTERVIEW";
  

  function reducer(state, action) {
    switch (action.type) {
      case SET_DAY:
        return {...state, day:action.day}
      case SET_APPLICATION_DATA:
        return {...state, day:state.day, days:action.days, appointments:action.appointments, interviewers:action.interviewers}
      case SET_INTERVIEW:
        return {...action.newState,};
    
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
    // webSocket.onopen = ((event) => {
    //   webSocket.send('Ping');

    // })
    //     webSocket.onmessage = (event => {
    //       console.log('message recieved:')
    //     })
    Promise.all([
      axios.get("/api/days"),
      axios.get("/api/appointments"),
      axios.get("/api/interviewers")
    ])
    .then((all) => {
      dispatch({type: SET_APPLICATION_DATA, day: "Monday", days: all[0].data, appointments:
        all[1].data, interviewers: all[2].data })
    }) 
  },[])

  // useEffect(() => {
  //   const webSocket = new WebSocket(process.env.REACT_APP_WEBSOCKET_URL);
  //   // webSocket.onmessage = (event => {
  //   //   console.log('message recieved:')
  //   // }) 
  //   webSocket.onopen = ((event) => {
  //     // webSocket.send('ping');
      
  //   })
  //   webSocket.onmessage = (event => {
  //     const newData = JSON.parse(event.data);
  //     console.log(newData);
  //     // if (newData.type = SET_INTERVIEW && newData.id !== state.appointments.id) {
  //     //   newData.interview ? bookInterview(newData.id, newData.interview) : cancelInterview(newData.id);
  //     //   webSocket.send(SET_INTERVIEW)
  //     // }
  //     // console.log('socket ready state', webSocket.readyState)
  //   })
    
        
  // })

  

  
  // const appointments = getAppointmentsForDay(state, state.day);

  const cancelInterview = (id) => {
    return axios.delete(`/api/appointments/${id}`)
      .then(result => {
        const newAppointments = state.appointments[id].interview = null;
        const newState = {...state, newAppointments};

        newState.days.filter(curr => {
        
          if (curr.name === newState.day) {
            curr.spots++;
          }
          // return undefined;
        }) 
        dispatch({type: SET_INTERVIEW, newState: newState})
      })
      //.catch(err => console.log(err));
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
    // const newState = {...state, appointments}
    // dispatch({ type: SET_INTERVIEW, newState: newState })
    return axios.put(`/api/appointments/${id}`, appointment)
    .then(() => {
      let newState = {};
      console.log('appointment',appointment)
      console.log('state', state.appointments[id].interview)
      if (!state.appointments[id].interview || appointment !== state.appointments[id].interview){
        newState = {...state, appointments}
        if (!state.appointments[id].interview) {
          newState.days.filter((curr) => {
            if (curr.name === newState.day){
                    curr.spots--;
                  }
                  return undefined
          })

          // dispatch({type: SET_APPLICATION_DATA, day: newState.day, days: newState.days, appointments: newState.appointments, interviewers: newState.interviewers})
        }
      } else {
        newState = {...state}
      }
      // console.log('oldState', state)
      // console.log('newState', newState)
      
      //   console.log('curr', newState.appointments[id].interview)
      //   console.log('old', state.days[id].appointments[3])
        // if (newState.appointments[id].interview !== state.appointments[id].interview) {
        //   newState.days.spots--;
        // }
        // newState = {...newState, newState.days.spots - 1}
        // console.log('newState', newState.days.spots)
      // newState.days.filter((curr, i) => {
      //   // if (curr.name === newState.day) {
      //   //   if (curr.name === state.day[curr.day].id[i]){
      //   //     curr.spots--;
      //   //   }
      //   // }
      //   return undefined;
      // }) 
      dispatch({ type: SET_INTERVIEW, newState: newState })
    })
    //.catch(err => console.log(err))//new PromiseRejectionEvent())
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