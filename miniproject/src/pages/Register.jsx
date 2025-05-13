import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleChangeEmail = (e) => {
    setEmail(e.target.value);
  };

  const handleChangePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    const payload = {
      email: email,
      password: password,
    };
    const headers = {
      headers: {
        "x-api-key": "reqres-free-v1",
      },
    };

    try {
      const response = await axios.post(
        "https://reqres.in/api/register",
        payload,
        headers
      );
      console.log(response.data);
      setSuccess("Successfully Registered!");
      setTimeout(() => {
        navigate("/");
      }, 2000);
    } catch (error) {
      console.log(error.message);
      setError("Invalid Credentials!");
    }
  };
  return (
    <div className="relative flex flex-col justify-center items-center gap-5 w-screen h-screen">
      <div className="absolute top-5 right-5">
        <Link to="/welcome">
          <button className="text-black hover:text-blue-500 font-semibold cursor-pointer">
            ← Back to Home
          </button>
        </Link>
      </div>
      <h1 className="font-bold text-3xl">Welcome!</h1>
      {success && <p className="text-green-500 font-semibold">{success}</p>}
      {error && <p className="text-red-500 font-semibold">{error}</p>}
      <input
        onChange={handleChangeEmail}
        type="email"
        placeholder="Email"
        name="email"
        className="px-5 py-2 rounded-3xl border-2 border-black focus:border-blue-500 focus:outline-none transition duration-200"
      />
      <input
        onChange={handleChangePassword}
        type="password"
        placeholder="password"
        name="password"
        className="px-5 py-2 rounded-3xl border-2 border-black focus:border-blue-500 focus:outline-none transition duration-200"
      />
      <p className="text-xs">
        Already have an account?{" "}
        <Link to="/login">
          <span className="hover:text-blue-500">Login</span>
        </Link>
      </p>
      <button
        onClick={handleRegister}
        type="submit"
        className={`px-5 py-2 rounded-3xl font-semibold transition duration-200 ${
          email.includes("@") && password.length >= 6
            ? "bg-black text-white hover:bg-blue-500 cursor-pointer"
            : "bg-gray-300 text-gray-500 cursor-not-allowed"
        }`}
        disabled={!(email.includes("@") && password.length >= 8)}
      >
        Register
      </button>
    </div>
  );
};

export default Register;
