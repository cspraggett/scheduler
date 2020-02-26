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
    setMode(value);
  });

  const back = ()  => {
    if (history.length > 1) {
      let temp = history.slice(0, history.length - 1);
      setHistory([...temp]);
      setMode(temp[temp.length - 1]);
    }
  };
  return {mode, transition, back };
}