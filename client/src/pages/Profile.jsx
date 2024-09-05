import React, { useEffect, useState } from "react";
import { Navbar } from "../components/Navbar";
import Profileposts from "../components/Profileposts";
import Footer from "../components/Footer";
// import { userContext } from '../context/userContext';
import Loader from "../components/Loader";
import axios from "axios";
import {useParams} from "react-router-dom";

export default function Profile() {
 
const [username,setUsername] = useState('');
const [email,setEmail] = useState('');
const [password,setPassword] = useState('');
const { id } = useParams();
const [user,setUser] = useState(null);
 
useEffect(()=>{
 async function fetchUser(){
  try {
    const res = await axios.get(`http://localhost:3000/api/users/${id}`);
   setUser(res.data);
  setUsername(res.data.username);
  setEmail(res.data.email);
 }catch(err){
  console.log(err);
 }

}
  fetchUser();
},[id]);

const handleUpdate = async () => {
  try {
    const response = await axios.put(`http://localhost:3000/api/users/${id}`, {
      username,
      email,
      password,
    }, { withCredentials: true });
    alert(response.data.message);
    setPassword('');
  } catch (error) {
    console.error(error);
    alert('Failed to update user');
  }
};

const handleDelete= async () => {
  try {
    const response = await axios.delete(`http://localhost:3000/api/users/${id}`, { withCredentials: true });
    alert(response.data.msg);
  } catch (error) {
    console.error(error);
    alert('Failed to delete user');
  }
};

  if (!user) {
    return <div><Loader /></div>;
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <main className="container mx-auto p-6 md:p-8 flex flex-col md:flex-row gap-6">
        {/* Profile Section */}
        <section className="bg-white p-6 rounded-lg shadow-md flex-1">
          <h2 className="text-2xl font-semibold mb-4">{user.username.toUpperCase()}</h2>
          <form className="space-y-4">
            <div className="flex flex-col">
              <label htmlFor="name" className="text-gray-700">Name</label>
              <input
                type="text"
                id="name"
                value={username}
                onChange={(e)=> {
                  setUsername(e.target.value)
                  console.log(username)}}
                className="mt-1 px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your name"
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="email" className="text-gray-700">Email</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e)=> setEmail(e.target.value)}
                className="mt-1 px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your email"
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="password" className="text-gray-700">Password</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e)=>setPassword(e.target.value)}
                className="mt-1 px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your password"
              />
            </div>
            <div className="flex space-x-4">
              <button
                type="button"
                onClick={handleUpdate}
                className="px-4 py-2 bg-blue-500 text-white rounded-md shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                Update
              </button>
              <button
                type="button"
                onClick={handleDelete}

                className="px-4 py-2 bg-red-500 text-white rounded-md shadow-sm hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
              >
                Delete
              </button>
            </div>
          </form>
        </section>

        {/* Posts Section */}
        <section className="bg-white p-6 rounded-lg shadow-md flex-1">
          <h2 className="text-2xl font-semibold mb-4">Your Posts</h2>
          <div className="space-y-4">
            <Profileposts />
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
