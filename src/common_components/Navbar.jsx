import { useContext, useState } from "react";
import { WebData } from "../contextApi/AuthContext";
import { logout } from "../utils/Apis";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

const Navbar = ({ toggleSidebar }) => {
  const { user } = useContext(WebData);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  // Handle Logout with Loading state
  const handleLogout = async () => {
    try {
      setIsLoggingOut(true);
      await logout();
      // Usually, the AuthContext or a redirect handles the state cleanup after this
    } catch (error) {
      console.error("Logout failed:", error);
      setIsLoggingOut(false); // Reset if it fails so user isn't stuck
    }
  };

  return (
    <header className="sticky top-0 z-50 h-16 border-b border-white/5 bg-[#083b4a]/90 backdrop-blur-xl text-white flex items-center justify-between px-6 shadow-sm">
      
      {/* Loading Overlay */}
      <AnimatePresence>
        {isLoggingOut && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-[60] bg-[#083b4a] flex items-center justify-center gap-3"
          >
            <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin" />
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-white/80">
              Securing Session...
            </span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Left Section: Menu & Brand */}
      <div className="flex items-center gap-4">
        <button
          onClick={toggleSidebar}
          className="md:hidden p-2 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all text-white/80"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-5 h-5"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
          </svg>
        </button>

        <Link to="/dashboard" className="flex items-center group transition-transform active:scale-95">
          <div className="h-10 flex items-center">
            <img
              src="https://accentra.co.uk/wp-content/themes/accentra-2015/accentra/assets/img/logos/logo-slogan.svg"
              alt="Accentra"
              className="h-full w-auto object-contain brightness-0 invert opacity-90 group-hover:opacity-100 transition-opacity"
              style={{ filter: "brightness(0) invert(1)" }} 
            />
          </div>
        </Link>
      </div>

      {/* Right Section: User Actions */}
      {user && (
        <div className="flex items-center gap-5">
          {/* Status Indicator & User Info */}
          <div className="hidden sm:flex items-center gap-3 pr-2">
            <div className="flex flex-col items-end leading-tight">
              <span className="text-sm font-semibold text-white/90 tracking-tight">
                {user.name}
              </span>
              <div className="flex items-center gap-1.5">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500"></span>
                </span>
                <span className="text-[10px] text-white/40 uppercase tracking-[0.15em] font-bold">
                  Enterprise
                </span>
              </div>
            </div>
          </div>

          <div className="h-8 w-[1px] bg-white/10 hidden sm:block" />

          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-xs font-bold text-white shadow-inner">
              {user.name?.charAt(0).toUpperCase()}
            </div>
             
            <button
              onClick={handleLogout}
              disabled={isLoggingOut}
              className={`px-4 py-2 rounded-xl text-[11px] font-bold uppercase tracking-widest transition-all active:scale-95 flex items-center gap-2
                ${isLoggingOut 
                  ? "bg-white/5 text-white/20 cursor-not-allowed border-white/5" 
                  : "text-white/60 border border-white/10 hover:bg-red-500/10 hover:text-red-400 hover:border-red-400/20"
                }`}
            >
              {isLoggingOut ? "Processing..." : "Logout"}
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;