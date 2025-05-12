import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Loader } from "lucide-react";
import { motion } from "framer-motion";
import Navbar from "../components/Navbar"; // adjust path if needed
import Breadcrumbs from "../components/Breadcrumbs";

const User = () => {
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);
  const { id } = useParams();

  const fetchUser = async () => {
    try {
      const response = await axios.get(`https://reqres.in/api/users/${id}`, {
        headers: { "x-api-key": "reqres-free-v1" },
      });
      const user = response.data.data
      const enhanchedUsers = {
        ...user,
        address: {
          street: "123 Main St",
          city: "Sample City",
          zip: "12345",
        },
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
            : "1 months",
      status_level: user.id % 2 === 0
      ? "Manager"
      : user.id % 2 === 1
      ? "Trainee"
      : "Intern",
      }
      setUser(enhanchedUsers);
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
        <Breadcrumbs/>
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
    <div className="flex flex-col">
      <Navbar />
      <Breadcrumbs/>
      <motion.div
        className="flex flex-col items-center flex-1"
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
      >
        <h1 className="mb-5 font-bold text-3xl">User Profile</h1>
        <div className="flex flex-col items-center justify-center p-5 gap-1 rounded-2xl hover:border-blue-500 border-4 border-transparent transition duration-200">
          <img src={user.avatar} alt="" className="rounded-xl" />
          <h3 className="font-bold text-xl">
            {user.first_name} {user.last_name}
          </h3>
          <p className="text-xs">{user.email}</p>
          <p className="text-xs">{user.address.street}</p>
          <p className="text-xs">{user.address.city}</p>
          <p className="text-xs">{user.address.zip}</p>
          <p className="text-xs">{user.phone}</p>
          <p className="text-xs">{user.social_media.facebook}</p>
          <p className="text-xs">{user.social_media.twitter}</p>
          <p className="text-xs">{user.social_media.instagram}</p>
          <p className="text-xs">{user.description}</p>
          <p className="text-xs">{user.job_division}</p>
          <p className="text-xs">{user.status_level}</p>
          <p className="text-xs">{user.how_long_worked}</p>
        </div>
      </motion.div>
    </div>
  );
};

export default User;
