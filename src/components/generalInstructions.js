import { ImgSection } from "./imgSection";
import { useState } from "react";
// Calling the redux important functions.
import { add } from "../storage/userData";
import { useDispatch } from "react-redux";
import { FloatingWindow } from "./FloatingWindow";

export const GeneralInstructions = () => {
 const dispatch = useDispatch();
 let [window, setWindow] = useState(false);
 // const x = useSelector((state) => state.user);
 let bake = () => {
  let data = {
   name: document.querySelector("input#name").value,
   "User Id": document.querySelector("input#id").value,
   DOB: document.querySelector("input#DOB").value,
   Email: document.querySelector("input#email").value,
   Address: document.querySelector("input#address").value,
  };
  for (let content in data) {
   if (data[content] === "") {
    alert("Fill all the information!");
    return;
   }
  }
  dispatch(add(data));
  setWindow(true);
 };
 let closeWindow = (value) => {
  setWindow(value);
 };
 return (
  <>
   <div className="genInfo">
    <div className="textInfo">
     <h2>Some of the General information of the user</h2>
     <input type="text" id="name" placeholder="User name" />
     <input type="text" id="id" placeholder="User Id" />
     <input type="date" id="DOB" />
     <input type="email" id="email" placeholder="example@gmail.com" />
     <input type="text" id="address" placeholder="Address" />
    </div>
    <ImgSection id="personal" h4="Drag n Drop Photo here!" />
   </div>

   <hr />
   <button onClick={bake}>Submit</button>
   <FloatingWindow display={window} close={closeWindow} />
  </>
 );
};
