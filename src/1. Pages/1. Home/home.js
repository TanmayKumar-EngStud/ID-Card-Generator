// major imports
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { motion, AnimatePresence } from "framer-motion";
// file imports (Components first and then the stylings)
import Info from "./1. Info/info";
import "./home.css";

import Modal from "./3. Preview Window/modal";
// Functional component
const Home = () => {
 const [modalOpen, setOpen] = useState(false);

 const close = () => setOpen(false);
 const open = () => setOpen(true);

 let data1 = useSelector((state) => state.data1.value);
 let dispatch = useDispatch();

 return (
  <>
   <div className="home">
    <div className="main">
     <motion.div
      className="heading"
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
     >
      <div className="logo">
       <i className="fa-solid fa-id-card"></i>
      </div>
      <div className="title">ID card Generator</div>
     </motion.div>
    </div>
    <Info onClick={open} />
   </div>
   <AnimatePresence>
    <Modal modalOpen={modalOpen} handleClose={close} />
   </AnimatePresence>
  </>
 );
};
export default Home;
