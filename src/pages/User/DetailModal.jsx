import { FiX, FiActivity, FiClock, FiShield, FiDatabase, FiLayers } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

export default function DetailModal({ isOpen, onClose, subscription }) {
  const navigate = useNavigate();
  if (!isOpen || !subscription) return null;

  const formatDate = (date) => new Date(date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });

  return (
    <div className="fixed inset-0 z-[150] flex items-center justify-center p-0 md:p-10">
      <div className="absolute inset-0 bg-black/95 backdrop-blur-sm" onClick={onClose} />

      <div className="relative bg-white dark:bg-[#050505] w-full max-w-3xl border border-zinc-200 dark:border-zinc-900 shadow-2xl animate-in zoom-in-95 duration-200">
        
        <button onClick={onClose} className="absolute top-0 right-0 z-30 p-2 border-l border-b border-zinc-200 dark:border-zinc-900 hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-colors">
          <FiX size={20} />
        </button>

        <div className="flex flex-col md:flex-row">
          {/* Sidebar: System Status */}
          <div className="md:w-1/4 bg-zinc-100 dark:bg-zinc-950 p-4 flex flex-col justify-between border-r border-zinc-200 dark:border-zinc-900">
            <div>
              <h1 className=" text-2xl font-black uppercase  text-zinc-500 mb-1">SLATE</h1>
              <p className=" font-black uppercase tracking-tighter truncate">{subscription.id}</p>
            </div>
            <div className="border-t border-zinc-300 dark:border-zinc-800 pt-6">
              <p className="text-[9px] font-bold uppercase tracking-widest text-zinc-500">State</p>
              <p className="text-[10px] font-black uppercase tracking-widest mt-1 text-emerald-500">
                ● {subscription.status === 'active' ? 'Active' : 'TERMINATED'}
              </p>
            </div>
          </div>

          {/* Main Panel: Orchestration Data */}
          <div className="p-8 md:p-12">
            <header className="mb-10">
              <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tighter mb-4 break-words leading-none">
                {subscription.activity}
              </h2>
              <div className="flex items-center gap-2 text-[9px] uppercase font-bold tracking-widest text-zinc-500">
                <FiDatabase className="text-zinc-400 shrink-0" /> 
                <span className="truncate">GATEWAY_REF: {subscription.stripe_sub_id || 'EXTERNAL_SYNC'}</span>
              </div>
            </header>

            <div className="grid grid-cols-2 gap-px bg-zinc-200 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-900 mb-8">
              <div className="bg-zinc-50 dark:bg-[#050505] p-6">
                <p className="text-[9px] font-black uppercase tracking-widest text-zinc-500 mb-2">Cycle Initiation</p>
                <div className="text-[10px] font-bold font-mono">{formatDate(subscription.start_date)}</div>
              </div>
              <div className="bg-zinc-50 dark:bg-[#050505] p-6">
                <p className="text-[9px] font-black uppercase tracking-widest text-zinc-500 mb-2">Cycle Expiry</p>
                <div className="text-[10px] font-bold font-mono">{formatDate(subscription.end_date)}</div>
              </div>
            </div>

            <div className="border border-zinc-200 dark:border-zinc-900 p-6 mb-8">
              <h4 className="text-[9px] font-black uppercase tracking-widest text-zinc-500 mb-6 flex items-center gap-2">
                <FiLayers /> Orchestration Parameters
              </h4>
              <ul className="space-y-4">
                <li className="flex items-center gap-3 text-[10px] uppercase font-bold tracking-widest text-zinc-400">
                  <FiActivity className="text-emerald-500" /> Atomic reconciliation active
                </li>
                <li className="flex items-center gap-3 text-[10px] uppercase font-bold tracking-widest text-zinc-400">
                  <FiShield className="text-emerald-500" /> Data drift: {subscription.origin === 'stripe' ? 'AUTOMATED_PROTOCOL' : 'MANUAL_OVERRIDE'}
                </li>
                <li className="flex items-center gap-3 text-[10px] uppercase font-bold tracking-widest text-zinc-400">
                  <FiClock className="text-emerald-500" /> Real-time state consistency: ENABLED
                </li>
              </ul>
            </div>

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