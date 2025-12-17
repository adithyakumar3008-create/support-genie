// apps/web/app/hooks/useGodMode.ts
import { useState, useEffect } from 'react';

export interface GodModeState {
  god_mode_active: boolean;
  isLoading: boolean;
  error: Error | null;
}

const useGodMode = () => {
  const [godModeState, setGodModeState] = useState<GodModeState>({
    god_mode_active: false,
    isLoading: true,
    error: null,
  });

  // Fetch initial state
  useEffect(() => {
    const fetchGodModeStatus = () => {
      setGodModeState((prev) => ({ ...prev, isLoading: true, error: null }));
      setTimeout(() => {
        // Simulate a successful API call
        setGodModeState({
          god_mode_active: false,
          isLoading: false,
          error: null,
        });

        // Uncomment the line below to test the error state
        // setGodModeState({ god_mode_active: false, isLoading: false, error: new Error("Neural Link Degraded") });
      }, 1500); // 1.5 second delay to simulate network latency
    };

    fetchGodModeStatus();
  }, []);

  const toggleGodMode = () => {
    setGodModeState((prev) => ({ ...prev, isLoading: true, error: null }));
    setTimeout(() => {
      setGodModeState((prev) => ({
        ...prev,
        god_mode_active: !prev.god_mode_active,
        isLoading: false,
      }));
    }, 500); // Shorter delay for toggling
  };

  return { ...godModeState, toggleGodMode };
};

export default useGodMode;
