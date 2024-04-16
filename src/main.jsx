import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  // <React.StrictMode>
  <div className="flex flex-col  max-h-dvh w-full overflow-auto">
    <App />
  </div>
  // </React.StrictMode>,
);
