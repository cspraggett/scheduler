import {useState} from 'react';

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial)
  const [history, setHistory] = useState([initial])

  function transition(value, replace = false) {
    replace ? setHistory(val => val.filter((curr, i) => history[i] !== history.length-1)):
      setHistory([...history, value]);
    setMode(value);
  }  

  function back() {
    let temp = history;
    temp.pop();
    setHistory(temp);
    history.length  && setMode(history[history.length -1]);
  }
  return {mode, transition, back }
}