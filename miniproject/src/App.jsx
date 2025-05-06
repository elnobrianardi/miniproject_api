import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import User from "./pages/User";
import ProtectedRoutes from "./components/ProtectedRoutes";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Sidebar />
        <Routes>
          <Route path="/" element={<ProtectedRoutes><Home/></ProtectedRoutes>} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/user/:id" element={<ProtectedRoutes><User /></ProtectedRoutes>} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
};

export default App;
