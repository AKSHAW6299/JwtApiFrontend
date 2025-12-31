import { useContext } from "react";
import { WebData } from "../contextApi/AuthContext";
import { logout } from "../utils/Apis";
import { Link } from "react-router-dom";

const Navbar = ({ toggleSidebar }) => {
  const { user } = useContext(WebData);

  return (
    <header className="sticky top-0 z-50 h-16 border-b border-white/10 bg-[#083b4a]/80 backdrop-blur-md text-white flex items-center justify-between px-6 shadow-lg">
      <div className="flex items-center gap-4">
        {/* Hamburger Menu - Styled for transparency theme */}
        <button
          onClick={toggleSidebar}
          className="md:hidden p-2 rounded-lg hover:bg-white/10 transition-colors text-white"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
          </svg>
        </button>

        {/* Logo Section */}
        <Link to="/dashboard" className="h-9 flex items-center hover:opacity-80 transition-opacity">
          <img
            src="https://accentra.co.uk/wp-content/themes/accentra-2015/accentra/assets/img/logos/logo-slogan.svg"
            alt="Accentra"
            className="h-full w-auto object-contain brightness-0 invert"
          />
        </Link>
      </div>

      {user && (
        <div className="flex items-center gap-4">
          {/* User Name Styling */}
          <div className="hidden sm:flex flex-col items-end">
            <span className="text-sm font-semibold text-white tracking-wide">
              {user.name}
            </span>
            <span className="text-[10px] text-white/50 uppercase tracking-widest font-bold">
              Active Session
            </span>
          </div>

          {/* Profile/Avatar Placeholder (Optional enhancement) */}
          <div className="h-8 w-8 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-xs font-bold">
            {user.name?.charAt(0).toUpperCase()}
          </div>

          {/* Logout Button - Using the "Ghost Button" theme from the form */}
          <button
            onClick={logout}
            className="border border-red-400/50 hover:bg-red-600/20 text-red-400 hover:text-red-300 px-4 py-1.5 rounded-lg text-xs font-bold tracking-wider uppercase transition-all active:scale-95"
          >
            Logout
          </button>
        </div>
      )}
    </header>
  );
};

export default Navbar;