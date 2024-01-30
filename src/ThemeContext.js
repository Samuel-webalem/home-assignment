/* The code is creating a theme context and a theme provider component using React's createContext and
useState hooks. */
import React, { createContext, useState, useContext } from "react";

const ThemeContext = createContext();


/**
 * The `ThemeProvider` component is a wrapper that provides a theme context with a toggle function to
 * switch between dark and light mode.
 * @returns The `ThemeProvider` component is returning a `ThemeContext.Provider` component with the
 * `isDarkMode` and `toggleTheme` values provided as the context value. The `children` prop is rendered
 * as the child components of the `ThemeProvider`.
 */
export const ThemeProvider = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleTheme = () => {
    setIsDarkMode((prevMode) => !prevMode);
  };

  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

/**
 * The useTheme function returns the current theme from the ThemeContext.
 * @returns The `useTheme` function returns the `context` object obtained from the `useContext` hook.
 */
export const useTheme = () => {
  const context = useContext(ThemeContext);

  return context;
};
