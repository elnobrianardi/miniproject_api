import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Loader } from "lucide-react";
import { motion } from "framer-motion";
import Sidebar from "../components/Sidebar";

const Home = () => {
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(false);

  const fetchUser = async (page) => {
    setLoading(true);
    try {
      const response = await axios.get(
        `https://reqres.in/api/users?page=${page}`,
        { headers: { "x-api-key": "reqres-free-v1" } }
      );
      setUsers(response.data.data);
      setTotalPages(response.data.total_pages);
    } catch (error) {
      console.error("Failed to fetch users", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUser(currentPage);
  }, [currentPage]);

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
  };
  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1);
  };

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex-1 px-4 py-5 overflow-x-hidden min-w-0">
        <h1 className="text-4xl font-bold mb-10 text-center">Users List</h1>
  
        {loading ? (
          <div className="flex justify-center items-center h-40">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
            >
              <Loader className="w-10 h-10 text-blue-500" />
            </motion.div>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
              {users.map((user, index) => (
                <motion.div
                  key={user.id}
                  initial={{ y: 100, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{
                    duration: 0.5,
                    delay: index * 0.1,
                    ease: "easeInOut",
                  }}
                  className="flex flex-col items-center justify-center border-4 border-transparent hover:border-blue-500 rounded-xl cursor-pointer transition duration-400 w-fit mx-auto p-5"
                >
                  <Link to={`/user/${user.id}`}>
                    <img src={user.avatar} alt="" className="rounded-xl" />
                  </Link>
                  <Link to={`/user/${user.id}`}>
                    <h3 className="font-bold text-xl">
                      {user.first_name} {user.last_name}
                    </h3>
                  </Link>
                  <p className="text-xs">{user.email}</p>
                </motion.div>
              ))}
            </div>
            <div className="flex items-center justify-center mt-15">
              <button
                onClick={handlePrevPage}
                className="text-white bg-black pl-10 pr-2 py-2 rounded-l-3xl hover:bg-blue-500 transition duration-200 cursor-pointer font-semibold"
              >
                Prev
              </button>
              <button
                onClick={handleNextPage}
                className="text-white bg-black pl-2 py-2 rounded-r-3xl hover:bg-blue-500 transition duration-200 cursor-pointer font-semibold pr-10"
              >
                Next
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
  
};

export default Home;
