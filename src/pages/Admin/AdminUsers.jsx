import { useEffect, useState } from "react";
import axios from "../../utils/axiosInstance";
import AdminSidebar from "../../components/AdminSidebar";
import { Trash2 } from "lucide-react";

export default function AdminSubscriptions() {
  const [subscriptions, setSubscriptions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [setDeletingId] = useState(null);
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

  const handleDelete = async (id) => {
    setDeletingId(id);
    try {
      await axios.delete(`/subscription/delete/${id}`);
      setSubscriptions(subscriptions.filter((sub) => sub.id !== id));
    } catch (err) {
      console.error("Failed to delete:", err);
    } finally {
      setDeletingId(null);
      setConfirmModal({ show: false, subId: null });
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-screen bg-[#080808] items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-10 h-10 border-4 border-rose-600 border-t-transparent rounded-full animate-spin" />
          <p className="text-zinc-500 text-[10px] font-black uppercase tracking-[0.3em]">
            Syncing Logs
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white dark:bg-black text-black dark:text-white transition-colors duration-500 overflow-x-hidden">
      <AdminSidebar />
      <main className="lg:pl-64 w-full px-6 py-24 mx-4">
        <header className="mb-16 flex flex-col md:flex-row md:items-end justify-between gap-8 border-b border-zinc-900 pb-12">
          <div>
            <p className="text-[9px] font-bold uppercase tracking-[0.4em] text-zinc-500 mb-2">
              Records
            </p>
            <h2 className="text-4xl font-black tracking-tighter uppercase">
              Users Data
            </h2>
          </div>
        </header>

        <div className="border border-zinc-200 dark:border-zinc-900 overflow-x-auto">
          <table className="w-full text-left min-w-[600px]">
            <thead className="bg-zinc-50 dark:bg-zinc-900/50">
              <tr className="border-b border-zinc-200 dark:border-zinc-900">
                <th className="px-8 py-4 text-[9px] font-black uppercase tracking-[0.2em] text-zinc-600">
                  Users
                </th>
                <th className="px-8 py-4 text-[9px] font-black uppercase tracking-[0.2em] text-zinc-600">
                  Program
                </th>
                <th className="px-8 py-4 text-[9px] font-black uppercase tracking-[0.2em] text-zinc-600">
                  Valid Until
                </th>
                <th className="px-8 py-4 text-[9px] font-black uppercase tracking-[0.2em] text-zinc-600">
                  Status
                </th>
                <th className="px-8 py-4 text-[9px] font-black uppercase tracking-[0.2em] text-zinc-600 text-right">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-900">
              {subscriptions.map((sub) => (
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
                  <td className="px-8 py-6 text-[10px] font-medium text-zinc-500">
                    {new Date(sub.end_date).toLocaleDateString()}
                  </td>
                  <td className="px-8 py-6">
                    <span
                      className={`text-[9px] font-black uppercase tracking-[0.2em] ${
                        sub.status === "active"
                          ? "text-emerald-500"
                          : "text-zinc-600"
                      }`}
                    >
                      {sub.status}
                    </span>
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
              ))}
            </tbody>
          </table>
        </div>

        {/* Modal remains the same */}
        {confirmModal.show && (
          <div className="fixed inset-0 flex items-center justify-center z-[9999] p-4 bg-black/80 backdrop-blur-sm">
            <div className="bg-[#050505] border border-zinc-800 p-8 w-full max-w-xs text-center">
              <p className="text-[10px] font-black uppercase tracking-[0.3em] mb-6">
                Terminate Access?
              </p>
              <div className="flex flex-col gap-2">
                <button
                  onClick={() => handleDelete(confirmModal.subId)}
                  className="py-3 bg-white text-black text-[9px] font-black uppercase tracking-[0.2em]"
                >
                  Confirm
                </button>
                <button
                  onClick={() => setConfirmModal({ show: false, subId: null })}
                  className="py-3 border border-zinc-800 text-[9px] font-black uppercase tracking-[0.2em]"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
