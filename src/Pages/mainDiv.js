import { GeneralInstructions } from "../components/generalInstructions";

export const MainDiv = () => {
 return (
  <div className="mainDiv">
   <div className="headDiv">
    <div className="Logo">
     <i className="fa-solid fa-id-card"></i>
    </div>
    <div className="title">ID card Generator</div>
   </div>
   <GeneralInstructions />
  </div>
 );
};
