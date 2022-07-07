import "./App.css";
import { useRiningContext } from "./context/ringingContext";
import useAudio from "./hooks/useAudio";

function App() {
  const { isRinging, pauseRinging } = useRiningContext();
  useAudio(isRinging);

  return (
    <div className="">
      <button onClick={pauseRinging}>{isRinging.toString()}</button>
    </div>
  );
}

export default App;
