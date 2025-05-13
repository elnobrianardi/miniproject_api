import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Loader } from "lucide-react";
import { motion } from "framer-motion";
import Navbar from "../components/Navbar";
import SearchBar from "../components/SearchBar";
import Breadcrumbs from "../components/Breadcrumbs";
import Footer from "../components/Footer";

const Home = () => {
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState('');

  const fetchUser = async (page) => {
    setLoading(true);
    try {
      const response = await axios.get(
        `https://reqres.in/api/users?page=${page}`,
        { headers: { "x-api-key": "reqres-free-v1" } }
      );

      const enhanchedUsers = response.data.data.map((user) => ({
        ...user,
        description: "A passionate and dedicated individual working in the tech industry.",
        job_division: "Engineering",
        how_long_worked:
          user.id % 2 === 0
            ? "5 years"
            : user.id % 2 === 1
            ? "6 months"
            : "1 months",
        status_level: user.id % 2 === 0
          ? "Manager"
          : user.id % 2 === 1
          ? "Trainee"
          : "Intern",
      }));
      setUsers(enhanchedUsers);
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

  const filteredUsers = users.filter((user) =>
    `${user.first_name} ${user.last_name}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <div className="flex flex-col">
      <Navbar search={search} setSearch={setSearch} />
      <Breadcrumbs />
      <h1 className="text-4xl font-bold mb-5 text-center">Users List</h1>

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
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"> {/* Adjusted gap here */}
            {filteredUsers.map((user, index) => (
              <motion.div
                key={user.id}
                initial={{ y: 100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1, ease: "easeInOut" }}
                className="bg-white shadow-md rounded-xl p-6 w-full max-w-sm mx-auto transform transition-transform duration-300 ease-in-out hover:scale-125 border-4 border-transparent hover:border-blue-500" // Added hover border
              >
                <Link to={`/user/${user.id}`}>
                  <img
                    src={user.avatar}
                    alt="User Avatar"
                    className="w-24 h-24 rounded-full mx-auto mb-4 transform transition-transform duration-300 ease-in-out hover:scale-120"
                  />
                  <h3 className="text-xl font-semibold">{user.first_name} {user.last_name}</h3>
                  <p className="text-gray-500 text-sm mb-4">{user.email}</p>

                  <div className="bg-gray-100 rounded-lg p-4 text-left text-sm space-y-1">
                    <p><span className="font-semibold">Division:</span> {user.job_division}</p>
                    <p><span className="font-semibold">Level:</span> {user.status_level}</p>
                    <p><span className="font-semibold">Experience:</span> {user.how_long_worked}</p>
                  </div>

                  <p className="text-gray-600 text-sm mt-4 italic">"{user.description}"</p>
                </Link>
              </motion.div>
            ))}
          </div>
          <div className="flex items-center justify-center m-15">
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
      <Footer />
    </div>
  );
};

export default Home;
