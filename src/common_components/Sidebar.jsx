import { NavLink } from "react-router-dom";
import { useContext } from "react";
import { WebData } from "../contextApi/AuthContext";

const Sidebar = ({ isOpen, closeSidebar }) => {
  const { role } = useContext(WebData);

  const linkClass = ({ isActive }) =>
    `block px-4 py-2 rounded-md text-sm font-medium
     ${isActive ? "bg-gray-700 text-white" : "text-gray-300 hover:bg-gray-700"}`;

  return (
    <aside className="bg-gray-800 text-white w-64 h-full">
      <nav className="flex flex-col gap-2 p-4">
        <NavLink to="/dashboard" className={linkClass}>
          Dashboard
        </NavLink>

        {(role === "admin" || role === "superadmin") && (
          <NavLink to="/services" className={linkClass}>
            Services
          </NavLink>
        )}

        {role === "superadmin" && (
          <NavLink to="/settings" className={linkClass}>
            Settings
          </NavLink>
        )}

        <NavLink to="/faq" className={linkClass}>
          FAQ
        </NavLink>
      </nav>
    </aside>
  );
};

export default Sidebar;
