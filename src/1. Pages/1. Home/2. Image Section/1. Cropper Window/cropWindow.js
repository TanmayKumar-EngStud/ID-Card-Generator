import { motion } from "framer-motion";
import React, { useState, useRef } from "react";

import "./cropWindow.css";
import "react-image-crop/dist/ReactCrop.css";

// importing for react crop
import ReactCrop, { centerCrop, makeAspectCrop } from "react-image-crop";
import { useDebounceEffect } from "./1. Additional files/debounceEffect.ts";
import { canvasPreview } from "./1. Additional files/canvasPreview.ts";

function centerAspectCrop(mediaWidth, mediaHeight, aspect) {
 return centerCrop(
  makeAspectCrop(
   {
    unit: "%",
    width: 100,
   },
   aspect,
   mediaWidth,
   mediaHeight
  ),
  mediaWidth,
  mediaHeight
 );
}

const CropWindow = (props) => {
 const enact = {
  begin: {
   y: "70%",
   x: "50%",
   opacity: 0,
   scale: 0,
  },
  action: {
   y: "10%",
   x: "-20%",
   opacity: 1,
   scale: 1,
   transition: {
    duration: 0.5,
   },
  },
 };
 const imgSrc = props.imgSrc;
 const previewCanvasRef = useRef(null);

 const imgRef = useRef(null);
 const [crop, setCrop] = useState(undefined);
 const [completedCrop, setCompletedCrop] = useState();
 const [scale, setScale] = useState(1);
 const [rotate, setRotate] = useState(0);
 const aspect = 7 / 9;

 function onImageLoad(e) {
  if (aspect) {
   const { width, height } = e.currentTarget;
   setCrop(centerAspectCrop(width, height, aspect));
  }
 }

 // PreviewCanvas Reference is changed here in the debounce effect.
 useDebounceEffect(
  async () => {
   if (
    completedCrop?.width &&
    completedCrop?.height &&
    imgRef.current &&
    previewCanvasRef.current
   ) {
    canvasPreview(
     imgRef.current,
     previewCanvasRef.current,
     completedCrop,
     scale,
     rotate
    );
   }
  },
  100,
  [completedCrop, scale, rotate]
 );

 function resetCrop(c) {
  setCrop(c);
 }
 function getImage() {
  let canvas = previewCanvasRef.current;
  // we just have to convert the canvas into image
  let newURI = canvas.toDataURL("image/png");
  props.getData(newURI);
  props.deactivate();
  // now we have to pass this back to parent
 }
 if (props.activate) {
  return (
   <motion.div
    className="cropWindow"
    variants={enact}
    initial="begin"
    animate="action"
   >
    <div className="cross" onClick={props.deactivate}>
     <i className="fa-solid fa-circle-xmark"></i>
    </div>
    <div className="heading">
     <h2>Crop Window</h2>
    </div>
    <div className="Cropping-Zone">
     <ReactCrop
      crop={crop}
      onChange={(_, percentCrop) => resetCrop(percentCrop)}
      onComplete={(c) => setCompletedCrop(c)}
      aspect={aspect}
     >
      <img
       ref={imgRef}
       alt="Crop me"
       src={imgSrc}
       style={{ transform: `scale(${scale}) rotate(${rotate}deg)` }}
       onLoad={onImageLoad}
      />
     </ReactCrop>
    </div>
    <div className="construction">
     <div className="elem">
      <label htmlFor="scale-input">Scale: </label>
      <input
       id="scale-input"
       type="number"
       step="0.1"
       value={scale}
       disabled={!imgSrc}
       onChange={(e) => setScale(Number(e.target.value))}
      />
     </div>
     <div className="elem">
      <label htmlFor="rotate-input">Rotate: </label>
      <input
       id="rotate-input"
       type="number"
       value={rotate}
       disabled={!imgSrc}
       onChange={(e) =>
        setRotate(Math.min(180, Math.max(-180, Number(e.target.value))))
       }
      />
     </div>
    </div>
    <div className="canvas">
     {!!completedCrop && (
      <canvas
       ref={previewCanvasRef}
       style={{
        border: "1px solid black",
        objectFit: "contain",
        width: completedCrop.width + "px",
        height: completedCrop.height + "px",
       }}
      />
     )}
    </div>
    <button onClick={getImage}>
     <i className="fa-solid fa-crop-simple"></i> Crop
    </button>
   </motion.div>
  );
 }
};
export default CropWindow;
