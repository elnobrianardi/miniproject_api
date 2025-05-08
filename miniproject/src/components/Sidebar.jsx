import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

const Sidebar = () => {
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
    <div className="h-screen bg-white shadow-md px-5 py-4">
      {/* Burger Icon for mobile */}
      <div className="flex justify-between items-center md:hidden">
        <motion.button
          onClick={handleClick}
          className="cursor-pointer"
          animate={{ rotate: rotation }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </motion.button>
      </div>

      {/* Sidebar Container */}
      <motion.div
        key="sidebar"
        initial={{ x: -200, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        exit={{ x: -200, opacity: 0 }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
        className={`${
          isOpen ? "w-64" : "w-0" // Toggle width on small screens
        } md:w-48 flex overflow-hidden flex-col gap-5 mt-5 items-center md:mt-0 transition-all duration-500 ease-in-out`}
      >
        {/* Sidebar Links */}
        <Link
          to="/"
          className="text-center md:text-left transition duration-200 hover:bg-blue-500 hover:text-white px-5 py-2 rounded-3xl font-semibold"
        >
          Home
        </Link>
        {token ? (
          <button
            onClick={handleLogout}
            className="transition duration-200 hover:bg-blue-500 hover:text-white px-5 py-2 rounded-3xl cursor-pointer font-semibold"
          >
            Log Out
          </button>
        ) : (
          <Link to="/login">
            <button className="transition duration-200 hover:bg-blue-500 hover:text-white px-5 py-2 rounded-3xl cursor-pointer font-semibold">
              Login
            </button>
          </Link>
        )}
      </motion.div>
    </div>
  );
};

export default Sidebar;
