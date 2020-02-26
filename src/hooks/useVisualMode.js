import {useState} from 'react';

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  const transition = ((value, replace = false) => {

    if (replace) {
      let temp = history.slice(0, history.length - 1);
      setHistory([...temp, value]);
    } else {
      setHistory([...history, value]);
    }
    // replace ? setHistory(val => val.filter((curr, i) => history[i] !== history.length-1)):
    // replace ? setHistory(temp = history.slice(history.length - 1), temp.push(value)) :
    //   setHistory([...history, value]);
    setMode(value);
  });

  const back = ()  => {
    if (history.length > 1) {
      console.log('history', history);
      let temp = history.slice(0, history.length - 1);
      console.log('temp back', temp);
      setHistory([...temp]);
      // console.log('new history', history)
      setMode(temp[temp.length - 1]);
    }
  };
  return {mode, transition, back };
}