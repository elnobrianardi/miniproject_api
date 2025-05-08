import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Loader } from "lucide-react";
import { motion } from "framer-motion";
import Sidebar from "../components/Sidebar"; // adjust path if needed

const User = () => {
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);
  const { id } = useParams();

  const fetchUser = async () => {
    try {
      const response = await axios.get(`https://reqres.in/api/users/${id}`, {
        headers: { "x-api-key": "reqres-free-v1" },
      });
      setUser(response.data.data);
    } catch (error) {
      console.error("Failed to fetch user", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  if (loading) {
    return (
      <div className="flex h-screen">
        <Sidebar />
        <div className="flex flex-1 items-center justify-center">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
          >
            <Loader className="w-10 h-10 text-blue-500" />
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <motion.div
        className="flex flex-col items-center flex-1 m-5"
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
      >
        <h1 className="mb-10 font-bold text-3xl">User Profile</h1>
        <div className="flex flex-col items-center justify-center p-5 gap-1 rounded-2xl hover:border-blue-500 border-4 border-transparent transition duration-200">
          <img src={user.avatar} alt="" className="rounded-xl" />
          <h3 className="font-bold text-xl">
            {user.first_name} {user.last_name}
          </h3>
          <p className="text-xs">{user.email}</p>
        </div>
      </motion.div>
    </div>
  );
};

export default User;
