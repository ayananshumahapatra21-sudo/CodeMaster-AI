import React from 'react';

export default function StatCard({ title, value, subtitle, icon: Icon, color = 'blue', trend }) {
  const colorMap = {
    blue: {
      bg: 'bg-blue-500/10',
      border: 'border-blue-500/20 hover:border-blue-500/40',
      text: 'text-cyan-400',
      glow: 'shadow-blue-500/10',
      badge: 'bg-blue-500/10 text-cyan-400 border-blue-500/30'
    },
    emerald: {
      bg: 'bg-emerald-500/10',
      border: 'border-emerald-500/20 hover:border-emerald-500/40',
      text: 'text-emerald-400',
      glow: 'shadow-emerald-500/10',
      badge: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
    },
    amber: {
      bg: 'bg-amber-500/10',
      border: 'border-amber-500/20 hover:border-amber-500/40',
      text: 'text-amber-400',
      glow: 'shadow-amber-500/10',
      badge: 'bg-amber-500/10 text-amber-400 border-amber-500/30'
    },
    purple: {
      bg: 'bg-purple-500/10',
      border: 'border-purple-500/20 hover:border-purple-500/40',
      text: 'text-purple-400',
      glow: 'shadow-purple-500/10',
      badge: 'bg-purple-500/10 text-purple-400 border-purple-500/30'
    }
  };

  const scheme = colorMap[color] || colorMap.blue;

  return (
    <div className={`bg-navy-850/80 backdrop-blur border ${scheme.border} rounded-2xl p-5 shadow-lg ${scheme.glow} transition-all duration-300 hover:-translate-y-0.5 group`}>
      <div className="flex items-center justify-between">
        <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
          {title}
        </span>
        <div className={`p-2.5 rounded-xl ${scheme.bg} ${scheme.text} transition-transform group-hover:scale-110 duration-200`}>
          <Icon className="w-5 h-5" />
        </div>
      </div>

      <div className="mt-4 flex items-baseline justify-between">
        <div className="text-2xl sm:text-3xl font-extrabold text-white font-mono tracking-tight">
          {value}
        </div>
        {trend && (
          <span className={`text-[11px] font-mono px-2 py-0.5 rounded-md border font-semibold ${scheme.badge}`}>
            {trend}
          </span>
        )}
      </div>

      {subtitle && (
        <p className="mt-1 text-xs text-slate-400 font-sans">
          {subtitle}
        </p>
      )}
    </div>
  );
}
