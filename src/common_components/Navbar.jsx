import React, { useContext } from "react";
import { WebData } from "../contextApi/AuthContext";
import { logout } from "../utils/Apis";

const Navbar = ({ toggleSidebar }) => {
  const { user } = useContext(WebData);

  return (
    <div className="h-14 bg-gray-900 text-white flex items-center justify-between px-4">
      <div className="flex items-center">
        <button onClick={toggleSidebar} className="mr-4 text-xl">
          ☰
        </button>
        <h1 className="text-lg font-semibold">My Dashboard</h1>
      </div>

      {/* Show only after login */}
      {user && (
        <div className="flex items-center gap-4">
          <span className="text-sm">{user.name}</span>

          <button
            onClick={logout}
            className="px-3 py-1 bg-red-600 rounded hover:bg-red-700"
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
};

export default Navbar;
