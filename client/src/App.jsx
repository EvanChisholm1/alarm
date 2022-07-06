import "./App.css";
import { useRiningContext } from "./context/ringingContext";

function App() {
  const { isRinging, stopRinging } = useRiningContext();

  return (
    <div className="">
      <button onClick={stopRinging}>{isRinging.toString()}</button>
    </div>
  );
}

export default App;
