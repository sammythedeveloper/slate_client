import { useState } from "react";
import { motion } from "framer-motion";
import Footer from "../Footer";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setForm({ name: "", email: "", message: "" });
    }, 4000);
  };

  return (
  
    <div className="min-h-screen flex flex-col bg-white dark:bg-black text-black dark:text-white transition-colors duration-500">
      <main className="flex-grow py-24 px-6">
        <div className="max-w-3xl mx-auto">
          {/* Header */}
          <header className="mb-16">
            <p className="text-[10px] uppercase tracking-[0.4em] font-bold text-zinc-500 mb-6">
              Reach out, we will get back to you soon.
            </p>
            <h1 className="text-5xl md:text-7xl font-black tracking-tighter uppercase mb-6">
              Connect with us.
            </h1>
            <p className="text-lg text-zinc-500 dark:text-zinc-400">
              For technical inquiries, partnership opportunities, or system
              feedback, please reach out via the secure portal below.
            </p>
          </header>

          {/* Form Container */}
          <form
            onSubmit={handleSubmit}
            className="bg-zinc-50 dark:bg-[#050505] border border-zinc-200 dark:border-zinc-900 p-8 md:p-12"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              <div>
                <label className="text-[9px] font-black uppercase tracking-[0.3em] text-zinc-500 mb-3 block">
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  required
                  className="w-full bg-white dark:bg-black border border-zinc-200 dark:border-zinc-800 p-4 text-xs font-bold uppercase tracking-wider outline-none focus:border-black dark:focus:border-white transition-all"
                  placeholder="YOUR NAME"
                />
              </div>
              <div>
                <label className="text-[9px] font-black uppercase tracking-[0.3em] text-zinc-500 mb-3 block">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  required
                  className="w-full bg-white dark:bg-black border border-zinc-200 dark:border-zinc-800 p-4 text-xs font-bold uppercase tracking-wider outline-none focus:border-black dark:focus:border-white transition-all"
                  placeholder="EMAIL ADDRESS"
                />
              </div>
            </div>

            <div className="mb-8">
              <label className="text-[9px] font-black uppercase tracking-[0.3em] text-zinc-500 mb-3 block">
                Message
              </label>
              <textarea
                name="message"
                value={form.message}
                onChange={handleChange}
                required
                rows="6"
                className="w-full bg-white dark:bg-black border border-zinc-200 dark:border-zinc-800 p-4 text-xs font-bold uppercase tracking-wider outline-none focus:border-black dark:focus:border-white transition-all resize-none"
                placeholder="YOUR MESSAGE"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-black dark:bg-white text-white dark:text-black py-4 text-[10px] font-black uppercase tracking-[0.3em] hover:opacity-80 transition-opacity"
            >
              {submitted ? "Message Received" : "Send Request"}
            </button>

            {submitted && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-[9px] font-black uppercase tracking-[0.3em] text-emerald-500 mt-6 text-center"
              >
                STATUS: TRANSMISSION SUCCESSFUL
              </motion.p>
            )}
          </form>

          {/* Telemetry Footer */}
          <div className="mt-12 flex justify-between text-[9px] font-black uppercase tracking-[0.2em] text-zinc-400">
            <span>Response Time: &lt; 24h</span>
            <span>Security: TLS-Encrypted</span>
          </div>
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}