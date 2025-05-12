import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Sidebar from "./components/Navbar";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import User from "./pages/User";
import ProtectedRoutes from "./components/ProtectedRoutes";
import LandingPage from "./pages/LandingPage";

const App = () => {

  return (
    <>
      <BrowserRouter>
      <Routes>
          <Route path="/" element={<ProtectedRoutes><Home/></ProtectedRoutes>} />
          <Route path='/welcome' element={<LandingPage/>}/>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/user/:id" element={<ProtectedRoutes><User /></ProtectedRoutes>} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
