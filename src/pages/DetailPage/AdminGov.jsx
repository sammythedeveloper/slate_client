import { motion } from "framer-motion";
import { Shield, Users, Activity, Lock } from "lucide-react";
import Footer from "../Footer"; 

export default function AdminGovernance() {
  const features = [
    {
      icon: <Users size={24} />,
      title: "Role-Based Access Control",
      desc: "Granular permissions system allowing you to define exact capabilities for admins, managers, and support staff.",
    },
    {
      icon: <Shield size={24} />,
      title: "Real-time Revocation",
      desc: "Instantly terminate sessions and revoke access across all microservices with zero latency.",
    },
    {
      icon: <Activity size={24} />,
      title: "Audit Logging",
      desc: "Comprehensive tracking of every administrative action, ensuring complete compliance and transparency.",
    },
    {
      icon: <Lock size={24} />,
      title: "MFA & Session Management",
      desc: "Enforce multi-factor authentication for administrative roles and manage active sessions from a centralized dashboard.",
    },
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-black text-black dark:text-white transition-colors duration-500">
      
      {/* Hero Section */}
      <section className="relative w-full h-[500px] overflow-hidden bg-black flex flex-col items-center justify-center text-center px-6">
         {/* Subtle Grid Background */}
         <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px]" />
         
        <div className="relative z-10 max-w-4xl mx-auto">
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-[10px] uppercase tracking-[0.4em] font-bold text-zinc-400 mb-6"
          >
            Infrastructure / Governance
          </motion.p>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-7xl font-black uppercase tracking-tighter mb-6 text-white"
          >
            Absolute Control.
            <br />
            Zero Compromise.
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg text-zinc-400 max-w-2xl mx-auto"
          >
            The centralized command center for managing user access, enforcing security policies, and maintaining system integrity across your entire application ecosystem.
          </motion.p>
        </div>
      </section>

      {/* Main Content Block */}
      <main className="max-w-6xl mx-auto px-6 py-24">
        
        {/* Visual Showcase Section */}
        <section className="mb-32">
          <div className="bg-zinc-50 dark:bg-[#050505] border border-zinc-200 dark:border-zinc-900 rounded-lg overflow-hidden flex flex-col lg:flex-row">
            
            {/* Context/Description */}
            <div className="p-10 lg:p-16 lg:w-1/3 flex flex-col justify-center border-b lg:border-b-0 lg:border-r border-zinc-200 dark:border-zinc-900">
              <span className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-500 mb-4 block">
                The Dashboard
              </span>
              <h3 className="text-3xl font-black tracking-tighter uppercase mb-6">
                Manage with Precision
              </h3>
              <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed mb-8">
                Our governance UI is designed for high-stakes environments. It prioritizes clarity and speed, ensuring that critical administrative actions—like revoking access or reviewing audit logs—are never more than two clicks away.
              </p>
              <button className="self-start border border-black dark:border-white text-black dark:text-white text-[10px] font-bold uppercase tracking-[0.2em] px-8 py-3 hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-all">
                View Documentation
              </button>
            </div>

            {/* Simulated UI / Image Placeholder */}
            <div className="lg:w-2/3 bg-zinc-100 dark:bg-[#0a0a0a] p-8 md:p-12 flex items-center justify-center relative overflow-hidden">
               {/* Abstract futuristic UI representation instead of terminal */}
               <div className="w-full max-w-lg aspect-[16/9] border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-black shadow-2xl flex flex-col">
                  {/* Fake UI Header */}
                  <div className="h-8 border-b border-zinc-200 dark:border-zinc-800 flex items-center px-4 gap-2">
                    <div className="w-2 h-2 rounded-full bg-rose-500" />
                    <div className="w-2 h-2 rounded-full bg-amber-500" />
                    <div className="w-2 h-2 rounded-full bg-emerald-500" />
                  </div>
                  {/* Fake UI Body */}
                  <div className="flex-1 p-6 flex flex-col gap-4">
                    <div className="h-6 w-48 bg-zinc-200 dark:bg-zinc-800 rounded animate-pulse" />
                    <div className="flex-1 border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-[#050505] p-4 flex flex-col gap-3">
                       <div className="h-4 w-full bg-zinc-200 dark:bg-zinc-800 rounded" />
                       <div className="h-4 w-3/4 bg-zinc-200 dark:bg-zinc-800 rounded" />
                       <div className="h-4 w-full bg-zinc-200 dark:bg-zinc-800 rounded" />
                       <div className="h-4 w-5/6 bg-zinc-200 dark:bg-zinc-800 rounded" />
                    </div>
                  </div>
               </div>
            </div>
          </div>
        </section>

        {/* Feature Grid */}
        <section>
          <div className="text-center mb-16">
             <span className="text-[10px] uppercase tracking-[0.4em] font-bold text-zinc-500 mb-4 block">
              Core Capabilities
            </span>
            <h2 className="text-3xl md:text-5xl font-black tracking-tighter uppercase">
              Engineered for Scale
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {features.map((feature, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="bg-zinc-50 dark:bg-[#050505] border border-zinc-200 dark:border-zinc-900 p-8 md:p-10 hover:border-zinc-300 dark:hover:border-zinc-700 transition-colors"
              >
                <div className="w-12 h-12 bg-white dark:bg-black border border-zinc-200 dark:border-zinc-800 flex items-center justify-center mb-6 text-black dark:text-white">
                  {feature.icon}
                </div>
                <h4 className="text-xl font-black uppercase tracking-tight mb-4">
                  {feature.title}
                </h4>
                <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed">
                  {feature.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </section>
      </main>

      <Footer/>
    </div>
  );
}