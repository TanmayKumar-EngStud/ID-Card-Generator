import React from "react";
import ImgSection from "../2. Image Section/imgSection";

import { useDispatch, useSelector } from "react-redux";
import { add1, remove1 } from "../../../3. Storage/Storage Space A/Data1";
import "./info.css";

let Info = ({ onClick }) => {
 let dispatch = useDispatch();
 let validate = false;
 let setValid = (ack) => {
  validate = ack;
 };
 let setClear = () => {
  document.querySelector("input#name").value = "";
  document.querySelector("input#position").value = "";
  document.querySelector("input#id").value = "";
  document.querySelector("input#phone").value = "";
  document.querySelector("input#bloodGp").value = "";
  document.querySelector("input#emergencyPhone").value = "";
  dispatch(remove1());
 };
 let bake = () => {
  let data = {
   name: document.querySelector("input#name").value,
   position: document.querySelector("input#position").value,
   id: document.querySelector("input#id").value,
   phone: document.querySelector("input#phone").value,
   "Blood Group": document.querySelector("input#bloodGp").value,
   "Emergency Phone": document.querySelector("input#emergencyPhone").value,
  };
  for (let content in data) {
   if (data[content] === "") {
    alert("Fill all the information!");
    return;
   }
  }

  dispatch(add1(data));
  onClick();
 };

 return (
  <div className="info">
   <div className="heading">
    <p>User Information</p>
   </div>
   <div className="details">
    <div className="userDetails">
     <div>
      <label>Name :</label>
      <input type="text" id="name" />
     </div>
     <div>
      <label>Position :</label>
      <input type="text" id="position" />
     </div>
     <div>
      <label>ID Number :</label>
      <input type="text" id="id" />
     </div>
     <div>
      <label>Phone Number :</label>
      <input type="number" id="phone" />
     </div>
     <div>
      <label>Blood Group :</label>
      <input type="text" id="bloodGp" />
     </div>
     <div>
      <label>Emergency Contact Number :</label>
      <input type="number" id="emergencyPhone" />
     </div>
    </div>
    <div className="imgDetails">
     <ImgSection ack={setValid} />
    </div>
   </div>
   <div className="footer">
    <button onClick={bake}>Preview</button>
    <button onClick={setClear}>Clear</button>
   </div>
  </div>
 );
};

export default Info;
