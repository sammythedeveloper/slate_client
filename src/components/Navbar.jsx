//
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { Sun, Moon } from "lucide-react"; // 
import { useTheme } from "../context/ThemeContext";

export default function Navbar({ userName }) {
  const navigate = useNavigate();
  const { isDark, toggleTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const handleSignOut = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/signin", { replace: true });
  };

  return (
    <>
      <nav className="relative w-full z-50 bg-white dark:bg-black border-b border-zinc-200 dark:border-zinc-900 transition-colors duration-500">
        <div className="flex items-center justify-between px-6 py-6 md:px-12">
          {/* Logo */}
          <Link
            to="/dashboard"
            className="text-xl text-black dark:text-white hover:text-zinc-500 dark:hover:text-zinc-500 tracking-[0.15em] uppercase"
          >
            SLATE
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8 text-[10px] font-bold tracking-[0.2em] uppercase text-zinc-500 dark:text-zinc-400">
            <Link
              to="/dashboard"
              className="hover:text-black dark:hover:text-white transition-colors"
            >
              Dashboard
            </Link>
            <Link
              to="/browse-memberships"
              className="hover:text-black dark:hover:text-white transition-colors"
            >
              Browse
            </Link>
            <Link
              to="/About"
              className="hover:text-black dark:hover:text-white transition-colors"
            >
              About
            </Link>

            <button
              onClick={toggleTheme}
              className="p-1 hover:text-black dark:hover:text-white transition-colors"
            >
              {isDark ? (
                <Sun className="w-4 h-4" />
              ) : (
                <Moon className="w-4 h-4" />
              )}
            </button>

            <button
              onClick={() => setShowLogoutModal(true)}
              className="px-6 py-2 border border-zinc-300 dark:border-zinc-700 hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-all"
            >
              Sign Out
            </button>
          </div>

          {/* Burger */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden flex flex-col gap-1.5 w-6 h-6"
          >
            <span
              className={`h-[1px] bg-black dark:bg-white transition-all ${
                isOpen ? "rotate-45 translate-y-2 w-6" : "w-6"
              }`}
            />
            <span
              className={`h-[1px] bg-black dark:bg-white transition-all ${
                isOpen ? "opacity-0" : "w-5"
              }`}
            />
            <span
              className={`h-[1px] bg-black dark:bg-white transition-all ${
                isOpen ? "-rotate-45 -translate-y-2 w-6" : "w-4"
              }`}
            />
          </button>
          {isOpen && (
            <div className="md:hidden absolute top-full left-0 w-full  backdrop-blur-lg border-b border-zinc-200 dark:border-zinc-900 p-8 flex flex-col items-center gap-6 animate-in fade-in slide-in-from-top-4">
              <Link
                to="/dashboard"
                className="text-sm font-semibold tracking-widest hover:text-zinc-500 hover:dark:text-zinc-500 "
              >
                Dashboard
              </Link>
              <Link
                to="/browse-memberships"
                className="text-sm font-semibold tracking-widest hover:text-zinc-500 hover:dark:text-zinc-500 "
              >
                Browse
              </Link>
              <Link
                to="/About"
                className="text-sm font-semibold tracking-widest hover:text-zinc-500 hover:dark:text-zinc-500 "
              >
                About
              </Link>
              <button
                onClick={toggleTheme}
                className="flex items-center gap-2 text-sm font-medium tracking-widest uppercase"
              >
                {isDark ? (
                  <Sun className="w-4 h-4 hover:text-orange-500 transition-colors duration-300 " />
                ) : (
                  <Moon className="w-4 h-4 hover:text-gray-200 transition-colors duration-300 " />
                )}
              </button>
              <Link
                to="/signin"
                onClick={() => setIsOpen(false)}
                className="text-sm font-semibold tracking-widest hover:text-zinc-500 hover:dark:text-zinc-500 "
              >
                SIGN IN
              </Link>
            </div>
          )}
        </div>
      </nav>

      {/* Logout Modal - SLATE Styling */}
      {showLogoutModal && (
        <div className="fixed inset-0 flex items-center justify-center z-[100] p-4">
          <div
            className="absolute inset-0 bg-white/50 dark:bg-black/80 backdrop-blur-sm"
            onClick={() => setShowLogoutModal(false)}
          />
          <div className="relative bg-white dark:bg-[#050505] border border-zinc-300 dark:border-zinc-800 p-12 w-full max-w-sm text-center">
            <h3 className="text-xl font-black tracking-tighter uppercase mb-2">
              Sign Out
            </h3>
            <p className="text-[10px] uppercase tracking-widest text-zinc-500 mb-8">
              Terminate your active session?
            </p>
            <div className="flex flex-col gap-3">
              <button
                onClick={handleSignOut}
                className="w-full py-4 bg-black dark:bg-white text-white dark:text-black hover:dark:bg-red-600 hover:bg-red-600 hover:text-white hover:dark:text-white font-bold text-[10px] uppercase tracking-widest hover:opacity-80 transition-all"
              >
                Confirm
              </button>
              <button
                onClick={() => setShowLogoutModal(false)}
                className="w-full py-4 border border-zinc-200 text-black dark:text-white hover:dark:bg-blue-500 hover:dark:text-white hover:bg-blue-500 hover:text-white   dark:border-zinc-800 font-bold text-[10px] uppercase tracking-widest"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
