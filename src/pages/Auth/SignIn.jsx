import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { Sun, Moon } from "lucide-react";
import bgVideo from "../../assets/bg.mp4";
import axios from "../../utils/axiosInstance";
import { useTheme } from "../../context/ThemeContext";

const SignIn = () => {
  const { isDark, toggleTheme } = useTheme();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.email || !form.password) {
      setError("Please provide your account credentials.");
      return;
    }

    setLoading(true);
    try {
      const { data } = await axios.post("/auth/login", form);
      localStorage.setItem("user", JSON.stringify(data.user));
      localStorage.setItem("token", data.token);
      navigate(data.user.role === "admin" ? "/admin/dashboard" : "/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Authentication failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center p-4">
      <div className="absolute inset-0 w-full h-full z-0 overflow-hidden bg-white dark:bg-black">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover opacity-20 dark:opacity-45 pointer-events-none"
          src={bgVideo}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-white/80 via-white/40 to-white/90 dark:from-black/80 dark:via-black/40 dark:to-black/90 transition-colors duration-500" />
      </div>
      <button
        onClick={toggleTheme}
        className="absolute top-6 right-6 p-2 text-zinc-500 hover:text-black dark:hover:text-white"
      >
        {isDark ? <Sun size={20} /> : <Moon size={20} />}
      </button>

      <div className="relative z-10 w-full max-w-5xl h-auto md:h-[600px] flex flex-col md:flex-row bg-zinc-50 dark:bg-[#0f0f0f] rounded-[32px] border border-zinc-200 dark:border-zinc-800/50 shadow-2xl overflow-hidden">
        {/* Left Side: Brand Context */}
        <div className="hidden md:flex md:w-1/2 p-16 flex-col justify-between bg-zinc-100 dark:bg-zinc-900/30 border-r border-zinc-200 dark:border-zinc-800/50">
          <Link
            to="/"
            className="text-xl font-black tracking-[0.2em] text-black dark:text-white"
          >
            SLATE
          </Link>
          <div className="space-y-6">
            <h2 className="text-3xl font-black tracking-tight leading-tight text-black dark:text-white">
              Power Your <br />
              <span className="text-zinc-500">Revenue Engine.</span>
            </h2>
            <p className="text-sm text-zinc-500 leading-relaxed">
              Join the ecosystem built for modern SaaS. Create your account to
              start automating your billing, syncing ledgers, and scaling your
              operations.
            </p>
          </div>
          <div className="text-[9px] font-bold text-zinc-400 uppercase tracking-[0.3em]">
            Infrastructure v2.5 • Enterprise
          </div>
        </div>

        {/* Right Side: Form */}
        <div className="w-full md:w-1/2 p-8 md:p-16 flex flex-col justify-center">
          <div className="max-w-md mx-auto w-full">
            <h1 className="text-2xl font-black mb-2 tracking-tight text-black dark:text-white">
              Secure Access
            </h1>
            <p className="text-zinc-500 text-xs font-medium mb-8">
              Enter your credentials to access the platform.
            </p>

            {error && (
              <div className="mb-6 p-3 bg-red-500/10 border border-red-500/20 text-red-500 text-[10px] uppercase font-bold text-center rounded-lg">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              <input
                name="email"
                type="email"
                placeholder="Email Address"
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="w-full px-5 py-4 bg-white dark:bg-zinc-900/50 border text-black dark:text-white   border-zinc-200 dark:border-zinc-800 rounded-xl outline-none focus:ring-1 focus:ring-zinc-500"
              />

              <div className="relative">
                <input
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  onChange={(e) =>
                    setForm({ ...form, password: e.target.value })
                  }
                  className="w-full px-5 py-4 bg-white dark:bg-zinc-900/50 text-black dark:text-white   border border-zinc-200 dark:border-zinc-800 rounded-xl outline-none focus:ring-1 focus:ring-zinc-500"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-4 text-zinc-500"
                >
                  {showPassword ? (
                    <AiFillEyeInvisible size={20} />
                  ) : (
                    <AiFillEye size={20} />
                  )}
                </button>
              </div>

              <button
                type="submit"
                className="w-full bg-black dark:bg-white text-white dark:text-black hover:bg-green-500 hover:dark:bg-orange-400 hover:dark:text-white py-4 rounded-xl font-bold uppercase text-[10px] tracking-widest transition-all"
              >
                {loading ? "Authenticating..." : "Authorize Access"}
              </button>
            </form>

            <p className="text-zinc-500 text-center mt-8 text-[10px] uppercase tracking-widest">
              No account?{" "}
              <Link
                to="/signup"
                className="text-black dark:text-white font-bold hover:underline"
              >
                Request Access
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
