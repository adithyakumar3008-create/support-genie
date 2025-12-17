// apps/web/app/hooks/useSystemMetrics.ts
import { useState, useEffect } from 'react';

export interface SystemMetrics {
  latency_ms: number;
  confidence: number;
  neural_load: number;
}

const useSystemMetrics = () => {
  const [metrics, setMetrics] = useState<SystemMetrics>({
    latency_ms: 12,
    confidence: 99.9,
    neural_load: 78,
  });

  // MOCK DATA SIMULATION
  useEffect(() => {
    const interval = setInterval(() => {
      setMetrics({
        latency_ms: Math.floor(Math.random() * 50) + 10, // 10-60ms
        confidence: Number((Math.random() * 0.1 + 99.8).toFixed(1)), // 99.8-99.9%
        neural_load: Math.floor(Math.random() * 20) + 70, // 70-90%
      });
    }, 750); // Update every 750ms

    return () => clearInterval(interval);
  }, []);

  return metrics;
};

export default useSystemMetrics;
