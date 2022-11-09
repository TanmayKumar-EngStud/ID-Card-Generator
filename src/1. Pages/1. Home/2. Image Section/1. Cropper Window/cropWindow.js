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
   const [originPoint, setOriginPoint] = useState({});
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
   function rotateOperation(e) {
      let cropInfo = completedCrop;
      // this will help in set image's new origin.
      const x = cropInfo.x + cropInfo.height / 2;
      const y = cropInfo.y + cropInfo.width / 2;
      setOriginPoint({ x: x, y: y });
      imgRef.current.style.transformOrigin = x + "px " + y + "px ";
      setRotate(Math.min(180, Math.max(-180, Number(e.target.value))));
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
                     style={{
                        transform: `scale(${scale}) rotate(${rotate}deg)`,
                     }}
                     onLoad={onImageLoad}
                  />
               </ReactCrop>
            </div>
            <div className="construction">
               <div className="elem">
                  <label htmlFor="scale-input">Scale: </label>
                  <input
                     id="scale-input"
                     type="range"
                     step="0.1"
                     min="0"
                     max="2"
                     list="tickmarks1"
                     value={scale}
                     disabled={!imgSrc}
                     onChange={(e) => setScale(Number(e.target.value))}
                  />
                  <datalist id="tickmarks1">
                     <option value="0" label="0"></option>
                     <option value="0.5" label="0.5"></option>
                     <option value="1" label="1"></option>
                     <option value="1.5" label="1.5"></option>
                     <option value="2" label="2"></option>
                  </datalist>
               </div>
               <div className="elem">
                  <label htmlFor="rotate-input">Rotate: </label>
                  <input
                     id="rotate-input"
                     type="range"
                     value={rotate}
                     min="-180"
                     max="180"
                     step="10"
                     list="tickmarks2"
                     disabled={!imgSrc}
                     onChange={(e) => rotateOperation(e)}
                  />
                  <datalist id="tickmarks2">
                     <option value="-180" label="-180"></option>
                     <option value="-90" label="-90"></option>
                     <option value="0" label="0"></option>
                     <option value="90" label="90"></option>
                     <option value="180" label="180"></option>
                  </datalist>
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
