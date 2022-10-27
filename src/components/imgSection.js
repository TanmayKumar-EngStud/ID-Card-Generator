import { useState } from "react";

//importing for the redux operations.
import { useDispatch } from "react-redux";
import { add } from "../storage/userData";
export let ImgSection = (props) => {
 let [dataURL, setDataURL] = useState("");
 const dispatch = useDispatch();
 // 1. Dragging
 let highlight = (event) => {
  event.preventDefault();
  event.stopPropagation();
  event.target.classList.add("active");
 };
 // 2. Cancelling the drag
 let revert = (event) => {
  event.target.classList.remove("active");
 };
 // 3. uploading the drag correctly

 const upload = (event) => {
  event.preventDefault();
  event.stopPropagation();
  let file = event.dataTransfer.files[0];
  if (file.type !== "image/jpeg" && file.type !== "image/png") {
   alert("Wrong Image File uploaded!");
   event.target.classList.remove("active");
   return;
  }
  let fileReader = new FileReader();
  fileReader.onload = () => {
   let fileURL = fileReader.result;
   setDataURL(fileURL);
   dispatch(add({ URL: fileURL }));
  };
  fileReader.readAsDataURL(file);
  event.target.classList.remove("active");
 };
 let erase = () => {
  setDataURL("");
 };
 if (dataURL === "") {
  return (
   <div
    className="imgInfo"
    id={props.id}
    onDragOver={highlight}
    onDragLeave={revert}
    onDrop={upload}
   >
    <h4>{props.h4}</h4>
    <i className="fa-solid fa-cloud-arrow-up"></i>
    <h6>-or-</h6>
    <button>Upload file</button>
   </div>
  );
 }
 return (
  <div className="imgInfo" id={props.id}>
   <div className="crossSign">
    <i className="fa-solid fa-circle-xmark" onClick={erase}></i>
   </div>
   <img src={dataURL} alt={props.id} id={props.id} />
  </div>
 );
};
