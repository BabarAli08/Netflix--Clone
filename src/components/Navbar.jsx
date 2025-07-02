import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaSearch, FaBell, FaBars, FaTimes } from 'react-icons/fa';
import { useDispatch } from 'react-redux';
import { logOut } from '../app/features/counter/UserSlice';
import { auth } from '../Firebase';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false); // profile dropdown
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false); // mobile nav
  const [show, setShow] = useState(false);
  const dispatch = useDispatch();
  const dropdownRef = useRef();
  const navigate = useNavigate();

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

  const navLinks = [
    "Home",
    "TV Shows",
    "Movies",
    "New & Popular",
    "My List",
    "Browse by Languages"
  ];

  return (
    <div
      className={`flex justify-between items-center px-4 md:px-8 py-4 text-white text-sm fixed top-0 left-0 w-full z-50 transition-colors duration-500 ${show ? 'bg-black' : 'bg-gradient-to-b from-black/90 to-transparent'}`}
    >
      {/* Left Nav */}
      <div className="flex items-center space-x-4 md:space-x-8">
        <img
          onClick={() => navigate('/')}
          src="https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg"
          className="h-6 cursor-pointer"
          alt="Netflix Logo"
        />

        {/* Desktop Links */}
        <ul className="hidden md:flex space-x-6 font-light">
          {navLinks.map((link, i) => (
            <li key={i} className="cursor-pointer hover:underline">
              {link}
            </li>
          ))}
        </ul>

        {/* Mobile menu icon */}
        <button
          className="md:hidden text-lg focus:outline-none"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {/* Right Nav */}
      <div className="flex items-center space-x-4 md:space-x-6" ref={dropdownRef}>
        <FaSearch className="cursor-pointer" />
        <span className="cursor-pointer hidden sm:inline">Children</span>
        <FaBell className="cursor-pointer" />

        {/* Avatar and Dropdown */}
        <div className="relative">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png"
            className="w-8 h-8 rounded cursor-pointer"
            onClick={() => setIsOpen(!isOpen)}
            alt="Profile"
          />

          {isOpen && (
            <div className="absolute right-0 mt-2 w-32 bg-black text-white border border-gray-700 rounded-md shadow-lg z-50">
              <button
                className="w-full text-left px-4 py-2 hover:bg-gray-800"
                onClick={() => {
                  setIsOpen(false);
                  navigate('/profile');
                }}
              >
                Profile
              </button>
              <button
                className="w-full text-left px-4 py-2 hover:bg-gray-800"
                onClick={() => {
                  auth.signOut().then(() => {
                    dispatch(logOut());
                    navigate('/');
                  });
                }}
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Nav Menu */}
      {mobileMenuOpen && (
        <div className="absolute top-16 left-0 w-full bg-black text-white flex flex-col px-6 py-4 space-y-3 md:hidden z-40">
          {navLinks.map((link, i) => (
            <span
              key={i}
              className="hover:underline cursor-pointer"
              onClick={() => setMobileMenuOpen(false)}
            >
              {link}
            </span>
          ))}
        </div>
      )}
    </div>
  );
};

export default Navbar;
