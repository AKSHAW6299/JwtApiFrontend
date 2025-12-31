import { NavLink } from "react-router-dom";
import { useContext } from "react";
import { WebData } from "../contextApi/AuthContext";

const Sidebar = ({ isOpen, closeSidebar }) => {
  const { role } = useContext(WebData);

  const linkClass = ({ isActive }) =>
    `block px-4 py-2 rounded-md text-sm font-medium
     ${isActive ? "bg-gray-700 text-white" : "text-gray-300 hover:bg-gray-700"}`;

  return (
    <>
      {/* Overlay (mobile only) */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={closeSidebar}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed md:static z-50
          h-full w-64 bg-gray-800
          transform transition-transform duration-300
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0
        `}
      >
        <nav className="flex flex-col gap-2 p-4 mt-14 md:mt-0">
          <NavLink to="/dashboard" className={linkClass} onClick={closeSidebar}>
            Dashboard
          </NavLink>

          {(role === "admin" || role === "superadmin") && (
            <NavLink to="/services" className={linkClass} onClick={closeSidebar}>
              Services
            </NavLink>
          )}

          {role === "superadmin" && (
            <NavLink to="/settings" className={linkClass} onClick={closeSidebar}>
              Settings
            </NavLink>
          )}

          <NavLink to="/faq" className={linkClass} onClick={closeSidebar}>
            FAQ
          </NavLink>
        </nav>
      </aside>
    </>
  );
};

export default Sidebar;
