import React from "react";
import { NavLink } from "react-router-dom";

const Sidebar = ({ isOpen, closeSidebar }) => {
  return (
    <>
      {/* MOBILE OVERLAY */}
      {isOpen && (
        <div
          onClick={closeSidebar}
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
        />
      )}

      <aside
        className={`fixed md:static top-0 left-0 h-full w-64 bg-gray-800 text-white z-50
          transform transition-transform duration-300
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0`}
      >
        <div className="p-4 font-bold text-lg">Menu</div>

        <nav className="flex flex-col p-4 gap-3">
          <NavLink to="/dashboard" end className="hover:text-blue-400">
            Dashboard
          </NavLink>
          <NavLink to="/dashboard/services" className="hover:text-blue-400">
            Services
          </NavLink>
          <NavLink to="/dashboard/settings" className="hover:text-blue-400">
            Settings
          </NavLink>
          <NavLink to="/dashboard/faq" className="hover:text-blue-400">
            FAQ
          </NavLink>
        </nav>
      </aside>
    </>
  );
};

export default Sidebar;
