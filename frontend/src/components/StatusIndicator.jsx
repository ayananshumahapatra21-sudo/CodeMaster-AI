import React from 'react';
import { Server, Database, Activity, RefreshCw, CheckCircle2, XCircle, Clock } from 'lucide-react';

export default function StatusIndicator({ healthData, loading, onRefresh }) {
  const isBackendUp = healthData?.status === 'UP';
  const isDbConnected = healthData?.database?.status === 'CONNECTED';

  return (
    <div className="bg-navy-850/80 backdrop-blur border border-navy-800 rounded-2xl p-6 shadow-xl space-y-5">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-navy-800/80 pb-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-blue-500/10 border border-blue-500/20 text-cyan-400">
            <Activity className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-base font-bold text-white flex items-center gap-2">
              System Infrastructure & Telemetry
            </h2>
            <p className="text-xs text-slate-400">
              Live status monitoring between React, Spring Boot, and PostgreSQL
            </p>
          </div>
        </div>

        <button
          onClick={onRefresh}
          disabled={loading}
          className="self-start sm:self-auto inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-navy-800 hover:bg-navy-700 border border-navy-700 text-xs font-medium text-slate-200 transition-all disabled:opacity-50 hover:border-blue-500/40"
          title="Refresh telemetry status"
        >
          <RefreshCw className={`w-3.5 h-3.5 text-cyan-400 ${loading ? 'animate-spin' : ''}`} />
          <span>{loading ? 'Pinging...' : 'Refresh Status'}</span>
        </button>
      </div>

      {/* Grid of Indicators */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Backend Indicator */}
        <div className={`p-4 rounded-xl border transition-all ${
          isBackendUp 
            ? 'bg-navy-900/90 border-emerald-500/30 shadow-sm shadow-emerald-500/5' 
            : 'bg-navy-900/90 border-rose-500/30 shadow-sm shadow-rose-500/5'
        }`}>
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <div className={`p-2 rounded-lg ${
                isBackendUp ? 'bg-emerald-500/10 text-emerald-400' : 'bg-rose-500/10 text-rose-400'
              }`}>
                <Server className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  Spring Boot Backend
                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider ${
                    isBackendUp 
                      ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40' 
                      : 'bg-rose-500/20 text-rose-300 border border-rose-500/40'
                  }`}>
                    {isBackendUp ? 'ONLINE' : 'OFFLINE'}
                  </span>
                </h3>
                <p className="text-xs text-slate-400 font-mono">http://localhost:8080</p>
              </div>
            </div>

            {isBackendUp ? (
              <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0" />
            ) : (
              <XCircle className="w-5 h-5 text-rose-400 flex-shrink-0" />
            )}
          </div>

          <div className="mt-4 pt-3 border-t border-navy-800 text-xs grid grid-cols-2 gap-2 text-slate-300 font-mono">
            <div>
              <span className="text-slate-500 block text-[10px] uppercase">Service Name</span>
              <span className="font-semibold text-cyan-300">{healthData?.application || 'codemaster-api'}</span>
            </div>
            <div>
              <span className="text-slate-500 block text-[10px] uppercase">Runtime</span>
              <span className="font-semibold">Java {healthData?.environment?.javaVersion || '21'}</span>
            </div>
            <div>
              <span className="text-slate-500 block text-[10px] uppercase">Spring Boot</span>
              <span className="font-semibold">v{healthData?.environment?.springBootVersion || '3.3.5'}</span>
            </div>
            <div>
              <span className="text-slate-500 block text-[10px] uppercase">Server Uptime</span>
              <span className="font-semibold text-emerald-400 flex items-center gap-1">
                <Clock className="w-3 h-3 inline" />
                {healthData?.uptime || 'Active'}
              </span>
            </div>
          </div>
        </div>

        {/* PostgreSQL Indicator */}
        <div className={`p-4 rounded-xl border transition-all ${
          isDbConnected 
            ? 'bg-navy-900/90 border-emerald-500/30 shadow-sm shadow-emerald-500/5' 
            : 'bg-navy-900/90 border-rose-500/30 shadow-sm shadow-rose-500/5'
        }`}>
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <div className={`p-2 rounded-lg ${
                isDbConnected ? 'bg-emerald-500/10 text-emerald-400' : 'bg-rose-500/10 text-rose-400'
              }`}>
                <Database className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  PostgreSQL Database
                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider ${
                    isDbConnected 
                      ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40' 
                      : 'bg-rose-500/20 text-rose-300 border border-rose-500/40'
                  }`}>
                    {isDbConnected ? 'CONNECTED' : 'DISCONNECTED'}
                  </span>
                </h3>
                <p className="text-xs text-slate-400 font-mono">localhost:5432</p>
              </div>
            </div>

            {isDbConnected ? (
              <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0" />
            ) : (
              <XCircle className="w-5 h-5 text-rose-400 flex-shrink-0" />
            )}
          </div>

          <div className="mt-4 pt-3 border-t border-navy-800 text-xs grid grid-cols-2 gap-2 text-slate-300 font-mono">
            <div>
              <span className="text-slate-500 block text-[10px] uppercase">Database</span>
              <span className="font-semibold text-cyan-300">{healthData?.database?.databaseName || 'codemaster_db'}</span>
            </div>
            <div>
              <span className="text-slate-500 block text-[10px] uppercase">Engine</span>
              <span className="font-semibold">{healthData?.database?.type || 'PostgreSQL'}</span>
            </div>
            <div>
              <span className="text-slate-500 block text-[10px] uppercase">Version</span>
              <span className="font-semibold truncate block" title={healthData?.database?.version || 'PostgreSQL 16'}>
                {healthData?.database?.version ? healthData.database.version.split(' ')[0] : 'v16.2'}
              </span>
            </div>
            <div>
              <span className="text-slate-500 block text-[10px] uppercase">Ping Latency</span>
              <span className="font-semibold text-cyan-400">
                {healthData?.database?.responseTimeMs !== undefined 
                  ? `${healthData.database.responseTimeMs} ms` 
                  : '--'}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
