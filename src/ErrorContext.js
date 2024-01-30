import React, { createContext, useState, useContext } from "react";

const ErrorContext = createContext();


/**
 * The `ErrorProvider` component is a wrapper that provides an error context to its children
 * components.
 * @returns The ErrorProvider component is being returned.
 */
export const ErrorProvider = ({ children }) => {
  const [error, setError] = useState(null);

  const setErrorMsg = (errorMessage) => {
    setError({ message: errorMessage });
  };

  const clearError = () => {
    setError(null);
  };

  return (
    <ErrorContext.Provider value={{ error, setErrorMsg, clearError }}>
      {children}
    </ErrorContext.Provider>
  );
};

/**
 * The function `useError` returns the value of the `ErrorContext` using the `useContext` hook.
 * @returns The `useError` function is returning the `context` object obtained from the `useContext`
 * hook.
 */
export const useError = () => {
  const context = useContext(ErrorContext);

  return context;
};
