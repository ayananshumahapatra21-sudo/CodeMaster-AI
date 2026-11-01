import React from 'react';
import { LineChart, Award, Zap, Flame, Calendar, CheckCircle2 } from 'lucide-react';

export default function ProgressPage() {
  const topics = [
    { name: 'Arrays & Hashing', completed: 18, total: 25 },
    { name: 'Two Pointers', completed: 10, total: 15 },
    { name: 'Sliding Window', completed: 6, total: 10 },
    { name: 'Trees & BST', completed: 8, total: 20 },
    { name: 'Dynamic Programming', completed: 4, total: 30 },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="border-b border-navy-800 pb-5">
        <h1 className="text-2xl font-bold text-white flex items-center gap-2.5">
          <LineChart className="w-6 h-6 text-cyan-400" />
          <span>Progress & Analytics</span>
        </h1>
        <p className="text-xs text-slate-400 mt-1">
          Detailed metrics tracking your algorithm mastery and learning velocity.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Topic Mastery */}
        <div className="lg:col-span-2 bg-navy-850/80 border border-navy-800 rounded-2xl p-6 shadow-xl space-y-5">
          <div className="flex items-center justify-between border-b border-navy-800/80 pb-3">
            <h2 className="text-base font-bold text-white flex items-center gap-2">
              <Zap className="w-5 h-5 text-amber-400" />
              <span>Topic-Wise Mastery</span>
            </h2>
            <span className="text-xs font-mono text-slate-400">Curriculum Progress</span>
          </div>

          <div className="space-y-4">
            {topics.map((t, idx) => {
              const pct = Math.round((t.completed / t.total) * 100);
              return (
                <div key={idx} className="space-y-1.5">
                  <div className="flex justify-between text-xs font-mono">
                    <span className="text-slate-200 font-semibold">{t.name}</span>
                    <span className="text-slate-400">{t.completed} / {t.total} ({pct}%)</span>
                  </div>
                  <div className="w-full bg-navy-950 h-2 rounded-full overflow-hidden border border-navy-800">
                    <div
                      className="bg-gradient-to-r from-blue-600 via-cyan-400 to-emerald-400 h-full rounded-full transition-all duration-500"
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Achievements & Streak */}
        <div className="bg-navy-850/80 border border-navy-800 rounded-2xl p-6 shadow-xl space-y-5">
          <div className="flex items-center justify-between border-b border-navy-800/80 pb-3">
            <h2 className="text-base font-bold text-white flex items-center gap-2">
              <Award className="w-5 h-5 text-cyan-400" />
              <span>Milestone Badges</span>
            </h2>
            <span className="text-xs font-mono text-slate-400">3 Unlocked</span>
          </div>

          <div className="space-y-3">
            <div className="flex items-center gap-3 p-3 rounded-xl bg-navy-900 border border-navy-800">
              <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xs font-bold text-white">First Step</div>
                <div className="text-[11px] text-slate-400">Solved your first challenge</div>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 rounded-xl bg-navy-900 border border-navy-800">
              <div className="p-2 rounded-lg bg-amber-500/10 text-amber-400 border border-amber-500/20">
                <Flame className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xs font-bold text-white">On Fire</div>
                <div className="text-[11px] text-slate-400">Maintained a 7-day streak</div>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 rounded-xl bg-navy-900 border border-navy-800">
              <div className="p-2 rounded-lg bg-purple-500/10 text-purple-400 border border-purple-500/20">
                <Award className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xs font-bold text-white">Algorithm Apprentice</div>
                <div className="text-[11px] text-slate-400">Solved 25 Easy problems</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
