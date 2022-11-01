import { motion } from "framer-motion";
import Backdrop from "./backdrop";
import React from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { useSelector } from "react-redux";

import idFront from "./Images/idFront.png";
import idBack from "./Images/idBack.png";
import "./modal.css";

const Modal = ({ modalOpen, handleClose }) => {
 let data = useSelector((store) => store.data1);
 const dropin = {
  hidden: {
   y: "-100vh",
   x: "-50%",
   opacity: 0,
   transfrom: {
    translateY: "-50%",
   },
  },
  visible: {
   display: "flex",
   opacity: 1,
   transfrom: {
    translateY: "-50%",
   },
   y: "-50%",
   x: "-50%",
   transition: {
    duration: 1,
    type: "spring",
    damping: 25,
    stiffness: 500,
   },
  },
  exit: {
   y: "100vh",
   opacity: 0,
   transfrom: {
    translateY: "-50%",
   },
  },
 };
 let takeSnap = async () => {
  let front = document.querySelector(".id_card.front");
  let back = document.querySelector(".id_card.back");
  await html2canvas(front).then((canvas) => {
   let URI = canvas.toDataURL();
   if (window.navigator.msSaveBlob) {
    window.navigator.msSaveBlob(
     canvas.msToBlob(),
     "ID-front @" + data.name + ".png"
    );
    return;
   } else {
    const a = document.createElement("a");
    a.style.hidden = true;
    document.body.appendChild(a);
    a.href = URI;
    a.download = "ID-front @" + data.name + ".png";
    a.click();
   }
  });
  await html2canvas(back).then((canvas) => {
   let URI = canvas.toDataURL();
   if (window.navigator.msSaveBlob) {
    window.navigator.msSaveBlob(
     canvas.msToBlob(),
     "ID-back @" + data.name + ".png"
    );
    return;
   } else {
    const a = document.createElement("a");
    a.style.hidden = true;
    document.body.appendChild(a);
    a.href = URI;
    a.download = "ID-back @" + data.name + ".png";
    a.click();
   }
  });
 };
 if (modalOpen) {
  return (
   <Backdrop onClick={handleClose}>
    <motion.div
     onClick={(e) => e.stopPropagation()}
     className="modal"
     variants={dropin}
     initial="hidden"
     animate="visible"
     exit="exit"
    >
     <h2>Results:</h2>
     <div className="imgGrp">
      <div className="id_card front">
       <img src={idFront} alt="Id Card front" />
       <div className="dummy" id="img">
        <img src={data.URL} alt="User Image" />
       </div>
       <div className="dummy" id="name">
        {data.name}
       </div>
       <div className="dummy" id="position">
        {data.position}
       </div>
      </div>
      <div className="id_card back">
       <img src={idBack} alt="Id card back" />
       <div className="dummy" id="id">
        {data.id}
       </div>
       <div className="dummy" id="phone">
        {data.phone}
       </div>
       <div className="dummy" id="bloodGroup">
        {data["Blood Group"]}
       </div>
       <div className="dummy" id="emergencyPh">
        {data["Emergency Phone"]}
       </div>
      </div>
     </div>
     <div className="buttonGrp">
      <button onClick={takeSnap}>Download</button>
      <button onClick={handleClose}> close</button>
     </div>
    </motion.div>
   </Backdrop>
  );
 }
};

export default Modal;
