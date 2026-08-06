import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { Sun, Moon } from "lucide-react";
import bgVideo from "../../assets/bg.mp4";
import axios from "../../utils/axiosInstance";
import { useTheme } from "../../context/ThemeContext";

const SignUp = () => {
  const { isDark, toggleTheme } = useTheme();
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!form.name || !form.email || !form.password) {
      setError("Please fill in all fields to join.");
      return;
    }

    setLoading(true);

    try {
      const { data } = await axios.post("/auth/signup", form);
      setSuccess("Account created successfully!");

      if (data.token) localStorage.setItem("token", data.token);
      if (data.user) {
        localStorage.setItem("user", JSON.stringify(data.user));
        localStorage.setItem("role", data.user.role);
      }

      // Short delay so they can see the success message
      setTimeout(() => {
        if (data.user?.role === "admin") {
          navigate("/admin/dashboard", { replace: true });
        } else {
          navigate("/dashboard", { replace: true });
        }
      }, 1500);
    } catch (err) {
      setError(
        err.response?.data?.message || "Signup failed. Please try again."
      );
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
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-rose-950/10 rounded-full blur-[120px] -z-0" />

      <div className="relative z-10 w-full max-w-5xl h-auto md:h-[600px] flex flex-col md:flex-row bg-zinc-50 dark:bg-[#0f0f0f] rounded-[32px] border border-zinc-200 dark:border-zinc-800/50 shadow-2xl overflow-hidden">
        {/* Left Side: Community Image Panel */}
        <div className="hidden md:flex md:w-1/2 p-16 flex-col justify-between bg-zinc-100 dark:bg-zinc-900/30 border-r border-zinc-200 dark:border-zinc-800/50">
          <Link to="/">
            <div className="relative z-10 flex items-center gap-2">
              <span className="text-xl font-black tracking-[0.2em] text-black dark:text-white">
                SLATE
              </span>
            </div>
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
            Join our Infrastructure soon!
          </div>
        </div>

        {/* Right Side: Sign Up Form */}
        <div className="w-full md:w-1/2 p-8 md:p-16 flex flex-col justify-center">
          <div className="max-w-md mx-auto w-full">
            <div className="mb-8">
              <h1 className="text-3xl font-black text-black dark:text-white mb-2 tracking-tight">
                Create Account
              </h1>
            </div>

            {error && (
              <div className="mb-6 p-3 bg-red-500/10 border border-red-500/20 text-red-500 text-[10px] uppercase font-bold text-center rounded-lg">
                {error}
              </div>
            )}

            {success && (
              <div className="mb-6 p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-2xl text-emerald-500 text-xs font-bold text-center">
                {success}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-zinc-500 ml-1">
                  Full Name
                </label>
                <input
                  name="name"
                  type="text"
                  placeholder="Your Name"
                  onChange={handleChange}
                  className="w-full px-5 py-4 bg-white dark:bg-zinc-900/50 text-black dark:text-white  border border-zinc-200 dark:border-zinc-800 rounded-xl outline-none focus:ring-1 focus:ring-zinc-500"
                />
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-zinc-500 ml-1">
                  Email Address
                </label>
                <input
                  name="email"
                  type="email"
                  placeholder="Email Address"
                  onChange={handleChange}
                  className="w-full px-5 py-4 bg-white dark:bg-zinc-900/50 text-black dark:text-white  border border-zinc-200 dark:border-zinc-800 rounded-xl outline-none focus:ring-1 focus:ring-zinc-500"
                />
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-zinc-500 ml-1">
                  Password
                </label>
                <div className="relative">
                  <input
                    name="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    value={form.password}
                    onChange={handleChange}
                    className="w-full px-5 py-4 bg-white dark:bg-zinc-900/50 text-black dark:text-white  border border-zinc-200 dark:border-zinc-800 rounded-xl outline-none focus:ring-1 focus:ring-zinc-500"
                  />
                  <button
                    type="button"
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-600 hover:text-white transition"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <AiFillEyeInvisible size={20} />
                    ) : (
                      <AiFillEye size={20} />
                    )}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-black dark:bg-white text-white dark:text-black hover:bg-green-500  hover:dark:bg-orange-400 hover:dark:text-white py-4 rounded-xl font-bold uppercase text-[10px] tracking-widest transition-all"
              >
                {loading ? "Creating Account..." : "Join the Community"}
              </button>
            </form>
            <p className="text-zinc-600 text-center mt-8 text-xs font-medium">
              Already have an account?{" "}
              <Link
                to="/signin"
                className="text-black dark:text-white font-bold hover:text-orange-500 transition underline underline-offset-4"
              >
                Sign In
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
