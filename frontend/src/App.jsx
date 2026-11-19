import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import DashboardPage from './pages/DashboardPage';
import ProblemsPage from './pages/ProblemsPage';
import ProgressPage from './pages/ProgressPage';
import ProblemWorkspacePage from './pages/ProblemWorkspacePage';
import { AuthProvider } from './context/AuthContext';
import { useHealth } from './hooks/useHealth';

export default function App() {
  const { healthData, loading, refetch } = useHealth(30000);

  return (
    <AuthProvider>
      <Router basename={import.meta.env.BASE_URL}>
        <MainLayout systemStatus={healthData}>
          <Routes>
            <Route
              path="/"
              element={
                <DashboardPage
                  healthData={healthData}
                  loading={loading}
                  onRefreshHealth={refetch}
                />
              }
            />
            <Route path="/problems" element={<ProblemsPage />} />
            <Route path="/problems/:id" element={<ProblemWorkspacePage />} />
            <Route path="/progress" element={<ProgressPage />} />
          </Routes>
        </MainLayout>
      </Router>
    </AuthProvider>
  );
}
