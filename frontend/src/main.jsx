import React from "react";
import ReactDOM from "react-dom/client";
import "./style.css";
import "./input.css";
import App from "./App";
import { BaseUrlProvider } from "./context/BaseUrlContext";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "@material-tailwind/react";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <BaseUrlProvider>
        <ThemeProvider>
          <App />
        </ThemeProvider>
      </BaseUrlProvider>
    </BrowserRouter>
  </React.StrictMode>,
);
