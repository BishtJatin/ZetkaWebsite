import React from "react";
import { MdQuestionMark } from "react-icons/md";
import { IoDiamondOutline } from "react-icons/io5";
import { GrGroup } from "react-icons/gr";
import { FaUser } from "react-icons/fa";
import { RiArrowDownSLine } from "react-icons/ri";

const Sidebar = () => (
 <div>
   <div className="sidebar no-scrollbar  h-36 overflow-y-auto top-36 z-50 fixed  left-4 transform -translate-y-1/2 bg-gray-400 bg-opacity-60 p-4 rounded-lg flex flex-col">
    <a href="#"><i className="fas  text-black "></i><MdQuestionMark /></a>
    <a href="#"><i className="fas  text-black  mt-2"></i><IoDiamondOutline /></a>
    <a href="#"><i className="fas   text-black mt-2"></i><GrGroup /></a>
    <a href="#"><i className="fas  text-black mt-4"><FaUser /></i></a>
    <a href="#"><i className="fas  text-black mt-2"><RiArrowDownSLine /></i></a>
  </div>
  
 </div>
);

export default Sidebar;
