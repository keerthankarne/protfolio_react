import { createContext, useContext, useEffect, useState } from "react";

const ThemeContext = createContext(null);

// Reads the saved preference (or the OS preference) once, synchronously,
// so there's no flash of the wrong theme on first paint.
function getInitialTheme() {
  const saved = window.localStorage.getItem("kk-theme");
  if (saved === "light" || saved === "dark") return saved;
  return window.matchMedia("(prefers-color-scheme: light)").matches
    ? "light"
    : "dark";
}

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(getInitialTheme);

  // Persist to localStorage + reflect on <html> whenever theme changes.
  useEffect(() => {
    window.localStorage.setItem("kk-theme", theme);
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  function toggleTheme() {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used inside a ThemeProvider");
  return ctx;
}
