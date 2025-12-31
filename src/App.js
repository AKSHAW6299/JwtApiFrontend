import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./views/Home";
import Login from "./views/Login";
import SignUp from "./views/SignUp";
import Dashboard from "../src/components/Dashboard";
import Services from "../src/components/Services";
import Settings from "../src/components/Settings";
import FAQ from "../src/components/Faq";
import { UserContext } from "./contextApi/AuthContext";

function App() {
  return (
    <UserContext>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<SignUp />} />

          {/* Dashboard nested routes */}
          <Route path="/dashboard" element={<Dashboard />}>
            <Route index element={<div>Dashboard Home Content</div>} />
            <Route path="services" element={<Services />} />
            <Route path="settings" element={<Settings />} />
            <Route path="faq" element={<FAQ />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </UserContext>
  );
}

export default App;
