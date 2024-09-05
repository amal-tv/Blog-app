import React, { useContext } from 'react'
import { userContext } from '../context/userContext';
import axios from "axios";
import Footer from "../components/Footer";
import { Navbar } from "../components/Navbar";
import Profileposts from '../components/Profileposts';

export default function myblogs() {

  return (

    <div className="flex flex-col justify-between min-h-screen">   
   <Navbar />
   <Profileposts/>
     <Footer />
  </div>
    

      
);
}

  
