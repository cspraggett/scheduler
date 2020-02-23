 function getAppointmentsForDay(state, day) {
  if (state.days.length === 0) {
    return [];
  }
  const appointmentDay = state.days.filter(curr => curr.name === day);  
  if (appointmentDay.length === 0) {
    return [];
  }

  let ret = [];
  for (const key of Object.keys(state.appointments)) {
    if (appointmentDay[0].appointments.includes(state.appointments[key].id)) {
      ret.push(state.appointments[key]);
    }
  }
  return ret;
}

 function getInterview(state, interview) {
  if (!interview || !interview.interviewer) {
    return null;
  }
  return {
    student: interview.student,
    interviewer: {
      id: interview.interviewer,
      name: state.interviewers[interview.interviewer].name,
      avatar: state.interviewers[interview.interviewer].avatar
    }
  }
}

function getInterviewersForDay(state, day) {
  if (state.days.length === 0) {
    return [];
  }
  const appointmentDay = state.days.filter(curr => curr.name === day.day);  
  if (appointmentDay.length === 0) {
    return [];
  }
  
  let ret = [];
  for (const key of Object.keys(state.interviewers)) {
    if (appointmentDay[0].interviewers.includes(state.interviewers[key].id)) {
      ret.push(state.interviewers[key]);
    }
  }
  return ret;
}

module.exports = {getAppointmentsForDay, getInterview, getInterviewersForDay};