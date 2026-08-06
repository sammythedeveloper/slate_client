import { useEffect, useState } from "react";
import axios from "../../utils/axiosInstance";
import AdminSidebar from "../../components/AdminSidebar";
import { Trash2, Filter } from "lucide-react";

export default function AdminSubscriptions() {
  const [subscriptions, setSubscriptions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterType, setFilterType] = useState("all");
  const [confirmModal, setConfirmModal] = useState({
    show: false,
    subId: null,
  });

  useEffect(() => {
    const fetchSubscriptions = async () => {
      try {
        const res = await axios.get("/subscription/all");
        const subs = res.data.map((sub) => {
          const today = new Date();
          const endDate = new Date(sub.end_date);
          const status = endDate >= today ? "active" : "expired";
          return { ...sub, status };
        });
        setSubscriptions(subs);
      } catch (err) {
        console.error("Failed to fetch subscriptions:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchSubscriptions();
  }, []);

  // Filter Logic: Check for activity type (Assuming your API returns "MONTHLY" or "ANNUAL" in the activity string)
  const filteredSubs = subscriptions.filter((sub) => {
    const activity = (sub.activity || "").toUpperCase();

    if (filterType === "monthly") return activity.includes("MONTHLY");
    if (filterType === "annual") return activity.includes("ANNUAL");

    return true;
  });

  const getDaysRemaining = (endDate) => {
    const diff = new Date(endDate) - new Date();
    return Math.ceil(diff / (1000 * 60 * 60 * 24));
  };

  return (
    <div className="min-h-screen bg-white dark:bg-black text-black dark:text-white transition-colors duration-500 overflow-x-hidden">
      <AdminSidebar />

      <main className="lg:pl-64 w-full px-6 py-24 m-4 ">
        <header className="mb-16 flex flex-col md:flex-row md:items-end justify-between gap-8 border-b border-zinc-900 pb-12">
          <div>
            <p className="text-[9px] font-bold uppercase tracking-[0.4em] text-zinc-500 mb-2">
              Records
            </p>
            <h2 className="text-4xl font-black tracking-tighter uppercase">
              Subscriptions
            </h2>
          </div>

          {/* Filter Dropdown */}
          <div className="flex items-center gap-4">
            <Filter size={12} className="text-zinc-600" />
            <select
              className="bg-transparent text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-500 focus:outline-none cursor-pointer"
              onChange={(e) => setFilterType(e.target.value)}
              value={filterType}
            >
              <option value="all">All Plans</option>
              <option value="monthly">Monthly</option>
              <option value="annual">Annual</option>
            </select>
          </div>
        </header>

        <div className="border border-zinc-200 dark:border-zinc-900 overflow-x-auto">
          <table className="w-full text-left min-w-[600px]">
            <thead className="bg-zinc-50 dark:bg-zinc-900/50">
              <tr className="border-b border-zinc-200 dark:border-zinc-900">
                <th className="px-8 py-4 text-[9px] font-black uppercase tracking-[0.2em] text-zinc-600">
                  Subscriber
                </th>
                <th className="px-8 py-4 text-[9px] font-black uppercase tracking-[0.2em] text-zinc-600">
                  Plan Type
                </th>
                <th className="px-8 py-4 text-[9px] font-black uppercase tracking-[0.2em] text-zinc-600">
                  Gateway Ref
                </th>
                <th className="px-8 py-4 text-[9px] font-black uppercase tracking-[0.2em] text-zinc-600">
                  Days Left
                </th>
                <th className="px-8 py-4 text-[9px] font-black uppercase tracking-[0.2em] text-zinc-600 text-right">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-900">
              {filteredSubs.map((sub) => {
                const daysLeft = getDaysRemaining(sub.end_date);
                return (
                  <tr
                    key={sub.id}
                    className="hover:bg-zinc-900/20 transition-colors"
                  >
                    <td className="px-8 py-6">
                      <p className="font-bold text-xs">{sub.name}</p>
                      <p className="text-[9px] text-zinc-600 uppercase tracking-wider">
                        {sub.email}
                      </p>
                    </td>
                    <td className="px-8 py-6 text-[10px] font-medium text-zinc-400 uppercase">
                      {sub.activity}
                    </td>
                    <td className="px-8 py-6 text-[10px] font-mono text-zinc-500">
                      {sub.stripe_sub_id}
                    </td>
                    <td className="px-8 py-6">
                      <p
                        className={`text-[10px] font-black ${
                          daysLeft < 7 ? "text-rose-500" : "text-zinc-400"
                        }`}
                      >
                        {daysLeft > 0 ? `${daysLeft}d` : "EXPIRED"}
                      </p>
                    </td>
                    <td className="px-8 py-6 text-right">
                      <button
                        onClick={() =>
                          setConfirmModal({ show: true, subId: sub.id })
                        }
                        className="text-zinc-600 hover:text-rose-500 transition-colors"
                      >
                        <Trash2 size={14} />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}
