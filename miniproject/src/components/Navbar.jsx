import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { motion } from "framer-motion";
import SearchBar from "./SearchBar";

const Navbar = ({search, setSearch}) => {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [rotation, setRotation] = useState(0);

  const handleClick = () => {
    setIsOpen(!isOpen);
    setRotation((prev) => prev + 360);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="bg-white shadow-md px-5 py-2">
      {/* Header: Burger icon and Logo/Title */}
      <div className="flex justify-between items-center md:hidden">
        <motion.button
          onClick={handleClick}
          className="cursor-pointer"
          animate={{ rotate: rotation }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </motion.button>
        <div className="text-lg font-bold">MyApp</div>
      </div>

      {/* Navbar Links (Desktop) */}
      <div className="hidden md:flex justify-between gap-2 items-center md:mt-0">
        <div className="flex gap-2">
        <Link
          to="/"
          className="text-center md:text-left transition duration-200 hover:bg-blue-500 hover:text-white rounded-3xl px-5 py-2 font-semibold"
        >
          Home
        </Link>
        {token ? (
          <button
            onClick={handleLogout}
            className="transition duration-200 hover:bg-blue-500 hover:text-white rounded-3xl px-5 py-2 cursor-pointer font-semibold"
          >
            Log Out
          </button>
        ) : (
          <Link to="/login">
            <button className="transition duration-200 hover:bg-blue-500 hover:text-white rounded-3xl px-5 py-2 cursor-pointer font-semibold">
              Login
            </button>
          </Link>
        )}
        </div>
        <div className="hidden md:block ">
        {
            token && (
              <SearchBar search={search} setSearch={setSearch}/>
            )
          }
        </div>
        
        
      </div>

      {/* Navbar Links (Mobile Menu) */}
      {isOpen && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="flex flex-col gap-3 mt-3 md:hidden"
        >
          <Link
            to="/"
            onClick={() => setIsOpen(false)}
            className="transition duration-200 hover:bg-blue-500 hover:text-white px-5 py-2 rounded-3xl font-semibold text-left"
          >
            Home
          </Link>
          {token ? (
            <button
              onClick={() => {
                handleLogout();
                setIsOpen(false);
              }}
              className="transition duration-200 hover:bg-blue-500 hover:text-white px-5 py-2 rounded-3xl font-semibold text-left"
            >
              Log Out
            </button>
          ) : (
            <Link to="/login" onClick={() => setIsOpen(false)}>
              <button className="transition duration-200 hover:bg-blue-500 hover:text-white px-5 py-2 rounded-3xl font-semibold text-left">
                Login
              </button>
            </Link>
          )}
          {
            token && (
              <SearchBar search={search} setSearch={setSearch}/>
            )
          }
        </motion.div>
      )}
    </div>
  );
};

export default Navbar;
