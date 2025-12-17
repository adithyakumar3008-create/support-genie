// apps/web/app/hooks/useNeuralThreads.ts
import { useState, useEffect } from 'react';

export interface NeuralThread {
  session_id: string;
  tier: 'ENTERPRISE' | 'PRO' | 'STANDARD';
  language: 'TELUGU' | 'ENGLISH' | 'HINDI';
  state: 'Thinking...' | 'Ready' | 'Typing' | 'Error';
  latency: number;
}

const useNeuralThreads = () => {
  const [threads, setThreads] = useState<NeuralThread[]>([
    {
      session_id: '#SES-8829-X',
      tier: 'ENTERPRISE',
      language: 'TELUGU',
      state: 'Thinking...',
      latency: 45,
    },
    {
      session_id: '#SES-8830-A',
      tier: 'STANDARD',
      language: 'ENGLISH',
      state: 'Ready',
      latency: 12,
    },
    {
      session_id: '#SES-8831-C',
      tier: 'PRO',
      language: 'HINDI',
      state: 'Typing',
      latency: 28,
    },
  ]);

  // MOCK DATA SIMULATION
  useEffect(() => {
    const interval = setInterval(() => {
      setThreads((prevThreads) =>
        prevThreads.map((thread) => {
          const states: ('Thinking...' | 'Ready' | 'Typing' | 'Error')[] = ['Thinking...', 'Ready', 'Typing', 'Error'];
          const randomState = states[Math.floor(Math.random() * states.length)];
          return {
            ...thread,
            state: randomState,
            latency: Math.floor(Math.random() * 100),
          };
        })
      );
    }, 2000); // Update every 2 seconds

    return () => clearInterval(interval);
  }, []);

  return threads;
};

export default useNeuralThreads;
