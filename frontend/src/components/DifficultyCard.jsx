import React from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function DifficultyCard({ level, solved, total, percentage, color = 'emerald' }) {
  const styles = {
    emerald: {
      badge: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30',
      bar: 'from-emerald-500 to-teal-400',
      border: 'border-emerald-500/20 hover:border-emerald-500/50',
      shadow: 'hover:shadow-emerald-500/10',
      btn: 'bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500 hover:text-navy-950 border-emerald-500/30'
    },
    amber: {
      badge: 'bg-amber-500/10 text-amber-400 border-amber-500/30',
      bar: 'from-amber-500 to-yellow-400',
      border: 'border-amber-500/20 hover:border-amber-500/50',
      shadow: 'hover:shadow-amber-500/10',
      btn: 'bg-amber-500/10 text-amber-400 hover:bg-amber-500 hover:text-navy-950 border-amber-500/30'
    },
    rose: {
      badge: 'bg-rose-500/10 text-rose-400 border-rose-500/30',
      bar: 'from-rose-500 to-pink-500',
      border: 'border-rose-500/20 hover:border-rose-500/50',
      shadow: 'hover:shadow-rose-500/10',
      btn: 'bg-rose-500/10 text-rose-400 hover:bg-rose-500 hover:text-white border-rose-500/30'
    }
  };

  const currentStyle = styles[color] || styles.emerald;
  const calcPercent = percentage !== undefined ? percentage : Math.round((solved / total) * 100);

  return (
    <div className={`bg-navy-850/80 backdrop-blur border ${currentStyle.border} rounded-2xl p-5 shadow-lg transition-all duration-300 hover:-translate-y-1 ${currentStyle.shadow} flex flex-col justify-between space-y-4`}>
      {/* Top Header */}
      <div>
        <div className="flex items-center justify-between">
          <span className={`text-xs font-bold font-mono uppercase tracking-wider px-2.5 py-1 rounded-full border ${currentStyle.badge}`}>
            {level}
          </span>
          <span className="text-xs font-mono font-semibold text-slate-300">
            {calcPercent}% Complete
          </span>
        </div>

        {/* Progress Numbers */}
        <div className="mt-3 flex items-baseline gap-2">
          <span className="text-2xl font-extrabold text-white font-mono">
            {solved}
          </span>
          <span className="text-xs font-mono text-slate-400">
            / {total} Solved
          </span>
        </div>

        {/* Visual Progress Bar */}
        <div className="mt-3 w-full bg-navy-950 h-2.5 rounded-full overflow-hidden border border-navy-800 p-[1px]">
          <div
            className={`h-full rounded-full bg-gradient-to-r ${currentStyle.bar} transition-all duration-700`}
            style={{ width: `${Math.min(calcPercent, 100)}%` }}
          />
        </div>
      </div>

      {/* Action Footer */}
      <div className="pt-2 border-t border-navy-800/80 flex items-center justify-between">
        <span className="text-[11px] text-slate-400 flex items-center gap-1 font-mono">
          <Sparkles className="w-3 h-3 text-cyan-400" />
          Curated set
        </span>
        <Link
          to={`/problems?difficulty=${level.toLowerCase()}`}
          className={`inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all ${currentStyle.btn}`}
        >
          <span>Practice</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </div>
  );
}
