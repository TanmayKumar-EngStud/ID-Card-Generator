import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { add1, remove1 } from "../../../3. Storage/Storage Space A/Data1.js";
import { add2, replace2 } from "../../../3. Storage/Storage Space B/Data2.js";

// importing elements and style.
import CropWindow from "./1. Cropper Window/cropWindow.js";
import "./imgSection.css";
const ImgSection = (props) => {
 let [dataURL, setDataURL] = useState("");
 const [originalURL, setOriginalURL] = useState("");
 const [imgStyle, setImgStyle] = useState(null);
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
   setOriginalURL(fileURL);
   dispatch(add1({ URL: fileURL }));
  };
  fileReader.readAsDataURL(file);
  event.target.classList.remove("active");
  props.ack(true);
 };
 let erase = () => {
  setDataURL("");
  dispatch(remove1("URL"));
  dispatch(replace2({ release: false }));
  props.ack(false);
 };
 let operate = () => {
  let inp = document.querySelector('.imgInfo input[type="file"]');
  inp.click();
 };
 let setImgURL = (event) => {
  let file = event.target.files[0];
  let fileReader = new FileReader();
  fileReader.onload = () => {
   let fileURL = fileReader.result;
   setDataURL(fileURL);
   setOriginalURL(fileURL);
   dispatch(add1({ URL: fileURL }));
  };
  fileReader.readAsDataURL(file);
  event.target.classList.remove("active");
  props.ack(true);
 };
 const [release, setRelease] = useState(false);
 let sickEdits = () => {
  setRelease(true);
 };
 let remoteClose = () => {
  setRelease(false);
 };
 useEffect(() => {
  const image = document.querySelector("#imgProfile");
  if (imgStyle != null) {
   image.src = imgStyle;
   dispatch(add1({ URL: imgStyle }));
  }
 }, [imgStyle, dispatch]);

 if (dataURL === "") {
  return (
   <div
    className="imgInfo"
    id="UserPhoto"
    onDragOver={highlight}
    onDragLeave={revert}
    onDrop={upload}
   >
    <h4>{props.h4}</h4>
    <i className="fa-solid fa-cloud-arrow-up"></i>
    <h6>-or-</h6>
    <input type="file" hidden onChange={setImgURL} readOnly />
    <button onClick={operate}>Upload file</button>
   </div>
  );
 } else {
  dispatch(add2({ release: true }));
 }
 return (
  <div className="imgInfo on" id="User photo">
   <div className="edit-button" onClick={sickEdits}>
    <i className="fa-regular fa-pen-to-square" />
   </div>
   <div className="crossSign">
    <i className="fa-solid fa-circle-xmark" onClick={erase}></i>
   </div>
   <img src={dataURL} alt="" id="imgProfile" />

   <CropWindow
    imgSrc={originalURL}
    activate={release}
    deactivate={remoteClose}
    getData={(style) => setImgStyle(style)}
   />
  </div>
 );
};

export default ImgSection;
