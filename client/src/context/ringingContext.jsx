import { useEffect } from "react";
import { useContext, createContext, useState } from "react";
import { io } from "socket.io-client";

// const socket = io("http://localhost:3000/");
const socket = io("http://localhost:3000/");
export const RingingContext = createContext();

export function RingingContextProvider({ children }) {
  const [isRinging, setIsRinging] = useState(true);

  useEffect(() => {
    socket.on("connect", () => console.log("connected to server"));
    socket.on("alarmState", newRingState => setIsRinging(newRingState));
  }, []);

  function pauseRinging() {
    socket.emit("pause");
  }

  return (
    <RingingContext.Provider value={{ isRinging, pauseRinging }}>
      {children}
    </RingingContext.Provider>
  );
}

export function useRiningContext() {
  return useContext(RingingContext);
}
