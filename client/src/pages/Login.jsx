import React from "react";
import { Link } from "react-router-dom";
import axios from 'axios';
import {useState} from 'react';
import { useNavigate } from "react-router-dom";
import { useContext } from 'react';
import { userContext } from '../context/userContext';

export default function Login() {

 const [email,setEmail] = useState('');
 const [password,setPassword] = useState('');
 const navigate = useNavigate();
 const {user,setUser} =  useContext(userContext);

 const handleLogin = async (e)=>{
  e.preventDefault();
 
 const res = await axios.post('http://localhost:3000/api/auth/login',{email,password},  { withCredentials: true }); 
  setUser(res.data);
  // console.log(res.data);
  console.log("login res.data",res.data);
  console.log("login user",user);
 navigate('/');
}

  return (
<div className="bg-gray-100 h-[100vh] w-[100vw]">
    <div className="flex justify-between items-center p-3  bg-gray-100 md:bg-gray-100">
      <div className="pl-5"><Link to='/'>Blogy</Link></div>
      <div><Link to='/register'>Register</Link></div>
      </div>


    <div className="w-full h-[75vh] flex justify-center items-center bg-gray-100">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold mb-6 text-center text-gray-800">
          Login to your account
        </h2>

        <form className="flex flex-col space-y-4" onSubmit={handleLogin}>
       
            <input 
            type="text"
            placeholder="email"
            className="p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
            name="email"
          />

          <input value = {password}
            type="password"
            placeholder="Password"
            className="p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={(e)=>{setPassword(e.target.value)}}
            name ="password"
          />

          <button
            type="submit"
            className="bg-black text-white py-3 rounded-lg shadow-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500"
          >
            Login
          </button>
        </form>

        <div></div>
        <p className="text-sm text-gray-500 pt-3">
          Don't have an account?{" "}
          <Link className="text-black font-semibold" to="/register">
            Register
          </Link>
        </p>
      </div>
    </div>
    </div>
  );
}
