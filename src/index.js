import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { store } from "./storage";
import { Provider } from "react-redux";
// Importing Pages
import { MainDiv } from "./Pages/mainDiv";
// import { PDFpage } from "./Pages/pdfPage";
// Importing the style
import "./styles/root.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
 <Router>
  <div className="Heading"> React ID card Generator</div>
  <Provider store={store}>
   <Routes>
    <Route path="/ID-Card-Generator" element={<MainDiv />} />
    <Route path="/" element={<MainDiv />} />
    {/* <Route path="/pdf" element={<PDFpage />} /> */}
   </Routes>
  </Provider>
 </Router>
);
