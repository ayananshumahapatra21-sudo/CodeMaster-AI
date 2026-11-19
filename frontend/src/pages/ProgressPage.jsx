import React, { useState, useEffect } from 'react';
import { LineChart, Award, Zap, Flame, Trophy, CheckCircle2, User } from 'lucide-react';
import { leaderboardService } from '../services/leaderboardService';
import { progressService } from '../services/progressService';

export default function ProgressPage() {
  const [leaderboard, setLeaderboard] = useState([]);
  const [progress, setProgress] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const [leadData, progData] = await Promise.all([
          leaderboardService.getLeaderboard().catch(() => []),
          progressService.getProgress().catch(() => null)
        ]);
        setLeaderboard(leadData.length > 0 ? leadData : [
          { rank: 1, name: 'Ayananshu Mahapatra', score: 2850, problemsSolved: 84, badge: 'Grandmaster' },
          { rank: 2, name: 'Sarah Connor', score: 2420, problemsSolved: 71, badge: 'Master' },
          { rank: 3, name: 'David Kim', score: 2180, problemsSolved: 65, badge: 'Candidate Master' },
          { rank: 4, name: 'Elena Rostova', score: 1950, problemsSolved: 58, badge: 'Expert' }
        ]);
        setProgress(progData || {
          totalSolved: 3,
          easySolved: 2,
          mediumSolved: 1,
          hardSolved: 0,
          totalProblems: 5,
          streakDays: 4,
          acceptanceRate: '75.0%'
        });
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

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
          Detailed metrics tracking your algorithm mastery, learning velocity, and global standings.
        </p>
      </div>

      {/* Progress Cards */}
      {progress && (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="bg-navy-850/80 border border-navy-800 rounded-xl p-4">
            <span className="text-xs text-slate-400 block font-mono">Total Solved</span>
            <span className="text-2xl font-extrabold text-white mt-1 block">{progress.totalSolved} / {progress.totalProblems}</span>
          </div>
          <div className="bg-navy-850/80 border border-navy-800 rounded-xl p-4">
            <span className="text-xs text-slate-400 block font-mono">Daily Streak</span>
            <span className="text-2xl font-extrabold text-amber-400 mt-1 flex items-center gap-1.5">
              <Flame className="w-5 h-5" />
              <span>{progress.streakDays} Days</span>
            </span>
          </div>
          <div className="bg-navy-850/80 border border-navy-800 rounded-xl p-4">
            <span className="text-xs text-slate-400 block font-mono">Acceptance Rate</span>
            <span className="text-2xl font-extrabold text-emerald-400 mt-1 block">{progress.acceptanceRate}</span>
          </div>
          <div className="bg-navy-850/80 border border-navy-800 rounded-xl p-4">
            <span className="text-xs text-slate-400 block font-mono">Division</span>
            <span className="text-2xl font-extrabold text-cyan-400 mt-1 block">Specialist</span>
          </div>
        </div>
      )}

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

      {/* Global Leaderboard Table */}
      <div className="bg-navy-850/80 border border-navy-800 rounded-2xl p-6 shadow-xl space-y-4">
        <div className="flex items-center justify-between border-b border-navy-800 pb-3">
          <h2 className="text-base font-bold text-white flex items-center gap-2">
            <Trophy className="w-5 h-5 text-amber-400" />
            <span>Global Leaderboard</span>
          </h2>
          <span className="text-xs font-mono text-slate-400">Top Competitive Programmers</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-navy-900 text-slate-400 uppercase font-mono tracking-wider border-b border-navy-800">
              <tr>
                <th className="py-3 px-4">Rank</th>
                <th className="py-3 px-4">Programmer</th>
                <th className="py-3 px-4">Tier Badge</th>
                <th className="py-3 px-4">Problems Solved</th>
                <th className="py-3 px-4 text-right">Rating Score</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-navy-800/80 font-sans">
              {leaderboard.map((item) => (
                <tr key={item.rank} className="hover:bg-navy-800/40 transition">
                  <td className="py-3 px-4 font-mono font-bold">
                    <span className={`inline-flex items-center justify-center w-6 h-6 rounded-full text-xs ${
                      item.rank === 1 ? 'bg-amber-400 text-navy-950 font-black' :
                      item.rank === 2 ? 'bg-slate-300 text-navy-950 font-black' :
                      item.rank === 3 ? 'bg-amber-600 text-white font-black' :
                      'text-slate-400'
                    }`}>
                      {item.rank}
                    </span>
                  </td>
                  <td className="py-3 px-4 font-semibold text-white flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-navy-900 border border-navy-700 flex items-center justify-center text-[10px] text-cyan-400 font-mono">
                      {item.name.charAt(0)}
                    </div>
                    <span>{item.name}</span>
                  </td>
                  <td className="py-3 px-4">
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-blue-500/10 text-cyan-300 border border-blue-500/20">
                      {item.badge}
                    </span>
                  </td>
                  <td className="py-3 px-4 font-mono text-slate-300">{item.problemsSolved}</td>
                  <td className="py-3 px-4 font-mono text-amber-400 font-bold text-right">{item.score} pts</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
