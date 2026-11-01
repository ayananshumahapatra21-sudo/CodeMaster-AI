import React from 'react';
import { NavLink } from 'react-router-dom';
import { Code2, LayoutDashboard, Terminal, LineChart, Sparkles } from 'lucide-react';

export default function Navbar({ systemStatus }) {
  const isHealthy = systemStatus?.status === 'UP' && systemStatus?.database?.status === 'CONNECTED';

  return (
    <nav className="sticky top-0 z-50 bg-navy-900/90 backdrop-blur-md border-b border-navy-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Brand Logo */}
          <div className="flex items-center gap-3">
            <NavLink to="/" className="flex items-center gap-3 group">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 via-blue-500 to-cyan-400 p-[1px] shadow-lg shadow-blue-500/20 group-hover:shadow-blue-500/40 transition-all duration-300">
                <div className="w-full h-full bg-navy-950 rounded-[11px] flex items-center justify-center">
                  <Code2 className="w-5 h-5 text-cyan-400 group-hover:scale-110 transition-transform duration-300" />
                </div>
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-1.5">
                  <span className="font-extrabold text-lg tracking-tight text-white font-sans">
                    CodeMaster
                  </span>
                  <span className="px-1.5 py-0.5 text-[10px] font-black uppercase tracking-wider rounded bg-blue-500/10 text-cyan-400 border border-blue-500/30">
                    AI
                  </span>
                </div>
                <span className="text-[10px] text-slate-400 tracking-wide font-mono -mt-0.5">
                  Milestone 1 • Architecture
                </span>
              </div>
            </NavLink>
          </div>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center gap-1">
            <NavLink
              to="/"
              className={({ isActive }) =>
                `flex items-center gap-2 px-3.5 py-2 rounded-lg text-sm font-medium transition-all ${
                  isActive
                    ? 'bg-blue-600/15 text-cyan-400 border border-blue-500/30 shadow-sm shadow-blue-500/10'
                    : 'text-slate-300 hover:text-white hover:bg-navy-800/60'
                }`
              }
            >
              <LayoutDashboard className="w-4 h-4" />
              <span>Dashboard</span>
            </NavLink>

            <NavLink
              to="/problems"
              className={({ isActive }) =>
                `flex items-center gap-2 px-3.5 py-2 rounded-lg text-sm font-medium transition-all ${
                  isActive
                    ? 'bg-blue-600/15 text-cyan-400 border border-blue-500/30 shadow-sm shadow-blue-500/10'
                    : 'text-slate-300 hover:text-white hover:bg-navy-800/60'
                }`
              }
            >
              <Terminal className="w-4 h-4" />
              <span>Problems</span>
            </NavLink>

            <NavLink
              to="/progress"
              className={({ isActive }) =>
                `flex items-center gap-2 px-3.5 py-2 rounded-lg text-sm font-medium transition-all ${
                  isActive
                    ? 'bg-blue-600/15 text-cyan-400 border border-blue-500/30 shadow-sm shadow-blue-500/10'
                    : 'text-slate-300 hover:text-white hover:bg-navy-800/60'
                }`
              }
            >
              <LineChart className="w-4 h-4" />
              <span>Progress</span>
            </NavLink>
          </div>

          {/* System Telemetry Quick Pill */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-navy-850 border border-navy-800 shadow-inner">
              <span className="relative flex h-2 w-2">
                <span
                  className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${
                    isHealthy ? 'bg-emerald-400' : 'bg-amber-400'
                  }`}
                />
                <span
                  className={`relative inline-flex rounded-full h-2 w-2 ${
                    isHealthy ? 'bg-emerald-500' : 'bg-amber-500'
                  }`}
                />
              </span>
              <span className="text-xs font-mono font-medium text-slate-300">
                {isHealthy ? 'All Systems Operational' : 'Telemetry Syncing...'}
              </span>
            </div>

            <div className="hidden sm:flex items-center gap-1 px-2.5 py-1 rounded-md bg-blue-500/10 border border-blue-500/20 text-[11px] font-mono text-cyan-400">
              <Sparkles className="w-3 h-3" />
              <span>v1.0.0</span>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
