import {
  FiX,
  FiActivity,
  FiClock,
  FiShield,
  FiDatabase,
  FiLayers,
} from "react-icons/fi";
import { useNavigate } from "react-router-dom";

export default function DetailModal({ isOpen, onClose, subscription }) {
  const navigate = useNavigate();

  if (!isOpen || !subscription) return null;

  const formatDate = (date) =>
    new Date(date).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });

  return (
    <div className="fixed inset-0 z-[150] flex items-center justify-center p-4 sm:p-6 md:p-10">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/95 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative bg-white dark:bg-[#050505] w-full max-w-3xl max-h-[90vh] overflow-y-auto overflow-x-hidden border border-zinc-200 dark:border-zinc-900 shadow-2xl animate-in zoom-in-95 duration-200">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-0 right-0 z-30 p-2 border-l border-b border-zinc-200 dark:border-zinc-900 hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-colors"
        >
          <FiX size={20} />
        </button>

        <div className="flex flex-col md:flex-row min-w-0">
          {/* Sidebar: System Status */}
          <div className="md:w-1/4 shrink-0 bg-zinc-100 dark:bg-zinc-950 p-4 flex flex-col justify-between border-r border-zinc-200 dark:border-zinc-900">
            <div className="min-w-0">
              <h1 className="text-2xl font-black uppercase text-zinc-500 mb-1">
                SLATE
              </h1>

              <p className="font-black uppercase tracking-tighter break-all">
                {subscription.id}
              </p>
            </div>

            <div className="border-t border-zinc-300 dark:border-zinc-800 pt-6 mt-8 md:mt-0">
              <p className="text-[9px] font-bold uppercase tracking-widest text-zinc-500">
                State
              </p>

              <p className="text-[10px] font-black uppercase tracking-widest mt-1 text-emerald-500">
                ●{" "}
                {subscription.status === "active"
                  ? "Active"
                  : "TERMINATED"}
              </p>
            </div>
          </div>

          {/* Main Panel */}
          <div className="min-w-0 flex-1 p-6 sm:p-8 md:p-12">
            <header className="mb-10 min-w-0">
              <h2 className="min-w-0 max-w-full text-3xl md:text-4xl font-black uppercase tracking-tighter mb-4 break-words leading-none">
                {subscription.activity}
              </h2>

              <div className="flex items-start gap-2 min-w-0 text-[9px] uppercase font-bold tracking-widest text-zinc-500">
                <FiDatabase className="text-zinc-400 shrink-0 mt-0.5" />

                <span className="min-w-0 break-all">
                  GATEWAY_REF:{" "}
                  {subscription.stripe_sub_id || "EXTERNAL_SYNC"}
                </span>
              </div>
            </header>

            {/* Subscription Dates */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-px bg-zinc-200 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-900 mb-8">
              <div className="bg-zinc-50 dark:bg-[#050505] p-6 min-w-0">
                <p className="text-[9px] font-black uppercase tracking-widest text-zinc-500 mb-2">
                  Cycle Initiation
                </p>

                <div className="text-[10px] font-bold font-mono break-words">
                  {formatDate(subscription.start_date)}
                </div>
              </div>

              <div className="bg-zinc-50 dark:bg-[#050505] p-6 min-w-0">
                <p className="text-[9px] font-black uppercase tracking-widest text-zinc-500 mb-2">
                  Cycle Expiry
                </p>

                <div className="text-[10px] font-bold font-mono break-words">
                  {formatDate(subscription.end_date)}
                </div>
              </div>
            </div>

            {/* Orchestration Parameters */}
            <div className="border border-zinc-200 dark:border-zinc-900 p-6 mb-8 min-w-0">
              <h4 className="text-[9px] font-black uppercase tracking-widest text-zinc-500 mb-6 flex items-center gap-2">
                <FiLayers className="shrink-0" />
                <span>Orchestration Parameters</span>
              </h4>

              <ul className="space-y-4">
                <li className="flex items-start gap-3 text-[10px] uppercase font-bold tracking-widest text-zinc-400 min-w-0">
                  <FiActivity className="text-emerald-500 shrink-0 mt-0.5" />

                  <span className="min-w-0 break-words">
                    Atomic reconciliation active
                  </span>
                </li>

                <li className="flex items-start gap-3 text-[10px] uppercase font-bold tracking-widest text-zinc-400 min-w-0">
                  <FiShield className="text-emerald-500 shrink-0 mt-0.5" />

                  <span className="min-w-0 break-words">
                    Data drift:{" "}
                    {subscription.origin === "stripe"
                      ? "AUTOMATED_PROTOCOL"
                      : "MANUAL_OVERRIDE"}
                  </span>
                </li>

                <li className="flex items-start gap-3 text-[10px] uppercase font-bold tracking-widest text-zinc-400 min-w-0">
                  <FiClock className="text-emerald-500 shrink-0 mt-0.5" />

                  <span className="min-w-0 break-words">
                    Real-time state consistency: ENABLED
                  </span>
                </li>
              </ul>
            </div>

            {/* Update Infrastructure */}
            <button
              onClick={() => navigate("/browse-memberships")}
              className="w-full py-4 border border-black dark:border-white font-black uppercase text-[10px] tracking-[0.2em] hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-all"
            >
              Update Infrastructure
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}