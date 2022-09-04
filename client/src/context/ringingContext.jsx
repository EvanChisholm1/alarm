import { useEffect } from "react";
import { useContext, createContext, useState } from "react";
import { io } from "socket.io-client";

const url = import.meta.env.VITE_SERVER || "http://localhost:3000/";
console.log(import.meta.env.VITE_SERVER);
const socket = io(url);
export const RingingContext = createContext();

export function RingingContextProvider({ children }) {
  const [isRinging, setIsRinging] = useState(true);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    socket.on("connect", () => console.log("connected to server"));
    socket.on("alarmState", newRingState => setIsRinging(newRingState));
    socket.on("isPaused", newPausedState => setIsPaused(newPausedState));
  }, []);

  function pauseRinging() {
    socket.emit("pause");
  }

  return (
    <RingingContext.Provider value={{ isRinging, pauseRinging, isPaused }}>
      {children}
    </RingingContext.Provider>
  );
}

export function useRiningContext() {
  return useContext(RingingContext);
}
