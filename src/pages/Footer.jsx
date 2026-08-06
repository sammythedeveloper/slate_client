import { Link } from "react-router-dom";

export default function Footer() {
  return (
    // Updated background and border colors for theme-awareness
    <footer className="w-full bg-zinc-100 dark:bg-[#030303] text-zinc-600 dark:text-zinc-500 pt-24 pb-12 border-t border-zinc-200 dark:border-zinc-900/60 transition-colors duration-500 font-sans">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Top Section */}
        <div className="flex flex-col md:flex-row justify-between items-start gap-12 pb-20">
          {/* Brand & Mission Statement */}
          <div className="space-y-6 max-w-sm">
            <Link
              to="/dashboard"
              className="text-xl font-black tracking-[0.2em] text-black dark:text-white transition-opacity hover:opacity-80 block"
            >
              SLATE
            </Link>
            <p className="text-md   text-zinc-500 dark:text-zinc-400 leading-relaxed font-normal tracking-wide">
              Slate provides the scalable infrastructure required to manage
              complex recurring revenue cycles, offering real-time ledger
              integrity and automated event orchestration for modern SaaS
              platforms.
            </p>

            <div className="flex gap-6 text-[10px] font-bold tracking-[0.2em] text-zinc-500 dark:text-zinc-400 uppercase pt-2">
              <a
                href="https://github.com/sammythedeveloper"
                target="_blank"
                rel="noreferrer"
                className="hover:text-black dark:hover:text-white transition-colors"
              >
                GH
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                className="hover:text-black dark:hover:text-white transition-colors"
              >
                LI
              </a>
              <a
                href="https://docs.slate.app"
                target="_blank"
                rel="noreferrer"
                className="hover:text-black dark:hover:text-white transition-colors"
              >
                API
              </a>
            </div>
          </div>

          {/* Navigation Matrix */}
          <div className="grid grid-cols-2 gap-x-16 gap-y-4 text-[12px] font-bold tracking-[0.25em] uppercase text-zinc-500 dark:text-zinc-400">
            <Link
              to="/architecture"
              className="hover:text-black dark:hover:text-white transition-colors"
            >
              Architecture
            </Link>
            <Link
              to="/AdminGov"
              className="hover:text-black dark:hover:text-white transition-colors"
            >
              Governance
            </Link>
            <Link
              to="/compliance"
              className="hover:text-black dark:hover:text-white transition-colors"
            >
              Compliance
            </Link>
            <Link
              to="/Contact"
              className="hover:text-black dark:hover:text-white transition-colors"
            >
              Contact
            </Link>
          </div>
        </div>

        {/* Bottom Bar: Engineering Stack Credits */}
        <div className="pt-8 border-t border-zinc-200 dark:border-zinc-900/40 flex flex-col sm:flex-row justify-between items-center gap-4 text-[12px] font-bold tracking-[0.2em] uppercase text-zinc-400 dark:text-zinc-600">
          <div className="flex flex-wrap gap-x-4 gap-y-1 justify-center sm:justify-start">
            <span>PCI-COMPLIANT ARCHITECTURE</span>
            <span>•</span>
            <span>ATOMIC LEDGERS</span>
            <span>•</span>
            <span>RESTFUL API SERVICES</span>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-8">
            <span>© 2025 SLATE</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
