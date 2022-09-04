import { useState } from "react";
import { useEffect } from "react";
import "./App.css";
import { useRiningContext } from "./context/ringingContext";
import useAudio from "./hooks/useAudio";

function App() {
  const { isRinging, pauseRinging, isPaused } = useRiningContext();
  const [timer, setTimer] = useState(0);
  useAudio(isRinging);

  useEffect(() => {
    setTimeout(() => {
      if (timer > 0 && isPaused) {
        setTimer(timer - 1);
      }
    }, 1000);
  }, [timer]);

  useEffect(() => {
    if (!isRinging && isPaused) {
      setTimer(60);
    }
    if (!isPaused) {
      setTimer(0);
    }
  }, [isRinging, isPaused]);

  return (
    <div className="">
      {timer > 0 && <h1>{timer}</h1>}
      <button onClick={pauseRinging}>{isRinging.toString()}</button>
    </div>
  );
}

export default App;
