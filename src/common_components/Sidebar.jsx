import { useContext } from "react";
import { NavLink } from "react-router-dom";
import { WebData } from "../contextApi/AuthContext";

const Sidebar = ({ isOpen, closeSidebar }) => {
  const { role } = useContext(WebData);

  return (
    <aside className={`bg-gray-800 text-white w-64 p-4`}>
      <nav className="space-y-2">

        <NavLink to="/dashboard">Dashboard</NavLink>

        {(role === "admin" || role === "superadmin") && (
          <NavLink to="/services">Services</NavLink>
        )}

        {role === "superadmin" && (
          <NavLink to="/settings">Settings</NavLink>
        )}

        <NavLink to="/faq">FAQ</NavLink>

      </nav>
    </aside>
  );
};

export default Sidebar;
