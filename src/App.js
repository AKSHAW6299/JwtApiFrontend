import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { UserContext } from "./contextApi/AuthContext";

// Public pages
import Login from "./auth/Login";
import SignUp from "./auth/SignUp";

// Dashboard layout & pages
import DashboardLayout from "./layouts/DashboardLayout";
import DashboardHome from "./pages/Dashboard";
import Services from "./pages/Services";
import Settings from "./pages/Settings";
import FAQ from "./pages/Faq";

function App() {
  return (
    <UserContext>
      <BrowserRouter>
        <Routes>

          {/* Default redirect */}
          <Route path="/" element={<Navigate to="/login" replace />} />

          {/* Public Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<SignUp />} />

          {/* Protected Dashboard Routes */}
          <Route path="/dashboard" element={<DashboardLayout />}>
            <Route index element={<DashboardHome />} />
            <Route path="services" element={<Services />} />
            <Route path="settings" element={<Settings />} />
            <Route path="faq" element={<FAQ />} />
          </Route>

          {/* 404 fallback */}
          <Route path="*" element={<Navigate to="/login" replace />} />

        </Routes>
      </BrowserRouter>
    </UserContext>
  );
}

export default App;
