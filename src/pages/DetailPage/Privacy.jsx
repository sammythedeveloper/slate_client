import { ShieldCheck, Lock, Database, FileText } from "lucide-react";
import Footer from "../Footer";

export default function Compliance() {
  const securityPillars = [
    {
      icon: <Lock size={20} />,
      title: "Data Isolation",
      desc: "Your payment credentials never touch our servers. All transactions are tokenized and processed securely within Stripe’s PCI-DSS Level 1 certified environment.",
    },
    {
      icon: <Database size={20} />,
      title: "No Financial Storage",
      desc: "We store only non-sensitive account metadata. Sensitive financial instruments (credit cards, bank accounts) are vault-stored exclusively by Stripe.",
    },
    {
      icon: <ShieldCheck size={20} />,
      title: "PCI-DSS Compliant",
      desc: "By offloading payment processing to Stripe, we maintain strict compliance with global payment security standards, minimizing risk for both our platform and our users.",
    },
    {
      icon: <FileText size={20} />,
      title: "Data Sovereignty",
      desc: "We adhere to GDPR and CCPA regulations, providing you with full control over your personal data with transparent retention and deletion policies.",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-black text-black dark:text-white transition-colors duration-500">
      <main className="flex-grow py-24 px-6">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <header className="mb-20">
            <p className="text-[10px] uppercase tracking-[0.4em] font-bold text-zinc-500 mb-6">
              Security / Compliance
            </p>
            <h1 className="text-5xl md:text-7xl font-black tracking-tighter uppercase mb-6">
              Security First.
            </h1>
            <p className="text-lg text-zinc-500 dark:text-zinc-400">
              We leverage industry-leading infrastructure to ensure your data is
              protected, private, and handled with the highest level of
              security.
            </p>
          </header>

          {/* Compliance Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-24">
            {securityPillars.map((item, idx) => (
              <div
                key={idx}
                className="bg-zinc-50 dark:bg-[#050505] border border-zinc-200 dark:border-zinc-900 p-8 hover:border-black dark:hover:border-white transition-all"
              >
                <div className="w-10 h-10 border border-zinc-200 dark:border-zinc-800 flex items-center justify-center mb-6">
                  {item.icon}
                </div>
                <h4 className="text-sm font-black uppercase tracking-widest mb-4">
                  {item.title}
                </h4>
                <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>

          {/* Disclaimer / Transparency Block */}
          <div className="border-t border-zinc-200 dark:border-zinc-900 pt-16">
            <h3 className="text-xl font-black uppercase tracking-tighter mb-6">
              Payment Transparency
            </h3>
            <div className="bg-black text-white p-8 dark:bg-white dark:text-black">
              <p className="text-xs font-medium leading-relaxed">
                DISCLAIMER: This platform is not a financial institution. We
                do not store, process, or have access to your full credit card
                numbers, bank account details, or other sensitive payment
                instruments. All payment processing is handled by our
                PCI-compliant payment infrastructure partner, Stripe. By using
                our services, you acknowledge that payment data is governed by
                Stripe's privacy and security policies.
              </p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
