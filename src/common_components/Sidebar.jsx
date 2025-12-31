import { NavLink } from "react-router-dom";
import { useContext } from "react";
import { WebData } from "../contextApi/AuthContext";

const Sidebar = ({ isOpen, closeSidebar }) => {
  const { role } = useContext(WebData);

  // Minimalist Link Class: Focus on high contrast and clean active state
  const linkClass = ({ isActive }) =>
    `flex items-center px-6 py-3 text-sm font-medium transition-all duration-200
     ${isActive 
       ? "bg-white/10 text-white border-r-4 border-white shadow-[4px_0_15px_rgba(255,255,255,0.05)]" 
       : "text-white/50 hover:text-white hover:bg-white/5"}`;

  return (
    <>
      {/* Overlay (mobile only) */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-[#083b4a]/60 backdrop-blur-sm z-40 md:hidden"
          onClick={closeSidebar}
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`
          fixed md:static z-50
          h-full w-64 bg-[#083b4a]/95 backdrop-blur-2xl
          border-r border-white/5
          transform transition-transform duration-300 ease-in-out
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0
        `}
      >
        {/* Navigation Wrapper */}
        <nav className="flex flex-col h-full pt-20 md:pt-8 relative">
          
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

          {/* Thin separator line instead of a text label */}
          <div className="my-3 border-t border-white/5 mx-6" />

          <NavLink to="/faq" className={linkClass} onClick={closeSidebar}>
            FAQ
          </NavLink>

          {/* SaaS Plan Footer Element */}
          <div className="absolute bottom-8 left-0 w-full px-6">
            <div className="p-4 rounded-2xl bg-white/5 border border-white/10 transition-hover hover:bg-white/[0.08]">
              <p className="text-[10px] text-white/30 font-bold uppercase tracking-widest">
                Plan
              </p>
              <p className="text-xs text-white/90 mt-1 font-semibold tracking-wide">
                Enterprise v2.0
              </p>
            </div>
          </div>
        </nav>
      </aside>
    </>
  );
};

export default Sidebar;