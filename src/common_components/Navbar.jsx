import React, { useContext } from "react";
import { WebData } from "../contextApi/AuthContext";
import { logout } from "../utils/Apis";

const Navbar = ({ toggleSidebar }) => {
  const { user } = useContext(WebData);

  return (
    <header className="sticky top-0 z-50 h-14 bg-gray-900 text-white flex items-center justify-between px-4">
      <div className="flex items-center gap-3">
        {/* MOBILE TOGGLE */}
        <button
          onClick={toggleSidebar}
          className="md:hidden text-2xl"
        >
          ☰
        </button>

        <h1 className="font-semibold">Dashboard</h1>
      </div>

      {user && (
        <div className="flex items-center gap-3">
          <span className="hidden sm:block text-sm">{user.name}</span>
          <button
            onClick={logout}
            className="bg-red-600 px-3 py-1 rounded text-sm"
          >
            Logout
          </button>
        </div>
      )}
    </header>
  );
};

export default Navbar;
