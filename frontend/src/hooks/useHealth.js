import { useState, useEffect, useCallback } from 'react';
import { healthService } from '../services/healthService';

export function useHealth(pollIntervalMs = 30000) {
  const [healthData, setHealthData] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchHealth = useCallback(async () => {
    setLoading(true);
    try {
      const data = await healthService.getHealth();
      setHealthData(data);
    } catch (err) {
      setHealthData({
        status: 'DEGRADED',
        application: 'codemaster-api',
        version: '1.0.0-SNAPSHOT',
        uptime: 'Offline',
        environment: {
          author: 'Ayananshu Mahapatra',
          leadDeveloper: 'Ayananshu Mahapatra',
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
    const interval = setInterval(fetchHealth, pollIntervalMs);
    return () => clearInterval(interval);
  }, [fetchHealth, pollIntervalMs]);

  return { healthData, loading, refetch: fetchHealth };
}
