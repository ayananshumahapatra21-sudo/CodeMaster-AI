import React, { useState, useEffect, useCallback } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import DashboardPage from './pages/DashboardPage';
import ProblemsPage from './pages/ProblemsPage';
import ProgressPage from './pages/ProgressPage';
import ProblemWorkspacePage from './pages/ProblemWorkspacePage';
import { healthApi } from './api/client';

export default function App() {
  const [healthData, setHealthData] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchHealth = useCallback(async () => {
    setLoading(true);
    try {
      const data = await healthApi.getHealth();
      setHealthData(data);
    } catch (err) {
      console.warn('[App] Health fetch failed, using fallback status:', err.message);
      setHealthData({
        status: 'DEGRADED',
        application: 'codemaster-api',
        version: '1.0.0-SNAPSHOT',
        uptime: 'Offline',
        environment: {
          javaVersion: '21',
          springBootVersion: '3.3.5'
        },
        database: {
          status: 'DISCONNECTED',
          type: 'PostgreSQL',
          databaseName: 'codemaster_db',
          url: 'jdbc:postgresql://localhost:5432/codemaster_db',
          error: err.message || 'Connection refused to backend API'
        }
      });
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchHealth();
    const interval = setInterval(fetchHealth, 30000);
    return () => clearInterval(interval);
  }, [fetchHealth]);

  return (
    <Router>
      <div className="min-h-screen bg-navy-950 text-slate-100 flex flex-col font-sans selection:bg-blue-600 selection:text-white">
        <Navbar systemStatus={healthData} />
        <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <Routes>
            <Route
              path="/"
              element={
                <DashboardPage
                  healthData={healthData}
                  loading={loading}
                  onRefreshHealth={fetchHealth}
                />
              }
            />
            <Route path="/problems" element={<ProblemsPage />} />
            <Route path="/problems/:id" element={<ProblemWorkspacePage />} />
            <Route path="/progress" element={<ProgressPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}
