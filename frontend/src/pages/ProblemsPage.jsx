import React, { useState } from 'react';
import { Terminal, Search, Filter, CheckCircle2, ArrowRight, Code2 } from 'lucide-react';

export default function ProblemsPage() {
  const [search, setSearch] = useState('');
  const [selectedDifficulty, setSelectedDifficulty] = useState('All');

  const problems = [
    { id: 1, title: 'Two Sum', category: 'Arrays & Hashing', difficulty: 'Easy', status: 'Solved', acceptance: '52.4%' },
    { id: 2, title: 'Valid Anagram', category: 'Strings', difficulty: 'Easy', status: 'Solved', acceptance: '64.1%' },
    { id: 3, title: 'Longest Substring Without Repeating Characters', category: 'Sliding Window', difficulty: 'Medium', status: 'Attempted', acceptance: '34.8%' },
    { id: 4, title: 'Trapping Rain Water', category: 'Two Pointers', difficulty: 'Hard', status: 'Unsolved', acceptance: '61.2%' },
    { id: 5, title: 'Reverse Linked List', category: 'Linked Lists', difficulty: 'Easy', status: 'Solved', acceptance: '76.8%' },
    { id: 6, title: 'Lowest Common Ancestor of a BST', category: 'Trees', difficulty: 'Medium', status: 'Unsolved', acceptance: '53.9%' }
  ];

  const filtered = problems.filter(p => {
    const matchesSearch = p.title.toLowerCase().includes(search.toLowerCase()) || p.category.toLowerCase().includes(search.toLowerCase());
    const matchesDiff = selectedDifficulty === 'All' || p.difficulty === selectedDifficulty;
    return matchesSearch && matchesDiff;
  });

  const getDifficultyBadge = (diff) => {
    switch (diff) {
      case 'Easy':
        return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30';
      case 'Medium':
        return 'bg-amber-500/10 text-amber-400 border-amber-500/30';
      case 'Hard':
        return 'bg-rose-500/10 text-rose-400 border-rose-500/30';
      default:
        return 'bg-slate-500/10 text-slate-400 border-slate-500/30';
    }
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-navy-800 pb-5">
        <div>
          <h1 className="text-2xl font-bold text-white flex items-center gap-2.5">
            <Terminal className="w-6 h-6 text-cyan-400" />
            <span>Problem Bank</span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Browse and practice curated competitive programming problems.
          </p>
        </div>

        {/* Search & Filter */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search problems or topics..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="bg-navy-900 border border-navy-800 rounded-xl pl-9 pr-4 py-2 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-blue-500 transition-colors w-64"
            />
          </div>

          <div className="flex items-center bg-navy-900 border border-navy-800 rounded-xl p-1 text-xs">
            {['All', 'Easy', 'Medium', 'Hard'].map((diff) => (
              <button
                key={diff}
                onClick={() => setSelectedDifficulty(diff)}
                className={`px-3 py-1 rounded-lg font-medium transition-all ${
                  selectedDifficulty === diff
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {diff}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="bg-navy-850/80 border border-navy-800 rounded-2xl overflow-hidden shadow-xl">
        <table className="w-full text-left text-xs">
          <thead className="bg-navy-900/90 text-slate-400 uppercase font-mono tracking-wider border-b border-navy-800">
            <tr>
              <th className="py-3.5 px-6">#</th>
              <th className="py-3.5 px-6">Problem Title</th>
              <th className="py-3.5 px-6">Topic</th>
              <th className="py-3.5 px-6">Difficulty</th>
              <th className="py-3.5 px-6">Acceptance</th>
              <th className="py-3.5 px-6 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-navy-800/80 font-sans">
            {filtered.map((item) => (
              <tr key={item.id} className="hover:bg-navy-800/40 transition-colors">
                <td className="py-4 px-6 font-mono text-slate-400">{item.id}</td>
                <td className="py-4 px-6 font-semibold text-white flex items-center gap-2">
                  <span>{item.title}</span>
                  {item.status === 'Solved' && (
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 inline" title="Solved" />
                  )}
                </td>
                <td className="py-4 px-6">
                  <span className="px-2.5 py-1 rounded-md bg-navy-900 text-slate-300 border border-navy-800 text-[11px] font-mono">
                    {item.category}
                  </span>
                </td>
                <td className="py-4 px-6">
                  <span className={`px-2.5 py-0.5 rounded-full font-mono text-[11px] font-bold border ${getDifficultyBadge(item.difficulty)}`}>
                    {item.difficulty}
                  </span>
                </td>
                <td className="py-4 px-6 font-mono text-slate-400">{item.acceptance}</td>
                <td className="py-4 px-6 text-right">
                  <button className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-blue-500/10 text-cyan-400 border border-blue-500/20 hover:bg-blue-500 hover:text-white font-medium transition-all">
                    <span>Solve</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
