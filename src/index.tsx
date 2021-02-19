import React from "react";
import ReactDOM from "react-dom";

import "./index.css";
import App from "./App";
import { MATRIX_SIZE } from "./config";

ReactDOM.render(
  <React.StrictMode>
    <App size={MATRIX_SIZE} />
  </React.StrictMode>,
  document.getElementById("root")
);
