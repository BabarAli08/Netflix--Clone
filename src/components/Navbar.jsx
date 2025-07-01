import React, { useState, useRef, useEffect } from 'react';
import { FaSearch, FaBell } from 'react-icons/fa';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [show, setShow] = useState(false);
  const dropdownRef = useRef();

  const transitionNavbar = () => {
    if (window.scrollY > 100) {
      setShow(true);
    } else {
      setShow(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", transitionNavbar);
    return () => window.removeEventListener("scroll", transitionNavbar);
  }, []);

  useEffect(() => {
    const closeDropdown = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', closeDropdown);
    return () => document.removeEventListener('mousedown', closeDropdown);
  }, []);

  return (
    <div className={`flex justify-between items-center px-8 py-4 text-white text-sm fixed top-0 left-0 w-full z-50 transition-colors duration-500 ${show ? 'bg-black' : 'bg-transparent'}`}>
      {/* Left Nav */}
      <div className="flex items-center space-x-8 cursor-pointer">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg"
          className="h-6"
          alt="Netflix Logo"
        />
        <ul className="flex space-x-6 font-light">
          <li className="cursor-pointer hover:underline">Home</li>
          <li className="cursor-pointer hover:underline">TV Shows</li>
          <li className="cursor-pointer hover:underline">Movies</li>
          <li className="cursor-pointer hover:underline">New & Popular</li>
          <li className="cursor-pointer hover:underline">My List</li>
          <li className="cursor-pointer hover:underline">Browse by Languages</li>
        </ul>
      </div>

      {/* Right Nav */}
      <div className="flex items-center space-x-6" ref={dropdownRef}>
        <FaSearch className="cursor-pointer" />
        <span className="cursor-pointer">Children</span>
        <FaBell className="cursor-pointer" />
        <div className="relative">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png"
            className="w-8 h-8 rounded cursor-pointer"
            onClick={() => setIsOpen(!isOpen)}
            alt="Profile"
          />
          {isOpen && (
            <div className="absolute right-0 mt-2 w-32 bg-black text-white border border-gray-700 rounded-md shadow-lg">
              <button
                className="w-full text-left px-4 py-2 hover:bg-gray-800"
                onClick={() => {
                  setIsOpen(false);
                  alert("Logged out");
                }}
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
