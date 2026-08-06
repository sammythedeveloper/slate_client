import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import { Sun, Moon, Zap, ShieldCheck, Database } from "lucide-react";
import bgVideo from "../assets/bg.mp4";
import { useTheme } from "../context/ThemeContext";

const features = [
  { id: "ledgers", title: "Real-time Ledgers", desc: "...", icon: "database" },
  { id: "webhooks", title: "Webhook Governance", desc: "...", icon: "zap" },
  { id: "compliance", title: "Compliance Ready", desc: "...", icon: "shield" },
];

const iconMap = {
  database: Database,
  zap: Zap,
  shield: ShieldCheck,
};

function Counter({ value }) {
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => Math.round(latest));
  useEffect(() => {
    const controls = animate(count, value, { duration: 2 });
    return () => controls.stop();
  }, [value, count]);
  return <motion.span>{rounded}</motion.span>;
}
export default function Landing() {
  const { isDark, toggleTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative min-h-screen bg-white dark:bg-black text-black dark:text-white transition-colors duration-500 overflow-x-hidden flex flex-col">
      <div className="absolute inset-0 w-full h-full z-0 overflow-hidden bg-white dark:bg-black">
        {/* Video  */}
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover opacity-20 dark:opacity-45 scale-105 select-none pointer-events-none"
          src={bgVideo}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-white/80 via-white/40 to-white/90 dark:from-black/80 dark:via-black/40 dark:to-black/90 transition-colors duration-500" />
      </div>

      {/* Navigation */}
      <nav className="relative w-full z-30 px-6 py-6 md:px-12 flex items-center justify-between">
        <div className="hidden md:flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-[10px] font-bold tracking-[0.2em] text-zinc-500 dark:text-zinc-400 uppercase">
            Platform Online
          </span>
        </div>

        <Link
          to="/"
          className="text-2xl font-black tracking-[0.1em] transition-opacity hover:opacity-80"
        >
          SLATE
        </Link>

        {/* Desktop Controls */}
        <div className="hidden md:flex items-center gap-8 text-[10px] font-bold tracking-[0.2em] uppercase text-zinc-500 dark:text-zinc-400">
          <Link
            to="/signin"
            className="hover:text-black dark:hover:text-white transition-colors"
          >
            Dashboard
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
          <Link
            to="/signin"
            className="px-4 py-2 border border-zinc-300 dark:border-zinc-700 hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-all"
          >
            Sign In
          </Link>
        </div>

        {/* Mobile Burger Menu */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden flex flex-col gap-1.5 w-6 h-6 focus:outline-none"
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

        {/* Mobile Overlay */}
        {isOpen && (
          <div className="md:hidden absolute top-full left-0 w-full  backdrop-blur-lg border-b border-zinc-200 dark:border-zinc-900 p-8 flex flex-col items-center gap-6 animate-in fade-in slide-in-from-top-4">
            <Link
              to="/signin"
              onClick={() => setIsOpen(false)}
              className="text-sm font-medium tracking-widest hover:text-zinc-500   hover:dark:text-zinc-500  "
            >
              DASHBOARD
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
      </nav>

      {/* Hero Section */}
      <main className="relative z-20 max-w-5xl mx-auto px-6 text-center flex-grow flex flex-col items-center justify-center py-20">
        <span className="text-[11px] md:text-xs font-bold tracking-[0.4em] uppercase text-zinc-500 mb-6 block">
          SLATE: The Recurring Revenue Engine
        </span>
        <h1 className="text-4xl md:text-7xl font-black tracking-tighter leading-[0.95] uppercase mb-14 max-w-4xl">
          REVENUE,
          <br />
          <span className="text-zinc-400 dark:text-zinc-600">
            SYNCHRONIZED.
          </span>
        </h1>
        <Link to="/signup">
          <button className="bg-black dark:bg-white text-white dark:text-black font-semibold text-xs uppercase tracking-[0.25em] px-10 py-4 transition-all hover:bg-zinc-800 dark:hover:bg-zinc-200 active:scale-95">
            Initialize Gateway
          </button>
        </Link>
      </main>

      {/* Metrics Bar */}
      <section className="relative z-20 max-w-7xl mx-auto px-6 pb-20 grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: "Total Liquidity", val: 4200000, suf: "M" },
          { label: "Active Ledgers", val: 12408, suf: "" },
          { label: "Processing Latency", val: 24, suf: "ms" },
          { label: "System Uptime", val: 99, suf: "%" },
        ].map((item, i) => (
          <div
            key={i}
            className="bg-zinc-100 dark:bg-[#050505] border border-zinc-200 dark:border-zinc-900 p-6 transition-colors duration-500"
          >
            <p className="text-[10px] uppercase tracking-widest text-zinc-500 dark:text-zinc-400 mb-2">
              {item.label}
            </p>
            <h3 className="text-xl font-black tracking-tighter text-black dark:text-white">
              {item.suf === "M" && "$"}
              <Counter value={item.val} />
              {item.suf}
            </h3>
          </div>
        ))}
      </section>
      <section className="relative z-20 max-w-5xl mx-auto px-6 text-center flex-grow flex flex-col items-center justify-center py-20">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-bold  text-zinc-500 text-center mb-16">
            Everything you need to orchestrate revenue.
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((f, i) => {
              const Icon = iconMap[f.icon];
              return (
                <div
                  key={f.id} // 3. Use f.id instead of index 'i' for better performance
                  className="bg-zinc-200 dark:bg-[#050505] border border-zinc-200 dark:border-zinc-900 p-6 transition-colors duration-500"
                >
                  <div className="mb-4 p-3 bg-zinc-800 rounded-lg inline-block">
                  {Icon ? <Icon className="h-6 w-6 text-white" /> : null}
                  </div>
                  <h3 className="text-xl font-semibold text-black mb-2 tracking-tighter dark:text-white">
                    {f.title}
                  </h3>
                  <p className="text-[10px] uppercase tracking-widest text-zinc-500 dark:text-zinc-400 mb-2">
                    {f.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
