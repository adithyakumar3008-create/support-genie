// apps/web/app/hooks/useLanguageMatrix.ts
import { useState, useEffect } from 'react';

export interface LanguageMatrix {
  language_detected: string;
  confidence_score: number;
  active_languages: string[];
}

const useLanguageMatrix = () => {
  const [languageMatrix, setLanguageMatrix] = useState<LanguageMatrix>({
    language_detected: 'English',
    confidence_score: 1.0,
    active_languages: ['English', 'Hindi', 'Telugu'],
  });

  // MOCK DATA SIMULATION
  useEffect(() => {
    const interval = setInterval(() => {
      const languages = ['English', 'Hindi', 'Telugu'];
      const randomLanguage = languages[Math.floor(Math.random() * languages.length)];
      setLanguageMatrix((prev) => ({
        ...prev,
        language_detected: randomLanguage,
        confidence_score: Math.random(),
      }));
    }, 5000); // Update every 5 seconds

    return () => clearInterval(interval);
  }, []);

  return languageMatrix;
};

export default useLanguageMatrix;
