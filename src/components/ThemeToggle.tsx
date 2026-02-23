import React from 'react';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';

export const ThemeToggle: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="w-10 h-10 p-2 rounded-lg bg-secondary/50 hover:bg-secondary transition-colors duration-200 flex items-center justify-center"
      aria-label="Toggle theme"
    >
      {theme === 'light' ? (
        <Moon className="h-5 w-5 text-blue-400 items-center flex-shrink-0" 
        aria-label="Toggle to dark mode"/>
      ) : (
        <Sun className="h-5 w-5 text-yellow-400 items-center flex-shrink-0" 
        aria-label="Toggle to light mode"/>
      )}
    </button>
  );
};
