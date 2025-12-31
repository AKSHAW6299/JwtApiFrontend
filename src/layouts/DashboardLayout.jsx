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
  }, [user]);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar toggleSidebar={() => setSidebarOpen(true)} />

      <div className="flex flex-1">
        <Sidebar
          isOpen={sidebarOpen}
          closeSidebar={() => setSidebarOpen(false)}
        />

        <main className="flex-1 p-4 md:p-6 bg-gray-100">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
