import { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Sun, Moon } from "lucide-react";
import { useTheme } from "../context/ThemeContext";

export default function AdminSidebar() {
  const navigate = useNavigate();
  const location = useLocation();
  const { isDark, toggleTheme } = useTheme();
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [isOpen, setIsOpen] = useState(false); // Renamed for consistency

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("user"));
    if (!userData || userData.role !== "admin") navigate("/signin");
  }, [navigate]);

  const handleSignOut = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    navigate("/signin", { replace: true });
  };

  const navItems = [
    { name: "Dashboard", path: "/admin/dashboard" },
    { name: "Users", path: "/admin/users" },
    { name: "Subscriptions", path: "/admin/subscriptions" },
    { name: "Settings", path: "/admin/settings" },
  ];

  return (
    <>
      {/* Mobile Top Bar - Syncs with Navbar branding */}
      <div className="lg:hidden w-full h-20 bg-white dark:bg-black border-b border-zinc-200 dark:border-zinc-900 flex items-center justify-between px-6 z-50">
        <Link
          to="/admin/dashboard"
          className="text-xl tracking-[0.15em] uppercase"
        >
          SLATE
        </Link>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex flex-col gap-1.5 w-6 h-6"
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
      </div>

      {/* Mobile Menu Panel */}
      {/* Mobile Menu Panel */}
      {isOpen && (
        <div className="lg:hidden absolute top-20 left-0 w-full bg-white dark:bg-black border-b border-zinc-200 dark:border-zinc-900 p-8 flex flex-col items-center gap-8 z-40 animate-in fade-in slide-in-from-top-4">
          {navItems.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              onClick={() => setIsOpen(false)}
              className="text-sm font-semibold tracking-widest uppercase hover:text-zinc-500"
            >
              {item.name}
            </Link>
          ))}

          {/* Add these two buttons to mobile view */}
          <div className="flex items-center gap-8 pt-4 border-t border-zinc-200 dark:border-zinc-900 w-full justify-center">
            <button onClick={toggleTheme}>
              {isDark ? (
                <Sun className="w-5 h-5" />
              ) : (
                <Moon className="w-5 h-5" />
              )}
            </button>
            <button
              onClick={() => {
                setIsOpen(false);
                setShowLogoutModal(true);
              }}
              className="text-sm font-bold tracking-widest uppercase text-zinc-500"
            >
              Sign Out
            </button>
          </div>
        </div>
      )}

      {/* Desktop Sidebar - Fixed Left */}
      <aside className="hidden lg:flex fixed left-0 top-0 w-64 h-screen bg-white dark:bg-black border-r border-zinc-200 dark:border-zinc-900 flex-col transition-colors duration-500">
        <div className="p-12 border-b border-zinc-200 dark:border-zinc-900">
          <Link
            to="/admin/dashboard"
            className="text-xl tracking-[0.15em] uppercase"
          >
            SLATE
          </Link>
          <p className="text-[8px] font-bold uppercase tracking-[0.3em] text-zinc-500 mt-2">
            Admin Control
          </p>
        </div>

        <nav className="flex-grow flex flex-col pt-12 px-10 gap-8">
          {navItems.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              className={`text-[10px] font-bold tracking-[0.2em] uppercase transition-colors ${
                location.pathname === item.path
                  ? "text-black dark:text-white"
                  : "text-zinc-500 dark:text-zinc-400 hover:text-black dark:hover:text-white"
              }`}
            >
              {item.name}
            </Link>
          ))}
        </nav>

        <div className="p-10 border-t border-zinc-200 dark:border-zinc-900 flex items-center justify-between">
          <button
            onClick={toggleTheme}
            className="hover:text-black dark:hover:text-white transition-colors"
          >
            {isDark ? (
              <Sun className="w-4 h-4" />
            ) : (
              <Moon className="w-4 h-4" />
            )}
          </button>
          <button
            onClick={() => setShowLogoutModal(true)}
            className="text-[10px] font-bold tracking-[0.2em] uppercase text-zinc-500 hover:text-black dark:hover:text-white transition-colors"
          >
            Sign Out
          </button>
        </div>
      </aside>
      {/* Logout Modal */}
      {showLogoutModal && (
        <div className="fixed inset-0 flex items-center justify-center z-[9999] p-4">
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
