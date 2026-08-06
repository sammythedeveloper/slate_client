import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Footer from "../Footer";

const testimonials = [
  {
    name: "Alex Rivera",
    role: "CTO @ FinTech Scale",
    quote: "SLATE transformed our reconciliation process.",
    img: "https://images.unsplash.com/photo-1544168190-79c17527004f?q=80&w=688&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    name: "Sarah Jenkins",
    role: "VP Eng @ PayFlow",
    quote: "The most reliable ledger infra we've used.",
    img: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=922&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    name: "Marcus Chen",
    role: "Founder @ Nexa",
    quote: "The webhook governance is industry-leading.",
    img: "https://images.unsplash.com/photo-1738949539165-1afd5d8cac62?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    name: "Elena Vost",
    role: "Lead Dev @ CloudStack",
    quote: "Sub-30ms latency changed our entire stack.",
    img: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=688&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
];
export default function About() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    // Rotates every 5 seconds (5000ms)
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);
  return (
    <div className="min-h-screen bg-white dark:bg-black text-black dark:text-white transition-colors duration-500">
      <section className="relative w-full h-[500px] overflow-hidden bg-black">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover opacity-50"
          src="https://www.pexels.com/download/video/7255752/" // Add your video source here
        />

        {/* Dark Overlay to make the text pop */}
        <div className="absolute inset-0 bg-black/40" />

        <div className="relative z-10 w-full h-full flex flex-col items-center justify-center text-center px-6">
          <h1 className="text-5xl md:text-8xl font-black uppercase tracking-tighter mb-4 text-white">
            About SLATE
          </h1>
          <p className="text-[10px] uppercase tracking-[0.4em] font-bold text-zinc-300">
            Infrastructure / About
          </p>
        </div>
      </section>

      {/* Main Content Block */}
      <main className="max-w-5xl mx-auto px-2 py-24">
        {/* Section Heading */}
        <div className="text-center mb-20">
          <span className="text-[10px] uppercase tracking-[0.4em] font-bold text-zinc-500 mb-4 block">
            Our Philosophy
          </span>
          <h2 className="text-4xl md:text-6xl font-black tracking-tighter uppercase">
            Redefining Revenue Infrastructure
          </h2>
        </div>
        <section className="bg-zinc-100 dark:bg-[#050505] border border-zinc-200 dark:border-zinc-900 p-10 md:p-16 flex flex-col md:flex-row items-center gap-8 transition-colors duration-500">
          <div className="flex-1 space-y-8">
            <h3 className="text-3xl font-black tracking-tighter ">
              The Future of Financial State
            </h3>
            <p className="text-md text-zinc-500 dark:text-zinc-400 leading-relaxed">
              SLATE bridges the gap between fragmented payment gateways and the
              need for atomic, real-time financial consistency. We eliminate
              data drift and provide the orchestration layer necessary for
              high-output engineering teams to scale without the headache of
              manual reconciliation.
            </p>
            <button className="bg-black dark:bg-white text-white dark:text-black text-[10px] font-bold uppercase tracking-[0.2em] px-8 py-3 hover:opacity-80 transition-opacity">
              Explore Documentation
            </button>
          </div>

          {/* Image Placeholder */}
          <div className="w-full md:w-1/2 h-64 bg-zinc-200 dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-800 flex items-center justify-center">
            <span className="text-[10px] uppercase tracking-widest text-zinc-400">
              <img
                src="https://images.unsplash.com/vector-1761072532458-2bef471ff963?q=80&w=1744&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt=""
              />
            </span>
          </div>
        </section>
        {/* Testimonial Section */}
        <section className="py-24 border-t border-zinc-200 dark:border-zinc-900 overflow-hidden">
          <div className="max-w-3xl mx-auto px-6 text-center relative h-64">
            <AnimatePresence mode="wait">
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="flex flex-col items-center"
              >
                {/* Circle Placeholder */}
                <div className="w-20 h-20 bg-zinc-200 dark:bg-zinc-800 rounded-full mb-8 border border-zinc-300 dark:border-zinc-700 overflow-hidden">
                  <img
                    src={testimonials[index].img}
                    alt={testimonials[index].name}
                    className="w-full h-full object-cover opacity-80"
                  />
                </div>

                <blockquote className="text-2xl md:text-3xl font-light italic leading-tight mb-8">
                  "{testimonials[index].quote}"
                </blockquote>

                <div className="text-center">
                  <p className="font-bold uppercase tracking-widest text-xs mb-1">
                    {testimonials[index].name}
                  </p>
                  <p className="text-[10px] uppercase tracking-[0.2em] text-zinc-500">
                    {testimonials[index].role}
                  </p>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
