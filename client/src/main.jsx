import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { RingingContextProvider } from "./context/ringingContext";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RingingContextProvider>
      <App />
    </RingingContextProvider>
  </React.StrictMode>
);
