import React, { useContext, useEffect, useState } from "react";
import { WebData } from "../contextApi/AuthContext";
import { useNavigate, Outlet } from "react-router-dom";
import Sidebar from "../common_components/Sidebar";
import Navbar from "../common_components/Navbar";

const DashboardLayout = () => {
  const { user } = useContext(WebData);
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(true);

  useEffect(() => {
    if (!user) navigate("/login");
  }, [user]);

  return (
    <div className="h-screen flex flex-col">
      <Navbar toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />

      <div className="flex flex-1">
        <Sidebar isOpen={sidebarOpen} />

        {/* 👇 THIS IS REQUIRED */}
        <main className="flex-1 p-6 bg-gray-100 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
