import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from 'axios';
import { useNavigate } from "react-router-dom";  

export default function Register() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [err,setErr] = useState(false);
  const navigate = useNavigate();

const handleRegister = async (e)=>{

      e.preventDefault();
    try{

        const res = await axios.post('http://localhost:3000/api/auth/register',{username,email,password});
        setEmail(res.data.email);
        setUsername(res.data.username);
        setPassword(res.data.password);
        navigate('/login');
    }catch(err){
      setErr(true);
    }
}


  return (
    <div className="bg-gray-100 h-[100vh] w-[100vw]">
      <div className="flex justify-between items-center p-3  bg-gray-100 md:bg-gray-100">
        <div className="pl-5">
          <Link to="/">Blogy</Link>
        </div>
        <div>
          <Link to="/login">Login</Link>
        </div>
      </div>

      <div className="w-full h-[75vh] flex justify-center items-center bg-gray-100">
        <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold mb-6 text-center text-gray-800">
            Register your account
          </h2>

          <form className="flex flex-col space-y-4" onSubmit={handleRegister}>
            <input required
              type="text"
              value={username}
              placeholder="name"
              className="p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              onChange={(e) => {
                setUsername(e.target.value);
              }}
            />

            <input required
              type="text"
              value = {email}
              placeholder="Username"
              className="p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            
            />

            <input required
              type="password"
              value={password}
              placeholder="Password"
              className="p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              
              
              />

            <button
              type="submit"
              className="bg-black text-white py-3 rounded-lg shadow-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500"
            >
              Register
            </button>
          </form>
      {err && <h2 className="text-red-800">somethiing is wwrong </h2>}
          <div></div>
          <p className="text-sm text-gray-500 pt-3">
            Already have an account?
            <Link className="text-black font-semibold pl-1" to="/login">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
