// UseApplicationData takes in requests from Application and process any requests to the reducer
// I could not figure out how to move async logic directly into the reducer so I have made
// any axio calls in the functions here.

import {useReducer, useEffect} from 'react';
import axios from "axios";

import reducer from "../reducers/application";
import {SET_DAY, SET_APPLICATION_DATA, SET_INTERVIEW} from "../reducers/application";

export default function useApplicationData() {
  const [state, dispatch] = useReducer(reducer, {day: "Monday", days: [], appointments: {}, interviewers: {}});
  const setDay = day => dispatch({type: SET_DAY, day});

  // This useEffect is triggered when the app loads and populates the state with data from the api server.
  useEffect(() => {
    Promise.all([
      axios.get("/api/days"),
      axios.get("/api/appointments"),
      axios.get("/api/interviewers")
    ])
      .then((all) => {
        dispatch({type: SET_APPLICATION_DATA, day: "Monday", days: all[0].data, appointments:
        all[1].data, interviewers: all[2].data });
      });
  },[]);

  useEffect(() => {
    const webSocket = new WebSocket(process.env.REACT_APP_WEBSOCKET_URL);
    // webSocket.onmessage = (event => {
    //   console.log('message recieved:')
    // })
    // webSocket.onmessage = (event => {
    //   const newData = JSON.parse(event.data);
    //   console.log(newData);
      // if (newData.type = SET_INTERVIEW && newData.id !== state.appointments.id) {
      //   newData.interview ? bookInterview(newData.id, newData.interview) : cancelInterview(newData.id);
      //   webSocket.send(SET_INTERVIEW)
      // }
      // console.log('socket ready state', webSocket.readyState)
    })
  
  // cancelInterview sends a DELETE request through axio to the API server and removes the interview
  // from the database and then dispatches the new state to the reducer.
  const cancelInterview = (id) => {
    return axios.delete(`/api/appointments/${id}`)
      .then(() => {
        const newAppointments = state.appointments[id].interview = null;
        const newState = {...state, newAppointments};

        //? for some reason this filter updates the count in the state, I don't
        //? know if this is bad practice or not?
        newState.days.filter(curr => {

          if (curr.name === newState.day) {
            curr.spots++;
          }
        });
        dispatch({type: SET_INTERVIEW, newState: newState});
      });
  };

  const bookInterview = ((id, interview) => {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    return axios.put(`/api/appointments/${id}`, appointment)
      .then(() => {
        let newState = {};
        if (!state.appointments[id].interview || appointment !== state.appointments[id].interview) {
          newState = {...state, appointments};
          if (!state.appointments[id].interview) {
            //? Again I'm not sure if this is a good way to update spots in the state?
            newState.days.filter((curr) => {
              if (curr.name === newState.day) {
                curr.spots--;
              }
              return undefined;
            });

          }
        } else {
          newState = {...state};
        }
        dispatch({ type: SET_INTERVIEW, newState: newState });
      });
  });

  return {state, setDay, bookInterview, cancelInterview};
}

//TODO Begining of webSocket implementaion.

    
        
// })