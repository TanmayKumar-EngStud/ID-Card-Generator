import { ImgSection } from "./imgSection";

// Calling the redux important functions.
import { add } from "../storage/userData";
import { useDispatch, useSelector } from "react-redux";

export const GeneralInstructions = () => {
 const dispatch = useDispatch();
 const x = useSelector((state) => state.user.value);
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
   dispatch(add(data));
  }

  console.log(x);
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
    <ImgSection id="personal" h4="Drag n Drop Personal Photo here!" />
   </div>

   <hr />
   <button onClick={bake}>Submit</button>
  </>
 );
};
