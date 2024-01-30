import React from "react";
import ReactDOM from "react-dom";

import { ThemeProvider } from "./ThemeContext";
import { ErrorProvider } from "./ErrorContext"; // Import ErrorProvider

import App from "./App";

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider>
      <ErrorProvider>
        <App />
      </ErrorProvider>
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
