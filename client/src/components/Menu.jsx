import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { userContext } from '../context/userContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function Menu() {
  const { user, setUser } = useContext(userContext);
  const navigate = useNavigate();

  async function handleLogout() {
    try {
      await axios.get('http://localhost:3000/api/auth/logout', { withCredentials: true });
      setUser(null);
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <>
      <div className='fixed inset-0 bg-black/30 z-40'></div>
      <div className='fixed top-16 right-4 bg-white shadow-lg rounded-lg w-48 z-50'>
        {!user ? (
          <>
            <Link to="/register" className='block py-3 px-5 text-gray-800 hover:bg-gray-200 hover:text-blue-500 transition-colors duration-300 text-lg font-medium'>
              Register
            </Link>
            <Link to="/login" className='block py-3 px-5 text-gray-800 hover:bg-gray-200 hover:text-blue-500 transition-colors duration-300 text-lg font-medium'>
              Login
            </Link>
          </>
        ) : (
          <>
            <Link to="/myblogs" className='block py-3 px-5 text-gray-800 hover:bg-gray-200 hover:text-blue-500 transition-colors duration-300 text-lg font-medium'>
              My Blogs
            </Link>
            <Link to={`/profile/${user.userId}`} className='block py-3 px-5 text-gray-800 hover:bg-gray-200 hover:text-blue-500 transition-colors duration-300 text-lg font-medium'>
              Profile
            </Link>
            <div onClick={handleLogout} className='block py-3 px-5 text-gray-800 hover:bg-gray-200 hover:text-blue-500 transition-colors duration-300 text-lg font-medium cursor-pointer'>
              Logout
            </div>
            <Link to='/write' className='md:hidden block py-3 px-5 text-gray-800 hover:bg-gray-200 hover:text-blue-500 transition-colors duration-300 text-lg font-medium'>
              Write
            </Link>
          </>
        )}
      </div>
    </>
  );
}
