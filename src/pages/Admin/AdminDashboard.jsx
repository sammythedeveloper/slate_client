import { useEffect, useState } from "react";
import axios from "../../utils/axiosInstance";
import AdminSidebar from "../../components/AdminSidebar";
import { Database, Zap, ShieldAlert, TrendingUp } from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function AdminDashboard() {
  const [adminName, setAdminName] = useState("Admin");
  const [stats, setStats] = useState({ mrr: 0, total: 0, active: 0, drift: 0 });
  const [subscriptions, setSubscriptions] = useState([]);
  const [loading, setLoading] = useState(true);

  const getMonthlyRevenueData = (subs) => {
    const months = {}; // { '2026-06': 1200, '2026-05': 1050 }

    subs.forEach((s) => {
      const month = new Date(s.start_date).toISOString().slice(0, 7); // e.g., "2026-06"
      const price = s.activity.includes("ANNUAL") ? 499 / 12 : 49;

      if (!months[month]) months[month] = 0;
      months[month] += price;
    });

    return Object.keys(months)
      .sort()
      .map((m) => ({
        month: m,
        revenue: Math.round(months[m]),
      }));
  };

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("user"));
    if (userData?.name) setAdminName(userData.name.split(" ")[0]);

    const fetchData = async () => {
      try {
        const res = await axios.get("/subscription/all");
        const data = res.data;

        // Logic: Calculate metrics from raw data
        const activeSubs = data.filter((s) => s.status === "active");

        // Logic for revenue values
        const mrr = activeSubs.reduce((acc, s) => {
          const price = s.activity.includes("ANNUAL") ? 499 / 12 : 49;
          return acc + price;
        }, 0);

        // Drift Logic: Local record active but end_date has passed
        const drift = data.filter(
          (s) => s.status === "active" && new Date(s.end_date) < new Date()
        ).length;

        setStats({
          mrr: Math.round(mrr),
          total: data.length,
          active: activeSubs.length,
          drift,
        });
        setSubscriptions(data);
      } catch (err) {
        console.error("Control Plane sync failed:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) return null;

  return (
    <div className="min-h-screen bg-white dark:bg-black text-black dark:text-white transition-colors duration-500 overflow-x-hidden">
      <AdminSidebar />
      <main className="lg:pl-64 w-full px-6 py-24 m-4 ">
        <div className="max-w-7xl mx-auto">
          <header className="mb-24">
            <div className="flex items-center gap-2 mb-6">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-zinc-500">
                Blessed
              </span>
            </div>
            <h1 className="text-4xl md:text-7xl font-black tracking-tighter uppercase mb-6">
              Welcome,{" "}
              <span className="text-zinc-400 dark:text-zinc-600">
                {adminName}
              </span>
            </h1>
          </header>
          {/* Metrics Grid */}
          <section className="mb-24">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-zinc-200 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-900">
              {[
                { label: "MRR", val: `$${stats.mrr}`, icon: TrendingUp },
                { label: "Total Ledgers", val: stats.total, icon: Database },
                { label: "Active Syncs", val: stats.active, icon: Zap },
                {
                  label: "Drift Detected",
                  val: stats.drift,
                  icon: ShieldAlert,
                  color: stats.drift > 0 ? "text-rose-500" : "",
                },
              ].map((s, i) => (
                <div
                  key={i}
                  className="bg-zinc-50 dark:bg-[#050505] p-8 md:p-10"
                >
                  <s.icon
                    className={`w-5 h-5 mb-6 ${s.color || "text-zinc-400"}`}
                  />
                  <p className="text-[10px] uppercase tracking-widest text-zinc-500 mb-2">
                    {s.label}
                  </p>
                  <h3
                    className={`text-2xl md:text-3xl font-black tracking-tighter ${s.color}`}
                  >
                    {s.val}
                  </h3>
                </div>
              ))}
            </div>
          </section>
          <section className="mb-24">
            <h3 className="text-[10px] font-bold tracking-[0.3em] uppercase text-zinc-500 mb-8 border-b border-zinc-200 dark:border-zinc-900 pb-4">
              Revenue Trajectory (MRR)
            </h3>

            {/* Graph */}
            <div className="h-64 w-full border border-zinc-200 dark:border-zinc-900 bg-zinc-50 dark:bg-[#050505] p-6 flex items-center justify-center">
              {subscriptions.length > 0 ? (
            <ResponsiveContainer width="100%" height="100%">
            <BarChart data={getMonthlyRevenueData(subscriptions)}>
              <XAxis dataKey="month" tick={{ fontSize: 9, fill: '#71717a' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 9, fill: '#71717a' }} axisLine={false} tickLine={false} tickFormatter={(v) => `$${v}`} />
              <Tooltip cursor={{ fill: 'transparent' }} contentStyle={{ backgroundColor: "#000", border: "1px solid #18181b", fontSize: "10px", color: "#fff" }} />
              <Bar dataKey="revenue" fill="#10b981" radius={[2, 2, 0, 0]} barSize={40} />
            </BarChart>
          </ResponsiveContainer>
              ) : (
                <p className="text-[10px] uppercase tracking-widest text-zinc-500">
                  No Revenue Data Available
                </p>
              )}
            </div>
          </section>
          <section>
            <h3 className="text-[10px] font-bold tracking-[0.3em] uppercase text-zinc-500 mb-8">
              Live Data
            </h3>
            <div className="border border-zinc-200 dark:border-zinc-900 overflow-x-auto">
              <table className="w-full text-left min-w-[600px]">
                <thead className="bg-zinc-50 dark:bg-zinc-900/50">
                  <tr className="border-b border-zinc-200 dark:border-zinc-900">
                    <th className="p-4 md:p-6 text-[9px] uppercase tracking-widest text-zinc-500">
                      Instance
                    </th>
                    <th className="p-4 md:p-6 text-[9px] uppercase tracking-widest text-zinc-500">
                      Email
                    </th>
                    <th className="p-4 md:p-6 text-[9px] uppercase tracking-widest text-zinc-500">
                      Gateway Ref
                    </th>
                    <th className="p-4 md:p-6 text-[9px] uppercase tracking-widest text-zinc-500">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y dark:divide-zinc-900">
                  {subscriptions.map((sub) => (
                    <tr
                      key={sub.id}
                      className="hover:bg-zinc-50 dark:hover:bg-zinc-900/30 transition-colors"
                    >
                      <td className="p-4 md:p-6 text-[10px] font-bold uppercase">
                        {sub.activity}
                      </td>
                      <td className="p-4 md:p-6 text-[10px] text-zinc-500">
                        {sub.email}
                      </td>
                      <td className="p-4 md:p-6 text-[10px] font-mono text-zinc-500">
                        {sub.stripe_sub_id?.slice(0, 15)}
                      </td>
                      <td className="p-4 md:p-6">
                        <span
                          className={`text-[9px] font-bold uppercase px-2 py-1 ${
                            new Date(sub.end_date) < new Date() &&
                            sub.status === "active"
                              ? "bg-rose-500/10 text-rose-500"
                              : "bg-emerald-500/10 text-emerald-500"
                          }`}
                        >
                          {sub.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
