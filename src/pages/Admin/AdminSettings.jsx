import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AdminSidebar from "../../components/AdminSidebar";
import {
  FiUser,
  FiLock,
  FiChevronLeft,
  FiCheckCircle,
  FiSave,
} from "react-icons/fi";

export default function AdminSettings() {
  const [admin, setAdmin] = useState({ name: "", email: "" });
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("user"));
    if (userData && userData.role === "admin") {
      setAdmin({
        name: userData.name || "Admin",
        email: userData.email || "",
      });
    }
  }, []);

  const handleUpdateProfile = (e) => {
    e.preventDefault();
    setMessage("Profile Security Synced");
    setTimeout(() => setMessage(""), 3000);
  };

  const handleChangePassword = (e) => {
    e.preventDefault();
    setMessage("Credentials Updated Successfully");
    setPassword("");
    setTimeout(() => setMessage(""), 3000);
  };

  return (
    <div className="flex min-h-screen bg-[#080808] text-white font-sans">
      <AdminSidebar />

      <main className="flex-1 p-6 md:p-12 lg:p-20 overflow-y-auto">
        {/* Navigation / Breadcrumb */}
        <div className="mb-12">
          <button
            onClick={() => navigate("/admin/dashboard")}
            className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.3em] text-zinc-500 hover:text-rose-500 transition-colors"
          >
            <FiChevronLeft size={14} /> Back to Control Center
          </button>
        </div>

        <header className="mb-12">
          <p className="text-rose-500 font-bold uppercase tracking-[0.3em] text-[10px] mb-2">
            System Config
          </p>
          <h2 className="text-4xl font-black tracking-tighter italic uppercase">
            Admin Settings
          </h2>
        </header>

        {/* Success Toast */}
        {message && (
          <div className="fixed top-10 right-10 z-[100] animate-in slide-in-from-right-10 duration-300">
            <div className="bg-emerald-500 text-black px-6 py-4 rounded-2xl flex items-center gap-3 shadow-2xl shadow-emerald-500/20 font-black uppercase text-[10px] tracking-widest">
              <FiCheckCircle size={18} /> {message}
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Profile Information */}
          <div className="bg-[#0d0d0d] border border-zinc-800 rounded-[40px] p-10 shadow-2xl">
            <div className="flex items-center gap-3 mb-8">
              <div className="p-3 bg-rose-600/10 rounded-xl text-rose-600">
                <FiUser size={20} />
              </div>
              <h3 className="text-xl font-black tracking-tight italic uppercase">
                Identity
              </h3>
            </div>

            <form onSubmit={handleUpdateProfile} className="space-y-6">
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500 ml-1">
                  Admin Name
                </label>
                <input
                  type="text"
                  value={admin.name}
                  onChange={(e) => setAdmin({ ...admin, name: e.target.value })}
                  className="w-full bg-zinc-900 border border-zinc-800 rounded-2xl px-6 py-4 text-sm font-bold text-white focus:outline-none focus:border-rose-600 transition-all"
                />
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500 ml-1">
                  System Email
                </label>
                <input
                  type="email"
                  value={admin.email}
                  onChange={(e) =>
                    setAdmin({ ...admin, email: e.target.value })
                  }
                  className="w-full bg-zinc-900 border border-zinc-800 rounded-2xl px-6 py-4 text-sm font-bold text-white focus:outline-none focus:border-rose-600 transition-all"
                />
              </div>

              <button
                type="submit"
                className="w-full flex items-center justify-center gap-2 py-4 bg-white text-black rounded-2xl font-black uppercase text-[10px] tracking-[0.2em] hover:bg-rose-600 hover:text-white transition-all shadow-xl"
              >
                <FiSave /> Sync Profile
              </button>
            </form>
          </div>

          {/* Security / Password */}
          <div className="bg-[#0d0d0d] border border-zinc-800 rounded-[40px] p-10 shadow-2xl">
            <div className="flex items-center gap-3 mb-8">
              <div className="p-3 bg-rose-600/10 rounded-xl text-rose-600">
                <FiLock size={20} />
              </div>
              <h3 className="text-xl font-black tracking-tight italic uppercase">
                Security
              </h3>
            </div>

            <form onSubmit={handleChangePassword} className="space-y-6">
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500 ml-1">
                  New Access Key
                </label>
                <input
                  type="password"
                  value={password}
                  placeholder="••••••••••••"
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-zinc-900 border border-zinc-800 rounded-2xl px-6 py-4 text-sm font-bold text-white focus:outline-none focus:border-rose-600 transition-all placeholder:text-zinc-700"
                />
              </div>

              <div className="p-4 bg-zinc-900/50 border border-zinc-800 rounded-2xl">
                <p className="text-[9px] font-medium text-zinc-500 leading-relaxed uppercase tracking-wider">
                  Changing your password will require a new session login.
                  Ensure you have your credentials saved.
                </p>
              </div>

              <button
                type="submit"
                className="w-full py-4 border border-zinc-800 hover:border-rose-600 text-zinc-400 hover:text-white rounded-2xl font-black uppercase text-[10px] tracking-[0.2em] transition-all"
              >
                Update Credentials
              </button>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
}
