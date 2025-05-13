import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Loader } from "lucide-react";
import { motion } from "framer-motion";
import Navbar from "../components/Navbar";
import Breadcrumbs from "../components/Breadcrumbs";
import Footer from "../components/Footer";

const User = () => {
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);
  const { id } = useParams();

  const fetchUser = async () => {
    try {
      const response = await axios.get(`https://reqres.in/api/users/${id}`, {
        headers: { "x-api-key": "reqres-free-v1" },
      });
      const user = response.data.data;
      const enhancedUser = {
        ...user,
        address: { city: "Sample City" },
        phone: "+1-555-1234",
        social_media: {
          facebook: `https://facebook.com/${user.first_name.toLowerCase()}`,
          twitter: `https://twitter.com/${user.first_name.toLowerCase()}`,
          instagram: `https://instagram.com/${user.first_name.toLowerCase()}`,
        },
        description: "A passionate and dedicated individual working in the tech industry.",
        job_division: "Engineering",
        how_long_worked:
          user.id % 2 === 0
            ? "5 years"
            : user.id % 2 === 1
            ? "6 months"
            : "1 month",
        status_level:
          user.id % 2 === 0
            ? "Manager"
            : user.id % 2 === 1
            ? "Trainee"
            : "Intern",
      };
      setUser(enhancedUser);
      console.log(user);
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
        <Navbar />
        <Breadcrumbs />
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
    <div className="flex flex-col h-full">
      <Navbar />
      <Breadcrumbs />
      <motion.div
        className="flex flex-col items-center flex-1 m-5"
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
      >
        <h1 className="mb-5 font-bold text-3xl">User Profile</h1>
        <div className="flex flex-col items-center justify-center p-5 gap-3 rounded-2xl border-4 border-transparent hover:border-blue-500 transition duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl w-full max-w-sm mx-auto">
          <img
            src={user.avatar}
            alt="User Avatar"
            className="w-24 h-24 rounded-full mx-auto mb-4 transform transition-transform duration-300 ease-in-out hover:scale-110"
          />
          <h3 className="font-bold text-xl">{user.first_name} {user.last_name}</h3>
          <p className="text-xs text-gray-600">{user.email}</p>
          <p className="text-xs text-gray-600">{user.address.city}</p>
          <p className="text-xs text-gray-600">{user.phone}</p>

          <div className="bg-gray-100 rounded-lg p-4 text-left text-sm space-y-1 w-full">
            <p><span className="font-semibold">Facebook:</span> <a href={user.social_media.facebook} className="text-blue-500" target="_blank" rel="noopener noreferrer">{user.social_media.facebook}</a></p>
            <p><span className="font-semibold">Twitter:</span> <a href={user.social_media.twitter} className="text-blue-500" target="_blank" rel="noopener noreferrer">{user.social_media.twitter}</a></p>
            <p><span className="font-semibold">Instagram:</span> <a href={user.social_media.instagram} className="text-blue-500" target="_blank" rel="noopener noreferrer">{user.social_media.instagram}</a></p>
          </div>

          <div className="mt-4 space-y-1 text-xs text-gray-600">
            <p><span className="font-semibold">Description:</span> {user.description}</p>
            <p><span className="font-semibold">Job Division:</span> {user.job_division}</p>
            <p><span className="font-semibold">Status Level:</span> {user.status_level}</p>
            <p><span className="font-semibold">Experience:</span> {user.how_long_worked}</p>
          </div>
        </div>
      </motion.div>
      <Footer />
    </div>
  );
};

export default User;
