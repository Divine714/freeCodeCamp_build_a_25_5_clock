/*import "./styles.css";
import { useState, useEffect, useRef } from "react";

export default function App() {
  const [state, setState] = useState({
    breakLength: 300,
    sessionLength: 1500,
    paused: true,
    mode: true,
    label: "Session",
  });
  const [time, setTime] = useState(1500);
  useEffect(() => {
    console.log(state.paused);
    if (time === 0 && state.mode === true) {
      setTime(state.breakLength);
      setState({
        ...state,
        mode: false,
        label: "Break",
      });
    }
    if (time === 0 && state.mode === false) {
      setTime(state.sessionLength);
      setState({
        ...state,
        mode: true,
        label: "Session",
      });
    }
    if (state.paused === false) {
      const countdown = setInterval(() => {
        setTime((t) => t - 1);
      }, 1000);
      return () => clearInterval(countdown);
    }
  });

  convertTime = (input) => {
    return input / 60 + (input % 60).toFixed(2);
  };

  togglePlay = () => {
    setState({
      ...state,
      paused: state.paused === true ? false : true,
    });
  };
  console.log(state.paused);
  changeSession = (input) => {
    setState({
      ...state,
      sessionLength: state.sessionLength + input,
    });
  };
  changeBreak = (input) => {
    setState({
      ...state,
      breakLength: state.breakLength + input,
    });
  };
  reset = () => {
    setState({
      breakLength: 300,
      sessionLength: 1500,
      paused: true,
    });
    setTime(1500);
  };
  return (
    <div className="App">
      <h1>25+5 Clock</h1>
      <div id="break-label">
        Break Length
        <div id="break-length">
          {state.breakLength / 60}
          <button id="break-increment" onClick={() => changeBreak(60)}>
            Increase
          </button>
          <button id="break-decrement" onClick={() => changeBreak(-60)}>
            Decrease
          </button>
        </div>
      </div>
      <div id="session-label">
        Session Length
        <div id="session-length">
          {state.sessionLength / 60}
          <button id="session-increment" onClick={() => changeSession(60)}>
            change
          </button>
          <button id="session-decrement" onClick={() => changeSession(-60)}>
            Decrease
          </button>
        </div>
      </div>
      <div id="display">
        <h2 id="timer-label">{state.label}</h2>
        <span id="time-left">
          {Math.floor(time / 60).toFixed(0)}:
          {time % 60 === 0
            ? "00"
            : time % 60 < 10
            ? "0" + (time % 60)
            : time % 60}
        </span>
      </div>
      <div id="displayControls">
        <button id="start_stop" onClick={() => togglePlay()}>
          Play/Pause
        </button>
        <button is="reset" onClick={() => reset()}>
          Reset
        </button>
      </div>
    </div>
  );
}

/*setState({
  ...state,
  paused: state.paused === true ? false : true,
});*/

/*