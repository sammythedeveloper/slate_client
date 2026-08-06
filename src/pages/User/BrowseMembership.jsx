import { useState, useEffect } from "react";
import axios from "../../utils/axiosInstance";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar";
import { Check } from "lucide-react";
import Footer from "../Footer";

const plans = [
  {
    name: "Market Intelligence",
    basePrice: 30,
    desc: "Entry-level access to global macro metadata streams and regulatory reporting feeds.",
    features: [
      "Real-time Macro Feeds",
      "Regulatory Alert API",
      "Market Sentiment Indices",
    ],
  },
  {
    name: "Operational Workflow",
    basePrice: 125,
    desc: "Standardized deployment of departmental accounting and automated trade orchestration.",
    features: [
      "Automated Trade Streams",
      "Workflow Logic Engine",
      "Yield Capture Webhooks",
    ],
  },
  {
    name: "Capital Pipeline",
    basePrice: 250,
    desc: "High-priority infrastructure for accelerated capital deployment and predictive modeling.",
    features: [
      "Priority Execution API",
      "Institutional Alpha Models",
      "Predictive Risk Hooks",
    ],
  },
  {
    name: "Treasury Oversight",
    basePrice: 500,
    desc: "Full-scale governance support for institutional treasury management and resource allocation.",
    features: [
      "Full Institutional API Access",
      "Audit-Ready Compliance Logs",
      "24/7 Dedicated Liquidity Support",
    ],
  },
];

