import React, { useState, useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import { CiSearch } from "react-icons/ci";
import { FaBars } from "react-icons/fa6";
import Menu from "./Menu";
import { userContext } from '../context/userContext';

export const Navbar = ({ setFilter }) => {
  const { user } = useContext(userContext);
  const [menu, setMenu] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const path = useLocation().pathname;

  function showMenu() {
    setMenu(!menu);
  }

  function handleSearch(e) {
    setSearchValue(e.target.value);
    setFilter(e.target.value);
  }

  return (
    <div className="flex justify-between items-center p-3" style={{ position: 'relative', background: 'linear-gradient(90deg, rgba(0,0,0,0.8), rgba(0,0,0,0.5))', borderRadius: '0px' }}>
      <div className="pl-5"><Link to='/' className="text-white font-bold text-xl hover:text-gray-300 transition-colors">Blogy</Link></div>

      {path === '/' && (
        <div className="flex items-center shadow-sm bg-white rounded-full overflow-hidden">
          <p className="p-2"><CiSearch className="text-gray-500" /></p>
          <input
            type="text"
            value={searchValue}
            className="border-none outline-none pl-1 bg-transparent w-64"
            placeholder="Search posts...."
            onChange={handleSearch}
          />
        </div>
      )}

      <div className="hidden md:flex gap-3 pr-5">
        {user ? (
          <>
            <div><Link to='/write' className="text-white hover:text-gray-300 transition-colors">Write</Link></div>
            <div onClick={showMenu} className="pt-1 cursor-pointer">
              <FaBars className="text-white" />
              {menu && <Menu />}
            </div>
          </>
        ) : (
          <>
            <div><Link to="/login" className="text-white hover:text-gray-300 transition-colors">Login</Link></div>
            <div><Link to="/register" className="text-white hover:text-gray-300 transition-colors">Register</Link></div>
          </>
        )}
      </div>

      <div onClick={showMenu} className="md:hidden cursor-pointer">
        <FaBars className="text-white" />
        {menu && <Menu />}
      </div>
    </div>
  );
};
