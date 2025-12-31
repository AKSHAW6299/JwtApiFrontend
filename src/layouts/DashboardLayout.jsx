import React, { useContext, useEffect, useState } from "react";
import { WebData } from "../contextApi/AuthContext";
import { useNavigate, Outlet } from "react-router-dom";
import Navbar from "../common_components/Navbar";
import Sidebar from "../common_components/Sidebar";

const DashboardLayout = () => {
  const { user } = useContext(WebData);
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    if (!user) navigate("/login");
  }, [user, navigate]);

  return (
    // 🔑 FULL VIEWPORT
    <div className="h-screen flex flex-col">
      {/* 🔒 STICKY NAVBAR */}
      <Navbar toggleSidebar={() => setSidebarOpen(true)} />

      {/* 🔑 FLEX AREA (NO BODY SCROLL) */}
      <div className="flex flex-1 overflow-hidden">
        {/* 🔒 STICKY SIDEBAR */}
        <Sidebar
          isOpen={sidebarOpen}
          closeSidebar={() => setSidebarOpen(false)}
        />

        {/* ✅ ONLY CONTENT SCROLLS */}
        <main className="flex-1 overflow-y-auto p-4 md:p-6 bg-gray-100">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
