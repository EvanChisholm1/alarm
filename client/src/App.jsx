import "./App.css";
import { useRiningContext } from "./context/ringingContext";
import useAudio from "./hooks/useAudio";

function App() {
  const { isRinging, stopRinging } = useRiningContext();
  useAudio(isRinging);

  return (
    <div className="">
      <button onClick={stopRinging}>{isRinging.toString()}</button>
    </div>
  );
}

export default App;
