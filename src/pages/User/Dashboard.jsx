import { useEffect, useState } from "react";
import axios from "../../utils/axiosInstance";
import Navbar from "../../components/Navbar";
import { Link, useNavigate } from "react-router-dom";
import { Database, ArrowRight, AlertTriangle } from "lucide-react";
import DetailModal from "./DetailModal";
import Footer from "../Footer";

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const [subscriptions, setSubscriptions] = useState([]);
  const [loadingSubscriptions, setLoadingSubscriptions] = useState(true);
  const [selectedSub, setSelectedSub] = useState(null);
  const [cancelModal, setCancelModal] = useState({
    show: false,
    subId: null,
  });

  const navigate = useNavigate();

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("user"));

    if (!userData) {
      navigate("/signin");
    } else {
      setUser(userData);
    }
  }, [navigate]);

  const handleCancel = async () => {
    try {
      await axios.delete(`/subscription/${cancelModal.subId}`);

      setSubscriptions(subscriptions.filter((s) => s.id !== cancelModal.subId));
    } catch (err) {
      console.error("Cancellation failed:", err);
    } finally {
      setCancelModal({ show: false, subId: null });
    }
  };

  useEffect(() => {
    const fetchSubscriptions = async () => {
      try {
        const res = await axios.get("/subscription");
        setSubscriptions(res.data.subscriptions);
      } catch (err) {
        console.error("Failed to load state:", err);
      } finally {
        setLoadingSubscriptions(false);
      }
    };

    if (user) {
      fetchSubscriptions();
    }
  }, [user]);

  if (!user) return null;

  return (
    <div className="min-h-screen bg-white dark:bg-black text-black dark:text-white transition-colors duration-500">
      <Navbar userName={user.name} />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-16 sm:py-20 md:py-24">
        {/* Welcome Section */}
        <header className="mb-16 sm:mb-20 md:mb-24 min-w-0">
          <div className="flex items-center gap-2 mb-6">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shrink-0" />

            <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-zinc-500">
              System Operational
            </span>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-7xl font-black tracking-tighter uppercase mb-6 break-words">
            Welcome,{" "}
            <span className="text-zinc-400 dark:text-zinc-600 break-words">
              {user.name.split(" ")[0]}
            </span>
          </h1>

          <p className="text-zinc-500 dark:text-zinc-400 uppercase tracking-widest text-[10px]">
            ACTIVE LEDGER COUNT: {subscriptions.length}
          </p>
        </header>

        {/* Subscription Section */}
        <section className="min-w-0">
          {/* Section Header */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8 border-b border-zinc-200 dark:border-zinc-900 pb-4 min-w-0">
            <h3 className="text-[10px] font-bold tracking-[0.3em] uppercase text-zinc-500">
              Deployed Services
            </h3>

            <Link
              to="/browse-memberships"
              className="text-[10px] font-bold uppercase tracking-widest flex items-center gap-2 hover:opacity-50 shrink-0"
            >
              Provision New
              <ArrowRight className="w-3 h-3 shrink-0" />
            </Link>
          </div>

          {loadingSubscriptions ? (
            <div className="text-[10px] uppercase tracking-widest text-zinc-500">
              Syncing state...
            </div>
          ) : subscriptions.length === 0 ? (
            <div className="p-8 sm:p-12 md:p-20 border border-zinc-200 dark:border-zinc-900 text-center">
              <p className="text-zinc-500 mb-8 uppercase tracking-widest text-[10px]">
                No active modules found.
              </p>

              <Link
                to="/browse-memberships"
                className="inline-block px-8 py-3 bg-black dark:bg-white text-white dark:text-black text-[10px] font-bold uppercase tracking-widest hover:opacity-80"
              >
                Initialize Gateway
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-px bg-zinc-200 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-900 min-w-0">
              {subscriptions.map((sub) => (
                <div
                  key={sub.id}
                  className="min-w-0 overflow-hidden bg-zinc-100 dark:bg-[#050505] p-6 sm:p-8 md:p-10 hover:bg-zinc-50 dark:hover:bg-zinc-900 transition-colors"
                >
                  {/* Card Header */}
                  <div className="mb-6 flex justify-between items-start gap-4 min-w-0">
                    <Database className="w-5 h-5 text-zinc-400 shrink-0" />

                    <span className="shrink-0 max-w-[50%] text-[9px] font-bold uppercase tracking-widest bg-zinc-200 dark:bg-zinc-800 px-2 py-1">
                      {sub.status}
                    </span>
                  </div>

                  {/* Subscription Name */}
                  <h3 className="min-w-0 max-w-full text-xl font-black uppercase tracking-tighter mb-4 break-words [overflow-wrap:anywhere]">
                    {sub.activity}
                  </h3>

                  {/* Expiry */}
                  <div className="space-y-2 mb-8">
                    <p className="text-[10px] uppercase tracking-widest text-zinc-500 break-words">
                      Expiry: {new Date(sub.end_date).toLocaleDateString()}
                    </p>
                  </div>

                  {/* View Button */}
                  <button
                    onClick={() => setSelectedSub(sub)}
                    className="w-full py-3 border border-zinc-300 dark:border-zinc-700 text-[10px] font-bold uppercase tracking-widest hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-all"
                  >
                    View Instance
                  </button>

                  {/* Cancel Button */}
                  <button
                    onClick={() =>
                      setCancelModal({
                        show: true,
                        subId: sub.id,
                      })
                    }
                    className="w-full mt-2 py-3 border border-zinc-300 dark:border-zinc-700 text-[10px] font-bold uppercase tracking-widest hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-all"
                  >
                    Terminate Subscription
                  </button>
                </div>
              ))}
            </div>
          )}

          {/* Cancel Modal */}
          {cancelModal.show && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
              <div className="bg-white dark:bg-[#050505] border border-zinc-200 dark:border-zinc-800 p-6 sm:p-10 w-full max-w-sm text-center">
                <AlertTriangle className="w-10 h-10 text-red-600 mx-auto mb-6" />

                <h3 className="text-xl font-black uppercase tracking-tighter mb-2 break-words">
                  Terminate Access?
                </h3>

                <p className="text-[10px] text-zinc-500 uppercase tracking-widest mb-8 break-words">
                  This action is permanent and will end your service
                  immediately.
                </p>

                <div className="flex gap-2">
                  <button
                    onClick={handleCancel}
                    className="flex-1 py-3 bg-black dark:bg-white text-white dark:text-black hover:dark:bg-red-600 hover:bg-red-600 hover:text-white hover:dark:text-white font-bold text-[10px] uppercase tracking-widest"
                  >
                    Confirm
                  </button>

                  <button
                    onClick={() =>
                      setCancelModal({
                        show: false,
                        subId: null,
                      })
                    }
                    className="flex-1 py-3 border border-zinc-200 text-black dark:text-white hover:dark:bg-blue-500 hover:dark:text-white hover:bg-blue-500 hover:text-white dark:border-zinc-800 text-[10px] font-bold uppercase tracking-widest"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          )}
        </section>
      </main>

      <DetailModal
        isOpen={!!selectedSub}
        onClose={() => setSelectedSub(null)}
        subscription={selectedSub}
      />

      <Footer />
    </div>
  );
}
