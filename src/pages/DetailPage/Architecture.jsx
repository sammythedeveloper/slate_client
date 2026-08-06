import { Database, Server, Cpu, Zap, Layout, Terminal } from "lucide-react";
import Footer from "../Footer";

export default function Architecture() {
  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-black text-black dark:text-white transition-colors duration-500">
      {/* Banner Video Section */}
      <section className="relative w-full h-[500px] overflow-hidden bg-black flex flex-col items-center justify-center text-center px-6">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover opacity-40"
          src="https://www.pexels.com/download/video/33193839/"
        />
        <div className="relative z-10">
          <h1 className="text-5xl md:text-8xl font-black uppercase tracking-tighter mb-4 text-white">
            Architecture
          </h1>
          <p className="text-[10px] uppercase tracking-[0.4em] font-bold text-zinc-300">
            System Infrastructure / Engineering
          </p>
        </div>
      </section>

      <main className="flex-grow py-24 px-6 max-w-5xl mx-auto">
        {/* Architect Credit */}
        <div className="mb-20 border-l-2 border-black dark:border-white pl-8">
          <p className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-500 mb-2">
            Lead Architect
          </p>
          <h2 className="text-2xl font-black uppercase tracking-tight">
            SamtheDev
          </h2>
          <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-2">
            Engineered from the ground up to ensure atomic data consistency,
            high-output scalability, and absolute system reliability.
          </p>
        </div>

        {/* Data Flow Section */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-16 mb-24">
          <div>
            <h3 className="text-3xl font-black uppercase tracking-tighter mb-8">
              Data Orchestration
            </h3>
            <div className="space-y-6 text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed">
              <p>
                The application follows an event-driven model. When a user
                initiates a request, it traverses a secure API layer,
                authenticated via JWT, before hitting our core backend logic.
              </p>
              <p>
                Admin governance actions operate on a separate privileged
                control plane, allowing for instant session revocation and
                real-time database synchronization without affecting client-side
                performance.
              </p>
            </div>
          </div>
          <div className="bg-[#050505] border border-zinc-900 p-8">
            <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-500 mb-8">
              INTEGRATED TECH STACK
            </h4>
            <div className="grid grid-cols-2 gap-6">
              {[
                { icon: <Layout size={16} />, label: "React" },
                { icon: <Database size={16} />, label: "Postgres" },
                { icon: <Server size={16} />, label: "Node.js" },
                { icon: <Terminal size={16} />, label: "Express" },
                { icon: <Cpu size={16} />, label: "Gemini AI" },
                { icon: <Zap size={16} />, label: "Tailwind" },
                {
                  icon: <div className="font-bold text-[10px]">STRIPE</div>,
                  label: "Payments",
                },
              ].map((tool, i) => (
                <div key={i} className="flex items-center gap-3 text-zinc-400">
                  <div className="text-zinc-600">{tool.icon}</div>
                  <span className="text-[10px] font-bold uppercase tracking-widest">
                    {tool.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
