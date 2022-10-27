import React from "react";
import ReactDOM from "react-dom/client";
import { store } from "./storage";
import { Provider } from "react-redux";
// Importing elements
import { MainDiv } from "./mainDiv";

// Importing the style
import "./styles/root.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
 <Provider store={store}>
  <div className="Heading"> React ID card Generator</div>
  <MainDiv />
 </Provider>
);
