import "../styles/FloatingWindow.css";
import { useSelector } from "react-redux";

// importing sample id card image
import IDcard from "../images/IDcard.png";
export const FloatingWindow = (props) => {
 let data = useSelector((state) => state.user);
 let close = () => {
  props.close(false);
 };
 if (props.display) {
  return (
   <div className="window">
    <div className="windowContent">
     <i className="fa-solid fa-circle-xmark" onClick={close}></i>
     <h2>Preview Window</h2>
     <hr />
     <div className="imgViewer">
      <img src={IDcard} alt="ID card generated" />
      <div className="dummyComponent">
       <div className="relativeComponent">
        <div className="imgWindow">
         <img src={data.URL} alt="user" />
        </div>
        <div className="userID">{data["User Id"]}</div>
        <div className="name">{data["name"]}</div>
        <div className="DOB">{data["DOB"]}</div>
        <div className="Email">{data["Email"]}</div>
        <div className="Address">{data["Address"]}</div>
       </div>
      </div>
     </div>
     <div className="buttonGroup">
      <button className="generate">Generate!</button>
      <button className="close" onClick={close}>
       Edit
      </button>
     </div>
    </div>
   </div>
  );
 } else {
  return null;
 }
};
