import "./styles.css";
import { useState, useEffect, useRef } from "react";

export default function App() {
  const [state, setState] = useState({
    breakLength: 5,
    sessionLength: 25,
    paused: true,
    mode: true,
    label: "Session",
  });
  const [minutes, setMinutes] = useState(25);
  const [seconds, setSeconds] = useState(0);

  const soundRef = useRef(null);

  useEffect(() => {
    if (seconds === 0 && minutes === 0 && state.mode === true) {
      soundRef.current.play();
      setTimeout(() => {
        setMinutes(state.breakLength);
        setState({
          ...state,
          mode: false,
          label: "Break",
        });
      }, 1000);
    }
    if (seconds === 0 && minutes === 0 && state.mode === false) {
      soundRef.current.play();
      setTimeout(() => {
        setMinutes(state.breakLength);
        setState({
          ...state,
          mode: true,
          label: "Session",
        });
      }, 1000);
    }
    if (state.paused === false) {
      const countdown = setInterval(() => {
        if (seconds > 0) {
          setSeconds((s) => s - 1);
        } else if (minutes > 0) {
          setMinutes((m) => m - 1);
          setSeconds(59);
        }
      }, 1000);
      return () => clearInterval(countdown);
    }
  });

  togglePlay = () => {
    if (minutes === 25) {
      setMinutes(state.sessionLength);
      setState({
        ...state,
        paused: state.paused === true ? false : true,
      });
    } else {
      setState({
        ...state,
        paused: state.paused === true ? false : true,
      });
    }
  };

  changeSession = (input) => {
    if (
      (state.sessionLength === 1 && input < 0) ||
      (state.sessionLength === 60 && input > 0)
    ) {
      return;
    } else {
      setState({
        ...state,
        sessionLength: state.sessionLength + input,
      });
      if (state.paused === true && seconds === 0) {
        setMinutes(state.sessionLength + input);
      }
    }
  };
  changeBreak = (input) => {
    if (
      (state.breakLength === 1 && input < 0) ||
      (state.breakLength === 60 && input > 0)
    ) {
      return;
    } else {
      setState({
        ...state,
        breakLength: state.breakLength + input,
      });
    }
  };
  reset = () => {
    soundRef.current.pause();
    soundRef.current.currentTime = 0;
    setState({
      breakLength: 5,
      sessionLength: 25,
      paused: true,
      mode: true,
      label: "Session",
    });
    setMinutes(25);
    setSeconds(0);
  };
  const formatTime = (time) => {
    return String(time).padStart(2, "0");
  };
  return (
    <div className="App">
      <h1>25+5 Clock</h1>
      <div>
        <h4 id="break-label">Break Length</h4>
        <div>
          <span id="break-length">{state.breakLength}</span>
          <button id="break-increment" onClick={() => changeBreak(1)}>
            Increase
          </button>
          <button id="break-decrement" onClick={() => changeBreak(-1)}>
            Decrease
          </button>
        </div>
      </div>
      <div>
        <h4 id="session-label">Session Length</h4>
        <div>
          <span id="session-length">{state.sessionLength}</span>
          <button id="session-increment" onClick={() => changeSession(1)}>
            Increase
          </button>
          <button id="session-decrement" onClick={() => changeSession(-1)}>
            Decrease
          </button>
        </div>
      </div>
      <div id="display">
        <h2 id="timer-label">{state.label}</h2>
        <audio
          id="beep"
          ref={soundRef}
          src="https://raw.githubusercontent.com/freeCodeCamp/cdn/master/build/testable-projects-fcc/audio/BeepSound.wav"
        />
        <span id="time-left">
          {formatTime(minutes)}:{formatTime(seconds)}
        </span>
      </div>
      <div id="displayControls">
        <button id="start_stop" onClick={() => togglePlay()}>
          Play/Pause
        </button>
        <button id="reset" onClick={() => reset()}>
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