const ComparisonMatrix = () => {
  const comparisonData = [
    {
      feature: "Execution Limits",
      guest: "50 ops/hr",
      basic: "500 ops/hr",
      pro: "5,000 ops/hr",
      impact: "Unlimited",
    },
    {
      feature: "Audit Retention",
      guest: "7 Days",
      basic: "30 Days",
      pro: "90 Days",
      impact: "Permanent",
    },
    {
      feature: "Service Level",
      guest: "Self-Serve",
      basic: "48h Response",
      pro: "4h Response",
      impact: "Dedicated Partner",
    },
    {
      feature: "Institutional Authority",
      guest: "None",
      basic: "Operational View",
      pro: "Full Executive Vote",
      impact: "Board Seat",
    },
  ];
  return (
    <section className="mt-32 border-t border-zinc-200 dark:border-zinc-900 pt-16">
      <h2 className="text-[10px] font-bold tracking-[0.4em] uppercase text-zinc-500 mb-12 text-center">
        Infrastructure Specifications
      </h2>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-zinc-200 dark:border-zinc-900">
              <th className="p-4 text-[9px] uppercase tracking-widest text-zinc-500">
                Vector
              </th>
              <th className="p-4 text-[9px] uppercase tracking-widest">
                Guest
              </th>
              <th className="p-4 text-[9px] uppercase tracking-widest">
                Basic
              </th>
              <th className="p-4 text-[9px] uppercase tracking-widest">Pro</th>
              <th className="p-4 text-[9px] uppercase tracking-widest">
                Impact
              </th>
            </tr>
          </thead>
          <tbody>
            {comparisonData.map((row) => (
              <tr
                key={row.feature}
                className="border-b border-zinc-200 dark:border-zinc-900 hover:bg-zinc-50 dark:hover:bg-zinc-900/50 transition-colors"
              >
                <td className="p-4 text-[10px] font-bold uppercase tracking-widest text-zinc-500">
                  {row.feature}
                </td>
                <td className="p-4 text-[10px] uppercase tracking-widest">
                  {row.guest}
                </td>
                <td className="p-4 text-[10px] uppercase tracking-widest">
                  {row.basic}
                </td>
                <td className="p-4 text-[10px] uppercase tracking-widest">
                  {row.pro}
                </td>
                <td className="p-4 text-[10px] uppercase tracking-widest">
                  {row.impact}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default function BrowseMembership() {
  const [loadingPlan, setLoadingPlan] = useState(null);
  const [user, setUser] = useState(null);
  const [billingCycle, setBillingCycle] = useState("monthly");
  const navigate = useNavigate();

  const processedPlans = plans.map((p) => {
    const isAnnual = billingCycle === "annual";

    const baseKey = p.name.toUpperCase().replace(/\s+/g, "_");
    const activityKey = isAnnual ? `${baseKey}_ANNUAL` : `${baseKey}_MONTHLY`;

    const annualPrice = Math.floor(p.basePrice * 12 * 0.8);

    return {
      ...p,
      activity: activityKey,
      displayPrice: isAnnual ? `$${annualPrice}` : `$${p.basePrice}`,
      billingSuffix: isAnnual ? "/year (billed upfront)" : "/mo",
      savings: isAnnual
        ? `Save $${p.basePrice * 12 - annualPrice} annually`
        : null,
    };
  });

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("user"));
    if (!userData) navigate("/signin");
    else setUser(userData);
  }, [navigate]);

  const handleSubscribe = async (plan) => {
    setLoadingPlan(plan.name); // Always use name for state consistency

    try {
      const res = await axios.post("/subscription/checkout", {
        activity: plan.activity, 
        duration: billingCycle === "annual" ? "12" : "1",
        billingCycle: billingCycle,
      });

      if (res.data?.url) {
        window.location.href = res.data.url;
      }
    } catch (err) {
      console.error("Subscription error:", err.response?.data || err.message);
    } finally {
      setLoadingPlan(null); 
    }
  };

  if (!user) return null;

  return (
    <div className="min-h-screen bg-white dark:bg-black text-black dark:text-white transition-colors duration-500">
      <Navbar />

      <main className="max-w-6xl mx-auto px-6 py-24">
        {/* Header */}
        <header className="mb-24 text-center">
          <h1 className="text-4xl md:text-7xl font-black tracking-tighter uppercase mb-6">
            Choose Your{" "}
            <span className="text-zinc-400 dark:text-zinc-600">Instance.</span>
          </h1>
          <p className="text-[10px] font-bold tracking-[0.4em] uppercase text-zinc-500">
            Transparent scaling for the Diaspora hub.
          </p>
        </header>
        <div className="flex justify-center mb-16">
          <div className="flex items-center p-1 bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-full">
            <button
              onClick={() => setBillingCycle("monthly")}
              className={`px-6 py-2 rounded-full text-[10px] font-black uppercase tracking-widest transition-all ${
                billingCycle === "monthly"
                  ? "bg-black dark:bg-white text-white dark:text-black shadow-lg"
                  : "text-zinc-500"
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setBillingCycle("annual")}
              className={`px-6 py-2 rounded-full text-[10px] font-black uppercase tracking-widest transition-all ${
                billingCycle === "annual"
                  ? "bg-black dark:bg-white text-white dark:text-black shadow-lg"
                  : "text-zinc-500"
              }`}
            >
              Annual (Save 20%)
            </button>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 border border-zinc-200 dark:border-zinc-900 bg-white dark:bg-[#050505]">
          {processedPlans.map((plan) => (
            <div
              key={plan.name}
              className="p-10 border-b md:border-b-0 md:border-r last:border-r-0 border-zinc-200 dark:border-zinc-900 flex flex-col"
            >
              <h3 className="text-lg font-black uppercase tracking-tighter mb-2">
                {plan.name}
              </h3>
              <div className="text-4xl font-black mb-6">
                {plan.displayPrice}
                <span className="text-xs text-zinc-500 font-medium ml-1">
                  {plan.billingSuffix}
                </span>
              </div>
              <p className="text-[10px] uppercase tracking-widest text-zinc-500 mb-8 h-10">
                {plan.desc}
              </p>
              <ul className="md:pt-10 space-y-4 mb-10 flex-grow">
                {plan.features.map((f) => (
                  <li
                    key={f}
                    className="flex items-center gap-3 text-[10px] font-bold uppercase tracking-widest"
                  >
                    <Check className="w-3 h-3 text-rose-600" /> {f}
                  </li>
                ))}
              </ul>
              <button
                onClick={() => handleSubscribe(plan)}
                // Use plan.name here, not plan.activity
                disabled={loadingPlan === plan.name}
                className="w-full py-4 border border-zinc-300 dark:border-zinc-700 font-black text-[10px] uppercase tracking-widest hover:bg-black hover:text-white transition-all"
              >
                {loadingPlan === plan.name ? "Verifying..." : "Select Plan"}
              </button>
            </div>
          ))}
        </div>
        {/* Engineering Team/Mentors (Rebranded as 'System Architects') */}
        <section className="mt-32">
          <ComparisonMatrix />
        </section>
        <section className="mt-32">
          <h2 className="text-[10px] font-bold tracking-[0.4em] uppercase text-zinc-500 mb-12 text-center">
            System Architects
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {/* Mentor cards using the same grayscale hover technique */}
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="group text-center">
                <div className="w-24 h-24 mx-auto mb-6 bg-zinc-200 dark:bg-zinc-900 rounded-full grayscale group-hover:grayscale-0 transition-all border border-zinc-300 dark:border-zinc-800" />
                <h4 className="text-xs font-bold uppercase tracking-widest mb-1">
                  Architect {i}
                </h4>
                <p className="text-[9px] uppercase tracking-widest text-zinc-500">
                  Lead Infrastructure
                </p>
              </div>
            ))}
          </div>
        </section>
      </main>
      <Footer/>
    </div>
  );
}
