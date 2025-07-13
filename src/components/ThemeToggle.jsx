// src/components/ThemeToggle.jsx
import { useTheme } from '../contexts/ThemeProvider';

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    if (theme === 'light') {
      setTheme('dark');
    } else {
      setTheme('light');
    }
  };

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-md dark:bg-gray-100 bg-gray-800 dark:text-black text-white shadow cursor-pointer transition-colors duration-300"
    >
      {theme === 'dark' ? '☀️' : '🌙'}
    </button>
  );
}