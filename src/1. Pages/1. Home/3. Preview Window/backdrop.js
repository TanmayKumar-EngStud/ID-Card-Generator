import { motion } from "framer-motion";
import React from "react";

import "./backdrop.css";
const Backdrop = ({ children, onClick }) => {
 return (
  <motion.div
   className="background"
   initial={{ opacity: 0 }}
   animate={{ opacity: 1 }}
   exit={{ opacity: 0 }}
   onClick={onClick}
  >
   {children}
  </motion.div>
 );
};

export default Backdrop;
