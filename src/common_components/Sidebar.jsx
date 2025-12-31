import React from "react";
import { Link } from "react-router-dom";

const Sidebar = ({ isOpen }) => {
  return (
    <div
      className={`bg-gray-800 text-white w-60 p-4 transition-all duration-300
        ${isOpen ? "block" : "hidden"} md:block`}
    >
      <nav className="space-y-3">
        <Link to="/dashboard" className="block hover:text-blue-400">
          Dashboard
        </Link>
        <Link to="/dashboard/services" className="block hover:text-blue-400">
          Services
        </Link>
        <Link to="/dashboard/settings" className="block hover:text-blue-400">
          Settings
        </Link>
        <Link to="/dashboard/faq" className="block hover:text-blue-400">
          FAQ
        </Link>
      </nav>
    </div>
  );
};

export default Sidebar;
