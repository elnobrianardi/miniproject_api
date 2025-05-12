import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const handleChangeEmail = (e) => {
    setEmail(e.target.value);
  };

  const handleChangePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
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
        "https://reqres.in/api/login",
        payload,
        headers
      );
      setSuccess("Successfully Logged in!");
      localStorage.setItem("token", response.data.token);
      setTimeout(() => {
        navigate("/");
      }, 2000);
    } catch (error) {
      console.log(error.message);
      setError("Invalid Credentials!");
    }
  };

  return (
    <div className="flex flex-col justify-center items-center gap-5 w-screen h-screen">
      <h1 className="font-bold text-3xl">Welcome Back!</h1>
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
        placeholder="Password"
        name="password"
        className="px-5 py-2 rounded-3xl border-2 border-black focus:border-blue-500 focus:outline-none transition duration-200"
      />
      <p className="text-xs">
        Don't have an account?{" "}
        <Link to="/register">
          <span className="hover:text-blue-500">Register</span>
        </Link>
      </p>
      <button
        onClick={handleSubmit}
        type="submit"
        className={`px-5 py-2 rounded-3xl font-semibold transition duration-200 ${
          email.includes("@") && password.length >= 6
            ? "bg-black text-white hover:bg-blue-500 cursor-pointer"
            : "bg-gray-300 text-gray-500 cursor-not-allowed"
        }`}
        disabled={!(email.includes("@") && password.length >= 8)}
      >
        Login
      </button>
    </div>
  );
};

export default Login;
