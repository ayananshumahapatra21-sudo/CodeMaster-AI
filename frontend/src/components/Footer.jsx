import React from 'react';
import { Terminal, Layers, ShieldCheck, Heart } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-navy-950 border-t border-navy-800/80 py-8 text-slate-400 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Brand Info */}
          <div className="flex items-center gap-2.5 text-xs">
            <div className="p-1.5 rounded-lg bg-blue-500/10 text-cyan-400 border border-blue-500/20">
              <Terminal className="w-4 h-4" />
            </div>
            <div>
              <span className="font-bold text-slate-200">CodeMaster AI</span>
              <span className="text-slate-500 ml-2">© 2026 • Advanced Coding Practice Platform</span>
            </div>
          </div>

          {/* Tech Stack Badges */}
          <div className="flex flex-wrap items-center gap-2 text-[11px] font-mono">
            <span className="px-2 py-0.5 rounded bg-navy-900 border border-navy-800 text-slate-300">
              Java 21
            </span>
            <span className="px-2 py-0.5 rounded bg-navy-900 border border-navy-800 text-slate-300">
              Spring Boot 3
            </span>
            <span className="px-2 py-0.5 rounded bg-navy-900 border border-navy-800 text-slate-300">
              PostgreSQL
            </span>
            <span className="px-2 py-0.5 rounded bg-navy-900 border border-navy-800 text-slate-300">
              React + Vite
            </span>
            <span className="px-2 py-0.5 rounded bg-navy-900 border border-navy-800 text-slate-300">
              Tailwind CSS
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
