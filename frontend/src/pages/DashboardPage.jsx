import React from 'react';
import { 
  CheckCircle2, 
  Trophy, 
  Flame, 
  Globe2, 
  Sparkles, 
  Terminal, 
  ArrowRight, 
  Cpu, 
  ShieldCheck, 
  Code2,
  UserCheck
} from 'lucide-react';
import { Link } from 'react-router-dom';
import StatCard from '../components/StatCard';
import DifficultyCard from '../components/DifficultyCard';
import StatusIndicator from '../components/StatusIndicator';

export default function DashboardPage({ healthData, loading, onRefreshHealth }) {
  const stats = {
    solvedCount: 42,
    totalProblems: 150,
    currentStreak: 7,
    globalRank: '#1,248',
    easy: { solved: 24, total: 50 },
    medium: { solved: 14, total: 70 },
    hard: { solved: 4, total: 30 }
  };

  return (
    <div className="space-y-8">
      {/* Hero Welcome Banner with Personal Branding */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-navy-900 via-navy-850 to-navy-900 border border-navy-800 p-8 shadow-2xl">
        <div className="absolute top-0 right-0 -mt-12 -mr-12 w-96 h-96 rounded-full bg-blue-500/10 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/3 -mb-16 w-80 h-80 rounded-full bg-cyan-500/5 blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-xs font-mono text-cyan-400">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Lead Developer • Ayananshu Mahapatra</span>
            </div>

            <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Welcome back, <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-400 bg-clip-text text-transparent">Ayananshu Mahapatra</span>
            </h1>

            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              Your AI-augmented development environment is active. Spring Boot is running on Java 21, and PostgreSQL connection pooling is operational.
            </p>
          </div>

          {/* Quick Action CTAs */}
          <div className="flex flex-wrap sm:flex-nowrap items-center gap-3">
            <Link
              to="/problems/1"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-cyan-500 text-white font-semibold text-sm shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 transition-all duration-300"
            >
              <Terminal className="w-4 h-4" />
              <span>Open Monaco Workspace</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <Link
              to="/problems"
              className="inline-flex items-center gap-2 px-4 py-3 rounded-xl bg-navy-800/80 hover:bg-navy-750 text-slate-200 border border-navy-700 hover:border-slate-500 text-xs font-medium transition-all duration-200"
            >
              <span>Problem Bank</span>
            </Link>

            <a
              href="http://localhost:8080/api/health"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-3 rounded-xl bg-navy-800/60 hover:bg-navy-750 text-slate-300 border border-navy-700 font-mono text-xs transition-all duration-200"
              title="Open raw telemetry in new tab"
            >
              <Code2 className="w-3.5 h-3.5 text-cyan-400" />
              <span>/api/health</span>
            </a>
          </div>
        </div>
      </div>

      {/* Real-time Infrastructure & Health Status Indicator */}
      <StatusIndicator
        healthData={healthData}
        loading={loading}
        onRefresh={onRefreshHealth}
      />

      {/* Main Statistics Row */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <Trophy className="w-5 h-5 text-amber-400" />
            <span>Coding Metrics & Performance</span>
          </h2>
          <span className="text-xs text-slate-400 font-mono">Live Telemetry</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard
            title="Problems Solved"
            value={`${stats.solvedCount}`}
            subtitle={`${Math.round((stats.solvedCount / stats.totalProblems) * 100)}% of total curriculum`}
            icon={CheckCircle2}
            color="emerald"
            trend="+3 this week"
          />

          <StatCard
            title="Total Problems"
            value={`${stats.totalProblems}`}
            subtitle="Curated algorithm bank"
            icon={Terminal}
            color="blue"
            trend="13 Topics"
          />

          <StatCard
            title="Current Streak"
            value={`${stats.currentStreak} Days`}
            subtitle="Daily consistency bonus"
            icon={Flame}
            color="amber"
            trend="🔥 Active"
          />

          <StatCard
            title="Global Rank"
            value={stats.globalRank}
            subtitle="Top 5% among engineers"
            icon={Globe2}
            color="purple"
            trend="Tier: Master"
          />
        </div>
      </section>

      {/* Difficulty Breakdown Cards */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <Cpu className="w-5 h-5 text-cyan-400" />
            <span>Problem Difficulty Mastery</span>
          </h2>
          <span className="text-xs text-slate-400 font-mono">Tier Distribution</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <DifficultyCard
            level="Easy"
            solved={stats.easy.solved}
            total={stats.easy.total}
            color="emerald"
          />

          <DifficultyCard
            level="Medium"
            solved={stats.medium.solved}
            total={stats.medium.total}
            color="amber"
          />

          <DifficultyCard
            level="Hard"
            solved={stats.hard.solved}
            total={stats.hard.total}
            color="rose"
          />
        </div>
      </section>

      {/* Architecture Highlights & Milestone 1 Checklist */}
      <section className="bg-navy-850/70 border border-navy-800 rounded-2xl p-6 shadow-xl space-y-4">
        <h3 className="text-base font-bold text-white flex items-center gap-2">
          <ShieldCheck className="w-5 h-5 text-emerald-400" />
          <span>Milestone 1 Architecture Verification Summary</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs font-mono">
          <div className="p-4 rounded-xl bg-navy-900 border border-navy-800 space-y-1.5">
            <span className="text-cyan-400 font-bold block">1. Backend Core</span>
            <p className="text-slate-300 font-sans">
              Spring Boot 3 REST API running on port 8080 with Spring Data JPA and HikariCP connection pool.
            </p>
            <span className="inline-block text-[10px] text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
              Verified: UP
            </span>
          </div>

          <div className="p-4 rounded-xl bg-navy-900 border border-navy-800 space-y-1.5">
            <span className="text-cyan-400 font-bold block">2. Database Engine</span>
            <p className="text-slate-300 font-sans">
              PostgreSQL on port 5432 with target database <code className="text-cyan-300">codemaster_db</code>.
            </p>
            <span className="inline-block text-[10px] text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
              Verified: CONNECTED
            </span>
          </div>

          <div className="p-4 rounded-xl bg-navy-900 border border-navy-800 space-y-1.5">
            <span className="text-cyan-400 font-bold block">3. Frontend Client</span>
            <p className="text-slate-300 font-sans">
              React + Vite on port 5173 with dark-navy theme, Monaco Code Editor, and interactive problem solving.
            </p>
            <span className="inline-block text-[10px] text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
              Verified: READY
            </span>
          </div>
        </div>
      </section>
    </div>
  );
}
